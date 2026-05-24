"use client";

import { useState } from 'react';

export default function QAWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [question, setQuestion] = useState('');
  const [isSent, setIsSent] = useState(false);

  const handleSend = () => {
    if (!question.trim()) return;
    
    setTimeout(() => {
      setIsSent(true);
      setTimeout(() => {
        setIsOpen(false);
        setIsSent(false);
        setQuestion('');
      }, 3000);
    }, 1000);
  };

  return (
    <div style={{ position: 'fixed', bottom: '1.5rem', left: '1.5rem', zIndex: 9999 }}>
      
      {isOpen && (
        <div className="absolute bottom-16 left-0 w-[calc(100vw-2rem)] max-w-[300px] md:w-80 bg-white border border-gray-200 shadow-2xl p-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
          {isSent ? (
            <div className="text-center py-4">
              <p className="text-sm font-bold text-black uppercase tracking-widest">Sent!</p>
              <p className="text-xs text-gray-500 mt-2">We will reply to your email shortly.</p>
            </div>
          ) : (
            <div className="flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-bold uppercase tracking-widest text-black">Q&A</h3>
                <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-black text-2xl md:text-xl leading-none px-2">&times;</button>
              </div>
              <textarea 
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="What's your question?"
                className="w-full h-24 border border-gray-200 p-3 text-base md:text-sm focus:outline-none focus:border-black resize-none bg-gray-50 mb-4"
              />
              <button 
                onClick={handleSend}
                disabled={!question.trim()}
                className="w-full bg-black text-white text-xs font-bold uppercase tracking-widest py-4 md:py-3 hover:bg-gray-800 transition-colors disabled:bg-gray-300 active:bg-gray-700"
              >
                Send
              </button>
            </div>
          )}
        </div>
      )}

      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 md:w-14 md:h-14 bg-black rounded-full flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-transform"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 md:w-6 md:h-6">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
        </svg>
      </button>

    </div>
  );
}