<script setup lang="ts">
// Vlog 卡片组件 - 缩略图（16:9）、平台角标、播放按钮、标题、博主、标签、点评、外链
import type { Vlog } from '~/data/hub-data'

defineProps<{
  vlog: Vlog
}>()

const { locale, t } = useI18n()

// 平台配色：Bilibili 粉 / YouTube 红
const platformStyle: Record<string, string> = {
  bilibili: 'bg-pink-600',
  youtube: 'bg-red-600',
}
</script>

<template>
  <!-- Vlog 卡片：整卡外链，新标签页打开 -->
  <a
    :href="vlog.externalUrl"
    target="_blank"
    rel="noopener noreferrer"
    class="card group block overflow-hidden hover:-translate-y-1 hover:shadow-lg hover:shadow-black/10"
  >
    <!-- 缩略图区 -->
    <div class="relative aspect-video overflow-hidden bg-slate-100">
      <img
        :src="vlog.thumbnail"
        :alt="vlog.title[locale]"
        loading="lazy"
        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
      >
      <!-- 平台角标 -->
      <span
        class="absolute top-2 right-2 text-white text-[10px] font-semibold px-2 py-0.5 rounded"
        :class="platformStyle[vlog.platform]"
      >
        {{ t(`vlogs.platforms.${vlog.platform}`) }}
      </span>
      <!-- 时长角标 -->
      <span class="absolute bottom-2 right-2 bg-black/75 text-white text-[11px] px-1.5 py-0.5 rounded">
        {{ vlog.duration }}
      </span>
      <!-- 播放按钮（hover 浮现） -->
      <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/25">
        <span class="w-12 h-12 rounded-full bg-brand flex items-center justify-center text-white text-lg shadow-lg">
          ▶
        </span>
      </div>
    </div>

    <!-- 内容区 -->
    <div class="p-4">
      <!-- 标题（两行截断） -->
      <h3 class="text-[15px] text-ink mb-2 font-semibold leading-snug line-clamp-2 group-hover:text-brand transition-colors">
        {{ vlog.title[locale] }}
      </h3>

      <!-- 博主 -->
      <div class="flex items-center gap-2 mb-2">
        <span class="w-6 h-6 rounded-full bg-brand-tint text-brand text-[11px] flex items-center justify-center font-semibold shrink-0">
          {{ vlog.vloggerName.slice(0, 1) }}
        </span>
        <span class="text-[13px] text-ink-body">{{ vlog.vloggerName }}</span>
      </div>

      <!-- 标签 -->
      <div class="text-xs text-brand mb-2">
        {{ vlog.tags[locale] }}
      </div>

      <!-- 我们的点评 -->
      <p class="text-xs text-ink-muted leading-relaxed line-clamp-2 mb-3">
        {{ vlog.review[locale] }}
      </p>

      <!-- 底部元信息 -->
      <div class="flex items-center justify-between text-xs text-ink-muted pt-2.5 border-t border-slate-100">
        <span>{{ vlog.views[locale] }} · {{ vlog.publishedAt[locale] }}</span>
        <span class="text-brand font-medium group-hover:text-brand-dark">
          {{ t('vlogs.watch') }} →
        </span>
      </div>
    </div>
  </a>
</template>
