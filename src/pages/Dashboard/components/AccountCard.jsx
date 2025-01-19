const AccountCard = ({ title, subtitle, amount, percentage, icon, trend, lastTransaction }) => {
  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-3 sm:p-4 hover:bg-white/20 transition-all duration-200 cursor-pointer group">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="bg-white/90 p-1.5 sm:p-2 rounded-lg group-hover:scale-110 transition-transform">
            {icon}
          </div>
          <div>
            <h3 className="font-medium text-white text-sm sm:text-base">{title}</h3>
            <p className="text-xs sm:text-sm text-white/70">{subtitle}</p>
          </div>
        </div>
        <div className={`px-2 py-1 rounded-full text-xs font-medium ${
          trend === 'up' 
            ? 'bg-green-500/20 text-green-100' 
            : 'bg-red-500/20 text-red-100'
        }`}>
          {percentage}
        </div>
      </div>
      
      <div className="mt-3 sm:mt-4">
        <p className="text-xl sm:text-2xl font-bold text-white mb-1">{amount}</p>
        <div className="flex items-center justify-between text-xs sm:text-sm">
          <span className="text-white/70">Last transaction</span>
          <span className="text-white/90">{lastTransaction}</span>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-white/10 hidden sm:flex justify-between items-center">
        <button className="text-white/90 hover:text-white text-sm flex items-center space-x-1">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          <span>Details</span>
        </button>
        <button className="text-white/90 hover:text-white text-sm flex items-center space-x-1">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          <span>Transfer</span>
        </button>
      </div>
    </div>
  );
};

export default AccountCard; 