export default function NewMaterial() {
  const materials = [
    { name: 'Clay Paint', imagePath: '/clay-paint.jpg' },
    { name: 'Liquid Rocks', imagePath: '/liquid-rocks.jpg' },
    { name: 'Stone and Sand', imagePath: '/stone-and-sand.jpg' },
  ];

  return (
    <section className="w-full px-6 py-24 md:py-32 flex flex-col items-center bg-white">
      <div className="max-w-[2000px] w-full flex flex-col items-center">
        
        <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tight mb-16 text-black text-center">
          New Material
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 w-full px-4 md:px-8">
          {materials.map((material) => (
            <div key={material.name} className="flex flex-col items-center group cursor-pointer">
              
              <div className="w-full aspect-[3/4] bg-gray-50 relative overflow-hidden mb-6 transition-colors duration-300 group-hover:bg-gray-100">
                <img 
                  src={material.imagePath} 
                  alt={material.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                />
              </div>
              
              <h3 className="text-sm md:text-base font-semibold uppercase tracking-widest text-black transition-opacity duration-300 group-hover:opacity-60">
                {material.name}
              </h3>
              
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}