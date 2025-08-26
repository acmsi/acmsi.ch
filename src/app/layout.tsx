import type { Metadata } from 'next'
import Link from 'next/link'
import { LetterCircleP } from '@phosphor-icons/react/dist/ssr'
import './global.css'

export const metadata: Metadata = {
  title: 'ACMSI - Association Culturelle Musulmane de Saint-Imier',
  description:
    "Site officiel de l'Association Culturelle Musulmane de Saint-Imier et de la mosquée Nur.",
  keywords: ['ACMSI', 'mosquée', 'Saint-Imier', 'islam', 'association', 'Nur'],
  authors: [{ name: 'ACMSI' }],
  openGraph: {
    title: 'ACMSI - Association Culturelle Musulmane de Saint-Imier',
    description:
      "Site officiel de l'Association Culturelle Musulmane de Saint-Imier et de la mosquée Nur.",
    url: 'https://www.acmsi.ch',
    siteName: 'ACMSI',
    locale: 'fr_CH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ACMSI - Association Culturelle Musulmane de Saint-Imier',
    description:
      "Site officiel de l'Association Culturelle Musulmane de Saint-Imier et de la mosquée Nur.",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <script src="https://identity.netlify.com/v1/netlify-identity-widget.js" async></script>
      </head>
      <body className="bg-white antialiased font-sans">
        <header className="bg-white shadow-sm border-b border-gray-200">
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <h1 className="text-xl font-bold">ACMSI</h1>
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <Link
                    href="/"
                    className="text-gray-700 hover:text-teal-600 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Accueil
                  </Link>
                  <Link
                    href="/a-propos"
                    className="text-gray-700 hover:text-teal-600 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    À propos
                  </Link>
                  <Link
                    href="/actualites"
                    className="text-gray-700 hover:text-teal-600 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Actualités
                  </Link>
                  <Link
                    href="/donation"
                    className="text-gray-700 hover:text-teal-600 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Donation
                  </Link>
                  <Link
                    href="/contact"
                    className="text-gray-700 hover:text-teal-600 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Contact
                  </Link>
                </div>
              </div>
            </div>
          </nav>
        </header>

        <main>{children}</main>

        <footer className="bg-gray-900 text-gray-100">
          <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">ACMSI</h3>
                <p className="text-gray-300">Association Culturelle Musulmane de Saint-Imier</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Navigation</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="/" className="text-gray-300 hover:text-teal-300">
                      Accueil
                    </Link>
                  </li>
                  <li>
                    <Link href="/a-propos" className="text-gray-300 hover:text-teal-300">
                      À propos
                    </Link>
                  </li>
                  <li>
                    <Link href="/actualites" className="text-gray-300 hover:text-teal-300">
                      Actualités
                    </Link>
                  </li>
                  <li>
                    <Link href="/donation" className="text-gray-300 hover:text-teal-300">
                      Donation
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="text-gray-300 hover:text-teal-300">
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Contact</h3>
                <div className="space-y-2 text-gray-300">
                  <p>
                    <a
                      href="https://maps.apple/p/BvnLVKA~K_gZw6"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-teal-300 transition-colors"
                    >
                      ACMSI – Mosquée Nur
                      <br />
                      Rue de la Clef 45
                      <br />
                      2610 Saint-Imier, Suisse
                    </a>
                  </p>
                  <p>
                    <a
                      href="mailto:contact@acmsi.ch"
                      className="hover:text-teal-300 transition-colors"
                    >
                      contact@acmsi.ch
                    </a>
                  </p>
                  <p>
                    <a href="tel:+41792763500" className="hover:text-teal-300 transition-colors">
                      079 276 35 00
                    </a>
                  </p>
                  <p className="mt-4 pt-2 border-t border-gray-700">
                    <a
                      href="/contact#parking-info"
                      className="inline-flex items-center text-sm hover:text-teal-300 transition-colors"
                    >
                      <LetterCircleP className="w-4 h-4 mr-1" />
                      Informations Stationnement
                    </a>
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-700 text-center">
              <p className="text-gray-400">
                &copy; {new Date().getFullYear()} ACMSI. Tous droits réservés.
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
