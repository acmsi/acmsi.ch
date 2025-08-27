import Link from 'next/link'
import { Mosque, ArrowRight, TrendUp } from '@phosphor-icons/react/dist/ssr'

interface ProjectBannerProps {
  variant?: 'compact' | 'full'
  showProgress?: boolean
  totalAmount?: number
  raisedAmount?: number
  percentage?: number
}

export default function ProjectBanner({ 
  variant = 'compact', 
  showProgress = false,
  totalAmount = 1185500,
  raisedAmount = 0,
  percentage = 0
}: ProjectBannerProps) {
  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('fr-CH').format(amount)
  }

  if (variant === 'full') {
    return (
      <section className="py-16 lg:py-24 bg-gradient-to-br from-green-50 to-green-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <Mosque className="w-16 h-16 text-green-600" weight="duotone" />
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-3 text-green-900">
              Projet Xhamia Nur
            </h1>
            <p className="text-xl lg:text-2xl max-w-4xl mx-auto mb-8 text-green-800">
              Un projet essentiel de <strong>{formatAmount(totalAmount)} CHF</strong> pour établir
              l'ACMSI et développer un centre islamique moderne à Saint-Imier.
            </p>
            
            {showProgress && (
              <div className="max-w-2xl mx-auto mb-8">
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-green-700">Progression</span>
                    <span className="text-sm font-medium text-green-700">{percentage}%</span>
                  </div>
                  <div className="w-full bg-green-200 rounded-full h-3 mb-4">
                    <div 
                      className="bg-green-600 h-3 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min(percentage, 100)}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-sm text-green-800">
                    <span>{formatAmount(raisedAmount)} CHF levés</span>
                    <span>{formatAmount(totalAmount)} CHF objectif</span>
                  </div>
                </div>
              </div>
            )}

            <Link
              href="/projet-xhamia-nur"
              className="inline-flex items-center bg-green-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
            >
              Découvrir le projet
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-12 bg-gradient-to-r from-green-50 to-green-100 border-l-4 border-green-500">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Mosque className="w-6 h-6 text-green-600" weight="duotone" />
            </div>
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-green-900 mb-3">
              Projet Xhamia Nur
            </h2>
            <p className="text-lg text-green-800 mb-4">
              L'ACMSI doit racheter la mosquée Nur pour établir l'association sur des bases 
              islamiques solides et sans riba. Ce projet urgent de{' '}
              <strong>{formatAmount(totalAmount)} CHF</strong> permettra à notre communauté 
              d'avoir un lieu de culte pérenne dans ses murs.
            </p>
            
            {showProgress && (
              <div className="bg-white rounded-lg p-4 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <TrendUp className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-medium text-green-700">Progression actuelle</span>
                  </div>
                  <span className="text-sm font-bold text-green-700">{percentage}%</span>
                </div>
                <div className="w-full bg-green-200 rounded-full h-2 mb-2">
                  <div 
                    className="bg-green-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(percentage, 100)}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-green-700">
                  <span>{formatAmount(raisedAmount)} CHF</span>
                  <span>{formatAmount(totalAmount)} CHF</span>
                </div>
              </div>
            )}

            <Link
              href="/projet-xhamia-nur"
              className="inline-flex items-center bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
            >
              En savoir plus sur le projet
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}