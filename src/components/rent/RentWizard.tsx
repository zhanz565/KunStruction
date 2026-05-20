"use client";

import { useState } from 'react';
import Link from 'next/link';

// --- REUSABLE UI COMPONENTS ---

function NextArrow({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="mt-12 w-14 h-14 border border-gray-300 flex items-center justify-center text-gray-500 transition-all duration-300 hover:border-black hover:bg-black hover:text-white focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
      aria-label="Next step"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter">
        <path d="M5 12h14M12 5l7 7-7 7" />
      </svg>
    </button>
  );
}

function OptionSelect({ label, isSelected, onClick }: { label: string, isSelected: boolean, onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-start gap-4 py-3.5 transition-all duration-300 focus:outline-none border-b border-gray-100 hover:border-gray-200 group"
    >
      <div className="w-6 h-6 flex items-center justify-center">
        <svg
          viewBox="0 0 100 100"
          className={`w-5 h-5 transition-colors duration-300 ${
            isSelected ? 'fill-black stroke-black stroke-0' : 'fill-none stroke-gray-300 stroke-[4] group-hover:stroke-gray-400'
          }`}
        >
          <polygon points="50,0 100,50 50,100 0,50" />
        </svg>
      </div>
      <span className={`text-base font-medium transition-colors duration-300 ${isSelected ? 'text-black' : 'text-gray-700 group-hover:text-black'}`}>
        {label}
      </span>
    </button>
  );
}

// --- MAIN WIZARD COMPONENT ---

type FormData = {
  location: string;
  size: string;
  style: string;
  budget: string;
  rooms_count: string;
  washrooms_count: string;
  parking_count: string;
  name: string;
  email: string;
  phone: string;
};

export default function RentWizard() {
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    location: '', size: '', style: '', budget: '', rooms_count: '', washrooms_count: '', parking_count: '', name: '', email: '', phone: ''
  });

  const updateData = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => setStep((prev) => prev + 1);

  const handleSubmit = () => {
    console.log('Submit Data:', formData);
    setIsSubmitted(true);
  };

