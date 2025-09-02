'use client'

import { useState } from 'react'
import { Warning, X } from '@phosphor-icons/react'

export default function ConstructionBanner() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="bg-amber-100 border-b-2 border-amber-200 relative">
      <div className="max-w-7xl mx-auto py-3 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between flex-wrap">
          <div className="w-0 flex-1 flex items-center">
            <span className="flex p-2 rounded-lg bg-amber-200">
              <Warning className="h-5 w-5 text-amber-600" />
            </span>
            <p className="ml-3 font-medium text-amber-800">
              <span className="md:hidden">
                Site en cours de révision par le comité
              </span>
              <span className="hidden md:inline">
                Ce site est actuellement en cours de révision par le comité de
                l&apos;association. Certaines informations peuvent être
                temporairement indisponibles.
              </span>
            </p>
          </div>
          <div className="order-3 mt-2 flex-shrink-0 w-full sm:order-2 sm:mt-0 sm:w-auto">
            <div className="rounded-md shadow-sm">
              <a
                href="mailto:contact@acmsi.ch"
                className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md text-sm font-medium text-amber-800 bg-amber-200 hover:bg-amber-300 transition-colors"
              >
                Nous contacter
              </a>
            </div>
          </div>
          <div className="order-2 flex-shrink-0 sm:order-3 sm:ml-3">
            <button
              type="button"
              onClick={() => setIsVisible(false)}
              className="-mr-1 flex p-2 rounded-md hover:bg-amber-200 focus:outline-none focus:ring-2 focus:ring-amber-600 transition-colors"
              aria-label="Fermer la bannière"
            >
              <X className="h-5 w-5 text-amber-600" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
