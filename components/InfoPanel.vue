<script setup lang="ts">
// PDF 风格的「城市名片」信息盒：关键词 / 建议天数 / 最佳季节 / 历史
// 对应攻略 PDF 内页顶部的关键词·费用·天数·最佳季节信息框
import type { City } from '~/data/travel-data'

const props = defineProps<{
  city: City
}>()

const { locale } = useI18n()

const cells = computed(() => {
  const c = props.city
  const l = locale.value
  const keywords = (c.tags[l] || '').split(',').map(s => s.trim()).filter(Boolean)
  return [
    {
      icon: '🏷️',
      label: l === 'zh' ? '关键词' : 'Keywords',
      value: keywords.slice(0, 4).join(' · '),
    },
    {
      icon: '🗓️',
      label: l === 'zh' ? '建议天数' : 'Duration',
      value: c.duration[l],
    },
    {
      icon: '🌸',
      label: l === 'zh' ? '最佳季节' : 'Best Season',
      value: c.bestSeason[l],
    },
    {
      icon: '🏛️',
      label: l === 'zh' ? '城市底蕴' : 'Heritage',
      value: c.history[l],
    },
  ]
})
</script>

<template>
  <div class="rounded-xl border border-slate-700 bg-slate-800/60 overflow-hidden">
    <div class="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-slate-700">
      <div
        v-for="cell in cells"
        :key="cell.label"
        class="p-5"
      >
        <div class="text-xs text-slate-500 mb-1.5 flex items-center gap-1.5">
          <span>{{ cell.icon }}</span>
          <span class="tracking-wide uppercase">{{ cell.label }}</span>
        </div>
        <div class="text-[15px] font-semibold text-slate-100 leading-snug">{{ cell.value }}</div>
      </div>
    </div>
  </div>
</template>
