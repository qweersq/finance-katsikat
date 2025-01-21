import { useContext, useEffect, useState } from 'react';
import { TransactionContext } from '../contexts/TransactionContext';

// Card component untuk mengurangi duplikasi
const SummaryCard = ({ title, amount, icon, bgColor, textColor }) => (
  <div className="bg-white rounded-xl shadow-sm p-6">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-2xl font-bold text-gray-800">
          Rp {parseInt(amount).toLocaleString('id-ID')}
        </p>
      </div>
      <div className={`${bgColor} p-3 rounded-lg`}>
        <svg className={`w-6 h-6 ${textColor}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          {icon}
        </svg>
      </div>
    </div>
  </div>
);

const TransactionSummary = () => {
  const { summary:hooksSummary } = useContext(TransactionContext);
  const [summary, setSummary] = useState(hooksSummary);

  useEffect(() => {
    console.log("hooksSummary", hooksSummary);
    console.log("summary", summary);
    setSummary(hooksSummary);
  }, [hooksSummary]);


  // Data untuk setiap card
  const summaryCards = [
    {
      title: 'Total Income',
      amount: summary?.totalIncome,
      bgColor: 'bg-green-100',
      textColor: 'text-green-600',
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
    },
    {
      title: 'Total Expense',
      amount: summary?.totalExpense,
      bgColor: 'bg-red-100',
      textColor: 'text-red-600',
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 13l-5 5m0 0l-5-5m5 5V6" />
    },
    {
      title: 'Balance',
      amount: summary?.totalBalance,
      bgColor: 'bg-blue-100',
      textColor: 'text-blue-600',
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6h18M12 12h8m-8 6h8" />
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {summaryCards.map((card, index) => (
        <SummaryCard
          key={index}
          title={card.title}
          amount={card.amount}
          icon={card.icon}
          bgColor={card.bgColor}
          textColor={card.textColor}
        />
      ))}
    </div>
  );
};

export default TransactionSummary;
