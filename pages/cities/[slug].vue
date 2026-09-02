<script setup lang="ts">
// 城市详情页 - 面包屑、英雄区、sticky标签导航、总览/Vlog/攻略/图片/本地服务、相关目的地
const route = useRoute()
const { public: pub } = useRuntimeConfig()
const slug = route.params.slug as string
const { t, locale } = useI18n()
const localePath = useLocalePath()

// 静态数据：按 slug 查询城市详情与聚合内容（构建时注入，无需运行时数据库）
import { getCityBySlug, getCities } from '~/data/travel-data'
import { getVlogsByCity, getExternalGuidesByCity, getPhotosByCity, getServicesByCity } from '~/data/hub-data'
const city = getCityBySlug(slug)

// 城市不存在则 404
if (!city) {
  throw createError({ statusCode: 404, statusMessage: 'City not found', fatal: true })
}

const c = computed(() => city!)

// 聚合内容（按城市筛选）
const cityVlogs = computed(() => getVlogsByCity(slug))
const cityGuides = computed(() => getExternalGuidesByCity(slug))
const cityPhotos = computed(() => getPhotosByCity(slug))
const cityServices = computed(() => getServicesByCity(slug))

// 相关目的地（其他城市，最多 3 个）
const relatedCities = computed(() => getCities().filter(cty => cty.slug !== slug).slice(0, 3))

// 城市标签列表（按当前语言解析）
const cityTags = computed(() => {
  const localized = c.value.tags[locale.value]
  const tags = localized?.split(',').map(s => s.trim()).filter(Boolean)
  return tags || []
})

// 收藏状态（本次会话内有效）
const saved = ref(false)

// 攻略手风琴：默认展开第一条
const openGuideId = ref<number | null>(cityGuides.value.length ? cityGuides.value[0].id : null)

// 区域本地化名称
const regionName = computed(() => t(`regions.${c.value.region.en}`, c.value.region.en))

