import type { Metadata } from 'next'
import { Heart } from '@phosphor-icons/react/dist/ssr'

export const metadata: Metadata = {
  title: 'Crédits & Remerciements | ACMSI',
  description:
    "Reconnaissance envers les contributeurs open source et les outils utilisés pour créer le site web de l'ACMSI.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    noarchive: true,
    noimageindex: true,
    nosnippet: true,
  },
}

export default function CreditsPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="py-16 lg:py-24 bg-linear-to-b from-white/20 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-nur-cream-300 rounded-full flex items-center justify-center">
                <Heart
                  className="w-8 h-8 text-nur-cream-700"
                  weight="duotone"
                />
              </div>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">
              Crédits & Remerciements
            </h1>
            <p className="text-xl max-w-3xl mx-auto">
              En reconnaissance des outils open source et des contributeurs qui
              ont permis la création de ce site web
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg prose-gray max-w-none">
            <blockquote className="border-l-4 border-nur-teal-500 pl-6 italic text-black bg-nur-cream-50 py-2 px-6 rounded-r">
              <p className="my-2! text-balance">
                &laquo; Celui qui enseigne le bien à autrui aura une récompense
                équivalente à celle de tous ceux qui le mettront en pratique,
                sans que leur propre récompense ne soit diminuée. &raquo;
              </p>
              <footer className="text-sm text-gray-700 mt-4 leading-4 text-balance">
                — Hadith rapporté par Abu Mas&apos;ud Al-Ansari (رضي الله عنه) •
                Sahih Muslim #1893 – Prophète Muhammad{' '}
                <span className="text-2xl">ﷺ</span>
              </footer>
            </blockquote>

            <h2 className="text-nur-navy-800 mt-12">
              Philosophie du Partage de la Connaissance
            </h2>
            <p>
              Dans l&apos;esprit islamique du partage de la connaissance et des
              bienfaits communautaires, ce site web a été développé en utilisant
              exclusivement des technologies ouvertes et libres. Cette approche
              reflète les valeurs islamiques fondamentales de transparence, de
              collaboration et de service à la communauté.
            </p>

            <h2 className="text-nur-navy-800">Technologies & Frameworks</h2>
            <div className="bg-gray-50 p-6 rounded-lg space-y-6">
              <div>
                <h4 className="font-semibold text-nur-navy-700 mb-3">
                  Runtime & Environnement
                </h4>
                <div className="space-y-3 text-sm">
                  <div>
                    <strong>Node.js</strong> - Environnement d&apos;exécution
                    JavaScript
                    <br />
                    <span className="text-gray-600">
                      Développé par la communauté Node.js et maintenu par OpenJS
                      Foundation
                      <br />© Node.js contributors • Licence MIT
                    </span>
                  </div>
                  <div>
                    <strong>TypeScript</strong> - JavaScript avec typage
                    statique
                    <br />
                    <span className="text-gray-600">
                      Développé par Microsoft Corporation
                      <br />© Microsoft Corporation • Licence Apache 2.0
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-nur-navy-700 mb-3">
                  Frameworks & Bibliothèques UI
                </h4>
                <div className="space-y-3 text-sm">
                  <div>
                    <strong>Next.js</strong> - Framework React full-stack
                    moderne
                    <br />
                    <span className="text-gray-600">
                      Développé par Vercel
                      <br />© 2024 Vercel, Inc. • Licence MIT
                    </span>
                  </div>
                  <div>
                    <strong>React</strong> - Bibliothèque pour interfaces
                    utilisateur
                    <br />
                    <span className="text-gray-600">
                      Développé par Meta (Facebook) et la communauté
                      <br />© Meta Platforms, Inc. and affiliates • Licence MIT
                    </span>
                  </div>
                  <div>
                    <strong>React DOM</strong> - Rendu DOM pour React
                    <br />
                    <span className="text-gray-600">
                      Développé par Meta (Facebook) et la communauté
                      <br />© Meta Platforms, Inc. and affiliates • Licence MIT
                    </span>
                  </div>
                  <div>
                    <strong>Tailwind CSS</strong> - Framework CSS utilitaire
                    <br />
                    <span className="text-gray-600">
                      Développé par Tailwind Labs, Inc.
                      <br />© Tailwind Labs, Inc. • Licence MIT
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-nur-navy-700 mb-3">
                  Gestion de Contenu
                </h4>
                <div className="space-y-3 text-sm">
                  <div>
                    <strong>Decap CMS</strong> - Système de gestion de contenu
                    Git-based
                    <br />
                    <span className="text-gray-600">
                      Anciennement Netlify CMS, maintenu par la communauté
                      <br />© Netlify • Licence MIT
                    </span>
                  </div>
                  <div>
                    <strong>Gray Matter</strong> - Parseur de métadonnées YAML
                    front matter
                    <br />
                    <span className="text-gray-600">
                      Développé par Jon Schlinkert
                      <br />© Jon Schlinkert • Licence MIT
                    </span>
                  </div>
                  <div>
                    <strong>Remark</strong> - Processeur Markdown unifié
                    <br />
                    <span className="text-gray-600">
                      Développé par Titus Wormer et la communauté unified
                      <br />© Titus Wormer • Licence MIT
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-nur-navy-700 mb-3">
                  Outils de Qualité & Tests
                </h4>
                <div className="space-y-3 text-sm">
                  <div>
                    <strong>ESLint</strong> - Analyseur et formateur de code
                    JavaScript
                    <br />
                    <span className="text-gray-600">
                      Développé par Nicholas C. Zakas et la communauté ESLint
                      <br />© OpenJS Foundation and ESLint contributors •
                      Licence MIT
                    </span>
                  </div>
                  <div>
                    <strong>Prettier</strong> - Formateur de code automatique
                    <br />
                    <span className="text-gray-600">
                      Développé par James Long et la communauté Prettier
                      <br />© James Long and contributors • Licence MIT
                    </span>
                  </div>
                  <div>
                    <strong>Playwright</strong> - Framework de tests end-to-end
                    <br />
                    <span className="text-gray-600">
                      Développé par Microsoft Corporation
                      <br />© Microsoft Corporation • Licence Apache 2.0
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <h2 className="text-nur-navy-800">Iconographie</h2>
            <div className="bg-gray-50 p-6 rounded-lg space-y-6">
              <div className="space-y-3 text-sm">
                <div>
                  <strong>Phosphor Icons</strong> - Collection d&apos;icônes
                  flexibles et cohérentes
                  <br />
                  <span className="text-gray-600">
                    Développé par Helena Zhang, Tobias Fried et la communauté
                    Phosphor
                    <br />© Phosphor Icons • Licence MIT
                  </span>
                </div>
                <div>
                  <strong>Islamic Icons</strong> - Collection d&apos;icônes SVG
                  islamiques authentiques
                  <br />
                  <span className="text-gray-600">
                    Créé par Masum (Créateur de Hugeicons Pro | Fondateur de
                    Halal Lab)
                    <br />© Masum • Licence CC BY 4.0
                    <br />
                    <a
                      href="https://www.figma.com/community/file/1483379958903573857/islamic-icons-free-download-svg-icons"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-nur-teal-600 hover:text-nur-teal-700 underline"
                    >
                      Voir sur Figma Community
                    </a>
                  </span>
                </div>
              </div>
            </div>

            <h2 className="text-nur-navy-800">Typographie</h2>
            <div className="bg-gray-50 p-6 rounded-lg space-y-6">
              <div>
                <h4 className="font-semibold text-nur-navy-700 mb-3">
                  Polices Principales
                </h4>
                <div className="space-y-3 text-sm">
                  <div>
                    <strong>Mada</strong> - Police principale sans-serif moderne
                    <br />
                    <span className="text-gray-600">
                      Créée par Khaled Hosny, inspirée de la signalétique du
                      métro du Caire
                      <br />© 2015-2016 The Mada Project Authors • Licence SIL
                      OFL 1.1
                    </span>
                  </div>
                  <div>
                    <strong>El Messiri</strong> - Police élégante pour les
                    titres
                    <br />
                    <span className="text-gray-600">
                      Créée par Mohamed Gaber, Cairo, Égypte
                      <br />© 2015 The El Messiri Project Authors • Licence SIL
                      OFL 1.1
                    </span>
                  </div>
                  <div>
                    <strong>Tajawal</strong> - Police géométrique moderne
                    <br />
                    <span className="text-gray-600">
                      Créée par Boutros™ (Mourad et Arlette Boutros)
                      <br />© 2017 Boutros International • Licence SIL OFL 1.1
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-nur-navy-700 mb-3">
                  Polices Islamiques Spécialisées
                </h4>
                <div className="space-y-3 text-sm">
                  <div>
                    <strong>UthmanicHafs</strong> - Texte coranique authentique
                    <br />
                    <span className="text-gray-600">
                      Développée par Ashfaq Ahmad Niazi pour le Complexe du Roi
                      Fahd
                      <br />© 2010 King Fahd Glorious Quran Printing Complex
                      (KFGQPC)
                    </span>
                  </div>
                  <div>
                    <strong>Amiri</strong> - Style Naskh classique
                    <br />
                    <span className="text-gray-600">
                      Créée par Dr. Khaled Hosny, revival de la presse Bulaq
                      (1905)
                      <br />© 2010-2022 The Amiri Project Authors • Licence SIL
                      OFL 1.1
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-sm text-gray-600 border-t pt-3">
                Ces polices respectent les traditions typographiques arabes et
                islamiques, garantissant une lisibilité optimale des textes
                sacrés et une identité visuelle authentique.
              </p>
            </div>

            <h2 className="text-nur-navy-800">Éléments Visuels & Design</h2>
            <div className="bg-gray-50 p-6 rounded-lg space-y-6">
              <div className="space-y-3 text-sm">
                <div>
                  <strong>Motif Zakhrafah (زخرفة)</strong> - Pattern géométrique
                  islamique d&apos;arrière-plan
                  <br />
                  <span className="text-gray-600">
                    Basé sur une implémentation CSS trouvée sur CodePen, auteur
                    original non identifiable
                    <br />
                    Communauté CodePen
                    <br />
                    <a
                      href="https://codepen.io/Irwan-Nadwi/pen/YzmWRyK"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-nur-teal-600 hover:text-nur-teal-700 underline"
                    >
                      Voir sur CodePen
                    </a>
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-nur-teal-50 border border-nur-teal-200 p-6 rounded-lg mt-8">
              <h2 className="text-nur-navy-800 mt-0">
                Code Source de ce Site Web
              </h2>
              <p>
                Dans l&apos;esprit de transparence et de partage qui a guidé ce
                projet, le code source de ce site web sera bientôt disponible
                sous licence open source. En attendant cette mise à disposition
                publique, toute personne ou organisation souhaitant utiliser
                notre code pour des projets similaires est invitée à nous
                contacter.
              </p>
              <p>
                Nous croyons fermement que les outils développés pour servir les
                communautés religieuses devraient être librement accessibles
                pour le bénéfice de tous.
              </p>
              <p className="text-sm text-nur-navy-600 font-medium">
                Contact :{' '}
                <a
                  href="mailto:contact@acmsi.ch"
                  className="text-nur-teal-600 hover:text-nur-teal-700 underline"
                >
                  contact@acmsi.ch
                </a>
              </p>
            </div>

            <div className="bg-nur-cream-50 border border-nur-cream-200 p-6 rounded-lg mt-8">
              <h2 className="text-nur-navy-800 mt-0">
                Remerciements Particuliers
              </h2>
              <p>
                Nous exprimons notre gratitude envers tous les développeurs,
                designers et contributeurs qui ont rendu ces outils disponibles
                sous licences libres. Leur générosité permet aux communautés du
                monde entier de bénéficier de technologies de qualité sans
                contraintes financières ou techniques.
              </p>
              <p>
                Cette approche collaborative reflète les valeurs islamiques de
                <em>ta&apos;awun</em> (entraide mutuelle) et de <em>khidmah</em>{' '}
                (service à la communauté).
              </p>
            </div>

            <div className="text-center mt-12 pt-8 border-t border-gray-200">
              <p className="text-gray-600">
                <em>
                  Puisse Allah récompenser tous ceux qui contribuent au bien
                  commun
                </em>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
