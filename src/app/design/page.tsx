"use client";

import { useState } from 'react';
import Link from 'next/link';
import OptionSelect from '../../components/OptionSelect';// Ensure you have this component from earlier

// --- DATA DICTIONARY ---
const SERVICES_DATA: Record<string, { title: string, price?: string, desc?: string, hasInput?: boolean }[]> = {
  "Paint": [
    { title: "Door and rail", price: "$300" },
    { title: "Small room", price: "$500" },
    { title: "Medium room", price: "$700" },
    { title: "Large room", price: "$1000" },
    { title: "Kitchen cabinets", price: "$500" },
    { title: "Whole house (walls only)", price: "$3k-$5k" },
  ],
  "Floors": [
    { title: "Wood", price: "$500" },
    { title: "Liquid stone", price: "$600" },
    { title: "Lime rock", price: "$700" },
    { title: "Tiles (natural stone powder)", price: "$800" },
    { title: "Other stones", hasInput: true },
  ],
  "Cabinet and Shelfs": [
    { title: "Bedroom dresser", price: "$1.5k" },
    { title: "Study", price: "$1k" },
    { title: "Washroom", price: "$700" },
    { title: "Laundry room storage", price: "$3k" },
    { title: "Bed room upgrade", price: "$5k" },
    { title: "Living room basement and garage", price: "$1.5k" },
  ],
  "Light": [
    { title: "LED", price: "$150+" },
    { title: "Minimal light", price: "$200+" },
    { title: "Designer light", price: "$300+" },
    { title: "Whole space", price: "$1.5k" },
  ],
  "Hardware": [
    { title: "Handle", price: "$30+" },
    { title: "Door knobs", price: "$150+" },
    { title: "Light switches upgrade", price: "$50+" },
    { title: "Outlet upgrade", price: "$30+" },
    { title: "Vent upgrade", price: "$35+" },
    { title: "Others", price: "Custom" },
  ],
  "Room Design": [
    { title: "Full Service", desc: "Designs, selecting furniture, upgrade space, furniture installation, fengshui position and clean up.", price: "$1500+" },
  ],
  "Organize and Decor": [
    { title: "Closet" }, { title: "Make up table" }, { title: "Bedroom" }, { title: "Washroom" },
    { title: "Study" }, { title: "Living room" }, { title: "Kitchen" }, { title: "Garage" },
    { title: "Basement" }, { title: "Storage unit" }, { title: "Other" }
  ],
  "Whole Space": [
    { title: "Washroom", desc: "Including sink, toilet, floor, wall and light.", price: "Starting at 6k" },
    { title: "Kitchen", desc: "Including cabinet, counter top, floor, wall tiles and light (excluding appliances).", price: "Starting at 9k" },
    { title: "Walk-in Closet", desc: "Including floor, wall, light, storage cabinet, shelfs, hanger and organize.", price: "Starting at 3k" },
    { title: "Laundry room", price: "Starting at 5k" },
    { title: "Back yard", price: "Starting at $500" },
    { title: "Front yard", price: "Starting at $300" },
    { title: "Drive way", price: "Starting at $1500" },
    { title: "Exterior wall", price: "Starting at $5000" },
    { title: "Basement", desc: "Including floor, wall, paint, light.", price: "Starting at 3k" },
  ],
  "Others": [
    { title: "Roof, pool, etc.", price: "Custom rate" }
  ]
};

