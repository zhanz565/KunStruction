"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

// Data Options
const OPTIONS = {
  style: ['Detach', 'Semi', 'Townhouse', 'Condo', 'Other'],
  location: ['Toronto', 'Mississauga', 'Oakville', 'Burlington', 'Hamilton', 'Markham', 'Other'],
  size: ['Under 1000 sq. ft.', '1000 - 1500 sq. ft.', '1500 - 2000 sq. ft.', '2000 - 3000 sq. ft.', '3000+ sq. ft.', 'Other'],
  bought: ['Under $60,000', '$80,000 - $120,000', '$120,000 - $150,000', '$150,000 - $200,000', '$200,000+'],
  sell: ['Under $60,000', '$80,000 - $120,000', '$120,000 - $150,000', '$150,000 - $200,000', '$200,000+']
};

const QUESTIONS = [
  { id: 'intro', text: "Initializing connection... Tell us more about your home." },
  { id: 'style', text: "Style:" },
  { id: 'location', text: "Location:" },
  { id: 'size', text: "Size:" },
  { id: 'rooms', text: "Number of rooms:" },
  { id: 'bought', text: "Price you bought it with:" },
  { id: 'sell', text: "Price you want to sell:" },
  { id: 'phone', text: "Contact phone number:" },
  { id: 'done', text: "Ready to submit." }
];

