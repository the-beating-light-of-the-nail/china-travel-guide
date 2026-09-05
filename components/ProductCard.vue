<script setup lang="ts">
// 购物推荐卡片 - 图片、品类角标、退税徽章、名称、参考价、避坑等级、去哪买
import type { ShoppingItem } from '~/data/shopping-data'

const props = defineProps<{
  item: ShoppingItem
}>()

const { locale, t } = useI18n()

// 避坑等级配色：低绿 / 中黄 / 高红
const riskStyle: Record<string, string> = {
  low: 'bg-emerald-100 text-emerald-700',
  medium: 'bg-amber-100 text-amber-700',
  high: 'bg-rose-100 text-rose-700',
}
</script>

<template>
  <!-- 商品卡片：信息展示卡（无外链） -->
  <article class="card group overflow-hidden flex flex-col hover:-translate-y-1 hover:shadow-lg hover:shadow-black/10 transition-all">
    <!-- 图片区 -->
    <div class="relative aspect-[4/3] overflow-hidden bg-slate-100">
      <img
        :src="item.image"
        :alt="item.name[locale]"
        loading="lazy"
        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
      >
      <!-- 品类角标 -->
      <span class="absolute top-2 left-2 bg-black/70 text-white text-[10px] font-semibold px-2 py-0.5 rounded">
        {{ t(`shopping.categories.${item.category}`) }}
      </span>
      <!-- 退税徽章 -->
      <span
        v-if="item.taxRefund"
        class="absolute top-2 right-2 bg-emerald-500/90 text-white text-[10px] font-semibold px-2 py-0.5 rounded"
      >
        {{ t('shopping.taxRefundBadge') }}
      </span>
    </div>

    <!-- 内容区 -->
    <div class="p-4 flex flex-col flex-1">
      <!-- 名称 + 避坑等级 -->
      <div class="flex items-start justify-between gap-2 mb-1.5">
        <h3 class="text-[15px] text-ink font-semibold leading-snug">
          {{ item.name[locale] }}
        </h3>
        <span
          class="shrink-0 text-[10px] font-medium px-1.5 py-0.5 rounded mt-0.5"
          :class="riskStyle[item.fakeRisk]"
        >
          {{ t(`shopping.risk.${item.fakeRisk}`) }}
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

      <!-- 底部：参考价 + 去哪买 -->
      <div class="mt-auto pt-2.5 border-t border-slate-100 space-y-1">
        <p class="text-xs text-ink-body">
          <span class="text-ink-muted">{{ t('shopping.priceLabel') }}:</span>
          <span class="font-semibold">{{ item.priceRef[locale] }}</span>
        </p>
        <p class="text-xs text-ink-muted leading-snug">
          <span>{{ t('shopping.whereLabel') }}:</span> {{ item.whereToBuy[locale] }}
        </p>
      </div>
    </div>
  </article>
</template>
