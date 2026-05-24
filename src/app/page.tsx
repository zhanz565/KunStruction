import KeepMoving from '@/components/KeepMoving';
import UpgradeHome from '@/components/UpgradeHome';
import NewMaterial from '@/components/NewMaterial';
import QAWidget from '@/components/QAWidget';

export default function Home() {
  return (
    // The 'antialiased' class makes all text incredibly smooth and premium-looking
    <main className="min-h-screen bg-white text-black font-sans antialiased selection:bg-black selection:text-white">
      
{/* Top Right Language Toggle - Forced to top right with inline styles */}
      <div style={{ position: 'fixed', top: '2rem', right: '2rem', zIndex: 9999 }}>
        <button className="text-base md:text-xl font-medium tracking-widest text-gray-600 hover:text-black active:opacity-50 transition-colors duration-300">
          中文
        </button>
      </div>

      {/* Hero Section */}
      <header className="flex flex-col items-center justify-center min-h-[80vh] px-6 text-center">
        
        {/* Massive Gradient 'KUN' Logo */}
        <h1 
          className="font-black tracking-tighter uppercase leading-none mb-0"
          style={{
            fontSize: 'clamp(6rem, 20vw, 16rem)',
            /* 3-color linear gradient */
            background: 'linear-gradient(to right, #7181c8, #f1cfed, #b7d3f4)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            color: 'transparent'
          }}
        >
          KUN
        </h1>
        
        {/* Matching Gradient Chinese Character '坤' */}
        <p 
          className="font-bold leading-none mt-2 md:mt-4"
          style={{ 
            /* Sized to visually balance perfectly under the KUN text */
            fontSize: 'clamp(5rem, 15vw, 12rem)',
            /* Exact same 3-color gradient applied to the single character */
            background: 'linear-gradient(to right, #7181c8, #f1cfed, #b7d3f4)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            color: 'transparent'
          }}
        >
          坤
        </p>

      </header>

      {/* Main Content Modules */}
      <KeepMoving />
      <UpgradeHome />
      <NewMaterial />
      
      {/* Bottom Left Q&A Feature - This will trigger the QAWidget.tsx you just updated */}
      <QAWidget />

    </main>
  );
}