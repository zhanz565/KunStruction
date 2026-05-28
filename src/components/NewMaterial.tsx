'use client';

import { useLanguage } from '@/context/LanguageContext';

export default function NewMaterial() {
  const { t } = useLanguage();

  const materials = [
    { name: 'Clay Paint', key: 'clayPaint', imagePath: '/clay-paint.jpg' },
    { name: 'Liquid Rocks', key: 'liquidRocks', imagePath: '/liquid-rocks.jpg' },
    { name: 'Stone and Sand', key: 'stoneAndSand', imagePath: '/stone-and-sand.jpg' },
  ];

  return (
    // Changed py-12 to py-6 md:py-12 here as well!
    <section className="flex flex-col items-center justify-center py-6 md:py-12 px-6 w-full">
      
      {/* Tightened header margin for mobile */}
      <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-8 md:mb-12 uppercase kun-gradient-text">
        {t('newMaterial')}
      </h2>
        
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 w-full px-4 md:px-8 max-w-6xl">
        {materials.map((material) => (
          <div key={material.key} className="flex flex-col items-center group cursor-pointer">
            
            <div className="w-full aspect-[3/4] bg-gray-50 relative overflow-hidden mb-6 transition-colors duration-300 group-hover:bg-gray-100">
              <img 
                src={material.imagePath} 
                alt={t(material.key as any) || material.name} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
              />
            </div>
            
            <h3 className="kun-gradient-text text-base md:text-lg font-bold uppercase tracking-widest transition-transform duration-300 group-hover:scale-[1.02]">
              {t(material.key as any) || material.name}
            </h3>
            
          </div>
        ))}
      </div>
    </section>
  );
}