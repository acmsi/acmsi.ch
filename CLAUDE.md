# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with
code in this repository.

## Project Overview

This is the official website for ACMSI (Association Culturelle Musulmane de
Saint-Imier), a Swiss mosque association. It's a multilingual Next.js website
with content management capabilities.

## Development Commands

- `npm run dev` - Start development server (usually on localhost:3000)
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint (⚠️ deprecated in Next.js 16)
- `npm run export` - Build and export static files
- `npm run test` - Run all tests (unit + e2e)
- `npm run test:unit` - Run unit tests
- `npm run test:e2e` - Run Playwright e2e tests
- `npm run test:e2e:ui` - Run Playwright tests with UI
- `npm run test:e2e:debug` - Run Playwright tests in debug mode
- `npm run test:e2e:headed` - Run Playwright tests in headed mode
- `npm run test:e2e:report` - Show Playwright test report
- `npm run cms-proxy` - Start Decap CMS local proxy server for content editing
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting

## Development Notes

- **Development server is usually already running** on localhost:3000
- **⚠️ NEVER run `npm run build` while dev server is running** - it breaks the dev server due to Next.js issue
- For TypeScript checking during development, use `npx tsc --noEmit` instead
- The command will show TypeScript errors for your code (ignore test file errors during development)
- Only run build for production deployments or when dev server is stopped

## Code Quality

### Linting and Formatting

- **ESLint** configured with Next.js recommended rules
- **Prettier** for code formatting with custom configuration
- **TypeScript** strict mode enabled

### Code Standards

- Always fix lint warnings and errors before committing
- Use proper TypeScript types and interfaces
- Follow React/Next.js best practices
- Escape HTML entities in JSX (use `&apos;` for apostrophes)
- Remove unused imports to keep code clean

## Architecture

### Next.js Configuration

- **Hybrid static/dynamic rendering** - static where possible, dynamic when needed
- Images are unoptimized for static hosting compatibility
- Uses experimental typed routes
- TypeScript paths configured with `@/*` alias for `/src/*`
- Pages with `searchParams` automatically render dynamically
- Base pages (like `/actualites`) can still be static, filtered pages (like `/actualites?tag=...`) are dynamic

### Content Management System

- **Decap CMS** (formerly Netlify CMS) for content management
- Git-based workflow with content stored in `content/actualites/`
- Admin interface at `/admin`
- Local development with `cms-proxy` command
- Uses Netlify Identity for authentication

### Content Structure

- **News articles** stored in `content/actualites/` as Markdown files
- **Tags** stored in `content/tags/` as individual Markdown files for CMS management
- **Projects** stored in `content/projects/` for project tracking
- Content utility library at `src/lib/content.ts` handles:
  - Fetching all news articles with `getAllNews()`
  - Getting single articles by slug with `getNewsArticle()`
  - Markdown to HTML processing using remark
  - Article metadata (title, date, author, featured_image, excerpt, tags)
- **Tag filtering** available on `/actualites?tag=tagname` with server-side rendering

### Styling and UI

- **Tailwind CSS v4** with custom color palette
- Custom "nur" color scheme (teal, navy, cream variants)
- Typography plugin enabled
- Font: Inter from Google Fonts

### Internationalization Setup

- Previously used next-intl (recently removed)
- Currently French-focused with some English support

### Page Structure

```
/                               # Home page
├── /a-propos                   # About page
├── /actualites                 # News section
│   └── /actualites/[slug]      # Individual news articles
├── /contact                    # Contact page
├── /credits                    # Credits & acknowledgments page
├── /donation                   # Donation page
└── /projet-xhamia-nur          # Mosque project section
    ├── /projet-xhamia-nur/[slug]        # Dynamic project content
    └── /projet-xhamia-nur/realisations  # Project achievements
```

## Testing

### Unit Testing

- **Node.js built-in test runner** for unit tests (NOT Vitest)
- Use `import { describe, it } from 'node:test'` and `import assert from 'node:assert'`
- Test files in `tests/*.test.ts`
- Run with `npm run test:unit`

### End-to-End Testing

- **Playwright** for end-to-end testing
- Always use viewport resolution of 1024x950 when using Playwright MCP tools
- Test files in `tests/e2e/*.spec.ts`
- Run `npm run test:e2e` for headless testing
- Run `npm run test:e2e:ui` for interactive testing with browser UI
- Tests should cover critical user flows and page functionality

### Test Writing Guidelines

- **Unit tests**: Use Node.js assertions (`assert.strictEqual`, `assert.ok`, `assert.deepStrictEqual`)
- **E2E tests**: Use Playwright assertions (`expect(page.locator(...)).toBeVisible()`)
- Always test tag filtering, CMS configuration, and core functionality

## Basic Authentication (Construction Mode)

The website includes basic authentication to protect content during committee review:

### Local Development

- Copy `.env.local.example` to `.env.local`
- Default credentials: `acmsi` / `comite2024`
- Change credentials in `.env.local` as needed

### Production (Netlify)

Set these environment variables in your Netlify dashboard:

- `NEXT_PUBLIC_AUTH_USERNAME`: Your desired username
- `NEXT_PUBLIC_AUTH_PASSWORD`: Your desired password

### Features

- Session expires after 24 hours
- Construction banner visible to authenticated users
- No-index meta tags prevent search engine indexing
- Logout button in bottom-right corner
- Mobile-friendly login interface
- Automatic bypass in development, test, and CI environments (`NODE_ENV=development/test`, `CI=true`, or `NEXT_PUBLIC_BYPASS_AUTH=true`)

### Removing Authentication

When ready to make the site public:

1. Remove `<AuthGuard>` wrapper from `src/app/layout.tsx`
2. Remove `<ConstructionBanner />` component
3. Change robots meta tags back to `index: true, follow: true`
4. Remove the environment variables from Netlify

## Deployment

- **Hybrid static/dynamic rendering** - some pages static, others dynamic based on features used
- Deploy as **Next.js application** (not static export)
- **Netlify**: Automatically handles server-side rendering via Functions
- Static pages (like home, about) are pre-generated for performance
- Dynamic pages (like `/actualites?tag=...`) are server-rendered on demand

## Content Editing Workflow

1. Run `npm run cms-proxy` for local CMS testing
2. Access admin at `http://localhost:3000/admin`
3. Content changes are committed directly to git
4. Articles must have `published: true` to appear on site
