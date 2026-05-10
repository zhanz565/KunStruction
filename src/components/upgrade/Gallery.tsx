"use client";

import Link from 'next/link';

interface GalleryProps {
  category: string;
}

export default function Gallery({ category }: GalleryProps) {
  // Generate 24 mock items to fill the gallery
  const mockItems = Array.from({ length: 24 }).map((_, i) => ({
    id: i + 1,
    brand: 'KUNSTRUCTION',
    name: `${category} Concept Model 0${(i % 5) + 1}`,
    price: `$${(Math.floor(Math.random() * 50) + 10) * 100}`,
  }));

  return (
    <div className="w-full min-h-screen bg-white text-black animate-in fade-in duration-700 pb-32">
      
      {/* Top Utility Bar (Filters & Sorting) */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center text-xs font-medium uppercase tracking-widest text-gray-500">
        <div className="flex gap-8">
          <Link href="/" className="hover:text-black transition-colors">
            ← Directory
          </Link>
          <span className="text-black">{category}</span>
        </div>
        
        <div className="flex gap-8">
          {/* Future Filter Bar Hook */}
          <button className="hover:text-black transition-colors focus:outline-none">
            Filter +
          </button>
          <button className="hover:text-black transition-colors focus:outline-none hidden md:block">
            Sort
          </button>
        </div>
      </div>

      {/* Product Grid - 4 columns on desktop, 2 on mobile */}
      <div className="px-6 pt-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-16">
          {mockItems.map((item) => (
            <div key={item.id} className="flex flex-col group cursor-pointer">
              
              {/* Tall Image Placeholder (SSENSE style aspect ratio) */}
              <div className="w-full aspect-[3/4] bg-gray-50 flex items-center justify-center mb-4 border border-transparent transition-colors duration-500 group-hover:border-gray-200">
                <span className="text-xs font-mono text-gray-300 tracking-widest group-hover:text-gray-400 transition-colors">
                  [ RENDER_{item.id} ]
                </span>
              </div>

              {/* Minimalist Typography */}
              <div className="flex flex-col text-[11px] md:text-xs leading-relaxed">
                <span className="uppercase tracking-widest font-semibold text-black">
                  {item.brand}
                </span>
                <span className="text-gray-600 capitalize mt-0.5">
                  {item.name}
                </span>
                <span className="text-black font-medium mt-1">
                  {item.price}
                </span>
              </div>

            </div>
          ))}
        </div>
      </div>

    </div>
  );
}