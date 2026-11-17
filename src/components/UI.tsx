'use client';
import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import Link from 'next/link';
import { Icon } from './Icon';
import { useSite } from './SiteProvider';
import { HeroCharacter, type HeroGesture } from './HeroCharacter';
export function Button({
  children,
  href,
  onClick,
  variant = 'primary',
  icon = 'northeast',
  className = '',
  type = 'button',
  download,
}: {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: string;
  icon?: string;
  className?: string;
  type?: 'button' | 'submit';
  download?: boolean;
}) {
  const { tone } = useSite();
  const cls = `button button-${variant} ${className}`;
  const body = (
    <>
      {children}
      {icon && <Icon name={icon} size={18} />}
    </>
  );
  if (href) {
    if (href.startsWith('mailto:') || download)
      return (
        <a href={href} className={cls} onClick={() => tone()} download={download}>
          {body}
        </a>
      );
    return (
      <Link href={href} className={cls} onClick={() => tone()}>
        {body}
      </Link>
    );
  }
  return (
    <button
      className={cls}
      type={type}
      onClick={() => {
        tone();
        onClick?.();
      }}
    >
      {body}
    </button>
  );
}
export function SectionLabel({ number, children }: { number?: string; children: ReactNode }) {
  return (
    <div className="section-label">
      {number && <span className="section-number">{number}</span>}
      <span className="label-line" />
      {children}
    </div>
  );
}
export function Coin({ id }: { id: string }) {
  const { coins, collect, t } = useSite();
  return (
    <button
      type="button"
      className={`packet ${coins.includes(id) ? 'collected' : ''}`}
      onClick={() => collect(id)}
      aria-label={
        coins.includes(id)
          ? t('Packet collected', 'تم جمع الحزمة')
          : t('Collect hidden packet', 'اجمع الحزمة المخفية')
      }
      disabled={coins.includes(id)}
    >
      <span />
      <span />
      <span />
    </button>
  );
}
export function Dialog({
  children,
  title,
  onClose,
  className = '',
}: {
  children: ReactNode;
  title: string;
  onClose: () => void;
  className?: string;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const saved = useRef<HTMLElement | null>(null);
  useEffect(() => {
    saved.current = document.activeElement as HTMLElement;
    ref.current?.showModal();
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
      ref.current?.close();
      saved.current?.focus({ preventScroll: true });
    };
  }, []);
  const { t } = useSite();
  return (
    <dialog
      ref={ref}
      className={`dialog ${className}`}
      aria-label={title}
      onCancel={onClose}
      onClick={(e) => {
        if (e.target === ref.current) onClose();
      }}
    >
      <div className="dialog-panel">
        <button
          type="button"
          className="icon-button dialog-close"
          aria-label={t('Close dialog', 'إغلاق النافذة')}
          onClick={onClose}
        >
          <Icon name="close" />
        </button>
        {children}
      </div>
    </dialog>
  );
}
export function Avatar({
  className = '',
  interactive = true,
}: {
  className?: string;
  interactive?: boolean;
}) {
  const { t, tone } = useSite();
  const [gesture, setGesture] = useState<HeroGesture>('idle');
  const queued = useRef<HeroGesture | null>(null);
  const lastGesture = useRef<HeroGesture>('thumbsUp');
  const finishGesture = useCallback(() => {
    const next = queued.current;
    queued.current = null;
    if (next) lastGesture.current = next;
    setGesture(next ?? 'idle');
  }, []);
  const greet = () => {
    tone();
    if (gesture !== 'idle') {
      // Keep one follow-up gesture; rapid clicks never interrupt a moving joint.
      queued.current = gesture === 'wave' ? 'thumbsUp' : 'wave';
      return;
    }
    const next = lastGesture.current === 'wave' ? 'thumbsUp' : 'wave';
    lastGesture.current = next;
    setGesture(next);
  };
  const label = t('Pixel portrait of Ahmed Mohamed', 'صورة بكسل لأحمد محمد');
  const body = (
    <>
      <HeroCharacter gesture={gesture} onComplete={finishGesture} />
      <span className={`avatar-bubble ${gesture !== 'idle' ? 'visible' : ''}`} aria-live="polite">
        {gesture !== 'idle' && (
          <>
            {gesture === 'thumbsUp'
              ? t('Let’s build something solid!', 'يلا نبني حاجة على أساس سليم!')
              : t('Hey, I’m Ahmed. Let’s build!', 'أهلاً، أنا أحمد. يلا نبني حاجة!')}{' '}
            <span aria-hidden="true">✦</span>
          </>
        )}
      </span>
    </>
  );
  if (!interactive)
    return (
      <div className={`avatar avatar--rigged ${className}`} role="img" aria-label={label}>
        {body}
      </div>
    );
  return (
    <button
      type="button"
      className={`avatar avatar--rigged ${className}`}
      aria-label={t('Say hello to pixel Ahmed', 'سلّم على أحمد')}
      onClick={greet}
    >
      {body}
    </button>
  );
}
export function CopyEmail() {
  const { t, notify } = useSite();
  const [copied, setCopied] = useState(false);
  return (
    <button
      className="icon-button"
      type="button"
      aria-label={t('Copy email address', 'نسخ البريد الإلكتروني')}
      onClick={async () => {
        try {
          await navigator.clipboard.writeText('ahmedmohammed227a@gmail.com');
          setCopied(true);
          notify(t('Email copied to clipboard', 'تم نسخ البريد الإلكتروني'));
          setTimeout(() => setCopied(false), 2500);
        } catch {
          notify(
            t('Please copy the email address directly.', 'انسخ عنوان البريد الإلكتروني مباشرة.'),
          );
        }
      }}
    >
      <Icon name={copied ? 'check' : 'copy'} size={18} />
    </button>
  );
}
