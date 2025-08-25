import type { Metadata } from 'next'
import { getAllNews } from '@/lib/content'
import Link from 'next/link'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Actualités - ACMSI',
  description:
    "Suivez les dernières actualités de l'Association Culturelle Musulmane de Saint-Imier et de la mosquée Nur.",
}

export default async function ActualitesPage() {
  const newsArticles = await getAllNews()

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Actualités</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Restez informés des dernières nouvelles de notre communauté, des événements à venir et
              des activités de la mosquée Nur.
            </p>
          </div>
        </div>
      </section>

      {/* News Articles */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {newsArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {newsArticles.map(article => (
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

                    <h2 className="text-xl font-semibold text-gray-900 mb-3">
                      <Link
                        href={`/actualites/${article.slug}`}
                        className="hover:text-teal-600 transition-colors"
                      >
                        {article.title}
                      </Link>
                    </h2>

                    {article.excerpt && (
                      <p className="text-gray-600 mb-4 line-clamp-3">{article.excerpt}</p>
                    )}

                    {article.tags && article.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {article.tags.map(tag => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                          >
                            {tag}
                          </span>
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
                <svg
                  className="w-8 h-8 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H15"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Aucune actualité pour le moment
              </h3>
              <p className="text-gray-600 mb-6">
                Les actualités seront bientôt disponibles. Revenez nous voir prochainement !
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
