import Gallery from '@/components/upgrade/Gallery';
import { notFound } from 'next/navigation';

const VALID_CATEGORIES = [
  'living-room', 
  'bathroom', 
  'bedrooms', 
  'walls', 
];

export default async function UpgradeCategoryPage({ params }: { params: Promise<{ category: string }> }) {
  // We MUST await the params here for Next.js to work properly
  const { category } = await params;

  if (!VALID_CATEGORIES.includes(category)) {
    notFound(); 
  }

  return (
    <main className="w-full bg-white selection:bg-black selection:text-white">
      <Gallery category={category} />
    </main>
  );
}