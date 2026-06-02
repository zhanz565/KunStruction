import RentWizard from '@/components/rent/RentWizard';
import Link from 'next/link';

export default function RentPage() {
  return (
    <main className="min-h-screen bg-white text-black selection:bg-black selection:text-white pt-12">
      {/* Minimal Header */}
      <header className="px-6 pb-12 flex justify-between items-center">
        <Link href="/" className="text-xl font-black tracking-tighter uppercase hover:opacity-50 transition-opacity">
          Kun
        </Link>
      </header>

      {/* Wizard Form */}
      <RentWizard />
    </main>
  );
}