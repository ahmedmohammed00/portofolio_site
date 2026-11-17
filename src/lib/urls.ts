// Next.js prefixes its links automatically; public asset URLs need the same prefix.
export const basePath = (process.env.NEXT_PUBLIC_BASE_PATH || '').replace(/\/$/, '');
export const assetPath = (path: string) =>
  /^(?:https?:|data:)/.test(path) ? path : `${basePath}${path.startsWith('/') ? path : `/${path}`}`;
