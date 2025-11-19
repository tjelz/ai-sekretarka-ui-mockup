"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const closeMenu = () => setIsMenuOpen(false)

  const scrollToSection = (sectionId: string) => {
    closeMenu()
    const element = document.getElementById(sectionId)
    if (element) {
      const offsetTop = element.offsetTop - 100
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      })
    }
  }

  return (
    <>
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled 
            ? "bg-white/80 backdrop-blur-md border-b border-slate-200/60 py-3 shadow-sm" 
            : "bg-transparent border-b border-transparent py-5"
        )}
      >
      <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
          {/* Logo */}
            <Link href="/" onClick={closeMenu} className="flex items-center gap-2 group">
              <div className="relative w-8 h-8 overflow-hidden rounded-lg">
            <Image
              src="/logo.png"
              alt="Yieldo"
                  fill
                  className="object-cover"
              priority
            />
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900 group-hover:text-primary transition-colors">Yieldo</span>
          </Link>

          {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <div className={cn(
                "flex items-center gap-6 px-6 py-2 rounded-full transition-all duration-300",
                isScrolled ? "bg-slate-100/50" : "bg-white/80 backdrop-blur-sm border border-slate-200/50 shadow-sm"
              )}>
                {['Produkty', 'O Nas', 'Rozwiązania'].map((item) => (
            <button
                    key={item}
                    onClick={() => scrollToSection(item.toLowerCase().replace(' ', '-'))}
                    className="text-sm font-medium text-slate-600 hover:text-primary transition-all relative group"
            >
                    {item}
                    <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </button>
                ))}
              </div>
              
            <Button
                onClick={() => scrollToSection('kontakt')}
                className={cn(
                  "transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 font-semibold",
                  isScrolled 
                    ? "bg-slate-900 hover:bg-slate-800 text-white" 
                    : "bg-primary hover:bg-blue-600 text-white"
                )}
              >
                Rozpocznij Teraz
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
              className="md:hidden p-2 rounded-full hover:bg-slate-100 transition-colors text-slate-900"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
                <X className="w-6 h-6" />
            ) : (
                <Menu className="w-6 h-6" />
            )}
          </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-white pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col gap-4">
               {['Produkty', 'O Nas', 'Rozwiązania'].map((item) => (
            <button
                    key={item}
                    onClick={() => scrollToSection(item.toLowerCase().replace(' ', '-'))}
                    className="text-2xl font-bold text-slate-900 text-left py-4 border-b border-slate-100"
            >
                    {item}
            </button>
                ))}
            <Button
                  onClick={() => scrollToSection('kontakt')}
              size="lg"
                  className="w-full mt-4 text-lg font-bold bg-primary text-white"
            >
              Skontaktuj się
            </Button>
          </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
