import { Root } from '@/components/Root';
import { pageMetadata } from '@/lib/metadata';
export const metadata = pageMetadata(
  'Ahmed Mohamed | Backend Engineer · .NET & Node.js',
  'Backend engineer in Cairo building APIs, multi-tenant systems, and real-time applications with .NET and Node.js. Open to roles and freelance projects.',
);
export default function Layout({ children }: { children: React.ReactNode }) {
  return <Root lang="en">{children}</Root>;
}
