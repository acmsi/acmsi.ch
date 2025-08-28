import Link from 'next/link'
import { Calendar, CheckCircle } from '@phosphor-icons/react/dist/ssr'
import type { BudgetProject } from '@/lib/content'
import ProgressBar from '@/components/progress-bar'
import ProjectStatus from '@/components/project-status'

interface ProjectCardProps {
  project: BudgetProject
  showLastUpdate?: boolean
}

export default function ProjectCard({ project, showLastUpdate = true }: ProjectCardProps) {
  const isCompleted = project.statut === 'termine'

  return (
    <div
      className={`bg-white rounded-lg shadow-sm border-2 p-6 transition-all duration-200 flex flex-col ${
        isCompleted
          ? 'border-green-200 hover:border-green-300'
          : 'border-gray-200 hover:border-green-200'
      }`}
    >
      {/* Contenu principal avec flex-1 */}
      <div className="flex-1">
        {/* Titre et statut */}
        <div className="flex items-start justify-between gap-3 mb-2">
          <Link
            href={`/projet-xhamia-nur/${project.slug}`}
            className="text-xl font-semibold flex-1 leading-tight hover:text-green-600 transition-colors"
          >
            {project.nom}
          </Link>
          
          {isCompleted ? (
            <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full flex-shrink-0">
              ✓ Accompli
            </span>
          ) : (
            <ProjectStatus
              status={project.statut}
              priority={project.priorite}
              className="flex-shrink-0"
            />
          )}
        </div>

        <p className="text-gray-600 mb-4">{project.description}</p>

        {/* Barre de progression */}
        <div className="mb-4">
          <ProgressBar
            percentage={project.pourcentage_completion}
            variant="medium"
          />
          <div className="flex justify-between items-center text-green-800 text-sm mt-2">
            <span className="font-semibold">
              CHF {project.montant_leve.toLocaleString()} alloué
            </span>
            <span>Budget : CHF {project.objectif.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Footer - Date de dernière mise à jour */}
      {showLastUpdate && project.derniere_maj && (
        <div className="text-xs text-gray-500 border-t pt-3 mt-auto">
          <span className="flex items-center">
            {isCompleted ? (
              <CheckCircle
                className="w-3 h-3 mr-1 text-green-500"
                weight="duotone"
              />
            ) : (
              <Calendar className="w-3 h-3 mr-1" />
            )}
            {isCompleted ? 'Accompli' : 'Dernière mise à jour'} :{' '}
            {new Date(project.derniere_maj).toLocaleDateString('fr-CH', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </span>
        </div>
      )}
    </div>
  )
}