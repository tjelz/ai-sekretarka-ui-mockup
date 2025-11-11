"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const closeMenu = () => setIsMenuOpen(false)

  const scrollToSection = (sectionId: string) => {
    closeMenu()
    const element = document.getElementById(sectionId)
    if (element) {
      const offsetTop = element.offsetTop - 80 // Account for fixed navbar height
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      })
    }
  }

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
          <div className="hidden md:flex items-center gap-6">
            <button
              onClick={() => scrollToSection('produkty')}
              className="text-gray-700 hover:text-[#007BFF] font-medium transition-colors"
            >
              Produkty
            </button>
            <button
              onClick={() => scrollToSection('o-nas')}
              className="text-gray-700 hover:text-[#007BFF] font-medium transition-colors"
            >
              O Nas
            </button>
            <button
              onClick={() => scrollToSection('rozwiazania')}
              className="text-gray-700 hover:text-[#007BFF] font-medium transition-colors"
            >
              Rozwiązania
            </button>
            <Button
              onClick={() => scrollToSection('rozwiazania')}
              size="sm"
              className="bg-[#007BFF] hover:bg-[#0056b3] text-white px-6 py-2 rounded-lg font-semibold transition-all"
            >
              Skontaktuj się
            </Button>
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
          <div className="md:hidden border-t border-gray-200 py-4 space-y-2 animate-in slide-in-from-top-2 duration-200">
            <button
              onClick={() => scrollToSection('produkty')}
              className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg font-medium transition-colors"
            >
              Produkty
            </button>
            <button
              onClick={() => scrollToSection('o-nas')}
              className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg font-medium transition-colors"
            >
              O Nas
            </button>
            <button
              onClick={() => scrollToSection('rozwiazania')}
              className="block w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg font-medium transition-colors"
            >
              Rozwiązania
            </button>
            <Button
              onClick={() => scrollToSection('rozwiazania')}
              size="lg"
              className="w-full bg-[#007BFF] hover:bg-[#0056b3] text-white py-3 rounded-lg font-semibold transition-all"
            >
              Skontaktuj się
            </Button>
          </div>
        )}
      </div>
    </nav>
  )
}
