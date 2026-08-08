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
      <GuideSection
        zh="城市印象"
        en="At a Glance"
        :subtitle="c.tagline[locale]"
      />
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <!-- 文字介绍 -->
        <div class="lg:col-span-2">
          <p class="text-gray-600 text-[15px] leading-loose text-justify">
            {{ c.intro[locale] }}
          </p>
        </div>
        <!-- 城市图片 -->
        <div class="rounded-[14px] overflow-hidden shadow-xl">
          <img :src="c.heroImage" :alt="c.name[locale]" class="w-full h-[300px] object-cover">
        </div>
      </div>
      <!-- 关键信息盒：关键词 / 建议天数 / 最佳季节 / 城市底蕴 -->
      <div class="mt-10">
        <InfoPanel :city="c" />
      </div>
    </section>

    <!-- 亮点图廊 -->
    <section v-if="c.gallery && c.gallery.length" class="py-[70px] px-4 sm:px-[8%]">
      <GuideSection
        zh="亮点"
        en="Highlights"
        :subtitle="locale === 'zh' ? c.name[locale] + '精选瞬间' : 'Best moments in ' + c.name[locale]"
      />
      <GalleryStrip :images="c.gallery" :alt="c.name[locale]" />
    </section>

    <!-- 必游景点 -->
    <section class="py-[70px] px-4 sm:px-[8%]">
      <GuideSection
        zh="必游景点"
        en="Attractions"
        :subtitle="t('city.attractionsSubtitle', { name: c.name[locale] })"
      />
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
      <GuideSection
        zh="地道美食"
        en="Local Flavors"
        :subtitle="t('city.cuisineSubtitle', { name: c.name[locale] })"
      />
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
      <GuideSection
        zh="推荐行程"
        en="Itinerary"
        :subtitle="t('city.itinerarySubtitle', { name: c.name[locale] })"
      />
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
      <GuideSection
        zh="出行贴士"
        en="Travel Tips"
        :subtitle="t('city.tipsSubtitle')"
      />
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
