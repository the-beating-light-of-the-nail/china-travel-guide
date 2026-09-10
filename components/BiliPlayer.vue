<script setup lang="ts">
// 视频官方播放器「点击加载」组件（B 站 player.bilibili.com / YouTube nocookie）
// ---------------------------------------------------------------
// 封面：可选 cover（官方 CDN 热链 URL，经 referrerpolicy="no-referrer" 由
// 官方直接渲染；本地零存储）。加载失败或未提供时回退到纯 CSS 占位。
// 点击后原地替换为官方 iframe。
// 尺寸由父容器决定：父容器需自备 relative + 16:9 盒子，本组件填满父盒。
// size="lg" 用于整幅展示位（聚光灯等）：更大的播放钮与平台提示。
// auto：滚动进入视口即自动加载官方 iframe（官方封面直接可见），
//       仅建议每页至多一处使用，避免页面被多个播放器拖慢。
const props = withDefaults(defineProps<{
  id: string // B 站 BV 号或 YouTube 视频 id
  provider?: 'bilibili' | 'youtube'
  title?: string
  duration?: string
  featured?: boolean
  cover?: string
  size?: 'sm' | 'lg'
  auto?: boolean
}>(), { provider: 'bilibili', size: 'sm', auto: false })

const { t } = useI18n()
const active = ref(false)
const imgFailed = ref(false)
const rootEl = ref<HTMLElement | null>(null)

const embedUrl = computed(() => props.provider === 'youtube'
  ? `https://www.youtube-nocookie.com/embed/${props.id}?autoplay=1&rel=0`
  : `https://player.bilibili.com/player.html?bvid=${props.id}&page=1&high_quality=1&danmaku=0&autoplay=1`)

const platformName = computed(() => props.provider === 'youtube' ? 'YouTube' : 'bilibili')
const showCover = computed(() => !!props.cover && !imgFailed.value)

// auto 模式：占位进入视口即换官方 iframe（封面由官方渲染）
onMounted(() => {
  if (!props.auto || !rootEl.value || typeof IntersectionObserver === 'undefined') return
  const io = new IntersectionObserver((entries) => {
    if (entries.some(e => e.isIntersecting)) {
      active.value = true
      io.disconnect()
    }
  }, { rootMargin: '200px' })
  io.observe(rootEl.value)
  onBeforeUnmount(() => io.disconnect())
})
</script>

<template>
  <span ref="rootEl" class="bili-player block relative w-full h-full overflow-hidden">
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
      class="group/p absolute inset-0 w-full h-full cursor-pointer"
      :class="showCover ? 'bg-slate-200' : 'bg-gradient-to-br from-slate-700 via-slate-600 to-slate-500'"
      :aria-label="title || 'Play video'"
      :title="title"
      @click="active = true"
    >
      <!-- 封面（官方 CDN 热链，no-referrer 防盗链豁免；失败回退占位样式） -->
      <img
        v-if="showCover"
        :src="cover"
        :alt="title || 'Video cover'"
        referrerpolicy="no-referrer"
        loading="lazy"
        class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover/p:scale-[1.04]"
        @error="imgFailed = true"
      >
      <!-- 无封面占位的细微斜纹纹理：让占位看起来像刻意的视频位，而不是缺图 -->
      <span
        v-if="!showCover"
        class="absolute inset-0 opacity-[0.06] pointer-events-none"
        style="background: repeating-linear-gradient(135deg, #fff 0 2px, transparent 2px 14px)"
        aria-hidden="true"
      />
      <!-- hover 轻微压暗，突出播放钮 -->
      <span
        v-if="showCover"
        class="absolute inset-0 bg-black/0 group-hover/p:bg-black/25 transition-colors pointer-events-none"
        aria-hidden="true"
      />
      <!-- 播放钮（无封面时常驻；有封面时 hover 浮现）+ 平台提示 -->
      <span
        class="absolute inset-x-0 top-[38%] flex flex-col items-center pointer-events-none transition-opacity"
        :class="[size === 'lg' ? 'gap-2.5' : 'gap-1.5', showCover ? 'opacity-0 group-hover/p:opacity-100' : 'opacity-100']"
      >
        <span
          class="rounded-full bg-white/95 flex items-center justify-center shadow-md transition-transform duration-300 group-hover/p:scale-110"
          :class="size === 'lg' ? 'w-16 h-16' : 'w-11 h-11'"
        >
          <svg viewBox="0 0 24 24" :class="size === 'lg' ? 'w-7 h-7' : 'w-5 h-5'" class="text-brand translate-x-px" fill="currentColor" aria-hidden="true">
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
        <span
          class="text-white/75 font-medium tracking-wide drop-shadow"
          :class="size === 'lg' ? 'text-xs' : 'text-[9px]'"
        >
          {{ t('vlogs.watch') }} · {{ platformName }}
        </span>
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
