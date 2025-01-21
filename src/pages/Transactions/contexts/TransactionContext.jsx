import React, { createContext, useState, useEffect } from 'react';
import { useTransactions } from '../hooks/useTransactions';

const TransactionContext = createContext();

function TransactionProvider({ children }) {
    const { 
        transactions, 
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
        financeAccountOptions, 
        summary, 
    } = useTransactions();

    const value = {
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

    return (
        <TransactionContext.Provider value={value}>
            {children}
        </TransactionContext.Provider>
    );
}

export { TransactionContext, TransactionProvider };