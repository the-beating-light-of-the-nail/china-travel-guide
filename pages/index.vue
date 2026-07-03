<script setup lang="ts">
// 首页 - 英雄区搜索、热门目的地、攻略分类、精选攻略
const { public: pub } = useRuntimeConfig()
const { t, locale } = useI18n()
const localePath = useLocalePath()

// 静态数据：城市列表与精选攻略（构建时注入，无需运行时数据库）
import { getCities, getFeaturedGuides } from '~/data/travel-data'
const cities = getCities()
const featuredGuides = getFeaturedGuides()

// 攻略分类配置（key 对应 locales 中的分类文案）
const categories = [
  { icon: '🏯', key: 'history' },
  { icon: '🏔️', key: 'nature' },
  { icon: '🍜', key: 'food' },
  { icon: '👨‍👩‍👧', key: 'family' },
  { icon: '💑', key: 'romantic' },
  { icon: '🎒', key: 'budget' },
]

// 英雄区搜索关键词
const heroSearch = ref('')

function handleHeroSearch() {
  if (heroSearch.value.trim()) {
    navigateTo(localePath(`/about?q=${encodeURIComponent(heroSearch.value.trim())}`))
  }
}

// 英雄背景图
const heroImage = 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=1600'

// SEO 元信息（含 hreflang）
const i18nHead = useLocaleHead()
useHead({
  title: locale.value === 'zh'
    ? '华夏行旅 - 中国旅游攻略总览'
    : 'China Travel Guide - Explore the Wonders of China',
  htmlAttrs: { lang: i18nHead.value.htmlAttrs?.lang },
  link: [...(i18nHead.value.link || [])],
  meta: [
    {
      name: 'description',
      content: locale.value === 'zh'
        ? '探索中国，提供北京、西安、成都等热门城市深度攻略，涵盖景点、美食、行程与实用贴士。'
        : 'Discover China with in-depth travel guides for top cities including Beijing, Xi\'an, and Chengdu. Attractions, food, itineraries, and practical tips for international travelers.',
    },
    { property: 'og:title', content: t('home.heroTitle') },
    {
      property: 'og:description',
      content: locale.value === 'zh'
        ? '北京、西安、成都等地深度攻略，助你规划完美的中国之旅。'
        : 'In-depth travel guides for Beijing, Xi\'an, Chengdu and more. Plan your perfect China trip.',
    },
    { property: 'og:type', content: 'website' },
    { property: 'og:image', content: heroImage },
    { property: 'og:locale', content: i18nHead.value.meta?.find((m: any) => m.property === 'og:locale')?.content || (locale.value === 'zh' ? 'zh_CN' : 'en_US') },
  ],
  // 网站结构化数据 JSON-LD
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'China Travel Guide',
        url: pub.siteUrl,
        description: 'In-depth travel guides for exploring China.',
        potentialAction: {
          '@type': 'SearchAction',
          target: `${pub.siteUrl}/?q={search_term_string}`,
          'query-input': 'required name=search_term_string',
        },
      }),
    },
  ],
})
</script>

<template>
  <div>
    <!-- 英雄横幅区 -->
    <section
      class="h-[520px] flex flex-col items-center justify-center text-white text-center px-5"
      :style="`background: linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.35)), url('${heroImage}') center/cover;`"
    >
      <h1 class="text-4xl md:text-[52px] font-bold mb-4 tracking-[6px]">
        {{ t('home.heroTitle') }}
      </h1>
      <p class="text-lg opacity-90 mb-8 tracking-wide">
        {{ t('home.heroSubtitle') }}
      </p>
      <!-- 搜索框 -->
      <div class="flex bg-white rounded-full p-1.5 w-[560px] max-w-[90%] shadow-2xl">
        <input
          v-model="heroSearch"
          type="text"
          :placeholder="t('search.heroPlaceholder')"
          class="flex-1 border-none outline-none px-6 py-3 text-[15px] rounded-full text-gray-800"
          @keyup.enter="handleHeroSearch"
        >
        <button
          class="bg-accent text-white border-none px-8 py-3 rounded-full cursor-pointer text-[15px] hover:bg-accent-dark transition-colors"
          @click="handleHeroSearch"
        >
          {{ t('search.button') }}
        </button>
      </div>
    </section>

    <!-- 热门目的地 -->
    <section id="destinations" class="py-[70px] px-4 sm:px-[8%]">
      <div class="section-title">
        <h2>{{ t('home.destinationsTitle') }}</h2>
        <div class="subtitle">{{ t('home.destinationsSubtitle') }}</div>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <CityCard
          v-for="city in cities"
          :key="city.slug"
          :city="city"
        />
      </div>
    </section>

    <!-- 攻略分类 -->
    <section class="py-[70px] px-4 sm:px-[8%] bg-white">
      <div class="section-title">
        <h2>{{ t('home.categoriesTitle') }}</h2>
        <div class="subtitle">{{ t('home.categoriesSubtitle') }}</div>
      </div>
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
        <div
          v-for="cat in categories"
          :key="cat.key"
          class="text-center p-[30px] rounded-xl bg-gray-50 transition-all duration-300 cursor-pointer hover:bg-brand hover:text-white hover:-translate-y-1"
        >
          <div class="text-4xl mb-3">{{ cat.icon }}</div>
          <h4 class="text-base mb-1 font-semibold">{{ t(`categories.${cat.key}.title`) }}</h4>
          <span class="text-xs text-gray-400">{{ t(`categories.${cat.key}.desc`) }}</span>
        </div>
      </div>
    </section>

    <!-- 精选攻略 -->
    <section id="guides" class="py-[70px] px-4 sm:px-[8%]">
      <div class="section-title">
        <h2>{{ t('home.guidesTitle') }}</h2>
        <div class="subtitle">{{ t('home.guidesSubtitle') }}</div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
        <GuideCard
          v-for="guide in featuredGuides"
          :key="guide.slug"
          :guide="guide"
        />
      </div>
    </section>
  </div>
</template>
