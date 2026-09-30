<script setup lang="ts">
// 官方直播卡片:16:9 播放位(BiliPlayer 点击加载 YouTube 官方播放器)+ 常驻 LIVE 角标 + 信息区
// 数据见 data/live-cams.ts;封面为本地快照,换流时按数据文件头注释的巡查规则同步更新。
import type { LiveCamEntry } from '~/data/live-cams'

defineProps<{ cam: LiveCamEntry }>()
const { locale } = useI18n()
</script>

<template>
  <figure class="rounded-xl border border-slate-200 overflow-hidden bg-slate-50/70 shadow-sm">
    <div class="relative w-full aspect-video bg-slate-700">
      <!-- 常驻 LIVE 角标:直播画面左上角角标是常态,播放中保留即真实感 -->
      <span
        class="absolute top-2 left-2 z-10 flex items-center gap-1 bg-red-600 text-white text-[10px] font-bold tracking-wide px-1.5 py-0.5 rounded shadow pointer-events-none"
      >
        <span class="w-1.5 h-1.5 rounded-full bg-white animate-pulse" aria-hidden="true" />
        LIVE
      </span>
      <BiliPlayer :id="cam.videoId" provider="youtube" :title="cam.title[locale]" :cover="cam.cover" />
    </div>
    <figcaption class="p-3">
      <p class="text-sm font-semibold text-ink leading-snug mb-1">{{ cam.title[locale] }}</p>
      <p class="text-xs text-brand font-medium mb-1.5">{{ cam.source[locale] }}</p>
      <p class="text-xs text-ink-body leading-relaxed">{{ cam.note[locale] }}</p>
    </figcaption>
  </figure>
</template>
