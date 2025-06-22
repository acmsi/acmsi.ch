import type { Metadata } from 'next'
import { getNewsArticle, getAllNews } from '@/lib/content'
import { notFound } from 'next/navigation'
import Link from 'next/link'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  const articles = await getAllNews()
  return articles.map((article) => ({
    slug: article.slug,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = await getNewsArticle(params.slug)
  
  if (!article) {
    return {
      title: 'Article non trouvé - ACMSI',
    }
  }

  return {
    title: `${article.title} - ACMSI`,
    description: article.excerpt || `Actualité de l'Association Culturelle Musulmane de Saint-Imier`,
  }
}

export default async function ArticlePage({ params }: Props) {
  const article = await getNewsArticle(params.slug)

  if (!article) {
    notFound()
  }

  return (
    <div className="bg-gradient-to-b from-nur-cream-50 to-white">
      {/* Breadcrumb */}
      <section className="py-8 bg-white border-b border-nur-cream-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center space-x-2 text-sm text-nur-navy-600">
            <Link href="/" className="hover:text-nur-teal-600 transition-colors">
              Accueil
            </Link>
            <span>/</span>
            <Link href="/actualites" className="hover:text-nur-teal-600 transition-colors">
              Actualités
            </Link>
            <span>/</span>
            <span className="text-nur-navy-900">{article.title}</span>
          </nav>
        </div>
      </section>

      {/* Article Header */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center text-sm text-nur-navy-600 mb-4">
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
            
            <h1 className="text-3xl lg:text-4xl font-bold text-nur-navy-900 mb-6">
              {article.title}
            </h1>
            
            {article.excerpt && (
              <p className="text-xl text-nur-navy-700 max-w-3xl mx-auto">
                {article.excerpt}
              </p>
            )}
            
            {article.tags && article.tags.length > 0 && (
              <div className="flex flex-wrap justify-center gap-2 mt-6">
                {article.tags.map((tag) => (
                  <span 
                    key={tag}
                    className="px-3 py-1 bg-nur-teal-100 text-nur-teal-700 text-sm rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
          
          {article.featured_image && (
            <div className="mb-12">
              <img 
                src={article.featured_image} 
                alt={article.title}
                className="w-full rounded-lg shadow-lg"
              />
            </div>
          )}
        </div>
      </section>

      {/* Article Content */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            className="prose prose-lg max-w-none text-nur-navy-700 prose-headings:text-nur-navy-900 prose-links:text-nur-teal-600 prose-strong:text-nur-navy-900"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </div>
      </section>

      {/* Navigation */}
      <section className="py-16 bg-nur-cream-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <Link 
              href="/actualites"
              className="bg-nur-teal-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-nur-teal-700 transition-colors inline-flex items-center"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Retour aux actualités
            </Link>
            
            <Link 
              href="/contact"
              className="text-nur-teal-600 font-medium hover:text-nur-teal-700 transition-colors"
            >
              Nous contacter
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
