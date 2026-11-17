import { Root } from '@/components/Root';
import { pageMetadata } from '@/lib/metadata';
export const metadata = pageMetadata(
  'أحمد محمد | مهندس باك إند · .NET وNode.js',
  'مهندس باك إند من القاهرة متخصص في .NET وNode.js، وواجهات API والأنظمة متعددة العملاء والتطبيقات اللحظية. متاح لفرص العمل والفريلانس.',
  '/',
  'ar',
);
export default function Layout({ children }: { children: React.ReactNode }) {
  return <Root lang="ar">{children}</Root>;
}
