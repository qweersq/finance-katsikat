import { useState, useEffect } from 'react';
import { fetchData, postData, putData, deleteData } from '../../../services/api';
import moment from 'moment';

export const useTransactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [summary, setSummary] = useState();
    const [financeCategories, setFinanceCategories] = useState([]);
    const [financeCategoryOptions, setFinanceCategoryOptions] = useState([]);
    const [financeAccounts, setFinanceAccounts] = useState([]);
    const [financeAccountOptions, setFinanceAccountOptions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    //   query params
    const [filters, setFilters] = useState({
        search: '', // search by description
        category: 'all', // filter by category id
        type: 'all', // filter by type credit or debit (income or expense)
        dateRange: {
            startDate: moment().startOf('month').toDate(),
            endDate: moment().endOf('month').toDate()
        },
        limit: 10,
        page: 1
    });

    const fetchTransactions = async (page = 1, newFilters = filters) => {
        try {
            setIsLoading(true);
            setError(null);

            const params = new URLSearchParams({
                ...(newFilters.search && { search: newFilters.search }),
                ...(newFilters.category !== 'all' && { category: newFilters.category }),
                ...(newFilters.type !== 'all' && { type: newFilters.type }),
                ...(newFilters.dateRange.startDate && {
                    startDate: new Date(newFilters.dateRange.startDate).toISOString().split('T')[0]
                }),
                ...(newFilters.dateRange.endDate && {
                    endDate: new Date(newFilters.dateRange.endDate).toISOString().split('T')[0]
                })
            });

            const response = await fetchData(`/finance-transactions?${params}`);

            if (response.data.success) {
                setTransactions(response.data.data.transactions);
                setSummary(response.data.data.statistics);
                console.log("summary", response.data.data.statistics);
            } else {
                throw new Error(response.data.message || 'Failed to fetch transactions');
            }
        } catch (err) {
            setError(err.message || 'An error occurred while fetching transactions');
            console.error('Error fetching transactions:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const addTransaction = async (transactionData) => {
        try {
            setError(null);
            const response = await postData('/finance-transactions', transactionData);

            if (response.data.success) {
                // Refresh the list after adding
                return response.data.data;
            } else {
                throw new Error(response.data.message || 'Failed to add transaction');
            }
        } catch (err) {
            setError(err.message || 'An error occurred while adding transaction');
            throw err;
        }
    };

    const updateTransaction = async (id, transactionData) => {
        try {
            setError(null);
            const response = await putData(`/finance-transactions/${id}`, transactionData);

            if (response.data.success) {
                // Refresh the list after updating
                fetchTransactions(1);
                return response.data.data;
            } else {
                throw new Error(response.data.message || 'Failed to update transaction');
            }
        } catch (err) {
            setError(err.message || 'An error occurred while updating transaction');
            throw err;
        }
    };

    const deleteTransaction = async (id) => {
        try {
            setError(null);
            const response = await deleteData(`/finance-transactions/${id}`);

            if (response.data.success) {
                // Refresh the list after deleting
                return true;
            } else {
                throw new Error(response.data.message || 'Failed to delete transaction');
            }
        } catch (err) {
            setError(err.message || 'An error occurred while deleting transaction');
            throw err;
        }
    };

    const fetchFinanceCategories = async () => {
        const response = await fetchData('/finance-categories');
        setFinanceCategories(response.data.data);
        setFinanceCategoryOptions(response.data.data.map(category => ({
            value: category.id,
            label: category.name
        })));
    };

    const fetchFinanceAccounts = async () => {
        const response = await fetchData('/finance-accounts');
        setFinanceAccounts(response.data.data);
        setFinanceAccountOptions(response.data.data.map(account => ({
            value: account.id,
            label: account.name
        })));
    };

    // Update filters
    const updateFilters = (newFilters) => {
        setFilters(prev => ({
            ...prev,
            ...newFilters
        }));
        // Reset to first page when filters change
        fetchTransactions(1, newFilters);
    };

    // Initial fetch
    useEffect(() => {
        fetchTransactions(1);
        fetchFinanceCategories();
        fetchFinanceAccounts();
    }, []); // Empty dependency array for initial load only


    return {
        transactions,
        summary,
        isLoading,
        error,
        filters,
        updateFilters,
        addTransaction,
        updateTransaction,
        deleteTransaction,
        financeCategories,
        financeCategoryOptions,
        financeAccounts,
        financeAccountOptions
    };
}; 