'use client';

import { useAuth } from '@/providers/AuthProvider';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ToastContainer } from '@/utils/errorHandler';

const tutorNavItems = [
    { href: '/dashboard', label: 'Overview', icon: 'M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z' },
    { href: '/dashboard/availability', label: 'Availability', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
    { href: '/dashboard/sessions', label: 'Sessions', icon: 'M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' },
    { href: '/dashboard/reviews', label: 'Reviews', icon: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z' },
    { href: '/dashboard/profile', label: 'Profile', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' }
];

const studentNavItems = [
    { href: '/dashboard', label: 'Overview', icon: 'M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z' },
    { href: '/dashboard/profile', label: 'Profile', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' }
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const { user, isLoading, isAuthenticated } = useAuth();
    const router = useRouter();
    const pathname = usePathname();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        console.log('DashboardLayout - isLoading:', isLoading, 'isAuthenticated:', isAuthenticated); // Debugging log
        if (!isLoading && !isAuthenticated) {
            console.log('Redirecting to login...'); // Debugging log
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

    const navItems = user?.role === 'TUTOR' ? tutorNavItems : studentNavItems;

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="flex">
                {/* Mobile menu button */}
                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="lg:hidden fixed top-20 left-4 z-50 p-2 bg-white rounded-lg shadow-md"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>

                {/* Sidebar */}
                <aside className={`fixed w-64 bg-white shadow-sm border-r border-gray-200 h-full top-0 left-0 z-40 transform transition-transform duration-300 ease-in-out ${
                    sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                } lg:translate-x-0`}>
                    <div className="p-6">
                        <h2 className="text-lg font-semibold text-gray-900">Dashboard</h2>
                        <p className="text-sm text-gray-600 mt-1">{user?.role?.toLowerCase()}</p>
                    </div>
                    <nav className="px-4 pb-4">
                        <ul className="space-y-2">
                            {navItems.map((item) => (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        onClick={() => setSidebarOpen(false)}
                                        className={`flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                                            pathname === item.href
                                                ? 'bg-[#0AB5F8] text-white'
                                                : 'text-gray-700 hover:bg-gray-100'
                                        }`}
                                    >
                                        <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                                        </svg>
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </aside>

                {/* Overlay */}
                {sidebarOpen && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
                        onClick={() => setSidebarOpen(false)}
                    />
                )}

                {/* Main content */}
                <main className="flex-1 lg:ml-64">
                    {children}
                </main>
            </div>
            <ToastContainer />
        </div>
    );
}