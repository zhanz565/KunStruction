import Link from 'next/link';

export default function UpgradeHome() {
const categories = [
  { name: 'Living Room', path: 'living-room' },
  { name: 'Wall', path: 'wall' },
  { name: 'Bedroom', path: 'bedroom' },
  { name: 'Bathroom', path: 'bathroom' },
];

  return (
    <section className="w-full px-6 py-24 md:py-32 flex flex-col items-center border-b border-gray-200">
      <div className="max-w-4xl w-full flex flex-col items-center">
        
        {/* FIXED: Matched the responsive size and uppercase styling of Keep Moving */}
        <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tight mb-16 text-black text-center">
          2. Upgrade Your Home
        </h2>
        
        <div className="flex flex-col w-full max-w-2xl">
          {categories.map((category) => (
            <Link 
              href={`/upgrade/${category.path}`} 
              key={category.name}
              className="w-full flex items-center justify-start gap-4 py-5 transition-all duration-300 focus:outline-none border-b border-gray-100 hover:border-gray-200 group"
            >
              {/* Geometric Diamond Bullet */}
              <div className="w-6 h-6 flex items-center justify-center">
                <svg
                  viewBox="0 0 100 100"
                  className="w-5 h-5 fill-none stroke-gray-300 stroke-[4] transition-colors duration-300 group-hover:stroke-black"
                >
                  <polygon points="50,0 100,50 50,100 0,50" />
                </svg>
              </div>
              
              {/* Increased base font size slightly to balance the large headline */}
              <span className="text-base md:text-lg font-medium text-gray-700 transition-colors duration-300 group-hover:text-black uppercase tracking-widest">
                {category.name}
              </span>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}