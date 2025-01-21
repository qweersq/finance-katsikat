import { Outlet, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import useSidebarToggle from '../hooks/useSidebarToggle';


const MainLayout = () => {
  const { isOpen, close } = useSidebarToggle();

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      {/* Overlay untuk mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-gray-900 bg-opacity-50 z-10 lg:hidden"
          onClick={close}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen w-full">
        <Navbar />
        <main className="flex-1 p-4 sm:p-6 overflow-x-hidden">
          <div className="w-full max-w-[2000px] mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout; 