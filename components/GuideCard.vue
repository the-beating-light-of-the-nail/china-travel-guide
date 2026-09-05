<script setup lang="ts">
// 攻略文章卡片组件 - 图片、标签、标题、摘要、元信息（trip.com 风格浅色）
import type { Guide } from '~/data/travel-data'

defineProps<{
  guide: Guide
}>()

const { locale } = useI18n()
const localePath = useLocalePath()
</script>

<template>
  <!-- 攻略卡片 -->
  <NuxtLink
    :to="localePath(`/guides/${guide.slug}`)"
    class="group card overflow-hidden card-hover block cursor-pointer"
  >
    <!-- 图片区 -->
    <div class="h-[200px] overflow-hidden bg-slate-100">
      <img
        :src="guide.image"
        :alt="guide.title[locale]"
        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      >
    </div>

    <!-- 内容区 -->
    <div class="p-5">
      <!-- 标签 -->
      <span class="inline-block bg-brand-tint text-brand px-2.5 py-0.5 rounded text-xs mb-2.5 font-medium">
        {{ guide.label[locale] }}
      </span>

      <!-- 标题 -->
      <h3 class="text-lg text-ink mb-2 font-semibold leading-snug line-clamp-2 group-hover:text-brand transition-colors">
        {{ guide.title[locale] }}
      </h3>

      <!-- 摘要（两行截断） -->
      <p class="text-sm text-ink-muted mb-3.5 leading-relaxed line-clamp-2">
        {{ guide.excerpt[locale] }}
      </p>

      <!-- 元信息 -->
      <div class="flex justify-between text-xs text-ink-muted">
        <span>📖 {{ guide.views[locale] }}</span>
        <span>⏱️ {{ guide.publishedAt[locale] }}</span>
      </div>
    </div>
  </NuxtLink>
</template>
