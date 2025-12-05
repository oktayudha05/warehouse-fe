import React, { useState } from 'react';
import './App.css';
import AuthSection from './components/AuthSection';
import BarangSection from './components/BarangSection';
import LandingPage from './components/LandingPage';
// Import Icons
import { FaWarehouse, FaSignOutAlt, FaUserCircle } from 'react-icons/fa';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [userRole, setUserRole] = useState(localStorage.getItem('role') || '');
  const [username, setUsername] = useState(localStorage.getItem('username') || '');
  const [showAuth, setShowAuth] = useState(false);

  const handleLogin = (token, role, username) => {
    setToken(token);
    setUserRole(role);
    setUsername(username);
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
    localStorage.setItem('username', username);
    setShowAuth(false);
  };

  const handleLogout = () => {
    setToken('');
    setUserRole('');
    setUsername('');
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('username');
  };

  const handleGetStartedClick = () => {
    setShowAuth(true);
  };

  const capitalizeFirstLetter = (string) => {
    if (!string) return string;
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans text-slate-900 selection:bg-indigo-200 selection:text-indigo-900">
      {/* M3 Top App Bar */}
      {token && (
        <nav className="bg-[#f8fafc] sticky top-0 z-40 px-4 py-3 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white/80 backdrop-blur-md border border-white/50 shadow-sm rounded-full px-6 py-3 flex justify-between items-center">
              {/* Logo / Brand */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white shadow-indigo-200 shadow-lg">
                  <FaWarehouse className="w-5 h-5" />
                </div>
                <div>
                  <h1 className="text-lg font-bold text-slate-800 leading-tight">Warehouse</h1>
                  <p className="text-[10px] font-bold text-indigo-600 tracking-widest uppercase">Management</p>
                </div>
              </div>

              {/* User Actions */}
              <div className="flex items-center gap-4">
                <div className="hidden sm:flex flex-col items-end">
                  <span className="text-sm font-semibold text-slate-700">
                    {capitalizeFirstLetter(username)}
                  </span>
                  <span className="text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <FaUserCircle className="w-3 h-3" />
                    {userRole}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="bg-red-50 text-red-700 hover:bg-red-100 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2"
                >
                  <FaSignOutAlt />
                  Logout
                </button>
              </div>
            </div>
          </div>
        </nav>
      )}

      <main>
        {!token ? (
          showAuth ? (
            <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
              <AuthSection onLogin={handleLogin} />
            </div>
          ) : (
            <LandingPage onLoginClick={handleGetStartedClick} />
          )
        ) : (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <BarangSection token={token} role={userRole} />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;