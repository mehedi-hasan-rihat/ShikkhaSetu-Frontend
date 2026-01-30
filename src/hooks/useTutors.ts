import { useState, useEffect } from 'react';
import { Tutor, FilterOptions, PaginatedResponse } from '@/types';
import { apiService } from '@/services/api';

export function useTutors(initialFilters?: FilterOptions) {
  const [tutors, setTutors] = useState<Tutor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 12,
    total: 0,
    totalPages: 0,
  });

  const fetchTutors = async (filters?: FilterOptions, page = 1) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await apiService.getTutors({ ...filters, page, limit: pagination.limit });
      
      if (response.success && response.data) {
        setTutors(response.data.data);
        setPagination(response.data.pagination);
      } else {
        setError(response.error || 'Failed to fetch tutors');
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTutors(initialFilters);
  }, []);

  const refetch = (filters?: FilterOptions, page?: number) => {
    fetchTutors(filters, page);
  };

  return {
    tutors,
    loading,
    error,
    pagination,
    refetch,
  };
}