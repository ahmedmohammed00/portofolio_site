import type { Lang } from '@/lib/content';

// Static first-paint cover; hidden by default so the portfolio works without JavaScript.
export function LoadingBootstrap({ lang }: { lang: Lang }) {
  const arabic = lang === 'ar';
  return (
    <div className="loading-bootstrap" id="loading-bootstrap" aria-hidden="true">
      <div className="loading-scenery">
        <div className="loading-horizon" />
      </div>
      <div className="loading-content">
        <h2 className="loading-title">
          {arabic ? 'أحمد محمد' : 'AHMED MOHAMED'}
          <span className="loading-cursor">_</span>
        </h2>
        <p className="loading-role">
          {arabic ? 'مهندس باك إند · .NET وNode.js' : 'BACKEND ENGINEER · .NET & NODE.JS'}
        </p>
        <div className="loading-progress-area">
          <div className="loading-progress">
            <span className="loading-progress-fill" />
          </div>
          <div className="loading-progress-meta mono">
            <span>{arabic ? 'جاري التحميل' : 'LOADING'}</span>
            <span>000%</span>
          </div>
        </div>
        <span className="loading-start loading-start-preview">
          <span className="loading-play">▶</span>
          {arabic ? 'ابدأ التجربة' : 'PRESS START'}
        </span>
        <p className="loading-key-hint">
          {arabic ? 'لحظة ونكون جاهزين…' : 'A moment to get ready…'}
        </p>
      </div>
    </div>
  );
}
