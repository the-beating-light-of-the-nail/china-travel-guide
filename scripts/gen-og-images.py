# -*- coding: utf-8 -*-
"""生成 og:image 专用 1200x630 裁剪变体到 public/images/og/。

来源（与 utils/locales.ts 的 shareImageUrl() 路径约定配套）：
  1. data/travel-data.ts 中 rawGuides 块内的 image 字段（攻略封面）
  2. data/travel-data.ts 中全部 heroImage 字段（城市主图）
  3. HUB_IMAGES 硬编码的栏目页 og 封面

维护规则：新增 guide/city 使用本地图片、或更换栏目页 og 封面后，重跑本脚本：
  py scripts/gen-og-images.py
"""
import re
import sys
from pathlib import Path

from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parent.parent
DATA = (ROOT / 'data' / 'travel-data.ts').read_text(encoding='utf-8')
OG_DIR = ROOT / 'public' / 'images' / 'og'

# 栏目页 og 封面（与各页面 useHead 中的引用保持一致：首图为动态取值，兜底为固定值）
HUB_IMAGES = [
    '/images/guides/tiger-leaping-gorge-trek-guide.jpg',   # /guides 与 /hiking 兜底
    '/images/cities/guizhou/fanjingshan_2.jpg',            # /services
    '/images/hiking/wusun-trail.jpg',                       # /vlogs
    '/images/cities/guizhou/huangguoshu_2.jpg',             # /photos 首图
    '/images/guides/what-to-buy-in-china.jpg',             # /shopping 兜底
    '/images/shopping/powerbank-chargers.jpg',             # /shopping 首图
    '/images/dumplings/guide-cover.jpg',                    # /dumplings 兜底
    '/images/dumplings/jiaozi.jpg',                         # /dumplings 首图
]


def collect_sources():
    srcs = []
    # rawGuides 块内的 image 字段（攻略封面；unsplash 外链跳过）
    guides_block = re.search(r'^const rawGuides.*?^\]$', DATA, re.M | re.S)
    if not guides_block:
        sys.exit('rawGuides block not found')
    srcs += re.findall(r"image: '(/images/[^']+)'", guides_block.group(0))
    # 城市主图
    srcs += re.findall(r"heroImage: '(/images/[^']+)'", DATA)
    srcs += HUB_IMAGES
    return sorted(set(srcs))


def main():
    OG_DIR.mkdir(parents=True, exist_ok=True)
    made, skipped = [], []
    for src in collect_sources():
        origin = ROOT / 'public' / src.lstrip('/')
        if not origin.exists():
            skipped.append(f'MISSING origin: {src}')
            continue
        rel = re.sub(r'^/images/', '', src)
        rel = re.sub(r'\.[a-z]+$', '', rel, flags=re.I)
        out = (OG_DIR / f'{rel}.jpg')
        out.parent.mkdir(parents=True, exist_ok=True)
        with Image.open(origin) as im:
            im = im.convert('RGB')
            # 1200x630 中心裁剪（重心略偏上，主体通常在上半部）
            fitted = ImageOps.fit(im, (1200, 630), Image.LANCZOS, centering=(0.5, 0.4))
            fitted.save(out, 'JPEG', quality=82, optimize=True)
        made.append(str(out.relative_to(ROOT)))
    for line in made:
        print(f'  ok   {line}')
    for line in skipped:
        print(f'  WARN {line}')
    print(f'{len(made)} og images generated, {len(skipped)} skipped')


if __name__ == '__main__':
    main()
