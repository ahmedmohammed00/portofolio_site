import type { NextConfig } from 'next';
const config: NextConfig = {
  output: 'export',
  basePath: (process.env.NEXT_PUBLIC_BASE_PATH || '').replace(/\/$/, ''),
  trailingSlash: true,
  images: { unoptimized: true },
  poweredByHeader: false,
  // Keep static generation within the memory available on development machines.
  experimental: { cpus: 1 },
};
export default config;
