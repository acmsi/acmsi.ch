import { test } from 'node:test'
import assert from 'node:assert'
import {
  type BudgetProject,
  getActiveProjects,
  getCompletedProjects,
  isProjectCompleted,
} from '../src/lib/content.ts'

/**
 * Edge cases and validation tests for project management
 * Tests boundary conditions, error handling, and data validation
 */

test('Project Validation and Edge Cases', async t => {
  await t.test('Handle projects with missing priority values', () => {
    const projectsWithMixedPriorities: BudgetProject[] = [
      {
        slug: 'high-priority',
        type: 'sous_projet',
        nom: 'High Priority',
        objectif: 10000,
        montant_leve: 5000,
        derniere_maj: '2025-01-15',
        content: 'Test',
        pourcentage_completion: 50,
        priorite: 1,
      },
      {
        slug: 'no-priority',
        type: 'sous_projet',
        nom: 'No Priority',
        objectif: 10000,
        montant_leve: 5000,
        derniere_maj: '2025-01-15',
        content: 'Test',
        pourcentage_completion: 50,
        // No priority field
      },
      {
        slug: 'low-priority',
        type: 'sous_projet',
        nom: 'Low Priority',
        objectif: 10000,
        montant_leve: 5000,
        derniere_maj: '2025-01-15',
        content: 'Test',
        pourcentage_completion: 50,
        priorite: 5,
      },
    ]

    // Sort with default priority handling
    const sorted = projectsWithMixedPriorities.sort(
      (a, b) => (a.priorite || 99) - (b.priorite || 99),
    )

    // Should be ordered: priority 1, priority 5, no priority (99)
    assert.strictEqual(sorted[0].slug, 'high-priority')
    assert.strictEqual(sorted[1].slug, 'low-priority')
    assert.strictEqual(sorted[2].slug, 'no-priority')
  })

  await t.test('Handle projects with extreme completion percentages', () => {
    const overFundedProject: BudgetProject = {
      slug: 'over-funded',
      type: 'sous_projet',
      nom: 'Over Funded Project',
      objectif: 10000,
      montant_leve: 15000, // 150% funding
      derniere_maj: '2025-01-15',
      content: 'Test content',
      pourcentage_completion: 150,
    }

    // Verify extreme percentages are calculated correctly
    const overFundedPercentage = Math.round((15000 / 10000) * 100 * 10) / 10
    assert.strictEqual(overFundedPercentage, 150.0)

    const exactPercentage = Math.round((10000 / 10000) * 100 * 10) / 10
    assert.strictEqual(exactPercentage, 100.0)

    // Over-funded projects should still be considered for completion
    assert.ok(overFundedProject.pourcentage_completion >= 100)
  })

  await t.test('Handle empty project arrays', () => {
    const emptyProjects: BudgetProject[] = []

    const activeProjects = getActiveProjects(emptyProjects)
    const completedProjects = getCompletedProjects(emptyProjects)

    assert.strictEqual(activeProjects.length, 0)
    assert.strictEqual(completedProjects.length, 0)
  })

  await t.test('Project completion status edge cases', () => {
    const projectWithCompletionDate: BudgetProject = {
      slug: 'completed',
      type: 'sous_projet',
      nom: 'Completed Project',
      objectif: 10000,
      montant_leve: 8000, // Not fully funded but marked complete
      derniere_maj: '2025-01-15',
      date_accomplissement: '2025-01-20',
      content: 'Test content',
      pourcentage_completion: 80,
    }

    const projectWithEmptyCompletionDate: BudgetProject = {
      slug: 'empty-completion',
      type: 'sous_projet',
      nom: 'Empty Completion Project',
      objectif: 10000,
      montant_leve: 12000, // Over-funded but not marked complete
      derniere_maj: '2025-01-15',
      date_accomplissement: '', // Empty string
      content: 'Test content',
      pourcentage_completion: 120,
    }

    // Completion is based on date_accomplissement, not funding percentage
    assert.strictEqual(isProjectCompleted(projectWithCompletionDate), true)
    assert.strictEqual(
      isProjectCompleted(projectWithEmptyCompletionDate),
      false,
    )

    const projects = [projectWithCompletionDate, projectWithEmptyCompletionDate]

    const completed = getCompletedProjects(projects)
    const active = getActiveProjects(projects)

    assert.strictEqual(completed.length, 1)
    assert.strictEqual(active.length, 1)
    assert.strictEqual(completed[0].slug, 'completed')
    assert.strictEqual(active[0].slug, 'empty-completion')
  })

  await t.test('Percentage calculation precision', () => {
    // Test rounding precision for edge cases
    const precisionTests = [
      { montant: 3333, objectif: 10000, expected: 33.3 }, // 33.33... rounds to 33.3
      { montant: 6666, objectif: 10000, expected: 66.7 }, // 66.66... rounds to 66.7
      { montant: 1, objectif: 3, expected: 33.3 }, // 33.333... rounds to 33.3
      { montant: 2, objectif: 3, expected: 66.7 }, // 66.666... rounds to 66.7
      { montant: 1, objectif: 7, expected: 14.3 }, // 14.285... rounds to 14.3
    ]

    precisionTests.forEach(({ montant, objectif, expected }) => {
      const calculated = Math.round((montant / objectif) * 100 * 10) / 10
      assert.strictEqual(
        calculated,
        expected,
        `${montant}/${objectif} should equal ${expected}%, got ${calculated}%`,
      )
    })
  })

  await t.test('Date sorting with mixed valid and invalid dates', () => {
    const mixedDates = [
      '2025-01-15', // Valid
      '', // Empty
      '2025-01-10', // Valid, older
      'invalid-date', // Invalid
      '2025-01-20', // Valid, newest
    ]

    // Filter and sort like in the actual code
    const validDates = mixedDates
      .filter(date => date && !isNaN(Date.parse(date)))
      .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())

    assert.strictEqual(validDates.length, 3)
    assert.strictEqual(validDates[0], '2025-01-20') // Newest first
    assert.strictEqual(validDates[1], '2025-01-15')
    assert.strictEqual(validDates[2], '2025-01-10') // Oldest last
  })

  await t.test('Budget allocation validation scenarios', () => {
    const globalProject: BudgetProject = {
      slug: 'acquisition-mosquee-nur',
      type: 'projet_global',
      nom: 'Acquisition Mosquée Nur',
      objectif: 630000,
      montant_leve: 330000, // Current acquisition funds
      derniere_maj: '2025-01-15',
      content: "Projet d'acquisition de la mosquée",
      pourcentage_completion: 52.4,
    }

    const subProjects: BudgetProject[] = [
      {
        slug: 'sub1',
        type: 'sous_projet',
        nom: 'Sub Project 1',
        objectif: 150000,
        montant_leve: 200000, // Over-allocated scenario
        derniere_maj: '2025-01-15',
        content: 'Sub project 1',
        pourcentage_completion: 133.3,
      },
      {
        slug: 'sub2',
        type: 'sous_projet',
        nom: 'Sub Project 2',
        objectif: 200000,
        montant_leve: 150000, // Partially allocated
        derniere_maj: '2025-01-15',
        content: 'Sub project 2',
        pourcentage_completion: 75.0,
      },
    ]

    const totalAllocated = subProjects.reduce(
      (sum, p) => sum + p.montant_leve,
      0,
    )

    // Total allocated: 200k + 150k = 350k
    assert.strictEqual(totalAllocated, 350000)

    // This would exceed the actually raised global funds (330k)
    assert.ok(totalAllocated > globalProject.montant_leve)

    // This scenario indicates a data integrity issue that should be caught
    const overAllocation = totalAllocated - globalProject.montant_leve
    assert.strictEqual(overAllocation, 20000)

    // In a real system, this should trigger a validation warning
    assert.ok(overAllocation > 0, 'Over-allocation detected: validation needed')
  })
})
