interface ProgressBarProps {
  percentage: number
  variant?: 'thin' | 'medium' | 'thick'
  className?: string
}

export default function ProgressBar({
  percentage,
  variant = 'medium',
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

  return (
    <div className={className}>
      {/* Progress bar */}
      <div className={`bg-gray-200 rounded-full ${style.height} mb-2 relative overflow-hidden`}>
        <div
          className={`${style.height} bg-green-500 rounded-full transition-all duration-500`}
          style={{ width: `${Math.max(Math.min(percentage, 100), 1)}%` }}
        ></div>
        {percentage > 15 && variant === 'thick' && (
          <div
            className={`absolute inset-0 flex items-center ${percentage >= 100 ? 'justify-center' : 'justify-end pr-2'} text-white font-medium ${style.textSize}`}
            style={{ width: `${Math.max(Math.min(percentage, 100), 1)}%` }}
          >
            {percentage % 1 === 0 ? percentage.toFixed(0) : percentage.toFixed(1)}%
          </div>
        )}
      </div>
    </div>
  )
}
