import KeepMoving from '@/components/KeepMoving';
import UpgradeHome from '@/components/UpgradeHome';
import NewMaterial from '@/components/NewMaterial';

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-black selection:bg-black selection:text-white">
      {/* Hero Section */}
      <header className="flex flex-col items-center justify-center min-h-[60vh] px-6 border-b border-gray-200">
        <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-black tracking-tighter uppercase mb-4 text-center">
          Kunstruction
        </h1>
        <p className="text-sm md:text-base font-medium tracking-widest uppercase text-gray-500">
          Real Estate Architecture & Curation
        </p>
      </header>

      {/* Main Content Modules */}
      <div className="flex flex-col w-full">
        <KeepMoving />
        <UpgradeHome />
        <NewMaterial />
      </div>
    </main>
  );
}