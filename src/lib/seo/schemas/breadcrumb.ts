import { BreadcrumbList, WithContext } from 'schema-dts';

export function getBreadcrumbSchema(
  items: Array<{ name: string; url: string }>
): WithContext<BreadcrumbList> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": `https://www.yieldo.pl${item.url}`
    }))
  };
}

// Pre-defined breadcrumbs for common pages
export const aiSekretrarkaBreadcrumb = getBreadcrumbSchema([
  { name: "Strona główna", url: "/" },
  { name: "AI Sekretarka", url: "/ai-sekretarka" }
]);

export const calculatorBreadcrumb = getBreadcrumbSchema([
  { name: "Strona główna", url: "/" },
  { name: "Kalkulator", url: "/kalkulator" }
]);

export const digitalPresenceBreadcrumb = getBreadcrumbSchema([
  { name: "Strona główna", url: "/" },
  { name: "Obecność Online", url: "/digital-presence" }
]);
