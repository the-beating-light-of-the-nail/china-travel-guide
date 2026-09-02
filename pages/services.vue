<script setup lang="ts">
// 本地服务商目录页 - 搜索、城市/类型/语言筛选、列表/网格视图切换
const { t, locale } = useI18n()
const localePath = useLocalePath()
const route = useRoute()
const { public: pub } = useRuntimeConfig()

import { getServices } from '~/data/hub-data'
import { getCities } from '~/data/travel-data'

const allServices = getServices()
const allCities = getCities()

// 服务类型与语言选项
const serviceTypes = ['driver', 'guide', 'photographer', 'agency'] as const
const languageOptions = ['English', 'Chinese', 'French', 'Spanish', 'Japanese']

// ===== 筛选状态（从 URL query 初始化） =====
const keyword = ref((route.query.q as string) || '')
const citySlug = ref((route.query.city as string) || 'all')
const serviceType = ref((route.query.type as string) || 'all')
const language = ref('all')

// 视图模式：列表 / 网格
const viewMode = ref<'list' | 'grid'>('list')

// 筛选结果
const filteredServices = computed(() => {
  let list = allServices.filter(s =>
    (citySlug.value === 'all' || s.cities.includes(citySlug.value))
    && (serviceType.value === 'all' || s.type === serviceType.value)
    && (language.value === 'all' || s.languages.includes(language.value))
  )
  const kw = keyword.value.trim().toLowerCase()
  if (kw) {
    list = list.filter(s =>
      s.name.toLowerCase().includes(kw)
      || s.intro[locale.value].toLowerCase().includes(kw)
      || s.tags[locale.value].toLowerCase().includes(kw)
    )
  }
  // 认证优先，其次评分
  return [...list].sort((a, b) =>
    (Number(b.isVerified) - Number(a.isVerified)) || (b.rating - a.rating)
  )
})

// 城市名映射
function cityName(slug: string): string {
  const c = allCities.find(c => c.slug === slug)
  return c ? c.name[locale.value] : slug
}

// SEO 元信息（含 hreflang）
const i18nHead = useLocaleHead()
useHead({
  title: `${t('services.pageTitle')} | ChinaTravelHub`,
  htmlAttrs: { lang: i18nHead.value.htmlAttrs?.lang },
  link: [...(i18nHead.value.link || [])],
  meta: [
    { name: 'description', content: t('services.pageSubtitle') },
    { property: 'og:title', content: t('services.pageTitle') },
    { property: 'og:description', content: t('services.pageSubtitle') },
    { property: 'og:type', content: 'website' },
    { property: 'og:locale', content: locale.value === 'zh' ? 'zh_CN' : 'en_US' },
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: t('services.pageTitle'),
        description: t('services.pageSubtitle'),
        url: `${pub.siteUrl}/${locale.value}/services`,
        inLanguage: locale.value === 'zh' ? 'zh-CN' : 'en-US',
      }),
    },
  ],
})
</script>

<template>
  <div class="py-10 md:py-14 px-4 sm:px-[5%]">
    <!-- 顶部：标题 + 搜索框 -->
    <div class="max-w-3xl mb-8">
      <h1 class="text-3xl md:text-4xl font-bold text-slate-50">
        {{ t('services.pageTitle') }}
      </h1>
      <p class="text-slate-400 text-sm mt-2 mb-6">
        {{ t('services.pageSubtitle') }}
      </p>
      <input
        v-model="keyword"
        type="text"
        :placeholder="t('services.searchPlaceholder')"
        class="input-dark w-full px-5 py-3 text-sm"
      >
    </div>

    <!-- 筛选栏 + 视图切换 -->
    <div class="flex flex-wrap items-center gap-3 mb-10">
      <select v-model="citySlug" class="input-dark px-3 py-2 text-sm cursor-pointer">
        <option value="all">{{ t('services.allCities') }}</option>
        <option v-for="city in allCities" :key="city.slug" :value="city.slug">
          {{ city.name[locale] }}
        </option>
      </select>
      <select v-model="serviceType" class="input-dark px-3 py-2 text-sm cursor-pointer">
        <option value="all">{{ t('services.allTypes') }}</option>
        <option v-for="type in serviceTypes" :key="type" :value="type">
          {{ t(`services.types.${type}`) }}
        </option>
      </select>
      <select v-model="language" class="input-dark px-3 py-2 text-sm cursor-pointer">
        <option value="all">{{ t('services.allLanguages') }}</option>
        <option v-for="lang in languageOptions" :key="lang" :value="lang">
          {{ lang }}
        </option>
      </select>

      <!-- 视图切换 -->
      <div class="ml-auto flex rounded-lg border border-slate-600 overflow-hidden">
        <button
          class="px-3.5 py-2 text-sm transition-colors"
          :class="viewMode === 'list' ? 'bg-brand text-white' : 'text-slate-300 hover:text-white'"
          @click="viewMode = 'list'"
        >
          ☰ {{ t('services.listLabel') }}
        </button>
        <button
          class="px-3.5 py-2 text-sm transition-colors"
          :class="viewMode === 'grid' ? 'bg-brand text-white' : 'text-slate-300 hover:text-white'"
          @click="viewMode = 'grid'"
        >
          ▦ {{ t('services.gridLabel') }}
        </button>
      </div>
    </div>

    <!-- 服务商列表 / 网格 -->
    <div
      v-if="filteredServices.length"
      class="grid gap-6"
      :class="viewMode === 'list' ? 'grid-cols-1 max-w-[900px] mx-auto' : 'grid-cols-1 lg:grid-cols-2'"
    >
      <PartnerCard
        v-for="service in filteredServices"
        :key="service.id"
        :service="service"
      />
    </div>
    <p v-else class="text-slate-500 text-sm py-16 text-center">
      {{ t('services.noResults') }}
    </p>
  </div>
</template>
