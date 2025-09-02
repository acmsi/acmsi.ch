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

- Configured for **static export** (`output: 'export'`)
- Images are unoptimized for static hosting
- Uses experimental typed routes
- TypeScript paths configured with `@/*` alias for `/src/*`

### Content Management System

- **Decap CMS** (formerly Netlify CMS) for content management
- Git-based workflow with content stored in `content/actualites/`
- Admin interface at `/admin`
- Local development with `cms-proxy` command
- Uses Netlify Identity for authentication

### Content Structure

- News articles stored in `content/actualites/` as Markdown files
- Content utility library at `src/lib/content.ts` handles:
  - Fetching all news articles with `getAllNews()`
  - Getting single articles by slug with `getNewsArticle()`
  - Markdown to HTML processing using remark
  - Article metadata (title, date, author, featured_image, excerpt, tags)

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

- **Playwright** for end-to-end testing
- Always use viewport resolution of 1024x950 when using Playwright MCP tools
- Run `npm run test` for headless testing
- Run `npm run test:ui` for interactive testing with browser UI
- Tests should cover critical user flows and page functionality

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

- Static export ready for deployment on any static hosting
- Built files go to `out/` directory
- Currently configured for Netlify (identity widget in layout)

## Content Editing Workflow

1. Run `npm run cms-proxy` for local CMS testing
2. Access admin at `http://localhost:3000/admin`
3. Content changes are committed directly to git
4. Articles must have `published: true` to appear on site
