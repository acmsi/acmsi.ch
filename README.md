# ACMSI - Association Culturelle Musulmane de Saint-Imier

Site web officiel de l'Association Culturelle Musulmane de Saint-Imier et de la mosquée Nur.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:3000
```

## 📋 Available Scripts

- **Development**: `npm run dev` - Start development server
- **Production**: `npm run build` && `npm start` - Build and start production server
- **Testing**: `npm run test` - Run all tests
- **Linting**: `npm run lint` - Check code quality
- **Formatting**: `npm run format` - Format code with Prettier

For a complete list of commands and detailed documentation, see [CLAUDE.md](./CLAUDE.md).

## 🏗️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with custom "nur" color palette
- **Content Management**: [Decap CMS](https://decapcms.org/) (formerly Netlify CMS)
- **Testing**: [Playwright](https://playwright.dev/) for component and e2e testing
- **Icons**: [Phosphor Icons](https://phosphoricons.com/)

## 📁 Project Structure

```
src/
├── app/                           # Next.js App Router pages
│   ├── layout.tsx                # Root layout with navigation
│   ├── page.tsx                  # Home page
│   ├── a-propos/                 # About page
│   ├── actualites/               # News section
│   ├── contact/                  # Contact page
│   ├── credits/                  # Credits & acknowledgments page
│   ├── donation/                 # Donation page
│   └── projet-xhamia-nur/        # Mosque project section
├── components/                   # Reusable React components
│   ├── *.tsx                     # Component implementations
│   └── *.test.tsx                # Component tests (co-located)
├── lib/                         # Utility functions and content management
└── styles/                      # Global styles and Tailwind configuration
public/
├── admin/                       # Decap CMS configuration
├── images/                      # Static images and uploads
└── ...                         # Other static assets
content/
└── actualites/                 # Markdown files for news articles
tests/
└── e2e/                        # End-to-end tests
```

## 🎨 Features

- **Responsive Design**: Mobile-first approach with Islamic geometric patterns
- **Content Management**: Git-based CMS for news articles and content
- **Multilingual Ready**: French-focused with English support structure
- **Accessibility**: ARIA compliant with keyboard navigation support
- **SEO Optimized**: Meta tags, Open Graph, and structured data
- **Security Headers**: Comprehensive CSP, HSTS, and security best practices
- **Hybrid Rendering**: Static generation with dynamic capabilities where needed

## 🧪 Testing

```bash
# Run all tests (unit + components + e2e)
npm run test

# Unit tests only
npm run test:unit

# Component tests only
npm run test:components

# Component tests with UI
npm run test:components:ui

# E2E tests only
npm run test:e2e

# E2E tests with UI
npm run test:e2e:ui
```

The project uses a comprehensive testing strategy:

- **Unit tests**: Node.js built-in test runner for utility functions
- **Component tests**: Playwright Component Testing for React components (co-located with components)
- **E2E tests**: Playwright for full user flow testing

Tests cover critical user flows including navigation, mobile menu functionality, page accessibility, and component behavior.

## 🚀 Deployment

The site uses Next.js hybrid rendering and is optimized for Netlify deployment:

```bash
npm run build
# Deploy as Next.js application (not static export)
```

**Deployment Notes**:

- Deploy as a Next.js application to support server-side rendering
- Netlify automatically handles SSR via Functions
- Netlify Identity integrated for CMS authentication
- Security headers configured via middleware

## 📝 Content Management

1. Start the CMS proxy: `npm run cms-proxy`
2. Navigate to `http://localhost:3000/admin`
3. Create and publish articles directly through the web interface
4. Changes are committed to the git repository automatically

## 🤝 Contributing

For detailed development guidelines, architecture information, and coding standards, please refer to [CLAUDE.md](./CLAUDE.md).

## 📄 License

This project is licensed under the ISC License - see the [LICENSE.md](LICENSE.md) file for details.

© 2024 Association Culturelle Musulmane de Saint-Imier (ACMSI)
