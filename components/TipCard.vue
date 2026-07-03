<script setup lang="ts">
// 实用贴士卡片组件 - 图标、标题、要点列表
import type { Tip } from '~/data/travel-data'

const props = defineProps<{
  tip: Tip
}>()

const { locale } = useI18n()

// 图标映射 - 将图标关键词映射为 emoji
const iconMap: Record<string, string> = {
  transport: '🚄',
  hotel: '🏨',
  tips: '💡',
}

// 当前图标
const icon = computed(() => iconMap[props.tip.icon] || '📌')

// 贴士条目列表（以 | 分隔，按当前语言取）
const itemlist = computed(() => {
  const localized = props.tip.items[locale.value]
  return localized.split('|').map(item => item.trim()).filter(Boolean)
})
</script>

<template>
  <!-- 贴士卡片 -->
  <div class="bg-white rounded-xl p-6 sm:p-[26px] shadow-md">
    <!-- 标题 -->
    <h4 class="text-brand mb-3.5 text-[17px] flex items-center gap-2 font-semibold">
      <span>{{ icon }}</span>
      <span>{{ tip.title[locale] }}</span>
    </h4>

    <!-- 条目列表 -->
    <ul class="list-none">
      <li
        v-for="(item, idx) in itemlist"
        :key="idx"
        class="text-sm text-gray-600 py-1.5 pl-4 relative"
      >
        <span class="absolute left-0 text-accent">•</span>
        <span>{{ item }}</span>
      </li>
    </ul>
  </div>
</template>
