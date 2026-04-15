'use client'

import { useApp } from '@/lib/app-context'
import { Button } from '@/components/ui/button'
import { Leaf, Menu, X } from 'lucide-react'
import { useState } from 'react'

export function Navbar() {
  const {
    currentPage,
    setCurrentPage,
    isLoggedIn,
    setIsLoggedIn,
    setCurrentUserEmail,
  } = useApp()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6">
        <button
          onClick={() => setCurrentPage('landing')}
          className="flex items-center gap-2 transition-opacity hover:opacity-80"
          aria-label="Go to homepage"
        >
          <Leaf className="h-6 w-6 text-primary" />
          <span className="font-serif text-xl text-foreground">
            Veda Cortex
          </span>
        </button>

        {/* Desktop nav */}
        <div className="hidden items-center gap-2 md:flex">
          <Button
            variant={currentPage === 'quiz' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setCurrentPage('quiz')}
          >
            Hair Quiz
          </Button>
          {isLoggedIn && (
            <Button
              variant={currentPage === 'dashboard' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setCurrentPage('dashboard')}
            >
              Dashboard
            </Button>
          )}
          {isLoggedIn ? (
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setIsLoggedIn(false)
                setCurrentUserEmail(null)
                setCurrentPage('landing')
              }}
            >
              Log Out
            </Button>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage('login')}
            >
              Log In
            </Button>
          )}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="flex flex-col gap-2 border-t border-border bg-background px-4 pb-4 pt-2 md:hidden">
          <Button
            variant="ghost"
            className="justify-start"
            onClick={() => {
              setCurrentPage('quiz')
              setMobileMenuOpen(false)
            }}
          >
            Hair Quiz
          </Button>
          {isLoggedIn && (
            <Button
              variant="ghost"
              className="justify-start"
              onClick={() => {
                setCurrentPage('dashboard')
                setMobileMenuOpen(false)
              }}
            >
              Dashboard
            </Button>
          )}
          {isLoggedIn ? (
            <Button
              variant="outline"
              className="justify-start"
              onClick={() => {
                setIsLoggedIn(false)
                setCurrentUserEmail(null)
                setCurrentPage('landing')
                setMobileMenuOpen(false)
              }}
            >
              Log Out
            </Button>
          ) : (
            <Button
              variant="outline"
              className="justify-start"
              onClick={() => {
                setCurrentPage('login')
                setMobileMenuOpen(false)
              }}
            >
              Log In
            </Button>
          )}
        </div>
      )}
    </header>
  )
}
