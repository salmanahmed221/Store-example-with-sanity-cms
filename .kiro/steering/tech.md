# Tech Stack

## Framework & Runtime

- **Next.js 13.4** with App Router
- **React 18.2**
- **TypeScript 5.0** (strict mode enabled)

## CMS

- **Sanity v3** - Headless CMS
- **next-sanity** - Next.js integration
- **@sanity/image-url** - Image URL builder
- **@sanity/vision** - GROQ query tool in Studio

## Styling

- **Tailwind CSS 3.3** - Utility-first CSS framework
- **PostCSS** with Autoprefixer

## Linting

- **ESLint** with `next/core-web-vitals` preset

## Path Aliases

- `@/*` maps to `./src/*`

## Common Commands

```bash
# Development
npm run dev       # Start dev server at localhost:3000

# Production
npm run build     # Build for production
npm run start     # Start production server

# Code Quality
npm run lint      # Run ESLint
```

## Environment Variables

Required in `.env`:

- `NEXT_PUBLIC_SANITY_PROJECT_ID` - Sanity project ID
- `NEXT_PUBLIC_SANITY_DATASET` - Sanity dataset name
- `NEXT_PUBLIC_SANITY_TOKEN` - Sanity API token
- `NEXT_PUBLIC_SANITY_API_VERSION` - API version (defaults to 2023-05-27)
