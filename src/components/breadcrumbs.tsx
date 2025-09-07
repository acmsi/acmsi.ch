import Link from 'next/link'
import type { ComponentProps } from 'react'

export interface BreadcrumbItem {
  href?: ComponentProps<typeof Link>['href']
  label: string
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <section className="py-8 bg-white/70 border-b border-gray-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex flex-wrap items-center space-x-2 text-sm text-gray-600">
          {items.map((item, index) => (
            <div key={index} className="flex items-center space-x-2">
              {index > 0 && <span>/</span>}
              {item.href ? (
                <Link
                  href={item.href}
                  className="hover:text-teal-600 transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <span>{item.label}</span>
              )}
            </div>
          ))}
        </nav>
      </div>
    </section>
  )
}
