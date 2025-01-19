const SummaryCard = ({ title, amount, percentage, icon, color, trend }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <div className={`bg-${color}-100 p-2 rounded-lg`}>
          {icon}
        </div>
        <span className="text-sm text-gray-500">vs last month</span>
      </div>
      <h3 className="text-2xl font-bold text-gray-800">{amount}</h3>
      <p className="text-sm text-gray-500">{title}</p>
      <div className={`mt-2 flex items-center text-${trend === 'up' ? 'green' : 'red'}-500 text-sm`}>
        {/* Trend icon */}
        <span>{percentage}</span>
      </div>
    </div>
  );
};

export default SummaryCard; 