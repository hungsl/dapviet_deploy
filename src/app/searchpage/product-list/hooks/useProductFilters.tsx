'use client'
import { useState, useCallback } from 'react';
import { FilterState } from '../../types';
import { INITIAL_FILTER_STATE } from '../constants';

export const useProductFilters = () => {
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTER_STATE);

  const toggleCategory = useCallback((category: string) => {
    setFilters(prev => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category]
    }));
  }, []);

  const toggleSortOrder = useCallback((sort: "asc" | "desc") => {
    setFilters((prev) => ({
      ...prev,
      sortOrder: sort,
    }));
  }, []);

  const toggleSize = useCallback((size: string) => {
    setFilters(prev => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter(s => s !== size)
        : [...prev.sizes, size]
    }));
  }, []);

  // const togglePriceRange = useCallback((range: string) => {
  //   setFilters(prev => ({
  //     ...prev,
  //     priceRanges: prev.priceRanges.includes(range)
  //       ? prev.priceRanges.filter(r => r !== range)
  //       : [...prev.priceRanges, range]
  //   }));
  // }, []);

  // const updatePriceRange = useCallback((minPrice: string, maxPrice: string) => {
  //   setFilters(prev => ({
  //     ...prev,
  //     minPrice,
  //     maxPrice
  //   }));
  // }, []);
  const updatePriceRange = useCallback((minPrice: string, maxPrice: string) => {
    setFilters(prev => ({
      ...prev,
      minPrice,
      maxPrice: maxPrice === 'Infinity' ? 'Infinity' : maxPrice
    }));
  }, []);
  

  const updateSearch = useCallback((query: string) => {
    setFilters(prev => ({
      ...prev,
      searchQuery: query
    }));
  }, []);

  const updateSort = useCallback((order: 'asc' | 'desc') => {
    setFilters(prev => ({
      ...prev,
      sortOrder: order
    }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(INITIAL_FILTER_STATE);
  }, []);

  return {
    filters,
    toggleCategory,
    toggleSize,
    toggleSortOrder,
    updatePriceRange,
    updateSearch,
    updateSort,
    resetFilters
  };
};