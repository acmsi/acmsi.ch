import type { Metadata } from 'next'
import Link from 'next/link'
import { UsersThree, BookOpen } from '@phosphor-icons/react/dist/ssr'
import { Ruku, CalendarIslamic } from '@/components/icons'
import { getProjectSummary } from '@/lib/content'
import ProjectBanner from '@/components/project-banner'

export const metadata: Metadata = {
  title: 'Accueil - ACMSI',
  description:
    'Association Culturelle Musulmane de Saint-Imier - La mosquée Nur accueille la communauté musulmane du Jura bernois.',
}

export default async function HomePage() {
  const projectData = await getProjectSummary()
  return (
    <div>
      {/* Hero Section */}
      <section className="py-20 bg-linear-to-b from-white/20 via-white/60 to-white/80 lg:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center relative z-10">
            <h1 className="text-4xl lg:text-6xl font-bold mb-3">
              Bienvenue à la Mosquée Nur
            </h1>
            <p className="text-xl lg:text-2xl max-w-4xl mx-auto mb-12">
              Association Culturelle Musulmane de Saint-Imier - Un lieu de paix,
              de prière et de communauté au cœur du Jura bernois, guidé par les
              valeurs d&rsquo;
              <strong>Ihsan</strong>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/actualites"
                className="bg-gray-900 text-white px-8 py-4 rounded-lg font-medium hover:bg-gray-800 transition-colors"
              >
                Voir les actualités
              </Link>
              <Link
                href="/contact"
                className="bg-white text-gray-900 px-8 py-4 rounded-lg font-medium border-2 border-gray-300 hover:bg-gray-50 transition-colors"
              >
                Nous trouver
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Projet Xhamia Nur */}
      <ProjectBanner
        variant="full"
        showProgress={true}
        totalAmount={projectData?.total_objectif || 1185500}
        raisedAmount={projectData?.total_leve || 0}
        percentage={projectData?.pourcentage_global || 0}
      />

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-3">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Notre Mission
            </h2>
            <div className="max-w-4xl mx-auto text-lg">
              <p>
                L&rsquo;Association Culturelle Musulmane de Saint-Imier (ACMSI)
                a pour mission de servir la communauté musulmane locale et de
                promouvoir les valeurs islamiques d&rsquo;<strong>Ihsan</strong>{' '}
                - l&rsquo;excellence dans l&rsquo;adoration et la conduite.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">
              Nos Services
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Ruku className="w-8 h-8 text-gray-600" weight="duotone" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Prières quotidiennes
              </h3>
              <p>
                Cinq prières quotidiennes dans un cadre paisible et spirituel
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <UsersThree
                  className="w-8 h-8 text-gray-600"
                  weight="duotone"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">Prière du vendredi</h3>
              <p>Khutbah et prière communautaire chaque vendredi</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-gray-600" weight="duotone" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Éducation islamique
              </h3>
              <p>
                Cours d&rsquo;arabe et d&rsquo;éducation religieuse pour tous
                les âges
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CalendarIslamic
                  className="w-8 h-8 text-gray-600"
                  weight="duotone"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Événements communautaires
              </h3>
              <p>Cérémonies religieuses et activités sociales</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl text-white font-bold mb-6">
            Rejoignez Notre Communauté
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Découvrez un lieu de spiritualité et de fraternité au cœur de
            Saint-Imier
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/actualites"
              className="bg-white text-gray-900 px-8 py-4 rounded-lg font-medium hover:bg-gray-100 transition-colors"
            >
              Lire nos actualités
            </Link>
            <Link
              href="/donation"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-medium hover:bg-white hover:text-gray-900 transition-colors"
            >
              Faire un don
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
