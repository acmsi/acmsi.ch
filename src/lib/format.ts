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

/**
 * Formate un pourcentage selon les standards suisses
 * Utilise une espace fine comme séparateur et 1 décimale
 */
export function formatPercentage(value: number): string {
  return new Intl.NumberFormat('fr-CH', {
    style: 'percent',
    minimumFractionDigits: 0,
    maximumFractionDigits: 1,
  }).format(value / 100)
}
