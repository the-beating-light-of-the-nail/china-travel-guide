<script setup lang="ts">
// 优衣库跨区价格对比器（/tools/uniqlo-price-comparison/）
// ---------------------------------------------------------------
// 双层结构：
// ① 静态快照层（SEO 基座）：SSG 构建期按当前语种默认市场直出完整表格，
//    爬虫不执行交互也能抓到全部价格文本；价格为构建期快照（data/uniqlo-data.ts）。
// ② 实时查价层（工具体验）：输入任意商品番号 → POST /api/uniqlo-lookup
//    （服务端代理 10 市场官网，避 CORS；限流 5 次/分/IP、同码缓存 10 分钟）→
//    动态渲染全市场实时结果。失败/限流给文案提示，快照层永远可退回。
// 每格价格外链该区官网商品页（同全球品番码），可逐格溯源。
// ---------------------------------------------------------------
import {
  uniqloItems,
  UNIQLO_REGIONS,
  UNIQLO_FX,
  UNIQLO_CURRENCIES,
  UNIQLO_DEFAULT_HOME,
  UNIQLO_DEFAULT_CURRENCY,
  uniqloUi,
} from '~/data/uniqlo-data'
import type { UniqloRegionId, UniqloRegionEntry } from '~/data/uniqlo-data'

const { locale } = useI18n()

const homeRegions = UNIQLO_REGIONS.filter(r => !r.isChina)
const china = UNIQLO_REGIONS.find(r => r.id === 'cn')!

// 初始值由语种决定 → SSR 与客户端水合结果一致，无闪变
const homeId = ref<UniqloRegionId>(UNIQLO_DEFAULT_HOME[locale.value] || 'us')
const currencyCode = ref(UNIQLO_DEFAULT_CURRENCY[locale.value] || 'USD')

const home = computed(() => UNIQLO_REGIONS.find(r => r.id === homeId.value)!)
const currency = computed(() => UNIQLO_CURRENCIES.find(c => c.code === currencyCode.value)!)

const ui = (k: keyof typeof uniqloUi) => uniqloUi[k][locale.value] || uniqloUi[k].en

/** 各本币的小数位（与区域定价习惯一致：欧元区 .90、日元韩元无小数） */
const LOCAL_DECIMALS: Record<string, number> = { CNY: 0, HKD: 0, USD: 2, GBP: 2, EUR: 2, JPY: 0, KRW: 0 }

/** 本币价格格式化（en-US 数字格式保证 SSR/客户端一致） */
function fmtLocal(entry: UniqloRegionEntry) {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: LOCAL_DECIMALS[entry.currency] ?? 2,
    maximumFractionDigits: LOCAL_DECIMALS[entry.currency] ?? 2,
  }).format(entry.price)
}

/** 折算展示币种（经由 CNY 中转：snapshot 汇率为 1 CNY 兑各币） */
function fmtDisplay(cnyValue: number) {
  const rate = (UNIQLO_FX.perCny as Record<string, number>)[currency.value.code]
  if (!rate) return ''
  const val = cnyValue * rate
  return `${currency.value.symbol}${new Intl.NumberFormat('en-US', {
    minimumFractionDigits: currency.value.decimals,
    maximumFractionDigits: currency.value.decimals,
  }).format(val)}`
}

const entryCny = (e?: UniqloRegionEntry) => (e ? e.price / (UNIQLO_FX.perCny as Record<string, number>)[e.currency] : undefined)

// ===== 实时查价层 =====
interface LiveResult {
  code: string
  fetchedAt: string
  cached: boolean
  regions: Partial<Record<UniqloRegionId, UniqloRegionEntry | undefined>>
}

const query = ref('')
const loading = ref(false)
const errorKey = ref<'' | 'invalidCode' | 'noResults' | 'rateLimited' | 'lookupFailed'>('')
const live = ref<LiveResult | null>(null)

