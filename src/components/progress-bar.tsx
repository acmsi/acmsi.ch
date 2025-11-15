import { formatAmount, formatPercentage } from '@/lib/format'

interface ProgressBarProps {
  percentage: number
  variant?: 'thin' | 'medium' | 'thick'
  allocatedAmount?: number
  budgetAmount?: number
  className?: string
}

export default function ProgressBar({
  percentage,
  variant = 'medium',
  allocatedAmount = 0,
  budgetAmount = 0,
  className = '',
}: ProgressBarProps) {
  const variantStyles = {
    thin: {
      height: 'h-2',
      textSize: 'text-xs',
    },
    medium: {
      height: 'h-4',
      textSize: 'text-sm',
    },
    thick: {
      height: 'h-6',
      textSize: 'text-sm',
    },
  }

  const style = variantStyles[variant]
  const isOverBudget = percentage > 100
  const budgetPercentage = Math.min(percentage, 100)
  const overrunPercentage = isOverBudget ? percentage - 100 : 0
  const overrunAmount = isOverBudget ? allocatedAmount - budgetAmount : 0

  return (
    <div className={className}>
      {/* Progress bar container */}
      <div className="relative">
        {/* Excédent amount above bar (if applicable) */}
        {isOverBudget && overrunAmount > 0 && (
          <div className="absolute -top-6 right-0 text-amber-600 font-medium text-sm">
            +{formatAmount(overrunAmount)}
          </div>
        )}

        {/* Main progress bar */}
        <div
          className={`bg-gray-200 rounded-full ${style.height} relative overflow-hidden flex`}
          role="progressbar"
          aria-valuenow={Math.round(percentage)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={
            isOverBudget && budgetAmount > 0
              ? `Progression : ${formatPercentage(percentage)}, dépassement de budget de ${formatAmount(overrunAmount)} (+${formatPercentage(overrunPercentage)})`
              : `Progression : ${formatPercentage(percentage)} ${budgetAmount > 0 ? `sur un budget de ${formatAmount(budgetAmount)}` : ''}`
          }
        >
          {isOverBudget ? (
            <>
              {/* Budget portion (green) - proportional */}
              <div
                className={`${style.height} bg-green-500 transition-all duration-500 flex items-center justify-end px-2 relative overflow-hidden`}
                style={{ width: `${(100 / percentage) * 100}%` }}
                title={
                  budgetAmount > 0 && allocatedAmount > 0
                    ? `${formatAmount(allocatedAmount)} alloué, ${formatPercentage(percentage)} du budget`
                    : undefined
                }
              >
                {/* Budget percentage text */}
                {variant === 'thick' && (
                  <div
                    className={`text-white font-medium text-nowrap overflow-hidden text-ellipsis ${style.textSize}`}
                  >
                    {formatPercentage(100)}
                  </div>
                )}
              </div>

              {/* Overrun portion (amber/gold) - proportional */}
              <div
                className={`${style.height} bg-amber-500 rounded-r-full transition-all duration-500 flex items-center px-2 justify-center relative overflow-hidden`}
                style={{ width: `${(overrunPercentage / percentage) * 100}%` }}
                title={
                  overrunAmount > 0
                    ? `Dépassement : ${formatAmount(overrunAmount)} (+${formatPercentage(overrunPercentage)})`
                    : undefined
                }
              >
                {/* Overrun percentage text */}
                {variant === 'thick' && overrunPercentage > 10 && (
                  <div
                    className={`text-white font-medium text-ellipsis overflow-hidden text-nowrap ${style.textSize}`}
                  >
                    +{formatPercentage(overrunPercentage)}
                  </div>
                )}
              </div>
            </>
          ) : (
            /* Normal progress bar (no overrun) */
            <div
              className={`${style.height} bg-green-500 rounded-full transition-all duration-500 relative`}
              style={{ width: `${Math.max(budgetPercentage, 1)}%` }}
              title={
                budgetAmount > 0 && allocatedAmount > 0
                  ? `${formatAmount(allocatedAmount)} alloué, ${formatPercentage(percentage)} du budget`
                  : undefined
              }
            >
              {/* Percentage text inside green bar */}
              {percentage > 15 && variant === 'thick' && (
                <div
                  className={`absolute inset-0 flex items-center ${percentage >= 100 ? 'justify-center' : 'justify-end pr-2'} text-white font-medium ${style.textSize}`}
                >
                  {formatPercentage(percentage)}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
