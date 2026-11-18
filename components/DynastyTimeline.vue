<script setup lang="ts">
// 朝代时间轴：横滑 scroll-snap 卡片条（零依赖，卡片内容 SSR 直出，SEO 可抓）
// 点击卡片 → 选中态高亮并向父级 emit 朝代 key（父级据此过滤文脉地图标记；
// 无对应地图标记的时期如 隋/五代宋元 仅作展示切换，不改变地图过滤——由父级判断）。
import type { XianDynastyPeriod } from '~/data/xian-heritage'

const props = defineProps<{
  periods: XianDynastyPeriod[]
}>()

const emit = defineEmits<{ (e: 'select', key: string | null): void }>()

const { locale, t } = useI18n()
const activeKey = ref<string | null>(null)
const railEl = ref<HTMLElement | null>(null)
const cardEls = new Map<string, HTMLElement>()

function toggle(period: XianDynastyPeriod) {
  activeKey.value = activeKey.value === period.key ? null : period.key
  emit('select', activeKey.value)
  // 选中卡片滚到可视区（父级 rail 为滚动容器）
  const card = activeKey.value ? cardEls.get(activeKey.value) : null
  card?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
}

function scrollRail(dir: -1 | 1) {
  railEl.value?.scrollBy({ left: dir * 300, behavior: 'smooth' })
}

function setCardRef(key: string, el: unknown) {
  if (el) cardEls.set(key, el as HTMLElement)
}

onBeforeUnmount(() => cardEls.clear())
</script>

<template>
  <div class="relative">
    <!-- 顶部：操作提示 + 左右滑动钮 -->
    <div class="flex items-center justify-between mb-3">
      <span class="text-xs text-ink-muted ml-1">{{ t('heritage.timelineHint') }}</span>
      <div class="flex gap-2">
        <button
          type="button"
          class="w-8 h-8 rounded-full border border-slate-300 text-ink-muted hover:text-brand hover:border-brand transition-colors flex items-center justify-center"
          :aria-label="t('heritage.scrollLeft')"
          @click="scrollRail(-1)"
        >
          <svg viewBox="0 0 24 24" class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" /></svg>
        </button>
        <button
          type="button"
          class="w-8 h-8 rounded-full border border-slate-300 text-ink-muted hover:text-brand hover:border-brand transition-colors flex items-center justify-center"
          :aria-label="t('heritage.scrollRight')"
          @click="scrollRail(1)"
        >
          <svg viewBox="0 0 24 24" class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>
    </div>

    <!-- 卡片轨道（横滑 + snap） -->
    <div
      ref="railEl"
      class="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scroll-x-no-bar"
    >
      <button
        v-for="period in periods"
        :key="period.key"
        :ref="(el: unknown) => setCardRef(period.key, el)"
        type="button"
        class="heritage-card card snap-start shrink-0 w-[270px] md:w-[300px] text-left p-0 overflow-hidden transition-shadow"
        :class="activeKey === period.key ? 'ring-2 shadow-lg' : 'hover:shadow-md'"
        :style="activeKey === period.key ? ({ '--tw-ring-color': period.accent } as Record<string, string>) : undefined"
        :aria-pressed="activeKey === period.key"
        @click="toggle(period)"
      >
        <!-- 朝代色带 -->
        <span class="block h-[6px] w-full" :style="{ background: period.accent }" aria-hidden="true" />
        <span class="block p-5">
          <span class="flex items-baseline justify-between gap-2">
            <span class="text-lg font-bold text-ink">{{ period.title[locale] }}</span>
            <span class="text-[11px] font-medium text-white px-2 py-0.5 rounded-full whitespace-nowrap" :style="{ background: period.accent }">{{ period.cityName[locale] }}</span>
          </span>
          <span class="block text-xs text-ink-muted mt-1 mb-3 tracking-wide">{{ period.years[locale] }}</span>
          <span class="block text-[13px] leading-relaxed text-ink-body">{{ period.fact[locale] }}</span>
          <!-- 大事记一行（史实锚点） -->
          <span
            v-if="period.events?.[locale]"
            class="block text-[11px] leading-relaxed mt-3 pt-2.5 border-t border-dashed opacity-80"
            :style="{ borderColor: period.accent }"
          >{{ period.events[locale] }}</span>
        </span>
      </button>
    </div>

    <!-- 左右渐隐提示（可滑动的视觉信号） -->
    <span class="hidden md:block absolute top-9 bottom-4 left-0 w-10 bg-gradient-to-r from-white to-transparent pointer-events-none" aria-hidden="true" />
    <span class="hidden md:block absolute top-9 bottom-4 right-0 w-10 bg-gradient-to-l from-white to-transparent pointer-events-none" aria-hidden="true" />
  </div>
</template>
