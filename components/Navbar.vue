<script setup lang="ts">
// 顶部导航栏组件 - 粘性布局、品牌 Logo、导航链接、搜索框、语言切换
const route = useRoute()
const { t, locale, locales } = useI18n()
// 生成本地化路由地址与切换语言的地址
const localePath = useLocalePath()
const switchLocalePath = useSwitchLocalePath()

// 所有可用语言
const availableLocales = computed(() =>
  (locales.value as Array<{ code: string }>).filter(l => l.code !== locale.value)
)

// 导航链接配置（key 用于读取翻译文案）
const navLinks = [
  { key: 'nav.home', to: '/' },
  { key: 'nav.destinations', to: '/#destinations' },
  { key: 'nav.guides', to: '/#guides' },
  { key: 'nav.about', to: '/about' },
]

// 搜索关键词
const searchKeyword = ref('')

// 处理搜索
function handleSearch() {
  if (searchKeyword.value.trim()) {
    navigateTo(localePath(`/?q=${encodeURIComponent(searchKeyword.value.trim())}`))
  }
}

// 判断当前链接是否激活
function isActive(to: string) {
  // 去掉语言前缀后比较
  const path = route.path.replace(/^\/(en|zh)(?=\/|$)/, '') || '/'
  if (to === '/') return path === '/'
  if (to.startsWith('/#')) return false
  return path.startsWith(to)
}
</script>

<template>
  <!-- 顶部导航栏 -->
  <nav class="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm h-[70px] flex items-center justify-between px-4 sm:px-[8%]">
    <!-- 品牌 Logo -->
    <NuxtLink :to="localePath('/')" class="text-2xl font-bold text-brand tracking-wider flex items-center">
      {{ t('brand.name') }}<span class="text-accent">{{ t('brand.highlight') }}</span>
    </NuxtLink>

    <!-- 导航链接 -->
    <ul class="hidden md:flex gap-9 list-none">
      <li v-for="link in navLinks" :key="link.key">
        <NuxtLink
          :to="localePath(link.to)"
          class="text-[15px] transition-colors duration-300 hover:text-brand"
          :class="isActive(link.to) ? 'text-brand font-medium' : 'text-gray-500'"
        >
          {{ t(link.key) }}
        </NuxtLink>
      </li>
    </ul>

    <!-- 右侧操作区：搜索框 + 语言切换 -->
    <div class="flex items-center gap-3">
      <!-- 搜索框 -->
      <div class="flex items-center bg-gray-100 rounded-full px-4 py-1.5">
        <input
          v-model="searchKeyword"
          type="text"
          :placeholder="t('search.placeholder')"
          class="border-none bg-transparent outline-none w-[120px] sm:w-[180px] text-sm"
          @keyup.enter="handleSearch"
        >
      </div>

      <!-- 语言切换按钮 -->
      <NuxtLink
        v-for="l in availableLocales"
        :key="l.code"
        :to="switchLocalePath(l.code)"
        class="flex-shrink-0 px-3 py-1.5 rounded-full border border-brand/40 text-brand text-sm font-medium hover:bg-brand hover:text-white transition-colors"
        :title="t('language.label')"
      >
        {{ l.code === 'en' ? 'EN' : '中' }}
      </NuxtLink>
    </div>
  </nav>
</template>
