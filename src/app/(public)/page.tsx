'use client';

import { Hero } from '@/components/Hero';
import { ProTutors } from '@/components/ProTutors';
import { JoinSection } from '@/components/JoinSection';
import { FAQ } from '@/components/FAQ';
import { Footer } from '@/components/Footer';
import { ToastContainer } from '@/utils/errorHandler';
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