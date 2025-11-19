import Script from 'next/script';
import { WithContext, Thing } from 'schema-dts';

interface StructuredDataProps {
  data: WithContext<Thing>;
}

/**
 * StructuredData component for embedding JSON-LD schema markup
 *
 * @example
 * import { StructuredData } from '@/components/seo/StructuredData';
 * import { getOrganizationSchema } from '@/lib/seo/schemas/organization';
 *
 * <StructuredData data={getOrganizationSchema()} />
 */
export function StructuredData({ data }: StructuredDataProps) {
  return (
    <Script
      id={`structured-data-${data['@type']}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
      strategy="beforeInteractive"
    />
  );
}
