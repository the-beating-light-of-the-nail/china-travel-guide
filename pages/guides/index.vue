<script setup lang="ts">
// 攻略聚合页 - 搜索、分类标签云、外部攻略两列网格、最新收录、站内原创攻略
const { t, locale } = useI18n()
const localePath = useLocalePath()
const route = useRoute()
const { public: pub } = useRuntimeConfig()

import { getExternalGuides } from '~/data/hub-data'
import { getGuides } from '~/data/travel-data'

const externalGuides = getExternalGuides()
const originalGuides = getGuides()

// 分类列表（对应 locales 中的分类文案）
const categories = ['visa', 'transport', 'food', 'accommodation', 'itinerary', 'budget', 'safety', 'apps'] as const

// ===== 筛选状态（从 URL query 初始化） =====
const keyword = ref((route.query.q as string) || '')
const category = ref((route.query.category as string) || 'all')

// 筛选结果
const filteredGuides = computed(() => {
  let list = externalGuides.filter(g =>
    category.value === 'all' || g.category === category.value
  )
  const kw = keyword.value.trim().toLowerCase()
  if (kw) {
    list = list.filter(g =>
      g.title[locale.value].toLowerCase().includes(kw)
      || g.sourceName.toLowerCase().includes(kw)
      || g.summary[locale.value].toLowerCase().includes(kw)
    )
  }
  return list
})

// 最新收录（取前 5 条）
const recentGuides = computed(() => externalGuides.slice(-5).reverse())

function selectCategory(cat: string) {
  category.value = cat
}

// SEO 元信息（含 hreflang）
const i18nHead = useLocaleHead()
useHead({
  title: `${t('guidesHub.pageTitle')} | ${t('brand.full')}`,
  htmlAttrs: { lang: i18nHead.value.htmlAttrs?.lang },
  link: [...(i18nHead.value.link || [])],
  meta: [
    { name: 'description', content: t('guidesHub.pageSubtitle') },
    { property: 'og:title', content: t('guidesHub.pageTitle') },
    { property: 'og:description', content: t('guidesHub.pageSubtitle') },
    { property: 'og:type', content: 'website' },
    { property: 'og:locale', content: locale.value === 'zh' ? 'zh_CN' : 'en_US' },
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: t('guidesHub.pageTitle'),
        description: t('guidesHub.pageSubtitle'),
        url: `${pub.siteUrl}/${locale.value}/guides`,
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
        {{ t('guidesHub.pageTitle') }}
      </h1>
      <p class="text-slate-400 text-sm mt-2 mb-6">
        {{ t('guidesHub.pageSubtitle') }}
      </p>
      <input
        v-model="keyword"
        type="text"
        :placeholder="t('guidesHub.searchPlaceholder')"
        class="input-dark w-full px-5 py-3 text-sm"
      >
    </div>

    <!-- 分类标签云（横向滚动） -->
    <div class="flex gap-2.5 overflow-x-auto scroll-x-no-bar pb-2 mb-8 -mx-1 px-1">
      <button
        class="chip !text-[13px] !px-4 !py-1.5 cursor-pointer shrink-0 transition-colors whitespace-nowrap"
        :class="{ 'bg-brand text-white': category === 'all' }"
        @click="selectCategory('all')"
      >
        {{ t('guidesHub.allCategories') }}
      </button>
      <button
        v-for="cat in categories"
        :key="cat"
        class="chip !text-[13px] !px-4 !py-1.5 cursor-pointer shrink-0 transition-colors whitespace-nowrap"
        :class="{ 'bg-brand text-white': category === cat }"
        @click="selectCategory(cat)"
      >
        {{ t(`guidesHub.categories.${cat}`) }}
      </button>
    </div>

    <div class="flex gap-10">
      <!-- 主内容区：外部攻略两列网格 -->
      <div class="flex-1 min-w-0">
        <div
          v-if="filteredGuides.length"
          class="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <ExternalGuideCard
            v-for="guide in filteredGuides"
            :key="guide.id"
            :guide="guide"
          />
        </div>
        <p v-else class="text-slate-500 text-sm py-16 text-center">
          {{ t('guidesHub.noResults') }}
        </p>
      </div>

      <!-- 侧边栏：最新收录 -->
      <aside class="hidden lg:block w-[260px] shrink-0">
        <h3 class="text-base font-semibold text-slate-50 mb-4">
          🆕 {{ t('guidesHub.recentlyAdded') }}
        </h3>
        <ul class="list-none space-y-4">
          <li v-for="guide in recentGuides" :key="guide.id">
            <a
              :href="guide.externalUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="group block"
            >
              <span class="block text-[13px] text-slate-200 leading-snug line-clamp-2 group-hover:text-brand-light transition-colors">
                {{ guide.title[locale] }}
              </span>
              <span class="block text-xs text-slate-500 mt-1">
                {{ guide.sourceName }} · {{ t(`guidesHub.categories.${guide.category}`) }}
              </span>
            </a>
          </li>
        </ul>
      </aside>
    </div>

    <!-- 站内原创攻略 -->
    <section class="mt-[70px] pt-[70px] border-t border-slate-800">
      <div class="mb-10">
        <h2 class="text-2xl md:text-3xl font-bold text-slate-50">
          {{ t('guidesHub.ourGuidesTitle') }}
        </h2>
        <p class="text-slate-400 text-sm mt-2">
          {{ t('guidesHub.ourGuidesSubtitle') }}
        </p>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
        <GuideCard
          v-for="guide in originalGuides"
          :key="guide.slug"
          :guide="guide"
        />
      </div>
    </section>
  </div>
</template>
