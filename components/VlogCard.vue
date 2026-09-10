<script setup lang="ts">
// Vlog 卡片组件 - 点击加载官方播放器（不自托管封面图）、平台角标、时长角标、
// 标题/底部「观看」外链原视频（新标签页）
import type { Vlog } from '~/data/hub-data'

const props = defineProps<{
  vlog: Vlog
}>()

const { locale, t } = useI18n()

// 平台配色：Bilibili 粉 / YouTube 红
const platformStyle: Record<string, string> = {
  bilibili: 'bg-pink-600',
  youtube: 'bg-red-600',
}

// 从外链提取可嵌入的视频 id：B 站取 BV 号，YouTube 取 v 参数
const videoId = computed(() => {
  if (props.vlog.platform === 'youtube') {
    try {
      return new URL(props.vlog.externalUrl).searchParams.get('v') || ''
    } catch {
      return ''
    }
  }
  return props.vlog.externalUrl.split('/').pop() || ''
})
</script>

<template>
  <!-- Vlog 卡片：缩略图点击原地播放（官方 iframe），标题/底部外链原视频 -->
  <div class="card group block overflow-hidden hover:-translate-y-1 hover:shadow-lg hover:shadow-black/10">
    <!-- 播放器占位区（点击加载） -->
    <div class="relative aspect-video overflow-hidden bg-slate-200">
      <BiliPlayer
        :id="videoId"
        :provider="vlog.platform"
        :title="vlog.title[locale]"
        :cover="vlog.cover"
      >
      </BiliPlayer>
      <!-- 平台角标 -->
      <span
        class="absolute top-2 right-2 text-white text-[10px] font-semibold px-2 py-0.5 rounded pointer-events-none"
        :class="platformStyle[vlog.platform]"
      >
        {{ t(`vlogs.platforms.${vlog.platform}`) }}
      </span>
      <!-- 时长角标 -->
      <span class="absolute bottom-2 right-2 bg-black/75 text-white text-[11px] px-1.5 py-0.5 rounded pointer-events-none">
        {{ vlog.duration }}
      </span>
    </div>

    <!-- 内容区 -->
    <div class="p-4">
      <!-- 标题（两行截断，外链原视频） -->
      <a
        :href="vlog.externalUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="block mb-2"
      >
        <h3 class="text-[15px] text-ink font-semibold leading-snug line-clamp-2 group-hover:text-brand transition-colors">
          {{ vlog.title[locale] }}
        </h3>
      </a>

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
        <a
          :href="vlog.externalUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="text-brand font-medium group-hover:text-brand-dark"
        >
          {{ t('vlogs.watch') }} →
        </a>
      </div>
    </div>
  </div>
</template>
