# China Travel Guide - Project Plan

## Overview
Build an English-language China travel guide website targeting international tourists.
Stack: Nuxt 3 + Tailwind CSS + Element Plus + Prisma

## Template Reference
Three HTML templates are provided in this directory:
- `template-home.html` — Homepage with city grid, categories, featured guides (pure CSS)
- `template-xian.html` — Xi'an city detail page (Tailwind + FontAwesome, ancient-red/gold theme)
- `template-chengdu.html` — Chengdu city detail page (pure CSS, same brand as home)

## Requirements

### 1. Project Setup
- Initialize Nuxt 3 project with TypeScript
- Install and configure: Tailwind CSS, Element Plus, Prisma (SQLite for dev)
- Configure SSR for SEO
- Set up i18n (English primary, structure for Chinese later)

### 2. Page Structure
- `/` — Homepage: hero search, popular destinations grid, category browse, featured guides
- `/cities/[slug]` — City detail page: hero, intro, attractions, food, itinerary, tips
- `/guides/[slug]` — Individual guide article page
- `/about` — About page

### 3. Data Model (Prisma)
- City: name, slug, description, heroImage, tagline, tags, region
- Attraction: name, cityId, description, image, location, duration, ticket, highlight
- Food: name, cityId, description, image, highlight
- Itinerary: cityId, dayNumber, title, items[]
- Guide: title, slug, excerpt, content, image, label, readTime, publishedAt

### 4. Design
- Convert the HTML templates to Nuxt/Vue components
- Keep the design language from templates: clean, modern, card-based
- Light theme with green accent (#2c5c4e) and red highlights (#c0392b)
- Responsive: mobile-first
- Use Tailwind for styling, Element Plus for UI components (buttons, forms, cards)

### 5. SEO
- Server-side rendering (SSR)
- Dynamic meta tags per page (title, description, OG tags)
- JSON-LD structured data for articles and local business
- Sitemap.xml generation
- robots.txt

### 6. Initial Content
- Seed 3 cities: Chengdu, Xi'an, Beijing
- Each city needs: 6 attractions, 4-6 foods, 3-day itinerary, 3 tip categories
- Homepage: hero + 6 city cards + 6 categories + 3 featured guides
- All content in English

### 7. Component Structure
- Layout: Navbar (sticky, logo, nav links, search), Footer
- CityCard: image, overlay, tag, name, description
- AttractionCard: image, title, highlight, description, meta (location, duration, ticket)
- FoodCard: image, title, highlight, description
- ItineraryBlock: day number, title, time-based items list
- TipCard: icon, title, bullet list
- GuideCard: image, label, title, excerpt, meta

### 8. Tech Notes
- All code comments in Chinese (中文注释)
- Use Nuxt 3 composables for data fetching
- Prisma client as Nuxt plugin
- Image optimization with Nuxt Image module (use Unsplash URLs for now)

