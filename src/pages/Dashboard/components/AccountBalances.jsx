import AccountCard from './AccountCard';
import { accountsData } from '../data/accountsData';

const AccountBalances = () => {
  const totalBalance = accountsData.reduce((sum, account) => sum + account.rawAmount, 0);
  
  return (
    <div className="bg-gradient-to-br from-sky-500 to-sky-600 rounded-2xl shadow-lg">
      <div className="p-4 sm:p-6">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-6 sm:mb-8">
          <div>
            <h2 className="text-white text-lg font-medium mb-1">Total Balance</h2>
            <p className="text-2xl sm:text-3xl font-bold text-white break-words">
              Rp {totalBalance.toLocaleString('id-ID')}
            </p>
          </div>
          <button className="w-full sm:w-auto bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg text-sm transition-colors flex items-center justify-center space-x-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span>Add Account</span>
          </button>
        </div>
        
        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {accountsData.map((account) => (
            <AccountCard key={account.id} {...account} />
          ))}
        </div>

        {/* Mobile Quick Actions */}
        <div className="mt-4 pt-4 border-t border-white/10 flex justify-between sm:hidden">
          <button className="flex-1 text-white/90 hover:text-white text-sm flex items-center justify-center space-x-2 py-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
            <span>Transfer</span>
          </button>
          <button className="flex-1 text-white/90 hover:text-white text-sm flex items-center justify-center space-x-2 py-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <span>History</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountBalances; 