<script setup lang="ts">
// B 站 / YouTube 官方播放器「点击加载」组件
// ---------------------------------------------------------------
// 初始为纯 CSS 占位（零外部请求，不自托管任何视频封面图），点击后
// 原地替换为官方 iframe（B 站 player.bilibili.com / YouTube
// youtube-nocookie），封面与播放器均由官方渲染。
// 尺寸由父容器决定：父容器需自备 relative + 16:9 盒子，本组件填满父盒。
const props = withDefaults(defineProps<{
  id: string // B 站 BV 号或 YouTube 视频 id
  provider?: 'bilibili' | 'youtube'
  title?: string
  duration?: string
  featured?: boolean
}>(), { provider: 'bilibili' })

const active = ref(false)

const embedUrl = computed(() => props.provider === 'youtube'
  ? `https://www.youtube-nocookie.com/embed/${props.id}?autoplay=1&rel=0`
  : `https://player.bilibili.com/player.html?bvid=${props.id}&page=1&high_quality=1&danmaku=0&autoplay=1`)
</script>

<template>
  <span class="relative block w-full h-full overflow-hidden">
    <iframe
      v-if="active"
      :src="embedUrl"
      class="absolute inset-0 w-full h-full"
      scrolling="no"
      frameborder="no"
      allowfullscreen
      allow="autoplay; fullscreen; picture-in-picture"
    />
    <button
      v-else
      type="button"
      class="group/p absolute inset-0 w-full h-full bg-gradient-to-br from-slate-700 via-slate-600 to-slate-500 cursor-pointer"
      :aria-label="title || 'Play video'"
      :title="title"
      @click="active = true"
    >
      <span class="absolute inset-0 m-auto w-11 h-11 rounded-full bg-white/90 flex items-center justify-center shadow-md transition-transform duration-300 group-hover/p:scale-110">
        <svg viewBox="0 0 24 24" class="w-5 h-5 text-brand translate-x-px" fill="currentColor" aria-hidden="true">
          <path d="M8 5v14l11-7z" />
        </svg>
      </span>
      <span
        v-if="duration"
        class="absolute bottom-1 right-1 bg-black/75 text-white text-[9px] px-1 rounded"
      >{{ duration }}</span>
      <span
        v-if="featured"
        class="absolute top-1 left-1 bg-brand text-white text-[9px] px-1.5 rounded"
      >★</span>
    </button>
  </span>
</template>