export default function DesignWizard() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    service: '',
    details: [] as string[],
    customStone: '',
    name: '',
    email: '',
    phone: '',
    notes: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // --- HANDLERS ---
  const toggleDetail = (detailTitle: string) => {
    setFormData(prev => ({
      ...prev,
      details: prev.details.includes(detailTitle) 
        ? prev.details.filter(d => d !== detailTitle) 
        : [...prev.details, detailTitle]
    }));
  };

  const handleNext = () => {
    if (step === 1 && !formData.service) return;
    if (step === 2 && formData.details.length === 0) return;
    setStep(prev => prev + 1);
    window.scrollTo(0, 0);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // TODO: Connect to your email API route here.
    // Example: await fetch('/api/send-email', { method: 'POST', body: JSON.stringify(formData) });
    
    // Simulating network request for now
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  // --- SUCCESS STATE ---
  if (isSuccess) {
    return (
      <div className="w-full min-h-screen flex flex-col items-center justify-center bg-white text-black px-6 text-center animate-in fade-in duration-1000">
        <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">Received</h2>
        <p className="text-base text-gray-500 max-w-md leading-relaxed mb-12">
          we will be in touch with you soon! 
        </p>
        <Link href="/" className="text-sm font-semibold border-b border-black pb-1 hover:opacity-50 transition-opacity">
          Return to Directory
        </Link>
      </div>
    );
  }

  return (
    <main className="w-full min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white flex flex-col items-center pt-24 pb-32 px-6">
      
      <div className="w-full max-w-2xl flex flex-col">
        {/* Navigation & Progress */}
        <div className="flex justify-between items-center mb-16">
          {step > 1 ? (
            <button onClick={() => setStep(step - 1)} className="text-sm text-gray-400 hover:text-black transition-colors">
              ← Back
            </button>
          ) : (
            <Link href="/" className="text-sm text-gray-400 hover:text-black transition-colors">
              ← Cancel
            </Link>
          )}
        </div>

        {/* STEP 1: CHOOSE SERVICE */}
        {step === 1 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-12 text-black text-center">
            Service
            </h1>
            <div className="flex flex-col w-full max-w-md mx-auto">
              {Object.keys(SERVICES_DATA).map((serviceName) => (
                <OptionSelect 
                  key={serviceName}
                  label={serviceName}
                  isSelected={formData.service === serviceName}
                  onClick={() => {
                    setFormData({ ...formData, service: serviceName, details: [] });
                    setStep(2); // Auto-advance to save a click
                  }}
                />
              ))}
            </div>
          </div>
        )}

        {/* STEP 2: CHOOSE DETAILS */}
        {step === 2 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-black text-center">
              {formData.service}  
            </h1>
            <p className="text-center text-gray-500 mb-12 text-sm">Select all that apply</p>
            
            <div className="flex flex-col w-full max-w-lg mx-auto space-y-2">
              {SERVICES_DATA[formData.service]?.map((item, idx) => (
                <div key={idx} className="flex flex-col border-b border-gray-100 last:border-0 py-4">
                  
                  <button 
                    onClick={() => toggleDetail(item.title)}
                    className="w-full flex items-center justify-between text-left group focus:outline-none"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 flex items-center justify-center">
                        <svg viewBox="0 0 100 100" className={`w-3 h-3 transition-colors duration-300 ${formData.details.includes(item.title) ? 'fill-black' : 'fill-gray-200 group-hover:fill-gray-400'}`}>
                          <polygon points="50,0 100,50 50,100 0,50" />
                        </svg>
                      </div>
                      <span className={`text-lg transition-colors ${formData.details.includes(item.title) ? 'text-black font-semibold' : 'text-gray-600 group-hover:text-black'}`}>
                        {item.title}
                      </span>
                    </div>
                    {item.price && (
                      <span className="text-sm font-medium text-gray-400">{item.price}</span>
                    )}
                  </button>
                  
                  {item.desc && (
                    <p className="text-sm text-gray-400 mt-2 pl-7 leading-relaxed">{item.desc}</p>
                  )}

                  {/* Conditional Text Input for "Other stones" */}
                  {item.hasInput && formData.details.includes(item.title) && (
                    <input 
                      type="text" 
                      placeholder="Enter your stone type"
                      value={formData.customStone}
                      onChange={(e) => setFormData({...formData, customStone: e.target.value})}
                      className="mt-4 ml-7 w-[calc(100%-1.75rem)] pb-2 border-b border-gray-200 text-black focus:outline-none focus:border-black text-sm bg-transparent"
                    />
                  )}
                </div>
              ))}
            </div>

            <button 
              onClick={handleNext}
              disabled={formData.details.length === 0}
              className="w-full max-w-lg mx-auto mt-12 py-5 bg-black text-white text-base font-bold disabled:bg-gray-200 disabled:text-gray-400 transition-colors block"
            >
              Continue
            </button>
          </div>
        )}

        {/* STEP 3: CONTACT FORM */}
        {step === 3 && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-black">Contact</h1>


            <div className="flex flex-col space-y-10 mb-12">
              <div className="flex flex-col">
                <label className="text-gray-500 text-sm mb-2">Full name</label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full pb-3 border-b border-gray-200 text-black text-lg focus:outline-none focus:border-black transition-colors bg-transparent"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-gray-500 text-sm mb-2">Email address</label>
                <input 
                  type="email" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full pb-3 border-b border-gray-200 text-black text-lg focus:outline-none focus:border-black transition-colors bg-transparent"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-gray-500 text-sm mb-2">Phone number</label>
                <input 
                  type="tel" 
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full pb-3 border-b border-gray-200 text-black text-lg focus:outline-none focus:border-black transition-colors bg-transparent"
                />
              </div>
            </div>

            <button 
              onClick={handleSubmit}
              disabled={!formData.name || !formData.email || isSubmitting}
              className="w-full py-5 bg-black text-white text-base font-bold hover:bg-gray-900 disabled:bg-gray-200 disabled:text-gray-400 transition-colors flex items-center justify-center"
            >
              {isSubmitting ? 'Sending...' : 'Submit Request'}
            </button>
          </div>
        )}

      </div>
    </main>
  );
}