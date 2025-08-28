import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Mosque,
  ChalkboardTeacher,
  UsersFour,
  HandHeart,
  CreditCard,
  Money,
  ArrowRight,
  Users,
  Shield,
} from '@phosphor-icons/react/dist/ssr'
import { Donation } from '@/components/icons'
import ProjectBanner from '@/components/project-banner'
import CardKeyPoint from '@/components/card-key-point'
import { getProjectSummary } from '@/lib/content'
import { formatAmount } from '@/lib/format'

export const metadata: Metadata = {
  title: 'Donation - ACMSI',
  description:
    "Soutenez l'Association Culturelle Musulmane de Saint-Imier et la mosquée Nur par vos dons.",
}

export default async function DonationPage() {
  const projectData = await getProjectSummary()
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
              Votre générosité nous aide à maintenir et développer les services
              de la mosquée Nur pour toute la communauté
            </p>
          </div>
        </div>
      </section>

      {/* Projet Xhamia Nur Banner */}
      <ProjectBanner
        variant="compact"
        showProgress={true}
        totalAmount={projectData?.total_objectif || 1185500}
        raisedAmount={projectData?.total_leve || 0}
        percentage={projectData?.pourcentage_global || 0}
      />

      {/* Importance Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              L&rsquo;importance de votre soutien
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 *:bg-gray-50 *:p-6 *:rounded-lg">
            <CardKeyPoint
              icon={<Mosque className="w-8 h-8" weight="duotone" />}
              title="Entretien de la mosquée"
              description="Maintenance des locaux, chauffage, électricité et tous les frais nécessaires au bon fonctionnement de notre lieu de culte."
              iconBgColor="bg-gray-100"
              iconColor="text-gray-600"
            />

            <CardKeyPoint
              icon={<ChalkboardTeacher className="w-8 h-8" weight="duotone" />}
              title="Programmes éducatifs"
              description="Financement des cours d'arabe, d'éducation islamique et des matériaux pédagogiques pour nos enfants et adultes."
              iconBgColor="bg-gray-100"
              iconColor="text-gray-600"
            />

            <CardKeyPoint
              icon={<UsersFour className="w-8 h-8" weight="duotone" />}
              title="Activités communautaires"
              description="Organisation d'événements, conférences et activités qui renforcent les liens au sein de notre communauté."
              iconBgColor="bg-gray-100"
              iconColor="text-gray-600"
            />

            <CardKeyPoint
              icon={<HandHeart className="w-8 h-8" weight="duotone" />}
              title="Actions solidaires"
              description="Soutien aux familles dans le besoin et participation aux œuvres caritatives locales et internationales."
              iconBgColor="bg-gray-100"
              iconColor="text-gray-600"
            />
          </div>
        </div>
      </section>

      {/* Adhesion Membres */}
      <section className="py-16 bg-teal-50 border-t-4 border-teal-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-teal-600" weight="duotone" />
            </div>
            <h2 className="text-3xl font-bold mb-4 text-teal-900">
              Adhésion à l&apos;ACMSI
            </h2>
            <p className="text-lg text-teal-800">
              Devenez membre officiel de notre association
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-8">
            <div className="flex items-start space-x-6">
              <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Shield className="w-8 h-8 text-teal-600" weight="duotone" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-3 text-teal-900">
                  Cotisation annuelle : {formatAmount(360)} minimum par foyer
                </h3>
                <p className="text-gray-700 mb-4">
                  L&apos;adhésion à l&apos;ACMSI vous permet de participer
                  pleinement à la vie de notre association et de bénéficier de
                  tous nos services communautaires.
                </p>
                <div className="bg-teal-50 p-4 rounded-lg">
                  <p className="text-sm text-teal-800">
                    <strong>Avantages inclus :</strong> Participation aux
                    décisions de l&apos;association, accès prioritaire aux
                    événements, et services communautaires dédiés aux membres.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-6">
            <Link
              href="/contact"
              className="inline-flex items-center bg-teal-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-teal-700 transition-colors"
            >
              Devenir membre
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Donation Methods */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Comment faire un don</h2>
            <p className="text-lg">
              Plusieurs moyens s&apos;offrent à vous pour soutenir notre
              association
            </p>
          </div>

          <div className="space-y-8">
            {/* Bank Transfer */}
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  <CreditCard
                    className="w-8 h-8 text-gray-600"
                    weight="duotone"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-3">
                    Virement bancaire
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Effectuez un virement sur le compte de l&rsquo;ACMSI
                  </p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600 mb-2">
                      Coordonnées bancaires :
                    </p>
                    <div className="space-y-1 text-gray-900">
                      <p>
                        <strong>Bénéficiaire :</strong> Association Culturelle
                        Musulmane de Saint-Imier
                      </p>
                      <p>
                        <strong>IBAN :</strong> CH97 0079 0042 4236 1827 8
                      </p>
                      <p>
                        <strong>Adresse :</strong> Rue de la Clef 45, 2610
                        St-Imier
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
                  <Donation
                    className="w-8 h-8 text-gray-600"
                    weight="duotone"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-3">Don en espèces</h3>
                  <p className="text-gray-600 mb-4">
                    Remettez votre don directement à la mosquée lors des prières
                    ou événements
                  </p>
                  <p className="text-sm text-gray-600">
                    Les responsables de la mosquée sont disponibles après les
                    prières du vendredi pour recevoir vos dons et répondre à vos
                    questions.
                  </p>
                </div>
              </div>
            </div>

            {/* Zakat */}
            <div className="bg-white p-8 rounded-lg shadow-sm border-2 border-gray-200">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  <HandHeart
                    className="w-8 h-8 text-gray-600"
                    weight="duotone"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-3">
                    Zakat et Sadaqah
                  </h3>
                  <p className="text-gray-600 mb-4">
                    L&rsquo;ACMSI accepte et redistribue la Zakat selon les
                    préceptes islamiques
                  </p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-700">
                      <strong>Important :</strong> Précisez lors de votre don
                      s&rsquo;il s&rsquo;agit de Zakat afin qu&rsquo;elle soit
                      distribuée conformément aux règles islamiques aux
                      bénéficiaires éligibles de notre communauté.
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
            N&rsquo;hésitez pas à nous contacter pour toute question concernant
            les dons ou pour obtenir un reçu fiscal si nécessaire.
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
          <h2 className="text-3xl font-bold text-white mb-6">
            Qu&rsquo;Allah vous récompense
          </h2>
          <p className="text-xl text-gray-300 mb-4">
            جَزَاكُمُ اللَّهُ خَيْرًا
          </p>
          <p className="text-lg text-gray-300">
            Votre générosité contribue au rayonnement de notre communauté et au
            bien-être spirituel de tous nos fidèles.
          </p>
        </div>
      </section>
    </div>
  )
}
