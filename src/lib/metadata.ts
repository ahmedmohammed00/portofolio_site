import type { Metadata } from 'next';
import { assetPath } from './urls';
import { profile, pathFor, type Lang } from './content';
export function pageMetadata(
  title: string,
  description: string,
  path = '/',
  lang: Lang = 'en',
): Metadata {
  return {
    metadataBase: new URL(profile.origin),
    title,
    description,
    applicationName: 'Ahmed Mohamed',
    authors: [{ name: profile.name }],
    alternates: {
      canonical: `${profile.origin}${pathFor(lang, path)}`,
      languages: {
        en: `${profile.origin}${pathFor('en', path)}`,
        ar: `${profile.origin}${pathFor('ar', path)}`,
        'x-default': `${profile.origin}${pathFor('en', path)}`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${profile.origin}${pathFor(lang, path)}`,
      siteName: 'Ahmed Mohamed',
      locale: lang === 'ar' ? 'ar_EG' : 'en_US',
      type: 'website',
      images: [
        {
          url: `${profile.origin}${profile.avatar}`,
          width: 1200,
          height: 1290,
          alt: 'Ahmed Mohamed · Backend Engineer',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${profile.origin}${profile.avatar}`],
    },
    robots: { index: true, follow: true },
    icons: { icon: assetPath('/icon.svg') },
    formatDetection: { telephone: false },
  };
}
