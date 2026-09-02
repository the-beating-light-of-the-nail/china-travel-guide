<script setup lang="ts">
// 外部攻略卡片组件 - 来源徽章、标题、点评摘要、标签、阅读原文外链
import type { ExternalGuide } from '~/data/hub-data'

const props = defineProps<{
  guide: ExternalGuide
}>()

const { locale, t } = useI18n()

// 来源徽章配色（按来源名首字母确定性取色，避免随机）
const badgePalette = [
  'bg-blue-500', 'bg-emerald-500', 'bg-pink-500', 'bg-amber-500', 'bg-violet-500', 'bg-cyan-500',
]
const badgeClass = computed(() =>
  badgePalette[props.guide.sourceName.charCodeAt(0) % badgePalette.length]
)
</script>

<template>
  <!-- 攻略卡片 -->
  <div class="card-dark p-5 card-hover flex flex-col">
    <!-- 来源行 -->
    <div class="flex items-center gap-2.5 mb-3">
      <span
        class="w-6 h-6 rounded-md flex items-center justify-center text-white text-xs font-bold shrink-0"
        :class="badgeClass"
      >
        {{ guide.sourceName.slice(0, 1) }}
      </span>
      <span class="text-[13px] text-slate-300">{{ guide.sourceName }}</span>
      <!-- 语言标识 -->
      <span class="ml-auto text-[10px] uppercase tracking-wider text-slate-500 border border-slate-700 rounded px-1.5 py-0.5">
        {{ guide.language === 'en' ? 'EN' : '中文' }}
      </span>
    </div>

    <!-- 标题 -->
    <h3 class="text-base text-slate-50 mb-2 font-semibold leading-snug">
      {{ guide.title[locale] }}
    </h3>

    <!-- 我们的点评摘要 -->
    <p class="text-sm text-slate-400 leading-relaxed mb-3 flex-1">
      {{ guide.summary[locale] }}
    </p>

    <!-- 标签 -->
    <div class="text-xs text-blue-400 mb-4">
      {{ guide.tags[locale] }}
    </div>

    <!-- 底部：阅读原文 + 阅读时长 -->
    <div class="flex items-center justify-between pt-3 border-t border-slate-700">
      <span class="text-xs text-slate-500">{{ guide.readTime[locale] }}</span>
      <a
        :href="guide.externalUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="text-sm text-brand hover:text-brand-light font-medium transition-colors"
      >
        {{ t('guidesHub.readOriginal') }}
      </a>
    </div>
  </div>
</template>
