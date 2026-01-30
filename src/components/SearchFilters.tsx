import { useState } from 'react';
import { FilterOptions, Category } from '@/types';

interface SearchFiltersProps {
  categories: Category[];
  onFiltersChange: (filters: FilterOptions) => void;
  loading?: boolean;
}

export function SearchFilters({ categories, onFiltersChange, loading }: SearchFiltersProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [minRating, setMinRating] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const handleFilterChange = (key: keyof FilterOptions, value: any) => {
    const filters: FilterOptions = {};
    if (searchTerm) filters.searchTerm = searchTerm;
    if (selectedCategory) filters.categories = [selectedCategory];
    if (minRating) filters.minRating = Number(minRating);
    if (maxPrice) filters.maxPrice = Number(maxPrice);
    
    filters[key] = value;
    onFiltersChange(filters);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setMinRating('');
    setMaxPrice('');
    onFiltersChange({});
  };

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 h-fit">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Filters</h3>
      
      <div className="space-y-4">
        {/* Search */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
          <input
            type="text"
            placeholder="Search tutors..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              handleFilterChange('searchTerm', e.target.value);
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0AB5F8] focus:border-transparent"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
          <select
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              handleFilterChange('categories', e.target.value ? [e.target.value] : undefined);
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0AB5F8] focus:border-transparent"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* Rating */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
          <select
            value={minRating}
            onChange={(e) => {
              setMinRating(e.target.value);
              handleFilterChange('minRating', e.target.value ? Number(e.target.value) : undefined);
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0AB5F8] focus:border-transparent"
          >
            <option value="">Any Rating</option>
            <option value="4">4+ Stars</option>
            <option value="3">3+ Stars</option>
          </select>
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Price</label>
          <select
            value={maxPrice}
            onChange={(e) => {
              setMaxPrice(e.target.value);
              handleFilterChange('maxPrice', e.target.value ? Number(e.target.value) : undefined);
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0AB5F8] focus:border-transparent"
          >
            <option value="">Any Price</option>
            <option value="25">Under $25</option>
            <option value="50">Under $50</option>
            <option value="100">Under $100</option>
          </select>
        </div>

        {/* Clear Button */}
        <button
          type="button"
          onClick={clearFilters}
          className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Clear All Filters
        </button>
      </div>
    </div>
  );
}