/**
 * Test data fixtures for ACMSI tests
 */

export const BUDGET_PROJECT_FIXTURES = {
  chauffagePac: {
    slug: 'chauffage-pac',
    type: 'sous_projet' as const,
    nom: 'Système de chauffage PAC',
    description: "Installation d'une pompe à chaleur moderne et écologique",
    objectif: 45000,
    montant_leve: 15000,
    derniere_maj: '2025-01-26T10:00:00.000Z',
    priorite: 1,
    date_fin_prevue: '2025-11-15',
    echeance_format: 'month' as const,
    content:
      "<h1>Système de chauffage PAC</h1><p>Installation d'une pompe à chaleur moderne</p>",
    pourcentage_completion: 33.3,
  },

  projetGlobal: {
    slug: 'xhamia-nur',
    type: 'projet_global' as const,
    nom: 'Projet Xhamia Nur',
    description: 'Construction de la nouvelle mosquée',
    objectif: 2800000,
    montant_leve: 850000,
    derniere_maj: '2025-01-26T10:00:00.000Z',
    date_fin_prevue: '2026-12-31',
    echeance_format: 'quarter' as const,
    content:
      '<h1>Projet Xhamia Nur</h1><p>Construction de la nouvelle mosquée</p>',
    pourcentage_completion: 30.4,
  },

  projetWithFullDate: {
    slug: 'test-full-date',
    type: 'sous_projet' as const,
    nom: 'Projet avec date complète',
    description: 'Projet de test pour format de date complète',
    objectif: 10000,
    montant_leve: 5000,
    derniere_maj: '2025-01-26T10:00:00.000Z',
    priorite: 2,
    date_fin_prevue: '2025-03-15',
    echeance_format: 'full' as const,
    content: '<h1>Test Full Date</h1>',
    pourcentage_completion: 50.0,
  },
} as const

export const DATE_FORMAT_TEST_CASES = [
  { date: '2025-01-15', format: 'quarter', expected: 'Q1 2025' },
  { date: '2025-04-15', format: 'quarter', expected: 'Q2 2025' },
  { date: '2025-07-15', format: 'quarter', expected: 'Q3 2025' },
  { date: '2025-10-15', format: 'quarter', expected: 'Q4 2025' },
  { date: '2025-03-15', format: 'month', expected: 'mars 2025' },
  { date: '2025-11-15', format: 'month', expected: 'novembre 2025' },
  { date: '2025-03-15', format: 'full', expected: '15.03.2025' },
  { date: '2025-11-15', format: 'full', expected: '15.11.2025' },
] as const
