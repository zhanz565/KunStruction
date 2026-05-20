"use client";

interface OptionSelectProps {
  label: string;
  isSelected: boolean;
  onClick: () => void;
}

export default function OptionSelect({ label, isSelected, onClick }: OptionSelectProps) {
  return (
    <button
      onClick={onClick}
      // Changed from 'gap-4' to 'gap-1' for ultra-tight spacing
      className="w-full flex items-center justify-start gap-1 py-4 text-left group transition-all"
    >
      <div className="w-3 h-3 flex items-center justify-center">
        <svg
          viewBox="0 0 100 100"
          className={`w-full h-full transition-colors duration-300 ${
            isSelected ? 'fill-black' : 'fill-gray-200 group-hover:fill-gray-400'
          }`}
        >
          <polygon points="50,0 100,50 50,100 0,50" />
        </svg>
      </div>
      
      {/* Added 'ml-1' for fine-tuning the 1-2px gap */}
      <span className={`text-lg ml-1 transition-colors ${
        isSelected ? 'text-black font-semibold' : 'text-gray-600 group-hover:text-black'
      }`}>
        {label}
      </span>
    </button>
  );
}