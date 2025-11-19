// SEO Components Index
// Centralized exports for all structured data schema components

export { default as OrganizationSchema } from './OrganizationSchema'
export type { OrganizationSchemaProps } from './OrganizationSchema'

export { default as ProductSchema } from './ProductSchema'
export type { ProductSchemaProps, ProductOffer } from './ProductSchema'

export { default as FAQSchema } from './FAQSchema'
export type { FAQSchemaProps, FAQItem } from './FAQSchema'

export { default as BreadcrumbSchema } from './BreadcrumbSchema'
export type { BreadcrumbSchemaProps, BreadcrumbItem } from './BreadcrumbSchema'

export { default as LocalBusinessSchema } from './LocalBusinessSchema'
export type { LocalBusinessSchemaProps } from './LocalBusinessSchema'

export { default as WebPageSchema } from './WebPageSchema'
export type { WebPageSchemaProps } from './WebPageSchema'

// Usage Example:
// import { ProductSchema, FAQSchema } from '@/components/seo'
