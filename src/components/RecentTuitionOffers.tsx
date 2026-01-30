'use client';

import { useState } from 'react';

interface TuitionOffer {
  id: string;
  class: string;
  description: string;
  postedDays: number;
  location: string;
  subjects: string[];
  tutorGender: string;
  daysPerWeek: number;
  medium: string[];
  salary: number;
}

const mockOffers: TuitionOffer[] = [
  {
    id: '1',
    class: 'Class 8',
    description: 'Need a Male tutor for Arabic Medium, English Medium, Bangla Medium, English Version, Dakshinkhan, Dhaka',
    postedDays: 4,
    location: 'Dakshinkhan, Dhaka',
    subjects: ['Arabic', 'Math', 'English'],
    tutorGender: 'Male',
    daysPerWeek: 6,
    medium: ['Arabic Medium', 'English Medium', 'Bangla Medium', 'English Version'],
    salary: 3500
  },
  {
    id: '2',
    class: 'Class 11-12',
    description: 'Need a Male tutor for Bangla Medium, Azimpur, Dhaka',
    postedDays: 4,
    location: 'Azimpur, Dhaka',
    subjects: ['Chemistry', 'Physics', 'Higher Math'],
    tutorGender: 'Male',
    daysPerWeek: 3,
    medium: ['Bangla Medium'],
    salary: 6000
  },
  {
    id: '3',
    class: 'Class 9-10',
    description: 'Need a Male tutor for English Version, Uttara, Dhaka',
    postedDays: 6,
    location: 'Uttara, Dhaka',
    subjects: ['Biology', 'Chemistry', 'Higher Math', 'Physics', 'Math'],
    tutorGender: 'Male',
    daysPerWeek: 4,
    medium: ['English Version'],
    salary: 10000
  },
  {
    id: '4',
    class: 'Class 8',
    description: 'Need a Female tutor for Bangla Medium, Mohammadpur, Dhaka',
    postedDays: 7,
    location: 'Mohammadpur, Dhaka',
    subjects: ['General Science', 'Math', 'English'],
    tutorGender: 'Female',
    daysPerWeek: 4,
    medium: ['Bangla Medium'],
    salary: 5000
  }
];

const districts = [
  'Bagerhat', 'Bandarban', 'Barguna', 'Barishal', 'Bhola', 'Bogura',
  'Brahmanbaria', 'Chandpur', 'Chapai nawabganj', 'Chattogram'
];

export function RecentTuitionOffers() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % mockOffers.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + mockOffers.length) % mockOffers.length);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Recent Tuition Offer</h2>
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
            <span className="text-gray-700">See All</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </button>
        </div>

        {/* Districts Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {districts.map((district) => (
            <button
              key={district}
              className="px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-200 transition-colors text-sm"
            >
              {district}
            </button>
          ))}
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm">
            + More
          </button>
        </div>

        {/* Carousel */}
        <div className="relative">
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow-lg hover:bg-gray-50"
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/>
            </svg>
          </button>

          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {mockOffers.map((offer) => (
                <div key={offer.id} className="w-full flex-shrink-0 px-2">
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    {/* Header */}
                    <div className="mb-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        Class: {offer.class}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {offer.description}
                      </p>
                    </div>

                    {/* Details Grid */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                          </svg>
                          <span className="text-sm text-gray-600">Posted: {offer.postedDays} days ago</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                          </svg>
                          <span className="text-sm text-gray-600 truncate">{offer.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                          </svg>
                          <span className="text-sm text-gray-600 truncate">{offer.subjects.join(', ')}</span>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                          </svg>
                          <span className="text-sm text-gray-600">Tutor Gender: {offer.tutorGender}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                          </svg>
                          <span className="text-sm text-gray-600">{offer.daysPerWeek} Days (Week)</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                          </svg>
                          <span className="text-sm text-gray-600 truncate">Medium: {offer.medium.join(', ')}</span>
                        </div>
                      </div>
                    </div>

                    <hr className="border-gray-200 mb-4" />

                    {/* Footer */}
                    <div className="flex items-center justify-between">
                      <div className="text-xl font-bold text-blue-600">
                        {offer.salary} tk/mo
                      </div>
                      <div className="flex gap-2">
                        <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                          View Details
                        </button>
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                          Apply
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow-lg hover:bg-gray-50"
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}