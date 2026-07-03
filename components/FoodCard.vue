<script setup lang="ts">
// 美食卡片组件 - 图片、标题、亮点、描述
import type { Food } from '~/data/travel-data'

defineProps<{
  food: Food
}>()

const { locale } = useI18n()
</script>

<template>
  <!-- 美食卡片 -->
  <div class="bg-white rounded-xl overflow-hidden shadow-md card-hover cursor-pointer">
    <!-- 图片区 -->
    <div class="h-[200px] overflow-hidden">
      <img
        :src="food.image"
        :alt="food.name[locale]"
        class="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
      >
    </div>

    <!-- 内容区 -->
    <div class="p-5">
      <!-- 标题 -->
      <h3 class="text-lg text-gray-900 mb-2 font-semibold">{{ food.name[locale] }}</h3>

      <!-- 亮点 -->
      <div class="text-accent text-[13px] mb-2.5 font-medium">
        {{ food.highlight[locale] }}
      </div>

      <!-- 描述（两行截断） -->
      <p class="text-sm text-gray-500 leading-relaxed line-clamp-2">
        {{ food.description[locale] }}
      </p>
    </div>
  </div>
</template>
