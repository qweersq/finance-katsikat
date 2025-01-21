import { useContext, useEffect, useState } from 'react';
import { ExpenseContext } from '../contexts/ExpenseContext';

const ExpenseSummary = () => {
  const { statistics: hookStatistics } = useContext(ExpenseContext);

  const [statistics, setStatistics] = useState(hookStatistics);

  useEffect(() => {
    console.log("hookStatistics", hookStatistics);
    setStatistics(hookStatistics);
  }, [hookStatistics]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Total Expenses</p>
            <p className="text-2xl font-bold text-gray-800">
              Rp {parseFloat(statistics?.total_amount).toLocaleString('id-ID')}
            </p>
          </div>
          <div className="bg-red-100 p-3 rounded-lg">
            <svg className="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 13l-5 5m0 0l-5-5m5 5V6" />
            </svg>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">This Month</p>
            <p className="text-2xl font-bold text-gray-800">
              Rp {parseFloat(statistics?.totalExpensesThisMonth).toLocaleString('id-ID')}
            </p>
          </div>
          <div className="bg-blue-100 p-3 rounded-lg">
            <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseSummary; 