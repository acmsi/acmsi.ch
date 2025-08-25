import type { Metadata } from 'next'
import MosqueLocationMap from '@/components/mosque-location-map'

export const metadata: Metadata = {
  title: 'Contact - ACMSI',
  description:
    "Contactez l'Association Culturelle Musulmane de Saint-Imier. Adresse, horaires et informations pratiques.",
}

export default function ContactPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Nous Contacter</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Nous sommes là pour vous accueillir et répondre à toutes vos questions
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="pb-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Details */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Informations de Contact</h2>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <svg
                      className="w-6 h-6 text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 leading-tight">Adresse</h3>
                    <p className="text-gray-600">
                      ACMSI – Mosquée Nur
                      <br />
                      Rue de la Clef 45
                      <br />
                      2610 Saint-Imier, Suisse
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <svg
                      className="w-6 h-6 text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 leading-tight">Email</h3>
                    <p className="text-gray-600">
                      <a
                        href="mailto:contact@acmsi.ch"
                        className="text-teal-600 hover:text-teal-700"
                      >
                        contact@acmsi.ch
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <svg
                      className="w-6 h-6 text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 leading-tight">Téléphone</h3>
                    <p className="text-gray-600">
                      <a href="tel:+41792763500" className="text-teal-600 hover:text-teal-700">
                        079 276 35 00
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <svg
                      className="w-6 h-6 text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 leading-tight">
                      WhatsApp Communauté
                    </h3>
                    <p className="text-gray-600">
                      Rejoignez notre groupe WhatsApp communautaire
                      <br />
                      <span className="text-sm text-gray-500">
                        Contactez-nous pour obtenir le lien d&rsquo;invitation
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Prayer Times */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Horaires des Prières</h2>

              <div className="bg-gray-50 rounded-lg p-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="font-medium text-gray-900">Fajr</span>
                    <span className="text-gray-600">Variable selon la saison</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="font-medium text-gray-900">Dhuhr</span>
                    <span className="text-gray-600">Variable selon la saison</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="font-medium text-gray-900">Asr</span>
                    <span className="text-gray-600">Variable selon la saison</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-200">
                    <span className="font-medium text-gray-900">Maghrib</span>
                    <span className="text-gray-600">Variable selon la saison</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="font-medium text-gray-900">Isha</span>
                    <span className="text-gray-600">Variable selon la saison</span>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-2">Prière du Vendredi</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Khutbah</span>
                      <span className="text-gray-600">À confirmer</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Prière</span>
                      <span className="text-gray-600">À confirmer</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-teal-50 rounded-lg">
                  <p className="text-sm text-teal-800">
                    <strong>Note:</strong> Les horaires des prières varient selon les saisons.
                    Contactez-nous pour les horaires actuels ou consultez notre site web.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Parking Information Section */}
      <section id="parking-info" className="py-16 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">Informations de Stationnement</h2>
            <p className="text-xl text-gray-300 mb-6">
              Soyons exemplaires dans notre comportement, y compris lors du stationnement
            </p>
            <div className="w-16 h-1 bg-teal-500 mx-auto rounded-full"></div>
          </div>

          <div className="bg-white text-gray-900 rounded-lg shadow-lg p-8">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg
                    className="w-5 h-5 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Places limitées devant la mosquée
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    Le stationnement devant la mosquée est très limité. Pendant la prière du
                    vendredi (Jumma) et durant le Ramadan, nous demandons à la communauté de ne pas
                    s'y garer car ces places sont{' '}
                    <strong>réservées aux personnes à mobilité réduite</strong>, aux personnes
                    âgées, ainsi qu'à{' '}
                    <strong>l'Imam qui vient de loin avec un emploi du temps chargé</strong> pour
                    guider notre communauté. Rappelons que{' '}
                    <strong>
                      l'intention et le comportement sont plus importants que la ponctualité
                    </strong>
                    .
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg
                    className="w-5 h-5 text-gray-600"
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
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Exemplarité et courtoisie envers nos voisins
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    Nous encourageons vivement notre communauté à agir de manière exemplaire :{' '}
                    <strong>respecter scrupuleusement les emplacements de stationnement</strong>, ne
                    jamais bloquer les entrées de garage, et faire preuve de{' '}
                    <strong>courtoisie et de bienveillance envers nos voisins et riverains</strong>.
                    Notre comportement reflète les valeurs de notre foi. Et plutôt que de payer des
                    contraventions, nous vous invitons à{' '}
                    <a href="/donation" className="text-teal-600 hover:text-teal-700 font-medium">
                      faire des dons à la mosquée
                    </a>{' '}
                    qui en a bien besoin !
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <svg
                    className="w-5 h-5 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Options de stationnement
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    Saint-Imier dispose de{' '}
                    <strong>nombreuses places gratuites dans les rues avoisinantes</strong> de la
                    mosquée. Plusieurs parkings publics a 5min a pied sont disponibles :
                    <br />• <strong>Parking de la Patinoire</strong>
                    <br />• <strong>Parking en face de la Migros</strong>
                    <br />• <strong>Parking au centre de la commune</strong>
                    <br />
                    Ces options sont particulièrement recommandées lors d'événements importants
                    comme les prières du vendredi ou durant le Ramadan.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Nous Localiser</h2>
            <p className="text-lg text-gray-600">Trouvez facilement la mosquée Nur à Saint-Imier</p>
          </div>

          <div>
            <MosqueLocationMap />
            <div className="mt-2 font-alt text-center">
              <a
                href="https://maps.app.goo.gl/3n9PYEvDBE7LHkpT9"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-lg font-medium text-teal-600 hover:text-teal-700 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                Mosquée Nur - Rue de la Clef 45, 2610 Saint-Imier, Suisse
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
