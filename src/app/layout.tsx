import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import './global.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ACMSI - Association Culturelle Musulmane de Saint-Imier',
  description: 'Site officiel de l\'Association Culturelle Musulmane de Saint-Imier et de la mosquée Nur.',
  keywords: ['ACMSI', 'mosquée', 'Saint-Imier', 'islam', 'association', 'Nur'],
  authors: [{ name: 'ACMSI' }],
  openGraph: {
    title: 'ACMSI - Association Culturelle Musulmane de Saint-Imier',
    description: 'Site officiel de l\'Association Culturelle Musulmane de Saint-Imier et de la mosquée Nur.',
    url: 'https://www.acmsi.ch',
    siteName: 'ACMSI',
    locale: 'fr_CH',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ACMSI - Association Culturelle Musulmane de Saint-Imier',
    description: 'Site officiel de l\'Association Culturelle Musulmane de Saint-Imier et de la mosquée Nur.',
  },
  robots: {
    index: true,
    follow: true,
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
        <script src="https://identity.netlify.com/v1/netlify-identity-widget.js" async></script>
      </head>
      <body className={`${inter.className} bg-nur-cream-50 text-nur-navy-900 antialiased`}>
        <header className="bg-white shadow-sm border-b border-nur-teal-100">
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <h1 className="text-xl font-bold text-nur-teal-700">ACMSI</h1>
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <Link href="/" className="text-nur-navy-700 hover:text-nur-teal-600 px-3 py-2 rounded-md text-sm font-medium">
                    Accueil
                  </Link>
                  <Link href="/a-propos" className="text-nur-navy-700 hover:text-nur-teal-600 px-3 py-2 rounded-md text-sm font-medium">
                    À propos
                  </Link>
                  <Link href="/actualites" className="text-nur-navy-700 hover:text-nur-teal-600 px-3 py-2 rounded-md text-sm font-medium">
                    Actualités
                  </Link>
                  <Link href="/donation" className="text-nur-navy-700 hover:text-nur-teal-600 px-3 py-2 rounded-md text-sm font-medium">
                    Donation
                  </Link>
                  <Link href="/contact" className="text-nur-navy-700 hover:text-nur-teal-600 px-3 py-2 rounded-md text-sm font-medium">
                    Contact
                  </Link>
                </div>
              </div>
            </div>
          </nav>
        </header>

        <main className="min-h-screen">
          {children}
        </main>

        <footer className="bg-nur-navy-900 text-nur-cream-100">
          <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">ACMSI</h3>
                <p className="text-nur-cream-200">
                  Association Culturelle Musulmane de Saint-Imier
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Navigation</h3>
                <ul className="space-y-2">
                  <li><Link href="/" className="text-nur-cream-200 hover:text-nur-teal-300">Accueil</Link></li>
                  <li><Link href="/a-propos" className="text-nur-cream-200 hover:text-nur-teal-300">À propos</Link></li>
                  <li><Link href="/actualites" className="text-nur-cream-200 hover:text-nur-teal-300">Actualités</Link></li>
                  <li><Link href="/donation" className="text-nur-cream-200 hover:text-nur-teal-300">Donation</Link></li>
                  <li><Link href="/contact" className="text-nur-cream-200 hover:text-nur-teal-300">Contact</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Contact</h3>
                <p className="text-nur-cream-200">
                  Saint-Imier, Suisse
                </p>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-nur-navy-700 text-center">
              <p className="text-nur-cream-300">
                &copy; {new Date().getFullYear()} ACMSI. Tous droits réservés.
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
