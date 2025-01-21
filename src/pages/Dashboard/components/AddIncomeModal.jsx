import { useState, useEffect } from 'react';
import { fetchData, postData } from '../../../services/api';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const AddIncomeModal = ({ isOpen, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    account_id: '',
    category_id: '',
    amount: '',
    total_fee: '0',
    description: '',
    date: new Date(),
  });

  const [accounts, setAccounts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAccounts();
    fetchCategories();
  }, []);

  const fetchAccounts = async () => {
    try {
      const response = await fetchData('/finance-accounts');
      setAccounts(response?.data.data);
    } catch (err) {
      setError('Failed to fetch accounts');
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetchData('/finance-categories');
      const filterCategories = response?.data.data.filter(category => category.type === 'credit');
      setCategories(filterCategories);
    } catch (err) {
      setError('Failed to fetch categories');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const finalAmount = parseFloat(formData.amount) - parseFloat(formData.total_fee);
      const payload = {
        ...formData,
        amount: parseFloat(formData.amount),
        total_fee: parseFloat(formData.total_fee),
        final_amount: finalAmount,
        date: formData.date.toISOString()
      };

      await postData('/finance-transactions', payload);
      onSuccess?.();
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to add income');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900">Add Income</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-500 rounded-md text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Account
            </label>
            <select
              required
              value={formData.account_id}
              onChange={(e) => setFormData(prev => ({ ...prev, account_id: e.target.value }))}
              className="w-full rounded-md border border-gray-300 p-2 focus:ring-sky-500 focus:border-sky-500"
            >
              <option value="">Select Account</option>
              {accounts?.map(account => (
                <option key={account.id} value={account.id}>
                  {account.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              required
              value={formData.category_id}
              onChange={(e) => setFormData(prev => ({ ...prev, category_id: e.target.value }))}
              className="w-full rounded-md border border-gray-300 p-2 focus:ring-sky-500 focus:border-sky-500"
            >
              <option value="">Select Category</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Amount
            </label>
            <input
              type="number"
              required
              min="0"
              step="0.01"
              value={formData.amount}
              onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
              className="w-full rounded-md border border-gray-300 p-2 focus:ring-sky-500 focus:border-sky-500"
              placeholder="Enter amount"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Fee (if any)
            </label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={formData.total_fee}
              onChange={(e) => setFormData(prev => ({ ...prev, total_fee: e.target.value }))}
              className="w-full rounded-md border border-gray-300 p-2 focus:ring-sky-500 focus:border-sky-500"
              placeholder="Enter fee amount"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date
            </label>
            <DatePicker
              selected={formData.date}
              onChange={(date) => setFormData(prev => ({ ...prev, date }))}
              className="w-full rounded-md border border-gray-300 p-2 focus:ring-sky-500 focus:border-sky-500"
              dateFormat="dd/MM/yyyy"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="w-full rounded-md border border-gray-300 p-2 focus:ring-sky-500 focus:border-sky-500"
              rows="3"
              placeholder="Enter description"
            />
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className={`px-4 py-2 text-sm font-medium text-white bg-sky-600 rounded-md hover:bg-sky-700 ${
                isLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? 'Adding...' : 'Add Income'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddIncomeModal; 