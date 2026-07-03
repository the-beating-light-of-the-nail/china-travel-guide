<script setup lang="ts">
// 景点卡片组件 - 图片、标题、亮点、描述、元信息（位置/时长/票价）
import type { Attraction } from '~/data/travel-data'

defineProps<{
  attraction: Attraction
}>()

const { locale } = useI18n()
</script>

<template>
  <!-- 景点卡片 -->
  <div class="bg-white rounded-xl overflow-hidden shadow-md card-hover cursor-pointer">
    <!-- 图片区 -->
    <div class="h-[200px] overflow-hidden">
      <img
        :src="attraction.image"
        :alt="attraction.name[locale]"
        class="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
      >
    </div>

    <!-- 内容区 -->
    <div class="p-5">
      <!-- 标题 -->
      <h3 class="text-lg text-gray-900 mb-2 font-semibold">{{ attraction.name[locale] }}</h3>

      <!-- 亮点 -->
      <div class="text-accent text-[13px] mb-2.5 font-medium flex items-center gap-1">
        <span>★</span>
        <span>{{ attraction.highlight[locale] }}</span>
      </div>

      <!-- 描述（两行截断） -->
      <p class="text-sm text-gray-500 leading-relaxed line-clamp-2">
        {{ attraction.description[locale] }}
      </p>

      <!-- 元信息 -->
      <div class="flex justify-between items-center mt-3.5 pt-3.5 border-t border-gray-100 text-xs text-gray-400">
        <span>📍 {{ attraction.location[locale] }}</span>
        <span>⏱️ {{ attraction.duration[locale] }}</span>
        <span>🎫 {{ attraction.ticket[locale] }}</span>
      </div>
    </div>
  </div>
</template>
