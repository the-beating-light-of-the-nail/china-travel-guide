<script setup lang="ts">
// 文脉地图：懒加载 Leaflet（滚动到视口前只渲染占位骨架，进入视口才动态 import，
// leaflet 独立 chunk 不进主包；SSR 输出占位，无 window 访问）。
// 瓦片：CARTO Voyager（免 key、全球 CDN，适合海外访客，WGS-84 与我们的坐标一致）。
// 标记：divIcon 纯 CSS 圆点（按朝代着色，无默认图标图片资源问题），
//       支持朝代筛选（v-model:era），筛选后自动 fitBounds。
import type { Map as LeafletMap, LayerGroup, Marker } from 'leaflet'
import type { XianHeritageSpot } from '~/data/xian-heritage'
import { HERITAGE_ERA_COLORS, HERITAGE_ERA_SHORT } from '~/data/xian-heritage'

const props = defineProps<{
  spots: XianHeritageSpot[]
}>()

const era = defineModel<string | null>('era', { default: null })

const { t, locale } = useI18n()

const rootEl = ref<HTMLElement | null>(null)
const mapEl = ref<HTMLElement | null>(null)
const ready = ref(false)
const failed = ref(false)

let L: typeof import('leaflet') | null = null
let map: LeafletMap | null = null
let markerLayer: LayerGroup | null = null

// chips：数据中实际出现的朝代，按 zhou→scenic 固定顺序
const ERA_ORDER = ['zhou', 'qin', 'han', 'tang', 'ming', 'modern', 'scenic']
const chipEras = computed(() => {
  const present = new Set(props.spots.map(s => s.era))
  return ERA_ORDER.filter(e => present.has(e as XianHeritageSpot['era']))
})

const filteredSpots = computed(() => era.value ? props.spots.filter(s => s.era === era.value) : props.spots)

function setChip(e: string | null) {
  era.value = era.value === e ? null : e
}

// 弹窗 HTML（数据为本站静态数据，无注入风险）
function popupHtml(spot: XianHeritageSpot): string {
  const color = HERITAGE_ERA_COLORS[spot.era] || '#334155'
  const parts = [
    `<div class="heritage-pop">`,
    `<span class="hp-era" style="background:${color}">${HERITAGE_ERA_SHORT[spot.era]?.[locale.value] || ''}</span>`,
    `<strong class="hp-name">${spot.name[locale.value]}</strong>`,
    `<p class="hp-hook">${spot.hook[locale.value]}</p>`,
  ]
  if (spot.more?.[locale.value]) parts.push(`<p class="hp-more">${spot.more[locale.value]}</p>`)
  if (spot.detail) parts.push(`<a class="hp-link" href="#overview">${t('heritage.popupDetails')}</a>`)
  parts.push(`</div>`)
  return parts.join('')
}

function makeMarker(spot: XianHeritageSpot): Marker {
  const color = HERITAGE_ERA_COLORS[spot.era] || '#334155'
  const icon = L!.divIcon({
    className: 'heritage-pin-wrap',
    html: `<span class="heritage-pin" style="--c:${color}"></span>`,
    iconSize: [18, 18],
    iconAnchor: [9, 9],
    popupAnchor: [0, -10],
  })
  return L!.marker(spot.coords, { icon, title: spot.name[locale.value] }).bindPopup(() => popupHtml(spot), { maxWidth: 260 })
}

function renderMarkers() {
  if (!L || !map || !markerLayer) return
  markerLayer.clearLayers()
  const spots = filteredSpots.value
  for (const s of spots) markerLayer.addLayer(makeMarker(s))
  // 「全部」视野只 fit 城区点（排除华山/太白等远郊标记，避免视野被拉远）；
  // 具体筛选（含「八景」）时 fit 该组全部点。
  const fitSpots = era.value === null ? spots.filter(s => !s.far) : spots
  if (fitSpots.length > 1) {
    map.fitBounds(L.latLngBounds(fitSpots.map(s => s.coords)), { padding: [40, 40], maxZoom: 13 })
  }
  else if (fitSpots.length === 1) {
    map.setView(fitSpots[0].coords, 13)
  }
}

async function initMap() {
  if (ready.value || failed.value || !mapEl.value) return
  try {
    // 动态加载 leaflet 及其样式（独立 chunk + 按需样式注入）
    const leaflet = await import('leaflet')
    await import('leaflet/dist/leaflet.css')
    L = leaflet
    map = L.map(mapEl.value, {
      center: [34.256, 108.95],
      zoom: 11,
      scrollWheelZoom: false, // 防滚动陷阱：点击地图后才启用滚轮缩放
    })
    map.on('click', () => map?.scrollWheelZoom.enable())
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      subdomains: 'abcd',
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    }).addTo(map)
    markerLayer = L.layerGroup().addTo(map)
    ready.value = true
    renderMarkers()
  }
  catch (err) {
    console.warn('[heritage-map] leaflet 加载失败，回退占位', err)
    failed.value = true
  }
}

