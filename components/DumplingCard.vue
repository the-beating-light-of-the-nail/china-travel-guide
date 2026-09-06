<script setup lang="ts">
// 饺子图鉴卡片 - 图片、做法角标、辣度、素馅徽章、名称、参考价、去哪吃
import type { DumplingItem } from '~/data/dumpling-data'

defineProps<{
  item: DumplingItem
}>()

const { locale, t } = useI18n()

// 辣度配色：不辣灰 / 微辣琥珀 / 麻辣红
const spiceStyle: Record<string, string> = {
  none: 'bg-slate-100 text-slate-600',
  medium: 'bg-amber-100 text-amber-700',
  spicy: 'bg-rose-100 text-rose-700',
}
</script>

<template>
  <!-- 饺子卡片：信息展示卡（无外链） -->
  <article class="card group overflow-hidden flex flex-col hover:-translate-y-1 hover:shadow-lg hover:shadow-black/10 transition-all">
    <!-- 图片区 -->
    <div class="relative aspect-[4/3] overflow-hidden bg-slate-100">
      <img
        :src="item.image"
        :alt="item.name[locale]"
        loading="lazy"
        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
      >
      <!-- 做法角标 -->
      <span class="absolute top-2 left-2 bg-black/70 text-white text-[10px] font-semibold px-2 py-0.5 rounded">
        {{ t(`dumplings.categories.${item.category}`) }}
      </span>
      <!-- 素馅徽章 -->
      <span
        v-if="item.vegOption"
        class="absolute top-2 right-2 bg-emerald-500/90 text-white text-[10px] font-semibold px-2 py-0.5 rounded"
      >
        {{ t('dumplings.vegBadge') }}
      </span>
    </div>

    <!-- 内容区 -->
    <div class="p-4 flex flex-col flex-1">
      <!-- 名称 + 辣度 -->
      <div class="flex items-start justify-between gap-2 mb-1.5">
        <h3 class="text-[15px] text-ink font-semibold leading-snug">
          {{ item.name[locale] }}
        </h3>
        <span
          v-if="item.spice !== 'none'"
          class="shrink-0 text-[10px] font-medium px-1.5 py-0.5 rounded mt-0.5"
          :class="spiceStyle[item.spice]"
        >
          {{ t(`dumplings.spice.${item.spice}`) }}
        </span>
      </div>

      <!-- 一句话卖点 -->
      <p class="text-[13px] text-brand font-medium leading-snug mb-2">
        {{ item.tagline[locale] }}
      </p>

      <!-- 详细说明 -->
      <p class="text-xs text-ink-muted leading-relaxed line-clamp-3 mb-3">
        {{ item.description[locale] }}
      </p>

      <!-- 底部：参考价 + 去哪吃 -->
      <div class="mt-auto pt-2.5 border-t border-slate-100 space-y-1">
        <p class="text-xs text-ink-body">
          <span class="text-ink-muted">{{ t('dumplings.priceLabel') }}:</span>
          <span class="font-semibold">{{ item.priceRef[locale] }}</span>
        </p>
        <p class="text-xs text-ink-muted leading-snug">
          <span>{{ t('dumplings.whereLabel') }}:</span> {{ item.whereToEat[locale] }}
        </p>
      </div>
    </div>
  </article>
</template>
