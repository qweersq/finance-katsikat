import { useContext, useState } from "react";
import { ExpenseContext } from "../contexts/ExpenseContext";
import ExpenseFilters from "./ExpenseFilters";

const ExpenseHeader = ({ onAddNew }) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { updateFilters } = useContext(ExpenseContext);

  const handleApplyFilters = (filters) => {
    updateFilters(filters);
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Expenses</h1>
        <p className="text-sm text-gray-500">Track and manage your expenses</p>
      </div>

      <div className="flex gap-3">

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsFilterOpen(true)}
            className="border border-gray-300 hover:bg-gray-50 text-gray-600 px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Filter
          </button>

          <ExpenseFilters
            isOpen={isFilterOpen}
            onClose={() => setIsFilterOpen(false)}
            onApplyFilters={handleApplyFilters}
          />

          {/* <button
            className="border border-gray-300 hover:bg-gray-50 text-gray-600 px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Export
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default ExpenseHeader; 