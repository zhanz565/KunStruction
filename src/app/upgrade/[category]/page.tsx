import Gallery from '@/components/upgrade/Gallery';

export default async function UpgradeCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const resolvedParams = await params;
  const rawCategory = resolvedParams.category;
  
  // Basic validation to ensure the URL parameter is valid
  const validCategories = ['bathroom', 'kitchen', 'bedroom', 'basement', 'backyard'];
  
  if (!validCategories.includes(rawCategory)) {
    return (
      <div className="min-h-screen flex items-center justify-center font-mono uppercase tracking-widest text-sm text-gray-500">
        404 | Department Not Found
      </div>
    );
  }

  return (
    <main className="w-full bg-white selection:bg-black selection:text-white">
      {/* Pass the category down to the Gallery component */}
      <Gallery category={rawCategory} />
    </main>
  );
}