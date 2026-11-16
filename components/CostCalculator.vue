<script setup lang="ts">
// 物价对比计算器（/tools/china-trip-cost-calculator/）
// ---------------------------------------------------------------
// SEO 关键设计：SSG 构建期按当前语种的默认城市对直接渲染完整静态表格
// （en→Shanghai/NY、ja→Shanghai/Tokyo、ko→Shanghai/Seoul……），
// 爬虫不执行交互也能抓到全部 <table> 文本；JS 只负责切换城市/币种后的重算。
// 无运行时网络请求——物价与汇率均为构建期快照（data/cost-data.ts 头注释）。
// ---------------------------------------------------------------
import {
  costCities,
  costItems,
  COST_CURRENCIES,
  FX_SNAPSHOT,
  DEFAULT_PAIR,
  DEFAULT_CURRENCY,
  dailyBasketUsd,
  calculatorUi,
} from '~/data/cost-data'

const { locale } = useI18n()

const chinaCities = costCities.filter(c => c.isChina)
const homeCities = costCities.filter(c => !c.isChina)

// 初始值由语种决定 → SSR 与客户端水合结果一致，无闪变
const defaults = DEFAULT_PAIR[locale.value] || DEFAULT_PAIR.en
const cnKey = ref(defaults.cn)
const homeKey = ref(defaults.home)
const currencyCode = ref(DEFAULT_CURRENCY[locale.value] || 'USD')

const cnCity = computed(() => costCities.find(c => c.key === cnKey.value)!)
const homeCity = computed(() => costCities.find(c => c.key === homeKey.value)!)
const currency = computed(() => COST_CURRENCIES.find(c => c.code === currencyCode.value)!)

const ui = (k: keyof typeof calculatorUi) => calculatorUi[k][locale.value] || calculatorUi[k].en

// 统一 en-US 数字格式，保证 SSR/客户端一致；¥ 符号 JPY/CNY 冲突由币种行说明消歧
function money(usd: number) {
  const val = usd * FX_SNAPSHOT.rates[currency.value.code]
  const s = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: currency.value.decimals,
    maximumFractionDigits: currency.value.decimals,
  }).format(val)
  return `${currency.value.symbol}${s}`
}

interface Row {
  icon: string
  name: string
  note?: string
  cn: number
  home: number
  diffPct: number
  cnBarPct: number
  homeBarPct: number
}

const rows = computed<Row[]>(() =>
  costItems.map((item) => {
    const cn = cnCity.value.usd[item.id]
    const home = homeCity.value.usd[item.id]
    const diffPct = ((cn - home) / home) * 100
    const max = Math.max(cn, home)
    return {
      icon: item.icon,
      name: item.name[locale.value] || item.name.en,
      note: item.note ? (item.note[locale.value] || item.note.en) : undefined,
      cn,
      home,
      diffPct,
      cnBarPct: Math.max(8, Math.round((cn / max) * 100)),
      homeBarPct: Math.max(8, Math.round((home / max) * 100)),
    }
  }),
)

const avgDiffPct = computed(() =>
  Math.round(rows.value.reduce((s, r) => s + r.diffPct, 0) / rows.value.length),
)

const bargain = computed(() =>
  rows.value.reduce((best, r) => (r.diffPct < best.diffPct ? r : best), rows.value[0]),
)
const bargainSavedText = computed(() =>
  (calculatorUi.bargainLess[locale.value] || calculatorUi.bargainLess.en).replace(
    '{v}',
    money(bargain.value.home - bargain.value.cn),
  ),
)

function badge(r: Row) {
  const v = Math.round(Math.abs(r.diffPct))
  if (r.diffPct <= -10) return { text: `${v}% ${ui('cheaper')}`, cls: 'bg-emerald-100 text-emerald-800' }
  if (r.diffPct >= 10) return { text: `+${v}% ${ui('pricier')}`, cls: 'bg-rose-100 text-rose-800' }
  return { text: ui('similar'), cls: 'bg-slate-100 text-slate-600' }
}
</script>

