import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Calendar, Target } from '@phosphor-icons/react/dist/ssr'
import { getBudgetProject, getProjectSummary, getAllBudgetProjects } from '@/lib/content'
import ProgressBar from '@/components/progress-bar'
import ProjectStatus from '@/components/project-status'
import CompletedProjectBanner from '@/components/completed-project-banner'

type Props = {
  params: { slug: string }
}

export async function generateStaticParams() {
  const projects = await getAllBudgetProjects()
  return projects
    .filter(project => project.type === 'sous_projet')
    .map(project => ({
      slug: project.slug,
    }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = await getBudgetProject(params.slug)

  if (!project) {
    return {
      title: 'Sous-projet non trouvé - ACMSI',
    }
  }

  return {
    title: `${project.nom} - Projet Xhamia Nur - ACMSI`,
    description:
      project.description || `Découvrez le sous-projet "${project.nom}" du Projet Xhamia Nur`,
  }
}

export default async function SousProjetPage({ params }: Props) {
  const project = await getBudgetProject(params.slug)
  const projectSummary = await getProjectSummary()

  if (!project || project.type !== 'sous_projet') {
    notFound()
  }

  return (
    <div className="bg-white">
      {/* Breadcrumb */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/projet-xhamia-nur" className="hover:text-green-600 transition-colors">
              Projet Xhamia Nur
            </Link>
            <span>/</span>
            <span>{project.nom}</span>
          </nav>
        </div>
      </section>

      {/* En-tête du sous-projet */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl lg:text-4xl font-bold text-green-900 mb-3">{project.nom}</h1>
            <div className="flex justify-center mb-4">
              <ProjectStatus status={project.statut} priority={project.priorite} />
            </div>

            {project.description && (
              <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-8">{project.description}</p>
            )}
          </div>

          {/* Progression */}
          <div className="bg-green-50 rounded-lg p-6 mb-8">
            <div className="text-center mb-4">
              <h3 className="text-lg font-semibold text-green-900 mb-2">
                Progression du sous-projet
              </h3>
            </div>

            <ProgressBar 
              percentage={project.pourcentage_completion}
              raisedAmount={project.montant_leve}
              targetAmount={project.objectif}
              size="md"
            />

            {project.date_fin_prevue && (
              <div className="flex items-center justify-center mt-3 text-sm text-green-700">
                <Calendar className="w-4 h-4 mr-1" />
                Échéance souhaitée : {new Date(project.date_fin_prevue).toLocaleDateString('fr-CH')}
              </div>
            )}
          </div>

          {/* Statut */}
          {project.statut === 'termine' && (
            <CompletedProjectBanner 
              title="Sous-projet accompli"
              description="Ce volet du Projet Xhamia Nur a été complété avec succès."
              className="mb-8"
            />
          )}
        </div>
      </section>

      {/* Contenu détaillé */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="prose prose-lg mx-auto"
            dangerouslySetInnerHTML={{ __html: project.content }}
          />
        </div>
      </section>

      {/* Contexte dans le projet global */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-4">Contexte dans le projet global</h2>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <div className="flex items-start space-x-3">
              <Target className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" weight="duotone" />
              <div>
                <h3 className="text-lg font-semibold text-green-900 mb-2">
                  Allocation flexible des dons
                </h3>
                <p className="text-green-800 mb-3">
                  L'ACMSI gère les fonds collectés de manière globale, permettant une allocation
                  optimale selon l'évolution des priorités et la réalité du terrain.
                </p>

                {projectSummary && (
                  <div className="text-sm text-green-700">
                    <p>
                      <strong>Projet global :</strong> CHF{' '}
                      {projectSummary.total_leve.toLocaleString()} sur CHF{' '}
                      {projectSummary.total_objectif.toLocaleString()} (
                      {projectSummary.pourcentage_global.toFixed(1)}%)
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Appel à contribution */}
      <section className="py-16 bg-green-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl lg:text-3xl font-bold mb-4">Soutenez le Projet Xhamia Nur</h2>
          <p className="text-lg mb-8 opacity-90">
            Vos contributions permettent de réaliser tous les aspects du projet selon les besoins
            réels.
          </p>
          <div className="flex justify-between items-center">
            <Link
              href="/projet-xhamia-nur"
              className="bg-white text-green-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors inline-flex items-center"
            >
              <ArrowLeft className="w-4 h-4 mr-2" weight="bold" />
              Retour au projet principal
            </Link>

            <Link
              href="/projet-xhamia-nur#faire-un-don"
              className="text-white font-medium hover:text-green-100 transition-colors"
            >
              🤲 Faire un don
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
