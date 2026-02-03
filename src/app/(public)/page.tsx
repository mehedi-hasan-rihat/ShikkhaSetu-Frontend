'use client';

import { useState, useEffect } from 'react';
import { Tutor, Category } from '@/types';
import { apiService } from '@/services/api';
import { Hero } from '@/components/Hero';
import { AcademicTutors } from '@/components/AcademicTutors';
import { ProTutors } from '@/components/ProTutors';
import { RecentTuitionOffers } from '@/components/RecentTuitionOffers';
import { JoinSection } from '@/components/JoinSection';
import { FAQ } from '@/components/FAQ';
import { Footer } from '@/components/Footer';
import { ErrorHandler, ToastContainer } from '@/utils/errorHandler';
import { LoadingSpinner } from '@/components/ui/Loading';

export default function HomePage() {
  const [featuredTutors, setFeaturedTutors] = useState<Tutor[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const [tutorsResponse, categoriesResponse] = await Promise.all([
          apiService.getTutors({ sortBy: 'rating', limit: 6 }),
          apiService.getCategories(),
        ]);

        if (tutorsResponse.success && tutorsResponse.data) {
          setFeaturedTutors(tutorsResponse.data.data);
        } else {
          ErrorHandler.warning('Failed to load featured tutors');
        }

        if (categoriesResponse.success && categoriesResponse.data) {
          setCategories(categoriesResponse.data);
        } else {
          ErrorHandler.warning('Failed to load categories');
        }
      } catch (error) {
        const errorMsg = 'Failed to load homepage data';
        setError(errorMsg);
        ErrorHandler.handleApiError(error, 'Homepage');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center space-y-4">
          <LoadingSpinner size="lg" />
          <p className="text-gray-600">Loading homepage...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center space-y-4 max-w-md">
          <div className="text-red-500 text-6xl">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900">Something went wrong</h2>
          <p className="text-gray-600">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-[#0AB5F8] hover:bg-[#0891b2] text-white px-6 py-2 rounded-lg"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white space-y-20">
      <Hero />
      {/* <AcademicTutors /> */}
      <ProTutors />
      {/* <RecentTuitionOffers /> */}
      <JoinSection />
      <FAQ />

      <Footer />
      <ToastContainer />
    </div>
  );
}