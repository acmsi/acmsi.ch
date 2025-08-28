interface ProjectStatusProps {
  status: 'en_cours' | 'termine' | 'en_attente'
  priority?: number
  className?: string
}

export default function ProjectStatus({ status, priority, className = '' }: ProjectStatusProps) {
  // Si le projet est terminé, afficher "✓ Accompli"
  if (status === 'termine') {
    return (
      <span className={`bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full flex-shrink-0 ${className}`}>
        ✓ Accompli
      </span>
    )
  }

  // Pour les projets non terminés, afficher la priorité si elle existe
  if (priority) {
    return (
      <span
        className={`text-xs font-medium px-2.5 py-0.5 rounded-full flex-shrink-0 ${
          priority === 1
            ? 'bg-red-100 text-red-800'
            : priority === 2
              ? 'bg-orange-100 text-orange-800'
              : 'bg-gray-100 text-gray-800'
        } ${className}`}
      >
        Priorité {priority}
      </span>
    )
  }

  // Fallback si pas de priorité définie
  return (
    <span className={`bg-gray-100 text-gray-700 text-xs font-medium px-2.5 py-0.5 rounded-full flex-shrink-0 ${className}`}>
      Sans priorité
    </span>
  )
}