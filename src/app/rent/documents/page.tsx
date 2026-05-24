import DocumentUpload from '@/components/rent/DocumentUpload';
import Link from 'next/link';

export default function RentDocumentsPage() {
  return (
    <main className="min-h-screen bg-white text-black selection:bg-black selection:text-white pt-12">
      {/* Minimal Header */}
      <header className="px-6 pb-12 flex justify-between items-center">
        <Link href="/" className="text-xl font-black tracking-tighter uppercase hover:opacity-50 transition-opacity">
          Kunstruction
        </Link>
      </header>

      {/* Document Upload Form */}
      <div className="pt-16 pb-32">
        <DocumentUpload />
      </div>
    </main>
  );
}