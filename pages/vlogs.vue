<script setup lang="ts">
// Vlog 聚合页 - 平台/主题筛选、排序、响应式网格、趋势榜、城市云、加载更多
const { t, locale } = useI18n()
const localePath = useLocalePath()
const route = useRoute()
const { public: pub } = useRuntimeConfig()

import { getVlogs } from '~/data/hub-data'
import { getCities } from '~/data/travel-data'

const allVlogs = getVlogs()
const allCities = getCities()

// ===== 筛选状态（从 URL query 初始化，支持 /vlogs?city=chengdu 等直达） =====
const keyword = ref((route.query.q as string) || '')
const platform = ref((route.query.platform as string) || 'all')
const topic = ref((route.query.topic as string) || 'all')
const citySlug = ref((route.query.city as string) || 'all')
const sortBy = ref('picks')

// 已加载数量（Load More 分页）
const visibleCount = ref(8)
const PAGE_SIZE = 8

// 播放量字符串解析为数字（"1.2M views" / "120万播放" → 1200000）
function parseViews(views: string): number {
  const m = views.match(/([\d.]+)\s*([MK万])/i)
  if (!m) return parseInt(views.replace(/\D/g, ''), 10) || 0
  const n = parseFloat(m[1])
  if (/M/i.test(m[2])) return n * 1_000_000
  if (/K/i.test(m[2])) return n * 1_000
  if (m[2] === '万') return n * 10_000
  return n
}

// 策展权重（编辑推荐）：featured 优先，其次播放量
function curationScore(v: (typeof allVlogs)[number]): number {
  return (v.featured ? 1_000_000_000 : 0) + parseViews(v.views.en)
}

// 筛选 + 排序结果
const filteredVlogs = computed(() => {
  let list = allVlogs.filter(v =>
    (platform.value === 'all' || v.platform === platform.value)
    && (topic.value === 'all' || v.topic === topic.value)
    && (citySlug.value === 'all' || v.citySlug === citySlug.value)
  )
  const kw = keyword.value.trim().toLowerCase()
  if (kw) {
    list = list.filter(v =>
      v.title[locale.value].toLowerCase().includes(kw)
      || v.vloggerName.toLowerCase().includes(kw)
      || v.tags[locale.value].toLowerCase().includes(kw)
    )
  }
  const sorted = [...list]
  if (sortBy.value === 'views') sorted.sort((a, b) => parseViews(b.views.en) - parseViews(a.views.en))
  else if (sortBy.value === 'latest') sorted.reverse()
  else sorted.sort((a, b) => curationScore(b) - curationScore(a))
  return sorted
})

// 当前可见的 Vlog（分页切片）
const visibleVlogs = computed(() => filteredVlogs.value.slice(0, visibleCount.value))

// 趋势榜：按播放量取前 5
const trendingVlogs = computed(() =>
  [...allVlogs].sort((a, b) => parseViews(b.views.en) - parseViews(a.views.en)).slice(0, 5)
)

// 城市名映射
function cityName(slug: string): string {
  const c = allCities.find(c => c.slug === slug)
  return c ? c.name[locale.value] : slug
}

// 筛选变化时重置分页
watch([platform, topic, citySlug, keyword, sortBy], () => {
  visibleCount.value = PAGE_SIZE
})

function loadMore() {
  visibleCount.value += PAGE_SIZE
}

// SEO 元信息（含 hreflang）
const i18nHead = useLocaleHead()
useHead({
  title: `${t('vlogs.pageTitle')} | ${t('brand.full')}`,
  htmlAttrs: { lang: i18nHead.value.htmlAttrs?.lang },
  link: [...(i18nHead.value.link || [])],
  meta: [
    { name: 'description', content: t('vlogs.pageSubtitle') },
    { property: 'og:title', content: t('vlogs.pageTitle') },
    { property: 'og:description', content: t('vlogs.pageSubtitle') },
    { property: 'og:type', content: 'website' },
    { property: 'og:locale', content: ogLocale(locale.value) },
    { property: 'og:image', content: `${pub.siteUrl}${allVlogs[0]?.thumbnail || ''}` },
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: t('vlogs.pageTitle'),
        description: t('vlogs.pageSubtitle'),
        url: `${pub.siteUrl}/${locale.value}/vlogs`,
        inLanguage: isoLocale(locale.value),
      }),
    },
  ],
})
</script>

