<script setup lang="ts">
// 攻略文章详情页 - 标题、摘要、正文、元信息
const route = useRoute()
const { public: pub } = useRuntimeConfig()
const slug = route.params.slug as string
const { t, locale } = useI18n()
const localePath = useLocalePath()

// 静态数据：按 slug 查询攻略文章（构建时注入，无需运行时数据库）
import { getGuideBySlug } from '~/data/travel-data'
const guide = getGuideBySlug(slug)

// 文章不存在则 404
if (!guide) {
  throw createError({ statusCode: 404, statusMessage: 'Guide not found', fatal: true })
}

const g = computed(() => guide!)

// ===== 内联视频架：正文中写 [[videos:<组id>]] 占位标记，对应视频组渲染在该位置 =====
// 未被标记引用的组仍渲染在文章尾部「眼见为实」架（向后兼容）；全部内联则尾部架隐藏。
// 标记在渲染前从 HTML 中剥除，未匹配到组的标记静默忽略。
import type { FermentedVideoGroup } from '~/data/fermented-videos'

type ContentSegment = { type: 'html'; html: string } | { type: 'videos'; id: string }

const videoGroupById = computed(() => {
  const map = new Map<string, FermentedVideoGroup>()
  for (const grp of g.value.videos || []) map.set(grp.id, grp)
  return map
})

const contentSegments = computed<ContentSegment[]>(() => {
  const html = g.value.content[locale.value] || ''
  const segments: ContentSegment[] = []
  const markerRe = /\[\[videos:([a-zA-Z0-9_-]+)\]\]/g
  let last = 0
  let m: RegExpExecArray | null
  while ((m = markerRe.exec(html)) !== null) {
    if (m.index > last) segments.push({ type: 'html', html: html.slice(last, m.index) })
    segments.push({ type: 'videos', id: m[1] })
    last = m.index + m[0].length
  }
  if (last < html.length) segments.push({ type: 'html', html: html.slice(last) })
  return segments
})

const inlineVideoGroupFor = (seg: ContentSegment) =>
  seg.type === 'videos' ? videoGroupById.value.get(seg.id) : undefined

// 尾部兜底组 = 未被内联标记引用的组
const remainingVideoGroups = computed(() => {
  const inlined = new Set(
    contentSegments.value
      .filter((s): s is Extract<ContentSegment, { type: 'videos' }> => s.type === 'videos')
      .map((s) => s.id)
  )
  return (g.value.videos || []).filter((grp) => !inlined.has(grp.id))
})

// 文章发布日期（用于 JSON-LD）
const datePublished = computed(() => {
  const d = new Date()
  d.setDate(d.getDate() - 14)
  return d.toISOString()
})

// SEO 元信息（含 hreflang）
const i18nHead = useLocaleHead()
useHead({
  title: `${g.value.title[locale.value]} | China Travel Guide`,
  htmlAttrs: { lang: i18nHead.value.htmlAttrs?.lang },
  link: [...(i18nHead.value.link || [])],
  meta: [
    { name: 'description', content: g.value.excerpt[locale.value] },
    { property: 'og:title', content: g.value.title[locale.value] },
    { property: 'og:description', content: g.value.excerpt[locale.value] },
    { property: 'og:type', content: 'article' },
    { property: 'og:image', content: g.value.image },
    { property: 'article:author', content: 'China Travel Guide' },
    { property: 'og:locale', content: ogLocale(locale.value) },
  ],
  script: [
    // 文章结构化数据 JSON-LD
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: g.value.title[locale.value],
        description: g.value.excerpt[locale.value],
        image: g.value.image,
        author: {
          '@type': 'Organization',
          name: 'With My Eyes',
        },
        publisher: {
          '@type': 'Organization',
          name: 'With My Eyes',
        },
        datePublished: datePublished.value,
        inLanguage: isoLocale(locale.value),
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `${pub.siteUrl}/${locale.value}/guides/${g.value.slug}`,
        },
      }),
    },
    // FAQ 结构化数据（guide 携带 faq 时注入）
    ...(g.value.faq?.length
      ? [{
          type: 'application/ld+json',
          innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: g.value.faq.map(f => ({
              '@type': 'Question',
              name: f.q[locale.value],
              acceptedAnswer: {
                '@type': 'Answer',
                text: f.a[locale.value],
              },
            })),
          }),
        }]
      : []),
  ],
})
</script>

