import type { Metadata } from 'next'
import type { Route } from 'next'
import Link from 'next/link'
import {
  Mosque,
  Target,
  BookOpenText,
  Books,
  Coffee,
  Joystick,
  House,
  Money,
  DeviceMobile,
  PaypalLogo,
  Bank,
  ArrowRight,
  Calendar,
  TrendUp,
  Wrench,
  Monitor,
  Briefcase,
  Tree,
} from '@phosphor-icons/react/dist/ssr'
import { Salah } from '@/components/icons'
import {
  getProjectSummary,
  getActiveProjects,
  getCompletedProjects,
} from '@/lib/content'
import Ayah from '@/components/ayah'
import ProgressBar from '@/components/progress-bar'
import ProjectCard from '@/components/project-card'
import CardKeyPoint from '@/components/card-key-point'
import { formatAmount, formatPercentage } from '@/lib/format'

export const metadata: Metadata = {
  title: 'Projet Xhamia Nur - ACMSI',
  description:
    "Soutenez le Projet Xhamia Nur pour établir l'ACMSI et développer un centre islamique complet à Saint-Imier. Contribuez à ce projet vital pour notre communauté.",
}

export default async function ProjetXhamiaNurPage() {
  const projectData = await getProjectSummary()

  // Fallback data if no project data is found
  const objectifTotal = projectData?.total_objectif || 1185500
  const montantCollecte = projectData?.total_leve || 0
  const pourcentageCollecte = projectData?.pourcentage_global || 0
  const derniereMaj =
    projectData?.derniere_maj_globale || new Date().toISOString()

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
              Un projet essentiel de{' '}
              <strong>{formatAmount(objectifTotal)}</strong> pour établir
              l&rsquo;ACMSI sur des bases solides, développer un centre
              islamique complet et pérenne dans ses murs, dans le respect de nos
              valeurs et sans riba.
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
                href="#details-projet"
                className="bg-white text-green-600 px-8 py-4 rounded-lg font-medium text-lg border-2 border-green-600 hover:bg-green-50 transition-colors"
              >
                En savoir plus
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
              Chaque contribution nous rapproche de notre objectif
            </p>
          </div>

          <ProgressBar percentage={pourcentageCollecte} variant="thick" />

          <div className="flex justify-between items-center text-lg my-2">
            <span className="font-semibold text-green-600">
              {formatAmount(montantCollecte)} collecté
            </span>
            <span className="text-gray-600">
              Objectif : {formatAmount(objectifTotal)}
            </span>
          </div>

          <div className="flex justify-between items-center text-sm text-gray-500">
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
      <section id="details-projet" className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Le Projet Xhamia Nur</h2>
            <div className="w-16 h-1 bg-green-500 mx-auto rounded-full"></div>
          </div>

          <div className="prose prose-lg mx-auto">
            <p className="text-xl text-gray-700 mb-6">
              Le Projet Xhamia Nur représente une étape fondamentale pour notre
              communauté. La mosquée Nur a été acquise par plusieurs membres
              généreux à titre privé.{' '}
              <strong>
                Qu&apos;Allah les récompense pour ce geste exemplaire !
              </strong>
            </p>
            <p className="text-lg text-gray-700 mb-6">
              Ce projet ambitieux vise à{' '}
              <strong>
                établir l&apos;ACMSI sur des bases solides et islamiques
              </strong>
              , à développer un{' '}
              <strong>centre islamique de 540m², pérenne, dans ses murs</strong>
              , et à garantir un avenir <strong>sans riba</strong> pour notre
              communauté.
            </p>
            <p className="text-lg text-gray-700 mb-6">
              Le Projet Xhamia Nur transformera notre lieu de culte en un
              véritable centre culturel et religieux, au service de toute la
              communauté musulmane et au-delà.
            </p>
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

      {/* Le Projet */}
      <section className="py-16 bg-linear-to-b from-gray-50/90 via-gray-50/60 to-gray-50/90">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Un projet complet de 540m²
            </h2>
            <p className="text-lg text-gray-600">
              Un centre islamique fonctionnel pour toute la communauté
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 *:bg-white *:p-6 *:rounded-lg *:shadow-sm">
            <CardKeyPoint
              icon={<Salah className="w-8 h-8" weight="duotone" />}
              title="Salle de prière mixte"
              description="Un espace de prière accueillant pour hommes et femmes, respectant les traditions islamiques."
            />

            <CardKeyPoint
              icon={<BookOpenText className="w-8 h-8" weight="duotone" />}
              title="Salle de classe (15 élèves)"
              description="Un espace dédié à l'apprentissage de l'arabe et de l'éducation islamique pour nos enfants."
            />

            <CardKeyPoint
              icon={<Books className="w-8 h-8" weight="duotone" />}
              title="Bibliothèque"
              description="Une collection de livres religieux et éducatifs accessible à toute la communauté."
            />

            <CardKeyPoint
              icon={<House className="w-8 h-8" weight="duotone" />}
              title="Studio de Function"
              description="Studio pour l'hébergement ponctuel d'invités religieux."
            />

            <CardKeyPoint
              icon={<Coffee className="w-8 h-8" weight="duotone" />}
              title="Cafétéria"
              description="Un espace convivial pour les repas communautaires et les événements spéciaux."
            />

            <CardKeyPoint
              icon={<Joystick className="w-8 h-8" weight="duotone" />}
              title="Salle jeux et sport enfants"
              description="Un espace récréatif sûr pour l'épanouissement de nos jeunes."
            />

            <CardKeyPoint
              icon={<Monitor className="w-8 h-8" weight="duotone" />}
              title="Système médiatique"
              description="Équipements audiovisuels modernes pour diffusion, streaming en direct, surveillance et communication numérique."
            />

            <CardKeyPoint
              icon={<Briefcase className="w-8 h-8" weight="duotone" />}
              title="Bureaux"
              description="Espaces de travail dédiés pour l'imam, l'administration et services communautaires, certains disponibles en location."
            />

            <CardKeyPoint
              icon={<Tree className="w-8 h-8" weight="duotone" />}
              title="Extérieur vert"
              description="Espace détente avec aire de pique-nique, arbres fruitiers et zone de jeux extérieure (ping-pong)."
            />
          </div>
        </div>
      </section>

      {/* Comment donner */}
      <section id="faire-un-don" className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Comment contribuer au projet ?
            </h2>
            <p className="text-lg text-gray-600">
              Plusieurs moyens s&apos;offrent à vous pour soutenir ce projet
              vital
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* IBAN */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Bank className="w-8 h-8 text-green-600" weight="duotone" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-3">
                    Virement bancaire (IBAN)
                  </h3>
                  <div className="bg-white p-4 rounded border">
                    <p className="font-mono text-lg font-bold text-green-600 mb-2">
                      CH97 0079 0042 4236 1827 8
                    </p>
                    <p className="text-sm text-gray-600">
                      Association Culturelle Musulmane
                      <br />
                      Rue de la Clef 45, 2610 St-Imier
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Twint */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <DeviceMobile
                    className="w-8 h-8 text-green-600"
                    weight="duotone"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-3">
                    Twint (via RaiseNow)
                  </h3>
                  <p className="text-gray-600 mb-3">
                    Faites un don sécurisé de n&rsquo;importe quel montant via
                    Twint grâce à RaiseNow.
                  </p>
                  <a
                    href="https://pay.raisenow.io/jkyys"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors"
                  >
                    Faire un don via Twint →
                  </a>
                </div>
              </div>
            </div>

            {/* PayPal */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <PaypalLogo
                    className="w-8 h-8 text-green-600"
                    weight="duotone"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-3">PayPal</h3>
                  <p className="text-gray-600 mb-3">
                    Utilisez le QR code PayPal sur notre flyer pour un don
                    rapide et sécurisé.
                  </p>
                  <Link
                    href={'/documents/flyer appel dons mosquée FR.pdf' as Route}
                    target="_blank"
                    className="text-green-600 hover:text-green-700 font-medium"
                  >
                    Voir le QR code PayPal →
                  </Link>
                </div>
              </div>
            </div>

            {/* Don en espèces */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Money className="w-8 h-8 text-green-600" weight="duotone" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-3">À la mosquée</h3>
                  <p className="text-gray-600 mb-3">
                    Remettez votre don directement lors des prières ou
                    contactez-nous au :
                  </p>
                  <p className="font-semibold text-green-600">
                    +41 (0) 79 276 35 00
                  </p>
                </div>
              </div>
            </div>

            {/* Bénévolat et Contributions Matérielles */}
            <div className="bg-gray-50 p-6 rounded-lg md:col-span-2">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Wrench className="w-8 h-8 text-blue-600" weight="duotone" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-3">
                    Bénévolat et contributions matérielles
                  </h3>
                  <p className="text-gray-600 mb-3">
                    Dans le cadre des sous-projets actifs, nous émettons parfois
                    des invitations à bénévolat, et sommes toujours à
                    l&apos;écoute de toute entreprise ou professionnel qualifié.
                  </p>
                  <details className="group">
                    <summary className="cursor-pointer text-blue-600 font-medium hover:text-blue-700 mb-3">
                      Modalités et coordination
                    </summary>
                    <div className="space-y-3 pt-2">
                      <div className="bg-white p-4 rounded-lg">
                        <h4 className="font-semibold text-gray-800 mb-2">
                          Contributions encadrées
                        </h4>
                        <p className="text-sm text-gray-600">
                          Nous privilégions les professionnels qualifiés pour
                          garantir qualité et sécurité. Nous invitons toute
                          personne souhaitant contribuer à contacter et se
                          coordonner au préalable avec l&apos;association.
                        </p>
                      </div>
                      <div className="bg-white p-4 rounded-lg">
                        <h4 className="font-semibold text-gray-800 mb-2">
                          Besoins variables
                        </h4>
                        <p className="text-sm text-gray-600">
                          Les besoins spécifiques évoluent selon
                          l&apos;avancement des sous-projets. Consultez-les
                          régulièrement et contactez-nous pour connaître les
                          besoins du moment.
                        </p>
                      </div>
                      <div className="flex gap-3">
                        <Link
                          href="#sous-projets"
                          className="text-sm bg-blue-600 text-white px-4 py-2 rounded font-medium hover:bg-blue-700 transition-colors"
                        >
                          Voir les besoins par sous-projet
                        </Link>
                        <Link
                          href="/contact"
                          className="text-sm border border-blue-600 text-blue-600 px-4 py-2 rounded font-medium hover:bg-blue-50 transition-colors"
                        >
                          Nous contacter
                        </Link>
                      </div>
                    </div>
                  </details>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Campagne de financement et suivis - Section unifiée */}
      <section id="sous-projets" className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Sous-projets et suivis</h2>
            <p className="text-lg text-gray-600 text-balance">
              L’ACMSI alloue les fonds collectés selon les priorités et la
              réalité du terrain. Suivez l’avancement des différents aspects du
              Projet Xhamia Nur.
            </p>
          </div>

          {/* Projets en cours */}
          {projectData?.sous_projets &&
            getActiveProjects(projectData.sous_projets).length > 0 && (
              <div className="mb-16">
                <h3 className="text-2xl font-bold mb-6 text-center text-green-900">
                  Sous-projets en cours
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {getActiveProjects(projectData.sous_projets).map(
                    sousProjet => (
                      <ProjectCard key={sousProjet.slug} project={sousProjet} />
                    ),
                  )}
                </div>

                {/* CTA pour campagnes selon priorité */}
                {getActiveProjects(projectData.sous_projets).length > 0 && (
                  <div className="text-center my-9">
                    <div className="bg-green-50 rounded-lg p-6">
                      <div className="flex items-center justify-center mb-3">
                        <TrendUp
                          className="w-8 h-8 text-green-600 mr-2"
                          weight="duotone"
                        />
                        <h3 className="text-lg font-semibold text-green-900">
                          Allocation selon les priorités
                        </h3>
                      </div>
                      <p className="text-green-800 mb-4">
                        Vos dons permettent à l’association d’avancer sur tous
                        les aspects du projet selon les besoins réels et les
                        priorités définies.
                      </p>
                      <Link
                        href="#faire-un-don"
                        className="inline-flex items-center bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
                      >
                        Soutenir le projet
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            )}

          {/* Projets terminés - Afficher seulement les 2 derniers */}
          {projectData?.sous_projets &&
            getCompletedProjects(projectData.sous_projets).length > 0 && (
              <div className="mb-12">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-center text-green-900 flex-1">
                    Réalisations accomplies
                  </h3>
                </div>
                <p className="text-center text-gray-600 mb-8 max-w-3xl mx-auto">
                  Ces projets ont été menés à bien grâce à la générosité et à
                  l&apos;engagement de notre communauté.
                  <strong>جَزَاكُمُ اللَّهُ خَيْرًا</strong> - Qu&apos;Allah
                  récompense tous ceux qui ont contribué.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {getCompletedProjects(projectData.sous_projets)
                    .sort(
                      (a, b) =>
                        new Date(b.derniere_maj).getTime() -
                        new Date(a.derniere_maj).getTime(),
                    )
                    .slice(0, 2)
                    .map(sousProjet => (
                      <ProjectCard key={sousProjet.slug} project={sousProjet} />
                    ))}
                </div>
                <div className="text-right py-2">
                  <Link
                    href="/projet-xhamia-nur/realisations"
                    className="text-green-600 hover:text-green-700 font-medium transition-colors inline-flex items-center grow-0"
                  >
                    Voir toutes les réalisations
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </div>
            )}

          {/* Transparence et suivi */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-center mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Target className="w-8 h-8 text-green-600" weight="duotone" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Transparence et suivi
              </h3>
              <p className="text-gray-600">
                Nous nous engageons à une totale transparence sur
                l&apos;utilisation des fonds collectés.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="bg-green-50 rounded-lg p-3">
                <h4 className="font-semibold text-green-900 mb-1 text-sm">
                  Suivi détaillé
                </h4>
                <p className="text-xs text-green-800">
                  Chaque sous-projet dispose de sa propre page avec progression,
                  détails techniques et reconnaissance des contributions.
                </p>
              </div>
              <div className="bg-green-50 rounded-lg p-3">
                <h4 className="font-semibold text-green-900 mb-1 text-sm">
                  Historique complet
                </h4>
                <p className="text-xs text-green-800">
                  Toutes les réalisations accomplies sont documentées et
                  accessibles dans la section dédiée.
                </p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-3">
              <h4 className="font-semibold text-gray-800 mb-1 text-sm">
                Allocation flexible des dons
              </h4>
              <p className="text-xs text-gray-600">
                L&apos;ACMSI utilise tous les fonds de manière globale selon les
                priorités et besoins réels du terrain. Les donateurs contribuent
                au projet dans son ensemble.
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
