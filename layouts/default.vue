<script setup lang="ts">
// 默认布局 - 顶部导航栏 + 页面内容 + 页脚
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <!-- 顶部导航 -->
    <Navbar />

    <!-- 页面主体内容 -->
    <main class="flex-1">
      <slot />
    </main>

    <!-- 页脚 -->
    <Footer />
  </div>
</template>
