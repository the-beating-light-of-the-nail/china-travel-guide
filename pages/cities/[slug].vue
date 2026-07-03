<script setup lang="ts">
// 城市详情页 - 英雄区、城市印象、景点、美食、行程、贴士
const route = useRoute()
const { public: pub } = useRuntimeConfig()
const slug = route.params.slug as string

// 获取城市详情（SSR）
const { data: city } = await useFetch(`/api/cities/${slug}`, {
  // 找不到城市时抛出 404
  onResponseError() {
    throw createError({ statusCode: 404, statusMessage: 'City not found', fatal: true })
  },
})

// 城市不存在则 404
if (!city.value) {
  throw createError({ statusCode: 404, statusMessage: 'City not found', fatal: true })
}

const c = computed(() => city.value!)

// 城市标签列表
const cityTags = computed(() => {
  const tags = c.value.tags?.split(',').map(t => t.trim()).filter(Boolean)
  return tags || []
})

// 城市印象统计数据
const stats = computed(() => [
  { value: c.value.duration, label: 'Recommended Duration' },
  { value: c.value.bestSeason, label: 'Best Season' },
  { value: c.value.history, label: 'History' },
])

// SEO 元信息
useHead({
  title: `${c.value.name} Travel Guide | ${c.value.tagline}`,
  meta: [
    { name: 'description', content: c.value.description },
    { property: 'og:title', content: `${c.value.name} Travel Guide` },
    { property: 'og:description', content: c.value.description },
    { property: 'og:type', content: 'article' },
    { property: 'og:image', content: c.value.heroImage },
  ],
  script: [
    // 旅游目的地结构化数据 JSON-LD
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'TouristDestination',
        name: c.value.name,
        description: c.value.description,
        image: c.value.heroImage,
        url: `${pub.siteUrl}/cities/${c.value.slug}`,
        containedInPlace: {
          '@type': 'Country',
          name: 'China',
        },
      }),
    },
  ],
})
</script>

<template>
  <div v-if="city">
    <!-- 面包屑 -->
    <div class="py-4 px-4 sm:px-[8%] bg-white border-b border-gray-100 text-[13px] text-gray-500">
      <NuxtLink to="/" class="text-brand">Home</NuxtLink>
      <span> / </span>
      <span>{{ c.region }}</span>
      <span> / </span>
      <span class="text-gray-800">{{ c.name }}</span>
    </div>

    <!-- 城市英雄区 -->
    <section
      class="h-[460px] flex flex-col items-center justify-center text-white text-center px-5"
      style="background: linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.45)), url('https://images.unsplash.com/photo-1590103513924-6be5415868c7?w=1600') center/cover;"
    >
      <h1 class="text-4xl md:text-5xl font-bold mb-3 tracking-[6px]">{{ c.name }}</h1>
      <div class="text-lg opacity-90 mb-5 tracking-wide">{{ c.tagline }}</div>
      <!-- 城市标签 -->
      <div class="flex gap-3 flex-wrap justify-center">
        <span
          v-for="tag in cityTags"
          :key="tag"
          class="bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full text-[13px] border border-white/30"
        >
          {{ tag }}
        </span>
      </div>
    </section>

    <!-- 城市印象 -->
    <section class="py-[70px] px-4 sm:px-[8%] bg-white">
      <div class="section-title">
        <h2>City Overview</h2>
        <div class="subtitle">{{ c.tagline }}</div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-[50px] items-center">
        <!-- 文字介绍 -->
        <div>
          <h3 class="text-2xl text-brand mb-5 font-semibold">{{ c.name }} at a Glance</h3>
          <p class="text-gray-600 mb-4 text-justify text-[15px] leading-relaxed">
            {{ c.intro }}
          </p>
          <!-- 统计数据 -->
          <div class="grid grid-cols-3 gap-5 mt-[30px] text-center">
            <div v-for="stat in stats" :key="stat.label" class="stat-item">
              <h4 class="text-lg text-accent mb-1 font-bold">{{ stat.value }}</h4>
              <span class="text-[13px] text-gray-500">{{ stat.label }}</span>
            </div>
          </div>
        </div>
        <!-- 城市图片 -->
        <div class="rounded-[14px] overflow-hidden shadow-xl">
          <img :src="c.heroImage" :alt="c.name" class="w-full h-[380px] object-cover">
        </div>
      </div>
    </section>

    <!-- 必游景点 -->
    <section class="py-[70px] px-4 sm:px-[8%]">
      <div class="section-title">
        <h2>Must-Visit Attractions</h2>
        <div class="subtitle">Explore the icons of {{ c.name }}</div>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <AttractionCard
          v-for="attraction in c.attractions"
          :key="attraction.id"
          :attraction="attraction"
        />
      </div>
    </section>

    <!-- 地道美食 -->
    <section class="py-[70px] px-4 sm:px-[8%] bg-white">
      <div class="section-title">
        <h2>Local Cuisine</h2>
        <div class="subtitle">Taste the flavors of {{ c.name }}</div>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <FoodCard
          v-for="food in c.foods"
          :key="food.id"
          :food="food"
        />
      </div>
    </section>

    <!-- 推荐行程 -->
    <section class="py-[70px] px-4 sm:px-[8%]">
      <div class="section-title">
        <h2>Suggested Itinerary</h2>
        <div class="subtitle">Make the most of your {{ c.name }} trip</div>
      </div>
      <div class="max-w-[900px] mx-auto">
        <ItineraryBlock
          v-for="it in c.itineraries"
          :key="it.id"
          :itinerary="it"
        />
      </div>
    </section>

    <!-- 出行贴士 -->
    <section class="py-[70px] px-4 sm:px-[8%] bg-white">
      <div class="section-title">
        <h2>Travel Tips</h2>
        <div class="subtitle">Practical info for a smoother trip</div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <TipCard
          v-for="tip in c.tips"
          :key="tip.id"
          :tip="tip"
        />
      </div>
    </section>
  </div>
</template>
