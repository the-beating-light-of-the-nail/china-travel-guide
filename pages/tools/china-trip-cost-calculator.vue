<script setup lang="ts">
// 中国旅行物价对比器（工具页 MVP：en 全量 + zh/ja 全量，其余 7 语种英文回退——与未翻译 guide 同策略）
// 选题依据：Google Trends「china trip cost」家族 avg 50.9、related top「trip to china cost」=100；
// 「calculator」单独仅 1.9 → 标题主词用 China Trip Cost，calculator 作功能词放 URL/副位（2026-11-16 实测）。
import { costPageCopy, costFaq } from '~/data/cost-data'

const { t, locale } = useI18n()
const localePath = useLocalePath()
const { public: pub } = useRuntimeConfig()

const i18nHead = useLocaleHead()
const copy = (k: keyof typeof costPageCopy) => costPageCopy[k][locale.value] || costPageCopy[k].en
const ogImage = shareImageUrl('/images/og/cities/chengdu/chengdu_p03_13.jpg', pub.siteUrl)

// 反向转化 chips：预算意图流量导回核心内容页（动态推荐的最小实现，静态映射）
const related = [
  {
    to: '/guides/what-to-buy-in-china',
    label: { en: 'What to Buy in China', zh: '在中国买什么最值', ja: '中国で買うべきもの' },
  },
  {
    to: '/guides/first-trip-to-china-guide',
    label: { en: 'First Trip to China Guide', zh: '首次中国行全指南', ja: 'はじめての中国旅行' },
  },
  {
    to: '/guides/chengdu-street-food',
    label: { en: 'Chengdu Street Food Guide', zh: '成都街头小吃攻略', ja: '成都屋台グルメガイド' },
  },
  { to: '/shopping', label: { en: 'Shopping Directory', zh: '购物清单', ja: 'ショッピング一覧' } },
  {
    to: '/tools/uniqlo-price-comparison',
    label: { en: 'Is Uniqlo Cheaper in China?', zh: '优衣库中国比价', ja: 'ユニクロ中国価格比較' },
  },
]

useHead({
  title: `${copy('title')} | China Travel Guide`,
  htmlAttrs: { lang: i18nHead.value.htmlAttrs?.lang },
  meta: [
    { name: 'description', content: copy('description') },
    { property: 'og:title', content: copy('title') },
    { property: 'og:description', content: copy('description') },
    { property: 'og:type', content: 'website' },
    { property: 'og:image', content: ogImage },
    { property: 'og:locale', content: ogLocale(locale.value) },
  ],
  script: [
    // FAQ 结构化数据（富结果展示已收缩，保留给 AI 搜索摘要抓取用）
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: costFaq.map(f => ({
          '@type': 'Question',
          name: f.q[locale.value] || f.q.en,
          acceptedAnswer: {
            '@type': 'Answer',
            text: f.a[locale.value] || f.a.en,
          },
        })),
      }),
    },
    // 面包屑结构化数据
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: t('city.home'), item: `${pub.siteUrl}/${locale.value}/` },
          { '@type': 'ListItem', position: 2, name: copy('title'), item: `${pub.siteUrl}/${locale.value}/tools/china-trip-cost-calculator/` },
        ],
      }),
    },
  ],
})
</script>

<template>
  <div>
    <!-- 页头：面包屑 + H1 + 引言（无大图，工具页首屏留给计算器） -->
    <header class="max-w-5xl mx-auto px-4 pt-10 pb-6">
      <nav :aria-label="t('city.breadcrumb')">
        <ol class="list-none flex flex-wrap items-center text-[13px] mb-4">
          <li>
            <NuxtLink :to="localePath('/')" class="text-brand hover:underline">{{ t('city.home') }}</NuxtLink>
            <span class="mx-1.5 text-ink-muted">/</span>
          </li>
          <li class="text-ink-muted">{{ copy('title') }}</li>
        </ol>
      </nav>
      <h1 class="text-3xl md:text-4xl font-bold text-ink tracking-tight mb-4">{{ copy('h1') }}</h1>
      <p class="text-base md:text-lg text-ink-body leading-relaxed max-w-3xl">{{ copy('intro') }}</p>
    </header>

    <!-- 计算器本体（SSG 静态直出默认城市对表格） -->
    <main class="max-w-5xl mx-auto px-4 pb-10">
      <CostCalculator />

      <!-- 来源与口径（三层证据纪律：快照日期 + 来源可查） -->
      <p class="mt-4 text-xs text-ink-muted leading-relaxed">{{ copy('sourceNote') }}</p>

      <!-- FAQ -->
      <section class="mt-12">
        <h2 class="text-2xl font-bold text-ink mb-4">❓ {{ copy('faqTitle') }}</h2>
        <details v-for="(item, i) in costFaq" :key="i" class="border border-slate-200 rounded-lg mb-2">
          <summary class="cursor-pointer select-none px-4 py-3 text-sm font-semibold text-ink">
            {{ item.q[locale] || item.q.en }}
          </summary>
          <p class="px-4 pb-4 text-sm text-ink-body leading-relaxed">
            {{ item.a[locale] || item.a.en }}
          </p>
        </details>
      </section>

      <!-- 反向转化 chips -->
      <nav class="mt-12 pt-8 border-t border-slate-200">
        <p class="text-xs font-semibold text-ink-muted uppercase tracking-wider mb-3">{{ copy('relatedTitle') }}</p>
        <div class="flex flex-wrap gap-2">
          <NuxtLink
            v-for="(link, i) in related"
            :key="i"
            :to="localePath(link.to)"
            class="text-sm text-brand bg-brand-tint hover:bg-brand hover:text-white px-4 py-2 rounded-full transition-colors"
          >
            {{ link.label[locale] || link.label.en }}
          </NuxtLink>
        </div>
      </nav>
    </main>
  </div>
</template>
