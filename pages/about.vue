<script setup lang="ts">
// 关于我们页面 - 项目介绍、使命、特色
const { public: pub } = useRuntimeConfig()
const { t, locale } = useI18n()
const localePath = useLocalePath()

// 特色列表（key 对应 locales 中的 about 翻译）
const features = [
  { icon: '🗺️', titleKey: 'f1Title', descKey: 'f1Desc' },
  { icon: '✍️', titleKey: 'f2Title', descKey: 'f2Desc' },
  { icon: '🥢', titleKey: 'f3Title', descKey: 'f3Desc' },
  { icon: '📅', titleKey: 'f4Title', descKey: 'f4Desc' },
  { icon: '💡', titleKey: 'f5Title', descKey: 'f5Desc' },
  { icon: '🌏', titleKey: 'f6Title', descKey: 'f6Desc' },
]

// SEO 元信息（含 hreflang）
const i18nHead = useLocaleHead()
useHead({
  title: `${t('about.title')} | China Travel Guide`,
  htmlAttrs: { lang: i18nHead.value.htmlAttrs?.lang },
  link: [...(i18nHead.value.link || [])],
  meta: [
    { name: 'description', content: t('about.subtitle') },
    { property: 'og:title', content: t('about.title') },
    { property: 'og:description', content: t('about.subtitle') },
    { property: 'og:type', content: 'website' },
    { property: 'og:locale', content: locale.value === 'zh' ? 'zh_CN' : 'en_US' },
  ],
  script: [
    // 组织结构化数据 JSON-LD
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'AboutPage',
        name: t('about.title'),
        url: `${pub.siteUrl}/${locale.value}/about`,
        inLanguage: locale.value === 'zh' ? 'zh-CN' : 'en-US',
        mainEntity: {
          '@type': 'Organization',
          name: 'China Travel Guide',
          url: pub.siteUrl,
          description: 'An English-language travel guide platform dedicated to helping international tourists explore China.',
        },
      }),
    },
  ],
})
</script>

<template>
  <div>
    <!-- 顶部介绍区 -->
    <section
      class="h-[400px] flex flex-col items-center justify-center text-white text-center px-5"
      style="background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?w=1600') center/cover;"
    >
      <h1 class="text-4xl md:text-[52px] font-bold mb-4 tracking-[6px]">{{ t('about.title') }}</h1>
      <p class="text-lg opacity-90 max-w-2xl tracking-wide leading-relaxed">
        {{ t('about.subtitle') }}
      </p>
    </section>

    <!-- 项目介绍 -->
    <section class="py-[70px] px-4 sm:px-[8%] bg-white">
      <div class="max-w-3xl mx-auto text-center">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">{{ t('about.missionTitle') }}</h2>
        <div class="space-y-5 text-gray-600 text-[16px] leading-relaxed text-left">
          <p>{{ t('about.missionP1') }}</p>
          <p>{{ t('about.missionP2') }}</p>
          <p>{{ t('about.missionP3') }}</p>
        </div>
      </div>
    </section>

    <!-- 特色介绍 -->
    <section class="py-[70px] px-4 sm:px-[8%]">
      <div class="section-title">
        <h2>{{ t('about.offerTitle') }}</h2>
        <div class="subtitle">{{ t('about.offerSubtitle') }}</div>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="feature in features"
          :key="feature.titleKey"
          class="bg-white rounded-xl p-6 shadow-md text-center card-hover"
        >
          <div class="text-4xl mb-3">{{ feature.icon }}</div>
          <h3 class="text-lg font-semibold text-brand mb-2">{{ t(`about.${feature.titleKey}`) }}</h3>
          <p class="text-sm text-gray-500 leading-relaxed">{{ t(`about.${feature.descKey}`) }}</p>
        </div>
      </div>
    </section>

    <!-- 行动号召 -->
    <section class="py-[70px] px-4 sm:px-[8%] bg-brand text-white text-center">
      <h2 class="text-3xl md:text-4xl font-bold mb-4">{{ t('about.ctaTitle') }}</h2>
      <p class="text-lg opacity-90 mb-8 max-w-xl mx-auto">
        {{ t('about.ctaSubtitle') }}
      </p>
      <NuxtLink
        :to="localePath('/#destinations')"
        class="inline-block bg-accent hover:bg-accent-dark text-white px-8 py-3 rounded-full transition-colors text-[15px]"
      >
        {{ t('about.ctaButton') }}
      </NuxtLink>
    </section>
  </div>
</template>