// 标签导航配置
const tabs = [
  { key: 'tabOverview', hash: '#overview' },
  { key: 'tabVlogs', hash: '#vlogs' },
  { key: 'tabGuides', hash: '#guides' },
  { key: 'tabPhotos', hash: '#photos' },
  { key: 'tabServices', hash: '#services' },
]

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
    <div class="py-4 px-4 sm:px-[5%] border-b border-slate-800 text-[13px] text-slate-400">
      <NuxtLink :to="localePath('/')" class="text-brand-light hover:text-white">{{ t('city.home') }}</NuxtLink>
      <span> / </span>
      <NuxtLink :to="localePath('/#destinations')" class="hover:text-white transition-colors">{{ t('nav.destinations') }}</NuxtLink>
      <span> / </span>
      <span class="text-slate-200">{{ c.name[locale] }}</span>
    </div>

    <!-- 城市英雄区 -->
    <section
      class="relative h-[460px] flex flex-col items-center justify-center text-white text-center px-5"
      :style="`background: linear-gradient(rgba(15,23,42,0.55), rgba(15,23,42,0.75)), url('${c.heroImage}') center/cover;`"
    >
      <h1 class="text-4xl md:text-5xl font-bold mb-3 tracking-[4px]">{{ c.name[locale] }}</h1>
      <div class="text-lg opacity-90 mb-5 tracking-wide">{{ c.tagline[locale] }}</div>
      <!-- 城市标签 -->
      <div class="flex gap-3 flex-wrap justify-center mb-7">
        <span
          v-for="tag in cityTags"
          :key="tag"
          class="bg-slate-900/60 backdrop-blur-sm px-4 py-1.5 rounded-full text-[13px] border border-slate-600 text-slate-200"
        >
          {{ tag }}
        </span>
      </div>
      <!-- 收藏按钮 -->
      <button
        class="flex items-center gap-2 bg-slate-900/60 backdrop-blur-sm border border-slate-600 hover:border-brand px-5 py-2.5 rounded-full text-sm transition-colors"
        :class="saved ? 'text-brand-light' : 'text-slate-200'"
        @click="saved = !saved"
      >
        <span>{{ saved ? '♥' : '♡' }}</span>
        <span>{{ saved ? t('city.saved') : t('city.saveTrip') }}</span>
      </button>
    </section>

    <!-- Sticky 标签导航 -->
    <nav class="sticky top-[70px] z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800">
      <ul class="list-none flex gap-1 overflow-x-auto scroll-x-no-bar px-4 sm:px-[5%]">
        <li v-for="tab in tabs" :key="tab.key">
          <a
            :href="tab.hash"
            class="inline-block px-4 py-3.5 text-sm text-slate-400 hover:text-white border-b-2 border-transparent hover:border-brand transition-colors whitespace-nowrap"
          >{{ t(`city.${tab.key}`) }}</a>
        </li>
      </ul>
    </nav>

    <!-- ===== 总览 ===== -->
    <section id="overview" class="py-[70px] px-4 sm:px-[5%] scroll-mt-[130px]">
      <GuideSection
        zh="城市印象"
        en="At a Glance"
        :subtitle="c.tagline[locale]"
      />
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <!-- 文字介绍 -->
        <div class="lg:col-span-2">
          <p class="text-slate-300 text-[15px] leading-loose text-justify">
            {{ c.intro[locale] }}
          </p>
        </div>
        <!-- 城市图片 -->
        <div class="rounded-[14px] overflow-hidden border border-slate-700 shadow-xl shadow-black/40">
          <img :src="c.heroImage" :alt="c.name[locale]" class="w-full h-[300px] object-cover">
        </div>
      </div>
      <!-- 关键信息盒：关键词 / 建议天数 / 最佳季节 / 城市底蕴 -->
      <div class="mt-10">
        <InfoPanel :city="c" />
      </div>

      <!-- 必游景点 -->
      <div class="mt-[70px]">
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
      </div>
    </section>

    <!-- 地道美食 -->
    <section class="py-[70px] px-4 sm:px-[5%] border-t border-slate-800">
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
    <section class="py-[70px] px-4 sm:px-[5%] border-t border-slate-800">
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
    <section class="py-[70px] px-4 sm:px-[5%] border-t border-slate-800">
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

    <!-- ===== Vlogs ===== -->
    <section id="vlogs" class="py-[70px] px-4 sm:px-[5%] border-t border-slate-800 scroll-mt-[130px]">
      <GuideSection
        zh="必看视频"
        en="Must-Watch Vlogs"
        :subtitle="t('city.vlogsSectionSubtitle', { name: c.name[locale] })"
      />
      <div v-if="cityVlogs.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <VlogCard
          v-for="vlog in cityVlogs"
          :key="vlog.id"
          :vlog="vlog"
        />
      </div>
      <p v-else class="text-slate-500 text-sm">
        —
      </p>
      <div class="mt-8 text-center">
        <NuxtLink
          :to="localePath({ path: '/vlogs', query: { city: slug } })"
          class="btn-secondary inline-block !py-2.5 text-sm"
        >
          {{ t('home.viewAllVlogs') }}
        </NuxtLink>
      </div>
    </section>

    <!-- ===== 攻略导航（手风琴） ===== -->
    <section id="guides" class="py-[70px] px-4 sm:px-[5%] border-t border-slate-800 scroll-mt-[130px]">
      <GuideSection
        zh="精选攻略导航"
        en="Curated Guides"
        :subtitle="t('city.guidesSectionSubtitle', { name: c.name[locale] })"
      />
      <div v-if="cityGuides.length" class="max-w-[900px] mx-auto space-y-3">
        <div
          v-for="guide in cityGuides"
          :key="guide.id"
          class="card-dark overflow-hidden"
        >
          <!-- 手风琴标题 -->
          <button
            class="w-full flex items-center gap-3 p-5 text-left cursor-pointer"
            @click="openGuideId = openGuideId === guide.id ? null : guide.id"
          >
            <span
              class="w-6 h-6 rounded-md flex items-center justify-center text-white text-xs font-bold shrink-0"
              :class="guide.sourceName.charCodeAt(0) % 2 === 0 ? 'bg-brand' : 'bg-accent'"
            >
              {{ guide.sourceName.slice(0, 1) }}
            </span>
            <span class="flex-1 min-w-0">
              <span class="block text-[15px] font-semibold text-slate-50 leading-snug">{{ guide.title[locale] }}</span>
              <span class="block text-xs text-slate-500 mt-1">{{ guide.sourceName }} · {{ guide.readTime[locale] }}</span>
            </span>
            <span
              class="text-slate-500 text-lg transition-transform duration-300 shrink-0"
              :class="{ 'rotate-180': openGuideId === guide.id }"
            >⌄</span>
          </button>
          <!-- 展开内容 -->
          <div v-if="openGuideId === guide.id" class="px-5 pb-5 border-t border-slate-700 pt-4">
            <p class="text-sm text-slate-400 leading-relaxed mb-3">
              {{ guide.summary[locale] }}
            </p>
            <div class="flex items-center justify-between">
              <span class="text-xs text-blue-400">{{ guide.tags[locale] }}</span>
              <a
                :href="guide.externalUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="text-sm text-brand hover:text-brand-light font-medium transition-colors"
              >
                {{ t('city.readOriginal') }}
              </a>
            </div>
          </div>
        </div>
      </div>
      <p v-else class="text-slate-500 text-sm">
        —
      </p>
      <div class="mt-8 text-center">
        <NuxtLink
          :to="localePath('/guides')"
          class="btn-secondary inline-block !py-2.5 text-sm"
        >
          {{ t('home.viewAllGuides') }}
        </NuxtLink>
      </div>
    </section>

    <!-- ===== 图片 ===== -->
    <section id="photos" class="py-[70px] px-4 sm:px-[5%] border-t border-slate-800 scroll-mt-[130px]">
      <GuideSection
        zh="城市瞬间"
        en="Moments"
        :subtitle="t('city.photosSectionTitle', { name: c.name[locale] })"
      />
      <div v-if="cityPhotos.length" class="masonry">
        <div
          v-for="photo in cityPhotos"
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
            <div>
              <div class="text-white text-sm font-semibold">{{ photo.location[locale] }}</div>
              <div class="text-blue-400 text-xs mt-0.5">{{ photo.tags[locale] }}</div>
            </div>
          </div>
        </div>
      </div>
      <p v-else class="text-slate-500 text-sm">
        —
      </p>
      <div class="mt-8 text-center">
        <NuxtLink
          :to="localePath('/photos')"
          class="btn-secondary inline-block !py-2.5 text-sm"
        >
          {{ t('home.viewAllPhotos') }}
        </NuxtLink>
      </div>
    </section>

    <!-- ===== 本地服务 ===== -->
    <section id="services" class="py-[70px] px-4 sm:px-[5%] border-t border-slate-800 scroll-mt-[130px]">
      <GuideSection
        zh="本地合作伙伴"
        en="Local Partners"
        :subtitle="t('city.partnersSectionSubtitle', { name: c.name[locale] })"
      />
      <div v-if="cityServices.length" class="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-[1100px] mx-auto">
        <PartnerCard
          v-for="service in cityServices"
          :key="service.id"
          :service="service"
        />
      </div>
      <p v-else class="text-slate-500 text-sm">
        —
      </p>
      <div class="mt-8 text-center">
        <NuxtLink
          :to="localePath('/services')"
          class="btn-secondary inline-block !py-2.5 text-sm"
        >
          {{ t('nav.services') }} →
        </NuxtLink>
      </div>
    </section>

    <!-- 相关目的地 -->
    <section class="py-[70px] px-4 sm:px-[5%] border-t border-slate-800">
      <GuideSection
        zh="更多目的地"
        en="More Destinations"
        :subtitle="regionName"
      />
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <CityCard
          v-for="cty in relatedCities"
          :key="cty.slug"
          :city="cty"
        />
      </div>
    </section>
  </div>
</template>
