import React, { useState } from 'react';
import axios from 'axios';

const AuthSection = ({ onLogin }) => {
  const [isKaryawan, setIsKaryawan] = useState(true);
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    nama: '',
    username: '',
    password: '',
    jabatan: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const API_URL = 'https://warehouse-api.oyudha.me'; // Sesuaikan dengan port backend Anda

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const endpoint = isLogin 
        ? (isKaryawan ? '/karyawan/login' : '/pengunjung/login')
        : (isKaryawan ? '/karyawan/register' : '/pengunjung/register');

      const payload = isKaryawan
        ? { nama: formData.nama, username: formData.username, password: formData.password, jabatan: formData.jabatan }
        : { username: formData.username, password: formData.password };

      const response = await axios.post(`${API_URL}${endpoint}`, payload);
      
      if (response.data.token) {
        onLogin(response.data.token, isKaryawan ? 'karyawan' : 'pengunjung', formData.username);
      } else {
        setError(response.data.message || 'Login/Registration failed');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <div className="flex mb-4">
        <button
          className={`flex-1 py-2 px-4 rounded-l ${isKaryawan ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          onClick={() => setIsKaryawan(true)}
        >
          Karyawan
        </button>
        <button
          className={`flex-1 py-2 px-4 rounded-r ${!isKaryawan ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          onClick={() => setIsKaryawan(false)}
        >
          Pengunjung
        </button>
      </div>

      <div className="flex mb-4">
        <button
          className={`flex-1 py-2 px-4 rounded-l ${isLogin ? 'bg-green-600 text-white' : 'bg-gray-200'}`}
          onClick={() => setIsLogin(true)}
        >
          Login
        </button>
        <button
          className={`flex-1 py-2 px-4 rounded-r ${!isLogin ? 'bg-green-600 text-white' : 'bg-gray-200'}`}
          onClick={() => setIsLogin(false)}
        >
          Register
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {isKaryawan && !isLogin && (
          <div>
            <label className="block text-sm font-medium mb-1">Nama</label>
            <input
              type="text"
              value={formData.nama}
              onChange={(e) => setFormData({...formData, nama: e.target.value})}
              className="w-full p-2 border rounded"
              required
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-medium mb-1">Username</label>
          <input
            type="text"
            value={formData.username}
            onChange={(e) => setFormData({...formData, username: e.target.value})}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {isKaryawan && !isLogin && (
          <div>
            <label className="block text-sm font-medium mb-1">Jabatan</label>
            <input
              type="text"
              value={formData.jabatan}
              onChange={(e) => setFormData({...formData, jabatan: e.target.value})}
              className="w-full p-2 border rounded"
              required
            />
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Loading...' : (isLogin ? 'Login' : 'Register')}
        </button>

        {error && (
          <div className="text-red-500 text-sm mt-2">{error}</div>
        )}
      </form>
    </div>
  );
};

export default AuthSection;