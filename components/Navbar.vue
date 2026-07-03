<script setup lang="ts">
// 顶部导航栏组件 - 粘性布局、品牌 Logo、导航链接、搜索框
const route = useRoute()

// 导航链接配置
const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Destinations', to: '/#destinations' },
  { label: 'Guides', to: '/#guides' },
  { label: 'About', to: '/about' },
]

// 搜索关键词
const searchKeyword = ref('')

// 处理搜索
function handleSearch() {
  if (searchKeyword.value.trim()) {
    navigateTo(`/?q=${encodeURIComponent(searchKeyword.value.trim())}`)
  }
}

// 判断当前链接是否激活
function isActive(to: string) {
  if (to === '/') return route.path === '/'
  if (to.startsWith('/#')) return false
  return route.path.startsWith(to)
}
</script>

<template>
  <!-- 顶部导航栏 -->
  <nav class="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm h-[70px] flex items-center justify-between px-4 sm:px-[8%]">
    <!-- 品牌 Logo -->
    <NuxtLink to="/" class="text-2xl font-bold text-brand tracking-wider flex items-center">
      China<span class="text-accent">Travel</span>
    </NuxtLink>

    <!-- 导航链接 -->
    <ul class="hidden md:flex gap-9 list-none">
      <li v-for="link in navLinks" :key="link.to">
        <NuxtLink
          :to="link.to"
          class="text-[15px] transition-colors duration-300 hover:text-brand"
          :class="isActive(link.to) ? 'text-brand font-medium' : 'text-gray-500'"
        >
          {{ link.label }}
        </NuxtLink>
      </li>
    </ul>

    <!-- 搜索框 -->
    <div class="flex items-center bg-gray-100 rounded-full px-4 py-1.5">
      <input
        v-model="searchKeyword"
        type="text"
        placeholder="Search cities..."
        class="border-none bg-transparent outline-none w-[120px] sm:w-[180px] text-sm"
        @keyup.enter="handleSearch"
      >
    </div>
  </nav>
</template>
