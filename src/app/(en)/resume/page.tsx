import { Resume } from '@/components/Resume';
import { pageMetadata } from '@/lib/metadata';
export const metadata = pageMetadata(
  'Résumé | Ahmed Mohamed',
  'Explore Ahmed Mohamed’s backend engineering portfolio.',
  '/resume/',
);
export default function Page() {
  return <Resume />;
}
