import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Mosque,
  Target,
  BookOpen,
  Books,
  Coffee,
  GameController,
  House,
  Money,
  DeviceMobile,
  PaypalLogo,
  Bank,
  ArrowRight,
  CheckCircle,
  Calendar,
  TrendUp,
} from '@phosphor-icons/react/dist/ssr'
import { getProjectSummary } from '@/lib/content'
import Ayah from '@/components/ayah'
import ProjectStatus from '@/components/project-status'
import ProgressBar from '@/components/progress-bar'

export const metadata: Metadata = {
  title: 'Projet Xhamia Nur - ACMSI',
  description:
    "Soutenez le Projet Xhamia Nur. Un projet essentiel de 1'185'500 CHF pour établir l'ACMSI et développer un centre islamique moderne à Saint-Imier.",
}

export default async function ProjetXhamiaNurPage() {
  const projectData = await getProjectSummary()

  // Fallback data if no project data is found
  const objectifTotal = projectData?.total_objectif || 1185500
  const montantCollecte = projectData?.total_leve || 0
  const pourcentageCollecte = projectData?.pourcentage_global || 0
  const derniereMaj = projectData?.derniere_maj_globale || new Date().toISOString()

  return (
    <div className="bg-white">
      {/* Hero Section - Urgent */}
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
              Un projet essentiel de <strong>1&rsquo;185&rsquo;500 CHF</strong> pour établir
              l&rsquo;ACMSI sur des bases solides, développer un centre islamique moderne et pérenne
              dans ses murs, dans le respect de nos valeurs et sans riba.
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
            <h2 className="text-2xl font-bold mb-2">Progression de la collecte</h2>
            <p className="text-gray-600">Chaque contribution nous rapproche de notre objectif</p>
          </div>

          <ProgressBar percentage={pourcentageCollecte} variant="thick" />

          <div className="flex justify-between items-center text-lg mb-3">
            <span className="font-semibold text-green-600">
              CHF {montantCollecte.toLocaleString()} collecté
            </span>
            <span className="text-gray-600">Objectif : CHF {objectifTotal.toLocaleString()}</span>
          </div>

          <div className="flex justify-between items-center text-sm text-gray-500">
            <span>{pourcentageCollecte % 1 === 0 ? pourcentageCollecte.toFixed(0) : pourcentageCollecte.toFixed(1)}% de l'objectif atteint</span>
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
              Le Projet Xhamia Nur représente une étape fondamentale pour notre communauté. La
              mosquée Nur a été acquise par plusieurs membres généreux à titre privé.{' '}
              <strong>Qu'Allah les récompense pour ce geste exemplaire !</strong>
            </p>
            <p className="text-lg text-gray-700 mb-6">
              Ce projet ambitieux vise à{' '}
              <strong>établir l'ACMSI sur des bases solides et islamiques</strong>, à développer un{' '}
              <strong>centre islamique moderne de 540m², pérenne, dans ses murs</strong>, et à
              garantir un avenir <strong>sans riba</strong> pour notre communauté.
            </p>
            <p className="text-lg text-gray-700 mb-6">
              Le Projet Xhamia Nur transformera notre lieu de culte en un véritable centre culturel
              et religieux, au service de toute la communauté musulmane et au-delà.
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
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Un projet complet de 540m²</h2>
            <p className="text-lg text-gray-600">
              Une mosquée moderne et fonctionnelle pour toute la communauté
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Mosque className="w-6 h-6 text-green-600" weight="duotone" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Salle de prière mixte</h3>
              <p className="text-gray-600">
                Un espace de prière accueillant pour hommes et femmes, respectant les traditions
                islamiques.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6 text-green-600" weight="duotone" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Salle de classe (15 élèves)</h3>
              <p className="text-gray-600">
                Un espace dédié à l'apprentissage de l'arabe et de l'éducation islamique pour nos
                enfants.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Books className="w-6 h-6 text-green-600" weight="duotone" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Bibliothèque</h3>
              <p className="text-gray-600">
                Une collection de livres religieux et éducatifs accessible à toute la communauté.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <House className="w-6 h-6 text-green-600" weight="duotone" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Appartement 5.5 pièces</h3>
              <p className="text-gray-600">
                Logement pour l'imam et sa famille, garantissant une présence permanente.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Coffee className="w-6 h-6 text-green-600" weight="duotone" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Cafétéria</h3>
              <p className="text-gray-600">
                Un espace convivial pour les repas communautaires et les événements spéciaux.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <GameController className="w-6 h-6 text-green-600" weight="duotone" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Salle jeux et sport enfants</h3>
              <p className="text-gray-600">
                Un espace récréatif sûr pour l'épanouissement de nos jeunes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Comment donner */}
      <section id="faire-un-don" className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Comment contribuer au projet ?</h2>
            <p className="text-lg text-gray-600">
              Plusieurs moyens s'offrent à vous pour soutenir ce projet vital
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* IBAN */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Bank className="w-6 h-6 text-green-600" weight="duotone" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-3">Virement bancaire (IBAN)</h3>
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
                  <DeviceMobile className="w-6 h-6 text-green-600" weight="duotone" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-3">Twint</h3>
                  <p className="text-gray-600 mb-3">
                    Scannez le QR code Twint disponible sur notre flyer ou contactez-nous pour les
                    détails.
                  </p>
                  <Link
                    href="/documents/flyer appel dons mosquée FR.pdf"
                    target="_blank"
                    className="text-green-600 hover:text-green-700 font-medium"
                  >
                    Voir le QR code Twint →
                  </Link>
                </div>
              </div>
            </div>

            {/* PayPal */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <PaypalLogo className="w-6 h-6 text-green-600" weight="duotone" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-3">PayPal</h3>
                  <p className="text-gray-600 mb-3">
                    Utilisez le QR code PayPal sur notre flyer pour un don rapide et sécurisé.
                  </p>
                  <Link
                    href="/documents/flyer appel dons mosquée FR.pdf"
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
                  <Money className="w-6 h-6 text-green-600" weight="duotone" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-3">À la mosquée</h3>
                  <p className="text-gray-600 mb-3">
                    Remettez votre don directement lors des prières ou contactez-nous au :
                  </p>
                  <p className="font-semibold text-green-600">+41 (0) 79 276 35 00</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Campagne de financement et suivis - Section unifiée */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Sous-projets et suivis</h2>
            <p className="text-lg text-gray-600">
              L’ACMSI alloue les fonds collectés selon les priorités et la réalité du terrain.
              Suivez l’avancement des différents aspects du Projet Xhamia Nur.
            </p>
          </div>

          {/* Projets en cours */}
          {projectData?.sous_projets &&
            projectData.sous_projets.filter(p => p.statut !== 'termine').length > 0 && (
              <div className="mb-16">
                <h3 className="text-2xl font-bold mb-6 text-center text-green-900">
                  Sous-projets en cours
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {projectData.sous_projets
                    .filter(p => p.statut !== 'termine')
                    .map(sousProjet => (
                      <div
                        key={sousProjet.slug}
                        className={`bg-white rounded-lg shadow-sm border-2 p-6 transition-all duration-200 ${
                          sousProjet.campagne_active
                            ? 'border-green-200 shadow-green-50'
                            : 'border-gray-200 hover:border-green-200'
                        }`}
                      >
                        {/* Titre et priorité */}
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <Link
                            href={`/projet-xhamia-nur/${sousProjet.slug}`}
                            className="text-xl font-semibold flex-1 leading-tight hover:text-green-600 transition-colors"
                          >
                            {sousProjet.nom}
                          </Link>
                          <ProjectStatus
                            status={sousProjet.statut}
                            priority={sousProjet.priorite}
                            className="flex-shrink-0"
                          />
                        </div>

                        <p className="text-gray-600 mb-4">{sousProjet.description}</p>

                        {/* Barre de progression */}
                        <div className="mb-4">
                          <ProgressBar
                            percentage={sousProjet.pourcentage_completion}
                            variant="medium"
                          />
                          <div className="flex justify-between items-center text-green-800 text-sm mt-2">
                            <span className="font-semibold">
                              CHF {sousProjet.montant_leve.toLocaleString()} alloué
                            </span>
                            <span>Budget : CHF {sousProjet.objectif.toLocaleString()}</span>
                          </div>
                        </div>

                        {/* Échéance */}
                        {sousProjet.date_fin_prevue && (
                          <div className="text-xs text-gray-500 border-t pt-3">
                            <span className="flex items-center">
                              <Calendar className="w-3 h-3 mr-1" />
                              Échéance souhaitée:{' '}
                              {new Date(sousProjet.date_fin_prevue).toLocaleDateString('fr-CH')}
                            </span>
                          </div>
                        )}
                      </div>
                    ))}
                </div>

                {/* CTA pour campagnes selon priorité */}
                {projectData.sous_projets.filter(p => p.statut !== 'termine').length > 0 && (
                  <div className="text-center my-9">
                    <div className="bg-green-50 rounded-lg p-6">
                      <div className="flex items-center justify-center mb-3">
                        <TrendUp className="w-6 h-6 text-green-600 mr-2" weight="duotone" />
                        <h3 className="text-lg font-semibold text-green-900">
                          Allocation selon les priorités
                        </h3>
                      </div>
                      <p className="text-green-800 mb-4">
                        Vos dons permettent à l’association d’avancer sur tous les aspects du projet
                        selon les besoins réels et les priorités définies.
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
            projectData.sous_projets.filter(p => p.statut === 'termine').length > 0 && (
              <div className="mb-12">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-center text-green-900 flex-1">
                    Réalisations accomplies
                  </h3>
                </div>
                <p className="text-center text-gray-600 mb-8 max-w-3xl mx-auto">
                  Ces projets ont été menés à bien grâce à la générosité et à l'engagement de notre
                  communauté.
                  <strong>جَزَاكُمُ اللَّهُ خَيْرًا</strong> - Qu'Allah récompense tous ceux qui ont
                  contribué.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {projectData.sous_projets
                    .filter(p => p.statut === 'termine')
                    .sort(
                      (a, b) =>
                        new Date(b.derniere_maj).getTime() - new Date(a.derniere_maj).getTime(),
                    )
                    .slice(0, 2)
                    .map(sousProjet => (
                      <div
                        key={sousProjet.slug}
                        className="bg-white rounded-lg shadow-sm border-2 border-green-200 p-6 transition-all duration-200 hover:border-green-300"
                      >
                        {/* Titre avec badge terminé */}
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <Link
                            href={`/projet-xhamia-nur/${sousProjet.slug}`}
                            className="text-xl font-semibold flex-1 leading-tight hover:text-green-600 transition-colors"
                          >
                            {sousProjet.nom}
                          </Link>
                          <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full flex-shrink-0">
                            ✓ Accompli
                          </span>
                        </div>

                        <p className="text-gray-600 mb-4">{sousProjet.description}</p>

                        {/* Barre de progression complète */}
                        <div className="mb-4">
                          <ProgressBar
                            percentage={sousProjet.pourcentage_completion}
                            variant="medium"
                          />
                          <div className="flex justify-between items-center text-green-800 text-sm mt-2">
                            <span className="font-semibold">
                              CHF {sousProjet.montant_leve.toLocaleString()} alloué
                            </span>
                            <span>Budget : CHF {sousProjet.objectif.toLocaleString()}</span>
                          </div>
                        </div>

                        {/* Date de completion */}
                        {sousProjet.date_fin_prevue && (
                          <div className="text-xs text-gray-500 border-t pt-3">
                            <span className="flex items-center">
                              <CheckCircle
                                className="w-3 h-3 mr-1 text-green-500"
                                weight="duotone"
                              />
                              Accompli en{' '}
                              {new Date(sousProjet.date_fin_prevue).toLocaleDateString('fr-CH', {
                                month: 'long',
                                year: 'numeric',
                              })}
                            </span>
                          </div>
                        )}
                      </div>
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
                <Target className="w-6 h-6 text-green-600" weight="duotone" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Transparence et suivi</h3>
              <p className="text-gray-600">
                Nous nous engageons à une totale transparence sur l'utilisation des fonds collectés.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="bg-green-50 rounded-lg p-3">
                <h4 className="font-semibold text-green-900 mb-1 text-sm">Suivi détaillé</h4>
                <p className="text-xs text-green-800">
                  Chaque sous-projet dispose de sa propre page avec progression, détails techniques
                  et reconnaissance des contributions.
                </p>
              </div>
              <div className="bg-green-50 rounded-lg p-3">
                <h4 className="font-semibold text-green-900 mb-1 text-sm">Historique complet</h4>
                <p className="text-xs text-green-800">
                  Toutes les réalisations accomplies sont documentées et accessibles dans la section
                  dédiée.
                </p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-3">
              <h4 className="font-semibold text-gray-800 mb-1 text-sm">
                Allocation flexible des dons
              </h4>
              <p className="text-xs text-gray-600">
                L'ACMSI utilise tous les fonds de manière globale selon les priorités et besoins
                réels du terrain. Les donateurs contribuent au projet dans son ensemble.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Appel final */}
      <section className="py-16 bg-green-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ensemble, construisons l'avenir de notre communauté
          </h2>
          <p className="text-xl mb-6">جَزَاكُمُ اللَّهُ خَيْرًا</p>
          <div className="mb-8">
            <Ayah
              arabicText="وَتَعَاوَنُوا عَلَى الْبِرِّ وَالتَّقْوَىٰ ۖ وَلَا تَعَاوَنُوا عَلَى الْإِثْمِ وَالْعُدْوَانِ"
              translationText="Et entraidez-vous dans l'accomplissement des bonnes œuvres et de la piété et ne vous entraidez pas dans le péché et la transgression."
              reference="Sourate 5 Al-Maida, Le Festin - Verset 2"
              verseNumber="2"
              className="text-white opacity-90"
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="#faire-un-don"
              className="bg-white text-green-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
            >
              🤲 Faire un don maintenant
            </Link>
            <Link
              href="/contact"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-medium hover:bg-white hover:text-green-600 transition-colors"
            >
              Nous contacter
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
