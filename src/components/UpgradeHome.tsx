import Link from 'next/link';

export default function UpgradeHome() {
  const categories = [
    { name: 'Living Room', path: 'living-room' },
    { name: 'Wall', path: 'wall' },
    { name: 'Bedroom', path: 'bedroom' },
    { name: 'Bathroom', path: 'bathroom' },
  ];

  return (
    <section className="w-full px-6 py-24 md:py-32 flex flex-col items-center">
      <div className="max-w-4xl w-full flex flex-col items-center">
        
        <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tight mb-16 text-black text-center">
          Upgrade Your Home
        </h2>
        
        <div className="flex flex-col w-full max-w-2xl">
          {categories.map((category) => (
            <Link 
              href={`/upgrade/${category.path}`} 
              key={category.name}
              // Changed 'gap-5' to 'gap-1' for ultra-tight spacing
              className="w-full flex items-center justify-start gap-1 py-4 transition-all duration-300 focus:outline-none group"
            >
              <div className="w-3 h-3 flex items-center justify-center">
                <svg
                  viewBox="0 0 100 100"
                  className="w-full h-full fill-gray-200 transition-colors duration-300 group-hover:fill-black"
                >
                  <polygon points="50,0 100,50 50,100 0,50" />
                </svg>
              </div>
              
              {/* Added 'ml-1' for fine-tuning */}
              <span className="text-base md:text-lg font-medium ml-1 text-gray-700 transition-colors duration-300 group-hover:text-black uppercase tracking-widest">
                {category.name}
              </span>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}