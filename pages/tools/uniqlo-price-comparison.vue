<script setup lang="ts">
// 优衣库中国比价工具页（/tools/uniqlo-price-comparison/）
// 选题依据：GSC 出现德语查询 "ist uniqlo in china günstiger"（0→1 点击，2026-11），
// 落点此前只有 /shopping/ 全景页的一句话级覆盖；本页为「价格对比工具」意图分层，
// 与 shopping / what-to-buy / tax-refund / cost-calculator 互链成簇。
// 文案策略：en 全量 + zh/ja 全量，其余 7 语种英文回退（与 cost-calculator 同策略）。
import { uniqloPageCopy, uniqloFaq } from '~/data/uniqlo-data'

const { t, locale } = useI18n()
const localePath = useLocalePath()
const { public: pub } = useRuntimeConfig()

const i18nHead = useLocaleHead()
const copy = (k: keyof typeof uniqloPageCopy) => uniqloPageCopy[k][locale.value] || uniqloPageCopy[k].en
const ogImage = shareImageUrl('/images/shopping/uniqlo-linen.jpg', pub.siteUrl)

// 反向转化 chips：购物意图流量导回内容页与工具页（静态映射）
const related = [
  {
    to: '/guides/what-to-buy-in-china',
    label: { en: 'What to Buy in China', zh: '在中国买什么最值', ja: '中国で買うべきもの' },
  },
  {
    to: '/guides/china-tax-refund-guide',
    label: { en: 'China Tax Refund Guide', zh: '离境退税全攻略', ja: '中国の税還付ガイド' },
  },
  { to: '/shopping', label: { en: 'Shopping Directory', zh: '购物清单', ja: 'ショッピング一覧' } },
  {
    to: '/tools/china-trip-cost-calculator',
    label: { en: 'China Trip Cost Calculator', zh: '中国旅行物价对比器', ja: '中国旅行費用計算ツール' },
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
        mainEntity: uniqloFaq.map(f => ({
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
          { '@type': 'ListItem', position: 2, name: copy('title'), item: `${pub.siteUrl}/${locale.value}/tools/uniqlo-price-comparison/` },
        ],
      }),
    },
  ],
})
</script>

<template>
  <div>
    <!-- 页头：面包屑 + H1 + 引言（无大图，工具页首屏留给对比器） -->
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

    <!-- 对比器本体（SSG 静态直出默认市场表格） -->
    <main class="max-w-5xl mx-auto px-4 pb-10">
      <UniqloComparator />

      <!-- 来源与口径（三层证据纪律：快照日期 + 每格官网可溯源） -->
      <p class="mt-4 text-xs text-ink-muted leading-relaxed">{{ copy('sourceNote') }}</p>

      <!-- FAQ -->
      <section class="mt-12">
        <h2 class="text-2xl font-bold text-ink mb-4">❓ {{ copy('faqTitle') }}</h2>
        <details v-for="(item, i) in uniqloFaq" :key="i" class="border border-slate-200 rounded-lg mb-2">
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
