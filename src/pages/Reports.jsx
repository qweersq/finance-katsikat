import { useState } from 'react';
import { transactionsData } from './Dashboard/data/transactionsData';

// Helper to get month options from transactions
const getMonthOptions = (transactions) => {
  const months = transactions.map(t => t.date.slice(0, 7)); // 'YYYY-MM'
  const uniqueMonths = Array.from(new Set(months));
  uniqueMonths.sort((a, b) => b.localeCompare(a)); // Descending
  return uniqueMonths;
};

// Helper to filter transactions by month
const filterByMonth = (transactions, month) => {
  return transactions.filter(t => t.date.startsWith(month));
};

// Group by category and type
const groupByCategory = (transactions, type) => {
  const filtered = transactions.filter(t => t.type === type);
  const grouped = {};
  filtered.forEach(t => {
    if (!grouped[t.category]) grouped[t.category] = 0;
    grouped[t.category] += parseInt(t.amount.replace(/[^\d]/g, ''));
  });
  return grouped;
};

// Sum total by type
const getTotalByType = (transactions, type) => {
  return transactions
    .filter(t => t.type === type)
    .reduce((sum, t) => sum + parseInt(t.amount.replace(/[^\d]/g, '')), 0);
};

const formatRupiah = (num) =>
  'Rp ' + num.toLocaleString('id-ID');

const Reports = () => {
  const monthOptions = getMonthOptions(transactionsData);
  const [selectedMonth, setSelectedMonth] = useState(monthOptions[0] || '');
  const filteredTransactions = filterByMonth(transactionsData, selectedMonth);

  // Group and sum
  const incomeByCategory = groupByCategory(filteredTransactions, 'Income');
  const expenseByCategory = groupByCategory(filteredTransactions, 'Expense');
  const totalIncome = getTotalByType(filteredTransactions, 'Income');
  const totalExpense = getTotalByType(filteredTransactions, 'Expense');
  const netProfit = totalIncome - totalExpense;

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-2">
        <h1 className="text-2xl font-bold">Laporan Laba Rugi</h1>
        <div className="flex items-center gap-2">
          <label htmlFor="month" className="font-medium">Periode:</label>
          <select
            id="month"
            value={selectedMonth}
            onChange={e => setSelectedMonth(e.target.value)}
            className="border rounded px-3 py-2"
          >
            {monthOptions.map(month => (
              <option key={month} value={month}>
                {new Date(month + '-01').toLocaleString('default', { month: 'long', year: 'numeric' })}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Income Section */}
      <div className="bg-white rounded-xl shadow p-6 border">
        <div className="mb-2 flex items-center gap-2">
          <span className="text-lg font-semibold text-green-700">Pendapatan (Kredit)</span>
        </div>
        <div className="text-2xl font-bold text-green-700 mb-2">{formatRupiah(totalIncome)}</div>
        <div className="space-y-1">
          {Object.entries(incomeByCategory).map(([cat, val]) => (
            <div key={cat} className="flex justify-between text-sm">
              <span className="text-gray-600">{cat}</span>
              <span className="text-green-600">{formatRupiah(val)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Expense Section */}
      <div className="bg-white rounded-xl shadow p-6 border">
        <div className="mb-2 flex items-center gap-2">
          <span className="text-lg font-semibold text-red-700">Beban (Debit)</span>
        </div>
        <div className="text-2xl font-bold text-red-700 mb-2">{formatRupiah(totalExpense)}</div>
        <div className="space-y-1">
          {Object.entries(expenseByCategory).map(([cat, val]) => (
            <div key={cat} className="flex justify-between text-sm">
              <span className="text-gray-600">{cat}</span>
              <span className="text-red-600">{formatRupiah(val)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Net Profit/Loss Section */}
      <div className={`rounded-xl shadow p-6 border text-center ${netProfit >= 0 ? 'bg-blue-50' : 'bg-red-50'}`}> 
        <div className={`text-lg font-semibold ${netProfit >= 0 ? 'text-blue-700' : 'text-red-700'}`}>
          {netProfit >= 0 ? 'Laba Bersih' : 'Rugi Bersih'}
        </div>
        <div className={`text-3xl font-bold ${netProfit >= 0 ? 'text-blue-700' : 'text-red-700'}`}>{formatRupiah(Math.abs(netProfit))}</div>
      </div>
    </div>
  );
};

export default Reports;