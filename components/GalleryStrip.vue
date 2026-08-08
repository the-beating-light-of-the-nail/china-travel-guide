<script setup lang="ts">
// PDF 风格的「亮点」图廊：模拟攻略里 Highlights 页的多图缩略图墙
defineProps<{
  images: string[]
  alt?: string
}>()
</script>

<template>
  <div
    v-if="images && images.length"
    class="grid grid-cols-2 md:grid-cols-4 gap-3"
  >
    <div
      v-for="(img, i) in images"
      :key="i"
      class="overflow-hidden rounded-lg shadow-sm aspect-[4/3] bg-gray-100"
      :class="{ 'col-span-2 row-span-2 aspect-auto md:aspect-auto': i === 0 && images.length > 4 }"
    >
      <img
        :src="img"
        :alt="`${alt || 'Gallery'} ${i + 1}`"
        loading="lazy"
        class="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
      >
    </div>
  </div>
</template>
