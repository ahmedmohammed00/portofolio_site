'use client';
import { useSite } from './SiteProvider';
import { Button, SectionLabel } from './UI';
import { profile, projects, skillGroups } from '@/lib/content';
export function Resume() {
  const { lang, t } = useSite();
  return (
    <main id="main" className="resume-page">
      <section className="section page-top">
        <div className="container">
          <div className="resume-toolbar">
            <SectionLabel>{t('RÉSUMÉ', 'السيرة الذاتية')}</SectionLabel>
            <Button onClick={() => window.print()} icon="download" variant="secondary">
              {t('Print / Save PDF', 'اطبع / احفظ PDF')}
            </Button>
          </div>
          <article className="resume-sheet">
            <header className="resume-header">
              <h1>{t(profile.name, profile.arabicName)}</h1>
              <p className="resume-role">
                {t('Backend Engineer | .NET and Node.js', 'مهندس باك إند | .NET وNode.js')}
              </p>
              <div>
                <span>{t(profile.location, 'القاهرة، مصر')}</span>
                <a href={`mailto:${profile.email}`}>{profile.email}</a>
              </div>
            </header>
            <section>
              <h2>{t('Profile', 'نبذة')}</h2>
              <p>
                {t(
                  'Backend Engineer specializing in .NET and Node.js, with hands-on experience building server-side systems using ASP.NET Core, C#, Entity Framework Core, Node.js, Express.js, SQL Server, and PostgreSQL. Applies layered architecture, dependency injection, SOLID principles, RESTful API design, and role-based authorization. Graduate of the DEPI .NET backend track in 2026.',
                  'مهندس باك إند متخصص في .NET وNode.js، بخبرة عملية في بناء أنظمة الخادم باستخدام ASP.NET Core وC# وEntity Framework Core وExpress.js وSQL Server وPostgreSQL. بشتغل بمبادئ Layered Architecture وDependency Injection وSOLID، وتصميم RESTful APIs وإدارة الصلاحيات. خريج مسار .NET في مبادرة رواد مصر الرقمية عام ٢٠٢٦.',
                )}
              </p>
            </section>
            <section>
              <h2>{t('Technical skills', 'المهارات التقنية')}</h2>
              {skillGroups.map((g) => (
                <p key={g.number}>
                  <strong>{g.name[lang]}:</strong> {g.skills.join(' · ')}
                </p>
              ))}
              <p>
                <strong>{t('Additional', 'مهارات أخرى')}:</strong> React · Next.js · JavaScript ·
                HTML5 · CSS3 · WebSockets
              </p>
            </section>
            <section>
              <h2>{t('Selected projects', 'مشاريع مختارة')}</h2>
              {projects.map((p) => (
                <div className="resume-project" key={p.slug}>
                  <h3>{p.title}</h3>
                  <p className="resume-project-meta">
                    {p.role[lang]} | {p.stack.join(' · ')}
                  </p>
                  <p>{p.description[lang]}</p>
                  <ul>
                    {p.features.map((f) => (
                      <li key={f.en}>{f[lang]}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </section>
            <section>
              <h2>{t('Education & training', 'التعليم والتدريب')}</h2>
              <div className="resume-education">
                <div>
                  <h3>{t('Bachelor of Computer Engineering', 'بكالوريوس هندسة الحاسبات')}</h3>
                  <p>{t(profile.university, 'الأكاديمية الحديثة للهندسة والتكنولوجيا')}</p>
                </div>
                <span>{t('Expected 2027', 'التخرج المتوقع ٢٠٢٧')}</span>
              </div>
              <div className="resume-education">
                <div>
                  <h3>
                    {t(
                      'Digital Egypt Pioneers Initiative (DEPI)',
                      'مبادرة رواد مصر الرقمية (DEPI)',
                    )}
                  </h3>
                  <p>{t('Backend Development · .NET Track', 'تطوير الباك إند · مسار .NET')}</p>
                </div>
                <span>{t('Completed 2026', 'اكتمل ٢٠٢٦')}</span>
              </div>
            </section>
          </article>
        </div>
      </section>
    </main>
  );
}
