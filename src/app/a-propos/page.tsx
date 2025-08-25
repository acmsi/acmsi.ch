import type { Metadata } from 'next'
import Link from 'next/link'

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
                <svg
                  className="w-8 h-8 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v18m9-9H3"
                  />
                </svg>
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
                <svg
                  className="w-8 h-8 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
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
                <svg
                  className="w-8 h-8 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
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
                <svg
                  className="w-8 h-8 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
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
