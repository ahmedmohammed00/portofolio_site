'use client';
import { useEffect, useState } from 'react';
import { useSite } from './SiteProvider';
import { Avatar, Button, Coin, SectionLabel } from './UI';
import { Icon } from './Icon';
import { Contact } from './Contact';
import { WorkSection } from './Projects';
import { Terminal } from './Terminal';
import { pathFor, profile, services, skillGroups } from '@/lib/content';
import { assetPath } from '@/lib/urls';
function TypeLine() {
  const { t, motion, lang } = useSite();
  const [text, setText] = useState('');
  useEffect(() => {
    if (!motion) {
      setText(lang === 'ar' ? 'واجهات API وأنظمة متصلة.' : 'APIs. Systems. Connections.');
      return;
    }
    const lines =
      lang === 'ar'
        ? ['واجهات API واضحة.', 'قواعد بيانات منظمة.', 'اتصالات لحظية.']
        : ['clear API contracts.', 'well-structured data.', 'real-time connections.'];
    let index = 0,
      count = 0,
      erasing = false,
      timeout: ReturnType<typeof setTimeout>;
    function tick() {
      const line = lines[index];
      count += erasing ? -1 : 1;
      setText(line.slice(0, count));
      let delay = erasing ? 28 : 65;
      if (!erasing && count === line.length) {
        erasing = true;
        delay = 1800;
      } else if (erasing && count === 0) {
        erasing = false;
        index = (index + 1) % lines.length;
        delay = 300;
      }
      timeout = setTimeout(tick, delay);
    }
    tick();
    return () => clearTimeout(timeout);
  }, [motion, lang]);
  return (
    <div
      className="type-line mono"
      role="img"
      aria-label={t(
        'I build APIs, data systems, and real-time connections.',
        'بطور واجهات API وقواعد بيانات وأنظمة لحظية.',
      )}
    >
      <span aria-hidden="true">
        <span className="type-prefix">{t('I build', 'بطور')}</span> {text}
        <i className="typing-caret" />
      </span>
    </div>
  );
}
function Hero() {
  const { t, lang, setOverlay } = useSite();
  return (
    <section className="hero" id="top">
      <div className="container">
        <div className="hero-copy">
          <div className="hero-eyebrow">
            <span className="status-dot" />
            <span className="mono">
              {t('BACKEND ENGINEER / CAIRO, EG', 'مهندس باك إند / القاهرة، مصر')}
            </span>
          </div>
          <h1>
            {t('Good ideas.', 'أفكار قوية.')}
            <br />
            <span>{t('Solid backends.', 'باك إند أقوى.')}</span>
          </h1>
          <p className="hero-intro">
            {t(
              'I’m Ahmed Mohamed. I turn complex requirements into clear, dependable systems with .NET and Node.js.',
              'أنا أحمد محمد. بحوّل المتطلبات المعقدة لأنظمة واضحة ويمكن الاعتماد عليها باستخدام .NET وNode.js.',
            )}
          </p>
          <TypeLine />
          <div className="hero-buttons">
            <Button href={pathFor(lang, '/work/')}>{t('Explore my work', 'استكشف أعمالي')}</Button>
            <Button href={pathFor(lang, '/#contact')} variant="secondary" icon="mail">
              {t('Let’s connect', 'نتواصل')}
            </Button>
          </div>
          <div className="hero-availability">
            <span className="availability">
              <span className="status-dot" />
              {t('Open to roles & freelance', 'متاح لفرص العمل والفريلانس')}
            </span>
            <button className="hero-tour" type="button" onClick={() => setOverlay('tour')}>
              {t('Or take the tour', 'أو خد جولة')}
              <Icon name="arrow" size={15} />
            </button>
          </div>
        </div>
        <div
          className="hero-visual"
          role="group"
          aria-label={t('Ahmed’s developer workspace', 'مساحة أحمد كمطور')}
        >
          <div className="visual-frame">
            <div className="window-bar">
              <div className="window-dots" aria-hidden="true">
                <i />
                <i />
                <i />
              </div>
              <span className="mono">ahmed@portfolio:~</span>
              <span className="window-online">
                <span />
                ONLINE
              </span>
            </div>
            <div className="avatar-stage">
              <div className="stage-orbit orbit-one" />
              <div className="stage-orbit orbit-two" />
              <div className="stage-cross cross-one">+</div>
              <div className="stage-cross cross-two">+</div>
              <div className="stage-label mono">
                ENGINEER BY LOGIC.
                <br />
                BUILDER BY NATURE.
              </div>
              <Avatar className="hero-avatar" />
              <span className="floating-tag tag-dotnet">
                <Icon name="code" size={16} />
                .NET
              </span>
              <span className="floating-tag tag-node">
                <span className="node-hex" />
                Node.js
              </span>
              <div className="stage-floor" aria-hidden="true" />
            </div>
            <div className="visual-status">
              <span className="mono">
                <span className="teal">~/</span> {t('building what’s next', 'بنبني اللي جاي')}
              </span>
              <span className="mono visual-ready">
                READY <span>↵</span>
              </span>
            </div>
          </div>
          <span className="visual-caption mono">
            FIG. 01 — {t('THE HUMAN BEHIND THE BACKEND', 'الإنسان وراء الباك إند')}
          </span>
        </div>
        <div className="hero-bottom">
          <span className="mono hero-signature">
            <span>AM</span> {t('ENGINEERED WITH INTENT', 'هندسة باهتمام')}
          </span>
          <div className="hero-bottom-facts">
            <span>
              03 <small>{t('CV PROJECTS', 'مشاريع في السيرة')}</small>
            </span>
            <span>
              2026 <small>DEPI {t('GRADUATE', 'خريج')}</small>
            </span>
            <a
              href="#work"
              className="scroll-cue"
              aria-label={t('Scroll to selected work', 'انتقل للأعمال')}
            >
              <span>{t('SCROLL TO EXPLORE', 'استكشف تحت')}</span>
              <span>↓</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
function StackMarquee() {
  const { t } = useSite();
  const technologies = [
    { name: '.NET', icon: 'dotnet' },
    { name: 'C#', icon: 'csharp' },
    { name: 'Node.js', icon: 'nodejs' },
    { name: 'TypeScript', icon: 'typescript' },
    { name: 'JavaScript', icon: 'javascript' },
    { name: 'PostgreSQL', icon: 'postgresql' },
    { name: 'SQL Server', icon: 'sqlserver' },
    { name: 'Docker', icon: 'docker' },
  ];

  return (
    <div
      className="stack-strip"
      role="img"
      aria-label={`${t('Technologies', 'التقنيات')}: ${technologies.map(({ name }) => name).join(', ')}`}
    >
      <div className="marquee-track" aria-hidden="true">
        {[0, 1].map((copy) => (
          <div className="marquee-group" key={copy}>
            {technologies.map(({ name, icon }) => (
              <span className="marquee-logo" key={icon} title={name}>
                <img
                  src={assetPath(`/icons/technologies/${icon}.svg`)}
                  alt=""
                  width={42}
                  height={42}
                  draggable={false}
                />
                <span className="marquee-name">{name}</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
function About() {
  const { t, lang } = useSite();
  return (
    <section className="section about-section" id="about">
      <div className="container">
        <div className="about-heading" data-reveal>
          <SectionLabel number="02">
            {t('THE PERSON BEHIND THE CODE', 'الشخص اللي ورا الكود')}
          </SectionLabel>
          <h2>
            {t('Curious by default.', 'فضولي بطبيعتي.')}
            <br />
            <span className="muted-heading">{t('Methodical by choice.', 'منظم باختياري.')}</span>
          </h2>
        </div>
        <div className="about-layout">
          <div className="about-copy" data-reveal>
            <p className="about-lead">
              {t(
                'I like making complicated things make sense.',
                'بحب أخلي الحاجات المعقدة مفهومة.',
              )}
            </p>
            <p>
              {t(
                'I’m a Cairo-based backend engineer focused on .NET and Node.js. My work spans multi-tenant systems, delivery workflows, and real-time applications.',
                'أنا مهندس باك إند من القاهرة، بشتغل على .NET وNode.js. شغلي بيشمل أنظمة متعددة العملاء، وعمليات التوصيل، وتطبيقات بتشتغل لحظياً.',
              )}
            </p>
            <p>
              {t(
                'I care about the decisions beneath the surface: how data is organized, where responsibilities live, and who can access what. Clear APIs and maintainable architecture are where I feel at home.',
                'بهتم بالقرارات اللي ورا الواجهة: البيانات بتتنظم إزاي، ومسؤولية كل جزء إيه، ومين له صلاحية الوصول. تصميم APIs واضحة وأنظمة سهلة الصيانة هو اللي بحب أشتغل عليه.',
              )}
            </p>
            <Button href={pathFor(lang, '/resume/')} variant="text" icon="download">
              {t('More about my background', 'اعرف أكتر عن خلفيتي')}
            </Button>
          </div>
          <div className="education-stack" data-reveal>
            <article className="education-card">
              <span className="mono education-year">
                2027 <small>{t('EXPECTED', 'متوقع')}</small>
              </span>
              <div>
                <span className="eyebrow">{t('EDUCATION', 'التعليم')}</span>
                <h3>{t('Computer Engineering', 'هندسة الحاسبات')}</h3>
                <p>{t(profile.university, 'الأكاديمية الحديثة للهندسة والتكنولوجيا')}</p>
              </div>
              <Icon name="layers" size={24} />
            </article>
            <article className="education-card">
              <span className="mono education-year teal">
                2026 <small>{t('COMPLETED', 'اكتمل')}</small>
              </span>
              <div>
                <span className="eyebrow">{t('TRAINING', 'التدريب')}</span>
                <h3>
                  DEPI <span className="muted-heading">/ .NET</span>
                </h3>
                <p>
                  {t(
                    'Digital Egypt Pioneers Initiative · Backend Development Track',
                    'مبادرة رواد مصر الرقمية · مسار تطوير الباك إند',
                  )}
                </p>
              </div>
              <Icon name="code" size={24} />
            </article>
            <div className="about-note mono">
              <span className="status-dot" />
              {t(
                'Currently looking for the right problems to solve.',
                'بدور على مشكلات تستحق الحل.',
              )}
            </div>
          </div>
        </div>
        <Coin id="about" />
      </div>
    </section>
  );
}
function Expertise() {
  const { t, lang } = useSite();
  return (
    <section className="section expertise-section" id="expertise">
      <div className="container">
        <div className="section-heading" data-reveal>
          <div>
            <SectionLabel number="03">{t('THE TOOLKIT', 'أدوات الشغل')}</SectionLabel>
            <h2>
              {t('The right tools.', 'الأدوات المناسبة.')}
              <br />
              <span className="muted-heading">
                {t('The right foundations.', 'والأساس السليم.')}
              </span>
            </h2>
          </div>
          <p className="section-heading-description">
            {t(
              'A focused stack, backed by principles that outlast any framework.',
              'تقنيات مركزة، ووراها مبادئ بتعيش أطول من أي فريم وورك.',
            )}
          </p>
          <Coin id="expertise" />
        </div>
        <div className="skills-grid">
          {skillGroups.map((g) => (
            <article className="skill-column" key={g.number} data-reveal>
              <div className="skill-top">
                <Icon name={g.icon} size={25} />
                <span className="mono">{g.number}</span>
              </div>
              <h3>{g.name[lang]}</h3>
              <ul>
                {g.skills.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        <div className="principles-line mono">
          <span>{t('ALSO IN MY TOOLBOX', 'كمان بستخدم')}</span>
          <p>
            React <i /> Next.js <i /> HTML / CSS <i /> JavaScript
          </p>
        </div>
      </div>
    </section>
  );
}
function Services() {
  const { t, lang } = useSite();
  return (
    <section className="section services-section" id="services">
      <div className="container">
        <div className="section-heading" data-reveal>
          <div>
            <SectionLabel number="04">{t('HOW I CAN HELP', 'أقدر أساعدك إزاي')}</SectionLabel>
            <h2>
              {t('Your idea.', 'فكرتك.')}
              <br />
              <span className="muted-heading">
                {t('A dependable engine.', 'ونظام تعتمد عليه.')}
              </span>
            </h2>
          </div>
          <Button href={pathFor(lang, '/hire/')} variant="secondary">
            {t('Work together', 'نعمل سوا')}
          </Button>
          <Coin id="services" />
        </div>
        <div className="services-grid">
          {services.map((s, i) => (
            <article className="service-card" key={s.icon} data-reveal>
              <div className="service-header">
                <Icon name={s.icon} size={25} />
                <span className="mono">0{i + 1}</span>
              </div>
              <h3>{s.title[lang]}</h3>
              <p>{s.description[lang]}</p>
              <ul className="tags">
                {s.tags.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        <div className="process-row">
          <span className="eyebrow">{t('A SIMPLE WAY TO WORK', 'طريقة بسيطة للشغل')}</span>
          {[
            { en: 'Understand', ar: 'نفهم' },
            { en: 'Design', ar: 'نصمم' },
            { en: 'Build', ar: 'نبني' },
            { en: 'Hand over', ar: 'نسلّم' },
          ].map((x, i) => (
            <div key={x.en}>
              <span className="mono">0{i + 1}</span>
              {t(x.en, x.ar)}
              {i < 3 && <Icon name="arrow" size={16} />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
export function Home() {
  return (
    <main id="main">
      <Hero />
      <StackMarquee />
      <WorkSection />
      <About />
      <Expertise />
      <Services />
      <Terminal />
      <Contact />
    </main>
  );
}
