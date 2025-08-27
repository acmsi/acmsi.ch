interface ProgressBarProps {
  percentage: number
  raisedAmount: number
  targetAmount: number
  size?: 'sm' | 'md' | 'lg'
  showLabel?: boolean
  className?: string
}

export default function ProgressBar({ 
  percentage, 
  raisedAmount, 
  targetAmount, 
  size = 'md',
  showLabel = true,
  className = ''
}: ProgressBarProps) {
  const heightClasses = {
    sm: 'h-2',
    md: 'h-4',
    lg: 'h-6'
  }

  const textSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  }

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('fr-CH').format(amount)
  }

  return (
    <div className={className}>
      <div className={`bg-gray-200 rounded-full ${heightClasses[size]} mb-4 relative overflow-hidden`}>
        <div
          className={`${heightClasses[size]} bg-green-500 rounded-full transition-all duration-500`}
          style={{ width: `${Math.max(Math.min(percentage, 100), 1)}%` }}
        ></div>
        {showLabel && percentage > 15 && (
          <div className={`absolute inset-0 flex items-center justify-center text-white font-medium ${textSizeClasses[size]}`}>
            {percentage.toFixed(1)}%
          </div>
        )}
      </div>

      <div className={`flex justify-between items-center text-green-800 ${textSizeClasses[size]}`}>
        <span className="font-semibold">CHF {formatAmount(raisedAmount)}</span>
        <span>Objectif : CHF {formatAmount(targetAmount)}</span>
      </div>
    </div>
  )
}