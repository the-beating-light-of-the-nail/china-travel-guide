<script setup lang="ts">
// 图片瀑布流页 - 分类筛选、Masonry瀑布流、hover遮罩、Lightbox、无限滚动
const { t, locale } = useI18n()
const localePath = useLocalePath()
const { public: pub } = useRuntimeConfig()

import { getPhotos } from '~/data/hub-data'
import type { Photo } from '~/data/hub-data'

const allPhotos = getPhotos()

// 分类列表（对应 locales 中的分类文案）
const categories = ['landscape', 'city', 'food', 'people', 'transport', 'hiddenGems'] as const

// ===== 筛选状态（从 URL query 初始化） =====
const route = useRoute()
const category = ref((route.query.category as string) || 'all')

// 筛选结果
const filteredPhotos = computed(() =>
  allPhotos.filter(p => category.value === 'all' || p.category === category.value)
)

// ===== 无限滚动：一次多加载一批 =====
const BATCH = 12
const visibleCount = ref(BATCH)
const visiblePhotos = computed(() => filteredPhotos.value.slice(0, visibleCount.value))
const hasMore = computed(() => visibleCount.value < filteredPhotos.value.length)

watch(category, () => {
  visibleCount.value = BATCH
})

// 哨兵元素 + IntersectionObserver 触发加载
const sentinel = ref<HTMLElement | null>(null)
let observer: IntersectionObserver | null = null

onMounted(() => {
  observer = new IntersectionObserver((entries) => {
    if (entries[0]?.isIntersecting && hasMore.value) {
      visibleCount.value += BATCH
    }
  }, { rootMargin: '200px' })
  if (sentinel.value) observer.observe(sentinel.value)
})

onBeforeUnmount(() => {
  observer?.disconnect()
})

// ===== Lightbox =====
const activePhoto = ref<Photo | null>(null)

function openLightbox(photo: Photo) {
  activePhoto.value = photo
}

function closeLightbox() {
  activePhoto.value = null
}

function stepLightbox(dir: 1 | -1) {
  if (!activePhoto.value) return
  const idx = filteredPhotos.value.findIndex(p => p.id === activePhoto.value!.id)
  const next = (idx + dir + filteredPhotos.value.length) % filteredPhotos.value.length
  activePhoto.value = filteredPhotos.value[next]
}

// 键盘导航：Esc 关闭 / 左右切换
function onKeydown(e: KeyboardEvent) {
  if (!activePhoto.value) return
  if (e.key === 'Escape') closeLightbox()
  else if (e.key === 'ArrowRight') stepLightbox(1)
  else if (e.key === 'ArrowLeft') stepLightbox(-1)
}

onMounted(() => window.addEventListener('keydown', onKeydown))
onBeforeUnmount(() => window.removeEventListener('keydown', onKeydown))

// SEO 元信息（含 hreflang）
const i18nHead = useLocaleHead()
useHead({
  title: `${t('photos.pageTitle')} | ChinaTravelHub`,
  htmlAttrs: { lang: i18nHead.value.htmlAttrs?.lang },
  link: [...(i18nHead.value.link || [])],
  meta: [
    { name: 'description', content: t('photos.pageSubtitle') },
    { property: 'og:title', content: t('photos.pageTitle') },
    { property: 'og:description', content: t('photos.pageSubtitle') },
    { property: 'og:type', content: 'website' },
    { property: 'og:locale', content: locale.value === 'zh' ? 'zh_CN' : 'en_US' },
    { property: 'og:image', content: `${pub.siteUrl}${allPhotos[0]?.image || ''}` },
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'ImageGallery',
        name: t('photos.pageTitle'),
        description: t('photos.pageSubtitle'),
        url: `${pub.siteUrl}/${locale.value}/photos`,
        inLanguage: locale.value === 'zh' ? 'zh-CN' : 'en-US',
      }),
    },
  ],
})
</script>

