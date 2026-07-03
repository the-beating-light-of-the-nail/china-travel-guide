<script setup lang="ts">
// 首页 - 英雄区搜索、热门目的地、攻略分类、精选攻略
const { public: pub } = useRuntimeConfig()

// 获取城市列表（SSR）
const { data: cities } = await useFetch('/api/cities')

// 获取精选攻略（SSR）
const { data: featuredGuides } = await useFetch('/api/guides', {
  query: { featured: 'true' },
})

// 攻略分类配置
const categories = [
  { icon: '🏯', title: 'History & Culture', desc: 'Ancient capitals and timeless heritage' },
  { icon: '🏔️', title: 'Nature & Scenery', desc: 'Mountains, rivers and hidden gems' },
  { icon: '🍜', title: 'Food & Cuisine', desc: 'Authentic flavors and street food' },
  { icon: '👨‍👩‍👧', title: 'Family Travel', desc: 'Fun and educational for all ages' },
  { icon: '💑', title: 'Romantic Getaways', desc: 'Sweet spots and off-the-grid retreats' },
  { icon: '🎒', title: 'Budget Backpacking', desc: 'Money-saving tips and hostels' },
]

// 英雄区搜索关键词
const heroSearch = ref('')

function handleHeroSearch() {
  if (heroSearch.value.trim()) {
    navigateTo(`/about?q=${encodeURIComponent(heroSearch.value.trim())}`)
  }
}

// SEO 元信息
useHead({
  title: 'China Travel Guide - Explore the Wonders of China',
  meta: [
    { name: 'description', content: 'Discover China with in-depth travel guides for top cities including Beijing, Xi\'an, and Chengdu. Attractions, food, itineraries, and practical tips for international travelers.' },
    { property: 'og:title', content: 'China Travel Guide - Explore the Wonders of China' },
    { property: 'og:description', content: 'In-depth travel guides for Beijing, Xi\'an, Chengdu and more. Plan your perfect China trip.' },
    { property: 'og:type', content: 'website' },
    { property: 'og:image', content: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=1200' },
  ],
  // 网站结构化数据 JSON-LD
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'China Travel Guide',
        url: pub.siteUrl,
        description: 'In-depth travel guides for exploring China.',
        potentialAction: {
          '@type': 'SearchAction',
          target: `${pub.siteUrl}/?q={search_term_string}`,
          'query-input': 'required name=search_term_string',
        },
      }),
    },
  ],
})
</script>

<template>
  <div>
    <!-- 英雄横幅区 -->
    <section
      class="h-[520px] flex flex-col items-center justify-center text-white text-center px-5"
      style="background: linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.35)), url('https://images.unsplash.com/photo-1508804185872-d7badad00f7d?w=1600') center/cover;"
    >
      <h1 class="text-4xl md:text-[52px] font-bold mb-4 tracking-[6px]">
        Discover the Wonders of China
      </h1>
      <p class="text-lg opacity-90 mb-8 tracking-wide">
        Explore ancient capitals, vibrant cities, and breathtaking landscapes
      </p>
      <!-- 搜索框 -->
      <div class="flex bg-white rounded-full p-1.5 w-[560px] max-w-[90%] shadow-2xl">
        <input
          v-model="heroSearch"
          type="text"
          placeholder="Where do you want to go? e.g. Beijing, Xi'an, Chengdu..."
          class="flex-1 border-none outline-none px-6 py-3 text-[15px] rounded-full text-gray-800"
          @keyup.enter="handleHeroSearch"
        >
        <button
          class="bg-accent text-white border-none px-8 py-3 rounded-full cursor-pointer text-[15px] hover:bg-accent-dark transition-colors"
          @click="handleHeroSearch"
        >
          Search
        </button>
      </div>
    </section>

    <!-- 热门目的地 -->
    <section id="destinations" class="py-[70px] px-4 sm:px-[8%]">
      <div class="section-title">
        <h2>Popular Destinations</h2>
        <div class="subtitle">Handpicked cities · In-depth guides · All-in-one travel companion</div>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <CityCard
          v-for="city in cities"
          :key="city.slug"
          :city="city"
        />
      </div>
    </section>

    <!-- 攻略分类 -->
    <section class="py-[70px] px-4 sm:px-[8%] bg-white">
      <div class="section-title">
        <h2>Browse by Category</h2>
        <div class="subtitle">Find the perfect trip for your travel style</div>
      </div>
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
        <div
          v-for="cat in categories"
          :key="cat.title"
          class="text-center p-[30px] rounded-xl bg-gray-50 transition-all duration-300 cursor-pointer hover:bg-brand hover:text-white hover:-translate-y-1"
        >
          <div class="text-4xl mb-3">{{ cat.icon }}</div>
          <h4 class="text-base mb-1 font-semibold">{{ cat.title }}</h4>
          <span class="text-xs text-gray-400">{{ cat.desc }}</span>
        </div>
      </div>
    </section>

    <!-- 精选攻略 -->
    <section id="guides" class="py-[70px] px-4 sm:px-[8%]">
      <div class="section-title">
        <h2>Featured Guides</h2>
        <div class="subtitle">Real traveler stories · Practical trip-planning tips</div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
        <GuideCard
          v-for="guide in featuredGuides"
          :key="guide.slug"
          :guide="guide"
        />
      </div>
    </section>
  </div>
</template>
