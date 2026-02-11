'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/providers/AuthProvider';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { fetchWithAuth } from '@/utils/fetchWithAuth';
import { ErrorHandler } from '@/utils/errorHandler';

interface Booking {
    id: string;
    studentId: string;
    tutorId: string;
    scheduledAt: string;
    duration: number;
    status: 'CONFIRMED' | 'COMPLETED' | 'CANCELLED';
    notes?: string;
    totalAmount: number;
    student: {
        name: string;
        email: string;
    };
    tutor: {
        name: string;
        email: string;
    };
}

interface TutorProfile {
    id: string;
    bio?: string;
    hourlyRate: number;
    experience: number;
    subjects: string[];
    rating: number;
    totalReviews: number;
    isAvailable: boolean;
    category: {
        name: string;
    };
}

export default function TutorDashboard() {
    const { user } = useAuth();
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [profile, setProfile] = useState<TutorProfile | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchBookings();
        fetchProfile();
    }, []);

    const fetchBookings = async () => {
        try {
            const response = await fetchWithAuth('/bookings');
            
            if (response.ok) {
                const data = await response.json();
                setBookings(Array.isArray(data) ? data : []);
            } else {
                setBookings([]);
            }
        } catch (error) {
            ErrorHandler.handleApiError(error, 'Load bookings');
            setBookings([]);
        }
    };

    const fetchProfile = async () => {
        try {
            const response = await fetchWithAuth('/tutors/profile');
            
            if (response.ok) {
                const data = await response.json();
                setProfile(data);
            }
        } catch (error) {
            ErrorHandler.handleApiError(error, 'Load profile');
        } finally {
            setLoading(false);
        }
    };

    const markComplete = async (bookingId: string) => {
        try {
            const response = await fetchWithAuth(`/bookings/${bookingId}`, {
                method: 'PATCH',
                body: JSON.stringify({ status: 'COMPLETED' })
            });
            
            if (response.ok) {
                fetchBookings();
                ErrorHandler.success('Booking marked as complete');
            }
        } catch (error) {
            ErrorHandler.handleApiError(error, 'Mark complete');
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'CONFIRMED': return 'text-[#0AB5F8] bg-[#0AB5F8]/10';
            case 'COMPLETED': return 'text-green-700 bg-green-100';
            case 'CANCELLED': return 'text-red-700 bg-red-100';
            default: return 'text-gray-700 bg-gray-100';
        }
    };

    return (
        <div className="p-4 sm:p-6">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user?.name}!</h1>
                <p className="text-gray-600 mt-1">Manage your teaching sessions</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <Card className="bg-gradient-to-r from-[#0AB5F8] to-blue-600 text-white">
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between pt-3">
                            <div>
                                <p className="text-blue-100 text-sm">Total Bookings</p>
                                <p className="text-2xl font-bold">{bookings.length}</p>
                            </div>
                            <div className="p-2 bg-white/20 rounded-lg">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between pt-3">
                            <div>
                                <p className="text-green-100 text-sm">Completed</p>
                                <p className="text-2xl font-bold">{bookings.filter(b => b.status === 'COMPLETED').length}</p>
                            </div>
                            <div className="p-2 bg-white/20 rounded-lg">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between pt-3">
                            <div>
                                <p className="text-yellow-100 text-sm">Rating</p>
                                <p className="text-2xl font-bold">{profile?.rating?.toFixed(1) || '0.0'}</p>
                            </div>
                            <div className="p-2 bg-white/20 rounded-lg">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                </svg>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between pt-3">
                            <div>
                                <p className="text-purple-100 text-sm">Hourly Rate</p>
                                <p className="text-2xl font-bold">৳{profile?.hourlyRate || 0}</p>
                            </div>
                            <div className="p-2 bg-white/20 rounded-lg">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                </svg>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <Card className="bg-white border border-gray-200 shadow-sm pt-3">
                        <CardHeader className="border-b border-gray-100">
                            <CardTitle className="text-gray-900">Recent Bookings</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            {loading ? (
                                <div className="flex justify-center py-8">
                                    <div className="w-6 h-6 border-2 border-[#0AB5F8] border-t-transparent rounded-full animate-spin"></div>
                                </div>
                            ) : bookings.length === 0 ? (
                                <div className="text-center py-8">
                                    <p className="text-gray-500 mb-4">No bookings yet</p>
                                    <p className="text-sm text-gray-400">Students will book sessions with you</p>
                                </div>
                            ) : (
                                <div className="divide-y divide-gray-100">
                                    {bookings.slice(0, 5).map((booking) => (
                                        <div key={booking.id} className="p-4 hover:bg-gray-50 transition-colors">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center space-x-3">
                                                    <div className="w-10 h-10 bg-[#0AB5F8]/10 rounded-full flex items-center justify-center">
                                                        <span className="text-[#0AB5F8] font-medium text-sm">{booking.student.name.charAt(0)}</span>
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-gray-900">{booking.student.name}</p>
                                                        <p className="text-sm text-gray-500">{new Date(booking.scheduledAt).toLocaleDateString()} • {booking.duration}min</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center space-x-3">
                                                    <span className="text-sm font-medium text-[#0AB5F8]">৳{booking.totalAmount}</span>
                                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                                                        {booking.status}
                                                    </span>
                                                    {booking.status === 'CONFIRMED' && (
                                                        <Button
                                                            size="sm"
                                                            onClick={() => markComplete(booking.id)}
                                                            className="text-xs bg-[#0AB5F8] hover:bg-[#0891b2]"
                                                        >
                                                            Complete
                                                        </Button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                <Card className="bg-white border border-gray-200 shadow-sm">
                    <CardHeader className="border-b border-gray-100">
                        <CardTitle className="text-gray-900">Profile Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4">
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-gray-600">Category</span>
                                <span className="font-medium">{profile?.category?.name || 'Not set'}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-gray-600">Experience</span>
                                <span className="font-medium">{profile?.experience || 0} years</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-gray-600">Total Reviews</span>
                                <span className="font-medium">{profile?.totalReviews || 0}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-gray-600">Status</span>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                    profile?.isAvailable ? 'text-green-600 bg-green-100' : 'text-red-600 bg-red-100'
                                }`}>
                                    {profile?.isAvailable ? 'Available' : 'Unavailable'}
                                </span>
                            </div>
                            <div className="pt-2">
                                <span className="text-gray-600">Subjects</span>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {profile?.subjects?.map((subject: string, index: number) => (
                                        <span key={index} className="px-2 py-1 bg-[#0AB5F8]/10 text-[#0AB5F8] rounded-full text-xs">
                                            {subject}
                                        </span>
                                    )) || <span className="text-gray-400 text-sm">No subjects set</span>}
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}