// Core Types for SkillBridge Platform

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: UserRole;
  status: UserStatus;
  createdAt: string;
  updatedAt: string;
}

export type UserRole = 'student' | 'tutor' | 'admin';
export type UserStatus = 'active' | 'banned' | 'pending';

export interface Student extends User {
  role: 'student';
  bookings: Booking[];
  reviews: Review[];
}

export interface Tutor extends User {
  role: 'tutor';
  profile: TutorProfile;
  availability: AvailabilitySlot[];
  sessions: Session[];
  rating: number;
  totalReviews: number;
}

export interface TutorProfile {
  id: string;
  bio: string;
  experience: number;
  education: string;
  subjects: Subject[];
  hourlyRate: number;
  languages: string[];
  certifications?: string[];
}

export interface Subject {
  id: string;
  name: string;
  category: Category;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  icon?: string;
}

export interface AvailabilitySlot {
  id: string;
  tutorId: string;
  dayOfWeek: number; // 0-6 (Sunday-Saturday)
  startTime: string; // HH:mm format
  endTime: string;
  isAvailable: boolean;
}

export interface Booking {
  id: string;
  studentId: string;
  tutorId: string;
  sessionId?: string;
  subject: Subject;
  scheduledAt: string;
  duration: number; // in minutes
  status: BookingStatus;
  totalAmount: number;
  createdAt: string;
}

export type BookingStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';

export interface Session {
  id: string;
  bookingId: string;
  startTime: string;
  endTime: string;
  status: SessionStatus;
  notes?: string;
}

export type SessionStatus = 'scheduled' | 'ongoing' | 'completed' | 'cancelled';

export interface Review {
  id: string;
  studentId: string;
  tutorId: string;
  sessionId: string;
  rating: number; // 1-5
  comment?: string;
  createdAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface FilterOptions {
  searchTerm?: string;
  subjects?: string[];
  categories?: string[];
  minRating?: number;
  maxPrice?: number;
  minPrice?: number;
  availability?: string;
  sortBy?: 'rating' | 'price' | 'experience';
  sortOrder?: 'asc' | 'desc';
  limit?: number;
  page?: number;
}