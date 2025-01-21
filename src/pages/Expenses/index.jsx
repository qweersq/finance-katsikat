import { useState } from 'react';
import ExpenseHeader from './components/ExpenseHeader';
import ExpenseSummary from './components/ExpenseSummary';
import ExpenseList from './components/ExpenseList';
import AddExpenseModal from './components/AddExpenseModal';
import { useExpenses } from './hooks/useExpenses';
import { ExpenseProvider } from './contexts/ExpenseContext';

const Expenses = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleAddExpense = async (expenseData) => {
    try {
      await addExpense(expenseData);
      setIsAddModalOpen(false);
    } catch (error) {
      console.error('Failed to add expense:', error);
    }
  };

  return (
    <ExpenseProvider>
      <div className="space-y-6">
        <ExpenseHeader onAddNew={() => setIsAddModalOpen(true)} />
        <ExpenseSummary />
        <ExpenseList />

        <AddExpenseModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSubmit={handleAddExpense}
        />
      </div>
    </ExpenseProvider>
  );
};

export default Expenses; 