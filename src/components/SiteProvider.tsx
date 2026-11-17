'use client';
import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import type { Lang } from '@/lib/content';
type Overlay = 'tour' | 'game' | 'intro' | null;
type SiteState = {
  lang: Lang;
  t: (en: string, ar: string) => string;
  theme: string;
  toggleTheme: () => void;
  motion: boolean;
  toggleMotion: () => void;
  sound: boolean;
  toggleSound: () => void;
  music: boolean;
  toggleMusic: () => void;
  tone: (kind?: string) => void;
  overlay: Overlay;
  setOverlay: (o: Overlay) => void;
  coins: string[];
  collect: (id: string) => void;
  toast: string;
  notify: (s: string) => void;
};
const SiteContext = createContext<SiteState | null>(null);
export function SiteProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const lang: Lang = pathname.startsWith('/ar') ? 'ar' : 'en';
  const [theme, setTheme] = useState('dark');
  const [motion, setMotion] = useState(true);
  const [sound, setSound] = useState(false);
  const [music, setMusic] = useState(false);
  const [overlay, setOverlay] = useState<Overlay>(null);
  const [coins, setCoins] = useState<string[]>([]);
  const [toast, setToast] = useState('');
  const audio = useRef<AudioContext | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const t = (en: string, ar: string) => (lang === 'ar' ? ar : en);
  function notify(s: string) {
    setToast(s);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(''), 3300);
  }
  function getAudio() {
    if (!audio.current) audio.current = new AudioContext();
    if (audio.current.state === 'suspended') void audio.current.resume();
    return audio.current;
  }
  function tone(kind = 'tap') {
    if (!sound) return;
    try {
      const ctx = getAudio();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(kind === 'coin' ? 880 : 430, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(
        kind === 'coin' ? 1400 : 580,
        ctx.currentTime + 0.1,
      );
      gain.gain.setValueAtTime(0.035, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.18);
      osc.connect(gain).connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.2);
    } catch {}
  }
  useEffect(() => {
    try {
      setTheme(localStorage.getItem('am-theme') || 'dark');
      const savedMotion = localStorage.getItem('am-motion');
      setMotion(!matchMedia('(prefers-reduced-motion: reduce)').matches && savedMotion !== 'off');
      setCoins(JSON.parse(localStorage.getItem('am-coins') || '[]'));
    } catch {}
    const q = matchMedia('(prefers-reduced-motion: reduce)');
    const change = () => {
      if (q.matches) setMotion(false);
    };
    q.addEventListener('change', change);
    return () => q.removeEventListener('change', change);
  }, []);
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem('am-theme', theme);
    } catch {}
  }, [theme]);
  useEffect(() => {
    document.documentElement.dataset.motion = motion ? 'on' : 'off';
  }, [motion]);
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const h = document.documentElement.scrollHeight - innerHeight;
        document.documentElement.style.setProperty(
          '--scroll-progress',
          `${h > 0 ? (scrollY / h) * 100 : 0}%`,
        );
      });
    };
    update();
    addEventListener('scroll', update, { passive: true });
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible');
            observer.unobserve(e.target);
          }
        }),
      { threshold: 0.08, rootMargin: '0px 0px -20px 0px' },
    );
    const register = () =>
      document
        .querySelectorAll('[data-reveal]:not(.is-visible)')
        .forEach((el) => observer.observe(el));
    register();
    const mutations = new MutationObserver(register);
    mutations.observe(document.body, { childList: true, subtree: true });
    document.documentElement.dataset.revealReady = 'true';
    return () => {
      cancelAnimationFrame(frame);
      removeEventListener('scroll', update);
      observer.disconnect();
      mutations.disconnect();
    };
  }, [pathname]);
  useEffect(() => {
    if (!music) return;
    let timer: ReturnType<typeof setInterval>;
    const notes = [130.81, 164.81, 196, 146.83];
    let index = 0;
    const pulse = () => {
      if (document.hidden) return;
      try {
        const ctx = getAudio();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.value = notes[index++ % notes.length];
        gain.gain.setValueAtTime(0.0001, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.014, ctx.currentTime + 0.4);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 2);
        osc.connect(gain).connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 2.1);
      } catch {}
    };
    pulse();
    timer = setInterval(pulse, 2400);
    return () => clearInterval(timer);
  }, [music]);
  useEffect(
    () => () => {
      if (toastTimer.current) clearTimeout(toastTimer.current);
      void audio.current?.close();
    },
    [],
  );
  function collect(id: string) {
    if (coins.includes(id)) return;
    const next = [...coins, id];
    setCoins(next);
    try {
      localStorage.setItem('am-coins', JSON.stringify(next));
    } catch {}
    tone('coin');
    notify(
      next.length === 5
        ? t('All packets found. Explorer mode: complete!', 'جمعت كل الحزم. اكتمل وضع المستكشف!')
        : t(`Packet collected · ${next.length}/5`, `جمعت حزمة · ${next.length}/5`),
    );
  }
  return (
    <SiteContext.Provider
      value={{
        lang,
        t,
        theme,
        toggleTheme: () => setTheme((s) => (s === 'dark' ? 'light' : 'dark')),
        motion,
        toggleMotion: () => setMotion((s) => !s),
        sound,
        toggleSound: () => {
          getAudio();
          setSound((s) => !s);
        },
        music,
        toggleMusic: () => {
          getAudio();
          setMusic((s) => !s);
        },
        tone,
        overlay,
        setOverlay,
        coins,
        collect,
        toast,
        notify,
      }}
    >
      {children}
      <div className={`toast ${toast ? 'shown' : ''}`} role="status" aria-live="polite">
        {toast}
      </div>
    </SiteContext.Provider>
  );
}
export function useSite() {
  const ctx = useContext(SiteContext);
  if (!ctx) throw new Error('SiteProvider is required');
  return ctx;
}
