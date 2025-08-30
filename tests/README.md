# Tests Documentation

This directory contains comprehensive tests for the ACMSI website, focusing on project budget calculations and content management.

## Test Files

### `project-calculations.test.ts`

**Purpose**: Unit tests documenting the core business logic for project budget calculations.

**Key Points Tested**:

- **Critical Fix**: Documents the correction to `total_leve` calculation in `getProjectSummary()`
- **Before**: `total_leve = global.montant_leve + sum(sub_projects.montant_leve)` ❌ (double-counting)
- **After**: `total_leve = global.montant_leve` ✅ (correct logic)
- Sub-projects represent allocated portions of the global budget, not additional funds
- Percentage calculations and project filtering functions
- Priority sorting and date handling

### `project-validation.test.ts`

**Purpose**: Edge cases and data validation tests for project management.

**Scenarios Covered**:

- Zero/negative budget values
- Missing or invalid dates
- Projects without priority values
- Over-funded scenarios (>100% completion)
- Empty project arrays
- Budget allocation validation (preventing over-allocation)
- Precision in percentage calculations

### `date-formatting.test.ts` (existing)

**Purpose**: Tests for date formatting functionality with project-specific display preferences.

## Business Logic Documentation

### Project Budget Structure

```
Global Project (projet_global):
├── objectif: CHF 500,000 (total fundraising goal)
├── montant_leve: CHF 300,000 (actually raised from donors)
└── Sub-projects (sous_projet):
    ├── Fondations: CHF 80,000 allocated (from the 300k raised)
    ├── Structure: CHF 120,000 allocated (from the 300k raised)
    └── Finitions: CHF 0 allocated (waiting for more funds)
```

### Key Correction

The previous logic incorrectly calculated:

- `total_leve = 300,000 + 80,000 + 120,000 = 500,000` (showing 100% completion)

The corrected logic properly calculates:

- `total_leve = 300,000` (showing 60% completion: 300k/500k)

This prevents the system from showing false completion percentages when sub-projects are merely allocated portions of the actually raised global funds.

## Running Tests

```bash
# Run all unit tests
npm run test:unit

# Run all tests (unit + e2e)
npm run test
```

## Test Philosophy

These tests serve as:

1. **Documentation**: Clear examples of expected behavior
2. **Regression Prevention**: Ensures the budget calculation fix remains correct
3. **Validation**: Handles edge cases and data integrity issues
4. **Business Logic Verification**: Confirms the financial model is sound
