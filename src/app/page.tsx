'use client'; 

import KeepMoving from '@/components/KeepMoving';
import UpgradeHome from '@/components/UpgradeHome';
import NewMaterial from '@/components/NewMaterial';
import QAWidget from '@/components/QAWidget';
import InquiryForm from '@/components/InquiryForm';
import { useLanguage } from '@/context/LanguageContext'; 

export default function Home() {
  const { toggleLanguage, t } = useLanguage();

  return (
    <main className="min-h-screen bg-white font-sans antialiased text-black">
      
      {/* 
        INVISIBLE SVG DEFS FOR DIAMOND FILL 
        This allows us to use fill="url(#kunGradient)" on any SVG in our app!
      */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <linearGradient id="kunGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#7181c8" />
            <stop offset="50%" stopColor="#b7d3f4" />
            <stop offset="100%" stopColor="#f1cfed" />
          </linearGradient>
        </defs>
      </svg>

      {/* GLOBAL CSS */}
      <style dangerouslySetInnerHTML={{ __html: `
        .kun-gradient-text {
          background: linear-gradient(to right, #7181c8, #b7d3f4, #f1cfed) !important;
          -webkit-background-clip: text !important;
          -webkit-text-fill-color: transparent !important;
          background-clip: text !important;
          color: transparent !important;
        }
        
        /* New Border Class for the Square Boxes */
        .kun-gradient-border {
          border: 2px solid transparent;
          border-image: linear-gradient(to right, #7181c8, #b7d3f4, #f1cfed) 1;
        }

        ::selection {
          background-color: #f1cfed !important; 
          -webkit-text-fill-color: #7181c8 !important; 
          color: #7181c8 !important;
        }
        ::-moz-selection {
          background-color: #f1cfed !important;
          -webkit-text-fill-color: #7181c8 !important;
          color: #7181c8 !important;
        }
      `}} />
      
{/* Top Right Language Toggle */}
      <div style={{ position: 'fixed', top: '2rem', right: '2rem', zIndex: 9999 }}>
        <button 
          onClick={toggleLanguage} 
          className="text-base md:text-xl font-medium tracking-widest active:opacity-50 transition-opacity duration-300 bg-gradient-to-r from-[#7181c8] via-[#b7d3f4] to-[#f1cfed] bg-clip-text text-transparent hover:opacity-80"
        >
          {t('toggleBtn')}
        </button>
      </div>

      {/* Hero Section - Reduced min-h to close the gap to Keep Moving */}
      <header className="flex flex-col items-center justify-center min-h-[50vh] pt-16 px-6 text-center">
        <h1 
          className="font-black tracking-tighter uppercase leading-none mb-0 kun-gradient-text"
          style={{ fontSize: 'clamp(6rem, 20vw, 16rem)' }}
        >
          {t('kun')}
        </h1>
        <p 
          className="font-bold leading-none mt-2 md:mt-4 kun-gradient-text"
          style={{ fontSize: 'clamp(5rem, 15vw, 12rem)' }}
        >
          {t('kun_char')}
        </p>
      </header>

      {/* Main Content Modules */}
      <KeepMoving />
      <UpgradeHome />
      <NewMaterial />
      
      <InquiryForm />
      <QAWidget />

    </main>
  );
}