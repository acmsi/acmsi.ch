import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Mosque,
  ChalkboardTeacher,
  UsersFour,
  HandHeart,
  CreditCard,
  Money,
} from '@phosphor-icons/react/dist/ssr'

export const metadata: Metadata = {
  title: 'Donation - ACMSI',
  description:
    "Soutenez l'Association Culturelle Musulmane de Saint-Imier et la mosquée Nur par vos dons.",
}

export default function DonationPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-3">
              Soutenir notre Mosquée
            </h1>
            <p className="text-xl max-w-3xl mx-auto">
              Votre générosité nous aide à maintenir et développer les services de la mosquée Nur
              pour toute la communauté
            </p>
          </div>
        </div>
      </section>

      {/* Importance Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              L&rsquo;importance de votre soutien
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                <Mosque className="w-6 h-6 text-gray-600" weight="duotone" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Entretien de la mosquée</h3>
              <p>
                Maintenance des locaux, chauffage, électricité et tous les frais nécessaires au bon
                fonctionnement de notre lieu de culte.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                <ChalkboardTeacher className="w-6 h-6 text-gray-600" weight="duotone" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Programmes éducatifs</h3>
              <p>
                Financement des cours d&rsquo;arabe, d&rsquo;éducation islamique et des matériaux
                pédagogiques pour nos enfants et adultes.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                <UsersFour className="w-6 h-6 text-gray-600" weight="duotone" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Activités communautaires</h3>
              <p>
                Organisation d&rsquo;événements, conférences et activités qui renforcent les liens
                au sein de notre communauté.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                <HandHeart className="w-6 h-6 text-gray-600" weight="duotone" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Actions solidaires</h3>
              <p>
                Soutien aux familles dans le besoin et participation aux œuvres caritatives locales
                et internationales.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Donation Methods */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Comment faire un don</h2>
            <p className="text-lg">
              Plusieurs moyens s&rsquo;offrent à vous pour soutenir notre association
            </p>
          </div>

          <div className="space-y-8">
            {/* Bank Transfer */}
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  <CreditCard className="w-6 h-6 text-gray-600" weight="duotone" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-3">Virement bancaire</h3>
                  <p className="text-gray-600 mb-4">
                    Effectuez un virement sur le compte de l&rsquo;ACMSI
                  </p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 mb-2">Coordonnées bancaires :</p>
                    <div className="space-y-1 text-gray-900">
                      <p>
                        <strong>Bénéficiaire :</strong> Association Culturelle Musulmane de
                        Saint-Imier
                      </p>
                      <p>
                        <strong>IBAN :</strong> [À compléter]
                      </p>
                      <p>
                        <strong>BIC :</strong> [À compléter]
                      </p>
                      <p>
                        <strong>Banque :</strong> [À compléter]
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Cash Donation */}
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Money className="w-6 h-6 text-gray-600" weight="duotone" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-3">Don en espèces</h3>
                  <p className="text-gray-600 mb-4">
                    Remettez votre don directement à la mosquée lors des prières ou événements
                  </p>
                  <p className="text-sm text-gray-600">
                    Les responsables de la mosquée sont disponibles après les prières du vendredi
                    pour recevoir vos dons et répondre à vos questions.
                  </p>
                </div>
              </div>
            </div>

            {/* Zakat */}
            <div className="bg-white p-8 rounded-lg shadow-sm border-2 border-gray-200">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  <HandHeart className="w-6 h-6 text-gray-600" weight="duotone" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-3">Zakat et Sadaqah</h3>
                  <p className="text-gray-600 mb-4">
                    L&rsquo;ACMSI accepte et redistribue la Zakat selon les préceptes islamiques
                  </p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-700">
                      <strong>Important :</strong> Précisez lors de votre don s&rsquo;il
                      s&rsquo;agit de Zakat afin qu&rsquo;elle soit distribuée conformément aux
                      règles islamiques aux bénéficiaires éligibles de notre communauté.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact for Donations */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Questions sur les dons ?</h2>
          <p className="text-lg mb-8">
            N&rsquo;hésitez pas à nous contacter pour toute question concernant les dons ou pour
            obtenir un reçu fiscal si nécessaire.
          </p>
          <Link
            href="/contact"
            className="bg-gray-900 text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors inline-block"
          >
            Nous contacter
          </Link>
        </div>
      </section>

      {/* Gratitude Section */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Qu&rsquo;Allah vous récompense</h2>
          <p className="text-xl text-gray-300 mb-4">جَزَاكُمُ اللَّهُ خَيْرًا</p>
          <p className="text-lg text-gray-300">
            Votre générosité contribue au rayonnement de notre communauté et au bien-être spirituel
            de tous nos fidèles.
          </p>
        </div>
      </section>
    </div>
  )
}
