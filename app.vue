<script setup lang="ts">
// 全站 SEO 信号集中发射：
// - canonical / og:url：一律带尾斜杠（Vercel 静态输出强制 /en 301 到 /en/，信号侧跟随）
// - hreflang alternate：集中在此发射，页面不再各自 spread。
//   i18n 模块会为每个语言同时发裸码（en）与区域码（en-US）两条且指向同一 URL，
//   这里过滤掉裸码，仅保留 xx-XX 与 x-default，避免重复标注。
const route = useRoute()
const { public: pub } = useRuntimeConfig()
const canonical = computed(() => {
  let p = route.path
  if (p.length > 1 && !p.endsWith('/')) p = `${p}/`
  return `${pub.siteUrl}${p}`
})
const i18nHead = useLocaleHead()
const alternateLinks = computed(() =>
  ((i18nHead.value.link || []) as Array<Record<string, unknown>>)
    .filter(l => l.rel === 'alternate' && typeof l.hreflang === 'string'
      && (l.hreflang === 'x-default' || l.hreflang.includes('-')))
    .map(({ id, ...l }) => l)
)
useHead({
  link: computed(() => [
    { rel: 'canonical', href: canonical.value },
    ...alternateLinks.value,
  ]),
  meta: computed(() => [
    { property: 'og:url', content: canonical.value },
    // X/Twitter 卡片：title/description/image 缺省回落到对应 og:* 标签
    { name: 'twitter:card', content: 'summary_large_image' },
  ]),
})
</script>

<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
