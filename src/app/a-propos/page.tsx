import type { Metadata } from 'next'
import { getPageContent } from '@/lib/content'

export const metadata: Metadata = {
  title: 'À propos - ACMSI',
  description: 'Découvrez l\'histoire, la mission et les valeurs de l\'Association Culturelle Musulmane de Saint-Imier et de la mosquée Nur.',
}

export default async function AProposPage() {
  const pageContent = await getPageContent('about')
  
  // Fallback content if CMS content is not available
  const content = pageContent || {
    hero_title: "À propos de la Mosquée Nur",
    hero_subtitle: "Découvrez l'histoire, la mission et les valeurs de l'Association Culturelle Musulmane de Saint-Imier",
    history_title: "Notre Histoire",
    history_content: "<p>La mosquée Nur a été établie pour répondre aux besoins spirituels de la communauté musulmane de Saint-Imier et des environs.</p>",
    mission_title: "Notre Mission",
    mission_content: "<p>L'ACMSI a pour mission de faciliter la pratique religieuse et promouvoir les valeurs d'<strong>Ihsan</strong>.</p>",
    values_title: "Nos Valeurs",
    values_content: "<h3>Ihsan - L'Excellence</h3><p>L'<strong>Ihsan</strong> est au cœur de tout ce que nous faisons.</p>"
  }

  return (
    <div className="bg-gradient-to-b from-nur-cream-50 to-white">
      {/* Hero Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-bold text-nur-navy-900 mb-6">
              {content.hero_title}
            </h1>
            <p className="text-xl text-nur-navy-700 max-w-3xl mx-auto">
              {content.hero_subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* History Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-nur-navy-900 mb-6">
              {content.history_title}
            </h2>
          </div>
          <div 
            className="prose prose-lg max-w-none text-nur-navy-700"
            dangerouslySetInnerHTML={{ __html: content.history_content }}
          />
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-nur-cream-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-nur-navy-900 mb-6">
              {content.mission_title}
            </h2>
          </div>
          <div 
            className="prose prose-lg max-w-none text-nur-navy-700"
            dangerouslySetInnerHTML={{ __html: content.mission_content }}
          />
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-nur-navy-900 mb-6">
              {content.values_title}
            </h2>
          </div>
          <div 
            className="prose prose-lg max-w-none text-nur-navy-700"
            dangerouslySetInnerHTML={{ __html: content.values_content }}
          />
        </div>
      </section>
    </div>
  )
}
