export default function NewMaterial() {
  // Mock data for the minimalist grid
  const items = [
    { id: '01', title: 'Raw Concrete', category: 'Foundation' },
    { id: '02', title: 'Brushed Steel', category: 'Fixtures' },
    { id: '03', title: 'Oak Veneer', category: 'Surface' },
  ];

  return (
    <section className="w-full px-6 py-24 md:py-32 flex flex-col items-center bg-white text-black">
      <div className="max-w-6xl w-full flex flex-col items-center">
        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-20 text-center">
          3. New Material
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          {items.map((item) => (
            <div 
              key={item.id} 
              className="group cursor-pointer border border-gray-200 hover:border-black transition-colors duration-300"
            >
              <div className="w-full aspect-square bg-white flex flex-col justify-between p-8">
                <span className="text-sm font-mono text-gray-400 group-hover:text-black transition-colors">
                  {item.id}
                </span>
                
                <div className="flex flex-col">
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
                    {item.category}
                  </p>
                  <h3 className="text-xl font-bold uppercase tracking-tight group-hover:underline decoration-2 underline-offset-4">
                    {item.title}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}