'use client'

import { useState } from 'react'
import { Copy, Check } from '@phosphor-icons/react'

interface CopyButtonProps {
  text: string
  label?: string
  className?: string
}

export default function CopyButton({
  text,
  label,
  className = '',
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy text:', err)
    }
  }

  const ariaLabel = label
    ? copied
      ? `${label} copié`
      : `Copier ${label}`
    : copied
      ? 'Copié'
      : 'Copier'

  const tooltipText = copied ? 'Copié !' : 'Copier'

  return (
    <span className="relative inline-block group">
      <button
        onClick={handleCopy}
        className={`inline-flex items-center justify-center align-middle p-2 rounded-lg transition-all hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 ${className}`}
        aria-label={ariaLabel}
        type="button"
      >
        {copied ? (
          <Check className="w-5 h-5 text-green-600" weight="bold" />
        ) : (
          <Copy className="w-5 h-5 text-gray-600" weight="regular" />
        )}
      </button>
      <span
        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-700 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap"
        role="tooltip"
      >
        {tooltipText}
      </span>
    </span>
  )
}
