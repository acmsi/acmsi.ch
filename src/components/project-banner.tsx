import Link from 'next/link'
import { Mosque, ArrowRight, TrendUp } from '@phosphor-icons/react/dist/ssr'
import ProgressBar from './progress-bar'
import { formatAmount, formatPercentage } from '@/lib/format'

interface ProjectBannerProps {
  variant?: 'compact' | 'full' | 'thin'
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
  percentage = 0,
}: ProjectBannerProps) {
  if (variant === 'thin') {
    return (
      <section className="py-12 bg-gradient-to-r from-green-50 to-green-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap flex-row items-center justify-center gap-6 lg:gap-12">
            <div className="md:shrink-0">
              <div className="flex items-center space-x-3 mb-2">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mosque className="w-6 h-6 text-green-600" weight="duotone" />
                </div>
                <h3 className="text-2xl font-headings font-bold text-green-900">
                  Projet Xhamia Nur
                </h3>
              </div>
              <p className="text-green-700 mb-3 text-sm">
                Levée de fonds pour l&apos;acquisition et l&apos;aménagement de la mosquée
              </p>

              {showProgress && (
                <div className="md:max-w-md">
                  <div className="bg-white rounded-lg p-3 shadow-sm">
                    <div className="flex items-center justify-between text-xs text-green-700 mb-1">
                      <span>{formatAmount(raisedAmount)} collecté</span>
                      <span>{formatPercentage(percentage)}</span>
                    </div>
                    <ProgressBar percentage={percentage} variant="thin" />
                    <div className="text-xs text-green-600 mt-1">
                      Objectif : {formatAmount(totalAmount)}
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="flex-shrink-0">
              <Link
                href="/projet-xhamia-nur"
                className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors inline-flex items-center w-full justify-center md:w-auto"
              >
                Soutenir le projet
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    )
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
              Un projet essentiel de{' '}
              <strong>{formatAmount(totalAmount)}</strong> pour établir
              l&apos;ACMSI et développer un centre islamique moderne à
              Saint-Imier.
            </p>

            {showProgress && (
              <div className="max-w-2xl mx-auto mb-8">
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <TrendUp className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-medium text-green-700">
                        Progression
                      </span>
                    </div>
                    <span className="text-sm font-medium text-green-700">
                      {formatPercentage(percentage)}
                    </span>
                  </div>
                  <ProgressBar percentage={percentage} variant="medium" />
                  <div className="flex justify-between items-center text-green-800 text-sm mt-2">
                    <span className="font-semibold">
                      {formatAmount(raisedAmount)} collecté
                    </span>
                    <span>Objectif : {formatAmount(totalAmount)}</span>
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
    <section className="py-12 bg-gradient-to-r from-green-50 to-green-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Mosque className="w-8 h-8 text-green-600" weight="duotone" />
            </div>
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-green-900 mb-3">
              Projet Xhamia Nur
            </h2>
            <p className="text-lg text-green-800 mb-4">
              L&apos;ACMSI doit racheter la mosquée Nur pour établir
              l&apos;association sur des bases islamiques solides et sans riba.
              Ce projet urgent de <strong>{formatAmount(totalAmount)}</strong>{' '}
              permettra à notre communauté d&apos;avoir un lieu de culte pérenne
              dans ses murs.
            </p>

            {showProgress && (
              <div className="bg-white rounded-lg p-4 mb-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <TrendUp className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-medium text-green-700">
                      Progression
                    </span>
                  </div>
                  <span className="text-sm font-bold text-green-700">
                    {formatPercentage(percentage)}
                  </span>
                </div>
                <ProgressBar percentage={percentage} variant="medium" />
                <div className="flex justify-between items-center text-green-800 text-sm mt-1">
                  <span className="font-semibold">
                    {formatAmount(raisedAmount)} collecté
                  </span>
                  <span>Objectif : {formatAmount(totalAmount)}</span>
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
