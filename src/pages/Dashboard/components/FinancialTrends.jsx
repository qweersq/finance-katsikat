import { Line } from 'react-chartjs-2';
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
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Income',
        data: [30000000, 35000000, 32000000, 38000000, 35000000, 40000000],
        borderColor: 'rgb(34, 197, 94)',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Expenses',
        data: [20000000, 25000000, 22000000, 28000000, 24000000, 26000000],
        borderColor: 'rgb(239, 68, 68)',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        fill: true,
        tension: 0.4,
      }
    ]
  };

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

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">Financial Trends</h2>
          <p className="text-sm text-gray-500">Income vs Expenses Overview</p>
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
        <Line data={data} options={options} />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t">
        <div>
          <p className="text-sm text-gray-500">Total Income</p>
          <p className="text-lg font-semibold text-gray-800">Rp 210.000.000</p>
          <span className="text-sm text-green-500">+12.5% vs last period</span>
        </div>
        <div>
          <p className="text-sm text-gray-500">Total Expenses</p>
          <p className="text-lg font-semibold text-gray-800">Rp 145.000.000</p>
          <span className="text-sm text-red-500">+8.2% vs last period</span>
        </div>
        <div>
          <p className="text-sm text-gray-500">Net Profit</p>
          <p className="text-lg font-semibold text-gray-800">Rp 65.000.000</p>
          <span className="text-sm text-green-500">+15.3% vs last period</span>
        </div>
        <div>
          <p className="text-sm text-gray-500">Profit Margin</p>
          <p className="text-lg font-semibold text-gray-800">31%</p>
          <span className="text-sm text-green-500">+2.8% vs last period</span>
        </div>
      </div>
    </div>
  );
};

export default FinancialTrends; 