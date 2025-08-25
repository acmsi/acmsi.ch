import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact - ACMSI',
  description: 'Contactez l\'Association Culturelle Musulmane de Saint-Imier. Adresse, horaires et informations pratiques.',
}

export default function ContactPage() {
  return (
    <div className="bg-gradient-to-b from-nur-cream-50 to-white">
      {/* Hero Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-bold text-nur-navy-900 mb-6">
              Nous Contacter
            </h1>
            <p className="text-xl text-nur-navy-700 max-w-3xl mx-auto">
              Nous sommes là pour vous accueillir et répondre à toutes vos questions
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Details */}
            <div>
              <h2 className="text-3xl font-bold text-nur-navy-900 mb-8">
                Informations de Contact
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-nur-teal-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <svg className="w-6 h-6 text-nur-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-nur-navy-900 mb-1">Adresse</h3>
                    <p className="text-nur-navy-700">
                      Mosquée Nur<br />
                      Saint-Imier, Suisse<br />
                      <span className="text-sm text-nur-navy-600">(Adresse précise disponible sur demande)</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-nur-teal-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <svg className="w-6 h-6 text-nur-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-nur-navy-900 mb-1">Email</h3>
                    <p className="text-nur-navy-700">
                      <a href="mailto:contact@acmsi.ch" className="text-nur-teal-600 hover:text-nur-teal-700">
                        contact@acmsi.ch
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-nur-teal-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                    <svg className="w-6 h-6 text-nur-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-nur-navy-900 mb-1">Téléphone</h3>
                    <p className="text-nur-navy-700">
                      Disponible sur demande par email
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Prayer Times */}
            <div>
              <h2 className="text-3xl font-bold text-nur-navy-900 mb-8">
                Horaires des Prières
              </h2>
              
              <div className="bg-nur-navy-50 rounded-lg p-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-nur-navy-200">
                    <span className="font-medium text-nur-navy-900">Fajr</span>
                    <span className="text-nur-navy-700">Variable selon la saison</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-nur-navy-200">
                    <span className="font-medium text-nur-navy-900">Dhuhr</span>
                    <span className="text-nur-navy-700">Variable selon la saison</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-nur-navy-200">
                    <span className="font-medium text-nur-navy-900">Asr</span>
                    <span className="text-nur-navy-700">Variable selon la saison</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-nur-navy-200">
                    <span className="font-medium text-nur-navy-900">Maghrib</span>
                    <span className="text-nur-navy-700">Variable selon la saison</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="font-medium text-nur-navy-900">Isha</span>
                    <span className="text-nur-navy-700">Variable selon la saison</span>
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t border-nur-navy-200">
                  <h4 className="font-semibold text-nur-navy-900 mb-2">Prière du Vendredi</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-nur-navy-700">Khutbah</span>
                      <span className="text-nur-navy-700">À confirmer</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-nur-navy-700">Prière</span>
                      <span className="text-nur-navy-700">À confirmer</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 p-3 bg-nur-teal-50 rounded-lg">
                  <p className="text-sm text-nur-teal-800">
                    <strong>Note:</strong> Les horaires des prières varient selon les saisons. 
                    Contactez-nous pour les horaires actuels ou consultez notre site web.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visit Us Section */}
      <section className="py-16 bg-nur-teal-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Venez Nous Rendre Visite
          </h2>
          <p className="text-xl text-nur-teal-100 mb-8">
            Vous êtes toujours les bienvenus à la mosquée Nur. 
            N&rsquo;hésitez pas à nous contacter pour organiser votre visite.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v18m9-9H3" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Prières Quotidiennes</h3>
              <p className="text-nur-teal-100">Rejoignez-nous pour les cinq prières quotidiennes</p>
            </div>
            
            <div>
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Prière du Vendredi</h3>
              <p className="text-nur-teal-100">Khutbah et prière communautaire chaque vendredi</p>
            </div>
            
            <div>
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Événements Spéciaux</h3>
              <p className="text-nur-teal-100">Cérémonies religieuses et activités communautaires</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-nur-navy-900 mb-4">
              Envoyez-nous un Message
            </h2>
            <p className="text-lg text-nur-navy-700">
              Vous avez une question ou souhaitez en savoir plus sur nos activités ? 
              N&rsquo;hésitez pas à nous contacter.
            </p>
          </div>
          
          <div className="bg-nur-navy-50 rounded-lg p-8">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-nur-navy-900 mb-2">
                    Nom complet
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-4 py-3 border border-nur-navy-200 rounded-lg focus:ring-2 focus:ring-nur-teal-500 focus:border-transparent"
                    placeholder="Votre nom"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-nur-navy-900 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-3 border border-nur-navy-200 rounded-lg focus:ring-2 focus:ring-nur-teal-500 focus:border-transparent"
                    placeholder="votre@email.com"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-nur-navy-900 mb-2">
                  Sujet
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  className="w-full px-4 py-3 border border-nur-navy-200 rounded-lg focus:ring-2 focus:ring-nur-teal-500 focus:border-transparent"
                  placeholder="Sujet de votre message"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-nur-navy-900 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  className="w-full px-4 py-3 border border-nur-navy-200 rounded-lg focus:ring-2 focus:ring-nur-teal-500 focus:border-transparent"
                  placeholder="Votre message..."
                ></textarea>
              </div>
              
              <div className="text-center">
                <button
                  type="submit"
                  className="bg-nur-teal-600 text-white px-8 py-4 rounded-lg font-medium hover:bg-nur-teal-700 transition-colors"
                >
                  Envoyer le Message
                </button>
              </div>
            </form>
            
            <div className="mt-6 p-4 bg-nur-teal-50 rounded-lg">
              <p className="text-sm text-nur-teal-800">
                <strong>Note:</strong> Ce formulaire est actuellement en développement. 
                Pour nous contacter immédiatement, veuillez utiliser l&rsquo;adresse email ci-dessus.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
