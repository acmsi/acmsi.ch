'use client'

import { useState, useEffect, useCallback } from 'react'
import { Eye, EyeSlash, Lock } from '@phosphor-icons/react'

// ⚠️ SECURITY WARNING:
// This authentication is CLIENT-SIDE ONLY and provides basic protection.
// Credentials using NEXT_PUBLIC_* are visible in the client bundle.
// This is acceptable for temporary committee review but should NOT be used
// for sensitive data protection. Consider server-side auth for production.

const AUTH_STORAGE_KEY = 'acmsi_auth'
const SESSION_DURATION = 24 * 60 * 60 * 1000 // 24 hours in milliseconds

interface AuthState {
  isAuthenticated: boolean
  timestamp: number
}

interface AuthGuardProps {
  children: React.ReactNode
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validUsername = process.env.NEXT_PUBLIC_AUTH_USERNAME || 'acmsi'
  const validPassword = process.env.NEXT_PUBLIC_AUTH_PASSWORD || 'comite2024'

  // Bypass authentication in development, test, and CI environments
  const shouldBypassAuth =
    process.env.NODE_ENV === 'development' ||
    process.env.NODE_ENV === 'test' ||
    process.env.CI === 'true' ||
    process.env.NEXT_PUBLIC_BYPASS_AUTH === 'true'

  const checkAuthStatus = useCallback(() => {
    try {
      const stored = localStorage.getItem(AUTH_STORAGE_KEY)
      if (stored) {
        const authState: AuthState = JSON.parse(stored)
        const isExpired = Date.now() - authState.timestamp > SESSION_DURATION

        if (authState.isAuthenticated && !isExpired) {
          setIsAuthenticated(true)
        } else {
          localStorage.removeItem(AUTH_STORAGE_KEY)
        }
      }
    } catch {
      localStorage.removeItem(AUTH_STORAGE_KEY)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    if (!shouldBypassAuth) {
      checkAuthStatus()
    }
  }, [shouldBypassAuth, checkAuthStatus])

  // If we should bypass auth, render children directly
  if (shouldBypassAuth) {
    return <>{children}</>
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError('')

    // Simulate a small delay for better UX
    await new Promise(resolve => setTimeout(resolve, 500))

    if (username === validUsername && password === validPassword) {
      const authState: AuthState = {
        isAuthenticated: true,
        timestamp: Date.now(),
      }
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authState))
      setIsAuthenticated(true)
    } else {
      setError("Nom d'utilisateur ou mot de passe incorrect")
    }

    setIsSubmitting(false)
  }

  const handleLogout = () => {
    localStorage.removeItem(AUTH_STORAGE_KEY)
    setIsAuthenticated(false)
    setUsername('')
    setPassword('')
    setError('')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Chargement...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 to-blue-50">
        <div className="max-w-md w-full mx-4">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-center mb-8">
              <div className="mx-auto h-12 w-12 bg-teal-100 rounded-full flex items-center justify-center mb-4">
                <Lock className="h-6 w-6 text-teal-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Accès Restreint
              </h1>
              <p className="text-gray-600">
                Ce site est actuellement en cours de révision par le comité de
                l&apos;association.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Nom d&apos;utilisateur
                </label>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                  required
                  autoComplete="username"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Mot de passe
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                    required
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeSlash className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>

              {error && (
                <div className="text-red-600 text-sm text-center bg-red-50 py-2 px-3 rounded-md">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Connexion...
                  </>
                ) : (
                  'Se connecter'
                )}
              </button>
            </form>

            <div className="mt-6 text-center text-sm text-gray-500">
              <p>Accès réservé aux membres du comité</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      {children}
      <button
        onClick={handleLogout}
        className="fixed bottom-4 right-4 bg-gray-800 hover:bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium shadow-lg transition-colors z-50"
      >
        Déconnexion
      </button>
    </>
  )
}
