export default function UpgradeHome() {
  return (
    <section className="w-full px-6 py-24 md:py-32 border-b border-gray-200 flex flex-col items-center bg-white text-black">
      <div className="max-w-6xl w-full flex flex-col items-center">
        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-20 text-center">
          2. Upgrade Your Home
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 w-full items-center">
          {/* Text Block */}
          <div className="flex flex-col space-y-8 order-2 md:order-1">
            <h3 className="text-2xl font-bold uppercase tracking-wide">
              Architectural Refinement
            </h3>
            <p className="text-gray-500 text-base md:text-lg leading-relaxed font-medium">
              Elevate your living space with our bespoke curation and renovation services. We bridge the gap between structural integrity and uncompromising aesthetic form.
            </p>
            <button className="w-fit py-4 px-10 border-2 border-black bg-black text-white text-sm font-bold uppercase tracking-widest transition-all duration-300 hover:bg-transparent hover:text-black">
              Explore Services
            </button>
          </div>

          {/* Image Placeholder */}
          <div className="w-full aspect-[4/5] bg-gray-50 flex items-center justify-center border border-gray-200 order-1 md:order-2 group cursor-pointer transition-colors hover:border-black">
            <span className="text-gray-400 font-mono text-xs md:text-sm uppercase tracking-widest group-hover:text-black transition-colors">
              [ Concept_Render_01.jpg ]
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}