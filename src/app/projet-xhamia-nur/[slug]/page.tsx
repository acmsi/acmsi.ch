import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Calendar, Target } from '@phosphor-icons/react/dist/ssr'
import {
  getBudgetProject,
  getProjectSummary,
  getAllBudgetProjects,
  isProjectCompleted,
  formatCompletionDate,
  formatDeadlineDate,
} from '@/lib/content'
import ProgressBar from '@/components/progress-bar'
import ProjectStatus from '@/components/project-status'
import CompletedProjectBanner from '@/components/completed-project-banner'
import { formatAmount } from '@/lib/format'

type Props = {
  params: Promise<{ slug: string }>
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
  const { slug } = await params
  const project = await getBudgetProject(slug)

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
  const { slug } = await params
  const project = await getBudgetProject(slug)
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
      <section className="py-16 bg-nur-cream-50 border-b border-nur-cream-300">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl lg:text-4xl font-bold text-green-900 mb-4">{project.nom}</h1>

            {/* Ligne avec dates et priorité */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-8 mb-6 text-sm text-green-800">
              {/* Dernière mise à jour (gauche sur desktop) - toujours affiché */}
              {project.derniere_maj && (
                <div className="flex items-center justify-end flex-1">
                  <Calendar className="w-4 h-4 mr-1" />
                  Dernière mise à jour :{' '}
                  {new Date(project.derniere_maj).toLocaleDateString('fr-CH')}
                </div>
              )}

              {/* Priorité ou badge Accompli (centre sur desktop) */}
              <div className="order-first sm:order-none">
                {isProjectCompleted(project) ? (
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    ✓ Accompli
                  </span>
                ) : (
                  <ProjectStatus status="active" priority={project.priorite} />
                )}
              </div>

              {/* Date d'accomplissement ou échéance souhaitée (droite sur desktop) */}
              {isProjectCompleted(project) && project.date_accomplissement ? (
                <div className="flex items-center flex-1">
                  <Calendar className="w-4 h-4 mr-1" />
                  Accompli : {formatCompletionDate(project.date_accomplissement)}
                </div>
              ) : (
                !isProjectCompleted(project) &&
                project.date_fin_prevue && (
                  <div className="flex items-center flex-1">
                    <Target className="w-4 h-4 mr-1" />
                    Échéance souhaitée : {formatDeadlineDate(project.date_fin_prevue)}
                  </div>
                )
              )}
            </div>

            {project.description && (
              <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-8">{project.description}</p>
            )}
          </div>

          {/* Progression */}
          <div className="px-6 mb-6">
            <ProgressBar
              percentage={project.pourcentage_completion}
              variant="thick"
              allocatedAmount={project.montant_leve}
              budgetAmount={project.objectif}
            />
            <div
              className="relative flex flex-wrap-reverse gap-x-3 justify-between items-center text-green-800 text-sm mt-2 px-1 mb-6 transition-all duration-500"
              style={{
                width:
                  project.pourcentage_completion > 100
                    ? `${(100 / project.pourcentage_completion) * 100}%`
                    : '100%',
              }}
            >
              <span className="font-semibold flex-1 text-nowrap">
                {formatAmount(project.montant_leve)} alloué
              </span>
              <span className="text-right flex-1 text-nowrap">
                Budget : {formatAmount(project.objectif)}
              </span>

              {/* Vertical line */}
              {project.pourcentage_completion > 100 && (
                <div className="absolute w-px h-3 bg-green-500 -top-2 right-0"></div>
              )}
            </div>
          </div>

          {/* Statut */}
          {isProjectCompleted(project) && (
            <CompletedProjectBanner
              title="Sous-projet accompli"
              description="Ce volet du Projet Xhamia Nur a été complété avec succès."
              className="mb-8"
            />
          )}
        </div>
      </section>

      {/* Contenu détaillé */}
      <section className="py-16 bg-white">
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
              <Target className="w-6 h-6 text-green-800 flex-shrink-0 mt-1" weight="duotone" />
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
                      <strong>Projet global :</strong> {formatAmount(projectSummary.total_leve)} sur {formatAmount(projectSummary.total_objectif)} (
                      {projectSummary.pourcentage_global.toFixed(1)}&thinsp;%)
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
