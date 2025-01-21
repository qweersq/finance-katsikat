import { useContext, useEffect } from 'react';
import { TransactionContext } from '../contexts/TransactionContext';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const TransactionFilters = () => {
  const { filters, updateFilters, financeCategoryOptions } = useContext(TransactionContext);


  useEffect(() => {
    console.log("filters", filters);
  }, [filters]);
  // Handler untuk search input
  const handleSearchChange = (e) => {
    updateFilters({
      ...filters,
      search: e.target.value
    });
  };

  // Handler untuk category select
  const handleCategoryChange = (e) => {
    updateFilters({
      ...filters,
      category: e.target.value
    });
  };

  // Handler untuk type select
  const handleTypeChange = (e) => {
    updateFilters({
      ...filters,
      type: e.target.value
    });
  };

  // Handler untuk date range picker
  const handleDateChange = (dates) => {
    const [start, end] = dates;
    updateFilters({
      ...filters,
      dateRange: {
        startDate: start,
        endDate: end || start
      }
    });
  };

  const renderDateRange = () => {
    return (
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleDateChange([new Date(), new Date()])}
            className="px-3 py-1 text-sm rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
          >
            Today
          </button>
          <button
            onClick={() => {
              const end = new Date();
              const start = new Date();
              start.setDate(end.getDate() - 7);
              handleDateChange([start, end]);
            }}
            className="px-3 py-1 text-sm rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
          >
            Last 7 Days
          </button>
          <button
            onClick={() => {
              const end = new Date();
              const start = new Date();
              start.setDate(1); // First day of current month
              handleDateChange([start, end]);
            }}
            className="px-3 py-1 text-sm rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
          >
            This Month
          </button>
          <button
            onClick={() => {
              const end = new Date();
              const start = new Date();
              start.setMonth(end.getMonth() - 1);
              handleDateChange([start, end]);
            }}
            className="px-3 py-1 text-sm rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
          >
            Last 30 Days
          </button>
          <button
            onClick={() => {
              const end = new Date();
              const start = new Date();
              start.setMonth(end.getMonth() - 3);
              handleDateChange([start, end]);
            }}
            className="px-3 py-1 text-sm rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
          >
            Last 3 Months
          </button>
          <button
            onClick={() => handleDateChange([null, null])}
            className="px-3 py-1 text-sm rounded-full bg-red-100 hover:bg-red-200 text-red-700 transition-colors"
          >
            Clear
          </button>
        </div>

        {/* Date Pickers */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
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
          <div className="flex-1">
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
    )
  }


  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {renderDateRange()}
        
        {/* Search Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Search Transaction
          </label>
          <input
            type="text"
            value={filters.search}
            onChange={handleSearchChange}
            placeholder="Search by description..."
            className="w-full px-3 py-2 border rounded-lg focus:ring-sky-500 focus:border-sky-500"
          />
        </div>

        {/* Category Select */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            value={filters.category}
            onChange={handleCategoryChange}
            className="w-full px-3 py-2 border rounded-lg focus:ring-sky-500 focus:border-sky-500"
          >
            <option value="all">All Categories</option>
            {financeCategoryOptions?.map(category => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
        </div>

        {/* Transaction Type Select */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Transaction Type
          </label>
          <select
            value={filters.type}
            onChange={handleTypeChange}
            className="w-full px-3 py-2 border rounded-lg focus:ring-sky-500 focus:border-sky-500"
          >
            <option value="all">All Types</option>
            <option value="credit">Credit</option>
            <option value="debit">Debit</option>
          </select>
        </div>


      </div>
    </div>
  );
};

export default TransactionFilters;
