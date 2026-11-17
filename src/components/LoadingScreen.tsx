'use client';

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
} from 'react';
import { CHARACTER_SPRITE, INTRO_SESSION_KEY, type CharacterGesture } from '@/lib/character';
import { CharacterSprite } from './CharacterSprite';
import { assetPath } from '@/lib/urls';
import { useSite } from './SiteProvider';

type Phase = 'loading' | 'celebrating' | 'waving' | 'ready' | 'jumping' | 'leaving';
const TILE_DELAYS = Array.from(
  { length: 96 },
  (_, index) => ((index * 17 + Math.floor(index / 12) * 7) % 19) * 15,
);

export function LoadingScreen() {
  const { t, lang, motion, overlay, setOverlay, tone } = useSite();
  const [automatic, setAutomatic] = useState(false);
  const [phase, setPhase] = useState<Phase>('loading');
  const [progress, setProgress] = useState(0);
  const dialog = useRef<HTMLDialogElement>(null);
  const startButton = useRef<HTMLButtonElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);
  const departure = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closing = useRef<ReturnType<typeof setTimeout> | null>(null);
  const exiting = useRef(false);
  const open = automatic || overlay === 'intro';

  useLayoutEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(INTRO_SESSION_KEY) === '1';
    } catch {}
    if (seen) document.documentElement.dataset.loader = 'done';
    else setAutomatic(true);
  }, []);

  const finish = useCallback(() => {
    if (departure.current) clearTimeout(departure.current);
    if (closing.current) clearTimeout(closing.current);
    try {
      sessionStorage.setItem(INTRO_SESSION_KEY, '1');
    } catch {}
    document.documentElement.dataset.loader = 'done';
    setAutomatic(false);
    setOverlay(null);
  }, [setOverlay]);

  useLayoutEffect(() => {
    if (!open) return;
    previousFocus.current = document.activeElement as HTMLElement;
    const previousOverflow = document.body.style.overflow;
    const previousRootOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
    dialog.current?.showModal();
    dialog.current?.focus({ preventScroll: true });
    document.documentElement.dataset.loader = 'active';
    return () => {
      document.body.style.overflow = previousOverflow;
      document.documentElement.style.overflow = previousRootOverflow;
      dialog.current?.close();
      previousFocus.current?.focus({ preventScroll: true });
      if (departure.current) clearTimeout(departure.current);
      if (closing.current) clearTimeout(closing.current);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    let cancelled = false;
    let animation = 0;
    let complete = 0;
    let finished = false;
    let forced = false;
    const poseTimers: ReturnType<typeof setTimeout>[] = [];
    const imageCleanups: (() => void)[] = [];
    const started = performance.now();
    const minimumDuration = motion ? 1900 : 250;
    exiting.current = false;
    setPhase('loading');
    setProgress(0);

    const imageReady = (source: string) =>
      new Promise<void>((resolve) => {
        const image = new Image();
        const done = () => {
          image.onload = null;
          image.onerror = null;
          resolve();
        };
        image.onload = done;
        image.onerror = done;
        image.src = source;
        if (image.complete) done();
        imageCleanups.push(() => {
          image.onload = null;
          image.onerror = null;
        });
      });
    const fontReady = (font: string) =>
      document.fonts
        ? document.fonts
            .load(font)
            .then(() => undefined)
            .catch(() => undefined)
        : Promise.resolve();
    const assets = [
      imageReady(CHARACTER_SPRITE),
      imageReady(assetPath('/images/ahmed-avatar.jpeg')),
      fontReady('14px "Press Start 2P"'),
      fontReady('16px "Space Grotesk"'),
      fontReady('14px "Inter"'),
      ...(lang === 'ar' ? [fontReady('16px "IBM Plex Sans Arabic"')] : []),
    ];
    assets.forEach((asset) => {
      void asset.then(() => {
        if (!cancelled) complete += 1;
      });
    });

    const ready = () => {
      if (finished || cancelled) return;
      finished = true;
      setProgress(100);
      if (!motion) {
        setPhase('ready');
        return;
      }
      setPhase('celebrating');
      poseTimers.push(setTimeout(() => setPhase('waving'), 420));
      poseTimers.push(setTimeout(() => setPhase('ready'), 1250));
    };
    const update = (now: number) => {
      if (cancelled) return;
      const elapsed = now - started;
      const assetsFraction = forced ? 1 : complete / assets.length;
      const timeFraction = Math.min(elapsed / minimumDuration, 1);
      const next = Math.floor(Math.min(assetsFraction, timeFraction) * 100);
      setProgress(next);
      if (assetsFraction === 1 && elapsed >= minimumDuration) {
        ready();
        return;
      }
      animation = requestAnimationFrame(update);
    };
    animation = requestAnimationFrame(update);
    const timeout = setTimeout(() => {
      forced = true;
    }, 6500);
    return () => {
      cancelled = true;
      cancelAnimationFrame(animation);
      clearTimeout(timeout);
      poseTimers.forEach(clearTimeout);
      imageCleanups.forEach((cleanup) => cleanup());
    };
  }, [open, lang, motion]);

  useEffect(() => {
    if (open && phase === 'ready') startButton.current?.focus({ preventScroll: true });
  }, [open, phase]);

  const enter = () => {
    if (phase !== 'ready' || exiting.current) return;
    exiting.current = true;
    tone('coin');
    if (!motion) {
      finish();
      return;
    }
    setPhase('jumping');
    departure.current = setTimeout(() => {
      setPhase('leaving');
      closing.current = setTimeout(finish, 580);
    }, 680);
  };

  const gesture: CharacterGesture =
    phase === 'loading'
      ? 'walk'
      : phase === 'celebrating'
        ? 'thumbsUp'
        : phase === 'waving'
          ? 'wave'
          : phase === 'ready'
            ? 'point'
            : 'jump';
  const ready = phase === 'ready';
  const status =
    phase === 'loading'
      ? t('Getting things ready', 'بنجهز كل حاجة')
      : phase === 'jumping' || phase === 'leaving'
        ? t('Let’s build something solid.', 'يلا نبني حاجة على أساس سليم.')
        : t('All set. Your next connection starts here.', 'كله جاهز. أول خطوة بتبدأ من هنا.');

  if (!open) return null;

  return (
    <dialog
      ref={dialog}
      className={`loading-screen loading-${phase}`}
      aria-labelledby="loading-title"
      aria-describedby="loading-status"
      tabIndex={-1}
      onCancel={(event) => {
        event.preventDefault();
        finish();
      }}
      onKeyDown={(event) => {
        if (event.key === 'Enter' && ready && !(event.target instanceof HTMLButtonElement)) {
          event.preventDefault();
          enter();
        }
      }}
    >
      <div className="loading-scenery" aria-hidden="true">
        <div className="loading-stars">
          <i />
          <i />
          <i />
          <i />
          <i />
          <i />
        </div>
        <div className="loading-horizon" />
      </div>
      <div className="loading-topbar">
        <span className="mono">
          AM<span className="teal">_</span> / PORTFOLIO
        </span>
        <button type="button" className="loading-skip" onClick={finish}>
          {t('Skip intro', 'تخطي المقدمة')} <span aria-hidden="true">↗</span>
        </button>
      </div>
      <div className="loading-content">
        <p className="loading-eyebrow mono">{t('A LITTLE INTRODUCTION', 'نتعرف الأول')}</p>
        <h2 id="loading-title" className="loading-title">
          {t('AHMED MOHAMED', 'أحمد محمد')}
          <span className="loading-cursor" aria-hidden="true">
            _
          </span>
        </h2>
        <p className="loading-role">
          {t('BACKEND ENGINEER · .NET & NODE.JS', 'مهندس باك إند · .NET وNode.js')}
        </p>
        <div className="loading-progress-area">
          <div
            className={`loading-actor ${phase === 'ready' ? 'loading-actor-pointing' : ''}`}
            style={{ '--actor-position': `${progress}%` } as CSSProperties}
          >
            <CharacterSprite gesture={gesture} />
          </div>
          <div
            className="loading-progress"
            role="progressbar"
            aria-label={t('Portfolio loading progress', 'تقدم تحميل البورتفوليو')}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={progress}
            aria-valuetext={phase === 'loading' ? `${progress}%` : t('Ready', 'جاهز')}
          >
            <span className="loading-progress-fill" style={{ width: `${progress}%` }} />
          </div>
          <div className="loading-progress-meta mono" aria-hidden="true">
            <span>
              {phase === 'loading'
                ? t('LOADING', 'جاري التحميل')
                : t('READY TO BUILD', 'جاهزين نبني')}
            </span>
            <span>{String(progress).padStart(3, '0')}%</span>
          </div>
        </div>
        <button
          ref={startButton}
          type="button"
          className="loading-start"
          disabled={!ready}
          onClick={enter}
        >
          <span className="loading-play" aria-hidden="true">
            ▶
          </span>
          {t('PRESS START', 'ابدأ التجربة')}
        </button>
        <p className="loading-key-hint">
          {ready
            ? t('or press Enter', 'أو اضغط Enter')
            : phase === 'loading'
              ? t('A moment to get ready…', 'لحظة ونكون جاهزين…')
              : t('Good to see you here.', 'سعيد بوجودك هنا.')}
        </p>
        <p id="loading-status" className="loading-status" role="status" aria-live="polite">
          {status}
        </p>
      </div>
      <div className="loading-footer mono" aria-hidden="true">
        <span>{t('CAIRO, EG', 'القاهرة، مصر')}</span>
        <span>BUILD. CONNECT. REPEAT.</span>
      </div>
      <div className="loading-tiles" aria-hidden="true">
        {TILE_DELAYS.map((delay, index) => (
          <span key={index} style={{ '--tile-delay': `${delay}ms` } as CSSProperties} />
        ))}
      </div>
    </dialog>
  );
}
