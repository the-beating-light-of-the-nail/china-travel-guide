<script setup lang="ts">
// 关于我们页面 - 项目介绍、使命、特色
const { public: pub } = useRuntimeConfig()

// 特色列表
const features = [
  { icon: '🗺️', title: 'In-Depth City Guides', desc: 'Detailed guides for every major destination, covering attractions, food, itineraries, and tips.' },
  { icon: '✍️', title: 'Real Traveler Stories', desc: 'Authentic experiences and practical advice shared by travelers who have been there.' },
  { icon: '🥢', title: 'Local Cuisine Maps', desc: 'From street food to time-honored brands, discover the true flavors of each city.' },
  { icon: '📅', title: 'Ready-Made Itineraries', desc: 'Day-by-day travel plans you can follow directly, perfect for first-time visitors.' },
  { icon: '💡', title: 'Practical Tips', desc: 'Transport, accommodation, and cultural tips to make your trip smooth and worry-free.' },
  { icon: '🌏', title: 'Made for the World', desc: 'Written in clear English with international tourists in mind, bridging cultures.' },
]

// SEO 元信息
useHead({
  title: 'About Us | China Travel Guide',
  meta: [
    { name: 'description', content: 'Learn about China Travel Guide — your trusted English-language companion for exploring the wonders of China.' },
    { property: 'og:title', content: 'About China Travel Guide' },
    { property: 'og:description', content: 'Your trusted English-language companion for exploring the wonders of China.' },
    { property: 'og:type', content: 'website' },
  ],
  script: [
    // 组织结构化数据 JSON-LD
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'AboutPage',
        name: 'About China Travel Guide',
        url: `${pub.siteUrl}/about`,
        mainEntity: {
          '@type': 'Organization',
          name: 'China Travel Guide',
          url: pub.siteUrl,
          description: 'An English-language travel guide platform dedicated to helping international tourists explore China.',
        },
      }),
    },
  ],
})
</script>

<template>
  <div>
    <!-- 顶部介绍区 -->
    <section
      class="h-[400px] flex flex-col items-center justify-center text-white text-center px-5"
      style="background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://images.unsplash.com/photo-1547981609-4b6bfe67ca0b?w=1600') center/cover;"
    >
      <h1 class="text-4xl md:text-[52px] font-bold mb-4 tracking-[6px]">About Us</h1>
      <p class="text-lg opacity-90 max-w-2xl tracking-wide leading-relaxed">
        Your trusted English-language companion for exploring the wonders of China
      </p>
    </section>

    <!-- 项目介绍 -->
    <section class="py-[70px] px-4 sm:px-[8%] bg-white">
      <div class="max-w-3xl mx-auto text-center">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Our Mission</h2>
        <div class="space-y-5 text-gray-600 text-[16px] leading-relaxed text-left">
          <p>
            China Travel Guide was created with one goal in mind: to make the wonders of China
            accessible and approachable for international travelers. China is a vast and fascinating
            country with over 5,000 years of history, but navigating it as a first-time visitor can
            feel daunting.
          </p>
          <p>
            We bring together authentic travel experiences from popular cities like Beijing, Xi'an,
            and Chengdu, as well as hidden gems off the beaten path. Every guide is written in clear
            English by travelers who have walked the streets, tasted the food, and immersed
            themselves in the culture.
          </p>
          <p>
            From the Terracotta Warriors and the Great Wall to fiery Sichuan hot pot and adorable
            giant pandas, we want to help you plan the perfect China adventure — with practical tips,
            honest recommendations, and the warmth of local insight.
          </p>
        </div>
      </div>
    </section>

    <!-- 特色介绍 -->
    <section class="py-[70px] px-4 sm:px-[8%]">
      <div class="section-title">
        <h2>What We Offer</h2>
        <div class="subtitle">Everything you need for an unforgettable China journey</div>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="feature in features"
          :key="feature.title"
          class="bg-white rounded-xl p-6 shadow-md text-center card-hover"
        >
          <div class="text-4xl mb-3">{{ feature.icon }}</div>
          <h3 class="text-lg font-semibold text-brand mb-2">{{ feature.title }}</h3>
          <p class="text-sm text-gray-500 leading-relaxed">{{ feature.desc }}</p>
        </div>
      </div>
    </section>

    <!-- 行动号召 -->
    <section class="py-[70px] px-4 sm:px-[8%] bg-brand text-white text-center">
      <h2 class="text-3xl md:text-4xl font-bold mb-4">Ready to Explore China?</h2>
      <p class="text-lg opacity-90 mb-8 max-w-xl mx-auto">
        Start planning your journey today with our curated city guides.
      </p>
      <NuxtLink
        to="/#destinations"
        class="inline-block bg-accent hover:bg-accent-dark text-white px-8 py-3 rounded-full transition-colors text-[15px]"
      >
        Browse Destinations
      </NuxtLink>
    </section>
  </div>
</template>
