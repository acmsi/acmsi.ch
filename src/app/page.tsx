import type { Metadata } from 'next'
import { getPageContent } from '@/lib/content'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Accueil - ACMSI',
  description: 'Association Culturelle Musulmane de Saint-Imier - La mosquée Nur accueille la communauté musulmane du Jura bernois.',
}

export default async function HomePage() {
  const pageContent = await getPageContent('homepage')
  
  // Fallback content if CMS content is not available
  const content = pageContent || {
    hero_title: "Bienvenue à la Mosquée Nur",
    hero_subtitle: "Association Culturelle Musulmane de Saint-Imier - Un lieu de paix, de prière et de communauté au cœur du Jura bernois",
    mission_title: "Notre Mission",
    mission_content: "<p>L'Association Culturelle Musulmane de Saint-Imier (ACMSI) a pour mission de servir la communauté musulmane locale et de promouvoir les valeurs islamiques d'<strong>Ihsan</strong> - l'excellence dans l'adoration et la conduite.</p>",
    services_title: "Nos Services",
    services_content: "<h3>Prières quotidiennes</h3><p>Cinq prières quotidiennes dans un cadre paisible et spirituel</p>"
  }

  return (
    <div className="bg-gradient-to-b from-nur-cream-50 to-white">
      {/* Hero Section */}
      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-6xl font-bold text-nur-navy-900 mb-6">
              {content.hero_title}
            </h1>
            <p className="text-xl lg:text-2xl text-nur-navy-700 max-w-4xl mx-auto mb-12">
              {content.hero_subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/actualites" 
                className="bg-nur-teal-600 text-white px-8 py-4 rounded-lg font-medium hover:bg-nur-teal-700 transition-colors"
              >
                Voir les actualités
              </a>
              <a 
                href="/contact" 
                className="bg-white text-nur-teal-600 px-8 py-4 rounded-lg font-medium border-2 border-nur-teal-600 hover:bg-nur-teal-50 transition-colors"
              >
                Nous contacter
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-nur-navy-900 mb-6">
              {content.mission_title}
            </h2>
            <div 
              className="text-lg text-nur-navy-700 prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: content.mission_content }}
            />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-nur-cream-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-nur-navy-900 mb-6">
              {content.services_title}
            </h2>
          </div>
          
          <div 
            className="prose prose-lg max-w-none text-center"
            dangerouslySetInnerHTML={{ __html: content.services_content }}
          />
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-nur-navy-900 mb-6">
                Notre Mission
              </h2>
              <p className="text-lg text-nur-navy-700 mb-6">
                L'ACMSI œuvre pour créer un espace de culte, d'apprentissage et de rencontre 
                pour la communauté musulmane de Saint-Imier et des environs.
              </p>
              <p className="text-lg text-nur-navy-700 mb-8">
                Guidés par les valeurs d'Ihsan, nous nous efforçons de maintenir un environnement 
                accueillant, respectueux et spirituellement enrichissant pour tous.
              </p>
              <a 
                href="/a-propos" 
                className="text-nur-teal-600 font-medium hover:text-nur-teal-700 inline-flex items-center"
              >
                En savoir plus
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
            <div className="relative h-96 rounded-lg overflow-hidden shadow-lg">
              <Image
                src="/farsh.png"
                alt="Tapis de la mosquée Nur"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-nur-cream-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-nur-navy-900 mb-4">
              Nos Services
            </h2>
            <p className="text-lg text-nur-navy-700">
              Découvrez les différentes activités et services proposés par notre association
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-nur-teal-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-nur-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-nur-navy-900 mb-2">Prières quotidiennes</h3>
              <p className="text-nur-navy-700">
                Cinq prières quotidiennes dans un cadre paisible et spirituel
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-nur-gold-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-nur-gold-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-nur-navy-900 mb-2">Enseignement</h3>
              <p className="text-nur-navy-700">
                Cours de Coran, d'arabe et d'éducation islamique pour tous les âges
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-nur-navy-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-nur-navy-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-nur-navy-900 mb-2">Communauté</h3>
              <p className="text-nur-navy-700">
                Événements communautaires et activités de solidarité
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-nur-teal-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Rejoignez notre communauté
          </h2>
          <p className="text-xl text-nur-teal-100 mb-8 max-w-2xl mx-auto">
            Que vous soyez nouveau dans la région ou que vous cherchiez une communauté spirituelle, 
            vous êtes les bienvenus à la mosquée Nur.
          </p>
          <a 
            href="/contact" 
            className="bg-white text-nur-teal-600 px-8 py-3 rounded-lg font-medium hover:bg-nur-cream-50 transition-colors inline-block"
          >
            Nous rendre visite
          </a>
        </div>
      </section>
    </div>
  )
}
