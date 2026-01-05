# Forsati UI Style Guide

## Brand Direction
Modern Arabic-first UX with clean cards, warm orange highlights, and soft neutral surfaces.

## Colors
- Primary: `#F28C28` (brand 500)
- Primary dark: `#C76B12`
- Primary soft: `#FFEDD5`
- Ink 900: `#0F172A`
- Sand 50: `#FFF7ED`

## Typography
- English: Plus Jakarta Sans
- Arabic: Tajawal
- Headings: 24–48px, semi-bold
- Body: 14–16px, normal

## Layout
- Cards with rounded corners and soft shadows
- Clear section spacing (24–64px)
- Sticky header with search + language switch
- Dashboard cards for stats and insights

## Components
- Header/Nav, Footer
- JobCard, FilterSidebar
- Pagination
- Empty states and Skeleton loaders
- Toasts (Sonner)

## RTL Rules
- `dir` is set per language (`/ar` RTL, `/en` LTR)
- Icon direction flips with `.flip-rtl`
- Padding and icon alignment handled with logical CSS classes (`search-input`, `list-pad`)

## Motion
- Subtle `fadeInUp` for section reveals
- Optional float animation for hero accents
