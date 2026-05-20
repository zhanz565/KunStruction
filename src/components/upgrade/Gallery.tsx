"use client";

import { useEffect, useState } from 'react';
import { client, urlFor } from '@/lib/sanity';
import Link from 'next/link';

export default function Gallery({ category }: { category: string }) {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Clean the URL parameter to match Sanity
  const safeCategory = category.toLowerCase().replace(/%20/g, '-').replace(/ /g, '-');
  const displayTitle = safeCategory.replace(/-/g, ' ');

  useEffect(() => {
    const query = `*[_type == "item" && category == $safeCategory] | order(_createdAt desc)`;
    
    client.fetch(query, { safeCategory })
      .then((data) => {
        setItems(data || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Sanity Fetch Error:", error);
        setLoading(false);
      });
  }, [safeCategory]);

  if (loading) {
    return <div className="w-full min-h-screen flex items-center justify-center text-xs uppercase tracking-widest text-gray-400">Loading...</div>;
  }

  return (
    <div className="w-full min-h-screen bg-white text-black font-sans flex flex-col animate-in fade-in duration-500">
      
      {/* 1. Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-200 px-6 pt-16 pb-8 flex justify-between items-center">
        <Link href="/" className="text-[11px] uppercase tracking-widest hover:text-gray-500 transition-colors w-24">
          ← Back
        </Link>
        <h1 className="text-base md:text-xl font-black uppercase tracking-[0.25em] text-center flex-1">
          {displayTitle}
        </h1>
        <div className="w-24"></div> {/* Spacer for perfect centering */}
      </header>

      {/* 2. Pure Image Gallery */}
      <main className="flex-grow w-full max-w-[2000px] mx-auto px-4 md:px-8 pt-12 pb-24">
        {items.length === 0 ? (
          <div className="text-center py-32 text-[11px] text-gray-400 uppercase tracking-widest">
            No works uploaded yet.
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {items.map((item) => (
              <div key={item._id} className="w-full aspect-[3/4] relative overflow-hidden bg-gray-50 group">
                {item.image && (
                  <img 
                    src={urlFor(item.image).url()} 
                    alt={item.name || 'Project image'} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                )}
              </div>
            ))}
          </div>
        )}
      </main>

      {/* 3. The "Always at the Bottom" Design Section */}
      <div className="w-full bg-white border-t border-gray-200 py-24 flex flex-col items-center justify-center mt-auto">
        <h2 className="text-sm text-gray-400 uppercase tracking-[0.25em] mb-8 text-center px-4">
          Ready to transform your space?
        </h2>
        
        <Link href="/design">
          <button className="bg-black text-white px-12 py-5 text-[11px] font-bold uppercase tracking-[0.2em] shadow-xl hover:bg-gray-900 transition-transform duration-300 hover:scale-105">
            Design Your Room
          </button>
        </Link>
      </div>

    </div>
  );
}