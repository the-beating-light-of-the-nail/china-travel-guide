<script setup lang="ts">
// 首页 - Hero搜索、快捷标签、热门目的地、精选Vlog、旅行瞬间瀑布流、精选攻略
const { public: pub } = useRuntimeConfig()
const { t, locale } = useI18n()
const localePath = useLocalePath()

// 静态数据：城市列表、精选攻略、精选Vlog、图片墙（构建时注入，无需运行时数据库）
import { getCities, getFeaturedGuides } from '~/data/travel-data'
import { getFeaturedVlogs, getPhotos } from '~/data/hub-data'
const cities = getCities()
const featuredGuides = getFeaturedGuides()
const featuredVlogs = getFeaturedVlogs()
// 图片墙取前 12 张
const momentPhotos = getPhotos().slice(0, 12)

// Hero 快捷标签：城市直达 / 主题筛选
const quickTags = [
  { label: () => t('home.quickCity'), to: { path: '/cities/chengdu' } },
  { label: () => t('home.quickRail'), to: { path: '/vlogs', query: { topic: 'transport' } } },
  { label: () => t('home.quickFood'), to: { path: '/vlogs', query: { topic: 'food' } } },
] as const

// 英雄区搜索关键词
const heroSearch = ref('')

function handleHeroSearch() {
  if (heroSearch.value.trim()) {
    navigateTo(localePath(`/vlogs?q=${encodeURIComponent(heroSearch.value.trim())}`))
  }
}

// 英雄背景图
const heroImage = 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=1600'

