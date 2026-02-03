'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/providers/AuthProvider';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

interface Booking {
    id: string;
    tutorName: string;
    subject: string;
    date: string;
    time: string;
    status: 'CONFIRMED' | 'COMPLETED' | 'CANCELLED';
}

export default function StudentDashboard() {
    const { user } = useAuth();
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookings`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            if (response.ok) {
                const data = await response.json();
                setBookings(Array.isArray(data) ? data : []);
            } else {
                setBookings([]);
            }
        } catch (error) {
            console.error('Failed to fetch bookings:', error);
            setBookings([]);
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'CONFIRMED': return 'text-blue-600 bg-blue-100';
            case 'COMPLETED': return 'text-green-600 bg-green-100';
            case 'CANCELLED': return 'text-red-600 bg-red-100';
            default: return 'text-gray-600 bg-gray-100';
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user?.name}!</h1>
                    <p className="text-gray-600 mt-2">Manage your learning journey</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center">
                                <div className="p-3 bg-blue-100 rounded-full">
                                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-600">Total Bookings</p>
                                    <p className="text-2xl font-bold text-gray-900">{bookings.length}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center">
                                <div className="p-3 bg-green-100 rounded-full">
                                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-600">Completed</p>
                                    <p className="text-2xl font-bold text-gray-900">{bookings.filter(b => b.status === 'COMPLETED').length}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center">
                                <div className="p-3 bg-yellow-100 rounded-full">
                                    <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-600">Upcoming</p>
                                    <p className="text-2xl font-bold text-gray-900">{bookings.filter(b => b.status === 'CONFIRMED').length}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Bookings</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {loading ? (
                                <div className="flex justify-center py-8">
                                    <div className="w-6 h-6 border-2 border-[#0AB5F8] border-t-transparent rounded-full animate-spin"></div>
                                </div>
                            ) : bookings.length === 0 ? (
                                <div className="text-center py-8">
                                    <p className="text-gray-500 mb-4">No bookings yet</p>
                                    <Link href="/tutors">
                                        <Button>Find Tutors</Button>
                                    </Link>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {bookings.slice(0, 5).map((booking) => (
                                        <div key={booking.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                                            <div>
                                                <p className="font-medium text-gray-900">{booking.tutorName}</p>
                                                <p className="text-sm text-gray-600">{booking.subject}</p>
                                                <p className="text-sm text-gray-500">{booking.date} at {booking.time}</p>
                                            </div>
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                                                {booking.status}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Quick Actions</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <Link href="/tutors" className="block">
                                    <div className="p-4 border border-gray-200 rounded-lg hover:border-[#0AB5F8] transition-colors cursor-pointer">
                                        <div className="flex items-center">
                                            <div className="p-2 bg-[#0AB5F8] rounded-lg">
                                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                                </svg>
                                            </div>
                                            <div className="ml-3">
                                                <p className="font-medium text-gray-900">Find Tutors</p>
                                                <p className="text-sm text-gray-600">Browse and book sessions</p>
                                            </div>
                                        </div>
                                    </div>
                                </Link>

                                <Link href="/dashboard/bookings" className="block">
                                    <div className="p-4 border border-gray-200 rounded-lg hover:border-[#0AB5F8] transition-colors cursor-pointer">
                                        <div className="flex items-center">
                                            <div className="p-2 bg-green-500 rounded-lg">
                                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                            </div>
                                            <div className="ml-3">
                                                <p className="font-medium text-gray-900">My Bookings</p>
                                                <p className="text-sm text-gray-600">View all sessions</p>
                                            </div>
                                        </div>
                                    </div>
                                </Link>

                                <Link href="/dashboard/profile" className="block">
                                    <div className="p-4 border border-gray-200 rounded-lg hover:border-[#0AB5F8] transition-colors cursor-pointer">
                                        <div className="flex items-center">
                                            <div className="p-2 bg-purple-500 rounded-lg">
                                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                </svg>
                                            </div>
                                            <div className="ml-3">
                                                <p className="font-medium text-gray-900">Profile Settings</p>
                                                <p className="text-sm text-gray-600">Update your information</p>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}