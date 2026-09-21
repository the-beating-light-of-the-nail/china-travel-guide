<script setup lang="ts">
// 全局错误页（404 / 500）——替换 Nitro 默认的裸 JSON 错误输出
// 状态码由 Nitro 按错误对象返回（404 保持 404），此处只负责可读的 HTML 界面
const props = defineProps<{
  error: {
    url?: string
    statusCode: number
    statusMessage?: string
    message?: string
  }
}>()

const is404 = computed(() => props.error.statusCode === 404)
const title = computed(() => (is404.value ? 'Page Not Found' : `Error ${props.error.statusCode}`))

// 从出错 URL 解析语言前缀，让「返回」按钮落回同一语言；无法识别则回默认英文
const { public: pub } = useRuntimeConfig()
const localeCodes = ['en', 'zh', 'ko', 'ja', 'th', 'de', 'fr', 'es', 'it']
const pathLocale = computed(() => {
  const m = props.error.url?.match(/^https?:\/\/[^/]+\/([a-z]{2})(?:\/|$|\?)/)
  return m && localeCodes.includes(m[1]) ? m[1] : 'en'
})
const homeHref = computed(() => `${pub.siteUrl}/${pathLocale.value}/`)

useHead({
  title: `${title.value} | With My Eyes`,
  meta: [
    { name: 'description', content: is404.value ? 'The page you are looking for does not exist or has moved.' : 'Something went wrong on our side. Please try again.' },
    { name: 'robots', content: 'noindex' },
  ],
})
</script>

<template>
  <NuxtLayout>
    <main class="min-h-[60vh] flex flex-col items-center justify-center text-center px-5 py-24">
      <div class="text-7xl md:text-8xl font-bold text-brand mb-6">{{ error.statusCode }}</div>
      <h1 class="text-2xl md:text-3xl font-bold text-ink mb-3">{{ title }}</h1>
      <p class="text-ink-muted text-base mb-10 max-w-md">
        {{ is404
          ? 'The page you are looking for does not exist or has moved. It might have been a typo in the address.'
          : (error.statusMessage || 'Something went wrong while loading this page.') }}
      </p>
      <div class="flex gap-4 flex-wrap justify-center">
        <a :href="homeHref" class="btn-primary rounded-full inline-block">Back to Home</a>
        <NuxtLink :to="`/${pathLocale}/guides/`" class="btn-secondary rounded-full inline-block">
          Browse Guides
        </NuxtLink>
      </div>
    </main>
  </NuxtLayout>
</template>
