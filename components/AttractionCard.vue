<script setup lang="ts">
// 景点卡片组件 - 图片、标题、亮点、描述、元信息（位置/时长/票价）
import type { Attraction } from '~/data/travel-data'

const props = defineProps<{
  attraction: Attraction
}>()

const { locale } = useI18n()
// 无实拍图时（picsum 占位）改用品牌色兜底，避免随机风景照
const isPlaceholder = computed(() => !props.attraction.image || props.attraction.image.includes('picsum.photos'))
</script>

<template>
  <!-- 景点卡片 -->
  <div class="card-dark overflow-hidden card-hover cursor-pointer flex flex-col">
    <!-- 图片区 -->
    <div class="h-[200px] overflow-hidden bg-slate-700">
      <img
        v-if="!isPlaceholder"
        :src="attraction.image"
        :alt="attraction.name[locale]"
        class="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
      >
      <div
        v-else
        class="w-full h-full flex items-center justify-center bg-gradient-to-br from-brand/15 via-brand/5 to-accent/10"
      >
        <span class="text-5xl opacity-50">🏞️</span>
      </div>
    </div>

    <!-- 内容区 -->
    <div class="p-5 flex-1 flex flex-col">
      <!-- 标题 -->
      <h3 class="text-lg text-slate-50 mb-2 font-semibold">{{ attraction.name[locale] }}</h3>

      <!-- 亮点 -->
      <div class="text-accent text-[13px] mb-2.5 font-medium flex items-center gap-1">
        <span>★</span>
        <span>{{ attraction.highlight[locale] }}</span>
      </div>

      <!-- 描述（两行截断） -->
      <p class="text-sm text-slate-400 leading-relaxed line-clamp-2 flex-1">
        {{ attraction.description[locale] }}
      </p>

      <!-- 元信息 -->
      <div class="flex justify-between items-center mt-3.5 pt-3.5 border-t border-slate-700 text-xs text-slate-500">
        <span>📍 {{ attraction.location[locale] }}</span>
        <span>⏱️ {{ attraction.duration[locale] }}</span>
        <span>🎫 {{ attraction.ticket[locale] }}</span>
      </div>
    </div>
  </div>
</template>
