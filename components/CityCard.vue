<script setup lang="ts">
// 城市卡片组件 - 图片、覆盖层、标签、名称、描述
interface City {
  name: string
  slug: string
  heroImage: string
  tagline: string
  region: string
  tags: string
}

const props = defineProps<{
  city: City
}>()

// 解析标签，取第一个作为显示标签
const displayTag = computed(() => {
  const tags = props.city.tags?.split(',').map(t => t.trim()).filter(Boolean)
  return tags && tags.length > 0 ? tags[0] : props.city.region
})
</script>

<template>
  <!-- 城市卡片 -->
  <NuxtLink
    :to="`/cities/${city.slug}`"
    class="group relative rounded-[14px] overflow-hidden h-[320px] block cursor-pointer shadow-md transition-all duration-400 hover:-translate-y-1.5 hover:shadow-2xl"
  >
    <!-- 标签 -->
    <div class="absolute top-4 right-4 z-10 bg-white/90 text-accent px-3 py-1 rounded-full text-xs font-medium">
      {{ displayTag }}
    </div>

    <!-- 城市图片 -->
    <img
      :src="city.heroImage"
      :alt="city.name"
      class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
    >

    <!-- 底部覆盖层 -->
    <div class="absolute bottom-0 left-0 right-0 p-5 pt-[30px] bg-gradient-to-t from-black/75 to-transparent text-white">
      <h3 class="text-[22px] mb-1.5 font-semibold">{{ city.name }}</h3>
      <p class="text-[13px] opacity-85">{{ city.tagline }}</p>
    </div>
  </NuxtLink>
</template>
