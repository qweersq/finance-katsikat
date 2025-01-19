import { useState } from 'react';
import { useGeneral } from '../../hooks/useGeneral';
import DashboardHeader from './components/DashboardHeader';
import AccountBalances from './components/AccountBalances';
import FinancialTrends from './components/FinancialTrends';

const Dashboard = () => {
  const { loading } = useGeneral();
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  return (
    <div className="space-y-6">
      <AccountBalances />
      <FinancialTrends />
      {/* <DashboardHeader 
        selectedPeriod={selectedPeriod} 
        onPeriodChange={setSelectedPeriod} 
      /> */}
    </div>
  );
};

export default Dashboard; 