onMounted(() => {
  if (!rootEl.value || typeof IntersectionObserver === 'undefined') {
    initMap()
    return
  }
  const io = new IntersectionObserver((entries) => {
    if (entries.some(e => e.isIntersecting)) {
      io.disconnect()
      initMap()
    }
  }, { rootMargin: '300px' })
  io.observe(rootEl.value)
  onBeforeUnmount(() => io.disconnect())
})

// 筛选变化 → 重建标记层（地图未就绪时由 initMap 兜底渲染当前筛选）
watch(filteredSpots, () => {
  if (ready.value) renderMarkers()
})

onBeforeUnmount(() => {
  markerLayer?.clearLayers()
  map?.remove()
  map = null
  markerLayer = null
})
</script>

<template>
  <div ref="rootEl" class="heritage-map-root isolate">
    <!-- 朝代筛选 chips -->
    <div class="flex flex-wrap items-center gap-2 mb-3" role="group" :aria-label="t('heritage.filterAll')">
      <button
        type="button"
        class="heritage-chip"
        :class="era === null ? 'heritage-chip-on' : ''"
        :aria-pressed="era === null"
        @click="setChip(null)"
      >
        {{ t('heritage.filterAll') }}
      </button>
      <button
        v-for="e in chipEras"
        :key="e"
        type="button"
        class="heritage-chip"
        :class="era === e ? 'heritage-chip-on' : ''"
        :aria-pressed="era === e"
        @click="setChip(e)"
      >
        <span class="inline-block w-2 h-2 rounded-full mr-1.5 align-middle" :style="{ background: HERITAGE_ERA_COLORS[e] }" aria-hidden="true" />
        {{ HERITAGE_ERA_SHORT[e]?.[locale] || e }}
      </button>
    </div>

    <!-- 地图容器 / 占位 -->
    <div class="h-[420px] md:h-[480px] rounded-[14px] border border-slate-200 overflow-hidden bg-slate-100 relative shadow-lg shadow-black/5">
      <div v-show="ready" ref="mapEl" class="absolute inset-0" />
      <!-- 占位骨架（SSR 输出；失败时换提示文案） -->
      <div v-if="!ready" class="absolute inset-0 flex flex-col items-center justify-center gap-3 text-ink-muted">
        <span
          class="w-10 h-10 rounded-full border-[3px] border-slate-300 border-t-brand animate-spin"
          aria-hidden="true"
        />
        <span class="text-sm">{{ failed ? t('heritage.mapFallback') : t('heritage.mapLoading') }}</span>
      </div>
    </div>
  </div>
</template>

<style>
/* 地图标记与弹窗样式（divIcon 的 HTML 在 scoped 之外，需全局样式） */
.heritage-pin-wrap { background: transparent; border: none; }
.heritage-pin {
  display: block;
  width: 18px;
  height: 18px;
  border-radius: 9999px;
  background: var(--c, #334155);
  border: 2.5px solid #fff;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.45);
  transition: transform 0.15s ease;
}
.heritage-pin:hover { transform: scale(1.25); }

.heritage-pop { font-family: inherit; min-width: 190px; }
.heritage-pop .hp-era {
  display: inline-block;
  color: #fff;
  font-size: 10px;
  font-weight: 600;
  line-height: 1;
  padding: 3px 8px;
  border-radius: 9999px;
  margin-bottom: 6px;
  letter-spacing: 0.04em;
}
.heritage-pop .hp-name { display: block; font-size: 14px; color: #1e293b; margin-bottom: 4px; }
.heritage-pop .hp-hook { font-size: 12px; line-height: 1.55; color: #475569; margin: 0; }
.heritage-pop .hp-more { font-size: 11.5px; line-height: 1.5; color: #64748b; margin: 6px 0; padding-top: 6px; border-top: 1px dashed #e2e8f0; }
.heritage-pop .hp-link { font-size: 12px; color: #287DFA; text-decoration: underline; text-underline-offset: 2px; }
.heritage-pop .hp-link:hover { color: #1A63D6; }
</style>

<style scoped>
/* 筛选 chips（品牌色系，与站内按钮语言一致） */
.heritage-chip {
  display: inline-flex;
  align-items: center;
  padding: 5px 14px;
  border-radius: 9999px;
  border: 1px solid #cbd5e1;
  background: #fff;
  color: #475569;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.15s ease;
}
.heritage-chip:hover { border-color: #287DFA; color: #287DFA; }
.heritage-chip-on {
  background: #287DFA;
  border-color: #287DFA;
  color: #fff;
}
.heritage-chip-on:hover { color: #fff; }
</style>
