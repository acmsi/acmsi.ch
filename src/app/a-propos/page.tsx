import type { Metadata } from 'next'
import Link from 'next/link'
import { UsersThree, BookOpen, Heart } from '@phosphor-icons/react/dist/ssr'
import { Ruku } from '@/components/icons'

export const metadata: Metadata = {
  title: 'À propos - ACMSI',
  description:
    "Découvrez l'histoire, la mission et les valeurs de l'Association Culturelle Musulmane de Saint-Imier et de la mosquée Nur.",
}

export default function AProposPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              À propos de la Mosquée Nur
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Découvrez l&rsquo;histoire, la mission et les valeurs de l&rsquo;Association
              Culturelle Musulmane de Saint-Imier
            </p>
          </div>
        </div>
      </section>

      {/* Histoire Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">Notre Histoire</h2>
            <div className="text-lg text-gray-600 space-y-6">
              <p>
                La mosquée Nur a été établie pour répondre aux besoins spirituels croissants de la
                communauté musulmane de Saint-Imier et des environs. Située au cœur du Jura bernois,
                elle représente un lieu de rassemblement, de prière et d&rsquo;apprentissage pour
                tous les musulmans de la région.
              </p>
              <p>
                Le nom &ldquo;Nur&rdquo; signifie &ldquo;lumière&rdquo; en arabe, symbolisant notre
                aspiration à être une source de guidance spirituelle et de paix dans notre
                communauté locale.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">Notre Mission</h2>
            <div className="text-lg text-gray-600 space-y-6">
              <p>
                L&rsquo;Association Culturelle Musulmane de Saint-Imier (ACMSI) a pour mission de
                faciliter la pratique religieuse et de promouvoir les valeurs islamiques d&rsquo;
                <strong>Ihsan</strong> - l&rsquo;excellence dans l&rsquo;adoration et la conduite.
              </p>
              <p>
                Nous nous efforçons de créer un environnement accueillant où chaque membre de notre
                communauté peut grandir spirituellement, socialement et intellectuellement, tout en
                contribuant positivement à la société suisse.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Valeurs Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">Nos Valeurs</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Ruku className="w-8 h-8 text-gray-600" weight="duotone" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Ihsan - L&rsquo;Excellence
              </h3>
              <p className="text-gray-600">
                L&rsquo;<strong>Ihsan</strong> est au cœur de tout ce que nous faisons. C&rsquo;est
                l&rsquo;excellence dans l&rsquo;adoration d&rsquo;Allah et dans nos relations avec
                autrui, comme si nous Le voyions, car même si nous ne Le voyons pas, Lui nous voit.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <UsersThree className="w-8 h-8 text-gray-600" weight="duotone" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Communauté</h3>
              <p className="text-gray-600">
                Nous valorisons l&rsquo;unité, la solidarité et l&rsquo;entraide au sein de notre
                communauté, créant des liens forts basés sur la fraternité islamique et le respect
                mutuel.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-gray-600" weight="duotone" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Éducation</h3>
              <p className="text-gray-600">
                L&rsquo;apprentissage continu du Coran, de la langue arabe et des sciences
                islamiques est essentiel pour le développement spirituel et intellectuel de notre
                communauté.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-gray-600" weight="duotone" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Accueil</h3>
              <p className="text-gray-600">
                Notre mosquée est ouverte à tous, musulmans et non-musulmans, dans un esprit de
                dialogue, de compréhension mutuelle et de respect des différences.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Venez nous rencontrer</h2>
          <p className="text-xl text-gray-300 mb-8">
            Nous serions ravis de vous accueillir à la mosquée Nur pour découvrir notre communauté
          </p>
          <Link
            href="/contact"
            className="bg-white text-gray-900 px-8 py-4 rounded-lg font-medium hover:bg-gray-100 transition-colors inline-block"
          >
            Nous contacter
          </Link>
        </div>
      </section>
    </div>
  )
}
