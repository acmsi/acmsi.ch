'use client'

import { useState, useRef, useEffect } from 'react'
import { Info } from '@phosphor-icons/react'

interface InfoTooltipProps {
  text: string
  className?: string
}

export default function InfoTooltip({
  text,
  className = '',
}: InfoTooltipProps) {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLSpanElement>(null)

  // Close tooltip when clicking outside
  useEffect(() => {
    if (!isOpen) return

    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('touchstart', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('touchstart', handleClickOutside)
    }
  }, [isOpen])

  return (
    <span
      ref={containerRef}
      className={`relative inline-block group ${className}`}
    >
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center justify-center align-middle p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors cursor-help"
        aria-label={text}
        aria-expanded={isOpen}
      >
        <Info className="w-5 h-5" weight="regular" />
      </button>
      <span
        className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-gray-700 rounded transition-opacity pointer-events-none w-48 text-center ${
          isOpen ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
        }`}
        role="tooltip"
      >
        {text}
      </span>
    </span>
  )
}
