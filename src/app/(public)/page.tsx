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

export default function HomePage() {
  const [featuredTutors, setFeaturedTutors] = useState<Tutor[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [tutorsResponse, categoriesResponse] = await Promise.all([
          apiService.getTutors({ sortBy: 'rating', limit: 6 }),
          apiService.getCategories(),
        ]);

        if (tutorsResponse.success && tutorsResponse.data) {
          setFeaturedTutors(tutorsResponse.data.data);
        }

        if (categoriesResponse.success && categoriesResponse.data) {
          setCategories(categoriesResponse.data);
        }
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-white space-y-20">
      <Hero />
      {/* <AcademicTutors /> */}
      <ProTutors />
      {/* <RecentTuitionOffers /> */}
      <JoinSection />
      <FAQ />

      <Footer />
    </div>
  );
}