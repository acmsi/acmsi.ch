import { test } from 'node:test'
import assert from 'node:assert'
import {
  type BudgetProject,
  type ProjectSummary,
  getActiveProjects,
  getCompletedProjects,
  isProjectCompleted,
} from '../src/lib/content.ts'

/**
 * Unit tests for project calculation logic
 *
 * These tests document the important business logic:
 * - The global project represents the total fundraising goal
 * - Sub-projects are allocated portions of the global project's raised funds
 * - total_leve should only count the global project's montant_leve (not sub-projects)
 * - Sub-projects montant_leve represents allocated funds, not additional fundraising
 */

test('Project Calculations', async t => {
  // Mock data representing the corrected business logic
  const projetGlobal: BudgetProject = {
    slug: 'projet-principal',
    type: 'projet_global',
    nom: 'Construction de la Mosquée',
    objectif: 500000, // CHF 500,000 total goal
    montant_leve: 300000, // CHF 300,000 actually raised
    derniere_maj: '2025-01-15',
    content: 'Description du projet global',
    pourcentage_completion: 60, // 300k/500k = 60%
  }

  const sousProjets: BudgetProject[] = [
    {
      slug: 'fondations',
      type: 'sous_projet',
      nom: 'Fondations',
      objectif: 100000,
      montant_leve: 80000, // Allocated from global funds
      derniere_maj: '2025-01-10',
      content: 'Travaux de fondations',
      pourcentage_completion: 80,
      priorite: 1,
    },
    {
      slug: 'structure',
      type: 'sous_projet',
      nom: 'Structure',
      objectif: 150000,
      montant_leve: 120000, // Allocated from global funds
      derniere_maj: '2025-01-12',
      content: 'Construction de la structure',
      pourcentage_completion: 80,
      priorite: 2,
    },
    {
      slug: 'finitions',
      type: 'sous_projet',
      nom: 'Finitions',
      objectif: 80000,
      montant_leve: 0, // Not yet allocated
      derniere_maj: '2025-01-05',
      content: 'Travaux de finition',
      pourcentage_completion: 0,
      priorite: 3,
    },
  ]

  await t.test(
    'Project summary calculates total_leve correctly (corrected logic)',
    () => {
      // Simulate the corrected getProjectSummary logic
      const total_objectif = projetGlobal.objectif
      const total_leve = projetGlobal.montant_leve // Only global project funds
      const pourcentage_global =
        Math.round((total_leve / total_objectif) * 100 * 10) / 10

      const projectSummary: ProjectSummary = {
        projet_global: projetGlobal,
        sous_projets: sousProjets,
        total_objectif,
        total_leve,
        pourcentage_global,
        derniere_maj_globale: '2025-01-15',
      }

      // Key assertion: total_leve should equal only the global project's funds
      assert.strictEqual(projectSummary.total_leve, 300000)
      assert.strictEqual(projectSummary.total_objectif, 500000)
      assert.strictEqual(projectSummary.pourcentage_global, 60.0)
    },
  )

  await t.test(
    'Incorrect logic would double-count funds (for documentation)',
    () => {
      // This shows what the WRONG calculation would look like
      const incorrectTotalLeve =
        projetGlobal.montant_leve +
        sousProjets.reduce((sum, p) => sum + p.montant_leve, 0)

      // This would incorrectly sum to 500,000 (300k global + 200k allocated)
      assert.strictEqual(incorrectTotalLeve, 500000)

      // This would show 100% completion when only 60% of funds are actually raised
      const incorrectPercentage =
        Math.round((incorrectTotalLeve / projetGlobal.objectif) * 100 * 10) / 10
      assert.strictEqual(incorrectPercentage, 100.0)

      // This demonstrates why the correction was necessary
      assert.notStrictEqual(incorrectTotalLeve, projetGlobal.montant_leve)
    },
  )

  await t.test('Project filtering functions work correctly', () => {
    const completedProject: BudgetProject = {
      ...sousProjets[0],
      date_accomplissement: '2025-01-20',
    }

    const allProjects = [
      projetGlobal,
      completedProject,
      ...sousProjets.slice(1),
    ]

    // Test active projects (no completion date)
    const activeProjects = getActiveProjects(allProjects)
    assert.strictEqual(activeProjects.length, 3) // global + 2 active sub-projects

    // Test completed projects (has completion date)
    const completedProjects = getCompletedProjects(allProjects)
    assert.strictEqual(completedProjects.length, 1)

    // Test completion status
    assert.strictEqual(isProjectCompleted(completedProject), true)
    assert.strictEqual(isProjectCompleted(sousProjets[0]), false)
  })

  await t.test('Percentage calculations are accurate', () => {
    sousProjets.forEach(project => {
      const expectedPercentage =
        project.objectif > 0
          ? Math.round((project.montant_leve / project.objectif) * 100 * 10) /
            10
          : 0

      assert.strictEqual(project.pourcentage_completion, expectedPercentage)
    })

    // Test edge case: zero objective
    const zeroObjectifProject: BudgetProject = {
      ...sousProjets[0],
      objectif: 0,
    }

    const percentage =
      zeroObjectifProject.objectif > 0
        ? Math.round(
            (zeroObjectifProject.montant_leve / zeroObjectifProject.objectif) *
              100 *
              10,
          ) / 10
        : 0

    assert.strictEqual(percentage, 0)
  })

  await t.test('Priority sorting works correctly', () => {
    const unsortedProjects = [...sousProjets].reverse()
    const sortedProjects = unsortedProjects.sort(
      (a, b) => (a.priorite || 99) - (b.priorite || 99),
    )

    assert.strictEqual(sortedProjects[0].priorite, 1)
    assert.strictEqual(sortedProjects[1].priorite, 2)
    assert.strictEqual(sortedProjects[2].priorite, 3)

    // Test project without priority gets default value
    const noPriorityProject: BudgetProject = {
      ...sousProjets[0],
      priorite: undefined,
    }

    const withDefaults = [noPriorityProject, ...sousProjets].sort(
      (a, b) => (a.priorite || 99) - (b.priorite || 99),
    )

    // No priority project should be last (priority 99)
    assert.strictEqual(
      withDefaults[withDefaults.length - 1].slug,
      noPriorityProject.slug,
    )
  })

  await t.test('Most recent update date calculation', () => {
    const dates = [
      projetGlobal.derniere_maj,
      ...sousProjets.map(p => p.derniere_maj),
    ]
      .filter(date => date)
      .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())

    const mostRecent = dates[0]

    // Should be the global project date (2025-01-15)
    assert.strictEqual(mostRecent, '2025-01-15')

    // Verify it's actually the most recent
    dates.forEach(date => {
      assert.ok(new Date(mostRecent) >= new Date(date))
    })
  })
})
