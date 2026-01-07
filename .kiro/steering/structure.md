# Project Structure

```
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Home page (product listing)
│   │   ├── globals.css         # Global styles
│   │   └── studio/[[...index]] # Sanity Studio route
│   └── lib/
│       └── SanityClient.ts     # Sanity client instance
│
├── sanity/                     # Sanity CMS configuration
│   ├── env.ts                  # Environment variable helpers
│   ├── schema.ts               # Schema registry
│   ├── products.ts             # Product document schema
│   └── lib/
│       ├── client.ts           # Alternative Sanity client
│       └── image.ts            # Image URL builder utility
│
├── sanity.config.ts            # Sanity Studio configuration
├── sanity.cli.ts               # Sanity CLI configuration
├── next.config.js              # Next.js configuration
├── tailwind.config.js          # Tailwind CSS configuration
└── public/                     # Static assets
```

## Key Patterns

### Sanity Integration

- Schemas defined in `sanity/` folder, registered in `sanity/schema.ts`
- Studio mounted at `/studio` using catch-all route
- Two Sanity client instances exist: `src/lib/SanityClient.ts` and `sanity/lib/client.ts`

### Data Fetching

- Server Components fetch data directly using Sanity client
- GROQ queries used for content retrieval

### Images

- Remote images from `cdn.sanity.io` configured in `next.config.js`
- Use `@sanity/image-url` or `sanity/lib/image.ts` for URL building
