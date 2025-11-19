// Server Component wrapper for SEO
import OrganizationSchema from '@/app/components/seo/OrganizationSchema'
import { ReactNode } from 'react'

export default function SEOWrapper({ children }: { children: ReactNode }) {
  return (
    <>
      <OrganizationSchema />
      {children}
    </>
  )
}
