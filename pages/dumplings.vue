<script setup lang="ts">
// 饺子图鉴聚合页 - 做法筛选、城市云、辣度筛选、关键词搜索、深度指南导流
const { t, locale } = useI18n()
const localePath = useLocalePath()
const route = useRoute()
const { public: pub } = useRuntimeConfig()

import { getDumplingItems } from '~/data/dumpling-data'
import type { DumplingCategory } from '~/data/dumpling-data'
import { getCities, getGuideBySlug } from '~/data/travel-data'

const allItems = getDumplingItems()
const allCities = getCities()

// ===== 筛选状态（从 URL query 初始化，支持 /dumplings?category=steamed 直达） =====
const keyword = ref((route.query.q as string) || '')
const category = ref((route.query.category as string) || 'all')
const citySlug = ref((route.query.city as string) || 'all')
const vegOnly = ref(false)

// 已加载数量（Load More 分页）
const visibleCount = ref(9)
const PAGE_SIZE = 9

const categories: DumplingCategory[] = ['boiled', 'pan-fried', 'steamed', 'soup', 'sweet']

// 筛选结果（编辑精选优先，其余保持源数据顺序）
const filteredItems = computed(() => {
  let list = allItems.filter(d =>
    (category.value === 'all' || d.category === category.value)
    && (citySlug.value === 'all' || d.citySlug === citySlug.value)
    && (!vegOnly.value || d.vegOption)
  )
  const kw = keyword.value.trim().toLowerCase()
  if (kw) {
    list = list.filter(d =>
      d.name[locale.value].toLowerCase().includes(kw)
      || d.tagline[locale.value].toLowerCase().includes(kw)
      || d.description[locale.value].toLowerCase().includes(kw)
    )
  }
  return [...list].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
})

// 当前可见的条目（分页切片）
const visibleItems = computed(() => filteredItems.value.slice(0, visibleCount.value))

// 城市名映射
function cityName(slug: string): string {
  const c = allCities.find(c => c.slug === slug)
  return c ? c.name[locale.value] : slug
}

// 侧边栏深度指南（饺子指南 + 发酵白菜宇宙 + 成都美食指南）
const deepDiveSlugs = ['china-dumpling-guide', 'kimchi-sauerkraut-suancai', 'chengdu-food-guide']
const deepDiveGuides = deepDiveSlugs
  .map(slug => getGuideBySlug(slug))
  .filter((g): g is NonNullable<typeof g> => Boolean(g))

// 筛选变化时重置分页
watch([category, citySlug, keyword, vegOnly], () => {
  visibleCount.value = PAGE_SIZE
})

function loadMore() {
  visibleCount.value += PAGE_SIZE
}

// SEO 元信息（含 hreflang）
const i18nHead = useLocaleHead()
useHead({
  title: `${t('dumplings.pageTitle')} | ${t('brand.full')}`,
  htmlAttrs: { lang: i18nHead.value.htmlAttrs?.lang },
  link: [...(i18nHead.value.link || [])],
  meta: [
    { name: 'description', content: t('dumplings.pageSubtitle') },
    { property: 'og:title', content: t('dumplings.pageTitle') },
    { property: 'og:description', content: t('dumplings.pageSubtitle') },
    { property: 'og:type', content: 'website' },
    { property: 'og:locale', content: ogLocale(locale.value) },
    { property: 'og:image', content: `${pub.siteUrl}${allItems[0]?.image || ''}` },
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: t('dumplings.pageTitle'),
        description: t('dumplings.pageSubtitle'),
        url: `${pub.siteUrl}/${locale.value}/dumplings`,
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
        <h1 class="text-3xl md:text-4xl font-bold text-ink">
          {{ t('dumplings.pageTitle') }}
        </h1>
        <p class="text-ink-muted text-sm mt-2 max-w-2xl">
          {{ t('dumplings.pageSubtitle') }}
        </p>
      </div>

      <!-- 筛选器组 -->
      <div class="flex flex-wrap gap-3">
        <select v-model="category" class="input px-3 py-2 text-sm cursor-pointer">
          <option value="all">{{ t('dumplings.allCategories') }}</option>
          <option v-for="cat in categories" :key="cat" :value="cat">
            {{ t(`dumplings.categories.${cat}`) }}
          </option>
        </select>
        <button
          class="chip cursor-pointer transition-colors"
          :class="{ 'bg-brand text-white': vegOnly }"
          @click="vegOnly = !vegOnly"
        >
          {{ t('dumplings.vegOnly') }}
        </button>
      </div>
    </div>

    <div class="flex gap-10">
      <!-- 主内容区 -->
      <div class="flex-1 min-w-0">
        <!-- 搜索关键词回显 -->
        <div v-if="keyword" class="mb-6 flex items-center gap-3 text-sm text-ink-muted">
          <span>“{{ keyword }}”</span>
          <button
            class="text-brand hover:text-brand-dark transition-colors"
            @click="keyword = ''"
          >
            ×
          </button>
        </div>

        <!-- 饺子网格：桌面3列 / 平板2列 / 手机1列 -->
        <div
          v-if="visibleItems.length"
          class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
        >
          <DumplingCard
            v-for="item in visibleItems"
            :key="item.id"
            :item="item"
          />
        </div>
        <p v-else class="text-ink-muted text-sm py-16 text-center">
          {{ t('dumplings.noResults') }}
        </p>

        <!-- 加载更多 -->
        <div v-if="visibleCount < filteredItems.length" class="mt-10 text-center">
          <button class="btn-secondary" @click="loadMore">
            {{ t('dumplings.loadMore') }}
          </button>
        </div>
      </div>

      <!-- 侧边栏（桌面端） -->
      <aside class="hidden xl:block w-[280px] shrink-0 space-y-8">
        <!-- 深度指南 -->
        <div>
          <h3 class="text-base font-semibold text-ink mb-4">
            🥟 {{ t('dumplings.deepDive') }}
          </h3>
          <ul class="list-none space-y-4">
            <li v-for="guide in deepDiveGuides" :key="guide.id">
              <NuxtLink :to="localePath(`/guides/${guide.slug}`)" class="flex gap-3 group">
                <span class="w-14 h-14 rounded-lg overflow-hidden bg-slate-100 shrink-0">
                  <img :src="guide.image" :alt="guide.title[locale]" class="w-full h-full object-cover" loading="lazy">
                </span>
                <span class="min-w-0">
                  <span class="block text-[13px] text-ink-body leading-snug line-clamp-2 group-hover:text-brand transition-colors">
                    {{ guide.title[locale] }}
                  </span>
                  <span class="block text-xs text-ink-muted mt-1">
                    {{ guide.readTime[locale] }}
                  </span>
                </span>
              </NuxtLink>
            </li>
          </ul>
        </div>

        <!-- 城市云 -->
        <div class="pt-6 border-t border-slate-200">
          <h3 class="text-base font-semibold text-ink mb-4">
            📍 {{ t('dumplings.filterByCity') }}
          </h3>
          <div class="flex flex-wrap gap-2">
            <button
              class="chip cursor-pointer transition-colors"
              :class="{ 'bg-brand text-white': citySlug === 'all' }"
              @click="citySlug = 'all'"
            >
              {{ t('dumplings.allCities') }}
            </button>
            <button
              class="chip cursor-pointer transition-colors"
              :class="{ 'bg-brand text-white': citySlug === 'nationwide' }"
              @click="citySlug = 'nationwide'"
            >
              {{ t('dumplings.nationwide') }}
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
