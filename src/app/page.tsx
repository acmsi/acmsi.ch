import type { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Accueil - ACMSI',
  description: 'Association Culturelle Musulmane de Saint-Imier - La mosquée Nur accueille la communauté musulmane du Jura bernois.',
}

export default function HomePage() {
  return (
    <div className="bg-gradient-to-b from-nur-cream-50 to-white">
      {/* Hero Section */}
      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-6xl font-bold text-nur-navy-900 mb-6">
              Bienvenue à la Mosquée Nur
            </h1>
            <p className="text-xl lg:text-2xl text-nur-navy-700 max-w-4xl mx-auto mb-12">
              Association Culturelle Musulmane de Saint-Imier - Un lieu de paix, de prière et de communauté au cœur du Jura bernois, guidé par les valeurs d'<strong>Ihsan</strong>
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
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-nur-navy-900 mb-6">
              Notre Mission
            </h2>
            <div className="max-w-4xl mx-auto text-lg text-nur-navy-700">
              <p>
                L'Association Culturelle Musulmane de Saint-Imier (ACMSI) a pour mission de servir la communauté musulmane locale et de promouvoir les valeurs islamiques d'<strong>Ihsan</strong> - l'excellence dans l'adoration et la conduite.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-nur-navy-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-nur-navy-900 mb-6">
              Nos Services
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-nur-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v18m9-9H3" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-nur-navy-900 mb-2">Prières quotidiennes</h3>
              <p className="text-nur-navy-600">Cinq prières quotidiennes dans un cadre paisible et spirituel</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-nur-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-nur-navy-900 mb-2">Prière du vendredi</h3>
              <p className="text-nur-navy-600">Khutbah et prière communautaire chaque vendredi</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-nur-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-nur-navy-900 mb-2">Éducation islamique</h3>
              <p className="text-nur-navy-600">Cours d'arabe et d'éducation religieuse pour tous les âges</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-nur-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-nur-navy-900 mb-2">Événements communautaires</h3>
              <p className="text-nur-navy-600">Cérémonies religieuses et activités sociales</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-nur-teal-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Rejoignez Notre Communauté
          </h2>
          <p className="text-xl text-nur-teal-100 mb-10 max-w-2xl mx-auto">
            Découvrez un lieu de spiritualité et de fraternité au cœur de Saint-Imier
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/actualites" 
              className="bg-white text-nur-teal-600 px-8 py-4 rounded-lg font-medium hover:bg-nur-navy-50 transition-colors"
            >
              Lire nos actualités
            </a>
            <a 
              href="/donation" 
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-medium hover:bg-white hover:text-nur-teal-600 transition-colors"
            >
              Faire un don
            </a>
          </div>
        </div>
      </section>

      {/* Mosque Image Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Image
              src="/farsh.png"
              alt="Mosquée Nur - Tapis de prière"
              width={800}
              height={600}
              className="mx-auto rounded-lg shadow-lg"
              priority
            />
            <p className="mt-6 text-gray-600 italic">
              Le tapis de la mosquée Nur, symbole de notre communauté unie dans la prière
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
