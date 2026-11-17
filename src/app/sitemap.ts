export const dynamic = 'force-static';
import type { MetadataRoute } from 'next';
import { profile, projects } from '@/lib/content';
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ['/', '/work/', '/hire/', '/resume/', ...projects.map((p) => `/work/${p.slug}/`)];
  return paths.flatMap((path) =>
    ['', '/ar'].map((prefix) => ({
      url: `${profile.origin}${prefix}${path}`,
      changeFrequency: 'monthly' as const,
      priority: path === '/' ? 1 : 0.7,
      alternates: {
        languages: { en: `${profile.origin}${path}`, ar: `${profile.origin}/ar${path}` },
      },
    })),
  );
}
