import { formatDate, formatCurrency } from '../utils/transactionHelpers';
import { useContext } from 'react';
import { TransactionContext } from '../contexts/TransactionContext';
import moment from 'moment';

const TransactionCard = ({ transaction }) => {

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <div className="grid grid-cols-6 gap-4 p-4 items-center">
        <div className="col-span-2">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-lg ${
              transaction?.type === 'income' ? 'bg-green-100' : 'bg-red-100'
            }`}>
              <svg className={`w-5 h-5 ${
                transaction?.type === 'income' ? 'text-green-600' : 'text-red-600'
              }`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {transaction?.type === 'income' ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 13l-5 5m0 0l-5-5m5 5V6" />
                )}
              </svg>
            </div>
            <div>
              <p className="font-medium text-gray-800">{transaction?.description}</p>
            </div>
          </div>
        </div>

        <div>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            {transaction?.category || 'Uncategorized'}
          </span>
        </div>

        <div className="text-sm text-gray-500">
          {moment(transaction?.createdAt).format('DD MMM YYYY HH:mm')}
        </div>

        <div className={`text-right font-medium ${
          transaction?.type === 'income' ? 'text-green-600' : 'text-red-600'
        }`}>
          {transaction?.type === 'income' ? '+' : '-'} 
          {formatCurrency(transaction?.amount)}
        </div>

        <div className="text-right">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            transaction?.status === 'completed'
              ? 'bg-green-100 text-green-800'
              : transaction?.status === 'pending'
              ? 'bg-yellow-100 text-yellow-800'
              : 'bg-red-100 text-red-800'
          }`}>
            {transaction?.status?.charAt(0).toUpperCase() + transaction?.status?.slice(1)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TransactionCard;
