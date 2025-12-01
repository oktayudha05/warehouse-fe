import React, { useState } from 'react';
import './App.css';
import AuthSection from './components/AuthSection';
import BarangSection from './components/BarangSection';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [userRole, setUserRole] = useState(localStorage.getItem('role') || '');
  const [username, setUsername] = useState(localStorage.getItem('username') || '');

  const handleLogin = (token, role, username) => {
    setToken(token);
    setUserRole(role);
    setUsername(username);
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
    localStorage.setItem('username', username);
  };

  const handleLogout = () => {
    setToken('');
    setUserRole('');
    setUsername('');
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('username');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-blue-600 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Warehouse API Test</h1>
          <div className="flex items-center space-x-4">
            {token ? (
              <>
                <span className="text-sm">Hello, {username} ({userRole})</span>
                <button 
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-sm"
                >
                  Logout
                </button>
              </>
            ) : (
              <span className="text-sm">Not logged in</span>
            )}
          </div>
        </div>
      </nav>

      <div className="container mx-auto p-4">
        {!token ? (
          <AuthSection onLogin={handleLogin} />
        ) : (
          <div className="space-y-6">
            <div className="bg-white p-4 rounded shadow">
              <h2 className="text-lg font-semibold mb-4">Welcome, {username}!</h2>
              <p className="text-gray-600">Your role: {userRole}</p>
            </div>
            <BarangSection token={token} role={userRole} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;