<script setup lang="ts">
// 页脚组件 - 品牌信息、热门目的地、旅行服务、关于我们
const { t } = useI18n()
const localePath = useLocalePath()

// 热门目的地（slug 用于路由，名称走翻译 key）
const destinations = [
  { slug: 'xian' },
  { slug: 'beijing' },
  { slug: 'chengdu' },
]

// 城市名称映射（用于页脚目的地显示，按当前语言取）
import { getCities } from '~/data/travel-data'
const allCities = getCities()
const { locale } = useI18n()
function cityName(slug: string) {
  const c = allCities.find(c => c.slug === slug)
  return c ? `${c.name[locale.value]} ${t('footer.guideSuffix')}` : slug
}

// 旅行服务 key 列表
const serviceKeys = ['custom', 'hotel', 'ticket', 'guide'] as const

// 关于我们 key 列表
const aboutLinkKeys = ['about', 'contact', 'contributors', 'privacy'] as const

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
          {{ t('brand.name') }}<span class="text-accent">{{ t('brand.highlight') }}</span>
        </div>
        <p class="text-sm leading-relaxed">
          {{ t('footer.desc') }}
        </p>
      </div>

      <!-- 热门目的地 -->
      <div>
        <h4 class="text-white mb-4.5 text-base font-medium">{{ t('footer.topDestinations') }}</h4>
        <ul class="list-none space-y-2.5">
          <li v-for="dest in destinations" :key="dest.slug">
            <NuxtLink
              :to="localePath(`/cities/${dest.slug}`)"
              class="text-sm transition-colors duration-300 hover:text-white"
            >
              {{ cityName(dest.slug) }}
            </NuxtLink>
          </li>
        </ul>
      </div>

      <!-- 旅行服务 -->
      <div>
        <h4 class="text-white mb-4.5 text-base font-medium">{{ t('footer.travelServices') }}</h4>
        <ul class="list-none space-y-2.5">
          <li
            v-for="key in serviceKeys"
            :key="key"
            class="text-sm transition-colors duration-300 hover:text-white"
          >
            {{ t(`footer.services.${key}`) }}
          </li>
        </ul>
      </div>

      <!-- 关于我们 -->
      <div>
        <h4 class="text-white mb-4.5 text-base font-medium">{{ t('footer.aboutUs') }}</h4>
        <ul class="list-none space-y-2.5">
          <li v-for="key in aboutLinkKeys" :key="key">
            <NuxtLink
              :to="localePath('/about')"
              class="text-sm transition-colors duration-300 hover:text-white"
            >
              {{ t(`footer.links.${key}`) }}
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>

    <!-- 版权信息 -->
    <div class="copyright text-center pt-6 border-t border-footer-border text-[13px]">
      {{ t('footer.copyright', { year: currentYear }) }}
    </div>
  </footer>
</template>
