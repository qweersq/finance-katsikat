import { useLocation, useNavigate } from 'react-router-dom';
import useSidebarToggle from '../hooks/useSidebarToggle';
import { useGeneral } from '../hooks/useGeneral';
import { useEffect, useState } from 'react';

const menuItems = [
  {
    path: '/',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
    label: 'Dashboard',
  },
  {
    path: '/income',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
      </svg>
    ),
    label: 'Income',
  },
  {
    path: '/expense',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    label: 'Expense',
  },
  {
    path: '/reports',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    label: 'Reports',
  },
  {
    path: '/transaction',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    label: 'Transaction',
  },
];

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isOpen, close } = useSidebarToggle();
  const { getProfile } = useGeneral();
  const [user, setUser] = useState(null);


  const NavItem = ({ path, icon, label }) => {
    const isActive = location.pathname === path;

    const handleClick = (e) => {
      e.preventDefault();
      navigate(path);
      if (window.innerWidth < 1024) {
        close();
      }
    };

    useEffect(() => {
        setUser(getProfile);
    }, [getProfile]);

    return (
      <button
        onClick={handleClick}
        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
          isActive
            ? 'bg-sky-100 text-sky-600 shadow-sm'
            : 'text-gray-600 hover:bg-gray-100'
        }`}
      >
        <div className={`${isActive ? 'text-sky-600' : 'text-gray-500'}`}>
          {icon}
        </div>
        <span className="font-medium">{label}</span>
        {isActive && (
          <div className="ml-auto w-1.5 h-1.5 rounded-full bg-sky-600"></div>
        )}
      </button>
    );
  };

  return (
    <aside
      className={`fixed lg:static inset-y-0 left-0 z-20 w-64 bg-white border-r border-gray-100 transform transition-all duration-300 ease-in-out lg:transform-none h-screen ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <div className="flex flex-col h-full">
        {/* Logo section */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-br from-sky-100 to-sky-50 p-2 rounded-lg">
              <img className="h-6 w-6 text-sky-600" src="https://www.katsikat.id/assets/newKatsikat-ac5e55a2.png" alt="Logo" />
            </div>
            <span className="text-xl font-semibold bg-gradient-to-r from-sky-600 to-sky-400 bg-clip-text text-transparent">
              Katsikat Finance
            </span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          <div className="mb-4 px-4">
            <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Main Menu
            </h2>
          </div>
          {menuItems.map((item) => (
            <NavItem key={item.path} {...item} />
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100 mt-auto">
          <div className="flex items-center space-x-3 px-4 py-3 rounded-lg bg-gray-50">
            <img
              src="https://ui-avatars.com/api/?name=Admin+User&background=dbeafe&color=0284c7"
              alt="User"
              className="h-8 w-8 rounded-full"
            />
            <div className="flex-1">
              <h3 className="text-sm font-medium text-gray-700">{user?.name}</h3>
              <p className="text-xs text-gray-500">{user?.email}</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

