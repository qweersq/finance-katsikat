import { useContext, useEffect, useState, useRef } from 'react';
import { ExpenseContext } from '../contexts/ExpenseContext';

const ExpenseList = () => {
  const { expenses, isLoading, displayFinanceCategories } = useContext(ExpenseContext);
  const [visibleExpenses, setVisibleExpenses] = useState([]);
  const [lastVisibleRowKey, setLastVisibleRowKey] = useState(null);
  const observer = useRef(null);
  const lastRowRef = useRef(null);

  console.log(expenses);

  // Initial load
  useEffect(() => {
    if (expenses.length > 0) {
      const initialBatch = expenses.slice(0, 10);
      setVisibleExpenses(initialBatch);
      if (initialBatch.length > 0) {
        setLastVisibleRowKey(initialBatch[initialBatch.length - 1].id);
      }
    }
  }, [expenses]);

  // Load more data
  const loadMoreData = () => {
    const currentLength = visibleExpenses.length;
    if (currentLength >= expenses.length) return;

    const nextBatch = expenses.slice(currentLength, currentLength + 10);
    if (nextBatch.length > 0) {
      setVisibleExpenses(prev => [...prev, ...nextBatch]);
      setLastVisibleRowKey(nextBatch[nextBatch.length - 1].id);
    }
  };

  // Setup intersection observer for the last row
  useEffect(() => {
    const currentLastRow = lastRowRef.current;
    if (!currentLastRow) return;

    observer.current = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting) {
          console.log('Loading more expenses...', lastVisibleRowKey);
          loadMoreData();
        }
      },
      { threshold: 0.1 }
    );

    observer.current.observe(currentLastRow);

    return () => {
      if (observer.current && currentLastRow) {
        observer.current.disconnect();
      }
    };
  }, [lastVisibleRowKey, visibleExpenses]);

  // Row component with ref for last item
  const TableRow = ({ expense, isLast }) => (
    <tr 
      ref={isLast ? lastRowRef : null}
      key={expense.id} 
      className="hover:bg-gray-50 group"
    >
      {/* Tanggal & Status - Gabung di mobile */}
      <td className="px-4 py-3 whitespace-nowrap">
        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3">
          <span className="text-sm text-gray-500 mb-1 sm:mb-0">
            {expense?.date ? new Date(expense.date).toLocaleDateString('id-ID', {
              day: 'numeric',
              month: 'short',
              year: 'numeric'
            }) : '-'}
          </span>
          <span className={`
            text-xs font-medium px-2 py-1 rounded-full inline-flex items-center w-fit
            ${expense?.status === 'completed' 
              ? 'bg-green-50 text-green-700 ring-1 ring-green-600/20'
              : expense?.status === 'pending'
              ? 'bg-yellow-50 text-yellow-700 ring-1 ring-yellow-600/20'
              : 'bg-gray-50 text-gray-700 ring-1 ring-gray-600/20'
            }
          `}>
            {expense?.status || 'Unknown'}
          </span>
        </div>
      </td>

      {/* Nama & Deskripsi */}
      <td className="px-4 py-3">
        <div className="max-w-xs sm:max-w-none">
          <div className="text-sm font-medium text-gray-900 truncate">
            {expense?.name || '-'}
          </div>
          <div className="text-sm text-gray-500 truncate">
            {expense?.description || '-'}
          </div>
        </div>
      </td>

      {/* Amount */}
      <td className="px-4 py-3 whitespace-nowrap">
        <span className="text-sm font-medium text-gray-900">
          Rp {parseFloat(expense?.amount || 0).toLocaleString('id-ID')}
        </span>
      </td>

      {/* Category - Hidden di mobile */}
      <td className="hidden sm:table-cell px-4 py-3 whitespace-nowrap">
        <span className="text-sm text-gray-500">
          {displayFinanceCategories(expense?.finance_category_id) || '-'}
        </span>
      </td>

      {/* Created By - Hidden di mobile */}
      <td className="hidden sm:table-cell px-4 py-3 whitespace-nowrap">
        <div className="flex items-center gap-2">
          <span className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-xs text-gray-500">
            {expense?.creator?.name?.charAt(0) || '?'}
          </span>
          <span className="text-sm text-gray-500">
            {expense?.creator?.name || '-'}
          </span>
        </div>
      </td>

    </tr>
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-500"></div>
      </div>
    );
  }

  if (!Array.isArray(expenses) || expenses.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-8 text-center">
        <div className="text-gray-500">No expenses found</div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date & Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Details
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="hidden sm:table-cell px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="hidden sm:table-cell px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created By
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {visibleExpenses.map((expense, index) => (
                <TableRow 
                  key={expense?.id}
                  expense={expense}
                  isLast={index === visibleExpenses.length - 1}
                />
              ))}
            </tbody>
          </table>
        </div>

        {/* Loading indicator */}
        {visibleExpenses.length < expenses.length && (
          <div className="p-4 text-center text-gray-500">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-500 mx-auto"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpenseList; 