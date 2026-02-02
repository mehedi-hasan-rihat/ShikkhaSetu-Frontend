'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Something went wrong!</h2>
        <p className="text-gray-600 mb-6">We encountered an error while loading this page.</p>
        <div className="space-y-3">
          <button
            onClick={reset}
            className="w-full bg-[#0AB5F8] hover:bg-[#0891b2] text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Try again
          </button>
          <Link
            href="/"
            className="block w-full border border-gray-300 hover:border-[#0AB5F8] text-gray-700 hover:text-[#0AB5F8] px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}