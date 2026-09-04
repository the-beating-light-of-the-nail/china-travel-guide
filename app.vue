<script setup lang="ts">
// 全站自指 canonical（og:url 同源）：
// URL 形态必须与 sitemap 及最终落地 URL 一致 —— 一律不带尾斜杠（vercel.json trailingSlash: false）
const route = useRoute()
const { public: pub } = useRuntimeConfig()
const canonical = computed(() => {
  let p = route.path
  if (p.length > 1 && p.endsWith('/')) p = p.slice(0, -1)
  return `${pub.siteUrl}${p}`
})
useHead({
  link: [{ rel: 'canonical', href: canonical }],
  meta: [{ property: 'og:url', content: canonical }],
})
</script>

<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
