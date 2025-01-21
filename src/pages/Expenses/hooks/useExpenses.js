import { useState, useEffect } from 'react';
import { fetchData } from '../../../services/api';

export const useExpenses = (initialFilters = {}) => {
  const [expenses, setExpenses] = useState([]);
  const [financeCategories, setFinanceCategories] = useState([]);
  const [financeCategoryOptions, setFinanceCategoryOptions] = useState([]);
  const [statistics, setStatistics] = useState({
    count_expense: 0,
    total_amount: 0,
    totalExpensesThisMonth: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    dateRange: {
      startDate: new Date(new Date().setDate(1)), // First day of current month
      endDate: new Date()
    }
  });

  const fetchFinanceCategories = async () => {
    const response = await fetchData('/finance-categories');
    setFinanceCategories(response.data.data);
    setFinanceCategoryOptions(response.data.data.map(category => ({
        value: category.id,
        label: category.name
    })));
};

  const fetchExpenses = async (newFilters = filters) => {
    try {
      setIsLoading(true);
      setError(null);

      const params = new URLSearchParams({
        ...(newFilters?.search && { search: newFilters.search }),
        ...(newFilters?.dateRange?.startDate && {
          startDate: newFilters.dateRange.startDate.toISOString().split('T')[0]
        }),
        ...(newFilters?.dateRange?.endDate && {
          endDate: newFilters?.dateRange?.endDate?.toISOString().split('T')[0]
        })
      });

      const response = await fetchData(`/expenses?${params}`);
      
      if (response.data.success) {
        console.log(response.data.data);
        setExpenses(response.data.data.expenses);
        setStatistics(response.data.data.statistics);
      } else {
        throw new Error(response.data.message || 'Failed to fetch expenses');
      }
    } catch (err) {
      setError(err.message || 'An error occurred while fetching expenses');
      console.error('Error fetching expenses:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const updateFilters = (newFilters) => {
    setFilters(prev => ({
      ...prev,
      ...newFilters
    }));
    fetchExpenses(newFilters); // Reset to first page when filters change
  };

  const displayFinanceCategories = (id) => {
    const category = financeCategories.find(category => category.id === id);
    return category ? category.name : '-';
  };

  // Initial fetch
  useEffect(() => {
    fetchExpenses(filters);
    fetchFinanceCategories();
  }, []);



  return {
    expenses,
    statistics,
    isLoading,
    error,
    filters,
    updateFilters,
    financeCategories,
    financeCategoryOptions,
    displayFinanceCategories
  };
}; 