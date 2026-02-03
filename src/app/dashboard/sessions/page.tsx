'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/providers/AuthProvider';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

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

export default function BookingsPage() {
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
                    <h1 className="text-3xl font-bold text-gray-900">My Bookings</h1>
                    <p className="text-gray-600 mt-2">View all your tutoring sessions</p>
                </div>

                <Card className="bg-white border border-gray-200 shadow-sm">
                    <CardHeader className="border-b border-gray-100">
                        <CardTitle className="text-gray-900">All Bookings</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {loading ? (
                            <div className="flex justify-center py-8">
                                <div className="w-6 h-6 border-2 border-[#0AB5F8] border-t-transparent rounded-full animate-spin"></div>
                            </div>
                        ) : bookings.length === 0 ? (
                            <div className="text-center py-8">
                                <p className="text-gray-500 mb-4">No bookings yet</p>
                                <p className="text-sm text-gray-400">Book your first session with a tutor</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {bookings.map((booking) => (
                                    <div key={booking.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-[#0AB5F8]/30 transition-colors">
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="font-medium text-gray-900">
                                                        {user?.role === 'STUDENT' ? booking.tutor.name : booking.student.name}
                                                    </p>
                                                    <p className="text-sm text-gray-600">{booking.notes || 'General Session'}</p>
                                                    <p className="text-sm text-gray-500">
                                                        {new Date(booking.scheduledAt).toLocaleDateString()} at {new Date(booking.scheduledAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} - {booking.duration}min
                                                    </p>
                                                    <p className="text-sm font-medium text-[#0AB5F8]">৳{booking.totalAmount}</p>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                                                        {booking.status}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}