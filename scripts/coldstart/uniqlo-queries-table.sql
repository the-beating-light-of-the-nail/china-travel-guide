-- chinatravel.world 优衣库比价页 · 实时查询日志表 + 分析视图
-- 在 Supabase Dashboard → SQL Editor 粘贴执行（2026-11-17）
create table if not exists ctg_uniqlo_queries (
  id         bigint generated always as identity primary key,
  code       text not null,                    -- 全球 6 位品番码
  locale     text,                             -- 查询时页面语种
  ip_hash    text,                             -- IP 哈希（防滥用/去重口径，非明文）
  cached     boolean not null default false,   -- 是否命中 10 分钟缓存
  found_count int not null default 0,          -- 查到的市场数（0=全官网无此码）
  cn_title   text,                             -- 中国官网商品名（分析主维度）
  cn_price   numeric,                          -- 中国官网价（CNY）
  results    jsonb,                            -- 全市场原始结果（深度分析用）
  created_at timestamptz not null default now()
);
create index if not exists ctg_uniqlo_queries_code_idx on ctg_uniqlo_queries (code);
create index if not exists ctg_uniqlo_queries_created_idx on ctg_uniqlo_queries (created_at desc);
comment on table ctg_uniqlo_queries is '优衣库比价页实时查询日志——分析用户关注什么商品';

-- 分析视图：哪些商品被查、查了多少次、多少独立访客
create or replace view ctg_uniqlo_query_stats as
select code,
       max(cn_title) as cn_title,
       count(*)      as lookups,
       count(distinct ip_hash) as unique_visitors,
       max(created_at) as last_seen
from ctg_uniqlo_queries
group by code;

-- 常用分析速查：
-- 最近 7 天热门商品：  select * from ctg_uniqlo_query_stats where last_seen > now() - interval '7 days' order by lookups desc limit 20;
-- 各语种查询量：      select locale, count(*) from ctg_uniqlo_queries where created_at > now() - interval '30 days' group by 1 order by 2 desc;
-- 查无此码的负面信号：select code, count(*) from ctg_uniqlo_queries where found_count = 0 group by 1 order by 2 desc limit 10;