async function lookup() {
  errorKey.value = ''
  if (!query.value.trim()) {
    errorKey.value = 'invalidCode'
    return
  }
  loading.value = true
  try {
    const res = await $fetch<LiveResult>('/api/uniqlo-lookup', {
      method: 'POST',
      body: { q: query.value.trim(), locale: locale.value },
    })
    live.value = res
  } catch (e: any) {
    if (e?.statusCode === 429) errorKey.value = 'rateLimited'
    else if (e?.statusCode === 404) errorKey.value = 'noResults'
    else if (e?.statusCode === 400) errorKey.value = 'invalidCode'
    else errorKey.value = 'lookupFailed'
  } finally {
    loading.value = false
  }
}

function backToSnapshot() {
  live.value = null
  errorKey.value = ''
  query.value = ''
}

/** 实时结果表行：市场 → 该区价格 + 对中国价差 */
const liveRows = computed(() => {
  if (!live.value) return []
  const cnCny = entryCny(live.value.regions.cn as UniqloRegionEntry | undefined)
  return UNIQLO_REGIONS.map((r) => {
    const entry = live.value!.regions[r.id]
    const cny = entryCny((entry || undefined) as UniqloRegionEntry | undefined)
    return {
      region: r,
      entry: entry || null,
      vsPct: cnCny !== undefined && cny !== undefined ? ((cnCny - cny) / cny) * 100 : undefined,
    }
  })
})

const liveTitle = computed(() => {
  if (!live.value) return ''
  const cn = live.value.regions.cn as UniqloRegionEntry | undefined
  const first = Object.values(live.value.regions).find(v => v) as UniqloRegionEntry | undefined
  return (cn || first)?.title || `#${live.value.code}`
})

/** 实时结果 vs 中国 徽章（方向：中国相对该市场） */
function liveBadge(vsPct: number | undefined) {
  const v = vsPct === undefined ? 0 : Math.round(Math.abs(vsPct))
  if (vsPct === undefined) return { text: ui('notSold'), cls: 'bg-slate-100 text-slate-400' }
  if (vsPct <= -10) return { text: `${v}% ${ui('cheaper')}`, cls: 'bg-emerald-100 text-emerald-800' }
  if (vsPct >= 10) return { text: `+${v}% ${ui('pricier')}`, cls: 'bg-rose-100 text-rose-800' }
  return { text: ui('similar'), cls: 'bg-slate-100 text-slate-600' }
}

