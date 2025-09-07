import type { Metadata } from 'next'
import { getAllNews, getProjectSummary } from '@/lib/content'
import Link from 'next/link'
import Image from 'next/image'
import { Newspaper, X } from '@phosphor-icons/react/dist/ssr'
import ProjectBanner from '@/components/project-banner'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'Actualités - ACMSI',
  description:
    "Suivez les dernières actualités de l'Association Culturelle Musulmane de Saint-Imier et de la mosquée Nur.",
}

export default async function ActualitesPage({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string }>
}) {
  const newsArticles = await getAllNews()
  const projectData = await getProjectSummary()
  const resolvedSearchParams = await searchParams
  const selectedTag = resolvedSearchParams.tag

  // Filter articles by tag if specified
  const filteredArticles = selectedTag
    ? newsArticles.filter(article => article.tags?.includes(selectedTag))
    : newsArticles

  // Get all unique tags from all articles for the filter UI
  const allTags = Array.from(
    new Set(newsArticles.flatMap(article => article.tags || [])),
  ).sort()

  return (
    <div>
      {/* Hero Section */}
      <section className="py-16 lg:py-24 bg-linear-to-b from-white/20 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-3">Actualités</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Restez informés des dernières nouvelles de notre communauté, des
              événements à venir et des activités de la mosquée Nur.
            </p>

            {/* Tag Filter */}
            {allTags.length > 0 && (
              <div className="mt-8">
                <Suspense fallback={<div>Chargement des filtres...</div>}>
                  <TagFilter tags={allTags} selectedTag={selectedTag} />
                </Suspense>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* News Articles */}
      <section className="pb-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Results summary */}
          {selectedTag && (
            <div className="mb-6">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span>Filtré par tag:</span>
                <span className="px-2 py-1 bg-teal-100 text-teal-700 rounded-full font-medium">
                  {selectedTag}
                </span>
                <Link
                  href="/actualites"
                  className="flex items-center gap-1 text-teal-600 hover:text-teal-700 transition-colors"
                >
                  <X className="w-4 h-4" />
                  Effacer le filtre
                </Link>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                {filteredArticles.length} article
                {filteredArticles.length !== 1 ? 's' : ''} trouvé
                {filteredArticles.length !== 1 ? 's' : ''}
              </p>
            </div>
          )}

          {filteredArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map(article => (
                <article
                  key={article.slug}
                  className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-200"
                >
                  {article.featured_image && (
                    <div className="aspect-video bg-gray-100 relative">
                      <Image
                        src={article.featured_image}
                        alt={article.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <time dateTime={article.date}>
                        {new Date(article.date).toLocaleDateString('fr-CH', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </time>
                      <span className="mx-2">•</span>
                      <span>{article.author}</span>
                    </div>

                    <h2 className="text-xl font-semibold mb-3">
                      <Link
                        href={`/actualites/${article.slug}`}
                        className="hover:text-teal-600 transition-colors"
                      >
                        {article.title}
                      </Link>
                    </h2>

                    {article.excerpt && (
                      <p className="mb-4 line-clamp-3">{article.excerpt}</p>
                    )}

                    {article.tags && article.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {article.tags.map(tag => (
                          <Link
                            key={tag}
                            href={`/actualites?tag=${encodeURIComponent(tag)}`}
                            className={`px-2 py-1 text-xs rounded-full transition-colors ${
                              selectedTag === tag
                                ? 'bg-teal-100 text-teal-700 font-medium'
                                : 'bg-gray-100 text-gray-600 hover:bg-teal-50 hover:text-teal-600'
                            }`}
                          >
                            {tag}
                          </Link>
                        ))}
                      </div>
                    )}

                    <Link
                      href={`/actualites/${article.slug}`}
                      className="text-teal-600 font-medium hover:text-teal-700 transition-colors"
                    >
                      Lire la suite →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-6">
                <Newspaper className="w-8 h-8 text-gray-500" weight="duotone" />
              </div>
              <h3 className="text-xl font-semibold mb-4">
                {selectedTag
                  ? `Aucune actualité avec le tag "${selectedTag}"`
                  : 'Aucune actualité pour le moment'}
              </h3>
              <p className="mb-6">
                {selectedTag ? (
                  <>
                    Essayez de{' '}
                    <Link
                      href="/actualites"
                      className="text-teal-600 hover:text-teal-700 underline"
                    >
                      supprimer le filtre
                    </Link>{' '}
                    pour voir toutes les actualités.
                  </>
                ) : (
                  'Les actualités seront bientôt disponibles. Revenez nous voir prochainement !'
                )}
              </p>
            </div>
          )}
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

// Client component for tag filter UI
function TagFilter({
  tags,
  selectedTag,
}: {
  tags: string[]
  selectedTag?: string
}) {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      <Link
        href="/actualites"
        className={`px-3 py-1 rounded-full text-sm transition-colors ${
          !selectedTag
            ? 'bg-teal-100 text-teal-700 font-medium'
            : 'bg-gray-100 text-gray-600 hover:bg-teal-50 hover:text-teal-600'
        }`}
      >
        Tous
      </Link>
      {tags.map(tag => (
        <Link
          key={tag}
          href={`/actualites?tag=${encodeURIComponent(tag)}`}
          className={`px-3 py-1 rounded-full text-sm transition-colors ${
            selectedTag === tag
              ? 'bg-teal-100 text-teal-700 font-medium'
              : 'bg-gray-100 text-gray-600 hover:bg-teal-50 hover:text-teal-600'
          }`}
        >
          {tag}
        </Link>
      ))}
    </div>
  )
}
