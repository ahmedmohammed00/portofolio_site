import { Resume } from '@/components/Resume';
import { pageMetadata } from '@/lib/metadata';
export const metadata = pageMetadata(
  'السيرة الذاتية | أحمد محمد',
  'أعمال وخبرات أحمد محمد في تطوير الباك إند.',
  '/resume/',
  'ar',
);
export default function Page() {
  return <Resume />;
}
