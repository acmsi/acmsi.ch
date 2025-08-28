import { CheckCircle } from '@phosphor-icons/react/dist/ssr'

interface CompletedProjectBannerProps {
  title?: string
  description?: string
  className?: string
}

export default function CompletedProjectBanner({
  title = 'Projet accompli',
  description = 'Ce volet du Projet Xhamia Nur a été complété avec succès.',
  className = '',
}: CompletedProjectBannerProps) {
  return (
    <div
      className={`bg-green-50 border border-green-200 rounded-lg p-6 ${className}`}
    >
      <div className="flex items-center">
        <CheckCircle className="w-6 h-6 text-green-600 mr-3" weight="duotone" />
        <div>
          <h3 className="text-lg font-semibold text-green-900">{title}</h3>
          <p className="text-green-800">{description}</p>
        </div>
      </div>
    </div>
  )
}
