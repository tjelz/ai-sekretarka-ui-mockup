import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Polityki i Regulaminy | Yieldo',
  description: 'Polityki prywatności, regulaminy i zasady korzystania z usług Yieldo.',
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://www.yieldo.pl/polityki',
  },
};

const policies = [
  {
    title: 'Polityka Prywatności',
    href: '/polityki/prywatnosc',
    description: 'Zasady przetwarzania danych osobowych zgodnie z RODO',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
  },
  {
    title: 'Polityka Cookies',
    href: '/polityki/cookies',
    description: 'Informacje o wykorzystaniu plików cookies i zarządzaniu zgodami',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    title: 'Polityka Ochrony Danych',
    href: '/polityki/ochrona-danych',
    description: 'Szczegółowe zasady ochrony i zabezpieczania danych osobowych',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    title: 'Regulamin Świadczenia Usług',
    href: '/polityki/regulamin',
    description: 'Warunki korzystania z platformy i zasady współpracy',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    title: 'Polityka Zwrotów',
    href: '/polityki/zwroty',
    description: 'Zasady odstąpienia od umowy, anulowania subskrypcji i zwrotów płatności',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
      </svg>
    ),
  },
];

export default function PoliciesIndexPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
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

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Polityki i Regulaminy
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Znajdź wszystkie informacje dotyczące prywatności, bezpieczeństwa danych i warunków korzystania z usług Yieldo.
          </p>
        </div>

        {/* Policy Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {policies.map((policy) => (
            <Link
              key={policy.href}
              href={policy.href}
              className="group bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg hover:border-blue-500 transition-all duration-200"
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  {policy.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {policy.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {policy.description}
                  </p>
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm text-blue-600 group-hover:text-blue-700">
                Czytaj więcej
                <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>

        {/* Contact Section */}
        <div className="bg-blue-50 rounded-lg border border-blue-100 p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Masz pytania dotyczące naszych polityk?
          </h2>
          <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
            Jeśli masz jakiekolwiek pytania dotyczące przetwarzania danych osobowych, prywatności lub warunków korzystania z naszych usług, skontaktuj się z nami.
          </p>
          <div className="space-y-2 text-sm text-gray-600">
            <p><strong className="text-gray-900">Yieldo sp. z o.o.</strong></p>
            <p>ul. Drukarska 3, 30-348 Kraków, Polska</p>
            <p>
              E-mail: <a href="mailto:info.yieldo@gmail.com" className="text-blue-600 hover:text-blue-700 font-medium">info.yieldo@gmail.com</a>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
