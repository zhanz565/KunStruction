import RentWizard from '@/components/rent/RentWizard';
import Link from 'next/link';

export default function RentPage() {
  return (
    <main className="min-h-screen bg-white text-black selection:bg-black selection:text-white pt-12">
      {/* Minimal Header */}
      <header className="px-6 pb-12 border-b border-gray-200 flex justify-between items-center">
        <Link href="/" className="text-xl font-black tracking-tighter uppercase hover:opacity-50 transition-opacity">
          Kunstruction
        </Link>
      </header>

      {/* Wizard Form */}
      <RentWizard />
    </main>
  );
}