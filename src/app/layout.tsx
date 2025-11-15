import type { Metadata } from 'next'
import Link from 'next/link'
import {
  LetterCircleP,
  InstagramLogo,
  FacebookLogo,
  WhatsappLogo,
} from '@phosphor-icons/react/dist/ssr'
import MobileMenu from '@/components/mobile-menu'
import AuthGuard from '@/components/auth-guard'
// import ConstructionBanner from '@/components/construction-banner'
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
    index: false,
    follow: false,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <head>
        <script
          src="https://identity.netlify.com/v1/netlify-identity-widget.js"
          async
        ></script>
      </head>
      <body
        className="antialiased font-sans islamic-pattern islamic-pattern-sm md:islamic-pattern-md "
        style={
          {
            '--pattern-background-color': 'white',
            '--pattern-foreground-color': 'var(--color-nur-cream-200)',
          } as React.CSSProperties
        }
      >
        <AuthGuard>
          {/* <ConstructionBanner /> */}
          <header className="bg-white/70 shadow-sm border-b border-gray-200">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16">
                <div className="flex items-center">
                  <Link
                    href="/"
                    className="text-2xl font-family-headings font-bold hover:text-teal-600 transition-colors"
                  >
                    ACMSI
                  </Link>
                </div>
                <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-4 *:text-gray-700 *:hover:text-teal-600 *:px-3 *:py-2 *:rounded-md *:font-medium">
                    <Link href="/">Accueil</Link>
                    <Link href="/a-propos">À propos</Link>
                    <Link href="/actualites">Actualités</Link>
                    <Link href="/donation">Donation</Link>
                    <Link href="/contact">Contact</Link>
                  </div>
                </div>
                <MobileMenu />
              </div>
            </nav>
          </header>

          <main>{children}</main>

          <footer className="bg-gray-900 text-gray-100">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="order-3 md:order-first">
                  <h3 className="text-white font-family-headings text-2xl font-semibold mb-4">
                    ACMSI
                  </h3>
                  <p className="text-gray-300">
                    Association Culturelle Musulmane de Saint-Imier
                  </p>
                  <div className="flex space-x-3 mt-4">
                    <a
                      href="https://www.instagram.com/xhamia_nur_stimier"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-300 hover:text-teal-300 transition-colors"
                      title="Suivez-nous sur Instagram"
                    >
                      <InstagramLogo size={33} />
                    </a>
                    <a
                      href="https://www.facebook.com/share/1Diw8r8WrC/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-300 hover:text-teal-300 transition-colors"
                      title="Suivez-nous sur Facebook"
                    >
                      <FacebookLogo size={33} />
                    </a>
                    <a
                      href="https://chat.whatsapp.com/FsRYOthycLQLCmekiojmQ2"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-300 hover:text-teal-300 transition-colors"
                      title="Rejoindre la communauté WhatsApp"
                    >
                      <WhatsappLogo size={33} />
                    </a>
                  </div>
                </div>
                <div>
                  <h3 className="text-white text-lg font-semibold mb-4">
                    Navigation
                  </h3>
                  <ul className="space-y-2 **:text-gray-300 **:hover:text-teal-300">
                    <li>
                      <Link href="/">Accueil</Link>
                    </li>
                    <li>
                      <Link href="/a-propos">À propos</Link>
                    </li>
                    <li>
                      <Link href="/actualites">Actualités</Link>
                    </li>
                    <li>
                      <Link href="/projet-xhamia-nur">Projet Xhamia Nur</Link>
                    </li>
                    <li>
                      <Link href="/donation">Donation</Link>
                    </li>
                    <li>
                      <Link href="/contact">Contact</Link>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-white text-lg font-semibold mb-4">
                    Contact
                  </h3>
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
                      <a
                        href="tel:+41799601790"
                        className="hover:text-teal-300 transition-colors"
                      >
                        079 960 17 90
                      </a>
                    </p>
                    <p className="mt-4 pt-2 md:border-t border-gray-700">
                      <a
                        href="/contact#parking-info"
                        className="inline-flex items-center hover:text-teal-300 transition-colors"
                      >
                        <LetterCircleP
                          weight="duotone"
                          className="text-blue-500 w-5 h-5 mr-1"
                        />
                        Informations Stationnement
                      </a>
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-8 pt-8 border-t border-gray-700 text-center">
                <p className="text-gray-500">
                  &copy; {new Date().getFullYear()} ACMSI.{' '}
                  <Link
                    href="/credits"
                    className="text-gray-500 hover:text-gray-300 transition-colors text-sm"
                  >
                    Crédits
                  </Link>{' '}
                  <span className="text-gray-600">|</span>{' '}
                  <a
                    href="https://opensource.org/license/isc-license-txt"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-gray-300 transition-colors text-sm"
                  >
                    Licence ISC
                  </a>
                </p>
              </div>
            </div>
          </footer>
        </AuthGuard>
      </body>
    </html>
  )
}
