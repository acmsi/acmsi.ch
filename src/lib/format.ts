/**
 * Formate un montant selon les standards suisses
 */
export function formatAmount(amount: number, currency: 'CHF' = 'CHF'): string {
  return new Intl.NumberFormat('fr-CH', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

