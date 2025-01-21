import React, { createContext } from 'react';
import { useExpenses } from '../hooks/useExpenses';

const ExpenseContext = createContext();

const ExpenseProvider = ({ children }) => {
  const { expenses, isLoading, statistics, filters, updateFilters, financeCategories, financeCategoryOptions, displayFinanceCategories } = useExpenses();

  const value = {
    expenses,
    statistics,
    isLoading,
    filters,
    updateFilters,
    financeCategories,
    financeCategoryOptions,
    displayFinanceCategories
  };

  return (
    <ExpenseContext.Provider value={value}>
      {children}
    </ExpenseContext.Provider>
  );
}; 

export { ExpenseContext, ExpenseProvider };

