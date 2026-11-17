'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { useSite } from './SiteProvider';
import { assetPath } from '@/lib/urls';

export type HeroGesture = 'idle' | 'wave' | 'thumbsUp';
const ATLAS = assetPath('/images/animation/ahmed-hero-rig-v1.png');
const DURATION = 2800;

// Each part retains its original 512px coordinate space. Only the two joints move.
function Part({ cell }: { cell: number }) {
  return (
    <svg
      width="512"
      height="512"
      viewBox={`${(cell % 3) * 512} ${Math.floor(cell / 3) * 512} 512 512`}
      overflow="hidden"
    >
      <image href={ATLAS} width="1536" height="1024" />
    </svg>
  );
}

export function HeroCharacter({
  gesture,
  onComplete,
}: {
  gesture: HeroGesture;
  onComplete: () => void;
}) {
  const { motion } = useSite();
  const id = `hero-alpha-${useId().replace(/:/g, '')}`;
  const shoulder = useRef<SVGGElement>(null);
  const elbow = useRef<SVGGElement>(null);
  const restingHand = useRef<SVGGElement>(null);
  const wavingHand = useRef<SVGGElement>(null);
  const thumbsHand = useRef<SVGGElement>(null);
  const complete = useRef(onComplete);
  const [available, setAvailable] = useState(true);
  complete.current = onComplete;

  useEffect(() => {
    const asset = new Image();
    asset.onerror = () => setAvailable(false);
    asset.src = ATLAS;
    return () => {
      asset.onerror = null;
    };
  }, []);

  useEffect(() => {
    if (gesture === 'idle') return;
    // A static greeting still provides feedback when motion is disabled or art fails.
    if (!motion || !available || !shoulder.current || !elbow.current) {
      const timer = setTimeout(() => complete.current(), 1400);
      return () => clearTimeout(timer);
    }

    const wave = gesture === 'wave';
    const frames = wave
      ? [
          [0, 0, 0],
          [0.2, 34, 112],
          [0.32, 34, 127],
          [0.44, 34, 102],
          [0.56, 34, 127],
          [0.68, 34, 102],
          [0.8, 34, 112],
          [1, 0, 0],
        ]
      : [
          [0, 0, 0],
          [0.22, 12, 80],
          [0.4, 12, 85],
          [0.62, 12, 80],
          [0.8, 12, 80],
          [1, 0, 0],
        ];
    const options: KeyframeAnimationOptions = { duration: DURATION, fill: 'both' };
    const joint = (index: number) =>
      frames.map((frame) => ({
        offset: frame[0],
        transform: `rotate(${frame[index]}deg)`,
        easing: 'cubic-bezier(0.45, 0, 0.25, 1)',
      }));
    const animations = [
      shoulder.current.animate(joint(1), options),
      elbow.current.animate(joint(2), options),
    ];
    const activeHand = wave ? wavingHand.current : thumbsHand.current;
    const fade = (visible: boolean) =>
      [0, 0.12, 0.86, 1].map((offset, index) => ({
        offset,
        opacity: (index === 1 || index === 2) === visible ? 1 : 0,
      }));
    if (activeHand) animations.push(activeHand.animate(fade(true), options));
    if (restingHand.current) animations.push(restingHand.current.animate(fade(false), options));

    // Completion follows the actual animation timeline, including the return to rest.
    animations[0].onfinish = () => complete.current();
    const pauseWhenHidden = () => {
      for (const animation of animations) {
        if (document.hidden) animation.pause();
        else animation.play();
      }
    };
    document.addEventListener('visibilitychange', pauseWhenHidden);
    pauseWhenHidden();
    return () => {
      document.removeEventListener('visibilitychange', pauseWhenHidden);
      animations[0].onfinish = null;
      animations.forEach((animation) => animation.cancel());
    };
  }, [gesture, motion, available]);

  if (!available)
    return (
      <img
        className="hero-character-fallback"
        src={assetPath('/images/ahmed-avatar.jpeg')}
        alt=""
      />
    );

  return (
    <svg className="hero-character" viewBox="0 0 512 512" aria-hidden="true">
      <defs>
        <filter id={id} x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
          {/* Remove low-alpha generation haze without changing the source artwork. */}
          <feComponentTransfer>
            <feFuncA type="discrete" tableValues="0 0 0 1 1" />
          </feComponentTransfer>
        </filter>
      </defs>
      <g filter={`url(#${id})`}>
        <Part cell={0} />
      </g>
      <g transform="translate(16 0)">
        <g ref={shoulder} className="hero-character-shoulder">
          <g filter={`url(#${id})`}>
            <Part cell={1} />
          </g>
          <g ref={elbow} className="hero-character-elbow">
            <g transform="translate(0 -9)" filter={`url(#${id})`}>
              <g ref={restingHand}>
                <Part cell={2} />
              </g>
              <g ref={wavingHand} opacity="0">
                <Part cell={3} />
              </g>
              <g ref={thumbsHand} opacity="0">
                <Part cell={4} />
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}
