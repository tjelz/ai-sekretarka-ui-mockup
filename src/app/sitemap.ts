import { MetadataRoute } from 'next';

const baseUrl = 'https://www.yieldo.pl';

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date();

  // Static routes with high priority
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/ai-sekretarka`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/kalkulator`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/digital-presence`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/ai-sekretarka-demo`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.6,
    },
  ];

  // Policy pages (legal, important for compliance)
  const policyRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/polityki`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/polityki/prywatnosc`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/polityki/regulamin`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/polityki/cookies`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/polityki/ochrona-danych`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/polityki/zwroty`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ];

  // Dashboard routes (authenticated, lower priority)
  const dashboardRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/dashboard`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/dashboard/analytics`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.4,
    },
    {
      url: `${baseUrl}/dashboard/agents`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.4,
    },
    {
      url: `${baseUrl}/dashboard/billing`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.4,
    },
    {
      url: `${baseUrl}/dashboard/settings`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.3,
    },
  ];

  return [
    ...staticRoutes,
    ...policyRoutes,
    ...dashboardRoutes,
  ];
}
