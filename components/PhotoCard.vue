<script setup lang="ts">
// 图片卡片组件 - 瀑布流用：图片 + hover 渐变遮罩（地点/拍摄者/标签），点击抛出事件打开 Lightbox
import type { Photo } from '~/data/hub-data'

defineProps<{
  photo: Photo
}>()

const { locale, t } = useI18n()

// 点击图片（父组件打开 Lightbox）
const emit = defineEmits<{
  (e: 'open', photo: Photo): void
}>()
</script>

<template>
  <div
    class="masonry-item group relative rounded-xl overflow-hidden cursor-zoom-in bg-slate-100 border border-slate-200"
    @click="emit('open', photo)"
  >
    <img
      :src="photo.image"
      :alt="photo.description[locale]"
      loading="lazy"
      class="w-full block transition-transform duration-500 group-hover:scale-[1.03]"
    >

    <!-- hover 渐变遮罩 -->
    <div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
      <div class="text-white text-sm font-semibold">
        {{ photo.location[locale] }}
      </div>
      <div v-if="photo.photographer" class="text-white/70 text-xs mt-0.5">
        {{ t('photos.byLabel') }} @{{ photo.photographer }}
      </div>
      <div class="text-sky-300 text-xs mt-1">
        {{ photo.tags[locale] }}
      </div>
    </div>
  </div>
</template>
