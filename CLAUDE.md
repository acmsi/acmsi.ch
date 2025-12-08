# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with
code in this repository.

## Project Overview

This is the official website for ACMSI (Association Culturelle Musulmane de
Saint-Imier), a Swiss mosque association. It's an Astro v5 website with content
management capabilities, deployed to Cloudflare Pages.

## Development Commands

- `npm run dev` - Start development server on localhost:4321
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run test` - Run all tests (unit + components + e2e)
- `npm run test:unit` - Run unit tests
- `npm run test:components` - Run Playwright component tests
- `npm run test:components:ui` - Run component tests with UI
- `npm run test:e2e` - Run Playwright e2e tests
- `npm run test:e2e:ui` - Run Playwright tests with UI
- `npm run test:e2e:debug` - Run Playwright tests in debug mode
- `npm run test:e2e:headed` - Run Playwright tests in headed mode
- `npm run test:e2e:report` - Show Playwright test report
- `npm run cms-proxy` - Start Decap CMS local proxy server for content editing
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting

## Development Notes

- **Development server is usually already running** on localhost:4321
- For TypeScript checking during development, use `npx astro check`
- The Cloudflare adapter doesn't support `npm run preview` - use `npm run dev` for local testing

## Code Quality

### Linting and Formatting

- **ESLint** configured for TypeScript and Astro
- **Prettier** for code formatting with custom configuration
- **TypeScript** strict mode enabled

### Code Standards

- Always fix lint warnings and errors before committing
- Use proper TypeScript types and interfaces
- Follow Astro best practices
- Escape HTML entities in JSX (use `&apos;` for apostrophes)
- Remove unused imports to keep code clean

## Architecture

### Astro Configuration

- **Astro v5** with hybrid static/server rendering
- **Cloudflare Pages** adapter for edge deployment
- **React** integration for interactive components (islands architecture)
- **Tailwind CSS v4** integration for styling
- TypeScript paths configured with `@/*` alias for `/src/*`

### Component Architecture

Astro uses an "islands" architecture where interactive components are explicitly hydrated:

- **Astro components** (`.astro`): Static by default, no JavaScript shipped
- **React components** (`.tsx` in `src/components/react/`): Interactive islands with hydration directives

Hydration directives used:

- `client:load` - Hydrate immediately (e.g., MobileMenu)
- `client:visible` - Hydrate when visible (e.g., PhotoGallery)
- `client:idle` - Hydrate when browser is idle (e.g., MosqueLocationMap)

### Content Collections

Astro Content Collections with Zod schemas for type-safe content:

- **Schemas defined in** `src/content/config.ts`
- **Collections**:
  - `actualites` - News articles
  - `tags` - Article tags
  - `projects` - Fundraising projects
  - `galleries` - Photo galleries

### Content Management System

- **Decap CMS** for content management
- **GitHub OAuth** backend for authentication
- Admin interface at `/admin`
- Local development with `cms-proxy` command
- Configuration in `public/admin/config.yml`

### Content Structure

```
src/content/
├── actualites/     # News articles (Markdown)
├── tags/           # Tag definitions
├── projects/       # Fundraising projects
└── galleries/      # Photo galleries
```

Content utility library at `src/lib/content.ts` handles:

- Fetching all news articles with `getAllNews()`
- Getting single articles by slug with `getNewsArticle()`
- Markdown to HTML processing using remark
- Article metadata (title, date, author, featured_image, excerpt, tags)
- **Tag filtering** available on `/actualites?tag=tagname`

### Styling and UI

- **Tailwind CSS v4** with PostCSS
- Custom "nur" color scheme (teal, navy, cream variants)
- Typography plugin enabled
- Custom fonts: Mada, El Messiri, Tajawal

### Page Structure

```
/                               # Home page
├── /a-propos                   # About page
├── /actualites                 # News section
│   └── /actualites/[slug]      # Individual news articles
├── /contact                    # Contact page
├── /credits                    # Credits & acknowledgments page
├── /donation                   # Donation page
└── /projet-xhamia-nur          # Mosque project page
```

## Testing

### Unit Testing

- **Node.js built-in test runner** for unit tests
- Use `import { describe, it } from 'node:test'` and `import assert from 'node:assert'`
- Test files in `tests/*.test.ts`
- Run with `npm run test:unit`

### Component Testing

- **Playwright Component Testing** for React component tests
- Uses `@playwright/experimental-ct-react@next`
- Test files co-located with components: `src/components/react/*.test.tsx`
- Import from `@playwright/experimental-ct-react` and use `mount()` fixture
- Run `npm run test:components` for headless testing
- Run `npm run test:components:ui` for interactive testing with browser UI
- Configuration in `playwright-ct.config.ts`
- Always use viewport resolution of 1024x950 when using Playwright MCP tools

### End-to-End Testing

- **Playwright** for end-to-end testing
- Test files in `tests/e2e/*.spec.ts`
- Import from `@playwright/test` and use `page` fixture
- Run `npm run test:e2e` for headless testing
- Run `npm run test:e2e:ui` for interactive testing with browser UI
- Configuration in `playwright.config.ts`
- Tests should cover critical user flows and page functionality

### Test Writing Guidelines

- **Unit tests**: Use Node.js assertions (`assert.strictEqual`, `assert.ok`, `assert.deepStrictEqual`)
- **Component tests**: Use Playwright CT assertions (`expect(component).toBeVisible()`, `expect(component).toContainText()`)
- **E2E tests**: Use Playwright assertions (`expect(page.locator(...)).toBeVisible()`)
- Always test tag filtering, CMS configuration, and core functionality
- Component tests are co-located with their React components in `src/components/react/`
- E2E tests are organized in `tests/e2e/` by feature area

## Security

The website implements security best practices:

### Security Headers

Security headers are configured in Astro middleware (`src/middleware.ts`):

- **Content Security Policy (CSP)**: Balanced approach allowing necessary external services
  - Netlify Identity for CMS authentication
  - MapLibre GL for interactive maps from unpkg.com CDN
  - Mawaqit iframe for prayer times widget
  - OpenStreetMap tiles and MapTiler API for map data
- **X-Frame-Options**: `SAMEORIGIN` to prevent clickjacking
- **X-Content-Type-Options**: `nosniff` to prevent MIME type sniffing
- **Referrer-Policy**: `strict-origin-when-cross-origin` for privacy
- **Permissions-Policy**: Restricts camera, microphone, geolocation access
- **Strict-Transport-Security (HSTS)**: Forces HTTPS in production

### External Resources

- Netlify Identity widget loaded from trusted Netlify CDN (for CMS auth)
- MapLibre GL resources loaded from unpkg.com CDN
- Sources are reputable and trusted (Netlify, unpkg.com)

### Content Security

- Markdown content is processed server-side using remark
- HTML output rendered via `set:html` directive (acceptable as content comes from trusted CMS)
- Only committee members with GitHub access can edit content

## Deployment

- **Cloudflare Pages** for edge deployment
- Automatic builds on push to main branch
- Static pages pre-rendered at build time
- Dynamic pages rendered at the edge via Cloudflare Workers

## Content Editing Workflow

1. Run `npm run cms-proxy` for local CMS testing
2. Access admin at `http://localhost:4321/admin`
3. Content changes are committed directly to git
4. Articles must have `published: true` to appear on site