<template>
  <div class="bg-white rounded-xl border border-slate-200 overflow-hidden">
    <!-- 控制区：中国城市 / 对照城市 / 币种 -->
    <div class="p-4 md:p-6 border-b border-slate-200">
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div>
          <label for="cost-cn" class="block text-xs font-semibold text-ink-muted uppercase mb-1.5">{{ ui('cnCity') }}</label>
          <select
            id="cost-cn"
            v-model="cnKey"
            class="w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2.5 text-sm font-medium text-ink focus:outline-none focus:ring-2 focus:ring-brand"
          >
            <option v-for="c in chinaCities" :key="c.key" :value="c.key">{{ c.flag }} {{ c.name[locale] }}</option>
          </select>
        </div>
        <div>
          <label for="cost-home" class="block text-xs font-semibold text-ink-muted uppercase mb-1.5">{{ ui('homeCity') }}</label>
          <select
            id="cost-home"
            v-model="homeKey"
            class="w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2.5 text-sm font-medium text-ink focus:outline-none focus:ring-2 focus:ring-brand"
          >
            <option v-for="c in homeCities" :key="c.key" :value="c.key">{{ c.flag }} {{ c.name[locale] }}</option>
          </select>
        </div>
        <div>
          <label for="cost-currency" class="block text-xs font-semibold text-ink-muted uppercase mb-1.5">{{ ui('currency') }}</label>
          <select
            id="cost-currency"
            v-model="currencyCode"
            class="w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2.5 text-sm font-medium text-ink focus:outline-none focus:ring-2 focus:ring-brand"
          >
            <option v-for="c in COST_CURRENCIES" :key="c.code" :value="c.code">{{ c.code }} ({{ c.symbol }})</option>
          </select>
        </div>
      </div>

      <!-- 汇总卡片 -->
      <div class="mt-5 pt-5 border-t border-slate-100 grid grid-cols-1 md:grid-cols-3 gap-3">
        <div
          class="rounded-xl p-4 border"
          :class="avgDiffPct < 0 ? 'bg-emerald-50/70 border-emerald-100' : 'bg-rose-50/70 border-rose-100'"
        >
          <div class="text-xs font-medium" :class="avgDiffPct < 0 ? 'text-emerald-700' : 'text-rose-700'">
            {{ cnCity.name[locale] }} vs {{ homeCity.name[locale] }}
          </div>
          <div class="text-2xl font-extrabold mt-1" :class="avgDiffPct < 0 ? 'text-emerald-600' : 'text-rose-600'">
            {{ Math.abs(avgDiffPct) }}% {{ avgDiffPct < 0 ? ui('avgCheaper') : ui('avgPricier') }}
          </div>
        </div>
        <div class="bg-slate-50 border border-slate-200/70 rounded-xl p-4">
          <div class="text-xs font-medium text-ink-muted">{{ ui('basketTitle') }}</div>
          <div class="text-lg font-bold text-ink mt-1">
            {{ money(dailyBasketUsd(cnCity)) }} vs {{ money(dailyBasketUsd(homeCity)) }}
          </div>
          <div class="text-xs text-ink-muted mt-0.5">{{ ui('basketNote') }}</div>
        </div>
        <div class="bg-amber-50/70 border border-amber-100 rounded-xl p-4">
          <div class="text-xs font-medium text-amber-800">{{ ui('bargainTitle') }}</div>
          <div class="text-lg font-bold text-amber-700 mt-1">{{ bargain.icon }} {{ bargain.name }}</div>
          <div class="text-xs text-amber-700/80 mt-0.5">{{ bargainSavedText }}</div>
        </div>
      </div>
    </div>

    <!-- 对比表：SSG 直出，爬虫可抓 -->
    <div class="overflow-x-auto">
      <table class="w-full text-left border-collapse text-sm">
        <thead>
          <tr class="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-ink-muted uppercase tracking-wider">
            <th class="py-3 px-4 md:px-5">{{ ui('itemCol') }}</th>
            <th class="py-3 px-3 text-right whitespace-nowrap">{{ cnCity.flag }} {{ cnCity.name[locale] }}</th>
            <th class="py-3 px-3 text-right whitespace-nowrap">{{ homeCity.flag }} {{ homeCity.name[locale] }}</th>
            <th class="py-3 px-4 w-40 hidden sm:table-cell">%</th>
            <th class="py-3 px-4 md:px-5 text-right">{{ ui('diffCol') }}</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100">
          <tr v-for="r in rows" :key="r.name" class="transition-colors">
            <td class="py-3 px-4 md:px-5">
              <div class="flex items-start gap-2.5">
                <span class="text-lg leading-none mt-0.5">{{ r.icon }}</span>
                <div>
                  <div class="font-semibold text-ink">{{ r.name }}</div>
                  <div v-if="r.note" class="text-xs text-slate-400 mt-0.5">{{ r.note }}</div>
                </div>
              </div>
            </td>
            <td class="py-3 px-3 text-right font-bold text-brand whitespace-nowrap">{{ money(r.cn) }}</td>
            <td class="py-3 px-3 text-right font-medium text-slate-600 whitespace-nowrap">{{ money(r.home) }}</td>
            <td class="py-3 px-4 hidden sm:table-cell">
              <div class="space-y-1.5">
                <div class="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                  <div class="bg-brand h-1.5 rounded-full transition-all duration-300" :style="{ width: r.cnBarPct + '%' }" />
                </div>
                <div class="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                  <div class="bg-slate-400 h-1.5 rounded-full transition-all duration-300" :style="{ width: r.homeBarPct + '%' }" />
                </div>
              </div>
            </td>
            <td class="py-3 px-4 md:px-5 text-right whitespace-nowrap">
              <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold" :class="badge(r).cls">
                {{ badge(r).text }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 口径说明（诚实性：快照日期 + 估算口径 + 币种消歧） -->
    <p class="bg-slate-50 px-4 md:px-5 py-3 border-t border-slate-200 text-xs text-ink-muted">
      {{ cnCity.flag }} = {{ cnCity.name[locale] }} · {{ homeCity.flag }} = {{ homeCity.name[locale] }} ·
      {{ currency.code }} ({{ currency.symbol }})
    </p>
  </div>
</template>
