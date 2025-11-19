import React from 'react';
import { Metadata } from 'next';
import PolicyLayout from '../components/PolicyLayout';
import { formatPolicyContent, parsePolicyMetadata } from '@/lib/policies/format-policy';
import { PolicyStructuredData } from '@/lib/policies/structured-data';
import fs from 'fs';
import path from 'path';

const policyContent = fs.readFileSync(
  path.join(process.cwd(), 'docs/policies/cookie.txt'),
  'utf-8'
);

const policyMetadata = parsePolicyMetadata(policyContent);

export const metadata: Metadata = {
  title: 'Polityka Plików Cookies | Yieldo',
  description: 'Polityka cookies Yieldo - informacje o wykorzystaniu plików cookies i zarządzaniu zgodami.',
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://www.yieldo.pl/polityki/cookies',
  },
};

export default function CookiePolicyPage() {
  return (
    <>
      <PolicyStructuredData
        title="Polityka Plików Cookies"
        description="Polityka cookies Yieldo - informacje o wykorzystaniu plików cookies i zarządzaniu zgodami."
        url="https://www.yieldo.pl/polityki/cookies"
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
