interface OptionSelectProps {
  label: string;
  isSelected: boolean;
  onClick: () => void;
}

export default function OptionSelect({ label, isSelected, onClick }: OptionSelectProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left py-4 px-6 border border-gray-300 uppercase tracking-widest text-sm md:text-base font-medium transition-colors duration-300 ${
        isSelected 
          ? 'bg-black text-white border-black' 
          : 'bg-transparent text-gray-500 hover:border-black hover:text-black'
      }`}
    >
      {label}
    </button>
  );
}