<script setup lang="ts">
// PDF 风格的双语章节头：彩色竖条 + 「中文 · ENGLISH」+ 副标题
// 借鉴蚂蜂窝攻略的章节标题版式，但使用站点自有品牌色
const props = defineProps<{
  zh: string
  en: string
  subtitle?: string
}>()

const { locale } = useI18n()
// 按当前语言决定主标题与次要标题
const primary = computed(() => (locale.value === 'zh' ? props.zh : props.en))
const secondary = computed(() => (locale.value === 'zh' ? props.en : props.zh))
</script>

<template>
  <div class="mb-10">
    <div class="flex items-center gap-3">
      <span class="block w-[5px] h-9 bg-brand rounded-sm shrink-0"></span>
      <h2 class="leading-tight">
        <span class="text-2xl md:text-3xl font-bold text-gray-900">{{ primary }}</span>
        <span class="text-brand mx-2 font-light">·</span>
        <span class="text-lg md:text-xl font-semibold tracking-wider uppercase text-gray-400">{{ secondary }}</span>
      </h2>
    </div>
    <p
      v-if="subtitle"
      class="text-gray-500 text-sm mt-2.5 ml-2 max-w-2xl"
    >
      {{ subtitle }}
    </p>
  </div>
</template>
