"use client";

import { useState } from 'react';
import Link from 'next/link';

// Helper to convert files into Base64 strings for the API
const convertToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      // Remove the "data:image/jpeg;base64," prefix for Resend
      const base64String = (reader.result as string).split(',')[1];
      resolve(base64String);
    };
    reader.onerror = (error) => reject(error);
  });
};

// Helper component for each document row
function FileUploadRow({ 
  title, 
  description, 
  isOptional = false,
  onFileSelect 
}: { 
  title: string, 
  description: string, 
  isOptional?: boolean,
  onFileSelect: (file: File | null) => void 
}) {
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFileName(file.name);
      onFileSelect(file); // Pass the actual file up to the parent
    }
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between py-6 border-b border-gray-200 group">
      <div className="flex flex-col mb-4 md:mb-0 pr-4">
        <div className="flex items-center gap-3">
          <h3 className="text-lg font-medium text-black">{title}</h3>
          {isOptional && (
            <span className="text-xs font-mono tracking-widest text-gray-400 uppercase">Optional</span>
          )}
        </div>
        <p className="text-sm text-gray-500 mt-1">{description}</p>
      </div>
      
      <div>
        <input 
          type="file" 
          id={`file-${title}`} 
          className="hidden" 
          onChange={handleFileChange}
          accept=".pdf,.jpg,.jpeg,.png"
        />
        <label 
          htmlFor={`file-${title}`}
          className={`cursor-pointer inline-flex items-center justify-center px-6 py-3 border transition-all duration-300 text-sm font-medium w-full md:w-auto text-center active:opacity-50 ${
            fileName 
              ? 'border-black bg-gray-50 text-black' 
              : 'border-gray-300 text-gray-600 hover:border-black hover:text-black'
          }`}
        >
          {fileName ? (
            <span className="truncate max-w-[200px]">{fileName}</span>
          ) : (
            'Select file'
          )}
        </label>
      </div>
    </div>
  );
}

export default function DocumentUpload() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // State to hold all the selected physical files
  const [files, setFiles] = useState<Record<string, File | null>>({
    'Driver License': null,
    'Letter of Employment': null,
    'Equifax Report': null,
    'Landlord Reference': null,
  });

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const attachments = [];

      // Convert each uploaded file to Base64
      for (const [title, file] of Object.entries(files)) {
        if (file) {
          const base64Content = await convertToBase64(file);
          attachments.push({
            filename: `${title.replace(/\s+/g, '_')}_${file.name}`,
            content: base64Content
          });
        }
      }

      // Send to the API
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          formName: 'Rental Documents Submission',
          attachments
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to upload documents');
      }

      setIsSubmitted(true);
    } catch (error) {
      console.error(error);
      alert('There was an error uploading your files. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center min-h-[60vh] px-6 text-center animate-in fade-in duration-700">
        <h2 className="text-3xl font-bold tracking-tight mb-4 text-black">
           Submitted
        </h2>
        <p className="text-gray-500 text-base leading-relaxed mb-10">
          Thank you. Our agent will look at your documents and send you a property list if we find something you might like.
        </p>
        <Link href="/">
          <button className="py-4 px-8 border border-black bg-black text-white text-sm font-semibold tracking-wide transition-all duration-300 hover:bg-transparent hover:text-black">
            Return to Directory
          </button>
        </Link>
      </div>
    );
  }

  // Ensure the user uploads the 3 mandatory files before they can click submit
  const canSubmit = files['Driver License'] && files['Letter of Employment'] && files['Equifax Report'];

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col min-h-[70vh] px-6 animate-in fade-in duration-500">
      
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-bold tracking-tight mb-4 text-black">Required Documents</h2>
        <p className="text-gray-500 text-base">
          Please provide the following files in PDF or high-resolution image format to expedite your leasing application.
        </p>
      </div>

      <div className="flex flex-col w-full border-t border-gray-200 mb-12">
        <FileUploadRow 
          title="Driver's License" 
          description="Front and back of a valid government-issued ID." 
          onFileSelect={(f) => setFiles(prev => ({ ...prev, 'Driver License': f }))}
        />
        <FileUploadRow 
          title="Letter of Employment" 
          description="Recent letter stating your position, salary, and length of employment." 
          onFileSelect={(f) => setFiles(prev => ({ ...prev, 'Letter of Employment': f }))}
        />
        <FileUploadRow 
          title="Equifax Report" 
          description="Full credit report including your credit score." 
          onFileSelect={(f) => setFiles(prev => ({ ...prev, 'Equifax Report': f }))}
        />
        <FileUploadRow 
          title="Landlord Reference" 
          description="Letter from your previous or current landlord." 
          isOptional={true}
          onFileSelect={(f) => setFiles(prev => ({ ...prev, 'Landlord Reference': f }))}
        />
      </div>

      <div className="flex justify-center">
        <button 
          onClick={handleSubmit}
          disabled={!canSubmit || isSubmitting}
          className="w-full md:w-auto py-5 px-16 border border-black bg-black text-white font-semibold tracking-wide hover:bg-gray-900 transition-colors focus:outline-none disabled:bg-gray-200 disabled:border-gray-200 disabled:text-gray-400"
        >
          {isSubmitting ? 'Uploading...' : 'Submit Documents'}
        </button>
      </div>

    </div>
  );
}