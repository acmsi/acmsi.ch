import { type ReactNode } from 'react'

interface CardKeyPointProps {
  icon: ReactNode
  title: string
  description: string
  iconBgColor?: string
  iconColor?: string
  className?: string
}

export default function CardKeyPoint({
  icon,
  title,
  description,
  iconBgColor = 'bg-green-100',
  iconColor = 'text-green-600',
  className = '',
}: CardKeyPointProps) {
  return (
    <div
      className={`flex items-start space-x-4 lg:flex-col lg:items-center lg:text-center lg:space-x-0 ${className}`}
    >
      <div
        className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 lg:mb-4 ${iconBgColor}`}
      >
        <div className={iconColor}>{icon}</div>
      </div>
      <div className="flex-1">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  )
}
