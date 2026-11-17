import { assetPath } from './urls';
export const CHARACTER_SPRITE = assetPath('/images/animation/ahmed-gestures-v1.png');
export const INTRO_SESSION_KEY = 'am-loader-seen-v1';

export const CHARACTER_GESTURES = {
  idle: { row: 0, frames: [0, 0, 0, 1, 1, 0, 0, 2, 3, 0, 0, 1], interval: 180, loop: true },
  walk: { row: 1, frames: [0, 1, 2, 3], interval: 130, loop: true },
  wave: { row: 2, frames: [0, 1, 2, 3], interval: 190, loop: true },
  point: { row: 3, frames: [0, 1, 2, 3], interval: 280, loop: true },
  thumbsUp: { row: 4, frames: [0, 1, 2, 3], interval: 180, loop: true },
  jump: { row: 5, frames: [0, 1, 2, 3], interval: 170, loop: false },
} as const;

export type CharacterGesture = keyof typeof CHARACTER_GESTURES;
