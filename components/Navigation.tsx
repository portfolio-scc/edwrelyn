'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { AuthModal, useAuth } from './AuthModal'

const Navigation = () => {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const { user, logOut } = useAuth()
  
  const links = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/life-at-scc', label: 'Life at SCC' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contact' },
  ]

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const closeMenu = () => setIsMenuOpen(false)

  return (
    <nav className="sticky top-0 border-b border-neutral-800 bg-black z-50">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link 
            href="/" 
            className="text-xl font-bold text-white hover:text-neutral-300 transition-colors"
            onClick={closeMenu}
          >
            EB
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-8 items-center">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? 'text-white underline underline-offset-4'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
            
            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-xs text-neutral-400">{user.email}</span>
                <button
                  onClick={logOut}
                  className="text-sm px-4 py-1 border border-neutral-600 text-neutral-300 hover:border-white hover:text-white transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowAuthModal(true)}
                className="text-sm px-4 py-1 bg-white text-black hover:bg-neutral-200 transition-colors"
              >
                Login
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-neutral-700 pt-4">
            <div className="flex flex-col gap-4">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  className={`text-sm font-medium transition-colors ${
                    pathname === link.href
                      ? 'text-white underline underline-offset-4'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              
              {user ? (
                <>
                  <span className="text-xs text-neutral-400">{user.email}</span>
                  <button
                    onClick={() => {
                      logOut()
                      closeMenu()
                    }}
                    className="text-sm px-4 py-2 border border-neutral-600 text-neutral-300 hover:border-white hover:text-white transition-colors text-left"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    setShowAuthModal(true)
                    closeMenu()
                  }}
                  className="text-sm px-4 py-2 bg-white text-black hover:bg-neutral-200 transition-colors text-left"
                >
                  Login
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {showAuthModal && (
        <AuthModal
          onClose={() => setShowAuthModal(false)}
          onSuccess={() => setShowAuthModal(false)}
        />
      )}
    </nav>
  )
}

export default Navigation
