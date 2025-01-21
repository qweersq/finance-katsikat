import { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const ExpenseFilters = ({ isOpen, onClose, onApplyFilters }) => {
  const [filters, setFilters] = useState({
    dateRange: {
      startDate: null,
      endDate: null
    },
    search: ''
  });

  // Handle date range changes
  const handleDateChange = ([start, end]) => {
    setFilters(prev => ({
      ...prev,
      dateRange: {
        startDate: start,
        endDate: end
      }
    }));
  };

  // Handle search input
  const handleSearchChange = (e) => {
    setFilters(prev => ({
      ...prev,
      search: e.target.value
    }));
  };

  // Handle filter application
  const handleApplyFilters = () => {
    onApplyFilters(filters);
    onClose();
  };

  // Handle filter reset
  const handleResetFilters = () => {
    setFilters({
      dateRange: {
        startDate: null,
        endDate: null
      },
      search: ''
    });
    onApplyFilters({
      dateRange: {
        startDate: null,
        endDate: null
      },
      search: ''
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-lg bg-white">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900">Filter Expenses</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-4">
          {/* Search Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Search
            </label>
            <input
              type="text"
              value={filters.search}
              onChange={handleSearchChange}
              placeholder="Search expenses..."
              className="w-full px-3 py-2 border rounded-lg focus:ring-sky-500 focus:border-sky-500"
            />
          </div>

          {/* Date Range */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Start Date
              </label>
              <DatePicker
                selected={filters.dateRange.startDate}
                onChange={(date) => handleDateChange([date, filters.dateRange.endDate])}
                selectsStart
                startDate={filters.dateRange.startDate}
                endDate={filters.dateRange.endDate}
                className="w-full px-3 py-2 border rounded-lg focus:ring-sky-500 focus:border-sky-500"
                dateFormat="dd/MM/yyyy"
                placeholderText="Select start date"
                isClearable={true}
                maxDate={filters.dateRange.endDate || new Date()}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                End Date
              </label>
              <DatePicker
                selected={filters.dateRange.endDate}
                onChange={(date) => handleDateChange([filters.dateRange.startDate, date])}
                selectsEnd
                startDate={filters.dateRange.startDate}
                endDate={filters.dateRange.endDate}
                className="w-full px-3 py-2 border rounded-lg focus:ring-sky-500 focus:border-sky-500"
                dateFormat="dd/MM/yyyy"
                placeholderText="Select end date"
                isClearable={true}
                minDate={filters.dateRange.startDate}
                maxDate={new Date()}
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={handleResetFilters}
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 border rounded-lg"
          >
            Reset
          </button>
          <button
            onClick={handleApplyFilters}
            className="px-4 py-2 text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 rounded-lg"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExpenseFilters; 