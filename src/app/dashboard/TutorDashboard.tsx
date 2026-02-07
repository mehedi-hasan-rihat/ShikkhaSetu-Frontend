'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/providers/AuthProvider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

import { ErrorHandler } from '@/utils/errorHandler';
import { Booking } from '@/types';

interface Booking {
  id: string;
  student: { name: string; email: string };
  scheduledAt: string;
  duration: number;
  status: 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED';
  totalAmount: number;
  review?: {
    rating: number;
    comment: string;
  };
}

export default function TutorDashboard() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);

  useEffect(() => {
    fetchBookings();
    fetchReviews();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tutors/bookings`, {
        credentials: 'include'
      });
      if (response.ok) {
        const data = await response.json();
        setBookings(Array.isArray(data) ? data : []);
      } else {
        ErrorHandler.error('Failed to load teaching sessions');
      }
    } catch (error) {
      ErrorHandler.handleApiError(error, 'Load sessions');
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async () => {
    if (!user?.id) return;
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reviews/tutor/${user.id}`);
      if (response.ok) {
        const data = await response.json();
        setReviews(Array.isArray(data) ? data : []);
      } else {
        ErrorHandler.warning('Failed to load reviews');
      }
    } catch (error) {
      ErrorHandler.handleApiError(error, 'Load reviews');
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

  const confirmBooking = async (bookingId: string) => {
    setUpdating(bookingId);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookings/${bookingId}/confirm`, {
        method: 'PATCH',
        credentials: 'include'
      });
      
      if (response.ok) {
        ErrorHandler.success('Booking confirmed successfully');
        fetchBookings();
      } else {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to confirm booking');
      }
    } catch (error) {
      ErrorHandler.handleApiError(error, 'Confirm booking');
    } finally {
      setUpdating(null);
    }
  };

  const completeBooking = async (bookingId: string) => {
    setUpdating(bookingId);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tutors/bookings/${bookingId}/complete`, {
        method: 'PATCH',
        credentials: 'include'
      });
      
      if (response.ok) {
        ErrorHandler.success('Session completed successfully');
        fetchBookings();
      } else {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to complete session');
      }
    } catch (error) {
      ErrorHandler.handleApiError(error, 'Complete session');
    } finally {
      setUpdating(null);
    }
  };

  const completedSessions = bookings.filter(b => b.status === 'COMPLETED');
  const avgRating = reviews.length > 0 
    ? reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length 
    : 0;

  return (
    <div className="p-4 sm:p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user?.name}!</h1>
        <p className="text-gray-600 mt-1">Manage your teaching sessions</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="bg-gradient-to-r from-[#0AB5F8] to-blue-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between pt-3">
              <div>
                <p className="text-blue-100 text-sm">Total Sessions</p>
                <p className="text-2xl font-bold">{bookings.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between pt-3">
              <div>
                <p className="text-green-100 text-sm">Completed</p>
                <p className="text-2xl font-bold">{completedSessions.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between pt-3">
              <div>
                <p className="text-purple-100 text-sm">Total Bookings</p>
                <p className="text-2xl font-bold">{bookings.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between pt-3">
              <div>
                <p className="text-yellow-100 text-sm">Avg Rating</p>
                <p className="text-2xl font-bold">{avgRating.toFixed(1)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/*  Sessions */}
          <Card>
            <CardHeader>
              <CardTitle> Sessions</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {loading ? (
                <div className="flex justify-center py-8">
                  <div className="w-6 h-6 border-2 border-[#0AB5F8] border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : bookings.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">No  sessions</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {bookings.slice(0, 5).map((booking) => (
                    <div key={booking.id} className="p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-[#0AB5F8]/10 rounded-full flex items-center justify-center">
                            <span className="text-[#0AB5F8] font-medium text-sm">
                              {booking.student.name.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{booking.student.name}</p>
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
                          {booking.status === 'PENDING' && (
                            <Button
                              size="sm"
                              className="text-xs bg-[#0AB5F8] hover:bg-[#0891b2]"
                              onClick={() => confirmBooking(booking.id)}
                              disabled={updating === booking.id}
                            >
                              {updating === booking.id ? 'Confirming...' : 'Confirm'}
                            </Button>
                          )}
                          {booking.status === 'CONFIRMED' && (
                            <Button
                              size="sm"
                              className="text-xs bg-green-600 hover:bg-green-700"
                              onClick={() => completeBooking(booking.id)}
                              disabled={updating === booking.id}
                            >
                              {updating === booking.id ? 'Completing...' : 'Complete'}
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

          {/* Reviews */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Reviews</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {reviews.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">No reviews yet</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {reviews.slice(0, 5).map((review) => (
                    <div key={review.id} className="p-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-10 h-10 bg-[#0AB5F8]/10 rounded-full flex items-center justify-center">
                          <span className="text-[#0AB5F8] font-medium text-sm">
                            {review.student?.name?.charAt(0) || 'S'}
                          </span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <p className="font-medium text-gray-900">{review.student?.name || 'Student'}</p>
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <span key={i} className={`text-sm ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}>
                                  ★
                                </span>
                              ))}
                            </div>
                          </div>
                          <p className="text-sm text-gray-600">{review.comment}</p>
                          <p className="text-xs text-gray-400 mt-1">
                            {new Date(review.createdAt).toLocaleDateString()}
                          </p>
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
              <Link href="/dashboard/availability" className="block">
                <Button className="w-full bg-[#0AB5F8] hover:bg-[#0891b2] text-white">
                  Manage Availability
                </Button>
              </Link>
              <Link href="/dashboard/profile" className="block">
                <Button variant="outline" className="w-full border-[#0AB5F8] text-[#0AB5F8] hover:bg-[#0AB5F8] hover:text-white">
                  Update Profile
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Teaching Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Teaching Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Hours</span>
                  <span className="font-medium text-[#0AB5F8]">
                    {Math.round(completedSessions.reduce((acc, b) => acc + b.duration, 0) / 60)}h
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Reviews</span>
                  <span className="font-medium text-[#0AB5F8]">
                    {reviews.length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Earnings</span>
                  <span className="font-medium text-[#0AB5F8]">
                    ৳{completedSessions.reduce((acc, b) => acc + b.totalAmount, 0).toLocaleString()}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}