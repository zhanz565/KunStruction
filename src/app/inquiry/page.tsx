"use client";

import Link from 'next/link';
import { useState } from 'react';

export default function InquiryPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (isSubmitted) {
    return (
      <div className="w-full min-h-screen flex flex-col items-center justify-center bg-white text-black px-6 text-center animate-in fade-in duration-1000">
        <h2 className="text-2xl md:text-4xl font-bold mb-6">Inquiry Received</h2>
        <p className="text-base text-gray-500 max-w-md leading-relaxed mb-12">
          Our team will review your request and contact you shortly.
        </p>
        <Link href="/" className="text-sm font-semibold border-b border-black pb-1 hover:opacity-50 transition-opacity">
          Return to Directory
        </Link>
      </div>
    );
  }

  return (
    <main className="w-full min-h-screen bg-white text-black font-sans selection:bg-black selection:text-white flex flex-col items-center pt-24 px-6 animate-in fade-in duration-500">
      
      <div className="w-full max-w-2xl flex flex-col">
        {/* Subtle Cancel Link */}
        <Link href="/" className="text-sm text-gray-400 hover:text-black mb-16 inline-block transition-colors">
          ← Cancel
        </Link>

        {/* Header Block */}
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-black">
          Project Inquiry
        </h1>
        <p className="text-base text-gray-500 mb-16">
          Submit your details to start the conversation.
        </p>

        {/* Form Inputs matching the new screenshot */}
        <div className="flex flex-col space-y-12 mb-16">
          
          <div className="flex flex-col">
            <label className="text-[#64748B] text-base mb-3">Full name</label>
            <input 
              type="text" 
              className="w-full pb-4 border-b border-gray-200 text-black text-lg focus:outline-none focus:border-black transition-colors bg-transparent"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-[#64748B] text-base mb-3">Email address</label>
            <input 
              type="email" 
              className="w-full pb-4 border-b border-gray-200 text-black text-lg focus:outline-none focus:border-black transition-colors bg-transparent"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-[#64748B] text-base mb-3">Phone number</label>
            <input 
              type="tel" 
              className="w-full pb-4 border-b border-gray-200 text-black text-lg focus:outline-none focus:border-black transition-colors bg-transparent"
            />
          </div>

        </div>

        {/* Submit Button */}
        <button 
          onClick={() => setIsSubmitted(true)}
          className="w-full py-5 bg-black text-white text-base font-bold hover:bg-gray-900 transition-colors"
        >
          Submit Inquiry
        </button>
      </div>

    </main>
  );
}