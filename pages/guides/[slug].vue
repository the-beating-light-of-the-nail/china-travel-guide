<script setup lang="ts">
// 攻略文章详情页 - 标题、摘要、正文、元信息
const route = useRoute()
const { public: pub } = useRuntimeConfig()
const slug = route.params.slug as string
const { t, locale } = useI18n()
const localePath = useLocalePath()

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

// SEO 元信息（含 hreflang）
const i18nHead = useLocaleHead()
useHead({
  title: `${g.value.title[locale.value]} | China Travel Guide`,
  htmlAttrs: { lang: i18nHead.value.htmlAttrs?.lang },
  link: [...(i18nHead.value.link || [])],
  meta: [
    { name: 'description', content: g.value.excerpt[locale.value] },
    { property: 'og:title', content: g.value.title[locale.value] },
    { property: 'og:description', content: g.value.excerpt[locale.value] },
    { property: 'og:type', content: 'article' },
    { property: 'og:image', content: g.value.image },
    { property: 'article:author', content: 'China Travel Guide' },
    { property: 'og:locale', content: locale.value === 'zh' ? 'zh_CN' : 'en_US' },
  ],
  script: [
    // 文章结构化数据 JSON-LD
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: g.value.title[locale.value],
        description: g.value.excerpt[locale.value],
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
        inLanguage: locale.value === 'zh' ? 'zh-CN' : 'en-US',
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `${pub.siteUrl}/${locale.value}/guides/${g.value.slug}`,
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
      <img :src="g.image" :alt="g.title[locale]" class="absolute inset-0 w-full h-full object-cover">
      <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/30" />
      <div class="relative max-w-3xl mx-auto px-4 pb-12 text-white w-full">
        <NuxtLink :to="localePath('/#guides')" class="text-brand-light hover:text-white text-sm mb-3 inline-block">
          {{ t('guide.backToGuides') }}
        </NuxtLink>
        <span class="inline-block bg-brand text-white px-3 py-1 rounded text-xs mb-4">
          {{ g.label[locale] }}
        </span>
        <h1 class="text-3xl md:text-[40px] font-bold leading-tight mb-4 text-shadow">
          {{ g.title[locale] }}
        </h1>
        <div class="flex gap-4 text-sm opacity-90">
          <span>📖 {{ g.views[locale] }}</span>
          <span>⏱️ {{ g.readTime[locale] }}</span>
          <span>📅 {{ g.publishedAt[locale] }}</span>
        </div>
      </div>
    </header>

    <!-- 文章正文 -->
    <article class="max-w-3xl mx-auto px-4 py-12">
      <!-- 摘要 -->
      <p class="text-lg text-gray-600 leading-relaxed mb-8 pb-8 border-b border-gray-100 italic">
        {{ g.excerpt[locale] }}
      </p>
      <!-- 正文内容（HTML 富文本，按当前语言取） -->
      <div class="prose-content max-w-none" v-html="g.content[locale]" />

      <!-- 底部导航 -->
      <div class="mt-12 pt-8 border-t border-gray-100 text-center">
        <NuxtLink
          :to="localePath('/#guides')"
          class="inline-block bg-brand text-white px-8 py-3 rounded-full hover:bg-brand-dark transition-colors"
        >
          {{ t('guide.moreGuides') }}
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