<template>
  <div class="py-10 md:py-14 px-4 sm:px-[5%]">
    <!-- 顶部筛选栏 -->
    <div class="flex flex-col lg:flex-row lg:items-end justify-between gap-5 mb-10">
      <div>
        <h1 class="text-3xl md:text-4xl font-bold text-slate-50">
          {{ t('vlogs.pageTitle') }}
        </h1>
        <p class="text-slate-400 text-sm mt-2">
          {{ t('vlogs.pageSubtitle') }}
        </p>
      </div>

      <!-- 筛选器组 -->
      <div class="flex flex-wrap gap-3">
        <select v-model="platform" class="input-dark px-3 py-2 text-sm cursor-pointer">
          <option value="all">{{ t('vlogs.allPlatforms') }}</option>
          <option value="youtube">{{ t('vlogs.platforms.youtube') }}</option>
          <option value="bilibili">{{ t('vlogs.platforms.bilibili') }}</option>
        </select>
        <select v-model="topic" class="input-dark px-3 py-2 text-sm cursor-pointer">
          <option value="all">{{ t('vlogs.allTopics') }}</option>
          <option value="food">{{ t('vlogs.topics.food') }}</option>
          <option value="transport">{{ t('vlogs.topics.transport') }}</option>
          <option value="culture">{{ t('vlogs.topics.culture') }}</option>
          <option value="nature">{{ t('vlogs.topics.nature') }}</option>
        </select>
        <select v-model="sortBy" class="input-dark px-3 py-2 text-sm cursor-pointer">
          <option value="picks">{{ t('vlogs.sortPicks') }}</option>
          <option value="latest">{{ t('vlogs.sortLatest') }}</option>
          <option value="views">{{ t('vlogs.sortViews') }}</option>
        </select>
      </div>
    </div>

    <div class="flex gap-10">
      <!-- 主内容区 -->
      <div class="flex-1 min-w-0">
        <!-- 搜索关键词回显（来自导航/首页搜索） -->
        <div v-if="keyword" class="mb-6 flex items-center gap-3 text-sm text-slate-400">
          <span>“{{ keyword }}”</span>
          <button
            class="text-brand hover:text-brand-light transition-colors"
            @click="keyword = ''"
          >
            ×
          </button>
        </div>

        <!-- Vlog 网格：桌面4列 / 平板2列 / 手机1列 -->
        <div
          v-if="visibleVlogs.length"
          class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6"
        >
          <VlogCard
            v-for="vlog in visibleVlogs"
            :key="vlog.id"
            :vlog="vlog"
          />
        </div>
        <p v-else class="text-slate-500 text-sm py-16 text-center">
          {{ t('vlogs.noResults') }}
        </p>

        <!-- 加载更多 -->
        <div v-if="visibleCount < filteredVlogs.length" class="mt-10 text-center">
          <button class="btn-secondary" @click="loadMore">
            {{ t('vlogs.loadMore') }}
          </button>
        </div>
      </div>

      <!-- 侧边栏（桌面端） -->
      <aside class="hidden xl:block w-[280px] shrink-0 space-y-8">
        <!-- 趋势榜 -->
        <div>
          <h3 class="text-base font-semibold text-slate-50 mb-4">
            🔥 {{ t('vlogs.trending') }}
          </h3>
          <ul class="list-none space-y-4">
            <li v-for="(vlog, idx) in trendingVlogs" :key="vlog.id">
              <a
                :href="vlog.externalUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="flex gap-3 group"
              >
                <span class="text-2xl font-bold text-slate-700 group-hover:text-brand transition-colors w-7 shrink-0">
                  {{ idx + 1 }}
                </span>
                <span class="min-w-0">
                  <span class="block text-[13px] text-slate-200 leading-snug line-clamp-2 group-hover:text-brand-light transition-colors">
                    {{ vlog.title[locale] }}
                  </span>
                  <span class="block text-xs text-slate-500 mt-1">
                    {{ vlog.vloggerName }} · {{ vlog.views[locale] }}
                  </span>
                </span>
              </a>
            </li>
          </ul>
        </div>

        <!-- 城市云 -->
        <div class="pt-6 border-t border-slate-800">
          <h3 class="text-base font-semibold text-slate-50 mb-4">
            📍 {{ t('vlogs.filterByCity') }}
          </h3>
          <div class="flex flex-wrap gap-2">
            <button
              class="chip cursor-pointer transition-colors"
              :class="{ 'bg-brand text-white': citySlug === 'all' }"
              @click="citySlug = 'all'"
            >
              {{ t('vlogs.allCities') }}
            </button>
            <button
              v-for="city in allCities"
              :key="city.slug"
              class="chip cursor-pointer transition-colors"
              :class="{ 'bg-brand text-white': citySlug === city.slug }"
              @click="citySlug = city.slug"
            >
              {{ city.name[locale] }}
            </button>
          </div>
        </div>
      </aside>
    </div>
  </div>
</template>
