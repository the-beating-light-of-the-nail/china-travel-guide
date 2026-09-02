<script setup lang="ts">
// 顶部导航栏组件 - 粘性布局、品牌 Logo、导航链接、搜索框、语言切换（深色主题）
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
  { key: 'nav.destinations', to: '/#destinations' },
  { key: 'nav.vlogs', to: '/vlogs' },
  { key: 'nav.guides', to: '/guides' },
  { key: 'nav.photos', to: '/photos' },
  { key: 'nav.services', to: '/services' },
  { key: 'nav.about', to: '/about' },
]

// 移动端菜单展开状态
const menuOpen = ref(false)

// 搜索关键词
const searchKeyword = ref('')

// 处理搜索：跳转到 Vlog 聚合页并带关键词
function handleSearch() {
  if (searchKeyword.value.trim()) {
    navigateTo(localePath(`/vlogs?q=${encodeURIComponent(searchKeyword.value.trim())}`))
    menuOpen.value = false
  }
}

// 判断当前链接是否激活
function isActive(to: string) {
  // 去掉语言前缀后比较
  const path = route.path.replace(/^\/(en|zh)(?=\/|$)/, '') || '/'
  if (to === '/') return path === '/'
  if (to.startsWith('/#')) return false
  return path === to || path.startsWith(`${to}/`)
}
</script>

<template>
  <!-- 顶部导航栏 -->
  <nav class="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 h-[70px] flex items-center justify-between px-4 sm:px-[5%]">
    <!-- 品牌 Logo -->
    <NuxtLink :to="localePath('/')" class="text-[22px] font-bold text-slate-50 tracking-wide flex items-center shrink-0">
      {{ t('brand.name') }}<span class="text-brand">{{ t('brand.highlight') }}</span>
    </NuxtLink>

    <!-- 导航链接（桌面端） -->
    <ul class="hidden lg:flex gap-7 list-none">
      <li v-for="link in navLinks" :key="link.key">
        <NuxtLink
          :to="localePath(link.to)"
          class="text-[14px] transition-colors duration-300 hover:text-white"
          :class="isActive(link.to) ? 'text-brand-light font-medium' : 'text-slate-400'"
        >
          {{ t(link.key) }}
        </NuxtLink>
      </li>
    </ul>

    <!-- 右侧操作区：搜索框 + 语言切换（桌面端） -->
    <div class="hidden lg:flex items-center gap-3">
      <!-- 搜索框 -->
      <div class="flex items-center bg-slate-800 border border-slate-700 rounded-full px-4 py-1.5 focus-within:border-brand transition-colors">
        <span class="text-slate-500 mr-2 text-sm">⌕</span>
        <input
          v-model="searchKeyword"
          type="text"
          :placeholder="t('search.placeholder')"
          class="border-none bg-transparent outline-none w-[170px] text-sm text-slate-100 placeholder-slate-500"
          @keyup.enter="handleSearch"
        >
      </div>

      <!-- 语言切换按钮 -->
      <NuxtLink
        v-for="l in availableLocales"
        :key="l.code"
        :to="switchLocalePath(l.code)"
        class="flex-shrink-0 px-3 py-1.5 rounded-full border border-slate-600 text-slate-300 text-sm font-medium hover:bg-brand hover:border-brand hover:text-white transition-colors"
        :title="t('language.label')"
      >
        {{ l.code === 'en' ? 'EN' : '中' }}
      </NuxtLink>
    </div>

    <!-- 移动端：搜索 + 菜单按钮 -->
    <div class="flex lg:hidden items-center gap-2">
      <button
        class="text-slate-300 hover:text-white text-xl px-2"
        :aria-label="t('search.placeholder')"
        @click="navigateTo(localePath('/vlogs'))"
      >
        ⌕
      </button>
      <button
        class="text-slate-300 hover:text-white text-2xl px-2 leading-none"
        aria-label="Menu"
        @click="menuOpen = !menuOpen"
      >
        {{ menuOpen ? '×' : '☰' }}
      </button>
    </div>

    <!-- 移动端下拉菜单 -->
    <div
      v-if="menuOpen"
      class="lg:hidden absolute top-[70px] left-0 right-0 bg-slate-900/98 backdrop-blur-md border-b border-slate-800 px-6 py-4"
    >
      <ul class="list-none space-y-3">
        <li v-for="link in navLinks" :key="link.key">
          <NuxtLink
            :to="localePath(link.to)"
            class="block text-[15px] text-slate-300 hover:text-white py-1"
            @click="menuOpen = false"
          >
            {{ t(link.key) }}
          </NuxtLink>
        </li>
        <li class="pt-2 border-t border-slate-800">
          <NuxtLink
            v-for="l in availableLocales"
            :key="l.code"
            :to="switchLocalePath(l.code)"
            class="inline-block mr-3 text-[15px] text-brand-light py-1"
          >
            {{ l.code === 'en' ? 'EN' : '中' }}
          </NuxtLink>
        </li>
      </ul>
    </div>
  </nav>
</template>
