import React from 'react';
import { Metadata } from 'next';
import PolicyLayout from '../components/PolicyLayout';
import { formatPolicyContent, parsePolicyMetadata } from '@/lib/policies/format-policy';
import { PolicyStructuredData } from '@/lib/policies/structured-data';
import fs from 'fs';
import path from 'path';

const policyContent = fs.readFileSync(
  path.join(process.cwd(), 'docs/policies/tos.txt'),
  'utf-8'
);

const policyMetadata = parsePolicyMetadata(policyContent);

export const metadata: Metadata = {
  title: 'Regulamin Świadczenia Usług | Yieldo',
  description: 'Regulamin świadczenia usług Yieldo - warunki korzystania z platformy i zasady współpracy.',
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://www.yieldo.pl/polityki/regulamin',
  },
};

export default function TermsOfServicePage() {
  return (
    <>
      <PolicyStructuredData
        title="Regulamin Świadczenia Usług"
        description="Regulamin świadczenia usług Yieldo - warunki korzystania z platformy i zasady współpracy."
        url="https://www.yieldo.pl/polityki/regulamin"
        lastModified="2025-10-21"
        policyType="TermsOfService"
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
