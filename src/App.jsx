import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import PublicRoute from './components/PublicRoute.jsx';
import MainLayout from './layouts/MainLayout.jsx';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login.jsx';
import Income from './pages/Income.jsx';
import Expenses from './pages/Expenses/index.jsx';
import Reports from './pages/Reports.jsx';
import Transactions from './pages/Transactions/index.jsx';
import { GeneralProvider } from './contexts/GeneralContext.jsx';


const App = () => {
  return (
    <GeneralProvider>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<Login />} />
          </Route>

          {/* Protected routes dengan MainLayout */}
          <Route element={<ProtectedRoute />}>
            <Route element={<MainLayout />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/transaction" element={<Transactions />} />
              <Route path="/expense" element={<Expenses />} />
              <Route path="/income" element={<Income />} />
              <Route path="/reports" element={<Reports />} />
            </Route>
          </Route>

          {/* Fallback for undefined routes */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </GeneralProvider>
  );
};

export default App;
