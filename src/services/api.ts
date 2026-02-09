import { ApiResponse, PaginatedResponse, Tutor, FilterOptions } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

class ApiService {
  async getTutors(filters?: FilterOptions): Promise<ApiResponse<PaginatedResponse<Tutor>>> {
    const response = await fetch(`${API_URL}/tutors`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    return response.json();
  }
}

export const apiService = new ApiService();
