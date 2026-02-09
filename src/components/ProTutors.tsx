'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { ErrorHandler } from '@/utils/errorHandler';

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

export function ProTutors() {
    const [tutors, setTutors] = useState<Tutor[]>([]);
    const [loading, setLoading] = useState(true);
    const [booking, setBooking] = useState<string | null>(null);

    useEffect(() => {
        fetchTutors();
    }, []);

    const fetchTutors = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tutors`);
            if (response.ok) {
                const data = await response.json();
                setTutors(data.tutors?.slice(0, 4) || []);
            }
        } catch (error) {
            console.error('Failed to fetch tutors:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleBooking = async (tutorId: string, slotId: string) => {
        setBooking(tutorId);
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
                ErrorHandler.success('Booking request sent successfully!');
            } else {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || 'Failed to create booking');
            }
        } catch (error) {
            ErrorHandler.handleApiError(error, 'Create booking');
        } finally {
            setBooking(null);
        }
    };


    const SkeletonCard = () => (
        <div className="flex flex-col relative overflow-hidden h-auto bg-white outline-none min-h-60 w-full rounded-2xl border-2 border-gray-200 p-3 shadow-lg md:min-h-56.25 animate-pulse">
            <div className="relative w-full flex-auto flex-col h-auto grid grid-cols-5 gap-5 p-0">
                <div className="col-span-2 flex w-full flex-col items-center justify-center gap-3 rounded-md">
                    <div className="size-24 md:size-32 bg-gray-200 rounded-full"></div>
                    <div className="flex w-full shrink-0 flex-col items-stretch gap-2 px-2.5 pb-2.5 md:flex-row">
                        <div className="flex-1 h-8 bg-gray-200 rounded-lg"></div>
                        <div className="h-8 w-20 bg-gray-200 rounded-lg"></div>
                    </div>
                </div>
                <div className="col-span-3 flex flex-col pb-2.5 pr-0.5 pt-4 md:pr-4">
                    <div className="mb-3 h-6 w-24 bg-gray-200 rounded-md"></div>
                    <div className="mb-2 h-6 w-32 bg-gray-200 rounded"></div>
                    <div className="mb-2 h-4 w-24 bg-gray-200 rounded"></div>
                    <div className="mb-3 h-4 w-28 bg-gray-200 rounded"></div>
                    <div className="flex gap-2 mb-2">
                        <div className="h-4 w-16 bg-gray-200 rounded"></div>
                        <div className="h-4 w-20 bg-gray-200 rounded"></div>
                    </div>
                    <div className="flex gap-2">
                        <div className="h-6 w-16 bg-gray-200 rounded-full"></div>
                        <div className="h-6 w-20 bg-gray-200 rounded-full"></div>
                        <div className="h-6 w-18 bg-gray-200 rounded-full"></div>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-10 flex items-center justify-between px-2">
                    <div>
                        <h2 className="font-mulish text-3xl font-bold text-gray-900 md:text-5xl/normal">
                            Our Pro Tutors
                        </h2>
                        <p className="font-mulish text-sm font-medium md:text-left md:text-base text-[#0AB5F8]">
                            These are some of our Elite&nbsp;Tutors!
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {loading ? (
                        Array.from({ length: 4 }).map((_, index) => (
                            <SkeletonCard key={index} />
                        ))
                    ) : (
                        tutors.map((tutor) => (
                            <div key={tutor.id} className="flex flex-col relative overflow-hidden h-auto bg-white outline-none transition-transform-background motion-reduce:transition-none min-h-60 w-full rounded-2xl border-2 border-[#0AB5F8] p-3 shadow-lg md:min-h-56.25">
                                <div className="relative w-full flex-auto flex-col h-auto grid grid-cols-5 gap-5 p-0">
                                    {/* Left Column - Image and Buttons */}
                                    <div className="col-span-2 flex w-full flex-col items-center justify-center gap-3 rounded-md">
                                        <div className="relative flex size-full flex-1 shrink-0 items-center justify-center overflow-hidden rounded-md">
                                            <div className="size-24 md:size-32 bg-[#0AB5F8]/10 rounded-full flex items-center justify-center ring-2 ring-[#0AB5F8]">
                                                {tutor.user.image ? (
                                                    <img
                                                        alt={tutor.user.name}
                                                        src={tutor.user.image}
                                                        className="pointer-events-none size-full select-none rounded-full object-cover opacity-100 transition-opacity duration-300"
                                                    />
                                                ) : (
                                                    <span className="text-[#0AB5F8] font-bold text-2xl md:text-4xl">
                                                        {tutor.user.name.charAt(0)}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex w-full shrink-0 flex-col items-stretch gap-2 px-2.5 pb-2.5 md:flex-row">
                                            <Link
                                                href={`/tutors/${tutor.id}`}
                                                className="flex-1 rounded-lg border-2 border-[#0AB5F8] bg-[#0AB5F8] py-1.5 font-semibold text-center transition-transform hover:scale-95 text-white"
                                            >
                                                View
                                            </Link>
                                            <button onClick={() => handleBooking(tutor.id, tutor.availabilitySlots[0]?.id || '')}
                                                disabled={booking === tutor.id}
                                                className="rounded-lg border-2 border-[#0AB5F8] bg-white font-semibold py-1.5 px-3 transition-transform hover:scale-95 flex items-center gap-1 text-[#0AB5F8] disabled:opacity-50">
                                                {booking === tutor.id ? 'Booking...' : 'Book'}
                                            </button>
                                        </div>
                                    </div>

                                    {/* Right Column - Details */}
                                    <div className="col-span-3 flex flex-col pb-2.5 pr-0.5 pt-4 md:pr-4">
                                        {/* Experience Badge and Category Icon */}
                                        <div className="mb-3 flex items-center gap-2 md:mb-2">
                                            <span className="w-fit p-1 text-xs font-medium pointer-events-none select-none whitespace-nowrap rounded-md bg-[#0AB5F8] px-3 text-white md:text-sm">
                                                {tutor.experience} Year{tutor.experience !== 1 ? 's' : ''} Experienced
                                            </span>
                                        </div>

                                        {/* Name and Badges */}
                                        <div className="mb-2 flex w-full flex-1 items-center gap-2">
                                            <h5 className="flex-1 truncate text-sm font-bold md:text-lg">{tutor.user.name}</h5>
                                            <div className="flex shrink-0 items-center justify-between gap-3">
                                                <div className="size-6 shrink-0 cursor-pointer">
                                                    <svg className="w-full h-full text-[#0AB5F8]" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                    </svg>
                                                </div>

                                                <div className="flex items-center gap-1 rounded-lg border bg-[#0AB5F8] px-3 py-0.5 text-sm text-white">
                                                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                    </svg>
                                                    <span className="font-semibold">Pro</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* University and Department */}
                                        <div className="flex flex-1 flex-col">
                                            <p className="line-clamp-1 text-sm font-medium">{tutor.category.name}</p>
                                            <p className="mb-3 mt-0.5 line-clamp-1 text-sm">
                                                <span className="font-semibold">Rating:</span> {tutor.rating > 0 ? `${tutor.rating.toFixed(1)} (${tutor.totalReviews} reviews)` : 'New Tutor'}
                                            </p>

                                            {/* Price and Location */}
                                            <div className="mb-2 flex flex-1 flex-col items-start justify-between gap-2 md:flex-row md:items-center md:gap-2">
                                                <div className="flex items-center gap-1">
                                                    <p className="text-xs font-medium sm:text-sm">
                                                        ৳ {tutor.hourlyRate.toLocaleString()}
                                                        <span className="text-gray-500 text-xs font-medium sm:text-sm">/Hour</span>
                                                    </p>
                                                    <div className="cursor-pointer text-[#0AB5F8]">
                                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 512 512">
                                                            <path d="M256 56C145.72 56 56 145.72 56 256s89.72 200 200 200 200-89.72 200-200S366.28 56 256 56zm0 82a26 26 0 11-26 26 26 26 0 0126-26zm64 226H200v-32h44v-88h-32v-32h64v120h44z" />
                                                        </svg>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${tutor.isAvailable ? 'text-green-600 bg-green-100' : 'text-red-600 bg-red-100'
                                                        }`}>
                                                        {tutor.isAvailable ? 'Available' : 'Busy'}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Subjects */}
                                            <div className="flex w-full cursor-grab items-center gap-2 overflow-x-auto pr-1">
                                                {tutor.subjects.slice(0, 4).map((subject, index) => (
                                                    <div key={index} className="select-none whitespace-nowrap rounded-full border px-3 py-1 text-sm font-normal leading-normal border-gray-400 bg-white text-gray-600">
                                                        {subject}
                                                    </div>
                                                ))}
                                                {tutor.subjects.length > 4 && (
                                                    <div className="select-none whitespace-nowrap rounded-full border px-3 py-1 text-sm font-normal leading-normal border-gray-400 bg-white text-gray-600">
                                                        +{tutor.subjects.length - 4}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </section>
    );
}