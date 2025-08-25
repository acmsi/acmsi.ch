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
- `npm run lint` - Run ESLint
- `npm run export` - Build and export static files
- `npm run test` - Run Playwright tests
- `npm run test:ui` - Run Playwright tests with UI
- `npm run cms-proxy` - Start Decap CMS local proxy server for content editing

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
src/app/
├── layout.tsx          # Root layout with navigation and footer
├── page.tsx           # Home page
├── a-propos/          # About page
├── actualites/        # News section
│   ├── page.tsx       # News listing
│   └── [slug]/        # Individual news articles
├── contact/           # Contact page
└── donation/          # Donation page
```

## Testing

- **Playwright** for end-to-end testing
- Always use viewport resolution of 1024x950 when using Playwright MCP tools

## Deployment

- Static export ready for deployment on any static hosting
- Built files go to `out/` directory
- Currently configured for Netlify (identity widget in layout)

## Content Editing Workflow

1. Run `npm run cms-proxy` for local CMS testing
2. Access admin at `http://localhost:3000/admin`
3. Content changes are committed directly to git
4. Articles must have `published: true` to appear on site
