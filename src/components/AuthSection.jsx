import React, { useState } from 'react';
import axios from 'axios';

// --- PERBAIKAN: Komponen dipindah ke LUAR AuthSection ---
const InputField = ({ label, type, name, value, onChange, placeholder, required = true }) => (
  <div className="group">
    <div className="relative bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600 transition-all">
      <label className="block text-xs font-medium text-slate-500 mb-1">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="block w-full bg-transparent border-none p-0 text-slate-900 placeholder-slate-300 focus:ring-0 sm:text-sm font-medium focus:outline-none"
      />
    </div>
  </div>
);
// -------------------------------------------------------

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
  const API_URL = 'https://warehouse-api.oyudha.me';

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
      if (response.data?.token) {
        onLogin(response.data.token, isKaryawan ? 'karyawan' : 'pengunjung', formData.username);
      } else {
        setError('Token tidak diterima.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Terjadi kesalahan sistem.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const resetForm = (newIsKaryawan, newIsLogin) => {
    setIsKaryawan(newIsKaryawan);
    setIsLogin(newIsLogin);
    setFormData({ nama: '', username: '', password: '', jabatan: '' });
    setError('');
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Card Container M3 */}
      <div className="bg-white rounded-[32px] shadow-xl shadow-slate-200/50 p-8 sm:p-10 border border-white">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-slate-900">
            {isLogin ? 'Welcome Back' : 'Get Started'}
          </h2>
          <p className="text-slate-500 mt-2 text-sm">
            {isLogin ? 'Masuk untuk mengelola gudang.' : 'Daftar akun baru.'}
          </p>
        </div>

        {/* Segmented Button (Role) */}
        <div className="flex bg-slate-100 p-1 rounded-full mb-8">
          {['Karyawan', 'Pengunjung'].map((label) => {
             const isSelected = (label === 'Karyawan' && isKaryawan) || (label === 'Pengunjung' && !isKaryawan);
             return (
              <button
                key={label}
                onClick={() => resetForm(label === 'Karyawan', isLogin)}
                className={`flex-1 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  isSelected 
                    ? 'bg-white text-indigo-900 shadow-sm' 
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                {label}
              </button>
             );
          })}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isKaryawan && !isLogin && (
            <InputField 
              label="Nama Lengkap" 
              type="text" 
              name="nama" 
              value={formData.nama} 
              onChange={handleInputChange} 
              placeholder="John Doe" 
            />
          )}

          <InputField 
            label="Username" 
            type="text" 
            name="username" 
            value={formData.username} 
            onChange={handleInputChange} 
            placeholder="user123" 
          />
          <InputField 
            label="Password" 
            type="password" 
            name="password" 
            value={formData.password} 
            onChange={handleInputChange} 
            placeholder="••••••••" 
          />

          {isKaryawan && !isLogin && (
            <div className="relative bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 focus-within:border-indigo-600 transition-all">
               <label className="block text-xs font-medium text-slate-500 mb-1">Jabatan</label>
               <select
                  name="jabatan"
                  value={formData.jabatan}
                  onChange={handleInputChange}
                  className="block w-full bg-transparent border-none p-0 text-slate-900 focus:ring-0 sm:text-sm font-medium cursor-pointer focus:outline-none"
                >
                  <option value="">Pilih Jabatan...</option>
                  <option value="Operator">Operator</option>
                  <option value="Stocker">Stocker</option>
                  <option value="Staff Gudang">Staff Gudang</option>
                </select>
            </div>
          )}

          {error && (
            <div className="bg-red-50 text-red-600 text-sm p-3 rounded-2xl text-center font-medium">
              {error}
            </div>
          )}

          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3.5 rounded-full text-white font-bold text-sm tracking-wide transition-all shadow-lg shadow-indigo-200 ${
                loading ? 'bg-indigo-300' : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-indigo-300 hover:-translate-y-0.5'
              }`}
            >
              {loading ? 'Processing...' : isLogin ? 'Sign In' : 'Create Account'}
            </button>
          </div>
        </form>

        <div className="mt-8 text-center">
          <button 
            onClick={() => resetForm(isKaryawan, !isLogin)}
            className="text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors"
          >
            {isLogin ? "Belum punya akun? Daftar sekarang" : "Sudah punya akun? Login"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthSection;