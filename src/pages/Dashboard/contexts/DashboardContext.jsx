
import React, { createContext } from 'react';
import { useDashboard } from '../hooks/useDashboard';

const DashboardContext = createContext();

const DashboardProvider = ({ children }) => {
  const { accounts, financeTrends, financeCategories, financeCategoryOptions, financeAccounts, financeAccountOptions, loadDashboard } = useDashboard();

  const value = {
    accounts,
    financeTrends,
    financeCategories,
    financeCategoryOptions,
    financeAccounts,
    financeAccountOptions,
    loadDashboard
  };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
}; 

export { DashboardContext, DashboardProvider };

