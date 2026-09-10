<script setup lang="ts">
// Guide 视频速览栏：宽屏（≥1280px）右侧固定列，按组列出全部 B 站精选视频，
// 不读正文也能直达视频（新窗口外链）。窄屏隐藏（正文内联卡片已覆盖）。
// 缩略图走官方 CDN 热链（no-referrer，失败回退纯 CSS 占位）。
import { fermentedVideoUrl } from '~/data/fermented-videos'
import type { FermentedVideoGroup } from '~/data/fermented-videos'

defineProps<{ groups: FermentedVideoGroup[] }>()
const { t, locale } = useI18n()

// 热链封面加载失败的 bvid 集合（回退 CSS 占位）
const failedCovers = reactive(new Set<string>())
</script>

<template>
  <aside
    :aria-label="t('guide.videosTitle')"
    class="hidden xl:flex fixed right-4 top-24 bottom-6 w-[224px] z-30 flex-col rounded-xl border border-slate-200 bg-white shadow-lg overflow-hidden"
  >
    <div class="px-3 py-2.5 border-b border-slate-100 bg-slate-50/70 shrink-0">
      <p class="text-xs font-bold text-ink">🎬 {{ t('guide.videosTitle') }}</p>
      <p class="text-[10px] text-ink-muted mt-0.5 leading-snug">{{ t('guide.videosNote') }}</p>
    </div>
    <nav class="flex-1 overflow-y-auto px-2 py-1">
      <template v-for="group in groups" :key="group.id">
        <p class="text-[10px] font-semibold text-brand uppercase tracking-wider px-1.5 pt-2.5 pb-1">
          {{ group.heading[locale] }}
        </p>
        <a
          v-for="v in group.videos"
          :key="v.bvid"
          :href="fermentedVideoUrl(v.bvid)"
          target="_blank"
          rel="noopener noreferrer"
          class="flex gap-2 rounded-lg px-1.5 py-1.5 hover:bg-slate-50 group/r transition-colors"
        >
          <span class="relative w-[72px] shrink-0 aspect-video rounded overflow-hidden"
            :class="v.cover && !failedCovers.has(v.bvid) ? 'bg-slate-200' : 'bg-gradient-to-br from-slate-700 via-slate-600 to-slate-500'"
          >
            <img
              v-if="v.cover && !failedCovers.has(v.bvid)"
              :src="v.cover"
              :alt="v.title[locale]"
              referrerpolicy="no-referrer"
              loading="lazy"
              class="w-full h-full object-cover"
              @error="failedCovers.add(v.bvid)"
            >
            <span
              v-if="!v.cover || failedCovers.has(v.bvid)"
              class="absolute inset-0 m-auto w-6 h-6 rounded-full bg-white/90 flex items-center justify-center"
            >
              <svg viewBox="0 0 24 24" class="w-3 h-3 text-brand translate-x-px" fill="currentColor" aria-hidden="true">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
            <span class="absolute bottom-0.5 right-0.5 bg-black/75 text-white text-[8px] px-1 rounded">
              {{ v.duration }}
            </span>
            <span
              v-if="v.featured"
              class="absolute top-0.5 left-0.5 bg-brand text-white text-[8px] px-1 rounded"
            >★</span>
          </span>
          <span class="min-w-0 flex-1 py-px">
            <span class="block text-[11px] leading-snug text-ink font-medium line-clamp-2 group-hover/r:text-brand transition-colors">
              {{ v.title[locale] }}
            </span>
            <span class="block text-[9px] text-ink-muted mt-0.5">{{ v.vloggerName }} · {{ v.viewsText[locale] }}</span>
          </span>
        </a>
      </template>
    </nav>
  </aside>
</template>
