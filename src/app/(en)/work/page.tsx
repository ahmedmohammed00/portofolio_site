import { WorkPage } from '@/components/Projects';
import { pageMetadata } from '@/lib/metadata';
export const metadata = pageMetadata(
  'Selected Work | Ahmed Mohamed',
  'Explore Ahmed Mohamed’s backend engineering portfolio.',
  '/work/',
);
export default function Page() {
  return <WorkPage />;
}
