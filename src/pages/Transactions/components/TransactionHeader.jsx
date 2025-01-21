const TransactionHeader = ({ onAddNew }) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Transactions</h1>
        <p className="text-sm text-gray-500">Manage and track your financial transactions</p>
      </div>
      
    </div>
  );
};

export default TransactionHeader;
