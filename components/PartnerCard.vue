<script setup lang="ts">
// 本地服务商卡片组件 - 头像徽章、认证标识、评分、简介、标签、城市/语言、联系与详情
import type { PartnerService } from '~/data/hub-data'
import { getCities } from '~/data/travel-data'

const props = defineProps<{
  service: PartnerService
}>()

const { locale, t } = useI18n()

const allCities = getCities()

// 服务商覆盖城市（按当前语言显示城市名）
const cityNames = computed(() =>
  props.service.cities
    .map(slug => allCities.find(c => c.slug === slug)?.name[locale.value] || slug)
    .join(', ')
)

// 满星数量（四舍五入）
const fullStars = computed(() => Math.round(props.service.rating))

// 服务项目列表（以 | 分隔）
const serviceItems = computed(() =>
  props.service.services[locale.value].split('|').map(s => s.trim()).filter(Boolean)
)

// 展开详情 / 咨询表单
const expanded = ref(false)
const showInquiry = ref(false)

// 咨询表单状态
const form = reactive({ name: '', email: '', dates: '', message: '' })

// 通过 mailto 发送咨询（无需后端）
function sendInquiry() {
  const subject = encodeURIComponent(`[With My Eyes] ${props.service.name}`)
  const body = encodeURIComponent(
    `${form.name} / ${form.email}\n${form.dates}\n\n${form.message}`
  )
  window.location.href = `mailto:${props.service.contactEmail}?subject=${subject}&body=${body}`
}
</script>

<template>
  <!-- 服务商卡片 -->
  <div class="card p-5 card-hover">
    <div class="flex gap-4">
      <!-- 头像徽章（首字母圆形） -->
      <div class="w-[72px] h-[72px] rounded-xl bg-brand-tint flex items-center justify-center text-2xl font-bold text-brand shrink-0">
        {{ service.name.slice(0, 1) }}
      </div>

      <!-- 主体信息 -->
      <div class="flex-1 min-w-0">
        <!-- 名字 + 认证徽章 -->
        <div class="flex items-center gap-2 flex-wrap mb-1">
          <h3 class="text-[17px] font-semibold text-ink leading-snug">
            {{ service.name }}
          </h3>
          <span
            v-if="service.isVerified"
            class="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 text-[11px] font-medium px-2 py-0.5 rounded-full border border-emerald-200"
          >
            ✓ {{ t('services.verified') }}
          </span>
        </div>

        <!-- 评分 + 评价数 + 类型 -->
        <div class="flex items-center gap-2 text-[13px] mb-2">
          <span class="text-gold tracking-tight">
            {{ '★'.repeat(fullStars) }}{{ '☆'.repeat(5 - fullStars) }}
          </span>
          <span class="text-ink">{{ service.rating.toFixed(1) }}</span>
          <span class="text-ink-muted">({{ t('services.reviews', { n: service.reviewCount }) }})</span>
          <span class="chip">{{ t(`services.types.${service.type}`) }}</span>
        </div>

        <!-- 简介 -->
        <p class="text-sm text-ink-muted leading-relaxed mb-2 line-clamp-2">
          {{ service.intro[locale] }}
        </p>

        <!-- 标签 -->
        <div class="text-xs text-brand mb-2">
          {{ service.tags[locale] }}
        </div>

        <!-- 城市 + 语言 -->
        <div class="flex items-center gap-4 text-xs text-ink-muted">
          <span>📍 {{ cityNames }}</span>
          <span>🗣 {{ service.languages.join(' / ') }}</span>
          <span class="text-promo font-medium">{{ service.priceRange[locale] }}</span>
        </div>
      </div>

      <!-- 右侧操作按钮 -->
      <div class="hidden sm:flex flex-col gap-2 shrink-0">
        <button class="btn-primary !px-4 !py-2 text-sm" @click="showInquiry = !showInquiry">
          {{ t('services.contact') }}
        </button>
        <button class="btn-secondary !px-4 !py-2 text-sm" @click="expanded = !expanded">
          {{ t('services.viewProfile') }}
        </button>
      </div>
    </div>

    <!-- 移动端操作按钮 -->
    <div class="flex sm:hidden gap-2 mt-4">
      <button class="btn-primary flex-1 !px-4 !py-2 text-sm" @click="showInquiry = !showInquiry">
        {{ t('services.contact') }}
      </button>
      <button class="btn-secondary flex-1 !px-4 !py-2 text-sm" @click="expanded = !expanded">
        {{ t('services.viewProfile') }}
      </button>
    </div>

    <!-- 展开详情 -->
    <div v-if="expanded" class="mt-5 pt-5 border-t border-slate-200">
      <h4 class="text-sm font-semibold text-ink mb-3">
        {{ t('services.servicesIncluded') }}
      </h4>
      <ul class="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
        <li
          v-for="(item, idx) in serviceItems"
          :key="idx"
          class="text-sm text-ink-body flex items-start gap-2"
        >
          <span class="text-brand mt-0.5">•</span>
          <span>{{ item }}</span>
        </li>
      </ul>
      <div class="text-sm text-ink-muted">
        {{ service.intro[locale] }}
      </div>
    </div>

    <!-- 咨询表单 -->
    <div v-if="showInquiry" class="mt-5 pt-5 border-t border-slate-200">
      <h4 class="text-sm font-semibold text-ink mb-3">
        {{ t('services.sendInquiry') }}
      </h4>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
        <input v-model="form.name" type="text" :placeholder="t('services.formName')" class="input px-3 py-2 text-sm">
        <input v-model="form.email" type="email" :placeholder="t('services.formEmail')" class="input px-3 py-2 text-sm">
        <input v-model="form.dates" type="text" :placeholder="t('services.formDates')" class="input px-3 py-2 text-sm sm:col-span-2">
        <textarea v-model="form.message" rows="3" :placeholder="t('services.formMessage')" class="input px-3 py-2 text-sm sm:col-span-2 resize-none" />
      </div>
      <button class="btn-primary !py-2 text-sm" @click="sendInquiry">
        {{ t('services.submit') }}
      </button>
    </div>
  </div>
</template>