export default function SellTerminal() {
  const [currentStep, setCurrentStep] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [customInput, setCustomInput] = useState("");
  const [isTerminated, setIsTerminated] = useState(false);
  
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to the bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [displayedText, currentStep, isTyping, isTerminated]);

  // Hollywood Hacker Typewriter Effect
  useEffect(() => {
    const fullText = QUESTIONS[currentStep].text;
    let i = 0;
    setIsTyping(true);
    setDisplayedText("");

    const interval = setInterval(() => {
      setDisplayedText(fullText.substring(0, i + 1));
      i++;
      if (i >= fullText.length) {
        clearInterval(interval);
        setTimeout(() => {
          setIsTyping(false);
          if (currentStep === 0) setCurrentStep(1);
        }, 400); 
      }
    }, 35); 

    return () => clearInterval(interval);
  }, [currentStep]);

  const handleSelect = (val: string) => {
    setAnswers(prev => ({ ...prev, [QUESTIONS[currentStep].id]: val }));
    setCurrentStep(prev => prev + 1);
  };

  const handleInputSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && customInput.trim()) {
      handleSelect(customInput.trim());
      setCustomInput("");
    }
  };

  // --------------------------------------------------------
  // TERMINATED SUCCESS SCREEN
  // --------------------------------------------------------
  if (isTerminated) {
    return (
      <div className="relative min-h-screen bg-[#050505] text-[#00FF41] font-mono p-6 flex flex-col items-center justify-center selection:bg-[#00FF41] selection:text-black overflow-hidden">
        {/* CRT Scanline Overlay */}
        <div className="pointer-events-none absolute inset-0 z-50 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] opacity-20"></div>
        
        <div className="z-10 text-center animate-in fade-in zoom-in duration-700">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-widest drop-shadow-[0_0_10px_rgba(0,255,65,0.8)]">
            INQUIRY RECEIVED
          </h2>
          <p className="text-xl md:text-2xl text-white opacity-90 mb-12 tracking-wide drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]">
            Sit tight. Our agent will email you shortly with the appointment time.
          </p>
          <Link href="/">
            <button className="border-2 border-[#00FF41] text-[#00FF41] hover:bg-[#00FF41] hover:text-black px-8 py-4 font-bold tracking-widest transition-all duration-300 drop-shadow-[0_0_8px_rgba(0,255,65,0.5)]">
              RETURN TO DIRECTORY
            </button>
          </Link>
        </div>
      </div>
    );
  }

  // --------------------------------------------------------
  // TERMINAL INTERFACE
  // --------------------------------------------------------
  return (
    <div 
      className="relative min-h-screen bg-[#050505] text-[#00FF41] font-mono p-6 md:p-12 overflow-y-auto w-full selection:bg-[#00FF41] selection:text-black"
      ref={scrollRef}
    >
      {/* CRT Scanline Overlay */}
      <div className="pointer-events-none fixed inset-0 z-50 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] opacity-20"></div>

      <div className="max-w-4xl mx-auto w-full flex flex-col pt-8 pb-32 z-10 relative">
        
        {/* Neon Hollywood Header */}
        <header className="mb-16 border-b border-[#00FF41]/30 pb-6 flex justify-between items-end">
          <h1 className="text-5xl md:text-6xl font-black tracking-widest uppercase text-transparent bg-clip-text bg-gradient-to-b from-[#00FF41] to-[#008f11] drop-shadow-[0_0_15px_rgba(0,255,65,0.6)]">
            SELL
          </h1>
          <span className="text-xs tracking-widest opacity-50 animate-pulse">
            SECURE_UPLINK_ESTABLISHED
          </span>
        </header>

        {/* Intro Text */}
        {currentStep === 0 && (
          <div className="mb-8 text-lg tracking-wider opacity-90 drop-shadow-[0_0_5px_rgba(0,255,65,0.4)]">
            {displayedText}
            {isTyping && <span className="animate-pulse bg-[#00FF41] w-3 h-5 inline-block ml-1 align-middle text-transparent">_</span>}
          </div>
        )}

        {/* History Log */}
        {currentStep > 0 && QUESTIONS.slice(1, currentStep).map((q, idx) => (
          <div key={idx} className="mb-8 opacity-70">
            <div className="text-sm text-[#00FF41]/70 mb-1">{q.text}</div>
            <div className="text-xl text-white drop-shadow-[0_0_5px_rgba(255,255,255,0.5)] tracking-wide">
              {answers[q.id]}
            </div>
          </div>
        ))}

        {/* Current Active Question */}
        {currentStep > 0 && currentStep < QUESTIONS.length - 1 && (
          <div className="mb-4 animate-in fade-in duration-300">
            <div className="text-lg text-[#00FF41] drop-shadow-[0_0_5px_rgba(0,255,65,0.4)]">
              {displayedText}
              {isTyping && <span className="animate-pulse bg-[#00FF41] w-3 h-5 inline-block ml-1 align-middle text-transparent">_</span>}
            </div>

            {/* Render Button Choices - Styled like tactical grid buttons */}
            {!isTyping && (
              <div className="mt-6 flex flex-wrap gap-4 animate-in fade-in slide-in-from-top-2 duration-500">
                {OPTIONS[QUESTIONS[currentStep].id as keyof typeof OPTIONS]?.map(opt => (
                  <button
                    key={opt}
                    onClick={() => handleSelect(opt)}
                    className="border border-[#00FF41]/50 text-[#00FF41] hover:bg-[#00FF41] hover:text-black hover:drop-shadow-[0_0_8px_rgba(0,255,65,0.8)] px-4 py-2 transition-all duration-200 text-sm md:text-base focus:outline-none tracking-wider uppercase"
                  >
                    {opt}
                  </button>
                ))}

                {/* Free Text Input for Rooms or Phone */}
                {(QUESTIONS[currentStep].id === 'rooms' || QUESTIONS[currentStep].id === 'phone') && (
                  <div className="flex items-center w-full max-w-sm mt-2">
                    <input
                      autoFocus
                      type={QUESTIONS[currentStep].id === 'phone' ? 'tel' : 'number'}
                      className="bg-transparent border-b-2 border-[#00FF41] outline-none text-white text-xl font-mono w-full focus:ring-0 py-2 drop-shadow-[0_0_5px_rgba(255,255,255,0.3)]"
                      value={customInput}
                      onChange={e => setCustomInput(e.target.value)}
                      onKeyDown={handleInputSubmit}
                      placeholder={QUESTIONS[currentStep].id === 'phone' ? 'Enter number and press Enter' : 'Enter amount and press Enter'}
                    />
                    <span className="animate-pulse bg-white w-3 h-6 inline-block ml-2 align-middle text-transparent drop-shadow-[0_0_5px_rgba(255,255,255,0.8)]">_</span>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* DONE STATE */}
        {currentStep === QUESTIONS.length - 1 && (
          <div className="mt-12 pt-8 border-t border-[#00FF41]/30">
            <div className="text-xl text-[#00FF41] drop-shadow-[0_0_5px_rgba(0,255,65,0.5)] mb-10">
              {displayedText}
              {isTyping && <span className="animate-pulse bg-[#00FF41] w-3 h-6 inline-block ml-2 align-middle text-transparent">_</span>}
            </div>
            {!isTyping && (
              <button 
                onClick={() => setIsTerminated(true)}
                className="border-2 border-[#00FF41] bg-[#050505] text-[#00FF41] hover:bg-[#00FF41] hover:text-black px-12 py-4 uppercase tracking-widest font-bold transition-all duration-300 drop-shadow-[0_0_15px_rgba(0,255,65,0.8)]"
              >
                SEND
              </button>
            )}
          </div>
        )}

      </div>
    </div>
  );
}