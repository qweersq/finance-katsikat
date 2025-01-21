import { useState } from 'react';
import { useGeneral } from '../../hooks/useGeneral';
import DashboardHeader from './components/DashboardHeader';
import AccountBalances from './components/AccountBalances';
import FinancialTrends from './components/FinancialTrends';
import { DashboardProvider } from './contexts/DashboardContext';

const Dashboard = () => {

  return (
    <DashboardProvider>
      <div className="space-y-6">
        <AccountBalances />
        <FinancialTrends />
        {/* <DashboardHeader 
        selectedPeriod={selectedPeriod} 
        onPeriodChange={setSelectedPeriod} 
      /> */}
    </div>
    </DashboardProvider>
  );
};

export default Dashboard; 