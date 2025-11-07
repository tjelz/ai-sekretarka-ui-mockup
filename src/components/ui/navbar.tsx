"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Menu, X, Calculator, LogIn } from "lucide-react"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // TEMPORARY: Feature flag to disable authentication UI
  // Authentication code is preserved, just hidden from UI
  // To re-enable: set NEXT_PUBLIC_DISABLE_AUTH=false in .env.local
  const isAuthDisabled = process.env.NEXT_PUBLIC_DISABLE_AUTH === 'true'

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const closeMenu = () => setIsMenuOpen(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" onClick={closeMenu} className="flex items-center">
            <Image
              src="/logo.png"
              alt="Yieldo"
              width={100}
              height={33}
              className="h-8 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/kalkulator">
              <Button
                size="sm"
                variant="outline"
                className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-2 rounded-lg font-semibold transition-all"
              >
                <Calculator className="w-4 h-4 mr-2" />
                Kalkulator
              </Button>
            </Link>
            {/* TEMPORARY: Auth button hidden via feature flag */}
            {!isAuthDisabled && (
              <Link href="/login">
                <Button
                  size="sm"
                  className="bg-[#007BFF] hover:bg-[#0056b3] text-white px-6 py-2 rounded-lg font-semibold transition-all"
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  Zaloguj
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4 space-y-3 animate-in slide-in-from-top-2 duration-200">
            <Link href="/kalkulator" onClick={closeMenu} className="block">
              <Button
                size="lg"
                variant="outline"
                className="w-full border-2 border-gray-300 text-gray-700 hover:bg-gray-50 py-3 rounded-lg font-semibold transition-all justify-start"
              >
                <Calculator className="w-5 h-5 mr-3" />
                Kalkulator
              </Button>
            </Link>
            {/* TEMPORARY: Auth button hidden via feature flag */}
            {!isAuthDisabled && (
              <Link href="/login" onClick={closeMenu} className="block">
                <Button
                  size="lg"
                  className="w-full bg-[#007BFF] hover:bg-[#0056b3] text-white py-3 rounded-lg font-semibold transition-all justify-start"
                >
                  <LogIn className="w-5 h-5 mr-3" />
                  Zaloguj
                </Button>
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}
