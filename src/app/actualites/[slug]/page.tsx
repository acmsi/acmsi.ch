import type { Metadata } from 'next'
import { getNewsArticle, getAllNews } from '@/lib/content'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { CaretLeft } from '@phosphor-icons/react/dist/ssr'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const articles = await getAllNews()
  return articles.map(article => ({
    slug: article.slug,
  }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const article = await getNewsArticle(slug)

  if (!article) {
    return {
      title: 'Article non trouvé - ACMSI',
      description: "L'article demandé n'a pas été trouvé.",
    }
  }

  return {
    title: `${article.title} - ACMSI`,
    description: article.excerpt || article.content.substring(0, 160),
  }
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params
  const article = await getNewsArticle(slug)

  if (!article) {
    notFound()
  }

  return (
    <div className="bg-white">
      {/* Breadcrumb */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link
              href="/actualites"
              className="hover:text-teal-600 transition-colors"
            >
              Actualités
            </Link>
            <span>/</span>
            <span>{article.title}</span>
          </nav>
        </div>
      </section>

      {/* Article Header */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center text-sm text-gray-600 mb-4">
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

            <h1 className="text-3xl lg:text-4xl font-bold mb-3">
              {article.title}
            </h1>

            {article.excerpt && (
              <p className="text-xl max-w-3xl mx-auto">{article.excerpt}</p>
            )}

            {article.tags && article.tags.length > 0 && (
              <div className="flex flex-wrap justify-center gap-2 mt-6">
                {article.tags.map(tag => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {article.featured_image && (
            <div className="mb-12 relative aspect-video">
              <Image
                src={article.featured_image}
                alt={article.title}
                fill
                className="rounded-lg shadow-lg object-cover"
              />
            </div>
          )}
        </div>
      </section>

      {/* Article Content */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="prose sm:prose-lg max-w-none text-gray-700 prose-headings:text-gray-900 prose-links:text-teal-600 prose-strong:text-gray-900"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </div>
      </section>

      {/* Navigation */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <Link
              href="/actualites"
              className="bg-gray-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors inline-flex items-center"
            >
              <CaretLeft className="w-4 h-4 mr-2" weight="bold" />
              Retour aux actualités
            </Link>

            <Link
              href="/contact"
              className="text-teal-600 font-medium hover:text-teal-700 transition-colors"
            >
              Nous contacter
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
