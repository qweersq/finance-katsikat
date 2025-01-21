export const transactionTypes = [
  {
    id: 'income',
    name: 'Income',
    description: 'Money coming in',
    icon: 'arrow-up',
    color: 'green'
  },
  {
    id: 'expense',
    name: 'Expense',
    description: 'Money going out',
    icon: 'arrow-down',
    color: 'red'
  },
  {
    id: 'transfer',
    name: 'Transfer',
    description: 'Money movement between accounts',
    icon: 'switch-horizontal',
    color: 'blue'
  }
];

// Payment methods
export const paymentMethods = [
  {
    id: 'cash',
    name: 'Cash',
    icon: 'cash'
  },
  {
    id: 'bank_transfer',
    name: 'Bank Transfer',
    icon: 'credit-card'
  },
  {
    id: 'debit',
    name: 'Debit Card',
    icon: 'credit-card'
  },
  {
    id: 'credit',
    name: 'Credit Card',
    icon: 'credit-card'
  },
  {
    id: 'digital_wallet',
    name: 'Digital Wallet',
    icon: 'device-mobile'
  }
];

// Transaction status
export const transactionStatus = [
  {
    id: 'completed',
    name: 'Completed',
    color: 'green'
  },
  {
    id: 'pending',
    name: 'Pending',
    color: 'yellow'
  },
  {
    id: 'failed',
    name: 'Failed',
    color: 'red'
  },
  {
    id: 'cancelled',
    name: 'Cancelled',
    color: 'gray'
  }
];

// Sample transaction data (for testing)
export const sampleTransactions = [
  {
    id: 1,
    type: 'income',
    category: 'sales',
    amount: 5000000,
    description: 'Product Sales',
    date: '2024-02-20',
    reference: 'INV/2024/02/001',
    status: 'completed',
    paymentMethod: 'bank_transfer',
    notes: 'Monthly product sales revenue'
  },
  {
    id: 2,
    type: 'expense',
    category: 'utilities',
    amount: 1500000,
    description: 'Electricity Bill',
    date: '2024-02-19',
    reference: 'UTIL/2024/02/001',
    status: 'completed',
    paymentMethod: 'bank_transfer',
    notes: 'Monthly electricity payment'
  },
  {
    id: 3,
    type: 'income',
    category: 'service',
    amount: 2500000,
    description: 'Consulting Service',
    date: '2024-02-18',
    reference: 'SRV/2024/02/001',
    status: 'pending',
    paymentMethod: 'bank_transfer',
    notes: 'Consulting fee for Project X'
  },
  {
    id: 4,
    type: 'expense',
    category: 'supplies',
    amount: 750000,
    description: 'Office Supplies',
    date: '2024-02-17',
    reference: 'EXP/2024/02/001',
    status: 'completed',
    paymentMethod: 'cash',
    notes: 'Monthly office supplies'
  },
  {
    id: 5,
    type: 'transfer',
    category: 'internal',
    amount: 10000000,
    description: 'Account Transfer',
    date: '2024-02-16',
    reference: 'TRF/2024/02/001',
    status: 'completed',
    paymentMethod: 'bank_transfer',
    notes: 'Transfer from operational to savings account'
  }
];
