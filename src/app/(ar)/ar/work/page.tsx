import { WorkPage } from '@/components/Projects';
import { pageMetadata } from '@/lib/metadata';
export const metadata = pageMetadata(
  'أعمال مختارة | أحمد محمد',
  'أعمال وخبرات أحمد محمد في تطوير الباك إند.',
  '/work/',
  'ar',
);
export default function Page() {
  return <WorkPage />;
}
