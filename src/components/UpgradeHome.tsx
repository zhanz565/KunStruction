'use client';

import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function UpgradeHome() {
  const { t } = useLanguage();

  const categories = [
    { name: 'Bedroom', path: 'bedroom' },
    { name: 'Kitchen', path: 'kitchen' },
    { name: 'Bathroom', path: 'bathroom' },
    { name: 'Decor', path: 'decor' },
    { name: 'Living Room', path: 'living-room' },
    { name: 'Study Room', path: 'study-room' }
  ];

  return (
    <section className="flex flex-col items-center justify-center py-24 px-6 w-full">
      
      <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-12 uppercase kun-gradient-text">
        {t('upgradeHome')}
      </h2>
        
      {/* Kept your exact original vertical list spacing and layout */}
      <div className="flex flex-col w-full max-w-2xl">
        {categories.map((category) => (
          <Link 
            href={`/upgrade/${category.path}`} 
            key={category.name}
            className="w-full flex items-center justify-start gap-1 py-5 md:py-4 transition-all duration-300 focus:outline-none group active:opacity-50"
          >
            <div className="w-3 h-3 flex items-center justify-center">
              {/* Added the global gradient fill to the diamond */}
              <svg
                viewBox="0 0 100 100"
                className="w-full h-full"
                fill="url(#kunGradient)"
              >
                <polygon points="50,0 100,50 50,100 0,50" />
              </svg>
            </div>
            
            {/* Added kun-gradient-text and dynamic translation */}
            <span className="kun-gradient-text text-base md:text-lg font-medium ml-1 uppercase tracking-widest transition-all duration-300 hover:scale-[1.01]">
              {t(category.path as any) || category.name}
            </span>
          </Link>
        ))}
      </div>

    </section>
  );
}