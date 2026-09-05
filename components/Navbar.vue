<script setup lang="ts">
// 顶部导航栏组件 - 粘性布局、品牌 Logo、导航链接、搜索框、语言切换（trip.com 风格浅色）
const route = useRoute()
const { t, locale, locales } = useI18n()
// 生成本地化路由地址与切换语言的地址
const localePath = useLocalePath()
const switchLocalePath = useSwitchLocalePath()

// 所有可用语言（含 code 与展示名 name，顺序即下拉展示顺序）
const allLocales = computed(() => locales.value as Array<{ code: string; name?: string }>)
const availableLocales = computed(() => allLocales.value.filter(l => l.code !== locale.value))
const currentLocaleName = computed(
  () => allLocales.value.find(l => l.code === locale.value)?.name || locale.value,
)

// 语言下拉展开状态
const langOpen = ref(false)

// 导航链接配置（key 用于读取翻译文案）
const navLinks = [
  { key: 'nav.destinations', to: '/#destinations' },
  { key: 'nav.vlogs', to: '/vlogs' },
  { key: 'nav.guides', to: '/guides' },
  { key: 'nav.shopping', to: '/shopping' },
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

// 判断当前链接是否激活（去掉任意语言前缀后比较）
const localePrefixRe = computed(
  () => new RegExp(`^/(${allLocales.value.map(l => l.code).join('|')})(?=/|$)`),
)
function isActive(to: string) {
  const path = route.path.replace(localePrefixRe.value, '') || '/'
  if (to === '/') return path === '/'
  if (to.startsWith('/#')) return false
  return path === to || path.startsWith(`${to}/`)
}
</script>

<template>
  <!-- 顶部导航栏 -->
  <nav class="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm h-[70px] flex items-center justify-between px-4 sm:px-[5%]">
    <!-- 品牌 Logo -->
    <NuxtLink :to="localePath('/')" class="text-[22px] font-bold text-ink tracking-wide flex items-center shrink-0">
      {{ t('brand.name') }}<span class="text-brand">{{ t('brand.highlight') }}</span>
    </NuxtLink>

    <!-- 导航链接（桌面端） -->
    <ul class="hidden lg:flex gap-7 list-none">
      <li v-for="link in navLinks" :key="link.key">
        <NuxtLink
          :to="localePath(link.to)"
          class="text-[14px] transition-colors duration-300 hover:text-brand"
          :class="isActive(link.to) ? 'text-brand font-medium' : 'text-ink-body'"
        >
          {{ t(link.key) }}
        </NuxtLink>
      </li>
    </ul>

    <!-- 右侧操作区：搜索框 + 语言切换（桌面端） -->
    <div class="hidden lg:flex items-center gap-3">
      <!-- 搜索框 -->
      <div class="flex items-center bg-white border border-slate-300 rounded-full px-4 py-1.5 focus-within:border-brand transition-colors">
        <span class="text-slate-400 mr-2 text-sm">⌕</span>
        <input
          v-model="searchKeyword"
          type="text"
          :placeholder="t('search.placeholder')"
          class="border-none bg-transparent outline-none w-[170px] text-sm text-ink placeholder-slate-400"
          @keyup.enter="handleSearch"
        >
      </div>

      <!-- 语言切换下拉 -->
      <div class="relative">
        <button
          class="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-300 text-ink-body text-sm font-medium hover:border-brand hover:text-brand transition-colors"
          :title="t('language.label')"
          @click="langOpen = !langOpen"
        >
          <span class="text-base leading-none">🌐</span>
          <span>{{ currentLocaleName }}</span>
          <span class="text-[10px] leading-none transition-transform" :class="langOpen ? 'rotate-180' : ''">▼</span>
        </button>
        <!-- 点击遮罩关闭下拉 -->
        <div v-if="langOpen" class="fixed inset-0 z-40 cursor-default" @click="langOpen = false" />
        <div
          v-if="langOpen"
          class="absolute right-0 top-[calc(100%+8px)] z-50 min-w-[150px] py-1.5 rounded-xl border border-slate-200 bg-white shadow-xl shadow-black/10"
        >
          <NuxtLink
            v-for="l in availableLocales"
            :key="l.code"
            :to="switchLocalePath(l.code)"
            class="flex items-center gap-2 px-4 py-2 text-sm text-ink-body hover:text-brand hover:bg-brand-tint transition-colors whitespace-nowrap"
            @click="langOpen = false"
          >
            {{ l.name || l.code }}
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- 移动端：搜索 + 菜单按钮 -->
    <div class="flex lg:hidden items-center gap-2">
      <button
        class="text-ink-body hover:text-brand text-xl px-2"
        :aria-label="t('search.placeholder')"
        @click="navigateTo(localePath('/vlogs'))"
      >
        ⌕
      </button>
      <button
        class="text-ink-body hover:text-brand text-2xl px-2 leading-none"
        aria-label="Menu"
        @click="menuOpen = !menuOpen"
      >
        {{ menuOpen ? '×' : '☰' }}
      </button>
    </div>

    <!-- 移动端下拉菜单 -->
    <div
      v-if="menuOpen"
      class="lg:hidden absolute top-[70px] left-0 right-0 bg-white border-b border-slate-200 px-6 py-4 z-50 shadow-lg shadow-black/5"
    >
      <ul class="list-none space-y-3">
        <li v-for="link in navLinks" :key="link.key">
          <NuxtLink
            :to="localePath(link.to)"
            class="block text-[15px] text-ink-body hover:text-brand py-1"
            @click="menuOpen = false"
          >
            {{ t(link.key) }}
          </NuxtLink>
        </li>
        <li class="pt-3 border-t border-slate-200">
          <div class="text-xs text-ink-muted mb-2">{{ t('language.label') }}</div>
          <NuxtLink
            v-for="l in availableLocales"
            :key="l.code"
            :to="switchLocalePath(l.code)"
            class="inline-block mr-3 mb-1 text-[15px] text-brand py-1"
            @click="menuOpen = false"
          >
            {{ l.name || l.code }}
          </NuxtLink>
        </li>
      </ul>
    </div>
  </nav>
</template>
