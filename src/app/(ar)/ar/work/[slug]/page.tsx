import { ProjectDetail } from '@/components/Projects';
import { projects } from '@/lib/content';
import { pageMetadata } from '@/lib/metadata';
export const dynamicParams = false;
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = projects.find((p) => p.slug === slug)!;
  return pageMetadata(`${p.title} | أحمد محمد`, p.description.ar, `/work/${slug}/`, 'ar');
}
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <ProjectDetail slug={slug} />;
}
