export const eventAnnouncement = {
  id: 'mosquee-nur-2026-09-27',
  title: 'Ensemble pour la mosquée Nur',
  articleUrl: '/actualites/2026-09-14-rencontre-soutien-mosquee-nur',
  expiresAt: '2026-09-28T00:00:00+02:00',
  sessionKey: 'acmsi:event:mosquee-nur-2026-09-27:seen',
  languages: [
    { code: 'bs', label: 'Bosanski' },
    { code: 'de', label: 'Deutsch' },
    { code: 'fr', label: 'Français' },
    { code: 'sq', label: 'Shqip' },
  ],
} as const

export type FlyerLanguage = (typeof eventAnnouncement.languages)[number]['code']

export function selectFlyerLanguage(
  languages: readonly string[],
): FlyerLanguage {
  for (const language of languages) {
    const code = language.toLowerCase().split(/[-_]/)[0]
    if (eventAnnouncement.languages.some(item => item.code === code)) {
      return code as FlyerLanguage
    }
  }
  return 'fr'
}

export function isEventAnnouncementActive(now = Date.now()): boolean {
  return now < Date.parse(eventAnnouncement.expiresAt)
}

export function flyerUrl(language: FlyerLanguage): string {
  return `/images/evenements/2026-09-27/${language}.jpeg`
}

export const eventBannerMessages = [
  {
    lang: 'fr',
    date: '27 septembre · 14 h',
    text: 'Ensemble pour la mosquée Nur',
    action: 'Voir l’invitation',
  },
  {
    lang: 'sq',
    date: '27 shtator · 14:00',
    text: 'Së bashku për xhaminë Nur',
    action: 'Shiko ftesën',
  },
  {
    lang: 'de',
    date: '27. September · 14 Uhr',
    text: 'Gemeinsam für die Nur-Moschee',
    action: 'Einladung ansehen',
  },
  {
    lang: 'bs',
    date: '27. septembar · 14:00',
    text: 'Zajedno za džamiju Nur',
    action: 'Pogledajte poziv',
  },
]

export const eventViewerText = {
  fr: {
    title: 'L’invitation du 27 septembre',
    close: 'Fermer l’invitation',
    languages: 'Langue du flyer',
    stage: 'Flyer, zone de lecture',
    alt: 'Invitation à la rencontre du 27 septembre 2026',
    date: 'Dimanche 27 septembre',
    time: '14 h · Saint-Imier',
    heading: 'Ensemble pour la mosquée Nur',
    description:
      'Retrouvons-nous pour soutenir le projet de la mosquée, ensemble et pour les générations à venir.',
    audience: 'Tout le monde est bienvenu.',
    article: 'Découvrir la rencontre',
    zoom: 'Agrandir le flyer',
    unzoom: 'Voir le flyer entier',
    download: 'Télécharger',
  },
  sq: {
    title: 'Ftesa e 27 shtatorit',
    close: 'Mbyll ftesën',
    languages: 'Gjuha e fletushkës',
    stage: 'Fletushka, zona e leximit',
    alt: 'Ftesë për takimin e 27 shtatorit 2026',
    date: 'E diel, 27 shtator',
    time: '14:00 · Saint-Imier',
    heading: 'Së bashku për xhaminë Nur',
    description:
      'Të mblidhemi për të mbështetur projektin e xhamisë, së bashku dhe për brezat që vijnë.',
    audience: 'Të gjithë janë të mirëpritur.',
    article: 'Më shumë për takimin',
    zoom: 'Zmadho fletushkën',
    unzoom: 'Shiko fletushkën e plotë',
    download: 'Shkarko',
  },
  de: {
    title: 'Die Einladung zum 27. September',
    close: 'Einladung schliessen',
    languages: 'Sprache des Flyers',
    stage: 'Flyer, Lesebereich',
    alt: 'Einladung zum Treffen am 27. September 2026',
    date: 'Sonntag, 27. September',
    time: '14 Uhr · Saint-Imier',
    heading: 'Gemeinsam für die Nur-Moschee',
    description:
      'Kommen wir zusammen, um das Moscheeprojekt zu unterstützen – gemeinsam und für die kommenden Generationen.',
    audience: 'Alle sind herzlich willkommen.',
    article: 'Mehr über das Treffen',
    zoom: 'Flyer vergrössern',
    unzoom: 'Ganzen Flyer anzeigen',
    download: 'Herunterladen',
  },
  bs: {
    title: 'Poziv za 27. septembar',
    close: 'Zatvori poziv',
    languages: 'Jezik letka',
    stage: 'Letak, prostor za čitanje',
    alt: 'Poziv na susret 27. septembra 2026.',
    date: 'Nedjelja, 27. septembar',
    time: '14:00 · Saint-Imier',
    heading: 'Zajedno za džamiju Nur',
    description:
      'Okupimo se da podržimo projekt džamije, zajedno i za generacije koje dolaze.',
    audience: 'Svi su dobrodošli.',
    article: 'Više o susretu',
    zoom: 'Povećaj letak',
    unzoom: 'Prikaži cijeli letak',
    download: 'Preuzmi',
  },
}
