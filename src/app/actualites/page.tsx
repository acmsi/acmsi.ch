import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Actualités - ACMSI',
  description: 'Suivez les dernières actualités et événements de l\'Association Culturelle Musulmane de Saint-Imier.',
}

export default function ActualitesPage() {
  return (
    <div className="bg-gradient-to-b from-nur-cream-50 to-white">
      {/* Hero Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-bold text-nur-navy-900 mb-6">
              Actualités
            </h1>
            <p className="text-xl text-nur-navy-700 max-w-3xl mx-auto">
              Restez informés des dernières nouvelles et événements de notre communauté
            </p>
          </div>
        </div>
      </section>

      {/* Articles Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Placeholder Article 1 */}
            <article className="bg-nur-cream-50 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="h-48 bg-nur-teal-100 flex items-center justify-center">
                <svg className="w-16 h-16 text-nur-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
              <div className="p-6">
                <div className="flex items-center text-sm text-nur-navy-600 mb-2">
                  <time dateTime="2024-01-15">15 janvier 2024</time>
                </div>
                <h3 className="text-xl font-semibold text-nur-navy-900 mb-3">
                  Horaires du Ramadan 2024
                </h3>
                <p className="text-nur-navy-700 mb-4">
                  Découvrez les horaires de prières et les activités spéciales 
                  organisées durant le mois béni du Ramadan.
                </p>
                <a href="#" className="text-nur-teal-600 font-medium hover:text-nur-teal-700 inline-flex items-center">
                  Lire la suite
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </article>

            {/* Placeholder Article 2 */}
            <article className="bg-nur-cream-50 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="h-48 bg-nur-gold-100 flex items-center justify-center">
                <svg className="w-16 h-16 text-nur-gold-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div className="p-6">
                <div className="flex items-center text-sm text-nur-navy-600 mb-2">
                  <time dateTime="2024-01-10">10 janvier 2024</time>
                </div>
                <h3 className="text-xl font-semibold text-nur-navy-900 mb-3">
                  Cours d'arabe pour enfants
                </h3>
                <p className="text-nur-navy-700 mb-4">
                  Inscription ouverte pour les cours d'arabe et d'éducation islamique 
                  destinés aux enfants de 6 à 14 ans.
                </p>
                <a href="#" className="text-nur-teal-600 font-medium hover:text-nur-teal-700 inline-flex items-center">
                  Lire la suite
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </article>

            {/* Placeholder Article 3 */}
            <article className="bg-nur-cream-50 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <div className="h-48 bg-nur-navy-100 flex items-center justify-center">
                <svg className="w-16 h-16 text-nur-navy-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div className="p-6">
                <div className="flex items-center text-sm text-nur-navy-600 mb-2">
                  <time dateTime="2024-01-05">5 janvier 2024</time>
                </div>
                <h3 className="text-xl font-semibold text-nur-navy-900 mb-3">
                  Collecte solidaire d'hiver
                </h3>
                <p className="text-nur-navy-700 mb-4">
                  Notre communauté organise une collecte de vêtements chauds 
                  et de denrées alimentaires pour les familles dans le besoin.
                </p>
                <a href="#" className="text-nur-teal-600 font-medium hover:text-nur-teal-700 inline-flex items-center">
                  Lire la suite
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* CMS Notice */}
      <section className="py-16 bg-nur-teal-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <div className="w-16 h-16 bg-nur-teal-100 rounded-lg flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-nur-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-nur-navy-900 mb-4">
              Système de gestion de contenu en cours d'installation
            </h3>
            <p className="text-nur-navy-700">
              Les actualités seront bientôt gérées via Decap CMS, permettant 
              une mise à jour facile et régulière du contenu par l'équipe de la mosquée.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
