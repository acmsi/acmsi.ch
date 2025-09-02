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
- **Testing**: [Playwright](https://playwright.dev/) for e2e testing
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
├── lib/                         # Utility functions and content management
└── styles/                      # Global styles and Tailwind configuration
public/
├── admin/                       # Decap CMS configuration
├── images/                      # Static images and uploads
└── ...                         # Other static assets
content/
└── actualites/                 # Markdown files for news articles
```

## 🎨 Features

- **Responsive Design**: Mobile-first approach with Islamic geometric patterns
- **Content Management**: Git-based CMS for news articles and content
- **Multilingual Ready**: French-focused with English support structure
- **Accessibility**: ARIA compliant with keyboard navigation support
- **SEO Optimized**: Meta tags, Open Graph, and structured data
- **Static Export**: Ready for deployment on any static hosting platform

## 🧪 Testing

```bash
# Run all tests
npm run test

# E2E tests only
npm run test:e2e

# Interactive testing
npm run test:e2e:ui
```

Tests cover critical user flows including navigation, mobile menu functionality, and page accessibility.

## 🚀 Deployment

The site is configured for static export and can be deployed to any static hosting platform:

```bash
npm run export
# Files will be generated in the 'out/' directory
```

Currently optimized for Netlify deployment with Netlify Identity integration.

## 📝 Content Management

1. Start the CMS proxy: `npm run cms-proxy`
2. Navigate to `http://localhost:3000/admin`
3. Create and publish articles directly through the web interface
4. Changes are committed to the git repository automatically

## 🤝 Contributing

For detailed development guidelines, architecture information, and coding standards, please refer to [CLAUDE.md](./CLAUDE.md).

## 📄 License

© 2024 ACMSI. All rights reserved.