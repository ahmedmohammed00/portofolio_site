'use client';
import { useState } from 'react';
import Link from 'next/link';
import { projects, pathFor, type Project } from '@/lib/content';
import { useSite } from './SiteProvider';
import { assetPath } from '@/lib/urls';
import { Button, Coin, SectionLabel } from './UI';
import { Icon } from './Icon';
export function ProjectPreview({ project, large = false }: { project: Project; large?: boolean }) {
  const { lang, t } = useSite();
  if (project.preview)
    return (
      <div className={`project-preview has-image ${large ? 'large' : ''}`}>
        <img
          src={assetPath(project.preview)}
          alt={`${project.title} ${t('project screenshot', 'صورة المشروع')}`}
          loading="lazy"
        />
      </div>
    );
  return (
    <div className={`project-preview preview-${project.accent} ${large ? 'large' : ''}`}>
      <div className="preview-dots" aria-hidden="true" />
      <div className="preview-topline mono">
        <span>{project.number} / PROJECT FILE</span>
        <span className="preview-cross">+</span>
      </div>
      <div className="preview-placeholder">
        <div className="preview-corner top-left" />
        <div className="preview-corner top-right" />
        <div className="preview-corner bottom-left" />
        <div className="preview-corner bottom-right" />
        <span className="project-monogram" aria-hidden="true">
          {project.slug === 'cliniqai' ? 'C' : project.slug === 'delivery-management' ? 'D' : 'R'}
          <span>_</span>
        </span>
        <span className="mono preview-coming">
          {t('PREVIEW COMING SOON', 'معاينة المشروع قريباً')}
        </span>
      </div>
      <div className="preview-bottomline mono">
        <span>{project.category}</span>
        <span>↗ {t('CASE STUDY', 'تفاصيل المشروع')}</span>
      </div>
    </div>
  );
}
export function ProjectGrid({ full = false }: { full?: boolean }) {
  const { lang, t } = useSite();
  const [filter, setFilter] = useState('All');
  const filtered = projects.filter((p) => filter === 'All' || p.category === filter);
  return (
    <>
      <div
        className="project-filters"
        role="group"
        aria-label={t('Filter projects by technology', 'تصفية المشاريع حسب التقنية')}
      >
        {['All', '.NET', 'Node.js'].map((f) => (
          <button
            type="button"
            key={f}
            onClick={() => setFilter(f)}
            aria-pressed={f === filter}
            className={f === filter ? 'active' : ''}
          >
            {f === 'All' ? t('All work', 'كل الأعمال') : f}
            <span>
              {f === 'All' ? projects.length : projects.filter((p) => p.category === f).length}
            </span>
          </button>
        ))}
        <span className="filter-note mono">
          {t('SELECTED, NOT EVERYTHING.', 'مختارات من الأعمال.')}
        </span>
      </div>
      <div className="project-grid" aria-live="polite">
        {filtered.map((p, i) => (
          <article
            key={p.slug}
            className={`project-card accent-${p.accent}`}
            data-reveal
            style={{ '--reveal-delay': `${i * 90}ms` } as React.CSSProperties}
          >
            <Link
              href={pathFor(lang, `/work/${p.slug}/`)}
              className="project-preview-link"
              aria-label={`${t('View', 'عرض')} ${p.title}`}
            >
              <ProjectPreview project={p} />
            </Link>
            <div className="project-card-body">
              <span className="eyebrow">{p.type[lang]}</span>
              <div className="project-title-line">
                <h3>
                  <Link href={pathFor(lang, `/work/${p.slug}/`)}>{p.title}</Link>
                </h3>
                <Icon name="northeast" />
              </div>
              <p>{p.description[lang]}</p>
              <ul className="tags" aria-label={t('Technologies', 'التقنيات')}>
                {p.stack.slice(0, 3).map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
              <Link className="project-link" href={pathFor(lang, `/work/${p.slug}/`)}>
                {t('Read case study', 'اقرأ تفاصيل المشروع')}
                <Icon name="arrow" size={16} />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
export function WorkSection() {
  const { lang, t } = useSite();
  return (
    <section className="section work-section" id="work">
      <div className="container">
        <div className="section-heading" data-reveal>
          <div>
            <SectionLabel number="01">{t('SELECTED WORK', 'أعمال مختارة')}</SectionLabel>
            <h2>
              {t('Built beneath', 'هندسة تبدأ')}
              <br />
              <span className="muted-heading">{t('the interface.', 'من وراء الواجهة.')}</span>
            </h2>
          </div>
          <div className="section-heading-aside">
            <p>
              {t(
                'The systems, APIs, and connections that make a product work.',
                'الأنظمة والواجهات والاتصالات اللي بتخلي المنتج يشتغل.',
              )}
            </p>
            <Button href={pathFor(lang, '/work/')} variant="text">
              {t('All projects', 'كل المشاريع')}
            </Button>
          </div>
          <Coin id="work" />
        </div>
        <ProjectGrid />
      </div>
    </section>
  );
}
export function WorkPage() {
  const { t } = useSite();
  return (
    <main id="main">
      <section className="section page-top" id="work">
        <div className="container">
          <SectionLabel>{t('PROJECT ARCHIVE', 'أرشيف المشاريع')}</SectionLabel>
          <h1 className="page-title">
            {t('Work, in detail.', 'الأعمال بالتفصيل.')}
            <span className="teal">_</span>
          </h1>
          <p className="page-intro">
            {t(
              'A closer look at the problems I’ve worked on, the decisions behind them, and the systems I built.',
              'نظرة أقرب على المشكلات اللي اشتغلت عليها، وقرارات التنفيذ، والأنظمة اللي بنيتها.',
            )}
          </p>
          <ProjectGrid full />
        </div>
      </section>
      <SmallContact />
    </main>
  );
}
export function SmallContact() {
  const { lang, t } = useSite();
  return (
    <section className="small-contact">
      <div className="container">
        <p className="eyebrow">{t('YOUR NEXT PROJECT?', 'مشروعك الجاي؟')}</p>
        <h2>{t('Let’s build the next one.', 'نبني اللي جاي سوا.')}</h2>
        <Button href={pathFor(lang, '/hire/')}>{t('Work with me', 'اشتغل معايا')}</Button>
      </div>
    </section>
  );
}
export function ProjectDetail({ slug }: { slug: string }) {
  const { lang, t } = useSite();
  const p = projects.find((x) => x.slug === slug)!;
  const next = projects[(projects.findIndex((x) => x.slug === slug) + 1) % projects.length];
  return (
    <main id="main">
      <section className="section page-top case-top">
        <div className="container">
          <Link className="back-link" href={pathFor(lang, '/work/')}>
            <Icon name="arrow" size={16} />
            {t('All projects', 'كل المشاريع')}
          </Link>
          <span className="eyebrow">{p.type[lang]}</span>
          <h1 className="page-title">
            {p.title}
            <span className="teal">.</span>
          </h1>
          <p className="page-intro">{p.description[lang]}</p>
          <div className="case-meta">
            <div>
              <span className="eyebrow">{t('MY ROLE', 'دوري')}</span>
              <strong>{p.role[lang]}</strong>
            </div>
            <div>
              <span className="eyebrow">{t('BUILT WITH', 'التقنيات')}</span>
              <ul className="tags">
                {p.stack.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </div>
          </div>
          {(p.liveUrl || p.githubUrl) && (
            <div className="button-group">
              {p.liveUrl && (
                <a
                  className="button button-primary"
                  href={p.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  {t('Live project', 'عرض المشروع')}
                  <Icon name="northeast" />
                </a>
              )}
              {p.githubUrl && (
                <a
                  className="button button-secondary"
                  href={p.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub
                  <Icon name="northeast" />
                </a>
              )}
            </div>
          )}
          <ProjectPreview project={p} large />
        </div>
      </section>
      <section className="section case-body">
        <div className="container">
          <div className="case-content">
            <div className="case-chapter" data-reveal>
              <SectionLabel number="01">{t('THE CHALLENGE', 'المشكلة')}</SectionLabel>
              <h2>{t('The problem to solve.', 'المشكلة اللي بنحلها.')}</h2>
              <p>{p.challenge[lang]}</p>
            </div>
            <div className="case-chapter" data-reveal>
              <SectionLabel number="02">{t('THE APPROACH', 'طريقة التنفيذ')}</SectionLabel>
              <h2>{t('How I approached it.', 'طريقتي في الحل.')}</h2>
              <p>{p.approach[lang]}</p>
            </div>
            <div className="case-chapter" data-reveal>
              <SectionLabel number="03">{t('THE IMPLEMENTATION', 'التنفيذ')}</SectionLabel>
              <h2>{t('What’s inside.', 'جوا النظام.')}</h2>
              <ul className="feature-list">
                {p.features.map((f) => (
                  <li key={f.en}>
                    <Icon name="check" size={19} />
                    {f[lang]}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <aside className="case-sidebar">
            <div className="eyebrow">{t('SYSTEM AT A GLANCE', 'نظرة على النظام')}</div>
            <div className="architecture-flow">
              {p.diagram.map((s, i) => (
                <div key={s}>
                  <span className="mono">0{i + 1}</span>
                  {s}
                  {i < p.diagram.length - 1 && <i aria-hidden="true">↓</i>}
                </div>
              ))}
            </div>
            <p>
              {t(
                'An overview of the components described in this project.',
                'نظرة عامة على مكونات المشروع المذكورة في التفاصيل.',
              )}
            </p>
          </aside>
        </div>
      </section>
      <div className="next-project container">
        <span className="eyebrow">{t('UP NEXT', 'المشروع التالي')}</span>
        <Link href={pathFor(lang, `/work/${next.slug}/`)}>
          {next.title}
          <Icon name="northeast" size={40} />
        </Link>
      </div>
      <SmallContact />
    </main>
  );
}
