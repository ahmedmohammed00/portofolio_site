'use client';
import { useEffect, useRef, useState } from 'react';
import { useSite } from './SiteProvider';
import { Icon } from './Icon';
type Obstacle = { x: number; w: number; h: number; passed: boolean };
export default function MiniGame() {
  const { t, tone } = useSite();
  const canvas = useRef<HTMLCanvasElement>(null);
  const [state, setState] = useState<'ready' | 'running' | 'paused' | 'over'>('ready');
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);
  const game = useRef({
    y: 0,
    vy: 0,
    grounded: true,
    score: 0,
    distance: 0,
    obstacles: [] as Obstacle[],
    spawn: 0,
    last: 0,
  });
  useEffect(() => {
    try {
      setBest(Number(localStorage.getItem('am-runner-best') || 0));
    } catch {}
  }, []);
  function jump() {
    const g = game.current;
    if (state !== 'running') return;
    if (g.grounded) {
      g.vy = -650;
      g.grounded = false;
      tone();
    }
  }
  function start() {
    game.current = {
      y: 0,
      vy: 0,
      grounded: true,
      score: 0,
      distance: 0,
      obstacles: [],
      spawn: 1.5,
      last: 0,
    };
    setScore(0);
    setState('running');
  }
  useEffect(() => {
    const c = canvas.current;
    const ctx = c?.getContext('2d');
    if (!c || !ctx) return;
    let raf = 0;
    let lastScore = -1;
    function draw(time: number) {
      const g = game.current;
      const dt = g.last ? Math.min((time - g.last) / 1000, 0.035) : 0;
      g.last = time;
      const running = state === 'running';
      if (running) {
        g.distance += dt * 230;
        g.vy += 1750 * dt;
        g.y += g.vy * dt;
        if (g.y >= 0) {
          g.y = 0;
          g.vy = 0;
          g.grounded = true;
        }
        g.spawn -= dt;
        if (g.spawn <= 0) {
          g.obstacles.push({
            x: 830,
            w: 22 + Math.random() * 15,
            h: 28 + Math.random() * 14,
            passed: false,
          });
          g.spawn = 1.35 + Math.random() * 0.8;
        }
        const speed = 230 + Math.min(g.score * 7, 140);
        for (const o of g.obstacles) {
          o.x -= speed * dt;
          if (!o.passed && o.x + o.w < 110) {
            o.passed = true;
            g.score += 1;
          }
          const top = 210 + g.y - 42;
          if (o.x < 144 && o.x + o.w > 116 && 210 - o.h < top + 39 && 210 > top + 4) {
            setState('over');
            try {
              const current = Number(localStorage.getItem('am-runner-best') || 0);
              if (g.score > current) {
                localStorage.setItem('am-runner-best', String(g.score));
                setBest(g.score);
              }
            } catch {}
          }
        }
        g.obstacles = g.obstacles.filter((o) => o.x > -60);
        if (g.score !== lastScore) {
          lastScore = g.score;
          setScore(g.score);
        }
      }
      ctx!.fillStyle = '#091210';
      ctx!.fillRect(0, 0, 800, 260);
      ctx!.strokeStyle = '#17312a';
      ctx!.lineWidth = 1;
      for (let x = -((g.distance * 0.2) % 40); x < 800; x += 40) {
        ctx!.beginPath();
        ctx!.moveTo(x, 0);
        ctx!.lineTo(x, 260);
        ctx!.stroke();
      }
      for (let y = 10; y < 260; y += 40) {
        ctx!.beginPath();
        ctx!.moveTo(0, y);
        ctx!.lineTo(800, y);
        ctx!.stroke();
      }
      ctx!.fillStyle = '#254a3d';
      ctx!.fillRect(0, 210, 800, 2);
      for (let x = -(g.distance % 30); x < 800; x += 30) ctx!.fillRect(x, 225, 12, 2);
      const py = 168 + g.y;
      ctx!.fillStyle = '#56ddba';
      ctx!.fillRect(110, py, 38, 38);
      ctx!.fillStyle = '#091210';
      ctx!.fillRect(115, py + 5, 28, 6);
      ctx!.fillRect(119, py + 19, 4, 5);
      ctx!.fillRect(135, py + 19, 4, 5);
      ctx!.fillStyle = '#f29683';
      ctx!.fillRect(122, py + 29, 13, 3);
      ctx!.fillStyle = '#56ddba';
      ctx!.fillRect(113, py + 38, 8, 5);
      ctx!.fillRect(138, py + 38, 8, 5);
      for (const o of g.obstacles) {
        ctx!.fillStyle = '#ef8f7e';
        ctx!.fillRect(o.x, 210 - o.h, o.w, o.h);
        ctx!.fillStyle = '#091210';
        ctx!.fillRect(o.x + 5, 215 - o.h, o.w - 10, 4);
      }
      if (!running) {
        ctx!.fillStyle = 'rgba(9,18,16,.75)';
        ctx!.fillRect(0, 0, 800, 260);
        ctx!.fillStyle = '#e7f2ec';
        ctx!.font = '24px monospace';
        ctx!.textAlign = 'center';
        ctx!.fillText(
          state === 'ready'
            ? 'KEEP THE CONNECTION ALIVE'
            : state === 'paused'
              ? 'CONNECTION PAUSED'
              : 'CONNECTION LOST',
          400,
          125,
        );
        ctx!.font = '13px monospace';
        ctx!.fillStyle = '#87a99a';
        ctx!.fillText(
          state === 'ready'
            ? 'JUMP OVER THE BROKEN PACKETS'
            : state === 'over'
              ? 'EVERY GOOD ENGINEER TRIES AGAIN'
              : 'TAKE YOUR TIME',
          400,
          155,
        );
      }
      if (running) raf = requestAnimationFrame(draw);
    }
    raf = requestAnimationFrame(draw);
    const visibility = () => {
      if (document.hidden && state === 'running') setState('paused');
    };
    document.addEventListener('visibilitychange', visibility);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener('visibilitychange', visibility);
    };
  }, [state]);
  return (
    <div className="runner">
      <span className="eyebrow">{t('A SMALL SIDE QUEST', 'مهمة جانبية صغيرة')}</span>
      <h2>
        {t('Packet runner', 'باكت رانر')}
        <span className="teal">_</span>
      </h2>
      <p>
        {t(
          'Keep the connection alive. Jump over broken packets.',
          'حافظ على الاتصال. اقفز فوق الحزم المعطلة.',
        )}
      </p>
      <div className="runner-stats mono">
        <span>
          {t('SCORE', 'النقاط')} <strong>{score.toString().padStart(2, '0')}</strong>
        </span>
        <span>
          {t('LOCAL BEST', 'أفضل نتيجة عندك')} <strong>{best.toString().padStart(2, '0')}</strong>
        </span>
      </div>
      <canvas
        ref={canvas}
        width={800}
        height={260}
        tabIndex={0}
        role="img"
        aria-label={t(
          'Packet runner. Press Space or Arrow Up to jump while playing.',
          'باكت رانر. اضغط المسافة أو السهم للأعلى للقفز أثناء اللعب.',
        )}
        onPointerDown={() => {
          if (state === 'running') jump();
        }}
        onKeyDown={(e) => {
          if ([' ', 'ArrowUp'].includes(e.key)) {
            e.preventDefault();
            if (state === 'ready' || state === 'over') start();
            else jump();
          }
        }}
      />
      <div className="runner-controls">
        {state === 'ready' || state === 'over' ? (
          <button
            className="button button-primary"
            type="button"
            onClick={() => {
              start();
              setTimeout(() => canvas.current?.focus(), 0);
            }}
          >
            <Icon name="play" size={17} />
            {state === 'over' ? t('Try again', 'جرب تاني') : t('Start running', 'ابدأ اللعب')}
          </button>
        ) : (
          <>
            <button
              className="button button-secondary"
              type="button"
              onClick={() => {
                setState(state === 'running' ? 'paused' : 'running');
                game.current.last = 0;
                setTimeout(() => canvas.current?.focus(), 0);
              }}
            >
              <Icon name={state === 'running' ? 'pause' : 'play'} size={17} />
              {state === 'running' ? t('Pause', 'إيقاف مؤقت') : t('Resume', 'كمل')}
            </button>
            <button className="button button-primary" type="button" onClick={jump}>
              {t('Jump', 'اقفز')} ↑
            </button>
          </>
        )}
        <span className="mono">SPACE / ↑ / {t('TAP', 'اضغط')}</span>
      </div>
      <p className="game-status" role="status">
        {state === 'over'
          ? t(`Run complete. ${score} packets cleared.`, `انتهت الجولة. عديت ${score} حزمة.`)
          : state === 'paused'
            ? t('Paused. Resume when you’re ready.', 'اللعبة متوقفة. كمل لما تكون جاهز.')
            : t('High scores stay on this device.', 'أفضل النتائج بتتحفظ على الجهاز ده.')}
      </p>
    </div>
  );
}
