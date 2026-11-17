import type { ReactNode } from 'react';
import { Shell } from './Shell';
import { LoadingBootstrap } from './LoadingBootstrap';
import { CHARACTER_SPRITE, INTRO_SESSION_KEY } from '@/lib/character';
import { profile, type Lang } from '@/lib/content';
import '@/app/fonts.css';
import '@/app/globals.css';
import '@/app/loader.css';
export function Root({ children, lang }: { children: ReactNode; lang: Lang }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.name,
    alternateName: profile.arabicName,
    url: profile.origin,
    email: profile.email,
    jobTitle: 'Backend Engineer',
    knowsAbout: ['ASP.NET Core', 'Node.js', 'C#', 'PostgreSQL', 'SQL Server', 'REST APIs'],
    address: { '@type': 'PostalAddress', addressLocality: 'Cairo', addressCountry: 'EG' },
  };
  return (
    <html
      lang={lang}
      dir={lang === 'ar' ? 'rtl' : 'ltr'}
      data-theme="dark"
      suppressHydrationWarning
    >
      <head>
        <link rel="preload" href={CHARACTER_SPRITE} as="image" />
        <script
          dangerouslySetInnerHTML={{
            __html: `(()=>{let seen=false;try{seen=sessionStorage.getItem('${INTRO_SESSION_KEY}')==='1'}catch(e){}document.documentElement.dataset.loader=seen?'done':'pending';setTimeout(()=>{if(document.documentElement.dataset.loader==='pending')document.documentElement.dataset.loader='done'},8000)})()`,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `try{document.documentElement.dataset.theme=localStorage.getItem('am-theme')||'dark';document.documentElement.dataset.motion=(matchMedia('(prefers-reduced-motion: reduce)').matches||localStorage.getItem('am-motion')==='off')?'off':'on'}catch(e){}`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }}
        />
      </head>
      <body>
        <LoadingBootstrap lang={lang} />
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}