// SEO 元信息（含 hreflang）
const i18nHead = useLocaleHead()
useHead({
  title: t('home.seoTitle'),
  htmlAttrs: { lang: i18nHead.value.htmlAttrs?.lang },
  link: [...(i18nHead.value.link || [])],
  meta: [
    {
      name: 'description',
      content: t('home.seoDescription'),
    },
    { property: 'og:title', content: t('home.heroTitle') },
    {
      property: 'og:description',
      content: t('home.seoOgDescription'),
    },
    { property: 'og:type', content: 'website' },
    { property: 'og:image', content: heroImage },
    { property: 'og:locale', content: i18nHead.value.meta?.find((m: any) => m.property === 'og:locale')?.content || (ogLocale(locale.value)) },
  ],
  // 网站结构化数据 JSON-LD
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'With My Eyes',
        url: pub.siteUrl,
        description: 'Handpicked vlogs, guides & local services for travelers in China.',
        potentialAction: {
          '@type': 'SearchAction',
          target: `${pub.siteUrl}/vlogs?q={search_term_string}`,
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
      class="min-h-[520px] flex flex-col items-center justify-center text-white text-center px-5 py-[90px]"
      :style="`background: linear-gradient(rgba(10,15,26,0.72), rgba(10,15,26,0.85)), url('${heroImage}') center/cover;`"
    >
      <h1 class="text-3xl md:text-[52px] font-bold mb-5 md:mb-6 max-w-4xl leading-tight tracking-tight">
        {{ t('home.heroTitle') }}
      </h1>
      <p class="text-base md:text-lg text-slate-200 mb-9 tracking-wide">
        {{ t('home.heroSubtitle') }}
      </p>
      <!-- 搜索框（trip.com 式白底大搜索条） -->
      <div class="flex bg-white border border-slate-200 rounded-full p-1.5 w-[580px] max-w-[92%] shadow-2xl shadow-black/20 focus-within:border-brand transition-colors">
        <input
          v-model="heroSearch"
          type="text"
          :placeholder="t('search.heroPlaceholder')"
          class="flex-1 border-none outline-none bg-transparent px-6 py-3 text-[15px] rounded-full text-ink placeholder-slate-400"
          @keyup.enter="handleHeroSearch"
        >
        <button
          class="bg-brand text-white border-none px-8 py-3 rounded-full cursor-pointer text-[15px] hover:bg-brand-dark transition-colors font-medium"
          @click="handleHeroSearch"
        >
          {{ t('search.button') }}
        </button>
      </div>
      <!-- 快捷标签 -->
      <div class="flex gap-3 flex-wrap justify-center mt-6">
        <NuxtLink
          v-for="(tag, i) in quickTags"
          :key="i"
          :to="localePath(tag.to)"
          class="text-sky-300 hover:text-white text-sm transition-colors"
        >
          #{{ tag.label() }}
        </NuxtLink>
      </div>
    </section>

    <!-- 热门目的地 -->
    <section id="destinations" class="py-[70px] px-4 sm:px-[5%] scroll-mt-[90px]">
      <div class="flex items-end justify-between mb-10">
        <div>
          <h2 class="text-2xl md:text-3xl font-bold text-ink">{{ t('home.destinationsTitle') }}</h2>
          <p class="text-ink-muted text-sm mt-2">{{ t('home.destinationsSubtitle') }}</p>
        </div>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <CityCard
          v-for="city in cities"
          :key="city.slug"
          :city="city"
        />
      </div>
    </section>

    <!-- 精选 Vlog（横向滚动） -->
    <section class="py-[70px] px-4 sm:px-[5%] bg-white border-y border-slate-200">
      <div class="flex items-end justify-between mb-10 gap-4">
        <div>
          <h2 class="text-2xl md:text-3xl font-bold text-ink">{{ t('home.vlogsTitle') }}</h2>
          <p class="text-ink-muted text-sm mt-2">{{ t('home.vlogsSubtitle') }}</p>
        </div>
        <NuxtLink
          :to="localePath('/vlogs')"
          class="shrink-0 text-brand hover:text-brand-dark text-sm font-medium transition-colors whitespace-nowrap"
        >
          {{ t('home.viewAllVlogs') }}
        </NuxtLink>
      </div>
      <div class="flex gap-5 overflow-x-auto scroll-x-no-bar pb-2 -mx-1 px-1 snap-x">
        <div
          v-for="vlog in featuredVlogs"
          :key="vlog.id"
          class="w-[300px] shrink-0 snap-start"
        >
          <VlogCard :vlog="vlog" />
        </div>
      </div>
    </section>

    <!-- 旅行瞬间（瀑布流） -->
    <section class="py-[70px] px-4 sm:px-[5%]">
      <div class="flex items-end justify-between mb-10 gap-4">
        <div>
          <h2 class="text-2xl md:text-3xl font-bold text-ink">{{ t('home.momentsTitle') }}</h2>
          <p class="text-ink-muted text-sm mt-2">{{ t('home.momentsSubtitle') }}</p>
        </div>
        <NuxtLink
          :to="localePath('/photos')"
          class="shrink-0 text-brand hover:text-brand-dark text-sm font-medium transition-colors whitespace-nowrap"
        >
          {{ t('home.viewAllPhotos') }}
        </NuxtLink>
      </div>
      <div class="masonry">
        <div
          v-for="photo in momentPhotos"
          :key="photo.id"
          class="masonry-item group relative rounded-xl overflow-hidden"
        >
          <img
            :src="photo.image"
            :alt="photo.description[locale]"
            loading="lazy"
            class="w-full block transition-transform duration-500 group-hover:scale-105"
          >
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3.5">
            <div class="text-white text-sm font-semibold">{{ photo.location[locale] }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- 精选原创攻略 -->
    <section id="guides" class="py-[70px] px-4 sm:px-[5%] bg-white border-t border-slate-200 scroll-mt-[90px]">
      <div class="flex items-end justify-between mb-10 gap-4">
        <div>
          <h2 class="text-2xl md:text-3xl font-bold text-ink">{{ t('home.guidesTitle') }}</h2>
          <p class="text-ink-muted text-sm mt-2">{{ t('home.guidesSubtitle') }}</p>
        </div>
        <NuxtLink
          :to="localePath('/guides')"
          class="shrink-0 text-brand hover:text-brand-dark text-sm font-medium transition-colors whitespace-nowrap"
        >
          {{ t('home.viewAllGuides') }}
        </NuxtLink>
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
