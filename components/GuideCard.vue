<script setup lang="ts">
// 攻略文章卡片组件 - 图片、标签、标题、摘要、元信息
interface Guide {
  title: string
  slug: string
  excerpt: string
  image: string
  label: string
  readTime: string
  views: string
  publishedAt: string
}

defineProps<{
  guide: Guide
}>()
</script>

<template>
  <!-- 攻略卡片 -->
  <NuxtLink
    :to="`/guides/${guide.slug}`"
    class="group bg-white rounded-xl overflow-hidden shadow-sm transition-transform duration-300 hover:-translate-y-1 block cursor-pointer"
  >
    <!-- 图片区 -->
    <div class="h-[200px] overflow-hidden">
      <img
        :src="guide.image"
        :alt="guide.title"
        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      >
    </div>

    <!-- 内容区 -->
    <div class="p-5">
      <!-- 标签 -->
      <span class="inline-block bg-brand/10 text-brand px-2.5 py-0.5 rounded text-xs mb-2.5">
        {{ guide.label }}
      </span>

      <!-- 标题 -->
      <h3 class="text-lg text-gray-900 mb-2 font-semibold leading-snug line-clamp-2">
        {{ guide.title }}
      </h3>

      <!-- 摘要（两行截断） -->
      <p class="text-sm text-gray-500 mb-3.5 leading-relaxed line-clamp-2">
        {{ guide.excerpt }}
      </p>

      <!-- 元信息 -->
      <div class="flex justify-between text-xs text-gray-400">
        <span>📖 {{ guide.views }}</span>
        <span>⏱️ {{ guide.publishedAt }}</span>
      </div>
    </div>
  </NuxtLink>
</template>
