import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Donation - ACMSI',
  description: 'Soutenez l\'Association Culturelle Musulmane de Saint-Imier et la mosquée Nur par vos dons.',
}

export default function DonationPage() {
  return (
    <div className="bg-gradient-to-b from-nur-cream-50 to-white">
      {/* Hero Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-bold text-nur-navy-900 mb-6">
              Soutenir notre Mosquée
            </h1>
            <p className="text-xl text-nur-navy-700 max-w-3xl mx-auto">
              Votre générosité nous aide à maintenir et développer les services 
              de la mosquée Nur pour toute la communauté
            </p>
          </div>
        </div>
      </section>

      {/* Importance Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-nur-navy-900 mb-4">
              L&rsquo;importance de votre soutien
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-nur-teal-50 p-6 rounded-lg">
              <div className="w-12 h-12 bg-nur-teal-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-nur-navy-900 mb-3">Entretien de la mosquée</h3>
              <p className="text-nur-navy-700">
                Maintenance des locaux, chauffage, électricité et tous les frais 
                nécessaires au bon fonctionnement de notre lieu de culte.
              </p>
            </div>

            <div className="bg-nur-gold-50 p-6 rounded-lg">
              <div className="w-12 h-12 bg-nur-gold-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-nur-navy-900 mb-3">Programmes éducatifs</h3>
              <p className="text-nur-navy-700">
                Financement des cours d&rsquo;arabe, d&rsquo;éducation islamique et 
                des matériaux pédagogiques pour nos enfants et adultes.
              </p>
            </div>

            <div className="bg-nur-navy-50 p-6 rounded-lg">
              <div className="w-12 h-12 bg-nur-navy-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-nur-navy-900 mb-3">Activités communautaires</h3>
              <p className="text-nur-navy-700">
                Organisation d&rsquo;événements, conférences et activités qui 
                renforcent les liens au sein de notre communauté.
              </p>
            </div>

            <div className="bg-nur-cream-100 p-6 rounded-lg">
              <div className="w-12 h-12 bg-nur-cream-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-nur-navy-900 mb-3">Actions solidaires</h3>
              <p className="text-nur-navy-700">
                Soutien aux familles dans le besoin et participation aux 
                œuvres caritatives locales et internationales.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Donation Methods */}
      <section className="py-16 bg-nur-cream-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-nur-navy-900 mb-4">
              Comment faire un don
            </h2>
            <p className="text-lg text-nur-navy-700">
              Plusieurs moyens s&rsquo;offrent à vous pour soutenir notre association
            </p>
          </div>

          <div className="space-y-8">
            {/* Bank Transfer */}
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-nur-teal-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-nur-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-nur-navy-900 mb-3">Virement bancaire</h3>
                  <p className="text-nur-navy-700 mb-4">
                    Effectuez un virement sur le compte de l&rsquo;ACMSI
                  </p>
                  <div className="bg-nur-cream-50 p-4 rounded-lg">
                    <p className="text-sm text-nur-navy-600 mb-2">Coordonnées bancaires :</p>
                    <div className="space-y-1 text-nur-navy-900">
                      <p><strong>Bénéficiaire :</strong> Association Culturelle Musulmane de Saint-Imier</p>
                      <p><strong>IBAN :</strong> [À compléter]</p>
                      <p><strong>BIC :</strong> [À compléter]</p>
                      <p><strong>Banque :</strong> [À compléter]</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Cash Donation */}
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-nur-gold-100 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-nur-gold-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-nur-navy-900 mb-3">Don en espèces</h3>
                  <p className="text-nur-navy-700 mb-4">
                    Remettez votre don directement à la mosquée lors des prières ou événements
                  </p>
                  <p className="text-sm text-nur-navy-600">
                    Les responsables de la mosquée sont disponibles après les prières 
                    du vendredi pour recevoir vos dons et répondre à vos questions.
                  </p>
                </div>
              </div>
            </div>

            {/* Zakat */}
            <div className="bg-white p-8 rounded-lg shadow-sm border-2 border-nur-teal-200">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-nur-teal-600 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-nur-navy-900 mb-3">Zakat et Sadaqah</h3>
                  <p className="text-nur-navy-700 mb-4">
                    L&rsquo;ACMSI accepte et redistribue la Zakat selon les préceptes islamiques
                  </p>
                  <div className="bg-nur-teal-50 p-4 rounded-lg">
                    <p className="text-sm text-nur-navy-700">
                      <strong>Important :</strong> Précisez lors de votre don s&rsquo;il s&rsquo;agit de Zakat 
                      afin qu&rsquo;elle soit distribuée conformément aux règles islamiques aux 
                      bénéficiaires éligibles de notre communauté.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact for Donations */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-nur-navy-900 mb-6">
            Questions sur les dons ?
          </h2>
          <p className="text-lg text-nur-navy-700 mb-8">
            N&rsquo;hésitez pas à nous contacter pour toute question concernant les dons 
            ou pour obtenir un reçu fiscal si nécessaire.
          </p>
          <Link 
            href="/contact" 
            className="bg-nur-teal-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-nur-teal-700 transition-colors inline-block"
          >
            Nous contacter
          </Link>
        </div>
      </section>

      {/* Gratitude Section */}
      <section className="py-16 bg-nur-teal-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Qu&rsquo;Allah vous récompense
          </h2>
          <p className="text-xl text-nur-teal-100 mb-4">
            جَزَاكُمُ اللَّهُ خَيْرًا
          </p>
          <p className="text-lg text-nur-teal-100">
            Votre générosité contribue au rayonnement de notre communauté 
            et au bien-être spirituel de tous nos fidèles.
          </p>
        </div>
      </section>
    </div>
  )
}