<template>
  <div class="py-10 md:py-14 px-4 sm:px-[5%]">
    <!-- 顶部：标题 + 分类筛选 -->
    <div class="max-w-3xl mb-8">
      <h1 class="text-3xl md:text-4xl font-bold text-slate-50">
        {{ t('photos.pageTitle') }}
      </h1>
      <p class="text-slate-400 text-sm mt-2">
        {{ t('photos.pageSubtitle') }}
      </p>
    </div>

    <!-- 分类筛选（横向滚动） -->
    <div class="flex gap-2.5 overflow-x-auto scroll-x-no-bar pb-2 mb-8 -mx-1 px-1">
      <button
        class="chip !text-[13px] !px-4 !py-1.5 cursor-pointer shrink-0 transition-colors whitespace-nowrap"
        :class="{ 'bg-brand text-white': category === 'all' }"
        @click="category = 'all'"
      >
        {{ t('photos.allCategories') }}
      </button>
      <button
        v-for="cat in categories"
        :key="cat"
        class="chip !text-[13px] !px-4 !py-1.5 cursor-pointer shrink-0 transition-colors whitespace-nowrap"
        :class="{ 'bg-brand text-white': category === cat }"
        @click="category = cat"
      >
        {{ t(`photos.categories.${cat}`) }}
      </button>
    </div>

    <!-- 瀑布流（CSS columns） -->
    <div class="masonry">
      <PhotoCard
        v-for="photo in visiblePhotos"
        :key="photo.id"
        :photo="photo"
        @open="openLightbox"
      />
    </div>

    <!-- 无限滚动哨兵 / 手动加载兜底 -->
    <div v-if="hasMore" ref="sentinel" class="mt-10 text-center">
      <button class="btn-secondary" @click="visibleCount += BATCH">
        {{ t('photos.loadMore') }}
      </button>
    </div>

    <!-- Lightbox 模态框 -->
    <div
      v-if="activePhoto"
      class="fixed inset-0 z-[100] bg-slate-950/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-10"
      @click.self="closeLightbox"
    >
      <!-- 关闭按钮 -->
      <button
        class="absolute top-4 right-5 text-slate-400 hover:text-white text-3xl leading-none z-10"
        aria-label="Close"
        @click="closeLightbox"
      >
        ×
      </button>
      <!-- 上一张 / 下一张 -->
      <button
        class="absolute left-3 md:left-6 text-slate-400 hover:text-white text-4xl leading-none z-10"
        aria-label="Previous"
        @click="stepLightbox(-1)"
      >
        ‹
      </button>
      <button
        class="absolute right-3 md:right-6 text-slate-400 hover:text-white text-4xl leading-none z-10"
        aria-label="Next"
        @click="stepLightbox(1)"
      >
        ›
      </button>

      <!-- 大图 + 信息面板 -->
      <div class="max-w-6xl w-full flex flex-col md:flex-row gap-6 items-center md:items-stretch max-h-[85vh]">
        <img
          :src="activePhoto.image"
          :alt="activePhoto.description[locale]"
          class="max-h-[55vh] md:max-h-[85vh] w-auto max-w-full md:flex-1 object-contain rounded-xl"
        >
        <div class="md:w-[300px] shrink-0 bg-slate-900 border border-slate-700 rounded-xl p-6 flex flex-col justify-center overflow-y-auto">
          <h3 class="text-lg font-semibold text-slate-50 mb-2">
            {{ activePhoto.location[locale] }}
          </h3>
          <p class="text-sm text-slate-400 leading-relaxed mb-4">
            {{ activePhoto.description[locale] }}
          </p>
          <div class="text-xs text-blue-400 mb-4">
            {{ activePhoto.tags[locale] }}
          </div>
          <div class="text-xs text-slate-500 mb-4">
            <span class="chip">{{ t(`photos.categories.${activePhoto.category}`) }}</span>
          </div>
          <a
            v-if="activePhoto.sourceUrl"
            :href="activePhoto.sourceUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="text-sm text-brand hover:text-brand-light font-medium transition-colors"
          >
            {{ t('photos.viewSource') }} →
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
