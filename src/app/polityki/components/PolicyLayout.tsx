import Link from "next/link";

export default function PolicyLayout({ children, title, lastUpdated }: { children: React.ReactNode, title: string, lastUpdated: string }) {
return (
  <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
    {/* Header */}
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Link
          href="/"
          className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Powrót do strony głównej
        </Link>
      </div>
    </header>
    {/* Content */}
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Title Section */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{title}</h1>
        <p className="text-sm text-gray-600">
          Ostatnia aktualizacja: <time dateTime={lastUpdated}>{lastUpdated}</time>
        </p>
      </div>
      {/* Policy Content */}
      <div className="prose prose-gray max-w-none">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          {children}
        </div>
      </div>
      {/* Footer Navigation */}
      <div className="mt-12 pt-8 border-t border-gray-200">
        <div className="flex flex-wrap gap-4 justify-center text-sm">
          <Link href="/polityki/prywatnosc" className="text-gray-600 hover:text-gray-900 transition-colors">
            Polityka Prywatności
          </Link>
          <span className="text-gray-300">•</span>
          <Link href="/polityki/cookies" className="text-gray-600 hover:text-gray-900 transition-colors">
            Polityka Cookies
          </Link>
          <span className="text-gray-300">•</span>
          <Link href="/polityki/regulamin" className="text-gray-600 hover:text-gray-900 transition-colors">
            Regulamin
          </Link>
          <span className="text-gray-300">•</span>
          <Link href="/polityki/ochrona-danych" className="text-gray-600 hover:text-gray-900 transition-colors">
            Ochrona Danych
          </Link>
          <span className="text-gray-300">•</span>
          <Link href="/polityki/zwroty" className="text-gray-600 hover:text-gray-900 transition-colors">
            Polityka Zwrotów
          </Link>
        </div>
      </div>

      {/* Contact Section */}
      <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Masz pytania?</h3>
        <p className="text-gray-700 mb-3">
          W sprawach dotyczących naszych polityk skontaktuj się z nami:
        </p>
        <div className="space-y-1 text-sm text-gray-600">
          <p><strong>Yieldo sp. z o.o.</strong></p>
          <p>ul. Drukarska 3, 30-348 Kraków, Polska</p>
          <p>E-mail: <a href="mailto:info.yieldo@gmail.com" className="text-blue-600 hover:text-blue-700">info.yieldo@gmail.com</a></p>
        </div>
      </div>
    </main>
  </div>
);
}
