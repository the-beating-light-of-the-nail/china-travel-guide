<script setup lang="ts">
// 攻略文章详情页 - 标题、摘要、正文、元信息
const route = useRoute()
const { public: pub } = useRuntimeConfig()
const slug = route.params.slug as string

// 静态数据：按 slug 查询攻略文章（构建时注入，无需运行时数据库）
import { getGuideBySlug } from '~/data/travel-data'
const guide = getGuideBySlug(slug)

// 文章不存在则 404
if (!guide) {
  throw createError({ statusCode: 404, statusMessage: 'Guide not found', fatal: true })
}

const g = computed(() => guide!)

// 文章发布日期（用于 JSON-LD）
const datePublished = computed(() => {
  const d = new Date()
  d.setDate(d.getDate() - 14)
  return d.toISOString()
})

// SEO 元信息
useHead({
  title: `${g.value.title} | China Travel Guide`,
  meta: [
    { name: 'description', content: g.value.excerpt },
    { property: 'og:title', content: g.value.title },
    { property: 'og:description', content: g.value.excerpt },
    { property: 'og:type', content: 'article' },
    { property: 'og:image', content: g.value.image },
    { property: 'article:author', content: 'China Travel Guide' },
  ],
  script: [
    // 文章结构化数据 JSON-LD
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: g.value.title,
        description: g.value.excerpt,
        image: g.value.image,
        author: {
          '@type': 'Organization',
          name: 'China Travel Guide',
        },
        publisher: {
          '@type': 'Organization',
          name: 'China Travel Guide',
        },
        datePublished: datePublished.value,
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `${pub.siteUrl}/guides/${g.value.slug}`,
        },
      }),
    },
  ],
})
</script>

<template>
  <div v-if="guide" class="bg-white">
    <!-- 文章头部 -->
    <header class="relative h-[460px] flex items-end overflow-hidden">
      <img :src="g.image" :alt="g.title" class="absolute inset-0 w-full h-full object-cover">
      <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/30" />
      <div class="relative max-w-3xl mx-auto px-4 pb-12 text-white w-full">
        <NuxtLink to="/#guides" class="text-brand-light hover:text-white text-sm mb-3 inline-block">
          ← Back to Guides
        </NuxtLink>
        <span class="inline-block bg-brand text-white px-3 py-1 rounded text-xs mb-4">
          {{ g.label }}
        </span>
        <h1 class="text-3xl md:text-[40px] font-bold leading-tight mb-4 text-shadow">
          {{ g.title }}
        </h1>
        <div class="flex gap-4 text-sm opacity-90">
          <span>📖 {{ g.views }}</span>
          <span>⏱️ {{ g.readTime }}</span>
          <span>📅 {{ g.publishedAt }}</span>
        </div>
      </div>
    </header>

    <!-- 文章正文 -->
    <article class="max-w-3xl mx-auto px-4 py-12">
      <!-- 摘要 -->
      <p class="text-lg text-gray-600 leading-relaxed mb-8 pb-8 border-b border-gray-100 italic">
        {{ g.excerpt }}
      </p>
      <!-- 正文内容（HTML 富文本） -->
      <div class="prose-content max-w-none" v-html="g.content" />

      <!-- 底部导航 -->
      <div class="mt-12 pt-8 border-t border-gray-100 text-center">
        <NuxtLink
          to="/#guides"
          class="inline-block bg-brand text-white px-8 py-3 rounded-full hover:bg-brand-dark transition-colors"
        >
          More Guides
        </NuxtLink>
      </div>
    </article>
  </div>
</template>

<style scoped>
/* 文章正文富文本样式 */
.prose-content :deep(h2) {
  font-size: 1.75rem;
  font-weight: 700;
  color: #2c5c4e;
  margin-top: 2.5rem;
  margin-bottom: 1rem;
}

.prose-content :deep(p) {
  color: #444;
  line-height: 1.8;
  margin-bottom: 1.25rem;
}
</style>
