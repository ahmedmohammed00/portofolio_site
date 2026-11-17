'use client';
import { useState, type FormEvent } from 'react';
import { useSite } from './SiteProvider';
import { Button, Coin, CopyEmail, SectionLabel } from './UI';
import { Icon } from './Icon';
import { profile, pathFor } from '@/lib/content';
export function createDraft(subject: string, body: string) {
  return `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
export function Contact() {
  const { t, lang } = useSite();
  const [intent, setIntent] = useState('project');
  const [draft, setDraft] = useState('');
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const subject =
      intent === 'role'
        ? 'Let’s talk about a role'
        : intent === 'hello'
          ? 'Hello Ahmed!'
          : 'Let’s build something together';
    const link = createDraft(
      subject,
      `Hi Ahmed,\n\n${data.get('message')}\n\nFrom: ${data.get('name')}\nReply to: ${data.get('email')}\nInterest: ${intent}`,
    );
    setDraft(link);
    window.location.href = link;
  }
  return (
    <section className="section contact-section" id="contact">
      <div className="container">
        <div className="contact-copy" data-reveal>
          <SectionLabel number="05">{t('MAKE THE CONNECTION', 'نبدأ التواصل')}</SectionLabel>
          <h2>
            {t('Good things start', 'كل حاجة حلوة')}
            <br />
            <span className="teal">{t('with a hello.', 'بتبدأ بأهلاً.')}</span>
          </h2>
          <p>
            {t(
              'A backend to build, a team to join, or an idea to explore. I’d love to hear about it.',
              'باك إند نبنيه، فريق أنضم له، أو فكرة نستكشفها. يسعدني أسمع منك.',
            )}
          </p>
          <div className="contact-email">
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
            <CopyEmail />
          </div>
          <div className="contact-location">
            <Icon name="pin" size={17} />
            {t('Cairo, Egypt · open to remote work', 'القاهرة، مصر · متاح للعمل عن بُعد')}
          </div>
          <LinkResume />
          <Coin id="contact" />
        </div>
        <form className="contact-form" onSubmit={submit} data-reveal>
          <fieldset>
            <legend className="eyebrow">{t('I’M REACHING OUT ABOUT', 'عايز أتكلم عن')}</legend>
            <div className="choice-group">
              {[
                { id: 'project', en: 'A project', ar: 'مشروع' },
                { id: 'role', en: 'A role', ar: 'فرصة عمل' },
                { id: 'hello', en: 'Just saying hi', ar: 'بقول أهلاً' },
              ].map((x) => (
                <button
                  type="button"
                  key={x.id}
                  className={intent === x.id ? 'selected' : ''}
                  aria-pressed={intent === x.id}
                  onClick={() => setIntent(x.id)}
                >
                  {t(x.en, x.ar)}
                </button>
              ))}
            </div>
          </fieldset>
          <div className="form-row">
            <label>
              {t('Your name', 'اسمك')}
              <input
                required
                name="name"
                autoComplete="name"
                placeholder={t('What should I call you?', 'أناديك بإيه؟')}
                minLength={2}
                maxLength={100}
              />
            </label>
            <label>
              {t('Your email', 'بريدك الإلكتروني')}
              <input
                type="email"
                required
                name="email"
                autoComplete="email"
                placeholder="you@company.com"
                dir="ltr"
                maxLength={150}
              />
            </label>
          </div>
          <label>
            {t('What’s on your mind?', 'بتفكر في إيه؟')}
            <textarea
              required
              name="message"
              rows={4}
              minLength={10}
              maxLength={3000}
              placeholder={t(
                'Tell me a little about the project or opportunity…',
                'احكيلي شوية عن المشروع أو فرصة العمل…',
              )}
            />
          </label>
          <div className="form-submit">
            <Button type="submit" icon="northeast">
              {t('Prepare email', 'جهز الرسالة')}
            </Button>
            <span>{t('Opens your email app.', 'بتفتح تطبيق البريد عندك.')}</span>
          </div>
          <p className="form-note">
            {t(
              'Your details stay in your email draft. This site doesn’t store submissions.',
              'التفاصيل بتفضل في مسودة بريدك. الموقع مش بيخزن الرسائل.',
            )}
          </p>
          {draft && (
            <p className="draft-status" role="status">
              {t(
                'Your draft is ready. If your email app didn’t open,',
                'المسودة جاهزة. لو تطبيق البريد مفتحش،',
              )}{' '}
              <a href={draft}>{t('open it here', 'افتحها من هنا')}</a>{' '}
              {t('or copy my email address.', 'أو انسخ عنوان بريدي.')}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
function LinkResume() {
  const { lang, t } = useSite();
  return (
    <Button href={pathFor(lang, '/resume/')} variant="text" icon="download">
      {t('View my résumé', 'شوف سيرتي الذاتية')}
    </Button>
  );
}
export function HirePage() {
  const { lang, t } = useSite();
  const [kind, setKind] = useState('Backend / API');
  const [draft, setDraft] = useState('');
  const offers = [
    {
      title: 'Backend / API',
      ar: 'باك إند / API',
      icon: 'code',
      intro: t('The engine behind your product.', 'المحرك اللي ورا منتجك.'),
      items: [
        t('REST API design & implementation', 'تصميم وتنفيذ REST APIs'),
        t('.NET or Node.js backend', '.NET أو Node.js'),
        t('Authentication & authorization', 'تسجيل الدخول والصلاحيات'),
        t('Database integration & API documentation', 'ربط قاعدة البيانات وتوثيق الواجهات'),
      ],
    },
    {
      title: 'Platform / System',
      ar: 'منصة / نظام',
      icon: 'layers',
      intro: t('Structure for your operations.', 'نظام ينظم عملياتك.'),
      items: [
        t('Domain & database modeling', 'تصميم الدومين وقاعدة البيانات'),
        t('Roles and business workflows', 'الأدوار وسير العمل'),
        t('Tenant-aware data access', 'عزل بيانات العملاء'),
        t('Dashboards & integrations', 'لوحات التحكم والتكاملات'),
      ],
    },
    {
      title: 'Join your team',
      ar: 'فرصة في فريقك',
      icon: 'globe',
      intro: t('A backend engineer for what’s next.', 'مهندس باك إند للمرحلة الجاية.'),
      items: [
        t('Backend engineering opportunities', 'فرص هندسة الباك إند'),
        t('.NET and Node.js projects', 'مشاريع .NET وNode.js'),
        t('Clear, collaborative communication', 'تواصل واضح وتعاون'),
        t('Cairo-based, open to remote work', 'من القاهرة ومتاح للعمل عن بُعد'),
      ],
    },
  ];
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const link = createDraft(
      `${kind} · Let’s work together`,
      `Hi Ahmed,\n\nI’m interested in: ${kind}\n\n${d.get('details')}\n\nScope / budget: ${d.get('budget') || 'Let’s discuss'}\nTimeline: ${d.get('timeline')}\n\nFrom: ${d.get('name')}\nReply to: ${d.get('email')}`,
    );
    setDraft(link);
    window.location.href = link;
  }
  return (
    <main id="main">
      <section className="section page-top hire-top">
        <div className="container">
          <SectionLabel>{t('WORK TOGETHER', 'نعمل سوا')}</SectionLabel>
          <div className="hire-heading">
            <div>
              <h1 className="page-title">
                {t('Let’s build', 'نبني حاجة')}
                <br />
                <span className="teal">{t('something solid.', 'على أساس سليم.')}</span>
              </h1>
              <p className="page-intro">
                {t(
                  'Have a project in mind or a place on your team? Tell me what you’re working on.',
                  'عندك مشروع أو فرصة في فريقك؟ احكيلي عن اللي بتشتغل عليه.',
                )}
              </p>
            </div>
            <span className="availability">
              <span className="status-dot" />
              {t('Open to roles & freelance', 'متاح لفرص العمل والفريلانس')}
            </span>
          </div>
          <div className="offer-grid">
            {offers.map((o, i) => (
              <article className="offer-card" key={o.title} data-reveal>
                <span className="offer-number mono">0{i + 1}</span>
                <Icon name={o.icon} size={26} />
                <h2>{t(o.title, o.ar)}</h2>
                <p>{o.intro}</p>
                <ul>
                  {o.items.map((x) => (
                    <li key={x}>
                      <Icon name="check" size={15} />
                      {x}
                    </li>
                  ))}
                </ul>
                <button
                  className="button button-secondary"
                  type="button"
                  onClick={() => {
                    setKind(o.title);
                    document.querySelector('#brief')?.scrollIntoView({ behavior: 'smooth' });
                    setTimeout(
                      () =>
                        document
                          .querySelector<HTMLInputElement>('#brief-name')
                          ?.focus({ preventScroll: true }),
                      550,
                    );
                  }}
                >
                  {t('Let’s discuss', 'نتكلم في التفاصيل')}
                  <Icon name="arrow" size={17} />
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section brief-section" id="brief">
        <div className="container">
          <div>
            <SectionLabel>{t('THE FIRST STEP', 'أول خطوة')}</SectionLabel>
            <h2>
              {t('A little context.', 'شوية تفاصيل.')}
              <br />
              <span className="muted-heading">{t('A better conversation.', 'حوار أوضح.')}</span>
            </h2>
            <p>
              {t(
                'No complicated process. Share the basics and we’ll take it from there. Scope, timing, and deliverables are agreed together.',
                'من غير تعقيد. شاركني الأساسيات ونكمل من هناك. بنتفق سوا على النطاق والوقت والتسليمات.',
              )}
            </p>
          </div>
          <form className="brief-form" onSubmit={submit}>
            <fieldset>
              <legend className="eyebrow">{t('WHAT DO YOU HAVE IN MIND?', 'بتفكر في إيه؟')}</legend>
              <div className="choice-group">
                {offers.map((o) => (
                  <button
                    key={o.title}
                    type="button"
                    aria-pressed={kind === o.title}
                    className={kind === o.title ? 'selected' : ''}
                    onClick={() => setKind(o.title)}
                  >
                    {t(o.title, o.ar)}
                  </button>
                ))}
              </div>
            </fieldset>
            <div className="form-row">
              <label htmlFor="brief-name">
                {t('Your name', 'اسمك')}
                <input
                  id="brief-name"
                  name="name"
                  autoComplete="name"
                  required
                  minLength={2}
                  maxLength={100}
                />
              </label>
              <label>
                {t('Your email', 'بريدك الإلكتروني')}
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  dir="ltr"
                  maxLength={150}
                />
              </label>
            </div>
            <div className="form-row">
              <label>
                {t('Scope / budget (optional)', 'النطاق / الميزانية (اختياري)')}
                <input
                  name="budget"
                  placeholder={t('A rough idea is enough', 'فكرة مبدئية كفاية')}
                  maxLength={200}
                />
              </label>
              <label>
                {t('Timeline', 'التوقيت')}
                <select name="timeline">
                  <option value="Let’s discuss">{t('Let’s discuss', 'نتفق سوا')}</option>
                  <option value="Within a month">{t('Within a month', 'خلال شهر')}</option>
                  <option value="1–3 months">{t('1–3 months', 'خلال ١–٣ شهور')}</option>
                  <option value="Flexible">{t('Flexible', 'مرن')}</option>
                </select>
              </label>
            </div>
            <label>
              {t('Tell me a little more', 'احكيلي أكتر')}
              <textarea
                required
                name="details"
                rows={5}
                minLength={10}
                maxLength={3000}
                placeholder={t(
                  'The idea, the challenge, or the role. Links are welcome.',
                  'الفكرة أو التحدي أو فرصة العمل. ابعت لينكات لو متاحة.',
                )}
              />
            </label>
            <Button type="submit">{t('Prepare my brief', 'جهز تفاصيل رسالتي')}</Button>
            <p className="form-note">
              {t(
                'Opens an email draft for you to review and send. Nothing is submitted automatically.',
                'بيفتح مسودة بريد تراجعها وتبعتها بنفسك. مش بيتبعت أي شيء تلقائياً.',
              )}
            </p>
            {draft && (
              <p role="status" className="draft-status">
                {t('Draft ready.', 'المسودة جاهزة.')}{' '}
                <a href={draft}>{t('Open your email app', 'افتح تطبيق البريد')}</a>
              </p>
            )}
          </form>
        </div>
      </section>
    </main>
  );
}
