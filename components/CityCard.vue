<script setup lang="ts">
// 城市卡片组件 - 图片、覆盖层、标签、名称、描述
import type { CitySummary } from '~/data/travel-data'

const props = defineProps<{
  city: CitySummary
}>()

const { locale, t } = useI18n()
const localePath = useLocalePath()

// 解析标签，取第一个作为显示标签（按当前语言）
const displayTag = computed(() => {
  const localized = props.city.tags[locale.value]
  const tags = localized?.split(',').map(s => s.trim()).filter(Boolean)
  return tags && tags.length > 0 ? tags[0] : t(`regions.${props.city.region[locale.value]}`, props.city.region[locale.value])
})
</script>

<template>
  <!-- 城市卡片 -->
  <NuxtLink
    :to="localePath(`/cities/${city.slug}`)"
    class="group relative rounded-[14px] overflow-hidden h-[320px] block cursor-pointer shadow-md transition-all duration-400 hover:-translate-y-1.5 hover:shadow-2xl"
  >
    <!-- 标签 -->
    <div class="absolute top-4 right-4 z-10 bg-white/90 text-accent px-3 py-1 rounded-full text-xs font-medium">
      {{ displayTag }}
    </div>

    <!-- 城市图片 -->
    <img
      :src="city.heroImage"
      :alt="city.name[locale]"
      class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
    >

    <!-- 底部覆盖层 -->
    <div class="absolute bottom-0 left-0 right-0 p-5 pt-[30px] bg-gradient-to-t from-black/75 to-transparent text-white">
      <h3 class="text-[22px] mb-1.5 font-semibold">{{ city.name[locale] }}</h3>
      <p class="text-[13px] opacity-85">{{ city.tagline[locale] }}</p>
    </div>
  </NuxtLink>
</template>
