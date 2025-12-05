import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Mosque,
  ArrowRight,
  Calendar,
  Bank,
  DeviceMobile,
  Money,
  Target,
  TrendUp,
} from '@phosphor-icons/react/dist/ssr'
import { getProject } from '@/lib/content'
import Ayah from '@/components/ayah'
import ProgressBar from '@/components/progress-bar'
import BankDetails from '@/components/bank-details'
import SectionCard from '@/components/section-card'
import { formatAmount, formatPercentage } from '@/lib/format'

export const metadata: Metadata = {
  title: 'Projet Xhamia Nur - Acquisition de la Mosquée - ACMSI',
  description:
    "Aidez l'ACMSI à racheter la mosquée Nur pour 630'000 CHF. Un projet urgent pour établir notre association sur des bases islamiques solides et sans riba.",
}

export default async function ProjetXhamiaNurPage() {
  // Récupérer les données du projet d'acquisition depuis Decap CMS
  const acquisitionProject = await getProject('acquisition-mosquee-nur')

  // Données par défaut si le projet n'est pas trouvé dans le CMS
  const objectifTotal = acquisitionProject?.objectif || 630000
  const montantCollecte = acquisitionProject?.montant_leve || 330000
  const pourcentageCollecte = (montantCollecte / objectifTotal) * 100 || 52.4
  const derniereMaj =
    acquisitionProject?.derniere_maj || new Date().toISOString()

  return (
    <div>
      {/* Hero Section - Urgent */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-green-100/80 to-green-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <Mosque className="w-16 h-16 text-green-600" weight="duotone" />
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold mb-3 text-green-900">
              Projet Xhamia Nur
            </h1>
            <p className="text-xl lg:text-2xl max-w-4xl mx-auto mb-8 text-green-800">
              Un projet urgent de <strong>{formatAmount(objectifTotal)}</strong>{' '}
              pour racheter la mosquée Nur et établir l&rsquo;ACMSI sur des
              bases islamiques solides, <strong>sans riba</strong>.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="#faire-un-don"
                className="bg-green-600 text-white px-8 py-4 rounded-lg font-medium text-lg hover:bg-green-700 transition-colors inline-flex items-center justify-center"
              >
                🤲 Faire un don maintenant
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <Link
                href="#contexte"
                className="bg-white text-green-600 px-8 py-4 rounded-lg font-medium text-lg border-2 border-green-600 hover:bg-green-50 transition-colors"
              >
                Comprendre la situation
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Progress Section */}
      <section className="py-12 bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2">
              Progression de la collecte
            </h2>
            <p className="text-gray-600">
              Chaque contribution nous rapproche de l&apos;acquisition
            </p>
          </div>

          <ProgressBar percentage={pourcentageCollecte} variant="thick" />

          <div className="flex flex-wrap gap-1 justify-between items-center sm:text-lg my-2">
            <span className="flex-1 min-w-0 max-w-fit font-semibold text-green-600">
              {formatAmount(montantCollecte)} collecté
            </span>
            <span className="flex-1 min-w-0 max-w-fit text-right text-gray-600">
              Objectif : {formatAmount(objectifTotal)}
            </span>
          </div>

          <div className="flex flex-wrap gap-1 justify-between items-center text-sm text-gray-500">
            <span>
              {formatPercentage(pourcentageCollecte)} de l&apos;objectif atteint
            </span>
            <span className="flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              Mis à jour le {new Date(derniereMaj).toLocaleDateString('fr-CH')}
            </span>
          </div>
        </div>
      </section>

      {/* La Situation */}
      <section id="contexte" className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">La Situation Actuelle</h2>
            <div className="w-16 h-1 bg-green-500 mx-auto rounded-full"></div>
          </div>

          <div className="prose prose-lg mx-auto">
            <div className="bg-amber-50 border-l-4 border-amber-400 p-6 mb-8">
              <div className="flex">
                <div className="ml-3">
                  <h3 className="text-lg font-medium text-amber-800 mb-2">
                    ⚠️ Situation urgente
                  </h3>
                  <p className="text-amber-700">
                    La mosquée Nur a été acquise par des membres généreux à
                    titre privé en 2023 pour sécuriser ce lieu essentiel.{' '}
                    <strong>
                      Malheureusement, cet achat nécessite actuellement un
                      emprunt bancaire avec intérêts (riba)
                    </strong>
                    .
                  </p>
                </div>
              </div>
            </div>

            <p className="text-xl text-gray-700 mb-6">
              <strong>
                Qu&apos;Allah récompense ces membres exceptionnels
              </strong>{' '}
              qui ont pris cette initiative courageuse pour préserver notre lieu
              de culte ! Grâce à leur geste, la mosquée Nur fonctionne
              aujourd&apos;hui et sert notre communauté.
            </p>

            <p className="text-lg text-gray-700 mb-6">
              Aujourd&apos;hui, l&apos;ACMSI doit{' '}
              <strong>
                racheter la mosquée pour {formatAmount(objectifTotal)}
              </strong>{' '}
              afin d&apos;établir l&apos;association sur des bases islamiques
              solides et d&apos;éliminer définitivement la riba de cette
              acquisition.
            </p>

            <div className="not-prose bg-green-50 border border-green-200 rounded-lg p-6">
              <div className="flex items-start space-x-3">
                <Target
                  className="w-8 h-8 text-green-800 flex-shrink-0 mt-1"
                  weight="duotone"
                />
                <div>
                  <h3 className="text-lg font-semibold text-green-900 my-2">
                    Objectif de cette collecte
                  </h3>
                  <ul className="list-disc list-inside text-green-800 space-y-2">
                    <li>
                      Racheter la mosquée Nur par l&apos;ACMSI (
                      {formatAmount(objectifTotal)})
                    </li>
                    <li>Éliminer la riba de cette acquisition</li>
                    <li>
                      Établir l&apos;association sur ses propres bases
                      islamiques
                    </li>
                    <li>Garantir la pérennité du lieu de culte</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <Ayah
              arabicText="مَنْ بَنَى مَسْجِدًا يَبْتَغِي بِهِ وَجْهَ اللَّهِ بَنَى اللَّهُ لَهُ مِثْلَهُ فِي الْجَنَّةِ"
              translationText="Celui qui construit une mosquée pour Allah, Allah lui construit son équivalent au Paradis."
              reference="Sahih Muslim 533"
              className="text-gray-700"
            />
          </div>
        </div>
      </section>

      {/* Comment donner */}
      <section id="faire-un-don" className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Comment contribuer au projet ?
            </h2>
            <p className="text-lg text-gray-600">
              Plusieurs moyens s&apos;offrent à vous pour soutenir ce projet
              urgent
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Via RaiseNow */}
            <SectionCard
              icon={
                <DeviceMobile
                  className="w-8 h-8 text-green-600"
                  weight="duotone"
                />
              }
              title="Via RaiseNow"
              id="don-en-ligne"
              iconBgColor="bg-green-100"
            >
              <p className="text-gray-600 mb-3">
                Faites un don sécurisé de n&rsquo;importe quel montant grâce à
                RaiseNow.
              </p>
              <a
                href="https://pay.raisenow.io/fnsym"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors"
              >
                Faire un don en ligne →
              </a>
            </SectionCard>

            {/* Don à la mosquée */}
            <SectionCard
              icon={
                <Money className="w-8 h-8 text-green-600" weight="duotone" />
              }
              title="À la mosquée"
              iconBgColor="bg-green-100"
            >
              <p className="text-gray-600 mb-3">
                Remettez votre don directement lors des prières ou
                contactez-nous au :
              </p>
              <a
                href="tel:+41792763500"
                className="font-semibold text-green-600 hover:text-green-700 transition-colors"
              >
                +41 (0) 79 276 35 00
              </a>
            </SectionCard>

            {/* IBAN - Prend toute la largeur */}
            <SectionCard
              icon={
                <Bank className="w-8 h-8 text-green-600" weight="duotone" />
              }
              title="Virement bancaire"
              id="coordonnees-bancaires"
              iconBgColor="bg-green-100"
              className="md:col-span-2"
            >
              <BankDetails message="Projet Xhamia Nur" />
              <div className="bg-amber-50 border-l-4 border-amber-500 p-3 mt-1">
                <p className="text-sm font-semibold text-amber-900">
                  ⚠️ Important : Précisez &quot;Projet Xhamia Nur&quot; dans la
                  communication
                </p>
              </div>
            </SectionCard>
          </div>

          {/* Transparence */}
          <div className="mt-12 bg-white rounded-lg shadow-sm p-6">
            <div className="text-center mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <TrendUp className="w-8 h-8 text-green-600" weight="duotone" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Transparence financière
              </h3>
              <p className="text-gray-600">
                Nous nous engageons à une totale transparence sur
                l&apos;utilisation des fonds collectés pour l&apos;acquisition.
              </p>
            </div>

            <div className="bg-green-50 rounded-lg p-4">
              <h4 className="font-semibold text-green-900 mb-2 text-sm">
                Utilisation des fonds
              </h4>
              <p className="text-base text-green-800">
                100% des dons collectés via cette campagne seront utilisés
                exclusivement pour l&apos;acquisition de la mosquée Nur par
                l&apos;ACMSI. Aucun frais administratif n&apos;est prélevé sur
                ces dons.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Appel final */}
      <section className="py-16 bg-gradient-to-t from-gray-900 to-nur-navy-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xl mb-6">جَزَاكُمُ اللَّهُ خَيْرًا</p>
          <div className="mb-8">
            <Ayah
              arabicText="وَتَعَاوَنُوا عَلَى الْبِرِّ وَالتَّقْوَىٰ ۖ وَلَا تَعَاوَنُوا عَلَى الْإِثْمِ وَالْعُدْوَانِ"
              translationText="Et entraidez-vous dans l'accomplissement des bonnes œuvres et de la piété et ne vous entraidez pas dans le péché et la transgression."
              reference="Sourate 5 Al-Maida, Le Festin - Verset 2"
              verseNumber="2"
              className="opacity-90"
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="#faire-un-don"
              className="bg-green-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
            >
              🤲 Faire un don maintenant
            </Link>
            <Link
              href="/contact"
              className="border-2 text-white border-white px-8 py-3 rounded-lg font-medium hover:bg-white hover:text-gray-900 transition-colors"
            >
              Nous contacter
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
