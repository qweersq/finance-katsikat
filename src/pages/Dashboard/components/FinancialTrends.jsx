import { Line } from 'react-chartjs-2';
import { useContext, useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { DashboardContext } from '../contexts/DashboardContext';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const FinancialTrends = () => {
  const { financeTrends } = useContext(DashboardContext);
  const [chartData, setChartData] = useState(null);
  const [trendsData, setTrendsData] = useState(null);

  useEffect(() => {
    setTrendsData(financeTrends);
  }, [financeTrends]);
  
  useEffect(() => {
    if (trendsData) {
      const { monthly, summary } = trendsData?.trends;
      
      setChartData({
        labels: monthly.labels,
        datasets: [
          {
            label: 'Income',
            data: monthly.income.data,
            borderColor: 'rgb(34, 197, 94)',
            backgroundColor: 'rgba(34, 197, 94, 0.1)',
            fill: true,
            tension: 0.4,
          },
          {
            label: 'Expenses',
            data: monthly.expenses.data,
            borderColor: 'rgb(239, 68, 68)',
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            fill: true,
            tension: 0.4,
          }
        ]
      });
    }
  }, [trendsData]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            size: 12,
            family: "'Inter', sans-serif"
          }
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        usePointStyle: true,
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR'
              }).format(context.parsed.y);
            }
            return label;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            return new Intl.NumberFormat('id-ID', {
              style: 'currency',
              currency: 'IDR',
              maximumSignificantDigits: 3
            }).format(value);
          }
        },
        grid: {
          display: true,
          drawBorder: false,
          color: 'rgba(107, 114, 128, 0.1)'
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    }
  };

  if (!chartData) {
    return (
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <div className="flex justify-center items-center h-[400px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-500"></div>
        </div>
      </div>
    );
  }

  const { trends } = trendsData;
  const { summary } = trends;

  // Calculate profit margin
  const profitMargin = trends.monthly.income.total !== 0 
    ? ((trends.monthly.income.total - trends.monthly.expenses.total) / trends.monthly.income.total * 100).toFixed(1)
    : 0;

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">Financial Trends</h2>
          <p className="text-sm text-gray-500">Income vs Expenses Overview {trendsData.year}</p>
        </div>
        
        <div className="flex items-center gap-3 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-gray-600">Income</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span className="text-gray-600">Expenses</span>
          </div>
        </div>
      </div>
      
      <div className="h-[300px] sm:h-[400px]">
        <Line data={chartData} options={options} />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t">
        <div>
          <p className="text-sm text-gray-500">Total Income</p>
          <p className="text-lg font-semibold text-gray-800">
            {new Intl.NumberFormat('id-ID', {
              style: 'currency',
              currency: 'IDR',
              maximumSignificantDigits: 3
            }).format(trends.monthly.income.total)}
          </p>
          <span className={`text-sm ${summary.growth.income >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {summary.growth.income >= 0 ? '+' : ''}{summary.growth.income}% vs last period
          </span>
        </div>
        <div>
          <p className="text-sm text-gray-500">Total Expenses</p>
          <p className="text-lg font-semibold text-gray-800">
            {new Intl.NumberFormat('id-ID', {
              style: 'currency',
              currency: 'IDR',
              maximumSignificantDigits: 3
            }).format(trends.monthly.expenses.total)}
          </p>
          <span className={`text-sm ${summary.growth.expenses <= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {summary.growth.expenses >= 0 ? '+' : ''}{summary.growth.expenses}% vs last period
          </span>
        </div>
        <div>
          <p className="text-sm text-gray-500">Net Profit</p>
          <p className="text-lg font-semibold text-gray-800">
            {new Intl.NumberFormat('id-ID', {
              style: 'currency',
              currency: 'IDR',
              maximumSignificantDigits: 3
            }).format(summary.netIncome)}
          </p>
          <span className={`text-sm ${summary.netIncome >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {summary.netIncome >= 0 ? 'Profit' : 'Loss'}
          </span>
        </div>
        <div>
          <p className="text-sm text-gray-500">Profit Margin</p>
          <p className="text-lg font-semibold text-gray-800">{profitMargin}%</p>
          <span className={`text-sm ${profitMargin >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {profitMargin >= 0 ? 'Positive' : 'Negative'} margin
          </span>
        </div>
      </div>
    </div>
  );
};

export default FinancialTrends; 