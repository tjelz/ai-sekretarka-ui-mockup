import React from 'react';
import { Metadata } from 'next';
import PolicyLayout from '../components/PolicyLayout';
import { formatPolicyContent, parsePolicyMetadata } from '@/lib/policies/format-policy';
import { PolicyStructuredData } from '@/lib/policies/structured-data';
import fs from 'fs';
import path from 'path';

const policyContent = fs.readFileSync(
  path.join(process.cwd(), 'docs/policies/privacy.txt'),
  'utf-8'
);

const policyMetadata = parsePolicyMetadata(policyContent);

export const metadata: Metadata = {
  title: 'Polityka Prywatności | Yieldo',
  description: 'Polityka prywatności Yieldo sp. z o.o. - zasady przetwarzania danych osobowych zgodnie z RODO.',
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://www.yieldo.pl/polityki/prywatnosc',
  },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <PolicyStructuredData
        title="Polityka Prywatności"
        description="Polityka prywatności Yieldo sp. z o.o. - zasady przetwarzania danych osobowych zgodnie z RODO."
        url="https://www.yieldo.pl/polityki/prywatnosc"
        lastModified="2025-10-21"
        policyType="PrivacyPolicy"
      />
      <PolicyLayout
        title={policyMetadata.title}
        lastUpdated={policyMetadata.lastUpdated}
      >
        {formatPolicyContent(policyContent)}
      </PolicyLayout>
    </>
  );
}