const liveTime = computed(() => {
  if (!live.value) return ''
  return new Date(live.value.fetchedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
})

// ===== 静态快照层 =====
interface Row {
  id: string
  icon: string
  name: string
  note?: string
  cn: UniqloRegionEntry
  home?: UniqloRegionEntry
  diffPct?: number
  cnBarPct: number
  homeBarPct: number
}

const rows = computed<Row[]>(() =>
  uniqloItems.map((item) => {
    const cn = item.regions.cn!
    const hm = item.regions[homeId.value]
    const cnCny = entryCny(cn)!
    const hmCny = entryCny(hm)
    const diffPct = hmCny ? ((cnCny - hmCny) / hmCny) * 100 : undefined
    const max = Math.max(cnCny, hmCny ?? 0)
    return {
      id: item.id,
      icon: item.icon,
      name: item.name[locale.value] || item.name.en,
      note: item.note ? (item.note[locale.value] || item.note.en) : undefined,
      cn,
      home: hm,
      diffPct,
      cnBarPct: Math.max(8, Math.round((cnCny / max) * 100)),
      homeBarPct: hmCny ? Math.max(8, Math.round((hmCny / max) * 100)) : 0,
    }
  }),
)

const comparable = computed(() => rows.value.filter(r => r.diffPct !== undefined))
const avgDiffPct = computed(() =>
  comparable.value.length
    ? Math.round(comparable.value.reduce((s, r) => s + (r.diffPct as number), 0) / comparable.value.length)
    : 0,
)

const biggestGap = computed(() =>
  comparable.value.reduce((best, r) => ((r.diffPct as number) < (best.diffPct as number) ? r : best), comparable.value[0]),
)

function badge(r: Row) {
  const v = r.diffPct === undefined ? 0 : Math.round(Math.abs(r.diffPct))
  if (r.diffPct === undefined) return { text: ui('notSold'), cls: 'bg-slate-100 text-slate-400' }
  if (r.diffPct <= -10) return { text: `${v}% ${ui('cheaper')}`, cls: 'bg-emerald-100 text-emerald-800' }
  if (r.diffPct >= 10) return { text: `+${v}% ${ui('pricier')}`, cls: 'bg-rose-100 text-rose-800' }
  return { text: ui('similar'), cls: 'bg-slate-100 text-slate-600' }
}
</script>

<template>
  <div class="bg-white rounded-xl border border-slate-200 overflow-hidden">
    <!-- 实时查价搜索框（常显最顶层：任意商品番号 → 10 市场官网实时价） -->
    <div class="p-4 md:p-6 border-b border-slate-200">
      <label for="uniqlo-lookup" class="block text-xs font-semibold text-ink-muted uppercase mb-1.5">🏷️ {{ ui('lookupLabel') }}</label>
      <form class="flex flex-col sm:flex-row gap-2" @submit.prevent="lookup">
        <input
          id="uniqlo-lookup"
          v-model="query"
          type="text"
          inputmode="text"
          autocomplete="off"
          :placeholder="ui('lookupPlaceholder')"
          class="flex-1 rounded-lg border border-slate-300 bg-slate-50 px-3 py-2.5 text-sm text-ink placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand"
        >
        <button
          type="submit"
          :disabled="loading"
          class="rounded-lg bg-brand text-white px-5 py-2.5 text-sm font-semibold hover:bg-brand-dark transition-colors disabled:opacity-60 shrink-0"
        >
          {{ loading ? ui('looking') : ui('lookupBtn') }}
        </button>
      </form>
      <p v-if="errorKey" class="mt-2 text-sm text-rose-600">{{ ui(errorKey) }}</p>
    </div>

    <!-- 实时结果模式：全市场单码对比 -->
    <template v-if="live">
      <div class="p-4 md:p-6 border-b border-slate-200 bg-emerald-50/40">
        <div class="flex flex-wrap items-center gap-2 justify-between">
          <div class="min-w-0">
            <div class="flex items-center gap-2 flex-wrap">
              <span class="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800">{{ ui('liveBadge') }}</span>
              <span class="font-semibold text-ink text-sm">{{ liveTitle }}</span>
              <span class="text-xs text-slate-400">#{{ live.code }} · {{ liveTime }}<span v-if="live.cached"> · cache</span></span>
            </div>
          </div>
          <div class="flex items-center gap-2 shrink-0">
            <select
              v-model="currencyCode"
              aria-label="currency"
              class="rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-xs font-medium text-ink focus:outline-none focus:ring-2 focus:ring-brand"
            >
              <option v-for="c in UNIQLO_CURRENCIES" :key="c.code" :value="c.code">{{ c.code }} ({{ c.symbol }})</option>
            </select>
            <button class="text-xs font-medium text-brand hover:underline" @click="backToSnapshot">{{ ui('backToSnapshot') }}</button>
          </div>
        </div>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse text-sm">
          <thead>
            <tr class="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-ink-muted uppercase tracking-wider">
              <th class="py-3 px-4 md:px-5">{{ ui('regionCol') }}</th>
              <th class="py-3 px-3 text-right whitespace-nowrap">{{ ui('chinaCol') }} / {{ ui('currency') }}</th>
              <th class="py-3 px-4 md:px-5 text-right">{{ ui('vsChina') }}</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <tr v-for="r in liveRows" :key="r.region.id" :class="r.region.isChina ? 'bg-brand-tint/40' : ''">
              <td class="py-3 px-4 md:px-5">
                <div class="font-semibold text-ink">{{ r.region.flag }} {{ r.region.name[locale] }}<span v-if="r.region.isChina" class="ml-2 text-[11px] font-bold text-brand">★</span></div>
                <div class="text-xs text-slate-400 mt-0.5">{{ r.region.store }}<span v-if="r.entry?.title"> · {{ r.entry.title.slice(0, 40) }}</span></div>
              </td>
              <td class="py-3 px-3 text-right whitespace-nowrap">
                <a v-if="r.entry" :href="r.entry.url" target="_blank" rel="noopener" class="font-bold text-brand hover:underline">
                  {{ r.region.currency === 'CNY' ? '¥' : '' }}{{ fmtLocal(r.entry) }} {{ r.region.currency === 'CNY' ? '' : r.entry.currency }}<span v-if="r.entry.originPrice && r.entry.originPrice > r.entry.price" class="ml-1 text-xs text-slate-400 line-through">{{ r.entry.originPrice }}</span>
                </a>
                <span v-else class="text-slate-300">—</span>
                <div v-if="r.entry" class="text-[11px] text-slate-400 mt-0.5">≈ {{ fmtDisplay(entryCny(r.entry)!) }}</div>
              </td>
              <td class="py-3 px-4 md:px-5 text-right whitespace-nowrap">
                <span v-if="!r.region.isChina" class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold" :class="liveBadge(r.vsPct).cls">
                  {{ liveBadge(r.vsPct).text }}
                </span>
                <span v-else class="text-xs font-semibold text-brand">{{ ui('chinaCol') }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- 实时口径与免责声明 -->
      <p class="bg-slate-50 px-4 md:px-5 py-3 border-t border-slate-200 text-xs text-ink-muted">{{ ui('liveNote') }}</p>
    </template>

    <!-- 快照模式（默认；SSG 直出，SEO 基座） -->
    <template v-else>
      <!-- 控制区：本国市场 / 币种 -->
      <div class="p-4 md:p-6 border-b border-slate-200">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl">
          <div>
            <label for="uniqlo-home" class="block text-xs font-semibold text-ink-muted uppercase mb-1.5">{{ ui('homeMarket') }}</label>
            <select
              id="uniqlo-home"
              v-model="homeId"
              class="w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2.5 text-sm font-medium text-ink focus:outline-none focus:ring-2 focus:ring-brand"
            >
              <option v-for="r in homeRegions" :key="r.id" :value="r.id">{{ r.flag }} {{ r.name[locale] }} ({{ r.store }})</option>
            </select>
          </div>
          <div>
            <label for="uniqlo-currency" class="block text-xs font-semibold text-ink-muted uppercase mb-1.5">{{ ui('currency') }}</label>
            <select
              id="uniqlo-currency"
              v-model="currencyCode"
              class="w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2.5 text-sm font-medium text-ink focus:outline-none focus:ring-2 focus:ring-brand"
            >
              <option v-for="c in UNIQLO_CURRENCIES" :key="c.code" :value="c.code">{{ c.code }} ({{ c.symbol }})</option>
            </select>
          </div>
        </div>

        <!-- 汇总卡片 -->
        <div class="mt-5 pt-5 border-t border-slate-100 grid grid-cols-1 md:grid-cols-3 gap-3">
          <div
            class="rounded-xl p-4 border"
            :class="avgDiffPct < 0 ? 'bg-emerald-50/70 border-emerald-100' : 'bg-rose-50/70 border-rose-100'"
          >
            <div class="text-xs font-medium" :class="avgDiffPct < 0 ? 'text-emerald-700' : 'text-rose-700'">
              {{ china.flag }} {{ china.name[locale] }} vs {{ home.flag }} {{ home.name[locale] }}
            </div>
            <div class="text-2xl font-extrabold mt-1" :class="avgDiffPct < 0 ? 'text-emerald-600' : 'text-rose-600'">
              {{ Math.abs(avgDiffPct) }}% {{ avgDiffPct < 0 ? ui('avgCheaper') : ui('avgPricier') }}
            </div>
          </div>
          <div v-if="biggestGap" class="bg-amber-50/70 border border-amber-100 rounded-xl p-4">
            <div class="text-xs font-medium text-amber-800">{{ ui('biggestGap') }}</div>
            <div class="text-lg font-bold text-amber-700 mt-1">{{ biggestGap.icon }} {{ biggestGap.name }}</div>
            <div v-if="biggestGap.diffPct" class="text-xs text-amber-700/80 mt-0.5">
              {{ Math.round(Math.abs(biggestGap.diffPct)) }}% {{ biggestGap.diffPct < 0 ? ui('cheaper') : ui('pricier') }} ·
              {{ fmtDisplay(Math.abs(entryCny(biggestGap.cn)! - (entryCny(biggestGap.home) || 0))!) }}
            </div>
          </div>
          <div class="bg-slate-50 border border-slate-200/70 rounded-xl p-4 flex items-center">
            <p class="text-xs text-ink-body leading-relaxed">{{ ui('refundHint') }}</p>
          </div>
        </div>
      </div>

      <!-- 对比表：SSG 直出，爬虫可抓；每格价格外链官网商品页 -->
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse text-sm">
          <thead>
            <tr class="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-ink-muted uppercase tracking-wider">
              <th class="py-3 px-4 md:px-5">{{ ui('itemCol') }}</th>
              <th class="py-3 px-3 text-right whitespace-nowrap">{{ china.flag }} {{ ui('chinaCol') }}</th>
              <th class="py-3 px-3 text-right whitespace-nowrap">{{ home.flag }} {{ home.name[locale] }}</th>
              <th class="py-3 px-4 w-40 hidden sm:table-cell">%</th>
              <th class="py-3 px-4 md:px-5 text-right" />
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <tr v-for="r in rows" :key="r.id" class="transition-colors">
              <td class="py-3 px-4 md:px-5">
                <div class="flex items-start gap-2.5">
                  <span class="text-lg leading-none mt-0.5">{{ r.icon }}</span>
                  <div>
                    <div class="font-semibold text-ink">{{ r.name }}</div>
                    <div class="text-xs text-slate-400 mt-0.5">#{{ uniqloItems.find(i => i.id === r.id)?.code }}<span v-if="r.note"> · {{ r.note }}</span></div>
                  </div>
                </div>
              </td>
              <td class="py-3 px-3 text-right whitespace-nowrap">
                <a :href="r.cn.url" target="_blank" rel="noopener" class="font-bold text-brand hover:underline">
                  ¥{{ fmtLocal(r.cn) }}<span v-if="r.cn.originPrice && r.cn.originPrice > r.cn.price" class="ml-1 text-xs text-slate-400 line-through">¥{{ r.cn.originPrice }}</span>
                </a>
                <div class="text-[11px] text-slate-400 mt-0.5">{{ fmtDisplay(entryCny(r.cn)!) }}</div>
              </td>
              <td class="py-3 px-3 text-right whitespace-nowrap">
                <a v-if="r.home" :href="r.home.url" target="_blank" rel="noopener" class="font-medium text-slate-600 hover:underline">
                  {{ fmtLocal(r.home) }} {{ r.home.currency }}<span v-if="r.home.originPrice && r.home.originPrice > r.home.price" class="ml-1 text-xs text-slate-400 line-through">{{ r.home.originPrice }}</span>
                </a>
                <span v-else class="text-slate-300">—</span>
                <div v-if="r.home" class="text-[11px] text-slate-400 mt-0.5">{{ fmtDisplay(entryCny(r.home)!) }}</div>
              </td>
              <td class="py-3 px-4 hidden sm:table-cell">
                <div class="space-y-1.5">
                  <div class="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                    <div class="bg-brand h-1.5 rounded-full transition-all duration-300" :style="{ width: r.cnBarPct + '%' }" />
                  </div>
                  <div class="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                    <div class="bg-slate-400 h-1.5 rounded-full transition-all duration-300" :style="{ width: r.homeBarPct + '%' }" />
                  </div>
                </div>
              </td>
              <td class="py-3 px-4 md:px-5 text-right whitespace-nowrap">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold" :class="badge(r).cls">
                  {{ badge(r).text }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- 口径说明 -->
      <p class="bg-slate-50 px-4 md:px-5 py-3 border-t border-slate-200 text-xs text-ink-muted">
        {{ china.flag }} = {{ china.name[locale] }} (uniqlo.cn) · {{ home.flag }} = {{ home.name[locale] }} ({{ home.store }}) · {{ ui('localNote') }}
      </p>
    </template>
  </div>
</template>
