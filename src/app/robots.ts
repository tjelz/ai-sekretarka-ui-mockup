import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://www.yieldo.pl';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/dashboard/',
          '/login/',
          '/_next/',
          '/admin/',
          '/private/',
          '/*.json',
          '/*?utm_',
          '/.env*',
          '/.git*',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/api/',
          '/dashboard/',
          '/login/',
          '/_next/',
          '/admin/',
        ],
      },
      {
        userAgent: 'Googlebot-Image',
        allow: '/',
        disallow: [
          '/private/',
          '/dashboard/',
        ],
      },
      {
        userAgent: [
          'AhrefsBot',
          'SemrushBot',
          'MJ12bot',
          'DotBot',
        ],
        disallow: '/',
      },
    ],
    sitemap: [
      `${baseUrl}/sitemap.xml`,
    ],
  };
}
