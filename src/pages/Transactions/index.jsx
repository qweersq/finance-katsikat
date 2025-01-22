import { useState, useEffect, useContext } from 'react';
import TransactionHeader from './components/TransactionHeader';
import TransactionSummary from './components/TransactionSummary';
import TransactionList from './components/TransactionList';
import AddTransactionModal from './components/AddTransactionModal';
import { useGeneral } from '../../hooks/useGeneral';
import { TransactionProvider } from './contexts/TransactionContext';
import TransactionFilters from './components/TransactionFilters';

const Transactions = () => {
    // State Management
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [filters, setFilters] = useState({
        dateRange: {
            startDate: new Date(new Date().setDate(1)), // First day of current month
            endDate: new Date()
        },
        category: 'all',
        type: 'all',
        search: ''
    });

    // Custom Hooks
    const { loading: generalLoading } = useGeneral();

    // Effects
    useEffect(() => {
        document.title = 'Transactions | Finance System';
    }, []);


    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
        // Optional: You could debounce this if needed
    };

    // Loading State
    if (generalLoading) {
        return (
            <div className="flex justify-center items-center h-[60vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-500"></div>
            </div>
        );
    }

    return (
        <TransactionProvider>
            <div className="space-y-6">
                
                {/* Header Section */}
                <TransactionHeader
                    onAddNew={() => setIsAddModalOpen(true)}
                />

                {/* Summary Cards */}
                <TransactionSummary />

                <TransactionFilters
                    filters={filters}
                    onFilterChange={handleFilterChange}
                />

                <TransactionList />

                {/* Add Transaction Modal */}
                <AddTransactionModal
                    isOpen={isAddModalOpen}
                    onClose={() => setIsAddModalOpen(false)}
                />
            </div>
        </TransactionProvider>
    );
};

export default Transactions;
