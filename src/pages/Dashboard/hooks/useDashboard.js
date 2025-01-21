import { useState, useEffect } from 'react';
import { fetchData, postData } from '../../../services/api';
import { AccountIcon, TotalBalanceIcon } from '../components/icons/AccountIcons';



const transformAccountsData = (apiResponse) => {
    if (!apiResponse?.data?.data) {
      return {
        summary: {
          title: 'Total Balance',
          amount: 'Rp 0',
          percentage: '0%',
          trend: 'up',
          color: 'sky',
          icon: TotalBalanceIcon()
        },
        accounts: []
      };
    }
  
    const { summary, details } = apiResponse.data.data;
  
    return {
      summary: {
        ...summary,
        icon: TotalBalanceIcon()
      },
      accounts: details?.map(account => ({
        ...account,
        icon: AccountIcon(
          account.icon.svg.path,
          account.icon.svg.color
        )
      }))
    };
  };

const transformFinancialData = (apiResponse) => {
  if (!apiResponse?.data?.data?.data) {
    return {
      year: new Date().getFullYear(),
      monthsToShow: 0,
      trends: {
        monthly: {
          labels: [],
          income: { data: [], total: 0, average: 0 },
          expenses: { data: [], total: 0, average: 0 }
        },
        summary: {
          netIncome: 0,
          growth: { income: 0, expenses: 0 }
        }
      }
    };
  }

  const { data } = apiResponse.data.data;
  
  return {
    year: data.year,
    monthsToShow: data.monthsToShow,
    trends: {
      monthly: {
        labels: data.trends.monthly.labels,
        income: {
          data: data.trends.monthly.income.data,
          total: data.trends.monthly.income.total || 0,
          average: data.trends.monthly.income.average || 0
        },
        expenses: {
          data: data.trends.monthly.expenses.data,
          total: data.trends.monthly.expenses.total || 0,
          average: data.trends.monthly.expenses.average || 0
        }
      },
      summary: {
        netIncome: data.trends.summary.netIncome || 0,
        growth: {
          income: data.trends.summary.growth.income || 0,
          expenses: data.trends.summary.growth.expenses || 0
        },
        performance: {
          highestIncome: {
            amount: data.trends.summary.highestIncome.amount || 0,
            month: data.trends.summary.highestIncome.month || ''
          },
          highestExpense: {
            amount: data.trends.summary.highestExpense.amount || 0,
            month: data.trends.summary.highestExpense.month || ''
          },
          lowestIncome: {
            amount: data.trends.summary.lowestIncome.amount || 0,
            month: data.trends.summary.lowestIncome.month || ''
          },
          lowestExpense: {
            amount: data.trends.summary.lowestExpense.amount || 0,
            month: data.trends.summary.lowestExpense.month || ''
          }
        }
      },
      categories: {
        income: data.trends.categories.income || [],
        expenses: data.trends.categories.expenses || []
      }
    }
  };
};

// Helper functions untuk chart data
const getChartData = (financeTrends) => {
  if (!financeTrends) return null;

  const { monthly } = financeTrends.trends;
  
  // Jika hanya ada satu bulan, tambahkan bulan berikutnya dengan nilai 0
  const labels = monthly.labels.length === 1 
    ? [...monthly.labels, getNextMonth(monthly.labels[0])]
    : monthly.labels;

  const incomeData = monthly.income.data.length === 1
    ? [...monthly.income.data, 0]
    : monthly.income.data;

  const expensesData = monthly.expenses.data.length === 1
    ? [...monthly.expenses.data, 0]
    : monthly.expenses.data;

  return {
    labels,
    datasets: [
      {
        label: 'Income',
        data: incomeData,
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Expenses',
        data: expensesData,
        borderColor: 'rgb(239, 68, 68)',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        fill: true,
        tension: 0.4,
      }
    ]
  };
};

// Helper function untuk mendapatkan nama bulan berikutnya
const getNextMonth = (currentMonth) => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const currentIndex = months.indexOf(currentMonth);
  return currentIndex === 11 ? months[0] : months[currentIndex + 1];
};

export const useDashboard = () => {
  const [accounts, setAccounts] = useState([]);
  const [financeTrends, setFinanceTrends] = useState(null);

  const [financeCategories, setFinanceCategories] = useState([]);
  const [financeCategoryOptions, setFinanceCategoryOptions] = useState([]);
  const [financeAccounts, setFinanceAccounts] = useState([]);
  const [financeAccountOptions, setFinanceAccountOptions] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAccounts = async () => {
    try {
      const response = await postData('/get-balance-all-account');
      console.log("response ", response);
    //   setAccounts(response);
      const transformedData = transformAccountsData(response);
      setAccounts(transformedData);
      console.log("transformedData ", transformedData);
    } catch (err) {
      setError('Failed to fetch accounts');
      console.error(err);
    }
  };

  const fetchFinanceTrends = async () => {
    try {
      setIsLoading(true);
      const response = await postData('/get-finance-account-trends');
      const transformedData = transformFinancialData(response);
      setFinanceTrends(transformedData);
    } catch (err) {
      setError('Failed to fetch financial trends');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const getProfitMargin = () => {
    if (!financeTrends) return 0;
    
    const { income, expenses } = financeTrends.trends.monthly;
    return income.total !== 0 
      ? ((income.total - expenses.total) / income.total * 100).toFixed(1)
      : expenses.total !== 0 ? -100 : 0;
  };

  const getGrowthIndicators = () => {
    if (!financeTrends) return { income: 0, expenses: 0 };
    return financeTrends.trends.summary.growth;
  };

  const getSummaryData = () => {
    if (!financeTrends) return null;
    
    return {
      totalIncome: financeTrends.trends.monthly.income.total,
      totalExpenses: financeTrends.trends.monthly.expenses.total,
      netIncome: financeTrends.trends.summary.netIncome,
      profitMargin: getProfitMargin(),
      growth: getGrowthIndicators(),
      monthsToShow: financeTrends.monthsToShow
    };
  };

  const fetchFinanceCategories = async () => {
    const response = await fetchData('/finance-categories');
    setFinanceCategories(response.data.data);
    setFinanceCategoryOptions(response.data.data.map(category => ({
        value: category.id,
        label: category.name
    })));
};

const fetchFinanceAccounts = async () => {
    const response = await fetchData('/finance-accounts');
    setFinanceAccounts(response.data.data);
    setFinanceAccountOptions(response.data.data.map(account => ({
        value: account.id,
        label: account.name
    })));
};

const loadDashboard = () => {
  fetchAccounts();
  fetchFinanceTrends();
};


  useEffect(() => {
    loadDashboard();
    fetchFinanceCategories();
    fetchFinanceAccounts();
  }, []);

  console.log("accounts ", accounts);

  return {
    accounts,
    financeTrends,
    financeCategories,
    financeCategoryOptions,
    financeAccounts,
    financeAccountOptions,
    isLoading,
    error,
    getChartData: () => getChartData(financeTrends),
    getSummaryData,
    getProfitMargin,
    getGrowthIndicators,
    loadDashboard
  };
}; 