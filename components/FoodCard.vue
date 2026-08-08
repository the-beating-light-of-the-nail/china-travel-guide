<script setup lang="ts">
// 美食卡片组件 - 图片、标题、亮点、描述
import type { Food } from '~/data/travel-data'

const props = defineProps<{
  food: Food
}>()

const { locale } = useI18n()
// 无实拍图时（picsum 占位）改用品牌色兜底，避免随机风景照出现在美食卡
const isPlaceholder = computed(() => !props.food.image || props.food.image.includes('picsum.photos'))
</script>

<template>
  <!-- 美食卡片 -->
  <div class="bg-white rounded-xl overflow-hidden shadow-md card-hover cursor-pointer flex flex-col">
    <!-- 图片区 -->
    <div class="h-[200px] overflow-hidden bg-gray-100">
      <img
        v-if="!isPlaceholder"
        :src="food.image"
        :alt="food.name[locale]"
        class="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
      >
      <div
        v-else
        class="w-full h-full flex items-center justify-center bg-gradient-to-br from-accent/15 via-accent/5 to-brand/10"
      >
        <span class="text-5xl opacity-50">🍜</span>
      </div>
    </div>

    <!-- 内容区 -->
    <div class="p-5 flex-1 flex flex-col">
      <!-- 标题 -->
      <h3 class="text-lg text-gray-900 mb-2 font-semibold">{{ food.name[locale] }}</h3>

      <!-- 亮点 -->
      <div class="text-accent text-[13px] mb-2.5 font-medium">
        {{ food.highlight[locale] }}
      </div>

      <!-- 描述（两行截断） -->
      <p class="text-sm text-gray-500 leading-relaxed line-clamp-2 flex-1">
        {{ food.description[locale] }}
      </p>
    </div>
  </div>
</template>
