import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from '@phosphor-icons/react/dist/ssr'
import { getProjectSummary, getCompletedProjects } from '@/lib/content'
import ProjectCard from '@/components/project-card'

export const metadata: Metadata = {
  title: 'Réalisations accomplies - Projet Xhamia Nur - ACMSI',
  description:
    'Découvrez toutes les réalisations accomplies dans le cadre du Projet Xhamia Nur grâce à la générosité de notre communauté.',
}

export default async function RealisationsPage() {
  const projectData = await getProjectSummary()

  // Filtrer et trier les projets terminés par date d'accomplissement (plus récent en premier)
  const projetsTermines = projectData?.sous_projets
    ? getCompletedProjects(projectData.sous_projets).sort((a, b) => {
        const dateA = a.date_accomplissement
          ? new Date(a.date_accomplissement).getTime()
          : 0
        const dateB = b.date_accomplissement
          ? new Date(b.date_accomplissement).getTime()
          : 0
        return dateB - dateA
      })
    : []

  return (
    <div className="bg-white">
      {/* Breadcrumb */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link
              href="/projet-xhamia-nur"
              className="hover:text-green-600 transition-colors"
            >
              Projet Xhamia Nur
            </Link>
            <span>/</span>
            <span>Réalisations accomplies</span>
          </nav>
        </div>
      </section>

      {/* En-tête */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-green-900">
              Réalisations accomplies
            </h1>
            <p className="text-xl text-gray-700 max-w-4xl mx-auto mb-8">
              Découvrez toutes les réalisations qui ont été menées à bien dans
              le cadre du Projet Xhamia Nur grâce à la générosité, au travail et
              à l&apos;engagement de notre communauté.
            </p>
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 max-w-3xl mx-auto">
              <p className="text-green-800 text-lg">
                <strong>جَزَاكُمُ اللَّهُ خَيْرًا</strong> - Qu&apos;Allah récompense
                tous ceux qui ont contribué par leurs dons, leur travail et leur
                engagement à ces belles réalisations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Liste des projets terminés */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {projetsTermines.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projetsTermines.map(projet => (
                <ProjectCard key={projet.slug} project={projet} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-xl text-gray-600 mb-4">
                Aucune réalisation n&apos;est encore enregistrée dans le système.
              </p>
              <p className="text-gray-500">
                Les projets terminés apparaîtront ici au fur et à mesure de leur
                accomplissement.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Navigation */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <Link
              href="/projet-xhamia-nur"
              className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors inline-flex items-center"
            >
              <ArrowLeft className="w-4 h-4 mr-2" weight="bold" />
              Retour au projet principal
            </Link>

            <Link
              href="/projet-xhamia-nur#faire-un-don"
              className="text-green-600 font-medium hover:text-green-700 transition-colors"
            >
              🤲 Soutenir le projet
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
