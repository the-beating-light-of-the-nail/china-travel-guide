<script setup lang="ts">
// 页脚组件 - 品牌信息、热门目的地、旅行服务、关于我们
// 热门目的地
const destinations = [
  { name: 'Xi\'an Guide', slug: 'xian' },
  { name: 'Beijing Guide', slug: 'beijing' },
  { name: 'Chengdu Guide', slug: 'chengdu' },
]

// 旅行服务
const services = ['Custom Itineraries', 'Hotel Booking', 'Ticket Info', 'Local Guides']

// 关于我们
const aboutLinks = [
  { name: 'About Us', to: '/about' },
  { name: 'Contact', to: '/about' },
  { name: 'Contributors', to: '/about' },
  { name: 'Privacy Policy', to: '/about' },
]

// 当前年份
const currentYear = new Date().getFullYear()
</script>

<template>
  <!-- 页脚 -->
  <footer class="bg-footer text-gray-400 px-4 sm:px-[8%] pt-12 pb-8">
    <div class="grid grid-cols-2 md:grid-cols-[2fr_1fr_1fr_1fr] gap-10 mb-8">
      <!-- 品牌介绍 -->
      <div class="col-span-2 md:col-span-1">
        <div class="footer-logo text-[22px] font-bold text-white mb-3.5 tracking-wider">
          China<span class="text-accent">Travel</span>
        </div>
        <p class="text-sm leading-relaxed">
          Your trusted companion for exploring China. We gather real travel experiences
          from popular cities and hidden gems, providing practical and reliable guidance
          for every traveler visiting the wonders of China.
        </p>
      </div>

      <!-- 热门目的地 -->
      <div>
        <h4 class="text-white mb-4.5 text-base font-medium">Top Destinations</h4>
        <ul class="list-none space-y-2.5">
          <li v-for="dest in destinations" :key="dest.slug">
            <NuxtLink
              :to="`/cities/${dest.slug}`"
              class="text-sm transition-colors duration-300 hover:text-white"
            >
              {{ dest.name }}
            </NuxtLink>
          </li>
        </ul>
      </div>

      <!-- 旅行服务 -->
      <div>
        <h4 class="text-white mb-4.5 text-base font-medium">Travel Services</h4>
        <ul class="list-none space-y-2.5">
          <li
            v-for="service in services"
            :key="service"
            class="text-sm transition-colors duration-300 hover:text-white"
          >
            {{ service }}
          </li>
        </ul>
      </div>

      <!-- 关于我们 -->
      <div>
        <h4 class="text-white mb-4.5 text-base font-medium">About Us</h4>
        <ul class="list-none space-y-2.5">
          <li v-for="(link, idx) in aboutLinks" :key="idx">
            <NuxtLink
              :to="link.to"
              class="text-sm transition-colors duration-300 hover:text-white"
            >
              {{ link.name }}
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>

    <!-- 版权信息 -->
    <div class="copyright text-center pt-6 border-t border-footer-border text-[13px]">
      © {{ currentYear }} China Travel Guide | Crafting unforgettable journeys across China
    </div>
  </footer>
</template>
