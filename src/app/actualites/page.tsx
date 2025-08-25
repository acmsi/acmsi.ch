import type { Metadata } from 'next'
import { getAllNews } from '@/lib/content'
import Link from 'next/link'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Actualités - ACMSI',
  description: 'Suivez les dernières actualités de l\'Association Culturelle Musulmane de Saint-Imier et de la mosquée Nur.',
}

export default async function ActualitesPage() {
  const newsArticles = await getAllNews()

  return (
    <div className="bg-gradient-to-b from-nur-cream-50 to-white">
      {/* Hero Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-bold text-nur-navy-900 mb-6">
              Actualités
            </h1>
            <p className="text-xl text-nur-navy-700 max-w-3xl mx-auto">
              Restez informés des dernières nouvelles de notre communauté, 
              des événements à venir et des activités de la mosquée Nur.
            </p>
          </div>
        </div>
      </section>

      {/* News Articles */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {newsArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {newsArticles.map((article) => (
                <article key={article.slug} className="bg-nur-cream-50 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  {article.featured_image && (
                    <div className="aspect-video bg-nur-teal-100 relative">
                      <Image 
                        src={article.featured_image} 
                        alt={article.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-center text-sm text-nur-navy-600 mb-3">
                      <time dateTime={article.date}>
                        {new Date(article.date).toLocaleDateString('fr-CH', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </time>
                      <span className="mx-2">•</span>
                      <span>{article.author}</span>
                    </div>
                    
                    <h2 className="text-xl font-semibold text-nur-navy-900 mb-3">
                      <Link 
                        href={`/actualites/${article.slug}`}
                        className="hover:text-nur-teal-600 transition-colors"
                      >
                        {article.title}
                      </Link>
                    </h2>
                    
                    {article.excerpt && (
                      <p className="text-nur-navy-700 mb-4 line-clamp-3">
                        {article.excerpt}
                      </p>
                    )}
                    
                    {article.tags && article.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {article.tags.map((tag) => (
                          <span 
                            key={tag}
                            className="px-2 py-1 bg-nur-teal-100 text-nur-teal-700 text-xs rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    
                    <Link 
                      href={`/actualites/${article.slug}`}
                      className="text-nur-teal-600 font-medium hover:text-nur-teal-700 transition-colors"
                    >
                      Lire la suite →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-nur-teal-100 rounded-lg flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-nur-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H15" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-nur-navy-900 mb-4">
                Aucune actualité pour le moment
              </h3>
              <p className="text-nur-navy-700 mb-6">
                Les actualités seront bientôt disponibles. Revenez nous voir prochainement !
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CMS Notice */}
      <section className="py-16 bg-nur-cream-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-nur-teal-50 border border-nur-teal-200 rounded-lg p-6">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-8 h-8 bg-nur-teal-600 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-nur-navy-900 mb-2">
                  Gestion de contenu
                </h3>
                <p className="text-nur-navy-700">
                  Cette section est maintenant gérée par notre système de gestion de contenu (CMS). 
                  Les administrateurs peuvent ajouter, modifier et publier des actualités 
                  directement via l&rsquo;interface d&rsquo;administration.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
