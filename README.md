# ACMSI - Association Culturelle Musulmane de Saint-Imier

Site web officiel de l'Association Culturelle Musulmane de Saint-Imier et de la mosquée Nur.

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:4321
```

## Available Scripts

- **Development**: `npm run dev` - Start development server
- **Production**: `npm run build` && `npm run preview` - Build and preview production
- **Deploy**: `npm run build` && `wrangler deploy` - Build and deploy to Cloudflare
- **Testing**: `npm run test` - Run all tests
- **Linting**: `npm run lint` - Check code quality
- **Formatting**: `npm run format` - Format code with Prettier

For a complete list of commands and detailed documentation, see [CLAUDE.md](./CLAUDE.md).

## Tech Stack

- **Framework**: [Astro v5](https://astro.build/) with hybrid static/server rendering
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with custom "nur" color palette
- **Content Management**: [Decap CMS](https://decapcms.org/) with GitHub OAuth
- **Deployment**: [Cloudflare Workers](https://workers.cloudflare.com/)
- **Testing**: [Playwright](https://playwright.dev/) for component and e2e testing
- **Icons**: [Phosphor Icons](https://phosphoricons.com/)

## Project Structure

```
src/
├── pages/                         # Astro pages and API routes
│   ├── index.astro               # Home page
│   ├── a-propos.astro            # About page
│   ├── actualites/               # News section
│   ├── contact.astro             # Contact page
│   ├── credits.astro             # Credits page
│   ├── donation.astro            # Donation page
│   ├── projet-xhamia-nur/        # Mosque project section
│   └── api/                      # API routes (OAuth)
├── components/                    # Reusable components
│   ├── *.astro                   # Astro components (static)
│   └── react/                    # React islands (interactive)
├── content/                      # Content collections
│   ├── actualites/               # News articles (Markdown)
│   ├── tags/                     # Tag definitions
│   ├── projects/                 # Fundraising projects
│   └── galleries/                # Photo galleries
├── layouts/                      # Page layouts
├── lib/                          # Utility functions
└── styles/                       # Global styles
public/
├── admin/                        # Decap CMS configuration
├── images/                       # Static images and uploads
└── _headers                      # Security headers
tests/
├── *.test.ts                     # Unit tests
└── e2e/                          # End-to-end tests
```

## Features

- **Responsive Design**: Mobile-first approach with Islamic geometric patterns
- **Content Management**: Git-based CMS for news articles and content
- **Islands Architecture**: Static by default, interactive React components where needed
- **Accessibility**: ARIA compliant with keyboard navigation support
- **SEO Optimized**: Meta tags, Open Graph, and structured data
- **Security Headers**: Comprehensive CSP, HSTS, and security best practices
- **Edge Deployment**: Fast global delivery via Cloudflare Workers

## Testing

```bash
# Run all tests (unit + components + e2e)
npm run test

# Unit tests only
npm run test:unit

# Component tests only
npm run test:components

# E2E tests only
npm run test:e2e

# E2E tests with UI
npm run test:e2e:ui
```

## Deployment

The site is deployed to Cloudflare Workers:

```bash
npm run build
wrangler deploy
```

**Deployment Notes**:

- Deployed to Cloudflare Workers with edge rendering
- GitHub OAuth for CMS authentication via Astro API routes
- Environment variables configured in `wrangler.jsonc` and Cloudflare dashboard
- Security headers configured via `public/_headers`

## Content Management

1. Start the CMS proxy: `npm run cms-proxy`
2. Navigate to `http://localhost:4321/admin`
3. Create and publish articles directly through the web interface
4. Changes are committed to the git repository automatically

## Contributing

For detailed development guidelines, architecture information, and coding standards, please refer to [CLAUDE.md](./CLAUDE.md).

## License

This project is licensed under the ISC License - see the [LICENSE.md](LICENSE.md) file for details.

© 2026 Association Culturelle Musulmane de Saint-Imier (ACMSI)
