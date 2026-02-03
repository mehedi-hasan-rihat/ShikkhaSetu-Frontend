'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

interface Tutor {
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
  };
  user: {
    name: string;
    email: string;
    image: string | null;
  };
  availabilitySlots: {
    id: string;
    tutorId: string;
    dayOfWeek: number;
    startTime: string;
    endTime: string;
    isAvailable: boolean;
  }[];
}

interface Category {
  id: string;
  name: string;
}

export default function TutorsPage() {
  const [tutors, setTutors] = useState<Tutor[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [booking, setBooking] = useState(false);

  const handleBooking = async (tutorId: string, slotId: string) => {
    setBooking(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookings`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tutorId,
          slotId,
          scheduledAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
          duration: 60,
          totalAmount: tutors.find(t => t.id === tutorId)?.hourlyRate || 0
        })
      });
      if (response.ok) {
        alert('Booking request sent successfully!');
      } else {
        alert('Failed to create booking');
      }
    } catch (error) {
      console.error('Booking failed:', error);
      alert('Booking failed');
    } finally {
      setBooking(false);
    }
  };

  useEffect(() => {
    fetchTutors();
    fetchCategories();
  }, []);

  const fetchTutors = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tutors`);
      if (response.ok) {
        const data = await response.json();
        setTutors(data);
      }
    } catch (error) {
      console.error('Failed to fetch tutors:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/categories`);
      if (response.ok) {
        const data = await response.json();
        setCategories(data);
      }
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  };

  const filteredTutors = tutors.filter(tutor => {
    const matchesCategory = !selectedCategory || tutor.category.id === selectedCategory;
    const matchesSearch = !searchTerm || 
      tutor.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tutor.subjects.some(subject => subject.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const SkeletonCard = () => (
    <div className="bg-white rounded-2xl border-2 border-gray-200 p-4 pt-20 shadow-lg animate-pulse">
      <div className="grid grid-cols-5 gap-4">
        <div className="col-span-2 flex flex-col items-center gap-3">
          <div className="w-24 h-24 bg-gray-200 rounded-full"></div>
          <div className="flex gap-2 w-full">
            <div className="flex-1 h-8 bg-gray-200 rounded"></div>
            <div className="w-16 h-8 bg-gray-200 rounded"></div>
          </div>
        </div>
        <div className="col-span-3 space-y-3">
          <div className="h-6 bg-gray-200 rounded w-24"></div>
          <div className="h-6 bg-gray-200 rounded w-32"></div>
          <div className="h-4 bg-gray-200 rounded w-28"></div>
          <div className="flex gap-2">
            <div className="h-6 w-16 bg-gray-200 rounded-full"></div>
            <div className="h-6 w-20 bg-gray-200 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Find Your Perfect Tutor</h1>
          <p className="text-lg text-gray-600">Browse through our expert tutors and find the perfect match for your learning needs</p>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <div className="relative">
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search by name or subject..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0AB5F8] focus:border-[#0AB5F8] transition-colors text-gray-900 placeholder-gray-500"
                />
              </div>
            </div>
            <div className="md:w-72">
              <div className="relative">
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0AB5F8] focus:border-[#0AB5F8] transition-colors text-gray-900 appearance-none bg-white"
                >
                  <option value="">All Categories</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            {loading ? 'Loading...' : `${filteredTutors.length} tutor${filteredTutors.length !== 1 ? 's' : ''} found`}
          </p>
        </div>

        {/* Tutors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {loading ? (
            Array.from({ length: 6 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))
          ) : filteredTutors.length > 0 ? (
            filteredTutors.map((tutor) => (
              <div key={tutor.id} className="bg-white rounded-2xl border-2 border-[#0AB5F8] p-4 shadow-lg hover:shadow-xl transition-shadow">
                <div className="grid grid-cols-5 gap-4">
                  {/* Left Column - Avatar and Buttons */}
                  <div className="col-span-2 flex flex-col items-center gap-3">
                    <div className="w-24 h-24 bg-[#0AB5F8]/10 rounded-full flex items-center justify-center ring-2 ring-[#0AB5F8]">
                      {tutor.user.image ? (
                        <img
                          src={tutor.user.image}
                          alt={tutor.user.name}
                          className="w-full h-full rounded-full object-cover"
                        />
                      ) : (
                        <span className="text-[#0AB5F8] font-bold text-2xl">
                          {tutor.user.name.charAt(0)}
                        </span>
                      )}
                    </div>
                    <div className="flex gap-2 w-full">
                      <Link
                        href={`/tutors/${tutor.id}`}
                        className="flex-1 bg-[#0AB5F8] hover:bg-[#0891b2] text-white text-center py-2 px-3 rounded-lg text-sm font-semibold transition-colors"
                      >
                        View
                      </Link>
                      <Button 
                        onClick={() => handleBooking(tutor.id, tutor.availabilitySlots[0]?.id || '')}
                        disabled={booking || !tutor.availabilitySlots.length}
                        className="bg-white border-2 border-[#0AB5F8] text-[#0AB5F8] hover:bg-[#0AB5F8] hover:text-white px-3 py-2 text-sm"
                      >
                        {booking ? 'Booking...' : 'Book'}
                      </Button>
                    </div>
                  </div>

                  {/* Right Column - Details */}
                  <div className="col-span-3 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="bg-[#0AB5F8] text-white px-2 py-1 rounded-full text-xs font-medium">
                        {tutor.experience} Years
                      </span>
                      <div className="flex items-center gap-1">
                        <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="text-sm text-gray-600">{tutor.rating.toFixed(1)}</span>
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-gray-900">{tutor.user.name}</h3>
                    <p className="text-sm text-[#0AB5F8] font-medium">{tutor.category.name}</p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-[#0AB5F8]">
                        ৳{tutor.hourlyRate.toLocaleString()}/hr
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        tutor.isAvailable ? 'text-green-600 bg-green-100' : 'text-red-600 bg-red-100'
                      }`}>
                        {tutor.isAvailable ? 'Available' : 'Busy'}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {tutor.subjects.slice(0, 3).map((subject, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs"
                        >
                          {subject}
                        </span>
                      ))}
                      {tutor.subjects.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                          +{tutor.subjects.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No tutors found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}