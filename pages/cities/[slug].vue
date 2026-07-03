<script setup lang="ts">
// 城市详情页 - 英雄区、城市印象、景点、美食、行程、贴士
const route = useRoute()
const { public: pub } = useRuntimeConfig()
const slug = route.params.slug as string
const { t, locale } = useI18n()
const localePath = useLocalePath()

// 静态数据：按 slug 查询城市详情（构建时注入，无需运行时数据库）
import { getCityBySlug } from '~/data/travel-data'
const city = getCityBySlug(slug)

// 城市不存在则 404
if (!city) {
  throw createError({ statusCode: 404, statusMessage: 'City not found', fatal: true })
}

const c = computed(() => city!)

// 城市标签列表（按当前语言解析）
const cityTags = computed(() => {
  const localized = c.value.tags[locale.value]
  const tags = localized?.split(',').map(s => s.trim()).filter(Boolean)
  return tags || []
})

// 城市印象统计数据
const stats = computed(() => [
  { value: c.value.duration[locale.value], label: t('city.statDuration') },
  { value: c.value.bestSeason[locale.value], label: t('city.statSeason') },
  { value: c.value.history[locale.value], label: t('city.statHistory') },
])

// 区域本地化名称
const regionName = computed(() => t(`regions.${c.value.region.en}`, c.value.region.en))

// SEO 元信息（含 hreflang）
const i18nHead = useLocaleHead()
useHead({
  title: `${c.value.name[locale.value]} | ${c.value.tagline[locale.value]}`,
  htmlAttrs: { lang: i18nHead.value.htmlAttrs?.lang },
  link: [...(i18nHead.value.link || [])],
  meta: [
    { name: 'description', content: c.value.description[locale.value] },
    { property: 'og:title', content: `${c.value.name[locale.value]} Travel Guide` },
    { property: 'og:description', content: c.value.description[locale.value] },
    { property: 'og:type', content: 'article' },
    { property: 'og:image', content: c.value.heroImage },
    { property: 'og:locale', content: locale.value === 'zh' ? 'zh_CN' : 'en_US' },
  ],
  script: [
    // 旅游目的地结构化数据 JSON-LD
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'TouristDestination',
        name: c.value.name[locale.value],
        description: c.value.description[locale.value],
        image: c.value.heroImage,
        url: `${pub.siteUrl}/${locale.value}/cities/${c.value.slug}`,
        containedInPlace: {
          '@type': 'Country',
          name: 'China',
        },
      }),
    },
  ],
})
</script>

<template>
  <div v-if="city">
    <!-- 面包屑 -->
    <div class="py-4 px-4 sm:px-[8%] bg-white border-b border-gray-100 text-[13px] text-gray-500">
      <NuxtLink :to="localePath('/')" class="text-brand">{{ t('city.home') }}</NuxtLink>
      <span> / </span>
      <span>{{ regionName }}</span>
      <span> / </span>
      <span class="text-gray-800">{{ c.name[locale] }}</span>
    </div>

    <!-- 城市英雄区 -->
    <section
      class="h-[460px] flex flex-col items-center justify-center text-white text-center px-5"
      :style="`background: linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.45)), url('${c.heroImage}') center/cover;`"
    >
      <h1 class="text-4xl md:text-5xl font-bold mb-3 tracking-[6px]">{{ c.name[locale] }}</h1>
      <div class="text-lg opacity-90 mb-5 tracking-wide">{{ c.tagline[locale] }}</div>
      <!-- 城市标签 -->
      <div class="flex gap-3 flex-wrap justify-center">
        <span
          v-for="tag in cityTags"
          :key="tag"
          class="bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full text-[13px] border border-white/30"
        >
          {{ tag }}
        </span>
      </div>
    </section>

    <!-- 城市印象 -->
    <section class="py-[70px] px-4 sm:px-[8%] bg-white">
      <div class="section-title">
        <h2>{{ t('city.overviewTitle') }}</h2>
        <div class="subtitle">{{ c.tagline[locale] }}</div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-[50px] items-center">
        <!-- 文字介绍 -->
        <div>
          <h3 class="text-2xl text-brand mb-5 font-semibold">
            {{ t('city.atAGlance', { name: c.name[locale] }) }}
          </h3>
          <p class="text-gray-600 mb-4 text-justify text-[15px] leading-relaxed">
            {{ c.intro[locale] }}
          </p>
          <!-- 统计数据 -->
          <div class="grid grid-cols-3 gap-5 mt-[30px] text-center">
            <div v-for="stat in stats" :key="stat.label" class="stat-item">
              <h4 class="text-lg text-accent mb-1 font-bold">{{ stat.value }}</h4>
              <span class="text-[13px] text-gray-500">{{ stat.label }}</span>
            </div>
          </div>
        </div>
        <!-- 城市图片 -->
        <div class="rounded-[14px] overflow-hidden shadow-xl">
          <img :src="c.heroImage" :alt="c.name[locale]" class="w-full h-[380px] object-cover">
        </div>
      </div>
    </section>

    <!-- 必游景点 -->
    <section class="py-[70px] px-4 sm:px-[8%]">
      <div class="section-title">
        <h2>{{ t('city.attractionsTitle') }}</h2>
        <div class="subtitle">{{ t('city.attractionsSubtitle', { name: c.name[locale] }) }}</div>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <AttractionCard
          v-for="attraction in c.attractions"
          :key="attraction.id"
          :attraction="attraction"
        />
      </div>
    </section>

    <!-- 地道美食 -->
    <section class="py-[70px] px-4 sm:px-[8%] bg-white">
      <div class="section-title">
        <h2>{{ t('city.cuisineTitle') }}</h2>
        <div class="subtitle">{{ t('city.cuisineSubtitle', { name: c.name[locale] }) }}</div>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <FoodCard
          v-for="food in c.foods"
          :key="food.id"
          :food="food"
        />
      </div>
    </section>

    <!-- 推荐行程 -->
    <section class="py-[70px] px-4 sm:px-[8%]">
      <div class="section-title">
        <h2>{{ t('city.itineraryTitle') }}</h2>
        <div class="subtitle">{{ t('city.itinerarySubtitle', { name: c.name[locale] }) }}</div>
      </div>
      <div class="max-w-[900px] mx-auto">
        <ItineraryBlock
          v-for="it in c.itineraries"
          :key="it.id"
          :itinerary="it"
        />
      </div>
    </section>

    <!-- 出行贴士 -->
    <section class="py-[70px] px-4 sm:px-[8%] bg-white">
      <div class="section-title">
        <h2>{{ t('city.tipsTitle') }}</h2>
        <div class="subtitle">{{ t('city.tipsSubtitle') }}</div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <TipCard
          v-for="tip in c.tips"
          :key="tip.id"
          :tip="tip"
        />
      </div>
    </section>
  </div>
</template>
