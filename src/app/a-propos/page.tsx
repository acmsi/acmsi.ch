import type { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'À propos - ACMSI',
  description: 'Découvrez l\'histoire et la mission de l\'Association Culturelle Musulmane de Saint-Imier et de la mosquée Nur.',
}

export default function AProposPage() {
  return (
    <div className="bg-gradient-to-b from-nur-cream-50 to-white">
      {/* Hero Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-bold text-nur-navy-900 mb-6">
              À propos de la Mosquée Nur
            </h1>
            <p className="text-xl text-nur-navy-700 max-w-3xl mx-auto">
              Découvrez l'histoire, la mission et les valeurs qui guident notre communauté
            </p>
          </div>
        </div>
      </section>

      {/* Histoire Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-nur-navy-900 mb-6">
                Notre Histoire
              </h2>
              <div className="prose prose-lg text-nur-navy-700">
                <p>
                  L'Association Culturelle Musulmane de Saint-Imier (ACMSI) a été fondée 
                  par une communauté unie dans sa foi et son désir de créer un espace 
                  spirituel au cœur du Jura bernois.
                </p>
                <p>
                  La mosquée Nur, également appelée Xhamia Nur en hommage aux membres 
                  fondateurs originaires des Balkans, notamment d'Albanie, représente 
                  un pont entre les cultures et les traditions.
                </p>
                <p>
                  Le nom "Nur" signifie "lumière" en arabe, symbolisant notre mission 
                  d'éclairer les cœurs et les esprits par la spiritualité et la connaissance.
                </p>
              </div>
            </div>
            <div className="relative h-96 rounded-lg overflow-hidden shadow-lg">
              <Image
                src="/farsh.png"
                alt="Intérieur de la mosquée Nur"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-nur-cream-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-nur-navy-900 mb-4">
              Notre Mission
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="w-16 h-16 bg-nur-teal-100 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-nur-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-nur-navy-900 mb-4">Spiritualité</h3>
              <p className="text-nur-navy-700">
                Offrir un espace de recueillement et de prière dans le respect 
                des traditions islamiques et des valeurs d'Ihsan.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="w-16 h-16 bg-nur-gold-100 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-nur-gold-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-nur-navy-900 mb-4">Éducation</h3>
              <p className="text-nur-navy-700">
                Transmettre les enseignements islamiques, la langue arabe et 
                promouvoir l'apprentissage du Coran pour tous les âges.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="w-16 h-16 bg-nur-navy-100 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-nur-navy-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-nur-navy-900 mb-4">Communauté</h3>
              <p className="text-nur-navy-700">
                Rassembler la communauté musulmane locale et favoriser 
                l'intégration harmonieuse dans la société suisse.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Valeurs Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-nur-navy-900 mb-4">
              Nos Valeurs
            </h2>
            <p className="text-lg text-nur-navy-700">
              Guidés par les principes fondamentaux de l'Islam
            </p>
          </div>
          
          <div className="space-y-8">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-8 h-8 bg-nur-teal-600 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold">1</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-nur-navy-900 mb-2">Ihsan - L'Excellence</h3>
                <p className="text-nur-navy-700">
                  Nous nous efforçons d'atteindre l'excellence dans tous nos actes, 
                  en adorant Allah comme si nous Le voyions.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-8 h-8 bg-nur-teal-600 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold">2</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-nur-navy-900 mb-2">Fraternité</h3>
                <p className="text-nur-navy-700">
                  Nous cultivons l'esprit de fraternité et d'entraide au sein 
                  de notre communauté et au-delà.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-8 h-8 bg-nur-teal-600 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold">3</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-nur-navy-900 mb-2">Respect</h3>
                <p className="text-nur-navy-700">
                  Nous respectons la diversité culturelle et favorisons 
                  le dialogue interreligieux et interculturel.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-8 h-8 bg-nur-teal-600 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold">4</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-nur-navy-900 mb-2">Solidarité</h3>
                <p className="text-nur-navy-700">
                  Nous œuvrons pour la solidarité sociale et l'aide aux plus démunis, 
                  conformément aux enseignements islamiques.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
