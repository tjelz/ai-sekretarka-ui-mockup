import React from 'react';
import { Metadata } from 'next';
import PolicyLayout from '@/components/policies/PolicyLayout';
import { formatPolicyContent, parsePolicyMetadata } from '@/lib/policies/format-policy';
import { PolicyStructuredData } from '@/lib/policies/structured-data';
import fs from 'fs';
import path from 'path';

const policyContent = fs.readFileSync(
  path.join(process.cwd(), 'docs/policies/refund.txt'),
  'utf-8'
);

const policyMetadata = parsePolicyMetadata(policyContent);

export const metadata: Metadata = {
  title: 'Polityka Zwrotów | Yieldo',
  description: 'Polityka zwrotów Yieldo - zasady odstąpienia od umowy, anulowania subskrypcji i zwrotów płatności.',
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://www.yieldo.pl/polityki/zwroty',
  },
};

export default function RefundPolicyPage() {
  return (
    <>
      <PolicyStructuredData
        title="Polityka Zwrotów"
        description="Polityka zwrotów Yieldo - zasady odstąpienia od umowy, anulowania subskrypcji i zwrotów płatności."
        url="https://www.yieldo.pl/polityki/zwroty"
        lastModified="2025-10-21"
        policyType="RefundPolicy"
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
