'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { DotsThreeOutline, X } from '@phosphor-icons/react/dist/ssr'

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen(prev => !prev)

  // Close on ESC key
  React.useEffect(() => {
    if (!isOpen) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [isOpen])

  return (
    <>
      <button
        className="md:hidden p-2 text-gray-700 hover:text-teal-600 transition-colors"
        onClick={toggleMenu}
        aria-label="Menu"
      >
        <DotsThreeOutline size={24} />
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex flex-col bg-white/95 backdrop-blur-sm md:hidden"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex justify-between items-center h-16 px-4 border-b border-gray-200">
            <Link
              href="/"
              className="text-2xl font-family-headings font-bold text-gray-900"
              onClick={() => setIsOpen(false)}
            >
              ACMSI
            </Link>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 text-gray-700 hover:text-teal-600 transition-colors"
              aria-label="Fermer"
              autoFocus
            >
              <X size={24} />
            </button>
          </div>
          <nav className="flex flex-col gap-6 p-6 text-lg font-medium">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="text-gray-700 hover:text-teal-600 transition-colors py-2"
            >
              Accueil
            </Link>
            <Link
              href="/a-propos"
              onClick={() => setIsOpen(false)}
              className="text-gray-700 hover:text-teal-600 transition-colors py-2"
            >
              À propos
            </Link>
            <Link
              href="/actualites"
              onClick={() => setIsOpen(false)}
              className="text-gray-700 hover:text-teal-600 transition-colors py-2"
            >
              Actualités
            </Link>
            <Link
              href="/donation"
              onClick={() => setIsOpen(false)}
              className="text-gray-700 hover:text-teal-600 transition-colors py-2"
            >
              Donation
            </Link>
            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="text-gray-700 hover:text-teal-600 transition-colors py-2"
            >
              Contact
            </Link>
          </nav>
        </div>
      )}
    </>
  )
}
