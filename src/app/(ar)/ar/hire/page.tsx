import { HirePage } from '@/components/Contact';
import { pageMetadata } from '@/lib/metadata';
export const metadata = pageMetadata(
  'نعمل سوا | أحمد محمد',
  'أعمال وخبرات أحمد محمد في تطوير الباك إند.',
  '/hire/',
  'ar',
);
export default function Page() {
  return <HirePage />;
}
