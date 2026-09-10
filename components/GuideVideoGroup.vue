<script setup lang="ts">
// Guide 视频组卡片（正文内联 + 尾部「眼见为实」架共用）
// 缩略图点击原地加载 B 站官方播放器（不自托管封面图），标题外链 B 站（新窗口）。
import { fermentedVideoUrl } from '~/data/fermented-videos'
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
        <div class="flex gap-3 group/v rounded-lg border border-slate-100 hover:border-brand/50 hover:bg-slate-50 p-2 transition-colors bg-white">
          <span class="relative w-[168px] shrink-0 aspect-video rounded overflow-hidden bg-slate-200">
            <BiliPlayer
              :id="v.bvid"
              :title="v.title[locale]"
              :duration="v.duration"
              :featured="v.featured"
              :cover="v.cover"
            />
          </span>
          <span class="min-w-0 flex-1 py-0.5">
            <a
              :href="fermentedVideoUrl(v.bvid)"
              target="_blank"
              rel="noopener noreferrer"
              class="block text-sm text-ink font-medium leading-snug line-clamp-2 hover:text-brand transition-colors"
            >
              {{ v.title[locale] }}
            </a>
            <span class="block text-[11px] text-ink-muted mt-1">
              {{ v.vloggerName }} · {{ v.viewsText[locale] }} · {{ v.publishedAt[locale] }}
            </span>
            <span class="hidden md:block text-xs text-ink-muted/80 mt-1.5 leading-relaxed line-clamp-2">
              {{ v.note[locale] }}
            </span>
          </span>
        </div>
      </li>
    </ul>
  </div>
</template>
