import { ReactNode } from 'react'

interface SectionCardProps {
  icon: ReactNode
  title: string
  children: ReactNode
  iconBgColor?: string
  className?: string
}

export default function SectionCard({
  icon,
  title,
  children,
  iconBgColor = 'bg-gray-100',
  className = '',
}: SectionCardProps) {
  return (
    <div className={`bg-white p-6 rounded-lg shadow-sm ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-start sm:space-x-4">
        <div className="flex items-center gap-3 sm:block mb-3 sm:mb-0">
          <div
            className={`w-12 h-12 ${iconBgColor} rounded-lg flex items-center justify-center flex-shrink-0`}
          >
            {icon}
          </div>
          <h3 className="text-xl font-semibold sm:hidden">{title}</h3>
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-semibold mb-3 hidden sm:block">
            {title}
          </h3>
          {children}
        </div>
      </div>
    </div>
  )
}
