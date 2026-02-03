'use client';

import { useAuth } from '@/providers/AuthProvider';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import StudentDashboard from './StudentDashboard';
import TutorDashboard from '@/components/dashboard/TutorDashboard';
import AdminDashboard from './AdminDashboard';

export default function DashboardPage() {
    const { user, isLoading, isAuthenticated } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            router.push('/login');
        }
    }, [isLoading, isAuthenticated, router]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-[#0AB5F8] border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return null;
    }

    const renderDashboard = () => {
        switch (user?.role) {
            case 'STUDENT':
                return <StudentDashboard />;
            case 'TUTOR':
                return <TutorDashboard />;
            case 'ADMIN':
                return <AdminDashboard />;
            default:
                return <StudentDashboard />;
        }
    };

    return renderDashboard();
}