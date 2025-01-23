import { Navigate, Outlet } from 'react-router-dom';
import { useGeneral } from '../hooks/useGeneral';

const PublicRoute = () => {
  const { isAuthenticated } = useGeneral();
  return isAuthenticated ? <Navigate to="/" replace /> : <Outlet />;
};

export default PublicRoute;
