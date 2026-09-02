<script setup lang="ts">
// 行程区块组件 - 天数、标题、按时段排列的行程条目
import type { Itinerary } from '~/data/travel-data'

defineProps<{
  itinerary: Itinerary
}>()

const { locale, t } = useI18n()
</script>

<template>
  <!-- 单日行程区块 -->
  <div class="card-dark p-6 sm:p-[30px] mb-6 border-l-4 border-l-brand">
    <!-- 天数标题 -->
    <h3 class="text-xl text-brand mb-4 flex items-center gap-2.5">
      <span class="bg-brand text-white text-[13px] px-3 py-0.5 rounded font-normal">
        {{ t('city.day') }} {{ itinerary.dayNumber }}
      </span>
      <span class="font-semibold">{{ itinerary.title[locale] }}</span>
    </h3>

    <!-- 行程条目列表 -->
    <ul class="list-none">
      <li
        v-for="(item, idx) in itinerary.items"
        :key="idx"
        class="py-2.5 text-[15px] text-slate-200 flex gap-3"
        :class="{ 'border-b border-dashed border-slate-700': idx < itinerary.items.length - 1 }"
      >
        <span class="text-accent font-medium min-w-[60px]">{{ item.timeSlot[locale] }}</span>
        <span>{{ item.content[locale] }}</span>
      </li>
    </ul>
  </div>
</template>
