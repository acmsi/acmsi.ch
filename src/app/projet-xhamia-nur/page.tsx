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
              l&rsquo;ACMSI sur des bases solides, développer un centre islamique moderne et
              pérenne, dans le respect de nos valeurs et sans riba.
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

          <div className="bg-gray-100 rounded-full h-6 mb-4 relative overflow-hidden">
            <div
              className="bg-green-600 h-6 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${Math.max(pourcentageCollecte, 1)}%` }}
            ></div>
            {pourcentageCollecte > 10 && (
              <div className="absolute inset-0 flex items-center justify-center text-white text-sm font-medium">
                {pourcentageCollecte.toFixed(1)}%
              </div>
            )}
          </div>

          <div className="flex justify-between items-center text-lg mb-3">
            <span className="font-semibold text-green-600">
              CHF {montantCollecte.toLocaleString()}
            </span>
            <span className="text-gray-600">Objectif : CHF {objectifTotal.toLocaleString()}</span>
          </div>

          <div className="flex justify-between items-center text-sm text-gray-500">
            <span>{pourcentageCollecte.toFixed(1)}% de l'objectif atteint</span>
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
              <strong>lieu de rencontre et de culte moderne de 540m²</strong>, et à garantir un
              avenir pérenne <strong>sans riba</strong> pour notre communauté.
            </p>
            <p className="text-lg text-gray-700 mb-6">
              Le Projet Xhamia Nur transformera notre lieu de culte en un véritable centre culturel
              et religieux, au service de toute la communauté musulmane et au-delà.
            </p>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mt-8">
            <div className="flex items-start space-x-3">
              <Target className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" weight="duotone" />
              <div>
                <h3 className="text-lg font-semibold text-green-900 mb-2">Notre engagement</h3>
                <p className="text-green-800">
                  <em>
                    "Et entraidez-vous dans l'accomplissement des bonnes œuvres et de la piété et ne
                    vous entraidez pas dans le péché et la transgression."
                  </em>
                  <br />
                  <span className="text-sm">— Sourate 5 Al-Maida, Le Festin - Verset 2</span>
                </p>
              </div>
            </div>
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

          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mt-8">
            <div className="flex items-start space-x-3">
              <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" weight="duotone" />
              <div>
                <h3 className="text-lg font-semibold text-green-900 mb-2">
                  Zakat et Sadaqah acceptées
                </h3>
                <p className="text-green-800">
                  Précisez lors de votre don s'il s'agit de Zakat afin qu'elle soit distribuée
                  conformément aux règles islamiques.
                </p>
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

          {/* Sous-projets */}
          {projectData?.sous_projets && projectData.sous_projets.length > 0 && (
            <div className="mb-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projectData.sous_projets.map(sousProjet => (
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
                      {sousProjet.priorite && (
                        <span
                          className={`text-xs font-medium px-2.5 py-0.5 rounded-full flex-shrink-0 ${
                            sousProjet.priorite === 1
                              ? 'bg-red-100 text-red-800'
                              : sousProjet.priorite === 2
                                ? 'bg-orange-100 text-orange-800'
                                : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          Priorité {sousProjet.priorite}
                        </span>
                      )}
                    </div>

                    {/* Badge de statut (seulement si terminé) */}
                    {sousProjet.statut === 'termine' && (
                      <div className="flex items-center mb-3">
                        <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                        <span className="text-sm font-medium text-gray-600 ml-2">Terminé</span>
                      </div>
                    )}
                    <p className="text-gray-600 mb-4">{sousProjet.description}</p>

                    {/* Barre de progression */}
                    <div className="mb-4">
                      <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <span>CHF {sousProjet.montant_leve.toLocaleString()}</span>
                        <span>CHF {sousProjet.objectif.toLocaleString()}</span>
                      </div>
                      <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
                        <div
                          className={`h-3 rounded-full transition-all duration-300 ${
                            sousProjet.statut === 'termine' ? 'bg-blue-500' : 'bg-green-500'
                          }`}
                          style={{ width: `${Math.max(sousProjet.pourcentage_completion, 1)}%` }}
                        ></div>
                      </div>
                      <p className="text-right text-xs text-gray-500 mt-1">
                        {sousProjet.pourcentage_completion.toFixed(1)}% collecté
                      </p>
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
              {projectData.sous_projets.some(p => p.statut !== 'termine') && (
                <div className="text-center mb-12">
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

          {/* Transparence et suivi */}
          <div className="bg-white rounded-lg shadow-sm p-8">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-green-600" weight="duotone" />
              </div>
              <h3 className="text-2xl font-semibold mb-3">Transparence et suivi en temps réel</h3>
              <p className="text-gray-600">
                Nous nous engageons à une totale transparence sur l'utilisation des fonds collectés.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-green-50 rounded-lg p-4">
                <h4 className="font-semibold text-green-900 mb-2">Mises à jour régulières</h4>
                <p className="text-sm text-green-800">
                  Cette section sera régulièrement mise à jour avec des photos des travaux, les
                  montants collectés et l'avancement du projet.
                </p>
              </div>
              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-semibold text-blue-900 mb-2">Communication ouverte</h4>
                <p className="text-sm text-blue-800">
                  Chaque don est comptabilisé et l'utilisation des fonds est documentée pour assurer
                  une transparence totale.
                </p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-800 mb-2">Information importante</h4>
              <p className="text-sm text-gray-600">
                <strong>Allocation des dons :</strong> L’ACMSI utilise tous les fonds collectés 
                de manière globale et flexible, permettant d’adapter les dépenses selon l’évolution 
                des coûts, des priorités et des opportunités. Les donateurs contribuent au projet 
                dans son ensemble.
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
          <p className="text-xl mb-4">جَزَاكُمُ اللَّهُ خَيْرًا</p>
          <p className="text-lg mb-8 opacity-90">
            "Celui qui construit une mosquée pour Allah, Allah lui construit son équivalent au
            Paradis." — Sahih Muslim 533
          </p>
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
