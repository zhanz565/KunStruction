import BuyWizard from '@/components/buy/BuyWizard';
import Link from 'next/link';

export default function BuyPage() {
  return (
    <main className="min-h-screen bg-white text-black selection:bg-black selection:text-white pt-12">
      {/* Minimal Header - Border-b removed for uninterrupted spacing */}
      <header className="px-6 pb-12 flex justify-between items-center">
        <Link href="/" className="text-xl font-black tracking-tighter uppercase hover:opacity-50 transition-opacity">
          Kunstruction
        </Link>
      </header>

      {/* Wizard Form */}
      <BuyWizard />
    </main>
  );
}