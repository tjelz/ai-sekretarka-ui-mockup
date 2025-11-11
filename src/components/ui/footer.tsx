import Link from "next/link"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="border-t border-gray-200 py-12 bg-white mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 max-w-4xl mx-auto">
          {/* Left: Company Info */}
          <div>
            <Link href="/" className="inline-block mb-4">
              <Image
                src="/logo.png"
                alt="Yieldo Logo"
                width={120}
                height={40}
              />
            </Link>
            <p className="text-gray-600 mb-4 font-medium">
              Yieldo - Agencja AI dla Nowoczesnych Firm
            </p>
            <div className="text-sm text-gray-600 space-y-1">
              <p className="font-semibold text-gray-900">Yieldo Sp. z o.o.</p>
              <p>E-mail: <a href="mailto:info.yieldo@gmail.com" className="text-blue-600 hover:underline">info.yieldo@gmail.com</a></p>
            </div>
          </div>

          {/* Right: Products and Legal */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {/* Products */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Produkty</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/ai-sekretarka" className="text-gray-600 hover:text-blue-600 transition-colors">
                    AI Sekretarka
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Informacje Prawne</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/polityki/prywatnosc" className="text-gray-600 hover:text-blue-600 transition-colors">
                    Polityka Prywatności
                  </Link>
                </li>
                <li>
                  <Link href="/polityki/regulamin" className="text-gray-600 hover:text-blue-600 transition-colors">
                    Regulamin
                  </Link>
                </li>
                <li>
                  <Link href="/polityki/cookies" className="text-gray-600 hover:text-blue-600 transition-colors">
                    Polityka Cookies
                  </Link>
                </li>
                <li>
                  <Link href="/polityki/ochrona-danych" className="text-gray-600 hover:text-blue-600 transition-colors">
                    Ochrona Danych
                  </Link>
                </li>
                <li>
                  <Link href="/polityki/zwroty" className="text-gray-600 hover:text-blue-600 transition-colors">
                    Polityka Zwrotów
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center pt-6 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            © 2025 Yieldo. Wszystkie prawa zastrzeżone.
          </p>
        </div>
      </div>
    </footer>
  )
}