// --------------------------------------------------------
  // SUCCESS SCREEN
  // --------------------------------------------------------
  if (isSubmitted) {
    return (
      <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center min-h-[60vh] px-6 text-center animate-in fade-in duration-700">
        <h2 className="text-3xl font-bold tracking-tight mb-4 text-black">
          Inquiry received
        </h2>
        <p className="text-gray-500 text-base leading-relaxed mb-6">
          Sit tight. Our agent will email you the rental property list you requested shortly.
        </p>
        
        {/* NEW: Document Upload Link */}
        <Link 
          href="/rent/documents" 
          className="text-sm font-semibold text-black border-b border-black pb-1 mb-12 hover:text-gray-500 hover:border-gray-500 transition-colors"
        >
          Want to speed up your process? Get your documents ready.
        </Link>

        <Link href="/">
          <button className="py-4 px-8 border border-black bg-black text-white text-sm font-semibold tracking-wide transition-all duration-300 hover:bg-transparent hover:text-black">
            Return to Directory
          </button>
        </Link>
      </div>
    );
  }

  // --------------------------------------------------------
  // WIZARD STEPS
  // --------------------------------------------------------
  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center min-h-[70vh] px-6">
      
      {/* STEP 1: LOCATION */}
      {step === 1 && (
        <div className="w-full flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h2 className="text-3xl font-bold tracking-tight mb-8 text-black">Location</h2>
          <div className="flex flex-col w-full">
            {['Toronto', 'Mississauga', 'Oakville', 'Burlington', 'Hamilton', 'Milton'].map((loc) => (
              <OptionSelect key={loc} label={loc} isSelected={formData.location === loc} onClick={() => updateData('location', loc)} />
            ))}
            <input 
              type="text" 
              placeholder="Other (please specify)" 
              className={`w-full py-4.5 px-10 transition-all duration-300 text-base font-medium focus:outline-none focus:ring-1 focus:ring-black border-b ${!['Toronto', 'Mississauga', 'Oakville', 'Burlington', 'Hamilton', 'Markham', ''].includes(formData.location) ? 'border-black text-black' : 'border-gray-100 text-gray-800 placeholder-gray-400 hover:border-gray-200'}`}
              onChange={(e) => updateData('location', e.target.value)}
            />
          </div>
          <NextArrow onClick={nextStep} />
        </div>
      )}

      {/* STEP 2: SIZE */}
      {step === 2 && (
        <div className="w-full flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h2 className="text-3xl font-bold tracking-tight mb-8 text-black">Size</h2>
          <div className="flex flex-col w-full">
            {['Under 1000 sq. ft.', '1000 - 1500 sq. ft.', '1500 - 2000 sq. ft.', '2000 - 3000 sq. ft.', '3000+ sq. ft.'].map((sz) => (
              <OptionSelect key={sz} label={sz} isSelected={formData.size === sz} onClick={() => updateData('size', sz)} />
            ))}
            <input 
              type="text" 
              placeholder="Other size" 
              className="w-full py-4.5 px-10 border-b border-gray-100 text-gray-800 placeholder-gray-400 font-medium text-base focus:outline-none focus:border-black focus:ring-1 focus:ring-black hover:border-gray-200 transition-all duration-300"
              onChange={(e) => updateData('size', e.target.value)}
            />
          </div>
          <NextArrow onClick={nextStep} />
        </div>
      )}

      {/* STEP 3: STYLE */}
      {step === 3 && (
        <div className="w-full flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h2 className="text-3xl font-bold tracking-tight mb-8 text-black">Style</h2>
          <div className="flex flex-col w-full">
            {['Detach', 'Semi', 'Townhouse', 'Condo'].map((st) => (
              <OptionSelect key={st} label={st} isSelected={formData.style === st} onClick={() => updateData('style', st)} />
            ))}
            <input 
              type="text" 
              placeholder="Other style" 
              className="w-full py-4.5 px-10 border-b border-gray-100 text-gray-800 placeholder-gray-400 font-medium text-base focus:outline-none focus:border-black focus:ring-1 focus:ring-black hover:border-gray-200 transition-all duration-300"
              onChange={(e) => updateData('style', e.target.value)}
            />
          </div>
          <NextArrow onClick={nextStep} />
        </div>
      )}

      {/* STEP 4: BUDGET (RENTAL BRACKETS) */}
      {step === 4 && (
        <div className="w-full flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h2 className="text-3xl font-bold tracking-tight mb-8 text-black">Budget</h2>
          <div className="flex flex-col w-full">
            {['Under $1k', '$1k - $1.5k', '$1.5k - $2k', '$2k - $3k', '$3k+'].map((bg) => (
              <OptionSelect key={bg} label={bg} isSelected={formData.budget === bg} onClick={() => updateData('budget', bg)} />
            ))}
            <input 
              type="text" 
              placeholder="Other amount" 
              className="w-full py-4.5 px-10 border-b border-gray-100 text-gray-800 placeholder-gray-400 font-medium text-base focus:outline-none focus:border-black focus:ring-1 focus:ring-black hover:border-gray-200 transition-all duration-300"
              onChange={(e) => updateData('budget', e.target.value)}
            />
          </div>
          <NextArrow onClick={nextStep} />
        </div>
      )}

      {/* STEP 5: ROOMS */}
      {step === 5 && (
        <div className="w-full flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h2 className="text-3xl font-bold tracking-tight mb-8 text-black">Rooms</h2>
          
          <div className="flex flex-col w-full border-t border-gray-200">
            <div className="flex items-center justify-between w-full py-6 border-b border-gray-200 group">
              <label className="text-base font-medium text-gray-600 group-hover:text-black transition-colors cursor-pointer">
                Number of rooms
              </label>
              <input 
                type="number" 
                min="0"
                placeholder="0"
                className="w-24 p-3 border border-gray-300 focus:border-black focus:ring-1 focus:ring-black focus:outline-none text-center bg-transparent transition-all text-black font-medium"
                onChange={(e) => updateData('rooms_count', e.target.value)}
                value={formData.rooms_count}
              />
            </div>

            <div className="flex items-center justify-between w-full py-6 border-b border-gray-200 group">
              <label className="text-base font-medium text-gray-600 group-hover:text-black transition-colors cursor-pointer">
                Number of washrooms
              </label>
              <input 
                type="number" 
                min="0"
                placeholder="0"
                className="w-24 p-3 border border-gray-300 focus:border-black focus:ring-1 focus:ring-black focus:outline-none text-center bg-transparent transition-all text-black font-medium"
                onChange={(e) => updateData('washrooms_count', e.target.value)}
                value={formData.washrooms_count}
              />
            </div>

            <div className="flex items-center justify-between w-full py-6 border-b border-gray-200 group">
              <label className="text-base font-medium text-gray-600 group-hover:text-black transition-colors cursor-pointer">
                Number of parkings
              </label>
              <input 
                type="number" 
                min="0"
                placeholder="0"
                className="w-24 p-3 border border-gray-300 focus:border-black focus:ring-1 focus:ring-black focus:outline-none text-center bg-transparent transition-all text-black font-medium"
                onChange={(e) => updateData('parking_count', e.target.value)}
                value={formData.parking_count}
              />
            </div>
          </div>

          <NextArrow onClick={nextStep} />
        </div>
      )}

      {/* STEP 6: CONTACT */}
      {step === 6 && (
        <div className="w-full flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h2 className="text-3xl font-bold tracking-tight mb-8 text-black">Contact</h2>
          <div className="flex flex-col space-y-6 w-full mb-10">
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-medium text-gray-500">Full name</label>
              <input 
                type="text" 
                className="w-full pb-3 border-b border-gray-300 text-black text-base focus:outline-none focus:border-black transition-colors bg-transparent placeholder-gray-300"
                onChange={(e) => updateData('name', e.target.value)}
                value={formData.name}
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-medium text-gray-500">Email address</label>
              <input 
                type="email" 
                className="w-full pb-3 border-b border-gray-300 text-black text-base focus:outline-none focus:border-black transition-colors bg-transparent placeholder-gray-300"
                onChange={(e) => updateData('email', e.target.value)}
                value={formData.email}
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-medium text-gray-500">Phone number</label>
              <input 
                type="tel" 
                className="w-full pb-3 border-b border-gray-300 text-black text-base focus:outline-none focus:border-black transition-colors bg-transparent placeholder-gray-300"
                onChange={(e) => updateData('phone', e.target.value)}
                value={formData.phone}
              />
            </div>
          </div>
          <button 
            className="w-full py-5 border border-black bg-black text-white font-semibold tracking-wide hover:bg-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
            onClick={handleSubmit}
          >
            Submit Inquiry
          </button>
        </div>
      )}

    </div>
  );
}