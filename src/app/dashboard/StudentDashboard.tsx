'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/providers/AuthProvider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

import ReviewModal from '@/components/ReviewModal';
import { ErrorHandler } from '@/utils/errorHandler';

interface Booking {
  id: string;
  studentId: string;
  tutorId: string;
  scheduledAt: string;
  duration: number;
  status: 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED';
  notes: string | null;
  totalAmount: number;
  createdAt: string;
  updatedAt: string;
  student: {
    name: string;
    email: string;
  };
  tutor: {
    name: string;
    email: string;
  };
  review: any | null;
}

export default function StudentDashboard() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [reviewModal, setReviewModal] = useState<{isOpen: boolean, bookingId: string, tutorName: string}>(
    {isOpen: false, bookingId: '', tutorName: ''}
  );
  const [updating, setUpdating] = useState<string | null>(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookings`, {
        credentials: 'include'
      });
      if (response.ok) {
        const data = await response.json();
        setBookings(Array.isArray(data) ? data : []);
      } else {
        ErrorHandler.error('Failed to load bookings');
      }
    } catch (error) {
      ErrorHandler.handleApiError(error, 'Load bookings');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING': return 'text-yellow-700 bg-yellow-100';
      case 'CONFIRMED': return 'text-[#0AB5F8] bg-[#0AB5F8]/10';
      case 'COMPLETED': return 'text-green-700 bg-green-100';
      case 'CANCELLED': return 'text-red-700 bg-red-100';
      default: return 'text-gray-700 bg-gray-100';
    }
  };

  const cancelBooking = async (bookingId: string) => {
    setUpdating(bookingId);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/students/bookings/${bookingId}/cancel`, {
        method: 'PATCH',
        credentials: 'include'
      });
      
      if (response.ok) {
        ErrorHandler.success('Booking cancelled successfully');
        fetchBookings();
      } else {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to cancel booking');
      }
    } catch (error) {
      ErrorHandler.handleApiError(error, 'Cancel booking');
    } finally {
      setUpdating(null);
    }
  };

  const upcomingBookings = bookings.filter(b => b.status === 'CONFIRMED' || b.status === 'PENDING');
  const pastBookings = bookings.filter(b => b.status === 'COMPLETED' || b.status === 'CANCELLED');

  return (
    <div className="p-4 sm:p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user?.name}!</h1>
        <p className="text-gray-600 mt-1">Manage your learning sessions</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="bg-gradient-to-r from-[#0AB5F8] to-blue-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between pt-3">
              <div>
                <p className="text-blue-100 text-sm">Total Bookings</p>
                <p className="text-2xl font-bold">{bookings.length}</p>
              </div>
              <div className="p-2 bg-white/20 rounded-lg">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
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
                <p className="text-2xl font-bold">{pastBookings.filter(b => b.status === 'COMPLETED').length}</p>
              </div>
              <div className="p-2 bg-white/20 rounded-lg">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between pt-3">
              <div>
                <p className="text-purple-100 text-sm">Upcoming</p>
                <p className="text-2xl font-bold">{upcomingBookings.length}</p>
              </div>
              <div className="p-2 bg-white/20 rounded-lg">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Upcoming Sessions */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Upcoming Sessions</CardTitle>
              <Link href="/tutors" className="text-[#0AB5F8] hover:text-[#0891b2] text-sm font-medium">
                Book New Session
              </Link>
            </CardHeader>
            <CardContent className="p-0">
              {loading ? (
                <div className="flex justify-center py-8">
                  <div className="w-6 h-6 border-2 border-[#0AB5F8] border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : upcomingBookings.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500 mb-4">No upcoming sessions</p>
                  <Link href="/tutors">
                    <Button className="bg-[#0AB5F8] hover:bg-[#0891b2] text-white">
                      Find a Tutor
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {upcomingBookings.slice(0, 3).map((booking) => (
                    <div key={booking.id} className="p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-[#0AB5F8]/10 rounded-full flex items-center justify-center">
                            <span className="text-[#0AB5F8] font-medium text-sm">
                              {booking.tutor.name.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{booking.tutor.name}</p>
                            <p className="text-sm text-gray-500">
                              {new Date(booking.scheduledAt).toLocaleDateString()} • {booking.duration}min
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className="text-sm font-medium text-[#0AB5F8]">৳{booking.totalAmount}</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                            {booking.status}
                          </span>
                          { booking.status !== 'CANCELLED' && (
                            <Button
                              size="sm"
                              variant="danger"
                              className="text-xs"
                              onClick={() => cancelBooking(booking.id)}
                              disabled={updating === booking.id}
                            >
                              {updating === booking.id ? 'Cancelling...' : 'Cancel'}
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

          {/* Past Sessions */}
          <Card>
            <CardHeader>
              <CardTitle>Past Sessions</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {pastBookings.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">No past sessions</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {pastBookings.slice(0, 5).map((booking) => (
                    <div key={booking.id} className="p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-[#0AB5F8]/10 rounded-full flex items-center justify-center">
                            <span className="text-[#0AB5F8] font-medium text-sm">
                              {booking.tutor.name.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{booking.tutor.name}</p>
                            <p className="text-sm text-gray-500">
                              {new Date(booking.scheduledAt).toLocaleDateString()} • {booking.duration}min
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className="text-sm font-medium text-[#0AB5F8]">৳{booking.totalAmount}</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                            {booking.status}
                          </span>
                          {booking.status === 'COMPLETED' && !booking.review && (
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="text-xs"
                              onClick={() => setReviewModal({isOpen: true, bookingId: booking.id, tutorName: booking.tutor.name})}
                            >
                              Review
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

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link href="/tutors" className="block">
                <Button className="w-full bg-[#0AB5F8] hover:bg-[#0891b2] text-white">
                  Find Tutors
                </Button>
              </Link>
              <Link href="/dashboard/profile" className="block">
                <Button variant="outline" className="w-full border-[#0AB5F8] text-[#0AB5F8] hover:bg-[#0AB5F8] hover:text-white">
                  Manage Profile
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Learning Progress */}
          <Card>
            <CardHeader>
              <CardTitle>Learning Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Sessions Completed</span>
                  <span className="font-medium text-[#0AB5F8]">
                    {pastBookings.filter(b => b.status === 'COMPLETED').length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Hours</span>
                  <span className="font-medium text-[#0AB5F8]">
                    {Math.round(pastBookings.filter(b => b.status === 'COMPLETED').reduce((acc, b) => acc + b.duration, 0) / 60)}h
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Active Tutors</span>
                  <span className="font-medium text-[#0AB5F8]">
                    {new Set(bookings.map(b => b.tutorId)).size}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <ReviewModal
        bookingId={reviewModal.bookingId}
        tutorName={reviewModal.tutorName}
        isOpen={reviewModal.isOpen}
        onClose={() => setReviewModal({isOpen: false, bookingId: '', tutorName: ''})}
        onSubmit={fetchBookings}
      />
    </div>
  );
}