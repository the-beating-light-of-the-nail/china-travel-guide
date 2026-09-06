<script setup lang="ts">
// 徒步路线卡片 - 难度角标、关键数据、路线简介、许可证提示、精选 B 站视频列表
import type { HikingRoute } from '~/data/hiking-data'
import { hikingVideoUrl, hikingVideoThumb } from '~/data/hiking-data'

const props = defineProps<{
  route: HikingRoute
}>()

const { locale, t } = useI18n()

// 难度阶梯配色（与图片里的难度阶梯图呼应：绿→蓝→琥珀→玫红）
const tierStyle: Record<string, string> = {
  beginner: 'bg-emerald-500',
  classic: 'bg-sky-500',
  challenging: 'bg-amber-500',
  expedition: 'bg-rose-500',
}
</script>

<template>
  <article class="card group overflow-hidden flex flex-col hover:-translate-y-1 hover:shadow-lg hover:shadow-black/10 transition-all">
    <!-- 头图：路线封面（精选视频封面）+ 难度角标 + 名称 -->
    <div class="relative aspect-[16/8] overflow-hidden bg-slate-100">
      <img
        :src="route.image"
        :alt="route.name[locale]"
        loading="lazy"
        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
      >
      <!-- 底部渐变 scrim 保证名称可读 -->
      <div class="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/70 to-transparent pointer-events-none" />
      <!-- 难度角标 -->
      <span
        class="absolute top-3 left-3 text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wide"
        :class="tierStyle[route.tier]"
      >
        {{ t(`hiking.tiers.${route.tier}`) }}
      </span>
      <!-- 地区 -->
      <span class="absolute top-3 right-3 bg-black/60 text-white text-[10px] font-medium px-2 py-1 rounded">
        {{ route.region[locale] }}
      </span>
      <!-- 名称 -->
      <h3 class="absolute bottom-3 left-4 right-4 text-white text-lg font-bold leading-snug drop-shadow">
        {{ route.name[locale] }}
      </h3>
    </div>

    <!-- 内容区 -->
    <div class="p-4 md:p-5 flex flex-col flex-1">
      <!-- 一句话卖点 -->
      <p class="text-[13px] text-brand font-medium leading-snug mb-3">
        {{ route.tagline[locale] }}
      </p>

      <!-- 关键数据四宫格 -->
      <div class="grid grid-cols-4 gap-2 mb-3">
        <div class="bg-slate-50 rounded-lg px-2 py-1.5 text-center">
          <p class="text-[10px] text-ink-muted">{{ t('hiking.daysLabel') }}</p>
          <p class="text-[11px] text-ink font-semibold leading-tight mt-0.5">{{ route.days[locale] }}</p>
        </div>
        <div class="bg-slate-50 rounded-lg px-2 py-1.5 text-center">
          <p class="text-[10px] text-ink-muted">{{ t('hiking.distanceLabel') }}</p>
          <p class="text-[11px] text-ink font-semibold leading-tight mt-0.5">{{ route.distance[locale] }}</p>
        </div>
        <div class="bg-slate-50 rounded-lg px-2 py-1.5 text-center">
          <p class="text-[10px] text-ink-muted">{{ t('hiking.altitudeLabel') }}</p>
          <p class="text-[11px] text-ink font-semibold leading-tight mt-0.5">{{ route.maxAltitude[locale] }}</p>
        </div>
        <div class="bg-slate-50 rounded-lg px-2 py-1.5 text-center">
          <p class="text-[10px] text-ink-muted">{{ t('hiking.seasonLabel') }}</p>
          <p class="text-[11px] text-ink font-semibold leading-tight mt-0.5">{{ route.season[locale] }}</p>
        </div>
      </div>

      <!-- 路线简介 -->
      <p class="text-xs text-ink-muted leading-relaxed line-clamp-4 mb-3">
        {{ route.description[locale] }}
      </p>

      <!-- 许可证/后勤提示 -->
      <p class="text-[11px] text-ink-body leading-relaxed bg-amber-50 border border-amber-100 rounded-lg px-3 py-2 mb-3">
        <span class="font-semibold">⚠ {{ t('hiking.permitLabel') }}:</span> {{ route.permit[locale] }}
      </p>

      <!-- 亮点标签 -->
      <div class="flex flex-wrap gap-1.5 mb-4">
        <span
          v-for="h in route.highlights[locale].split(',')"
          :key="h"
          class="text-[10px] text-brand bg-brand-tint px-2 py-0.5 rounded-full"
        >
          {{ h.trim() }}
        </span>
      </div>

      <!-- 精选视频列表 -->
      <div class="mt-auto pt-3 border-t border-slate-100">
        <p class="text-xs font-semibold text-ink mb-2.5">
          🎬 {{ t('hiking.videosLabel') }} · Bilibili
        </p>
        <ul class="list-none space-y-2.5">
          <li v-for="v in route.videos" :key="v.bvid">
            <a
              :href="hikingVideoUrl(v.bvid)"
              target="_blank"
              rel="noopener noreferrer"
              class="flex gap-3 group/v"
            >
              <span class="relative w-[104px] shrink-0 aspect-video rounded overflow-hidden bg-slate-100">
                <img
                  :src="hikingVideoThumb(v.bvid)"
                  :alt="v.title[locale]"
                  loading="lazy"
                  class="w-full h-full object-cover transition-transform duration-500 group-hover/v:scale-[1.05]"
                >
                <span class="absolute bottom-1 right-1 bg-black/75 text-white text-[9px] px-1 rounded">
                  {{ v.duration }}
                </span>
              </span>
              <span class="min-w-0 flex-1">
                <span class="block text-[12px] text-ink font-medium leading-snug line-clamp-2 group-hover/v:text-brand transition-colors">
                  {{ v.title[locale] }}
                </span>
                <span class="block text-[10px] text-ink-muted mt-1">
                  {{ v.vloggerName }} · {{ v.viewsText[locale] }} · {{ v.publishedAt[locale] }}
                </span>
              </span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </article>
</template>
