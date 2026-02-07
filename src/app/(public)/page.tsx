'use client';

import { useState, useEffect } from 'react';
import { Tutor, Category } from '@/types';
import { apiService } from '@/services/api';
import { Hero } from '@/components/Hero';
import { ProTutors } from '@/components/ProTutors';
import { JoinSection } from '@/components/JoinSection';
import { FAQ } from '@/components/FAQ';
import { Footer } from '@/components/Footer';
import { ErrorHandler, ToastContainer } from '@/utils/errorHandler';
import { LoadingSpinner } from '@/components/ui/Loading';

export default function HomePage() {
  
    return (
        <div className="min-h-screen bg-white space-y-20">
            <Hero />
            {/* <AcademicTutors /> */}
            <ProTutors />
            {/* <RecentTuitionOffers /> */}
            <JoinSection />
            <FAQ />

            <Footer />
            <div className="-mt-20">
                <ToastContainer />
            </div>
        </div>
    );
}