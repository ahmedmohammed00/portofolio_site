'use client';

import { useEffect, useState } from 'react';
import { CHARACTER_GESTURES, CHARACTER_SPRITE, type CharacterGesture } from '@/lib/character';
import { useSite } from './SiteProvider';
import { assetPath } from '@/lib/urls';

export function CharacterSprite({
  gesture = 'idle',
  className = '',
  animate = true,
}: {
  gesture?: CharacterGesture;
  className?: string;
  animate?: boolean;
}) {
  const { motion } = useSite();
  const [step, setStep] = useState(0);
  const [available, setAvailable] = useState(true);
  const animation = CHARACTER_GESTURES[gesture];
  const playing = animate && motion;

  useEffect(() => {
    const image = new Image();
    image.onerror = () => setAvailable(false);
    image.src = CHARACTER_SPRITE;
    return () => {
      image.onerror = null;
    };
  }, []);

  useEffect(() => {
    setStep(0);
    if (!playing) return;
    const timer = window.setInterval(() => {
      if (document.hidden) return;
      setStep((current) =>
        animation.loop
          ? (current + 1) % animation.frames.length
          : Math.min(current + 1, animation.frames.length - 1),
      );
    }, animation.interval);
    return () => window.clearInterval(timer);
  }, [gesture, playing, animation]);

  const frame = playing ? animation.frames[Math.min(step, animation.frames.length - 1)] : 0;
  const row = playing ? animation.row : CHARACTER_GESTURES.idle.row;

  return (
    <span
      className={`character-sprite ${available ? '' : 'character-sprite-fallback'} ${className}`}
      data-gesture={playing ? gesture : 'idle'}
      data-frame={frame}
      aria-hidden="true"
      style={{
        backgroundPosition: `${(frame / 3) * 100}% ${(row / 5) * 100}%`,
        backgroundImage: available ? `url("${CHARACTER_SPRITE}")` : undefined,
      }}
    >
      {!available && <img src={assetPath('/images/ahmed-avatar.jpeg')} alt="" draggable={false} />}
    </span>
  );
}
