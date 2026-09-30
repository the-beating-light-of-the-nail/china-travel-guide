<script setup lang="ts">
// 官方直播卡片:16:9 播放位 + 常驻 LIVE 角标 + 信息区
// 两种形态(data/live-cams.ts):
//  - YouTube 官方流:BiliPlayer 点击加载(封面为本地快照);
//  - 大陆限定流:整卡外链央视官方页(mainlandOnly),右上「需大陆网络」徽标。
import type { LiveCamEntry } from '~/data/live-cams'

defineProps<{ cam: LiveCamEntry }>()
const { locale, t } = useI18n()
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
      <!-- 大陆限定徽标(右上,amber):海外整页 302,如实提示 -->
      <span
        v-if="cam.mainlandOnly"
        class="absolute top-2 right-2 z-10 bg-amber-500 text-white text-[10px] font-semibold px-1.5 py-0.5 rounded shadow pointer-events-none"
      >{{ t('guide.mainlandBadge') }}</span>

      <!-- ① YouTube 官方流:点击加载播放器 -->
      <BiliPlayer
        v-if="cam.videoId"
        :id="cam.videoId"
        provider="youtube"
        :title="cam.title[locale]"
        :cover="cam.cover"
      />
      <!-- ② 大陆限定流:整卡外链央视官方页,无封面用渐变+斜纹占位 -->
      <a
        v-else-if="cam.externalUrl"
        :href="cam.externalUrl"
        target="_blank"
        rel="noopener"
        class="group/m absolute inset-0 flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-slate-700 via-slate-600 to-slate-500"
        :aria-label="cam.title[locale]"
        :title="cam.title[locale]"
      >
        <span
          class="absolute inset-0 opacity-[0.06] pointer-events-none"
          style="background: repeating-linear-gradient(135deg, #fff 0 2px, transparent 2px 14px)"
          aria-hidden="true"
        />
        <span class="rounded-full bg-white/95 flex items-center justify-center shadow-md transition-transform duration-300 group-hover/m:scale-110 w-11 h-11">
          <svg viewBox="0 0 24 24" class="w-5 h-5 text-brand" fill="currentColor" aria-hidden="true">
            <path d="M14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7zM5 5h4V3H3v18h18v-6h-2v4H5V5z" />
          </svg>
        </span>
        <span class="text-white/75 font-medium tracking-wide drop-shadow text-[9px]">livechina.cctv.com</span>
      </a>
    </div>
    <figcaption class="p-3">
      <p class="text-sm font-semibold text-ink leading-snug mb-1">{{ cam.title[locale] }}</p>
      <p class="text-xs text-brand font-medium mb-1.5">{{ cam.source[locale] }}</p>
      <p class="text-xs text-ink-body leading-relaxed">{{ cam.note[locale] }}</p>
    </figcaption>
  </figure>
</template>
