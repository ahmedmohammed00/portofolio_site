import { HirePage } from '@/components/Contact';
import { pageMetadata } from '@/lib/metadata';
export const metadata = pageMetadata(
  'Work Together | Ahmed Mohamed',
  'Explore Ahmed Mohamed’s backend engineering portfolio.',
  '/hire/',
);
export default function Page() {
  return <HirePage />;
}
