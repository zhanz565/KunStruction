'use client';

import { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';

export default function InquiryForm() {
  const { t } = useLanguage();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // State to hold the actual input data to send to your email
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    message: ''
  });

  const updateData = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleInquirySubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Sending data to the same API route your BuyWizard uses
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          formName: 'General Site Inquiry',
          name: formData.name,
          email: formData.contact, // Mapping contact field to email for your backend
          message: formData.message
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit message');
      }

      setIsSubmitted(true);
    } catch (error) {
      console.error(error);
      alert('There was a problem sending your request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="flex flex-col items-center justify-center py-6 md:py-12 px-6 max-w-4xl mx-auto w-full">
      
      {isSubmitted ? (
        <div className="flex flex-col space-y-3">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 kun-gradient-text">
            {t('successTitle')}
          </h2>
          <p className="text-gray-500 text-base leading-relaxed mb-10">
            {t('successMsg')}
          </p>
          <button 
            onClick={() => setIsSubmitted(false)}
            className="py-4 px-8 rounded bg-[#3f3f46] hover:bg-[#27272a] text-white text-sm font-semibold tracking-wide transition-all duration-300"
          >
            {t('sendAnother')}
          </button>
        </div>
      ) : (
        <div className="w-full flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-10 md:mb-14 kun-gradient-text">
            {t('sendInquiry')}
          </h2>
          
          <form onSubmit={handleInquirySubmit} className="flex flex-col space-y-8 md:space-y-10 w-full mb-10">
            
            {/* FULL NAME */}
            <div className="flex flex-col space-y-3">
              <label className="text-sm font-bold tracking-widest uppercase kun-gradient-text">
                {t('fullName')}
              </label>
              <div className="relative w-full">
                <input 
                  type="text" 
                  required
                  placeholder="Your Name"
                  className="w-full pb-3 text-black placeholder-gray-300 text-base focus:outline-none bg-transparent"
                  onChange={(e) => updateData('name', e.target.value)}
                  value={formData.name}
                />
                {/* Gradient Bottom Line */}
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#7181c8] via-[#b7d3f4] to-[#f1cfed]"></div>
              </div>
            </div>
            
            {/* PHONE OR EMAIL */}
            <div className="flex flex-col space-y-3">
              <label className="text-sm font-bold tracking-widest uppercase kun-gradient-text">
                {t('phoneEmail')}
              </label>
              <div className="relative w-full">
                <input 
                  type="text" 
                  required
                  placeholder="How should we reach you?"
                  className="w-full pb-3 text-black placeholder-gray-300 text-base focus:outline-none bg-transparent"
                  onChange={(e) => updateData('contact', e.target.value)}
                  value={formData.contact}
                />
                {/* Gradient Bottom Line */}
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#7181c8] via-[#b7d3f4] to-[#f1cfed]"></div>
              </div>
            </div>

            {/* MESSAGE */}
            <div className="flex flex-col space-y-3">
              <label className="text-sm font-bold tracking-widest uppercase kun-gradient-text">
                {t('message')}
              </label>
              <div className="relative w-full flex flex-col">
                <textarea 
                  required
                  rows={2}
                  placeholder="Leave a message for us..."
                  className="w-full pb-3 text-black placeholder-gray-300 text-base focus:outline-none bg-transparent resize-none"
                  onChange={(e) => updateData('message', e.target.value)}
                  value={formData.message}
                ></textarea>
                {/* Gradient Bottom Line */}
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#7181c8] via-[#b7d3f4] to-[#f1cfed]"></div>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className="text-sm font-bold tracking-widest uppercase kun-gradient-text"
            >
              {isSubmitting ? t('sending') : t('submitBtn')}
            </button>
          </form>
        </div>
      )}
    </section>
  );
}