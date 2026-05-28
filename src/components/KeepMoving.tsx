'use client';

import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function KeepMoving() {
  const { t } = useLanguage();

  return (
    <section className="flex flex-col items-center justify-center py-12 px-6 w-full">
      <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-12 uppercase kun-gradient-text">
        {t('keepMoving')}
      </h2>
        
      {/* Navigation Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 w-full max-w-3xl">
        <Link href="/buy" className="group w-full">
          <button 
            className="w-full py-5 md:py-6 border-2 bg-transparent kun-gradient-text text-base md:text-lg font-semibold uppercase tracking-wider transition-all duration-300 ease-in-out hover:scale-[1.02] hover:bg-gray-50 active:scale-[0.98]"
            style={{ borderImage: 'linear-gradient(to right, #7181c8, #b7d3f4, #f1cfed) 1' }}
          >
            {t('buy')}
          </button>
        </Link>
        
        <Link href="/sell" className="group w-full">
          <button 
            className="w-full py-5 md:py-6 border-2 bg-transparent kun-gradient-text text-base md:text-lg font-semibold uppercase tracking-wider transition-all duration-300 ease-in-out hover:scale-[1.02] hover:bg-gray-50 active:scale-[0.98]"
            style={{ borderImage: 'linear-gradient(to right, #7181c8, #b7d3f4, #f1cfed) 1' }}
          >
            {t('sell')}
          </button>
        </Link>
        
        <Link href="/rent" className="group w-full">
          <button 
            className="w-full py-5 md:py-6 border-2 bg-transparent kun-gradient-text text-base md:text-lg font-semibold uppercase tracking-wider transition-all duration-300 ease-in-out hover:scale-[1.02] hover:bg-gray-50 active:scale-[0.98]"
            style={{ borderImage: 'linear-gradient(to right, #7181c8, #b7d3f4, #f1cfed) 1' }}
          >
            {t('rent')}
          </button>
        </Link>
      </div>
    </section>
  );
}