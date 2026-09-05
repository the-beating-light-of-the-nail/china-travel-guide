<script setup lang="ts">
// 购物推荐聚合页 - 品类筛选、城市云、仅看可退税、关键词搜索、深度指南导流
const { t, locale } = useI18n()
const localePath = useLocalePath()
const route = useRoute()
const { public: pub } = useRuntimeConfig()

import { getShoppingItems } from '~/data/shopping-data'
import type { ShoppingCategory } from '~/data/shopping-data'
import { getCities, getGuideBySlug } from '~/data/travel-data'

const allItems = getShoppingItems()
const allCities = getCities()

// ===== 筛选状态（从 URL query 初始化，支持 /shopping?category=electronics 直达） =====
const keyword = ref((route.query.q as string) || '')
const category = ref((route.query.category as string) || 'all')
const citySlug = ref((route.query.city as string) || 'all')
const taxRefundOnly = ref(false)

// 已加载数量（Load More 分页）
const visibleCount = ref(9)
const PAGE_SIZE = 9

const categories: ShoppingCategory[] = ['electronics', 'fashion', 'eyewear', 'tea-food', 'hobby', 'crafts']

// 筛选结果（编辑精选优先，其余保持源数据顺序）
const filteredItems = computed(() => {
  let list = allItems.filter(s =>
    (category.value === 'all' || s.category === category.value)
    && (citySlug.value === 'all' || s.citySlug === citySlug.value)
    && (!taxRefundOnly.value || s.taxRefund)
  )
  const kw = keyword.value.trim().toLowerCase()
  if (kw) {
    list = list.filter(s =>
      s.name[locale.value].toLowerCase().includes(kw)
      || s.tagline[locale.value].toLowerCase().includes(kw)
      || s.description[locale.value].toLowerCase().includes(kw)
    )
  }
  return [...list].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
})

// 当前可见的商品（分页切片）
const visibleItems = computed(() => filteredItems.value.slice(0, visibleCount.value))

// 城市名映射
function cityName(slug: string): string {
  const c = allCities.find(c => c.slug === slug)
  return c ? c.name[locale.value] : slug
}

// 侧边栏深度指南（购物三部曲）
const deepDiveSlugs = ['what-to-buy-in-china', 'china-tax-refund-guide', 'taobao-jd-for-tourists']
const deepDiveGuides = deepDiveSlugs
  .map(slug => getGuideBySlug(slug))
  .filter((g): g is NonNullable<typeof g> => Boolean(g))

// 筛选变化时重置分页
watch([category, citySlug, keyword, taxRefundOnly], () => {
  visibleCount.value = PAGE_SIZE
})

function loadMore() {
  visibleCount.value += PAGE_SIZE
}

// SEO 元信息（含 hreflang）
const i18nHead = useLocaleHead()
useHead({
  title: `${t('shopping.pageTitle')} | ${t('brand.full')}`,
  htmlAttrs: { lang: i18nHead.value.htmlAttrs?.lang },
  link: [...(i18nHead.value.link || [])],
  meta: [
    { name: 'description', content: t('shopping.pageSubtitle') },
    { property: 'og:title', content: t('shopping.pageTitle') },
    { property: 'og:description', content: t('shopping.pageSubtitle') },
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
        name: t('shopping.pageTitle'),
        description: t('shopping.pageSubtitle'),
        url: `${pub.siteUrl}/${locale.value}/shopping`,
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
          {{ t('shopping.pageTitle') }}
        </h1>
        <p class="text-ink-muted text-sm mt-2 max-w-2xl">
          {{ t('shopping.pageSubtitle') }}
        </p>
      </div>

      <!-- 筛选器组 -->
      <div class="flex flex-wrap gap-3">
        <select v-model="category" class="input px-3 py-2 text-sm cursor-pointer">
          <option value="all">{{ t('shopping.allCategories') }}</option>
          <option v-for="cat in categories" :key="cat" :value="cat">
            {{ t(`shopping.categories.${cat}`) }}
          </option>
        </select>
        <button
          class="chip cursor-pointer transition-colors"
          :class="{ 'bg-brand text-white': taxRefundOnly }"
          @click="taxRefundOnly = !taxRefundOnly"
        >
          {{ t('shopping.taxRefundOnly') }}
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

        <!-- 商品网格：桌面3列 / 平板2列 / 手机1列 -->
        <div
          v-if="visibleItems.length"
          class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
        >
          <ProductCard
            v-for="item in visibleItems"
            :key="item.id"
            :item="item"
          />
        </div>
        <p v-else class="text-ink-muted text-sm py-16 text-center">
          {{ t('shopping.noResults') }}
        </p>

        <!-- 加载更多 -->
        <div v-if="visibleCount < filteredItems.length" class="mt-10 text-center">
          <button class="btn-secondary" @click="loadMore">
            {{ t('shopping.loadMore') }}
          </button>
        </div>
      </div>

      <!-- 侧边栏（桌面端） -->
      <aside class="hidden xl:block w-[280px] shrink-0 space-y-8">
        <!-- 深度指南 -->
        <div>
          <h3 class="text-base font-semibold text-ink mb-4">
            🛒 {{ t('shopping.deepDive') }}
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
            📍 {{ t('shopping.filterByCity') }}
          </h3>
          <div class="flex flex-wrap gap-2">
            <button
              class="chip cursor-pointer transition-colors"
              :class="{ 'bg-brand text-white': citySlug === 'all' }"
              @click="citySlug = 'all'"
            >
              {{ t('shopping.allCities') }}
            </button>
            <button
              class="chip cursor-pointer transition-colors"
              :class="{ 'bg-brand text-white': citySlug === 'nationwide' }"
              @click="citySlug = 'nationwide'"
            >
              {{ t('shopping.nationwide') }}
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
