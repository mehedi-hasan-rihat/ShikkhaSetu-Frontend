import { ApiResponse, PaginatedResponse, Tutor, Student, Booking, Review, Category, FilterOptions } from '@/types';

// Mock data
const mockCategories: Category[] = [
  { id: '1', name: 'Mathematics', icon: '🔢' },
  { id: '2', name: 'Science', icon: '🔬' },
  { id: '3', name: 'English', icon: '📚' },
  { id: '4', name: 'Programming', icon: '💻' },
  { id: '5', name: 'Languages', icon: '🌍' },
  { id: '6', name: 'Music', icon: '🎵' },
];

const mockTutors: Tutor[] = [
  {
    id: '1',
    email: 'john@example.com',
    name: 'John Smith',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    role: 'tutor',
    status: 'active',
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
    profile: {
      id: '1',
      bio: 'Experienced math tutor with 8+ years of teaching experience.',
      experience: 8,
      education: 'PhD in Mathematics',
      subjects: [{ id: '1', name: 'Calculus', category: mockCategories[0] }],
      hourlyRate: 50,
      languages: ['English', 'Spanish'],
    },
    availability: [],
    sessions: [],
    rating: 4.9,
    totalReviews: 127,
  },
  {
    id: '2',
    email: 'sarah@example.com',
    name: 'Sarah Johnson',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    role: 'tutor',
    status: 'active',
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
    profile: {
      id: '2',
      bio: 'Professional software developer and coding instructor.',
      experience: 5,
      education: 'MS Computer Science',
      subjects: [{ id: '2', name: 'JavaScript', category: mockCategories[3] }],
      hourlyRate: 60,
      languages: ['English'],
    },
    availability: [],
    sessions: [],
    rating: 4.8,
    totalReviews: 89,
  },
  {
    id: '3',
    email: 'mike@example.com',
    name: 'Mike Chen',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    role: 'tutor',
    status: 'active',
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
    profile: {
      id: '3',
      bio: 'Physics PhD with passion for making science accessible.',
      experience: 6,
      education: 'PhD in Physics',
      subjects: [{ id: '3', name: 'Physics', category: mockCategories[1] }],
      hourlyRate: 45,
      languages: ['English', 'Mandarin'],
    },
    availability: [],
    sessions: [],
    rating: 4.7,
    totalReviews: 156,
  },
  {
    id: '4',
    email: 'emma@example.com',
    name: 'Emma Wilson',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    role: 'tutor',
    status: 'active',
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
    profile: {
      id: '4',
      bio: 'English literature expert and creative writing coach.',
      experience: 7,
      education: 'MA English Literature',
      subjects: [{ id: '4', name: 'English Literature', category: mockCategories[2] }],
      hourlyRate: 40,
      languages: ['English', 'French'],
    },
    availability: [],
    sessions: [],
    rating: 4.9,
    totalReviews: 203,
  },
  {
    id: '5',
    email: 'carlos@example.com',
    name: 'Carlos Rodriguez',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    role: 'tutor',
    status: 'active',
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
    profile: {
      id: '5',
      bio: 'Native Spanish speaker and certified language instructor.',
      experience: 4,
      education: 'BA Spanish Literature',
      subjects: [{ id: '5', name: 'Spanish', category: mockCategories[4] }],
      hourlyRate: 35,
      languages: ['Spanish', 'English'],
    },
    availability: [],
    sessions: [],
    rating: 4.6,
    totalReviews: 78,
  },
  {
    id: '6',
    email: 'lisa@example.com',
    name: 'Lisa Park',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
    role: 'tutor',
    status: 'active',
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01',
    profile: {
      id: '6',
      bio: 'Professional pianist and music theory instructor.',
      experience: 10,
      education: 'MM Piano Performance',
      subjects: [{ id: '6', name: 'Piano', category: mockCategories[5] }],
      hourlyRate: 55,
      languages: ['English', 'Korean'],
    },
    availability: [],
    sessions: [],
    rating: 4.8,
    totalReviews: 134,
  },
];

class ApiService {
  private delay(ms: number = 500) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Auth endpoints
  async login(email: string, password: string): Promise<ApiResponse<any>> {
    await this.delay();
    return {
      success: true,
      data: { token: 'mock-jwt-token', user: { id: '1', email, role: 'student' } },
    };
  }

  async register(userData: { name: string; email: string; password: string; role: string }): Promise<ApiResponse<any>> {
    await this.delay();
    return {
      success: true,
      data: { token: 'mock-jwt-token', user: { id: '1', ...userData } },
    };
  }

  // Tutor endpoints
  async getTutors(filters?: FilterOptions): Promise<ApiResponse<PaginatedResponse<Tutor>>> {
    await this.delay();
    let filteredTutors = [...mockTutors];
    
    if (filters?.sortBy === 'rating') {
      filteredTutors.sort((a, b) => b.rating - a.rating);
    }
    
    const limit = filters?.limit || filteredTutors.length;
    const data = filteredTutors.slice(0, limit);
    
    return {
      success: true,
      data: {
        data,
        pagination: {
          page: 1,
          limit,
          total: mockTutors.length,
          totalPages: Math.ceil(mockTutors.length / limit),
        },
      },
    };
  }

  async getTutorById(id: string): Promise<ApiResponse<Tutor>> {
    await this.delay();
    const tutor = mockTutors.find(t => t.id === id);
    return {
      success: !!tutor,
      data: tutor,
      error: tutor ? undefined : 'Tutor not found',
    };
  }

  async updateTutorProfile(id: string, profileData: Partial<Tutor>): Promise<ApiResponse<any>> {
    await this.delay();
    return { success: true, data: { message: 'Profile updated successfully' } };
  }

  // Booking endpoints
  async createBooking(bookingData: Omit<Booking, 'id' | 'createdAt'>): Promise<ApiResponse<any>> {
    await this.delay();
    return { success: true, data: { id: 'booking-1', ...bookingData, createdAt: new Date().toISOString() } };
  }

  async getBookings(userId: string): Promise<ApiResponse<Booking[]>> {
    await this.delay();
    return { success: true, data: [] };
  }

  async updateBookingStatus(bookingId: string, status: string): Promise<ApiResponse<any>> {
    await this.delay();
    return { success: true, data: { message: 'Booking status updated' } };
  }

  // Review endpoints
  async createReview(reviewData: Omit<Review, 'id' | 'createdAt'>): Promise<ApiResponse<any>> {
    await this.delay();
    return { success: true, data: { id: 'review-1', ...reviewData, createdAt: new Date().toISOString() } };
  }

  async getTutorReviews(tutorId: string): Promise<ApiResponse<Review[]>> {
    await this.delay();
    return { success: true, data: [] };
  }

  // Category endpoints
  async getCategories(): Promise<ApiResponse<Category[]>> {
    await this.delay();
    return { success: true, data: mockCategories };
  }

  // Admin endpoints
  async getAllUsers(): Promise<ApiResponse<(Student | Tutor)[]>> {
    await this.delay();
    return { success: true, data: mockTutors };
  }

  async updateUserStatus(userId: string, status: string): Promise<ApiResponse<any>> {
    await this.delay();
    return { success: true, data: { message: 'User status updated' } };
  }
}

export const apiService = new ApiService();