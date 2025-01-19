import TransactionTable from './TransactionTable';
import { transactionsData } from '../data/transactionsData';

const RecentTransactions = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="p-6 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-800">Recent Transactions</h2>
      </div>
      <TransactionTable transactions={transactionsData} />
    </div>
  );
};

export default RecentTransactions; 