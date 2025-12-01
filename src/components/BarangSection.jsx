import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BarangSection = ({ token, role }) => {
  const [barangList, setBarangList] = useState([]);
  const [formData, setFormData] = useState({
    nama: '',
    jenis: '',
    harga: '',
    jumlah: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const API_URL = 'https://warehouse-api.oyudha.me'; // Sesuaikan dengan port backend Anda

  const fetchBarang = async () => {
    try {
      const response = await axios.get(`${API_URL}/barang/`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBarangList(response.data);
    } catch (err) {
      setError('Failed to fetch barang');
    }
  };

  useEffect(() => {
    fetchBarang();
  }, [token]);

  const handleSubmit = async (action) => {
    setLoading(true);
    setError('');

    try {
      let response;
      const payload = {
        namabarang: formData.nama,
        jenisbarang: formData.jenis,
        hargabarang: parseInt(formData.harga),
        jumlah: parseInt(formData.jumlah),
        tanggal_masuk: new Date().toISOString()
      };

      if (action === 'create') {
        response = await axios.post(`${API_URL}/barang/`, payload, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else if (action === 'update') {
        response = await axios.put(`${API_URL}/barang/`, payload, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else if (action === 'delete') {
        response = await axios.delete(`${API_URL}/barang/`, {
          headers: { Authorization: `Bearer ${token}` },
          data: payload
        });
      }

      setFormData({ nama: '', jenis: '', harga: '', jumlah: '' });
      fetchBarang(); // Refresh list
    } catch (err) {
      setError(err.response?.data?.message || 'Operation failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Form Section */}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-lg font-semibold mb-4">Barang Management</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-1">Nama Barang</label>
            <input
              type="text"
              value={formData.nama}
              onChange={(e) => setFormData({...formData, nama: e.target.value})}
              className="w-full p-2 border rounded"
              placeholder="Contoh: Laptop"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Jenis Barang</label>
            <input
              type="text"
              value={formData.jenis}
              onChange={(e) => setFormData({...formData, jenis: e.target.value})}
              className="w-full p-2 border rounded"
              placeholder="Contoh: Elektronik"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Harga</label>
            <input
              type="number"
              value={formData.harga}
              onChange={(e) => setFormData({...formData, harga: e.target.value})}
              className="w-full p-2 border rounded"
              placeholder="Contoh: 5000000"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Jumlah</label>
            <input
              type="number"
              value={formData.jumlah}
              onChange={(e) => setFormData({...formData, jumlah: e.target.value})}
              className="w-full p-2 border rounded"
              placeholder="Contoh: 10"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {role === 'karyawan' && (
            <>
              <button
                onClick={() => handleSubmit('create')}
                disabled={loading}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
              >
                Add Barang
              </button>
              <button
                onClick={() => handleSubmit('update')}
                disabled={loading}
                className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700 disabled:opacity-50"
              >
                Update Barang
              </button>
              <button
                onClick={() => handleSubmit('delete')}
                disabled={loading}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 disabled:opacity-50"
              >
                Delete Barang
              </button>
            </>
          )}
        </div>

        {error && (
          <div className="text-red-500 text-sm mt-2">{error}</div>
        )}
      </div>

      {/* Barang List */}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-lg font-semibold mb-4">Daftar Barang</h2>
        
        {barangList.length === 0 ? (
          <p className="text-gray-500">No barang found</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nama</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Jenis</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Harga</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Jumlah</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tanggal Masuk</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {barangList.map((barang, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">{barang.nama}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{barang.jenis}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{barang.harga}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{barang.jumlah}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{new Date(barang.tanggal_masuk).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default BarangSection;