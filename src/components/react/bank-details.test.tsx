import { test, expect } from '@playwright/experimental-ct-react'
import BankDetails from '@/components/react/bank-details'

// Expected bank details - these are the canonical values that should be displayed
const EXPECTED_BANK_DETAILS = {
  iban: 'CH97 0079 0042 4236 1827 8',
  swift: 'KBBECH22',
  beneficiary: 'Association Culturelle Musulmane de Saint-Imier',
  address: 'Rue de la Clef 45, 2610 St-Imier',
}

test.describe('BankDetails Component', () => {
  test('displays correct IBAN', async ({ mount }) => {
    const component = await mount(<BankDetails message="Test message" />)

    await expect(component.getByText('IBAN :')).toBeVisible()
    await expect(component.getByText(EXPECTED_BANK_DETAILS.iban)).toBeVisible()
  })

  test('displays correct SWIFT/BIC code', async ({ mount }) => {
    const component = await mount(<BankDetails message="Test message" />)

    await expect(component.getByText('SWIFT/BIC :')).toBeVisible()
    await expect(
      component.getByText(EXPECTED_BANK_DETAILS.swift, { exact: true }),
    ).toBeVisible()
  })

  test('displays correct beneficiary', async ({ mount }) => {
    const component = await mount(<BankDetails message="Test message" />)

    await expect(component.getByText('Bénéficiaire :')).toBeVisible()
    await expect(
      component.getByText(EXPECTED_BANK_DETAILS.beneficiary),
    ).toBeVisible()
  })

  test('displays correct address', async ({ mount }) => {
    const component = await mount(<BankDetails message="Test message" />)

    await expect(component.getByText('Adresse :')).toBeVisible()
    await expect(
      component.getByText(EXPECTED_BANK_DETAILS.address),
    ).toBeVisible()
  })

  test('displays the provided message with default label', async ({
    mount,
  }) => {
    const component = await mount(<BankDetails message="DON-2024" />)

    await expect(component.getByText('Message :')).toBeVisible()
    await expect(component.getByText('DON-2024')).toBeVisible()
  })

  test('displays custom message label when provided', async ({ mount }) => {
    const component = await mount(
      <BankDetails message="COTISATION-2024" messageLabel="Communication" />,
    )

    await expect(component.getByText('Communication :')).toBeVisible()
    await expect(component.getByText('COTISATION-2024')).toBeVisible()
  })

  test('renders all copy buttons', async ({ mount }) => {
    const component = await mount(<BankDetails message="Test" />)

    // Should have 5 copy buttons: IBAN, SWIFT, beneficiary, address, message
    const copyButtons = component.getByRole('button', { name: /^Copier / })
    await expect(copyButtons).toHaveCount(5)
  })

  test('displays info tooltip for SWIFT code format', async ({ mount }) => {
    const component = await mount(<BankDetails message="Test" />)

    await expect(
      component.getByText(
        'Si votre banque demande 11 caractères, ajoutez XXX à la fin : KBBECH22XXX',
      ),
    ).toBeAttached()
  })

  test('applies custom IBAN color class', async ({ mount }) => {
    const component = await mount(
      <BankDetails message="Test" ibanColorClass="text-blue-600" />,
    )

    const ibanValue = component.locator('dd').filter({
      hasText: EXPECTED_BANK_DETAILS.iban,
    })
    await expect(ibanValue).toHaveClass(/text-blue-600/)
  })

  test('uses default green IBAN color when not specified', async ({
    mount,
  }) => {
    const component = await mount(<BankDetails message="Test" />)

    const ibanValue = component.locator('dd').filter({
      hasText: EXPECTED_BANK_DETAILS.iban,
    })
    await expect(ibanValue).toHaveClass(/text-green-600/)
  })
})
