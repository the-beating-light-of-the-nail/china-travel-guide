<script setup lang="ts">
// 徒步专栏聚合页 - 面向欧美徒步爱好者：难度阶梯筛选、路线卡片、聚光灯视频、深度指南导流
const { t, locale } = useI18n()
const localePath = useLocalePath()
const route = useRoute()
const { public: pub } = useRuntimeConfig()

import { getHikingRoutes, HIKING_TIER_ORDER, hikingSpotlight, hikingVideoUrl } from '~/data/hiking-data'
import type { HikingTier } from '~/data/hiking-data'
import { getGuideBySlug } from '~/data/travel-data'

const allRoutes = getHikingRoutes()

// ===== 筛选状态（从 URL query 初始化，支持 /hiking?tier=expedition 直达） =====
const tier = ref((route.query.tier as string) || 'all')

const tierOptions: Array<HikingTier | 'all'> = ['all', ...HIKING_TIER_ORDER]

const filteredRoutes = computed(() =>
  tier.value === 'all' ? allRoutes : allRoutes.filter(r => r.tier === tier.value),
)

// 侧边栏深度指南（徒步三部曲）
const deepDiveSlugs = ['tiger-leaping-gorge-trek-guide', 'china-trekking-permits-guide', 'altitude-sickness-trekking-china']
const deepDiveGuides = deepDiveSlugs
  .map(slug => getGuideBySlug(slug))
  .filter((g): g is NonNullable<typeof g> => Boolean(g))

// SEO 元信息（含 hreflang）
const i18nHead = useLocaleHead()
useHead({
  title: `${t('hiking.pageTitle')} | ${t('brand.full')}`,
  htmlAttrs: { lang: i18nHead.value.htmlAttrs?.lang },
  link: [...(i18nHead.value.link || [])],
  meta: [
    { name: 'description', content: t('hiking.pageSubtitle') },
    { property: 'og:title', content: t('hiking.pageTitle') },
    { property: 'og:description', content: t('hiking.pageSubtitle') },
    { property: 'og:type', content: 'website' },
    { property: 'og:locale', content: ogLocale(locale.value) },
    { property: 'og:image', content: `${pub.siteUrl}${allRoutes[0]?.image || ''}` },
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: t('hiking.pageTitle'),
        description: t('hiking.pageSubtitle'),
        url: `${pub.siteUrl}/${locale.value}/hiking`,
        inLanguage: isoLocale(locale.value),
      }),
    },
  ],
})
</script>

<template>
  <div class="py-10 md:py-14 px-4 sm:px-[5%]">
    <!-- 页头 -->
    <div class="flex flex-col lg:flex-row lg:items-end justify-between gap-5 mb-8">
      <div>
        <h1 class="text-3xl md:text-4xl font-bold text-ink">
          {{ t('hiking.pageTitle') }}
        </h1>
        <p class="text-ink-muted text-sm mt-2 max-w-2xl">
          {{ t('hiking.pageSubtitle') }}
        </p>
      </div>

      <!-- 难度阶梯筛选（难度从低到高排列，即"徒步进阶阶梯"） -->
      <div class="flex flex-wrap gap-2">
        <button
          v-for="opt in tierOptions"
          :key="opt"
          class="chip cursor-pointer transition-colors"
          :class="{ 'bg-brand text-white': tier === opt }"
          @click="tier = opt"
        >
          {{ opt === 'all' ? t('hiking.allTiers') : t(`hiking.tiers.${opt}`) }}
        </button>
      </div>
    </div>

    <!-- 聚光灯视频：外国人徒步中国名场面（点击原地加载 B 站官方播放器） -->
    <div class="card group flex flex-col md:flex-row overflow-hidden mb-10 hover:shadow-lg hover:shadow-black/10 transition-all">
      <div class="relative md:w-[42%] aspect-video md:aspect-auto shrink-0 overflow-hidden bg-slate-200">
        <BiliPlayer
          :id="hikingSpotlight.bvid"
          :title="hikingSpotlight.title[locale]"
          :duration="hikingSpotlight.duration"
          size="lg"
          auto
        />
      </div>
      <div class="p-5 md:p-6 flex flex-col justify-center min-w-0">
        <span class="text-[10px] font-bold text-white bg-brand px-2 py-1 rounded self-start mb-3 uppercase tracking-wide">
          {{ t('hiking.spotlightTag') }}
        </span>
        <a
          :href="hikingVideoUrl(hikingSpotlight.bvid)"
          target="_blank"
          rel="noopener noreferrer"
          class="mb-2"
        >
          <h2 class="text-lg md:text-xl font-bold text-ink leading-snug group-hover:text-brand transition-colors">
            {{ hikingSpotlight.title[locale] }}
          </h2>
        </a>
        <p class="text-sm text-ink-muted leading-relaxed mb-3">
          {{ hikingSpotlight.note[locale] }}
        </p>
        <p class="text-xs text-ink-muted">
          {{ hikingSpotlight.vloggerName }} · {{ hikingSpotlight.viewsText[locale] }} · {{ hikingSpotlight.publishedAt[locale] }}
          <span class="text-brand font-medium ml-1">{{ t('vlogs.watch') }} →</span>
        </p>
      </div>
    </div>

    <div class="flex gap-10">
      <!-- 主内容区：路线卡片 -->
      <div class="flex-1 min-w-0">
        <div
          v-if="filteredRoutes.length"
          class="grid grid-cols-1 xl:grid-cols-2 gap-6"
        >
          <HikingRouteCard
            v-for="r in filteredRoutes"
            :key="r.id"
            :route="r"
          />
        </div>
        <p v-else class="text-ink-muted text-sm py-16 text-center">
          {{ t('hiking.noResults') }}
        </p>
      </div>

      <!-- 侧边栏（桌面端） -->
      <aside class="hidden xl:block w-[280px] shrink-0 space-y-8">
        <!-- 深度指南 -->
        <div>
          <h3 class="text-base font-semibold text-ink mb-4">
            ⛰️ {{ t('hiking.deepDive') }}
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

        <!-- 安全与规则提示 -->
        <div class="pt-6 border-t border-slate-200">
          <h3 class="text-base font-semibold text-ink mb-3">
            🛡 {{ t('hiking.safetyTitle') }}
          </h3>
          <p class="text-xs text-ink-muted leading-relaxed">
            {{ t('hiking.safetyText') }}
          </p>
        </div>

        <!-- 更多视频导流 -->
        <div class="pt-6 border-t border-slate-200">
          <NuxtLink :to="localePath('/vlogs')" class="text-sm text-brand font-medium hover:text-brand-dark transition-colors">
            {{ t('hiking.moreVlogs') }} →
          </NuxtLink>
        </div>
      </aside>
    </div>
  </div>
</template>