<template>
  <div v-if="guide">
    <!-- 文章头部 -->
    <header class="relative h-[460px] flex items-end overflow-hidden">
      <img :src="g.image" :alt="g.title[locale]" class="absolute inset-0 w-full h-full object-cover">
      <div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/55 to-black/35" />
      <div class="relative max-w-3xl mx-auto px-4 pb-12 text-white w-full">
        <NuxtLink :to="localePath('/guides')" class="text-sky-300 hover:text-white text-sm mb-3 inline-block">
          {{ t('guide.backToGuides') }}
        </NuxtLink>
        <span class="inline-block bg-brand text-white px-3 py-1 rounded text-xs mb-4">
          {{ g.label[locale] }}
        </span>
        <h1 class="text-3xl md:text-[40px] font-bold leading-tight mb-4 text-shadow">
          {{ g.title[locale] }}
        </h1>
        <div class="flex gap-4 text-sm opacity-90">
          <span>📖 {{ g.views[locale] }}</span>
          <span>⏱️ {{ g.readTime[locale] }}</span>
          <span>📅 {{ g.publishedAt[locale] }}</span>
        </div>
      </div>
    </header>

    <!-- 文章正文 -->
    <article class="max-w-3xl mx-auto px-4 py-12 bg-white my-8 rounded-xl border border-slate-200">
      <!-- 摘要 -->
      <p class="text-lg text-ink-body leading-relaxed mb-8 pb-8 border-b border-slate-200 italic">
        {{ g.excerpt[locale] }}
      </p>
      <!-- 正文内容（HTML 富文本，按当前语言取；[[videos:<组id>]] 标记处内联渲染视频组） -->
      <div class="prose-content max-w-none">
        <template v-for="(seg, i) in contentSegments" :key="i">
          <div v-if="seg.type === 'html'" v-html="seg.html" />
          <div
            v-else-if="inlineVideoGroupFor(seg)"
            class="my-8 rounded-xl border border-slate-200 bg-slate-50/70 p-4"
          >
            <GuideVideoGroup :group="inlineVideoGroupFor(seg)!" />
          </div>
        </template>
      </div>

      <!-- FAQ 折叠面板（guide 携带 faq 时渲染） -->
      <section v-if="g.faq?.length" class="mt-12 pt-8 border-t border-slate-200">
        <h2 class="text-2xl font-bold text-ink mb-4">❓ {{ t('guide.faqTitle') }}</h2>
        <details
          v-for="(item, i) in g.faq"
          :key="i"
          class="border border-slate-200 rounded-lg mb-2"
        >
          <summary class="cursor-pointer select-none px-4 py-3 text-sm font-medium text-ink">
            {{ item.q[locale] }}
          </summary>
          <p class="px-4 pb-4 text-sm text-ink-body leading-relaxed">
            {{ item.a[locale] }}
          </p>
        </details>
      </section>

      <!-- 眼见为实：分组视频架兜底位（仅渲染未被正文内联标记引用的组；封面本地图 + 外链 B 站） -->
      <section v-if="remainingVideoGroups.length" class="mt-12 pt-8 border-t border-slate-200">
        <h2 class="text-2xl font-bold text-ink mb-1">🎬 {{ t('guide.videosTitle') }}</h2>
        <p class="text-xs text-ink-muted mb-6">{{ t('guide.videosNote') }}</p>
        <div v-for="group in remainingVideoGroups" :key="group.id" class="mb-7">
          <GuideVideoGroup :group="group" />
        </div>
      </section>

      <!-- 尾部互链 chips -->
      <nav v-if="g.relatedLinks?.length" class="mt-12 pt-8 border-t border-slate-200">
        <p class="text-xs font-semibold text-ink-muted uppercase tracking-wider mb-3">
          {{ t('guide.relatedTitle') }}
        </p>
        <div class="flex flex-wrap gap-2">
          <NuxtLink
            v-for="(link, i) in g.relatedLinks"
            :key="i"
            :to="localePath(link.to)"
            class="text-sm text-brand bg-brand-tint hover:bg-brand hover:text-white px-4 py-2 rounded-full transition-colors"
          >
            {{ link.label[locale] }}
          </NuxtLink>
        </div>
      </nav>

      <!-- 底部导航 -->
      <div class="mt-12 pt-8 border-t border-slate-200 text-center">
        <NuxtLink
          :to="localePath('/guides')"
          class="inline-block btn-primary rounded-full"
        >
          {{ t('guide.moreGuides') }}
        </NuxtLink>
      </div>
    </article>
  </div>
</template>

<style scoped>
/* 文章正文富文本样式（浅色主题） */
.prose-content :deep(h2) {
  font-size: 1.75rem;
  font-weight: 700;
  color: #1f2430;
  margin-top: 2.5rem;
  margin-bottom: 1rem;
}

.prose-content :deep(p) {
  color: #4b505c;
  line-height: 1.8;
  margin-bottom: 1.25rem;
}

/* 正文配图（Guide content 内的 <img>） */
.prose-content :deep(img) {
  width: 100%;
  border-radius: 0.75rem;
  margin: 1.75rem 0 0.5rem;
}

/* 「真实观众评论」等引述块 */
.prose-content :deep(blockquote) {
  margin: 1.5rem 0;
  padding: 0.875rem 1.25rem;
  border-left: 4px solid #d946ef;
  background: #fdf4ff;
  border-radius: 0 0.5rem 0.5rem 0;
}

.prose-content :deep(blockquote p) {
  margin-bottom: 0.375rem;
  color: #3f3f46;
}

.prose-content :deep(blockquote footer) {
  font-size: 0.8125rem;
  color: #a21caf;
  margin-bottom: 0;
}

/* 对比矩阵 / 旅行吃图等正文表格 */
.prose-content :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin: 1.5rem 0;
  font-size: 0.875rem;
}

.prose-content :deep(th),
.prose-content :deep(td) {
  border: 1px solid #e2e8f0;
  padding: 0.5rem 0.75rem;
  text-align: left;
  vertical-align: top;
  line-height: 1.5;
}

.prose-content :deep(th) {
  background: #f8fafc;
  color: #1f2430;
  font-weight: 600;
  white-space: nowrap;
}
</style>
