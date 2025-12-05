import React, { useState, useEffect } from 'react';
import axios from 'axios';
// Import Icons
import { 
  FaLaptop, FaHeadphones, FaBoxOpen, FaPlus, 
  FaEdit, FaTrash, FaSearch 
} from 'react-icons/fa';

const BarangSection = ({ token, role }) => {
  const [barangList, setBarangList] = useState([]);
  const [formData, setFormData] = useState({
    id_barang: null,
    nama: '',
    jenis: '',
    harga: '',
    jumlah: '',
    tanggal_masuk: new Date().toISOString()
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('create');
  const API_URL = 'https://warehouse-api.oyudha.me';

  const fetchBarang = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/barang/`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBarangList(response.data);
      setError('');
    } catch (err) {
      console.error('Error fetching barang:', err);
      setError('Gagal mengambil data: ' + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBarang();
  }, [token]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const payload = {
        nama: formData.nama,
        jenis: formData.jenis,
        harga: parseInt(formData.harga),
        jumlah: parseInt(formData.jumlah),
        tanggal_masuk: formData.tanggal_masuk
      };
      if (modalMode === 'create') {
        await axios.post(`${API_URL}/barang/`, payload, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else if (modalMode === 'update') {
        const id_barang = formData.id_barang;
        if (!id_barang) throw new Error('ID Error');
        await axios.put(`${API_URL}/barang/${id_barang}`, payload, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      setFormData({ id_barang: null, nama: '', jenis: '', harga: '', jumlah: '', tanggal_masuk: new Date().toISOString() });
      setIsModalOpen(false);
      setModalMode('create');
      fetchBarang();
    } catch (err) {
      setError(err.response?.data?.message || 'Operasi gagal');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id_barang) => {
    if (!window.confirm('Hapus item ini dari gudang?')) return;
    setLoading(true);
    try {
      await axios.delete(`${API_URL}/barang/${id_barang}`, { headers: { Authorization: `Bearer ${token}` } });
      fetchBarang();
    } catch (err) {
      setError('Gagal menghapus data');
    } finally {
      setLoading(false);
    }
  };

  const openAddModal = () => {
    setFormData({ id_barang: null, nama: '', jenis: '', harga: '', jumlah: '', tanggal_masuk: new Date().toISOString() });
    setModalMode('create');
    setIsModalOpen(true);
  };

  const openUpdateModal = (barang) => {
    setFormData({ ...barang, id_barang: barang.id_barang || barang.id });
    setModalMode('update');
    setIsModalOpen(true);
  };

  const formatRupiah = (angka) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(angka);

  // Helper untuk menentukan icon berdasarkan jenis
  const getCategoryIcon = (jenis) => {
    switch(jenis) {
      case 'Elektronik': return <FaLaptop />;
      case 'Aksesoris': return <FaHeadphones />;
      default: return <FaBoxOpen />;
    }
  };

  // M3 Card Component
  const ItemCard = ({ item }) => (
    <div className="bg-white rounded-[24px] p-6 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-100 border border-slate-100 group">
      <div className="flex justify-between items-start mb-4">
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl
          ${item.jenis === 'Elektronik' ? 'bg-blue-50 text-blue-600' : 
            item.jenis === 'Aksesoris' ? 'bg-pink-50 text-pink-600' : 'bg-purple-50 text-purple-600'}`}>
          {getCategoryIcon(item.jenis)}
        </div>
        <span className="bg-slate-50 text-slate-500 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
          {item.jenis}
        </span>
      </div>
      
      <h3 className="text-lg font-bold text-slate-900 mb-1 truncate" title={item.nama}>{item.nama}</h3>
      <p className="text-xs text-slate-400 mb-6 font-medium">ID: {item.id_barang || item.id}</p>

      <div className="space-y-3">
        <div className="flex justify-between items-center bg-slate-50 p-3 rounded-2xl">
          <span className="text-xs font-medium text-slate-500">Harga</span>
          <span className="text-sm font-bold text-slate-800">{formatRupiah(item.harga)}</span>
        </div>
        <div className="flex justify-between items-center bg-slate-50 p-3 rounded-2xl">
          <span className="text-xs font-medium text-slate-500">Stok</span>
          <span className={`text-sm font-bold ${item.jumlah < 5 ? 'text-red-500' : 'text-slate-800'}`}>
            {item.jumlah} Unit
          </span>
        </div>
      </div>

      {role === 'karyawan' && (
        <div className="mt-6 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button onClick={() => openUpdateModal(item)} className="flex-1 bg-indigo-50 text-indigo-700 py-2 rounded-full text-xs font-bold hover:bg-indigo-100 transition-colors flex items-center justify-center gap-1">
            <FaEdit /> Edit
          </button>
          <button onClick={() => handleDelete(item.id_barang || item.id)} className="flex-1 bg-red-50 text-red-700 py-2 rounded-full text-xs font-bold hover:bg-red-100 transition-colors flex items-center justify-center gap-1">
            <FaTrash /> Hapus
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div className="relative min-h-[500px]">
      {/* Header & FAB */}
      <div className="flex flex-col sm:flex-row justify-between items-end mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">Inventory</h2>
          <p className="text-slate-500 mt-1">Total {barangList.length} items di gudang</p>
        </div>
        
        {role === 'karyawan' && (
          <button
            onClick={openAddModal}
            className="flex items-center gap-2 bg-indigo-600 text-white pl-4 pr-6 py-3.5 rounded-2xl font-bold shadow-lg shadow-indigo-200 hover:shadow-xl hover:scale-105 transition-all"
          >
            <FaPlus /> Add Item
          </button>
        )}
      </div>

      {error && <div className="bg-red-50 text-red-600 p-4 rounded-2xl mb-6 text-sm font-medium">{error}</div>}

      {/* Grid Layout */}
      {loading && barangList.length === 0 ? (
        <div className="text-center py-20 text-slate-400">Memuat data...</div>
      ) : barangList.length === 0 ? (
        <div className="bg-white border-2 border-dashed border-slate-200 rounded-[32px] p-12 text-center flex flex-col items-center">
          <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 text-2xl mb-4">
            <FaBoxOpen />
          </div>
          <p className="text-slate-500 font-medium">Gudang kosong.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {barangList.map(item => <ItemCard key={item.id_barang || item.id} item={item} />)}
        </div>
      )}

      {/* Modal Overlay M3 */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity" onClick={() => setIsModalOpen(false)} />
          <div className="bg-white rounded-[32px] w-full max-w-lg p-8 relative z-10 shadow-2xl animate-fade-in">
            <h3 className="text-2xl font-bold text-slate-900 mb-6">
              {modalMode === 'create' ? 'Tambah Barang' : 'Edit Barang'}
            </h3>
            
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2">
                <label className="text-xs text-slate-500 font-bold uppercase">Nama Barang</label>
                <input name="nama" value={formData.nama} onChange={handleInputChange} className="w-full bg-transparent border-none p-0 focus:ring-0 text-slate-900 font-medium focus:outline-none" required />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2">
                  <label className="text-xs text-slate-500 font-bold uppercase">Kategori</label>
                  <select name="jenis" value={formData.jenis} onChange={handleInputChange} className="w-full bg-transparent border-none p-0 focus:ring-0 text-slate-900 font-medium cursor-pointer focus:outline-none" required>
                    <option value="">Pilih...</option>
                    {['Elektronik', 'Aksesoris', 'Peripheral'].map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2">
                   <label className="text-xs text-slate-500 font-bold uppercase">Stok</label>
                   <input type="number" name="jumlah" value={formData.jumlah} onChange={handleInputChange} className="w-full bg-transparent border-none p-0 focus:ring-0 text-slate-900 font-medium focus:outline-none" required min="0" />
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2">
                <label className="text-xs text-slate-500 font-bold uppercase">Harga (Rp)</label>
                <input type="number" name="harga" value={formData.harga} onChange={handleInputChange} className="w-full bg-transparent border-none p-0 focus:ring-0 text-slate-900 font-medium focus:outline-none" required min="0" />
              </div>

              <div className="flex gap-3 pt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-3 rounded-full text-indigo-600 font-bold hover:bg-indigo-50 transition-colors">
                  Batal
                </button>
                <button type="submit" disabled={loading} className="flex-1 py-3 bg-indigo-600 text-white rounded-full font-bold shadow-lg shadow-indigo-200 hover:shadow-xl hover:bg-indigo-700 transition-all">
                  {loading ? 'Menyimpan...' : 'Simpan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BarangSection;