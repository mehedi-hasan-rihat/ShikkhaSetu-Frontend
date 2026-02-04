'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { ErrorHandler } from '@/utils/errorHandler';

interface TutorProfile {
  id: string;
  bio: string;
  hourlyRate: number;
  experience: number;
  subjects: string[];
  rating: number;
  totalReviews: number;
  isAvailable: boolean;
  category: {
    id: string;
    name: string;
    description: string;
  };
  user: {
    name: string;
    email: string;
    image: string | null;
  };
  availabilitySlots: {
    id: string;
    dayOfWeek: number;
    startTime: string;
    endTime: string;
    isAvailable: boolean;
  }[];
}

const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export default function TutorDetailsPage() {
  const params = useParams();
  const [tutor, setTutor] = useState<TutorProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [booking, setBooking] = useState(false);

  const handleSlotBooking = async (slotId: string) => {
    setBooking(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookings`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tutorId: tutor?.id,
          slotId: slotId,
          scheduledAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
          duration: 60,
          totalAmount: tutor?.hourlyRate || 0
        })
      });
      if (response.ok) {
        ErrorHandler.success('Booking request sent successfully!');
      } else {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to create booking');
      }
    } catch (error) {
      ErrorHandler.handleApiError(error, 'Create booking');
    } finally {
      setBooking(false);
    }
  };

  useEffect(() => {
    if (params.id) {
      fetchTutorDetails(params.id as string);
    }
  }, [params.id]);

  const fetchTutorDetails = async (id: string) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tutors/${id}`);
      if (response.ok) {
        const data = await response.json();
        setTutor(data);
      } else {
        setError('Tutor not found');
      }
    } catch (error) {
      console.error('Failed to fetch tutor details:', error);
      setError('Failed to load tutor details');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            {/* Header Skeleton */}
            <div className="bg-white rounded-2xl border-2 border-gray-200 p-6 mb-8 shadow-lg">
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto lg:mx-0"></div>
                <div className="flex-1 space-y-4">
                  <div className="h-8 bg-gray-200 rounded w-1/3"></div>
                  <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                  <div className="flex gap-4">
                    <div className="h-6 w-24 bg-gray-200 rounded-full"></div>
                    <div className="h-6 w-20 bg-gray-200 rounded-full"></div>
                  </div>
                  <div className="h-5 bg-gray-200 rounded w-2/3"></div>
                  <div className="h-10 w-32 bg-gray-200 rounded"></div>
                </div>
                <div className="text-center lg:text-right">
                  <div className="h-10 w-24 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 w-16 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column Skeleton */}
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
                  <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
                  <div className="space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                    <div className="h-4 bg-gray-200 rounded w-4/5"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  </div>
                </div>
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
                  <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
                  <div className="flex flex-wrap gap-2">
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className="h-8 w-24 bg-gray-200 rounded-full"></div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column Skeleton */}
              <div className="space-y-6">
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
                  <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
                  <div className="space-y-4">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="flex justify-between">
                        <div className="h-4 w-20 bg-gray-200 rounded"></div>
                        <div className="h-4 w-16 bg-gray-200 rounded"></div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
                  <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
                  <div className="space-y-3">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <div className="h-4 w-20 bg-gray-200 rounded"></div>
                        <div className="h-4 w-24 bg-gray-200 rounded"></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !tutor) {
    return (
      <div className="min-h-screen bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Tutor Not Found</h1>
            <p className="text-gray-600 mb-6">{error}</p>
            <Button onClick={() => window.history.back()}>Go Back</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="bg-white rounded-2xl border-2 border-[#0AB5F8] p-6 mb-8 shadow-lg">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Avatar */}
            <div className="shrink-0 mx-auto lg:mx-0">
              <div className="w-32 h-32 bg-[#0AB5F8]/10 rounded-full flex items-center justify-center ring-2 ring-[#0AB5F8]">
                {tutor.user.image ? (
                  <img
                    src={tutor.user.image}
                    alt={tutor.user.name}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <span className="text-[#0AB5F8] font-bold text-4xl">
                    {tutor.user.name.charAt(0)}
                  </span>
                )}
              </div>
            </div>

            {/* Basic Info */}
            <div className="flex-1 text-center lg:text-left">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{tutor.user.name}</h1>
                  <p className="text-lg text-[#0AB5F8] font-medium mb-2">{tutor.category.name}</p>
                  <div className="flex items-center justify-center lg:justify-start gap-4 mb-4">
                    <span className="bg-[#0AB5F8] text-white px-3 py-1 rounded-full text-sm font-medium">
                      {tutor.experience} Year{tutor.experience !== 1 ? 's' : ''} Experience
                    </span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      tutor.isAvailable ? 'text-green-600 bg-green-100' : 'text-red-600 bg-red-100'
                    }`}>
                      {tutor.isAvailable ? 'Available' : 'Busy'}
                    </span>
                  </div>
                </div>
                
                <div className="text-center lg:text-right">
                  <div className="text-3xl font-bold text-[#0AB5F8] mb-1">
                    ৳{tutor.hourlyRate.toLocaleString()}
                  </div>
                  <div className="text-gray-600 text-sm">per hour</div>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center justify-center lg:justify-start gap-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${i < Math.floor(tutor.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-gray-600">
                  {tutor.rating.toFixed(1)} ({tutor.totalReviews} reviews)
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                {tutor.availabilitySlots.length > 0 ? (
                  tutor.availabilitySlots.map((slot) => (
                    <Button 
                      key={slot.id} 
                      onClick={() => handleSlotBooking(slot.id)}
                      disabled={booking}
                      className="bg-[#0AB5F8] hover:bg-[#0891b2] text-white px-4 py-2 text-sm font-semibold"
                    >
                      {booking ? 'Booking...' : `Book ${dayNames[slot.dayOfWeek]} ${slot.startTime}-${slot.endTime}`}
                    </Button>
                  ))
                ) : (
                  <Button className="bg-gray-400 text-white px-6 py-3 text-lg font-semibold cursor-not-allowed" disabled>
                    No Available Slots
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* About Section */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About {tutor.user.name}</h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {tutor.bio}
              </p>
            </div>

            {/* Subjects */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Subjects Taught</h2>
              <div className="flex flex-wrap gap-2">
                {tutor.subjects.map((subject, index) => (
                  <span
                    key={index}
                    className="px-3 py-2 bg-[#0AB5F8]/10 text-[#0AB5F8] rounded-full text-sm font-medium border border-[#0AB5F8]/20"
                  >
                    {subject}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Stats</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Experience</span>
                  <span className="font-medium text-[#0AB5F8]">{tutor.experience} years</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Reviews</span>
                  <span className="font-medium text-[#0AB5F8]">{tutor.totalReviews}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Rating</span>
                  <span className="font-medium text-[#0AB5F8]">{tutor.rating.toFixed(1)}/5.0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Subjects</span>
                  <span className="font-medium text-[#0AB5F8]">{tutor.subjects.length}</span>
                </div>
              </div>
            </div>

            {/* Availability */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Availability</h3>
              {tutor.availabilitySlots.length > 0 ? (
                <div className="space-y-3">
                  {tutor.availabilitySlots.map((slot) => (
                    <div key={slot.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium text-gray-900">
                        {dayNames[slot.dayOfWeek]}
                      </span>
                      <span className="text-gray-600">
                        {slot.startTime} - {slot.endTime}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-4">
                  No availability slots set
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}