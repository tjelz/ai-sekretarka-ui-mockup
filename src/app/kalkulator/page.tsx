"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import Script from "next/script"
import LostRevenueCalculator from "../components/LostRevenueCalculator"

export default function CalculatorPage() {

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50/30 to-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200/50 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link href="/">
              <Image
                src="/logo.png"
                alt="Yieldo"
                width={120}
                height={40}
                className="h-10 w-auto"
                priority
              />
            </Link>
            <div className="flex items-center gap-3 sm:gap-4">
              <Link href="/ai-sekretarka" className="hidden sm:block text-sm font-semibold text-gray-700 hover:text-[#007BFF] transition-colors">
                AI Sekretarka
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Calculator Component from Main Landing Page */}
      <div className="pt-4 pb-0">
        <LostRevenueCalculator showCta={false} compact={true} />
      </div>

      {/* Contact Form - Centered */}
      <section className="px-4 pb-16 pt-0 bg-gradient-to-t from-white to-gray-50">
        <div className="container mx-auto max-w-2xl">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
            <div
              style={{ width: '100%', minHeight: '450px' }}
              data-fillout-id="teKGg5hwJpus"
              data-fillout-embed-type="standard"
              data-fillout-inherit-parameters
              data-fillout-dynamic-resize
            />
            <Script
              src="https://server.fillout.com/embed/v1/"
              strategy="lazyOnload"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-8 bg-white">
        <div className="container mx-auto px-4 text-center">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="Yieldo"
              width={120}
              height={40}
              className="h-10 w-auto mx-auto mb-3"
            />
          </Link>
          <p className="text-gray-600 mb-2">
            Agencja AI dla Nowoczesnych Firm
          </p>
          <p className="text-sm text-gray-500">
            © 2025 Yieldo. Wszystkie prawa zastrzeżone.
          </p>
        </div>
      </footer>
    </div>
  )
}
