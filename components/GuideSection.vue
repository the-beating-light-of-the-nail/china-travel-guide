<script setup lang="ts">
// 章节头：彩色竖条 + 主标题 · 次标题（另一主力语言点缀）+ 副标题（trip.com 风格浅色）
// sectionKey：i18n key（citySections.*），主标题按当前语言本地化（9 种语言完整覆盖）；
//             次标题固定展示英文（英文页展示中文）。
// 未传 sectionKey 时回退旧 zh/en 双语 props（历史调用兼容）。
import enTitles from '~/i18n/locales/en.json'
import zhTitles from '~/i18n/locales/zh.json'

const props = defineProps<{
  sectionKey?: string
  zh?: string
  en?: string
  subtitle?: string
}>()

const enMap = (enTitles as { citySections: Record<string, string> }).citySections
const zhMap = (zhTitles as { citySections: Record<string, string> }).citySections

const { t, locale } = useI18n()
// 主标题：sectionKey 走 i18n 全语言本地化；否则旧双语逻辑
const primary = computed(() => {
  if (props.sectionKey) return t(`citySections.${props.sectionKey}`)
  return locale.value === 'zh' ? props.zh : props.en
})
// 次标题：英文页点缀中文，其余语言（含中文页）点缀英文
const secondary = computed(() => {
  if (props.sectionKey) {
    return locale.value === 'en' ? zhMap[props.sectionKey] : enMap[props.sectionKey]
  }
  return locale.value === 'zh' ? props.en : props.zh
})
</script>

<template>
  <div class="mb-10">
    <div class="flex items-center gap-3">
      <span class="block w-[5px] h-9 bg-brand rounded-sm shrink-0"></span>
      <h2 class="leading-tight">
        <span class="text-2xl md:text-3xl font-bold text-ink">{{ primary }}</span>
        <span class="text-brand mx-2 font-light">·</span>
        <span class="text-lg md:text-xl font-semibold tracking-wider uppercase text-slate-400">{{ secondary }}</span>
      </h2>
    </div>
    <p
      v-if="subtitle"
      class="text-ink-muted text-sm mt-2.5 ml-2 max-w-2xl"
    >
      {{ subtitle }}
    </p>
  </div>
</template>
