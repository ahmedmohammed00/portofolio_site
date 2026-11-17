'use client';
import { useEffect, useState, type ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';
import { SiteProvider, useSite } from './SiteProvider';
import { Icon } from './Icon';
import { Dialog } from './UI';
import { LoadingScreen } from './LoadingScreen';
import { pathFor, profile } from '@/lib/content';
const MiniGame = dynamic(() => import('./MiniGame'), {
  ssr: false,
  loading: () => <p className="game-loading">Loading packet runner…</p>,
});
function Brand() {
  const { t, lang } = useSite();
  return (
    <Link
      href={pathFor(lang)}
      className="brand"
      aria-label={t('Ahmed Mohamed, home', 'أحمد محمد، الرئيسية')}
    >
      <span className="brand-mark" aria-hidden="true">
        a<span>m</span>
        <i />
      </span>
      <span className="brand-name">
        {t('Ahmed Mohamed', 'أحمد محمد')}
        <small>{t('BACKEND ENGINEER', 'مهندس باك إند')}</small>
      </span>
    </Link>
  );
}
function Header() {
  const s = useSite();
  const { t, lang } = s;
  const path = usePathname();
  const [menu, setMenu] = useState(false);
  const [settings, setSettings] = useState(false);
  useEffect(() => {
    setMenu(false);
    setSettings(false);
  }, [path]);
  const other =
    lang === 'en' ? `/ar${path === '/' ? '/' : path}` : path.replace(/^\/ar/, '') || '/';
  const nav = [
    { label: t('Work', 'الأعمال'), href: pathFor(lang, '/work/') },
    { label: t('About', 'عنّي'), href: pathFor(lang, '/#about') },
    { label: t('Expertise', 'الخبرات'), href: pathFor(lang, '/#expertise') },
    { label: t('Work together', 'نعمل سوا'), href: pathFor(lang, '/hire/') },
  ];
  return (
    <>
      <header className="header" id="navigation">
        <div className="container header-inner">
          <Brand />
          <nav className="desktop-nav" aria-label={t('Main navigation', 'التنقل الرئيسي')}>
            {nav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                aria-current={path === n.href || `${path}/` === n.href ? 'page' : undefined}
              >
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="header-actions">
            <Link
              href={other}
              className="icon-button language-toggle"
              aria-label={t('Switch to Arabic', 'Switch to English')}
            >
              {t('ع', 'EN')}
            </Link>
            <button
              className="icon-button"
              onClick={s.toggleTheme}
              aria-label={t('Toggle light and dark theme', 'تغيير الوضع الداكن والفاتح')}
              type="button"
            >
              <Icon name={s.theme === 'dark' ? 'sun' : 'moon'} size={18} />
            </button>
            <div className="settings-wrap">
              <button
                type="button"
                className="icon-button settings-trigger"
                onClick={() => setSettings(!settings)}
                aria-label={t('Experience settings', 'إعدادات التجربة')}
                aria-expanded={settings}
                aria-controls="experience-settings"
              >
                <span className="equalizer" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                </span>
              </button>
              {settings && (
                <div className="settings-panel" id="experience-settings">
                  <div className="eyebrow">{t('MAKE IT YOURS', 'تجربتك بطريقتك')}</div>
                  <button
                    type="button"
                    className="setting-row"
                    onClick={s.toggleSound}
                    aria-pressed={s.sound}
                  >
                    {t('Sound effects', 'المؤثرات الصوتية')}
                    <span className={`toggle ${s.sound ? 'on' : ''}`} />
                  </button>
                  <button
                    type="button"
                    className="setting-row"
                    onClick={s.toggleMusic}
                    aria-pressed={s.music}
                  >
                    {t('Ambient audio', 'صوت الخلفية')}
                    <span className={`toggle ${s.music ? 'on' : ''}`} />
                  </button>
                  <button
                    type="button"
                    className="setting-row"
                    onClick={s.toggleMotion}
                    aria-pressed={s.motion}
                  >
                    {t('Animations', 'الحركة')}
                    <span className={`toggle ${s.motion ? 'on' : ''}`} />
                  </button>
                  <button
                    type="button"
                    className="settings-close"
                    onClick={() => setSettings(false)}
                  >
                    {t('Done', 'تم')} <Icon name="check" size={14} />
                  </button>
                </div>
              )}
            </div>
            <a href={`mailto:${profile.email}`} className="header-contact">
              {t('Let’s talk', 'يلا نتكلم')}
              <Icon name="northeast" size={16} />
            </a>
            <button
              className="icon-button menu-toggle"
              type="button"
              aria-label={t('Open navigation', 'فتح القائمة')}
              aria-expanded={menu}
              onClick={() => setMenu(true)}
            >
              <Icon name="menu" />
            </button>
          </div>
        </div>
      </header>
      {menu && (
        <Dialog
          title={t('Navigation', 'القائمة')}
          onClose={() => setMenu(false)}
          className="mobile-menu"
        >
          <Brand />
          <nav aria-label={t('Mobile navigation', 'قائمة الموبايل')}>
            {[
              ...nav,
              { label: t('Contact', 'تواصل'), href: pathFor(lang, '/#contact') },
              { label: t('Résumé', 'السيرة الذاتية'), href: pathFor(lang, '/resume/') },
            ].map((n, i) => (
              <Link href={n.href} key={n.href} onClick={() => setMenu(false)}>
                <span className="mono">0{i + 1}</span>
                {n.label}
                <Icon name="northeast" />
              </Link>
            ))}
          </nav>
          <a href={`mailto:${profile.email}`} className="menu-email">
            {profile.email}
          </a>
        </Dialog>
      )}
    </>
  );
}
function Footer() {
  const { lang, t, setOverlay } = useSite();
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-main">
          <div>
            <Brand />
            <p>
              {t(
                'Thoughtfully engineered. Built to connect.',
                'برمجة باهتمام. وأنظمة بتوصل الناس ببعض.ـ',
              ).replace('ـ', '')}
            </p>
          </div>
          <div className="footer-nav">
            <Link href={pathFor(lang, '/work/')}>{t('Work', 'الأعمال')}</Link>
            <Link href={pathFor(lang, '/resume/')}>{t('Résumé', 'السيرة الذاتية')}</Link>
            <Link href={pathFor(lang, '/hire/')}>{t('Work together', 'نعمل سوا')}</Link>
            <a href={`mailto:${profile.email}`}>{t('Email me', 'راسلني')}</a>
          </div>
        </div>
        <svg
          className="footer-wordmark"
          aria-hidden="true"
          viewBox="0 0 1200 240"
          focusable="false"
        >
          <text x="0" y="210">
            AHMED<tspan>.</tspan>
          </text>
        </svg>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} {t('Ahmed Mohamed', 'أحمد محمد')}
          </span>
          <span className="footer-location">
            <span className="status-dot" />
            {t('Cairo, Egypt · available remotely', 'القاهرة، مصر · متاح للعمل عن بُعد')}
          </span>
          <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            {t('Back to top', 'للأعلى')} ↑
          </button>
        </div>
        <div className="footer-extras">
          <button type="button" onClick={() => setOverlay('intro')}>
            {t('Replay intro', 'إعادة المقدمة')}
          </button>
          <span>·</span>
          <span>{t('A little code. A little character.', 'شوية كود. وشوية شخصية.')}</span>
        </div>
      </div>
    </footer>
  );
}
function Tour() {
  const { t, motion, setOverlay } = useSite();
  const [step, setStep] = useState(0);
  const all = [
    {
      target: '#top',
      label: t('A little introduction.', 'نتعرف الأول.'),
      copy: t(
        'I’m Ahmed, a backend engineer working with .NET and Node.js. The character is clickable. Go ahead and say hello.',
        'أنا أحمد، مهندس باك إند باستخدام .NET وNode.js. تقدر تضغط على الشخصية وتقول أهلاً.',
      ),
    },
    {
      target: '#work',
      label: t('The work, up close.', 'الأعمال عن قرب.'),
      copy: t(
        'Explore the projects from my CV. Filter by stack and open a case study to see the problem, the approach, and the implementation.',
        'استكشف مشاريع السيرة الذاتية. اختار التقنية وافتح المشروع عشان تعرف المشكلة وطريقة الحل والتنفيذ.',
      ),
    },
    {
      target: '#expertise',
      label: t('Under the hood.', 'ورا الواجهة.'),
      copy: t(
        'The tools and principles I use, from database design to authentication and maintainable architecture.',
        'الأدوات والمبادئ اللي بستخدمها، من تصميم قواعد البيانات للأمان وهندسة الأنظمة.',
      ),
    },
    {
      target: '#terminal',
      label: t('For the curious.', 'للي بيحب يستكشف.'),
      copy: t(
        'Try help, projects, skills, or whoami in the terminal. Keep an eye out for five hidden data packets around the page.',
        'جرب help وprojects وskills وwhoami في التيرمنال. فيه خمس حزم بيانات مخفية في الصفحة.',
      ),
    },
    {
      target: '#contact',
      label: t('Make the connection.', 'نبدأ التواصل.'),
      copy: t(
        'Have a role, a project, or a question? Prepare an email from the form or write to me directly.',
        'عندك فرصة عمل أو مشروع أو سؤال؟ جهز رسالة من الفورم أو ابعتلي مباشرة.',
      ),
    },
  ];
  const available = all.filter(
    (x) => typeof document !== 'undefined' && document.querySelector(x.target),
  );
  const steps = available.length
    ? available
    : [
        {
          target: '#navigation',
          label: t('Welcome aboard.', 'أهلاً بيك.'),
          copy: t(
            'Use the navigation to explore my work, résumé, and ways to work together.',
            'من القائمة تقدر تستكشف أعمالي وسيرتي الذاتية وطرق التعاون.',
          ),
        },
      ];
  const current = steps[Math.min(step, steps.length - 1)];
  useEffect(() => {
    const target = document.querySelector(current.target);
    target?.classList.add('tour-target');
    target?.scrollIntoView({ behavior: motion ? 'smooth' : 'instant', block: 'center' });
    return () => target?.classList.remove('tour-target');
  }, [step, current.target, motion]);
  return (
    <Dialog
      title={t('Portfolio tour', 'جولة في البورتفوليو')}
      onClose={() => setOverlay(null)}
      className="tour-dialog"
    >
      <div className="eyebrow">
        {t('A QUICK LOOK AROUND', 'جولة سريعة')}{' '}
        <span>
          {step + 1} / {steps.length}
        </span>
      </div>
      <h2>{current.label}</h2>
      <p>{current.copy}</p>
      <div className="tour-actions">
        <button className="text-button" type="button" onClick={() => setOverlay(null)}>
          {t('Explore on my own', 'هستكشف بنفسي')}
        </button>
        <button
          className="button button-primary"
          type="button"
          onClick={() => (step < steps.length - 1 ? setStep(step + 1) : setOverlay(null))}
        >
          {step === steps.length - 1
            ? t('You’re all set', 'كده تمام')
            : t('Next stop', 'المحطة الجاية')}
          <Icon name="arrow" size={17} />
        </button>
      </div>
    </Dialog>
  );
}
function Experience() {
  const { t, lang, coins, overlay, setOverlay } = useSite();
  return (
    <>
      <div className="experience-dock">
        <button
          type="button"
          onClick={() => setOverlay('tour')}
          className="dock-tour"
          aria-label={t('Take a tour', 'جولة سريعة')}
        >
          <Icon name="spark" size={15} />
          <span>{t('Take a tour', 'جولة سريعة')}</span>
        </button>
        <span className="dock-separator" />
        <button
          type="button"
          onClick={() => setOverlay('game')}
          aria-label={t('Play packet runner', 'العب باكت رانر')}
        >
          <Icon name="game" size={18} />
        </button>
        <span
          className="packet-count mono"
          title={t('Hidden packets collected', 'الحزم المخفية المجمعة')}
        >
          {coins.length}
          <span>/5</span>
        </span>
      </div>
      {overlay === 'tour' && <Tour />}
      <LoadingScreen />
      {overlay === 'game' && (
        <Dialog
          title={t('Packet runner mini-game', 'لعبة باكت رانر')}
          onClose={() => setOverlay(null)}
          className="game-dialog"
        >
          <MiniGame />
        </Dialog>
      )}
    </>
  );
}
export function Shell({ children }: { children: ReactNode }) {
  return (
    <SiteProvider>
      <a className="skip-link" href="#main">
        Skip to content / انتقل للمحتوى
      </a>
      <div className="reading-progress" aria-hidden="true" />
      <Header />
      {children}
      <Footer />
      <Experience />
    </SiteProvider>
  );
}
