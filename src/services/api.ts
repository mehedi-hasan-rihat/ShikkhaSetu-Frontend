import { ApiResponse, PaginatedResponse, Tutor, FilterOptions } from '@/types';
import { fetchWithAuth } from '@/utils/fetchWithAuth';

class ApiService {
  async getTutors(filters?: FilterOptions): Promise<ApiResponse<PaginatedResponse<Tutor>>> {
    const response = await fetchWithAuth('/tutors');
    const data = await response.json();
    
    if (!data.tutors || !Array.isArray(data.tutors)) {
      return { success: false, error: 'Invalid response format', data: { data: [], pagination: { page: 1, limit: 12, total: 0, totalPages: 0 } } };
    }
    
    return { success: true, data: { data: data.tutors, pagination: data.pagination } };
  }
}

export const apiService = new ApiService();
