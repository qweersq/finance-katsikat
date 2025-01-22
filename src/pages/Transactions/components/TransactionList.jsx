import { useState, useRef, useEffect, useContext } from 'react';
import TransactionCard from './TransactionCard';
import { formatDate } from '../utils/transactionHelpers';
import axios from 'axios';
import { TransactionContext } from '../contexts/TransactionContext';
import { useTransactions } from '../hooks/useTransactions';

const TransactionList = () => {
    const { transactions, isLoading, updateTransaction } = useContext(TransactionContext);
    const [visibleTransactions, setVisibleTransactions] = useState([]);
    const [lastVisibleRowKey, setLastVisibleRowKey] = useState(null);
    const observer = useRef(null);
    const lastRowRef = useRef(null); // Ref untuk row terakhir

    // Initial load
    useEffect(() => {
        if (transactions.length > 0) {
            const initialBatch = transactions.slice(0, 50);
            setVisibleTransactions(initialBatch);
            if (initialBatch.length > 0) {
                setLastVisibleRowKey(initialBatch[initialBatch.length - 1].id);
            }
        }
    }, [transactions]);

    // Load more data
    const loadMoreData = () => {
        const currentLength = visibleTransactions.length;
        if (currentLength >= transactions.length) return; // Stop if all data is loaded

        const nextBatch = transactions.slice(currentLength, currentLength + 50);
        if (nextBatch.length > 0) {
            setVisibleTransactions(prev => [...prev, ...nextBatch]);
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
                    console.log('Loading more data...', lastVisibleRowKey);
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
    }, [lastVisibleRowKey, visibleTransactions]);


    const handleCheckTransaction = (id, isChecked) => {
        console.log('Checking transaction:', id, isChecked);
        updateTransaction(id, { is_checked: isChecked });
    };


    // Row component with ref for last item
    const TableRow = ({ transaction, isLast }) => (
        <tr
            ref={isLast ? lastRowRef : null}
            key={transaction.id}
            className="hover:bg-gray-50"
        >
            {/* Checkbox Cell */}
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center justify-center gap-3">
                <div className="flex items-center justify-center">
                    <button
                        onClick={() => handleCheckTransaction(transaction.id, !transaction.is_checked)}
                        className={`group relative rounded-full p-1.5 transition-colors
                      ${transaction.is_checked
                                ? 'bg-green-100 hover:bg-green-200'
                                : 'bg-gray-100 hover:bg-gray-200'
                            }`}
                        disabled={transaction.is_checked}
                    >
                        {/* Checkbox Icon */}
                        <svg
                            className={`w-4 h-4 transition-colors
                        ${transaction.is_checked
                                    ? 'text-green-600'
                                    : 'text-gray-400 group-hover:text-gray-600'
                                }`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                            />
                        </svg>

                        {/* Tooltip */}
                        <span className="absolute -top-10 left-1/2 -translate-x-1/2 
                      bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 
                      group-hover:opacity-100 transition-opacity whitespace-nowrap"
                        >
                            {transaction.is_checked ? 'Mark as unverified' : 'Mark as verified'}
                        </span>
                    </button>
                </div>
                <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${transaction.is_checked ? 'bg-green-400' : 'bg-gray-400'
                        }`} />
                    <span className={`text-sm ${transaction.is_checked ? 'text-green-600' : 'text-gray-600'
                        }`}>
                        {transaction.is_checked ? 'Verified' : 'Unverified'}
                    </span>
                </div>
                </div>

            </td>


            <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{transaction.description}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">{transaction.category}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">
                    {new Date(transaction.date).toLocaleDateString()}
                </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-right">
                <div className="text-sm text-gray-900">
                    {transaction.type === 'expense' ? '- Rp ' + transaction.amount.toLocaleString('id-ID') : 'Rp ' + transaction.amount.toLocaleString('id-ID')}
                </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-right">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                    ${transaction.status === 'completed'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                >
                    {transaction.status}
                </span>
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

    if (!transactions.length) {
        return (
            <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                <div className="text-gray-500">No transactions found</div>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-[60px]">
                                    Valid
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Description
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Category
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Date
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Amount
                                </th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {visibleTransactions.map((transaction, index) => (
                                <TableRow
                                    key={transaction.id}
                                    transaction={transaction}
                                    isLast={index === visibleTransactions.length - 1}
                                />
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Loading indicator */}
                {visibleTransactions.length < transactions.length && (
                    <div className="p-4 text-center text-gray-500">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-500 mx-auto"></div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TransactionList;
