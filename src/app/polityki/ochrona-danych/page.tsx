import React from 'react';
import { Metadata } from 'next';
import PolicyLayout from '../components/PolicyLayout';
import { formatPolicyContent, parsePolicyMetadata } from '@/lib/policies/format-policy';
import { PolicyStructuredData } from '@/lib/policies/structured-data';
import fs from 'fs';
import path from 'path';

const policyContent = fs.readFileSync(
  path.join(process.cwd(), 'docs/policies/data-protection.txt'),
  'utf-8'
);

const policyMetadata = parsePolicyMetadata(policyContent);

export const metadata: Metadata = {
  title: 'Polityka Ochrony Danych Osobowych | Yieldo',
  description: 'Polityka ochrony danych osobowych Yieldo - zasady przetwarzania i zabezpieczania danych zgodnie z RODO.',
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://www.yieldo.pl/polityki/ochrona-danych',
  },
};

export default function DataProtectionPolicyPage() {
  return (
    <>
      <PolicyStructuredData
        title="Polityka Ochrony Danych Osobowych"
        description="Polityka ochrony danych osobowych Yieldo - zasady przetwarzania i zabezpieczania danych zgodnie z RODO."
        url="https://www.yieldo.pl/polityki/ochrona-danych"
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
