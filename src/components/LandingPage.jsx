import React, { useState } from 'react';
// Import Icons
import { 
  FaWarehouse, FaChartLine, FaUserShield, FaBolt, 
  FaCheck, FaPlay, FaChevronDown, FaChevronUp,
  FaUserPlus, FaKeyboard, FaDesktop 
} from 'react-icons/fa';

const LandingPage = ({ onLoginClick }) => {
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    { q: "Apakah aplikasi ini gratis?", a: "Ya, versi dasar gratis untuk penggunaan pribadi dan UMKM kecil." },
    { q: "Bagaimana cara mendaftar sebagai karyawan?", a: "Akun karyawan dibuat oleh admin gudang. Silakan hubungi supervisor Anda untuk kredensial." },
    { q: "Apakah data saya aman?", a: "Tentu. Kami menggunakan enkripsi standar industri untuk melindungi data inventaris Anda." },
    { q: "Bisa diakses dari HP?", a: "Sangat bisa. Tampilan kami responsif dan mendukung semua perangkat mobile." }
  ];

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="bg-[#f8fafc] text-slate-900 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      
      {/* Navbar */}
      <nav className="fixed w-full z-50 transition-all duration-300 bg-white/80 backdrop-blur-md border-b border-white/50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2.5 font-bold text-xl tracking-tight text-slate-900">
            <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-indigo-200 shadow-lg">
              <FaWarehouse />
            </div>
            <span>Warehouse<span className="text-indigo-600">App</span></span>
          </div>
          <button 
            onClick={onLoginClick} 
            className="px-6 py-2.5 rounded-full bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 transition-all shadow-lg shadow-slate-200"
          >
            Masuk / Daftar
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 sm:pt-48 sm:pb-32 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
            <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
            <div className="absolute top-20 right-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 mb-8 leading-tight">
            Manajemen Gudang <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Tanpa Mumet.</span>
          </h1>
          <p className="mt-4 text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            Platform modern untuk mencatat, melacak, dan mengelola stok barang. 
            Didesain khusus untuk kecepatan dan akurasi data.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={onLoginClick}
              className="bg-indigo-600 text-white px-8 py-4 rounded-full text-base font-bold shadow-xl shadow-indigo-200 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
            >
              Coba Gratis Sekarang
            </button>

          </div>
        </div>
      </section>

      {/* Trusted By (Logo Cloud) */}
      <section className="py-10 border-y border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-8">Dipercaya oleh tim modern</p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            {['Abdul Corp', 'Ghofur Logistics', 'AbdulDelivery', 'GhofurWare', 'Gudang Abdul'].map((brand, i) => (
              <span key={i} className="text-xl font-black text-slate-800 flex items-center gap-2">
                 <FaWarehouse className="text-indigo-600" /> {brand}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Real-time Tracking",
                desc: "Monitor stok masuk dan keluar detik ini juga. Data selalu akurat tanpa perlu refresh halaman manual.",
                icon: <FaChartLine />,
                color: "bg-blue-100 text-blue-600"
              },
              {
                title: "Role Management",
                desc: "Sistem keamanan bertingkat. Pisahkan akses antara Admin, Staff Gudang, dan Pengunjung biasa.",
                icon: <FaUserShield />,
                color: "bg-indigo-100 text-indigo-600"
              },
              {
                title: "Instant Reports",
                desc: "Export data inventaris ke format yang mudah dibaca hanya dengan satu klik. Laporan jadi lebih cepat.",
                icon: <FaBolt />,
                color: "bg-amber-100 text-amber-600"
              }
            ].map((feature, i) => (
              <div key={i} className="bg-white p-8 rounded-[32px] border border-slate-100 hover:border-indigo-100 hover:shadow-2xl hover:shadow-indigo-100/50 transition-all duration-300 group">
                <div className={`w-14 h-14 ${feature.color} rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform`}>
                  {feature.icon}
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h4>
                <p className="text-slate-500 leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-slate-900 text-white rounded-[48px] mx-4 md:mx-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600 rounded-full blur-3xl opacity-20 -mr-16 -mt-16"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-600 rounded-full blur-3xl opacity-20 -ml-16 -mb-16"></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-slate-800">
            {[
              { num: "10k+", label: "Barang Tercatat" },
              { num: "500+", label: "Gudang Aktif" },
              { num: "99.9%", label: "Server Uptime" },
              { num: "24/7", label: "Support System" }
            ].map((stat, i) => (
              <div key={i} className="px-4">
                <div className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-slate-400 mb-2">
                  {stat.num}
                </div>
                <div className="text-slate-400 text-sm font-medium uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900">Cara Kerja Sistem</h2>
            <p className="text-slate-500 mt-4">Tiga langkah mudah untuk digitalisasi gudang Anda.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {/* Connector Line (Desktop) */}
            <div className="hidden md:block absolute top-12 left-1/6 right-1/6 h-0.5 bg-slate-200 -z-10"></div>
            
            {[
              { icon: <FaUserPlus />, title: "Buat Akun", desc: "Daftar sebagai karyawan atau admin gudang dalam hitungan detik." },
              { icon: <FaKeyboard />, title: "Input Data", desc: "Masukkan data barang, stok, dan harga melalui dashboard intuitif." },
              { icon: <FaDesktop />, title: "Monitoring", desc: "Pantau pergerakan barang secara real-time dari mana saja." }
            ].map((item, i) => (
              <div key={i} className="text-center bg-[#f8fafc] md:bg-transparent p-6 rounded-3xl">
                <div className="w-24 h-24 mx-auto bg-white border-4 border-indigo-50 rounded-full flex items-center justify-center text-3xl font-black text-indigo-600 shadow-xl mb-6 relative z-10">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                <p className="text-slate-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-white rounded-t-[48px]">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">Sering Ditanyakan</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-slate-200 rounded-2xl overflow-hidden transition-all duration-300 hover:border-indigo-300">
                <button 
                  onClick={() => toggleFaq(i)}
                  className="w-full flex justify-between items-center p-6 text-left bg-slate-50 hover:bg-white transition-colors"
                >
                  <span className="font-bold text-slate-800">{faq.q}</span>
                  <span className="text-slate-400">
                    {openFaq === i ? <FaChevronUp /> : <FaChevronDown />}
                  </span>
                </button>
                <div className={`bg-white px-6 text-slate-600 overflow-hidden transition-all duration-300 ${openFaq === i ? 'max-h-40 py-6' : 'max-h-0 py-0'}`}>
                  {faq.a}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-12 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 font-bold text-slate-900">
            <FaWarehouse className="text-indigo-600 text-xl" />
            WarehouseApp
          </div>
          <p className="text-slate-500 text-sm">
            © 2025 KontrakssTeam. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;