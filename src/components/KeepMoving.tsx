import Link from 'next/link';

export default function KeepMoving() {
  return (
    <section className="w-full px-6 py-24 md:py-32 flex flex-col items-center">
      <div className="max-w-4xl w-full flex flex-col items-center">
        <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tight mb-16">
          Keep Moving
        </h2>
        
        {/* Navigation Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 w-full max-w-3xl">
          <Link href="/buy" className="group w-full">
            {/* Added active:bg-black for instant mobile tap feedback and adjusted text/padding for mobile */}
            <button className="w-full py-5 md:py-6 border-2 border-black bg-transparent text-black text-base md:text-lg font-semibold uppercase tracking-wider transition-all duration-300 ease-in-out hover:bg-black hover:text-white active:bg-black active:text-white">
              Buy
            </button>
          </Link>
          
          <Link href="/sell" className="group w-full">
            <button className="w-full py-5 md:py-6 border-2 border-black bg-transparent text-black text-base md:text-lg font-semibold uppercase tracking-wider transition-all duration-300 ease-in-out hover:bg-black hover:text-white active:bg-black active:text-white">
              Sell
            </button>
          </Link>
          
          <Link href="/rent" className="group w-full">
            <button className="w-full py-5 md:py-6 border-2 border-black bg-transparent text-black text-base md:text-lg font-semibold uppercase tracking-wider transition-all duration-300 ease-in-out hover:bg-black hover:text-white active:bg-black active:text-white">
              Rent
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}