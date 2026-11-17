'use client';
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react';
import Link from 'next/link';
import { useSite } from './SiteProvider';
import { SectionLabel } from './UI';
import { pathFor, profile, projects } from '@/lib/content';
type Row = { id: number; command?: string; content: ReactNode };
export function Terminal() {
  const { lang, t, toggleTheme, setOverlay, tone } = useSite();
  const [value, setValue] = useState('');
  const [rows, setRows] = useState<Row[]>([]);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const output = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const nextId = useRef(1);
  useEffect(() => {
    if (output.current) output.current.scrollTop = output.current.scrollHeight;
  }, [rows]);
  function run(raw: string) {
    const cmd = raw.trim();
    if (!cmd) return;
    setHistory((h) => [cmd, ...h].slice(0, 30));
    setHistoryIndex(-1);
    setValue('');
    tone();
    const key = cmd.toLowerCase();
    if (key === 'clear') {
      setRows([]);
      return;
    }
    let content: ReactNode;
    switch (key) {
      case 'help':
        content = (
          <div className="terminal-help">
            {[
              ['whoami', t('the human behind the code', 'الشخص اللي ورا الكود')],
              ['projects', t('selected builds', 'مشاريع مختارة')],
              ['skills', t('the backend toolkit', 'أدوات الباك إند')],
              ['contact', t('make a connection', 'نتواصل')],
              ['resume', t('read my résumé', 'السيرة الذاتية')],
              ['theme', t('switch light / dark', 'غير الوضع')],
              ['tour', t('take a quick tour', 'خد جولة')],
              ['play', t('one small side quest', 'لعبة صغيرة')],
              ['clear', t('a fresh start', 'بداية جديدة')],
            ].map(([a, b]) => (
              <div key={a}>
                <span>{a}</span>
                {b}
              </div>
            ))}
          </div>
        );
        break;
      case 'whoami':
      case 'about':
        content = (
          <span>
            {t(
              'Ahmed Mohamed — Backend Engineer, Cairo, Egypt. .NET + Node.js. DEPI graduate, 2026. Computer Engineering, expected 2027. Open to roles and freelance projects.',
              'أحمد محمد — مهندس باك إند، القاهرة. .NET وNode.js. خريج DEPI عام ٢٠٢٦. هندسة الحاسبات، التخرج المتوقع ٢٠٢٧. متاح لفرص العمل والفريلانس.',
            )}
          </span>
        );
        break;
      case 'skills':
        content =
          'C# · ASP.NET Core · Node.js · Express.js · EF Core · SQL Server · PostgreSQL · JWT · RBAC · WebSockets · Docker';
        break;
      case 'ls':
      case 'projects':
        content = (
          <div className="terminal-projects">
            {projects.map((p) => (
              <Link href={pathFor(lang, `/work/${p.slug}/`)} key={p.slug}>
                {p.number} / {p.title}
                <span>↗</span>
              </Link>
            ))}
          </div>
        );
        break;
      case 'contact':
      case 'hire':
      case 'sudo hire-ahmed':
        content = <a href={`mailto:${profile.email}`}>{profile.email} ↗</a>;
        break;
      case 'cv':
      case 'resume':
        content = (
          <Link href={pathFor(lang, '/resume/')}>
            {t('Open my résumé', 'افتح سيرتي الذاتية')} ↗
          </Link>
        );
        break;
      case 'theme':
        toggleTheme();
        content = t('Theme switched. A fresh perspective.', 'تم تغيير الوضع. نظرة جديدة.');
        break;
      case 'tour':
        setOverlay('tour');
        content = t('Next stop: a little look around.', 'المحطة الجاية: جولة سريعة.');
        break;
      case 'game':
      case 'play':
        setOverlay('game');
        content = t(
          'Packet runner loaded. Keep the connection alive.',
          'باكت رانر جاهز. حافظ على الاتصال.',
        );
        break;
      case 'hello':
      case 'hi':
        content = t('Hey there! Type help to explore.', 'أهلاً بيك! اكتب help عشان تستكشف.');
        break;
      default:
        content = t(`Unknown command: ${cmd}. Try help.`, `الأمر مش معروف: ${cmd}. جرّب help.`);
    }
    setRows((r) => [...r, { id: nextId.current++, command: cmd, content }].slice(-35));
  }
  function submit(e: FormEvent) {
    e.preventDefault();
    run(value);
  }
  return (
    <section className="section terminal-section" id="terminal">
      <div className="container">
        <div className="terminal-copy" data-reveal>
          <SectionLabel>{t('A DIFFERENT INTERFACE', 'واجهة مختلفة')}</SectionLabel>
          <h2>
            {t('Prefer the', 'بتحب')}
            <br />
            <span className="teal">{t('command line?', 'الـ command line؟')}</span>
          </h2>
          <p>
            {t(
              'Same engineer. Fewer clicks. Have a look around.',
              'نفس المهندس. ضغطات أقل. استكشف براحتك.',
            )}
          </p>
          <div className="terminal-suggestions">
            {['help', 'whoami', 'projects'].map((x) => (
              <button
                type="button"
                key={x}
                onClick={() => {
                  run(x);
                  input.current?.focus();
                }}
              >
                {x}
                <span>↵</span>
              </button>
            ))}
          </div>
        </div>
        <div className="terminal-window" data-reveal>
          <div className="window-bar">
            <div className="window-dots" aria-hidden="true">
              <i />
              <i />
              <i />
            </div>
            <span className="mono">ahmed.sh</span>
            <span className="terminal-connected mono">CONNECTED</span>
          </div>
          <div
            className="terminal-output"
            ref={output}
            role="log"
            aria-label={t('Terminal output', 'مخرجات التيرمنال')}
            aria-live="polite"
            tabIndex={0}
          >
            <p className="terminal-welcome">
              {t('Welcome to my corner of the internet.', 'أهلاً بيك في ركني على الإنترنت.')}
              <br />
              {t('Type', 'اكتب')} <span>help</span> {t('to get started.', 'عشان تبدأ.')}
            </p>
            {rows.map((r) => (
              <div className="terminal-row" key={r.id}>
                <p className="terminal-command">
                  <span>➜ ~</span> {r.command}
                </p>
                <div className="terminal-response">{r.content}</div>
              </div>
            ))}
          </div>
          <form onSubmit={submit} className="terminal-input-line">
            <label htmlFor="terminal-input" className="terminal-prompt" aria-hidden="true">
              ➜ ~
            </label>
            <input
              id="terminal-input"
              ref={input}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              maxLength={100}
              autoComplete="off"
              spellCheck={false}
              aria-label={t('Terminal command', 'أمر التيرمنال')}
              placeholder={t('type a command…', 'اكتب أمر…')}
              onKeyDown={(e) => {
                if (e.key === 'ArrowUp') {
                  e.preventDefault();
                  const idx = Math.min(historyIndex + 1, history.length - 1);
                  setHistoryIndex(idx);
                  setValue(history[idx] || '');
                }
                if (e.key === 'ArrowDown') {
                  e.preventDefault();
                  const idx = Math.max(historyIndex - 1, -1);
                  setHistoryIndex(idx);
                  setValue(idx < 0 ? '' : history[idx] || '');
                }
              }}
            />
            <button type="submit" aria-label={t('Run command', 'تشغيل الأمر')}>
              ↵
            </button>
          </form>
          <div className="terminal-bottom mono">
            <span>↑ ↓ {t('HISTORY', 'السجل')}</span>
            <span>ENTER {t('TO RUN', 'للتشغيل')}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
