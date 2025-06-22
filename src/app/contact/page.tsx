import type { Metadata } from 'next'
import { getGeneralSettings, getPrayerTimes } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Contact - ACMSI',
  description: 'Contactez l\'Association Culturelle Musulmane de Saint-Imier. Adresse, horaires et informations pratiques.',
}

export default async function ContactPage() {
  const generalSettings = getGeneralSettings()
  const prayerTimes = getPrayerTimes()

  // Fallback data if CMS content is not available
  const settings = generalSettings || {
    site_title: "Association Culturelle Musulmane de Saint-Imier",
    address: "[Adresse à compléter]\nSaint-Imier, Suisse",
    phone: "[Numéro à compléter]",
    email: "contact@acmsi.ch",
    social_media: {}
  }

  const prayers = prayerTimes || {
    fajr: "[Horaire variable selon la saison]",
    dhuhr: "[Horaire variable selon la saison]",
    asr: "[Horaire variable selon la saison]",
    maghrib: "[Horaire variable selon la saison]",
    isha: "[Horaire variable selon la saison]",
    jumah_khutbah: "[Heure à compléter]",
    jumah_prayer: "[Heure à compléter]",
    note: "Les horaires des prières varient selon les saisons. Consultez notre site web ou contactez-nous pour les horaires actuels."
  }

  return (
    <div className="bg-gradient-to-b from-nur-cream-50 to-white">
      {/* Hero Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-bold text-nur-navy-900 mb-6">
              Nous contacter
            </h1>
            <p className="text-xl text-nur-navy-700 max-w-3xl mx-auto">
              Vous êtes les bienvenus à la mosquée Nur. Voici toutes les informations 
              pour nous rendre visite ou nous contacter.
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
                Informations pratiques
              </h2>
              
              <div className="space-y-6">
                {/* Address */}
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-nur-teal-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-nur-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-nur-navy-900 mb-2">Adresse</h3>
                    <div className="text-nur-navy-700 whitespace-pre-line">
                      {settings.address}
                    </div>
                  </div>
                </div>

                {/* Phone */}
                {settings.phone && (
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-nur-gold-100 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-nur-gold-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-nur-navy-900 mb-2">Téléphone</h3>
                      <p className="text-nur-navy-700">
                        {settings.phone}
                      </p>
                    </div>
                  </div>
                )}

                {/* Email */}
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-nur-navy-100 rounded-lg flex items-center justify-center">
                    <svg className="w-6 h-6 text-nur-navy-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-nur-navy-900 mb-2">Email</h3>
                    <p className="text-nur-navy-700">
                      <a href={`mailto:${settings.email}`} className="hover:text-nur-teal-600 transition-colors">
                        {settings.email}
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Prayer Times */}
            <div>
              <h2 className="text-3xl font-bold text-nur-navy-900 mb-8">
                Horaires des prières
              </h2>
              
              <div className="bg-nur-cream-50 p-6 rounded-lg">
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-nur-cream-200">
                    <span className="font-medium text-nur-navy-900">Fajr</span>
                    <span className="text-nur-navy-700">{prayers.fajr}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-nur-cream-200">
                    <span className="font-medium text-nur-navy-900">Dhuhr</span>
                    <span className="text-nur-navy-700">{prayers.dhuhr}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-nur-cream-200">
                    <span className="font-medium text-nur-navy-900">Asr</span>
                    <span className="text-nur-navy-700">{prayers.asr}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-nur-cream-200">
                    <span className="font-medium text-nur-navy-900">Maghrib</span>
                    <span className="text-nur-navy-700">{prayers.maghrib}</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="font-medium text-nur-navy-900">Isha</span>
                    <span className="text-nur-navy-700">{prayers.isha}</span>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-nur-teal-50 rounded-lg">
                  <p className="text-sm text-nur-navy-700">
                    <strong>Prière du vendredi (Jumu'ah) :</strong><br />
                    Khutbah à {prayers.jumah_khutbah}<br />
                    Prière à {prayers.jumah_prayer}
                  </p>
                </div>
                
                {prayers.note && (
                  <div className="mt-4 p-3 bg-nur-gold-50 rounded-lg">
                    <p className="text-sm text-nur-navy-700">
                      <strong>Note :</strong> {prayers.note}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services and Activities */}
      <section className="py-16 bg-nur-cream-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-nur-navy-900 mb-4">
              Services et activités
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-nur-teal-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-nur-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-nur-navy-900 mb-2">Cours d'arabe</h3>
              <p className="text-nur-navy-700 text-sm">
                Samedis de 14h à 16h<br />
                Pour enfants et adultes
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-nur-gold-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-nur-gold-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-nur-navy-900 mb-2">Éducation islamique</h3>
              <p className="text-nur-navy-700 text-sm">
                Dimanches de 10h à 12h<br />
                Cours pour tous les âges
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-nur-navy-100 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-nur-navy-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-nur-navy-900 mb-2">Événements communautaires</h3>
              <p className="text-nur-navy-700 text-sm">
                Iftar, Aïd, conférences<br />
                Dates annoncées sur le site
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Placeholder */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-nur-navy-900 mb-4">
              Envoyez-nous un message
            </h2>
            <p className="text-lg text-nur-navy-700">
              N'hésitez pas à nous contacter pour toute question ou demande d'information
            </p>
          </div>
          
          <div className="bg-nur-cream-50 p-8 rounded-lg text-center">
            <div className="w-16 h-16 bg-nur-teal-100 rounded-lg flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-nur-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-nur-navy-900 mb-4">
              Formulaire de contact en cours de développement
            </h3>
            <p className="text-nur-navy-700 mb-6">
              En attendant, vous pouvez nous contacter directement par email ou téléphone 
              en utilisant les coordonnées ci-dessus.
            </p>
            <a 
              href="mailto:contact@acmsi.ch" 
              className="bg-nur-teal-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-nur-teal-700 transition-colors inline-block"
            >
              Envoyer un email
            </a>
          </div>
        </div>
      </section>

      {/* Welcome Message */}
      <section className="py-16 bg-nur-teal-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Vous êtes les bienvenus
          </h2>
          <p className="text-xl text-nur-teal-100 mb-4">
            أَهْلاً وَسَهْلاً
          </p>
          <p className="text-lg text-nur-teal-100">
            La mosquée Nur accueille tous les musulmans et toutes les personnes 
            intéressées par l'Islam dans un esprit de paix et de fraternité.
          </p>
        </div>
      </section>
    </div>
  )
}
