export default function NextArrow({ onClick, disabled }: { onClick: () => void, disabled?: boolean }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`mt-12 p-4 border-2 border-black rounded-full flex items-center justify-center transition-all duration-300 ${
        disabled ? 'opacity-0 pointer-events-none' : 'opacity-100 hover:bg-black hover:text-white cursor-pointer'
      }`}
      aria-label="Next step"
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter">
        <path d="M5 12h14M12 5l7 7-7 7" />
      </svg>
    </button>
  );
}