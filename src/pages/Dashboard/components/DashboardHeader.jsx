const DashboardHeader = ({ selectedPeriod, onPeriodChange }) => {
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-2xl font-bold text-gray-800">Financial Overview</h1>
      <div className="flex items-center space-x-3">
        <select 
          value={selectedPeriod}
          onChange={(e) => onPeriodChange(e.target.value)}
          className="bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm focus:ring-sky-500 focus:border-sky-500"
        >
          <option value="today">Today</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
          <option value="year">This Year</option>
        </select>
        <button className="bg-sky-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-sky-600">
          Download Report
        </button>
      </div>
    </div>
  );
};

export default DashboardHeader; 