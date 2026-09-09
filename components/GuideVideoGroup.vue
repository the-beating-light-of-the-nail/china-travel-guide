<script setup lang="ts">
// Guide 视频组卡片（正文内联 + 尾部「眼见为实」架共用）
// 封面走本地图 /images/vlogs/<bvid>.jpg，点击外链 B 站（新窗口），不嵌 iframe。
import { fermentedVideoUrl, fermentedVideoThumb } from '~/data/fermented-videos'
import type { FermentedVideoGroup } from '~/data/fermented-videos'

defineProps<{ group: FermentedVideoGroup }>()
const { locale } = useI18n()
</script>

<template>
  <div>
    <h3 class="text-xs font-semibold text-brand uppercase tracking-wider mb-3">
      {{ group.heading[locale] }}
    </h3>
    <ul class="list-none space-y-2.5">
      <li v-for="v in group.videos" :key="v.bvid">
        <a
          :href="fermentedVideoUrl(v.bvid)"
          target="_blank"
          rel="noopener noreferrer"
          class="flex gap-3 group/v rounded-lg border border-slate-100 hover:border-brand/50 hover:bg-slate-50 p-2 transition-colors bg-white"
        >
          <span class="relative w-[168px] shrink-0 aspect-video rounded overflow-hidden bg-slate-100">
            <img
              :src="fermentedVideoThumb(v.bvid)"
              :alt="v.title[locale]"
              loading="lazy"
              class="w-full h-full object-cover transition-transform duration-500 group-hover/v:scale-[1.05]"
            >
            <span class="absolute bottom-1 right-1 bg-black/75 text-white text-[9px] px-1 rounded">
              {{ v.duration }}
            </span>
            <span
              v-if="v.featured"
              class="absolute top-1 left-1 bg-brand text-white text-[9px] px-1.5 rounded"
            >★</span>
          </span>
          <span class="min-w-0 flex-1 py-0.5">
            <span class="block text-sm text-ink font-medium leading-snug line-clamp-2 group-hover/v:text-brand transition-colors">
              {{ v.title[locale] }}
            </span>
            <span class="block text-[11px] text-ink-muted mt-1">
              {{ v.vloggerName }} · {{ v.viewsText[locale] }} · {{ v.publishedAt[locale] }}
            </span>
            <span class="hidden md:block text-xs text-ink-muted/80 mt-1.5 leading-relaxed line-clamp-2">
              {{ v.note[locale] }}
            </span>
          </span>
        </a>
      </li>
    </ul>
  </div>
</template>
