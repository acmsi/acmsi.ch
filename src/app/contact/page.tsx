import type { Metadata } from 'next'
import {
  MapPin,
  Envelope,
  Phone,
  WhatsappLogo,
  CarSimple,
  Heart,
  LetterCircleP,
} from '@phosphor-icons/react/dist/ssr'
import MosqueLocationMap from '@/components/mosque-location-map'
import ProjectBanner from '@/components/project-banner'
import { getProjectSummary } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Contact - ACMSI',
  description:
    "Contactez l'Association Culturelle Musulmane de Saint-Imier. Adresse, horaires et informations pratiques.",
}

export default async function ContactPage() {
  const projectData = await getProjectSummary()

  return (
    <div>
      {/* Hero Section */}
      <section className="py-16 lg:py-24 bg-linear-to-b from-white/20 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-3">
              Nous Contacter
            </h1>
            <p className="text-xl max-w-3xl mx-auto">
              Nous sommes là pour vous accueillir et répondre à toutes vos
              questions
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="pb-9 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Details */}
            <div>
              <h2 className="text-3xl font-bold mb-6">
                Informations de Contact
              </h2>

              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <MapPin
                      className="w-8 h-8 text-gray-600"
                      weight="duotone"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold leading-tight">
                      Adresse
                    </h3>
                    <p>
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
                    <Envelope
                      className="w-8 h-8 text-gray-600"
                      weight="duotone"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold leading-tight">
                      Email
                    </h3>
                    <p>
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
                    <Phone className="w-8 h-8 text-gray-600" weight="duotone" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold leading-tight">
                      Téléphone
                    </h3>
                    <p>
                      <a
                        href="tel:+41799601790"
                        className="text-teal-600 hover:text-teal-700"
                      >
                        079 960 17 90
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <WhatsappLogo
                      className="w-8 h-8 text-gray-600"
                      weight="duotone"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold leading-tight">
                      WhatsApp Communauté
                    </h3>
                    <p className="mb-2">
                      Rejoignez notre communauté sur WhatsApp pour rester
                      informé des activités de la mosquée
                    </p>
                    <a
                      href="https://chat.whatsapp.com/FsRYOthycLQLCmekiojmQ2"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-teal-600 hover:text-teal-700 font-medium"
                    >
                      Rejoindre la communauté →
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Prayer Times */}
            <div>
              <h2 className="text-3xl font-bold mb-6">Horaires des Prières</h2>

              {/* Desktop/Tablet iframe */}
              <div className="w-full mb-6 hidden md:block">
                <iframe
                  src="//mawaqit.net/en/w/mosquee-nur-2610-saint-imier-switzerland?showOnly5PrayerTimes=0"
                  frameBorder="0"
                  scrolling="no"
                  className="widget w-full rounded-lg aspect-[510/250] min-h-[250px]"
                  title="Horaires des prières Mosquée Nur"
                />
              </div>

              {/* Mobile iframe */}
              <div className="w-full mb-6 block md:hidden">
                <iframe
                  src="//mawaqit.net/en/m/mosquee-nur-2610-saint-imier-switzerland?showNotification=0&showSearchButton=0&showFooter=0&showFlashMessage=0&view=mobile"
                  frameBorder="0"
                  scrolling="no"
                  className="mobile w-full rounded-lg min-h-[500px]"
                  title="Horaires des prières Mosquée Nur"
                />
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h4 className="font-semibold mb-2">
                  Jumma – Prière du Vendredi
                </h4>
                <dl className="space-y-2">
                  <div className="flex justify-between items-center">
                    <dt>Khutbah</dt>
                    <dd>12:15</dd>
                  </div>
                  <div className="flex justify-between items-center">
                    <dt>Prière</dt>
                    <dd>12:30</dd>
                  </div>
                </dl>

                <div className="mt-4 p-3 bg-red-50 rounded-lg">
                  <div className="flex items-start">
                    <LetterCircleP className="w-5 h-5 mr-2 text-red-900 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-red-900">
                      <strong>Staionnement Jumma:</strong> Ne pas se garer
                      devant la mosquée, ces places sont réservées aux personnes
                      à mobilité réduite et à l&apos;Imam.{' '}
                      <a
                        href="/contact#parking-info"
                        className="hover:text-red-700 transition-colors underline mt-2 block"
                      >
                        Voir les informations complètes pour les options de
                        parking
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Parking Information Section */}
      <section id="parking-info" className="py-16 bg-gray-900/92 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-9">
            <h2 className="text-3xl font-bold mb-4 text-white">
              Informations de Stationnement
            </h2>
            <p className="text-xl text-gray-300 mb-6">
              Soyons exemplaires dans notre comportement, y compris lors du
              stationnement
            </p>
            <div className="w-16 h-1 bg-teal-500 mx-auto rounded-full"></div>
          </div>

          <div className="bg-white text-gray-900 rounded-lg shadow-lg p-6 sm:p-8">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <CarSimple
                    className="w-6 h-6 text-orange-700"
                    weight="duotone"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 mt-2">
                    Places limitées devant la mosquée
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    Le stationnement devant la mosquée est très limité. Pendant
                    la prière du vendredi (Jumma) et durant le Ramadan, nous
                    demandons à la communauté de ne pas s&apos;y garer car ces
                    places sont{' '}
                    <strong>
                      réservées aux personnes à mobilité réduite, ainsi
                      qu&apos;à l&apos;Imam{' '}
                    </strong>{' '}
                    qui prend sur son emploi du temps chargé pour guider notre
                    communauté.
                  </p>
                  <p className="text-gray-700 my-2">
                    Rappelons que{' '}
                    <strong>
                      l&apos;intention et le comportement sont plus importants
                      que la ponctualité
                    </strong>
                    .
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Heart className="w-6 h-6 text-green-600" weight="duotone" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 mt-2">
                    Exemplarité et courtoisie envers nos voisins
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    Nous encourageons notre communauté à agir de manière
                    exemplaire :{' '}
                    <strong>
                      respecter scrupuleusement les emplacements de
                      stationnement
                    </strong>
                    , ne jamais bloquer les entrées de garage, et faire preuve
                    de{' '}
                    <strong>
                      courtoisie et de bienveillance envers nos voisins
                    </strong>
                    . Notre comportement reflète les valeurs de notre foi. Et
                    plutôt que de payer des contraventions, nous vous invitons à{' '}
                    <a
                      href="/donation"
                      className="text-teal-600 hover:text-teal-700 font-medium"
                    >
                      faire des dons à la mosquée
                    </a>{' '}
                    qui en a bien besoin !
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <LetterCircleP
                    className="w-6 h-6 text-blue-600"
                    weight="duotone"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 mt-2">
                    Options de stationnement
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    Saint-Imier dispose de{' '}
                    <strong>
                      nombreuses places gratuites dans les rues avoisinantes
                    </strong>{' '}
                    de la mosquée.
                  </p>
                  <p className="text-gray-700 my-2">
                    Plusieurs parkings publics a 5min a pied sont disponibles :
                  </p>
                  <ul className="text-gray-700 my-2 ml-4 list-disc">
                    <li>
                      <strong>Parking de la Patinoire</strong>
                    </li>
                    <li>
                      <strong>Parking en face de la Migros</strong>
                    </li>
                    <li>
                      <strong>Parking au centre de la commune</strong>
                    </li>
                  </ul>
                  <p className="text-gray-700 my-2">
                    Ces options sont particulièrement recommandées lors
                    d&apos;événements importants comme les prières du vendredi
                    ou durant le Ramadan. Consultez la carte ci-dessous pour
                    visualiser leurs emplacements.
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
          <div className="text-center mb-9">
            <h2 className="text-3xl font-bold mb-4">Nous Localiser</h2>
            <p className="text-lg">
              Trouvez facilement la mosquée Nur à Saint-Imier
            </p>
          </div>

          <div>
            <MosqueLocationMap />
            <div className="mt-2 font-alt text-center">
              <a
                href="https://maps.app.goo.gl/3n9PYEvDBE7LHkpT9"
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg font-medium text-teal-600 hover:text-teal-700 transition-colors"
              >
                <MapPin
                  className="w-5 h-5 mr-2 inline-block"
                  weight="duotone"
                />
                Mosquée Nur - Rue de la Clef 45, 2610 Saint-Imier, Suisse
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Project Banner */}
      <ProjectBanner
        variant="thin"
        showProgress={true}
        totalAmount={projectData?.total_objectif || 630000}
        raisedAmount={projectData?.total_leve || 0}
        percentage={projectData?.pourcentage_global || 0}
      />
    </div>
  )
}
