import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Building2, CalendarCheck, TrendingUp, Star,
    Search, Plus, Eye, Pencil, Trash2,
    Upload, ChevronLeft, ChevronRight, X,
    Hotel, Binoculars, Utensils, Gift, Bus 
} from 'lucide-react';
import { AuthContext } from '@/contexts/authContext';
import Sidebar from '@/components/main/Sidebar';
import { GROUP_MENU } from '@/navigation/sidebarMenu';
import Topbar from '@/components/main/Topbar';

// ─── Data tipe properti ───────────────────────────────────────────────────────
const PROPERTY_TYPES = [
    { type: 'penginapan',   label: 'Penginapan',   icon: Hotel, color: 'bg-yellow-50',  desc: 'Pemilik Hotel, rumah, kos, villa' },
    { type: 'tourguide', label: 'Tour Guide', icon: Binoculars, color: 'bg-blue-50',    desc: 'Jasa open trip,private trip' },
    { type: 'restaurant',      label: 'Restaurant',       icon: Utensils, color: 'bg-purple-50',  desc: 'Tempat makan warung atau resto' },
    { type: 'oleholeh',      label: 'Oleh-oleh',       icon: Gift, color: 'bg-emerald-50', desc: 'Sedia oleh-oleh' },
    { type: 'transport',        label: 'Transportasi',   icon: Bus, color: 'bg-pink-50',   desc: 'Sewa kendaraan motor, mobil, bus' },
];


// ─── Badge warna per tipe ─────────────────────────────────────────────────────
const TYPE_BADGE = {
    penginapan:   'bg-yellow-100 text-yellow-800',
    tourguide: 'bg-blue-100 text-blue-800',
    restaurant:      'bg-purple-100 text-purple-800',
    oleholeh:      'bg-emerald-100 text-emerald-800',
    transport:        'bg-pink-100 text-pink-800',
};
const TYPE_LABEL = {
    homestay: 'Homestay', guesthouse: 'Guest House',
    hotel: 'Hotel', villa: 'Villa', kos: 'Kos-Kosan',
};

// ─── Mock data properti ───────────────────────────────────────────────────────
const MOCK_PROPERTIES = [
    { _id: '1', name: 'Homestay Ijen View',  type: 'homestay',   status: 'active', address: 'Jl. Raya Licin',      district: 'Licin',    rating: 4.8, review_count: 24, booking_count: 12, price_min: 150000  },
    { _id: '2', name: 'Villa Kalibaru',       type: 'villa',      status: 'active', address: 'Jl. Raya Kalibaru',   district: 'Kalibaru', rating: 4.6, review_count: 11, booking_count: 5,  price_min: 2000000 },
    { _id: '3', name: 'Kos Putra Giri',       type: 'kos',        status: 'draft',  address: 'Jl. Diponegoro',      district: 'Giri',     rating: null, review_count: 0, booking_count: 0, price_min: 1500000 },
];

// ─── Format harga ─────────────────────────────────────────────────────────────
const fmt = (n) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(n);

// ─── Modal tambah properti ────────────────────────────────────────────────────
const AddPropertyModal = ({ type, onClose, onSubmit }) => {
    const [form, setForm] = useState({ name: '', address: '', district: '' });
    const info = PROPERTY_TYPES.find(t => t.type === type);
    const navigate = useNavigate();

    const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

    const handleSubmit = (e) => {
        e.preventDefault();
        // Arahkan ke halaman form lengkap dengan type dan data awal
        navigate(`/mitra/properti/tambah?type=${type}`, { state: { ...form, type } });
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl" onClick={e => e.stopPropagation()}>
                <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl ${info?.color}`}>
                            {info?.icon}
                        </div>
                        <div>
                            <h3 className="text-base font-semibold text-gray-900">
                                Tambah {info?.label}
                            </h3>
                            <p className="text-xs text-gray-500">{info?.desc}</p>
                        </div>
                    </div>
                    <button type="button" onClick={onClose} className="p-1 rounded-lg hover:bg-gray-100 text-gray-400">
                        <X className="w-4 h-4" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-3">
                    <div>
                        <label className="text-xs font-medium text-gray-600 block mb-1">Nama Properti *</label>
                        <input name="name" value={form.name} onChange={handleChange} required
                            className="w-full h-11 px-3 rounded-lg border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-green-800 focus:bg-white"
                            placeholder={`Contoh: ${info?.label} Ijen View`} />
                    </div>
                    <div>
                        <label className="text-xs font-medium text-gray-600 block mb-1">Alamat *</label>
                        <input name="address" value={form.address} onChange={handleChange} required
                            className="w-full h-11 px-3 rounded-lg border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-green-800 focus:bg-white"
                            placeholder="Jl. Raya Licin No. 10" />
                    </div>
                    <div>
                        <label className="text-xs font-medium text-gray-600 block mb-1">Kecamatan *</label>
                        <input name="district" value={form.district} onChange={handleChange} required
                            className="w-full h-11 px-3 rounded-lg border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-green-800 focus:bg-white"
                            placeholder="Contoh: Licin" />
                    </div>

                    <div className="flex gap-3 pt-2">
                        <button type="button" onClick={onClose}
                            className="flex-1 h-11 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
                            Batal
                        </button>
                        <button type="submit"
                            className="flex-1 h-11 rounded-lg bg-green-900 text-white text-sm font-medium hover:bg-green-700 transition-colors">
                            Lanjut Isi Detail →
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

// ─── Main Dashboard ───────────────────────────────────────────────────────────
const MitraDashboardPage = () => {
    const { user, logout }        = useContext(AuthContext);
    const [activeFilter, setFilter]     = useState('all');
    const [search, setSearch]           = useState('');
    const [addType, setAddType]         = useState(null); // null = modal tutup
    const navigate = useNavigate();

    // Inisial nama untuk avatar
    const initials = user?.name
        ? user.name.split(' ').slice(0,2).map(w => w[0]).join('').toUpperCase()
        : 'MT';

    // Filter properti
    const filtered = MOCK_PROPERTIES.filter(p => {
        const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
                            p.district.toLowerCase().includes(search.toLowerCase());
        const matchFilter = activeFilter === 'all' ||
                            (activeFilter === 'active'   && p.status === 'active') ||
                            (activeFilter === 'draft'    && p.status === 'draft')  ||
                            (activeFilter === 'inactive' && p.status === 'inactive');
        return matchSearch && matchFilter;
    });

    return (
        <div className="flex min-h-screen bg-stone-50">

            {/* ── Sidebar ── */}
            <Sidebar groupMenu={GROUP_MENU}/>

            {/* ── Main ── */}
            <div className="flex-1 flex flex-col min-w-0">

            <Topbar />

                {/* Content */}
                <main className="flex-1 overflow-y-auto p-7 space-y-8">

                    {/* Stats */}
                    <div className="grid grid-cols-4 gap-4">
                        {[
                            { label: 'Total Properti',      value: '3',      sub: '2 aktif · 1 draft',      icon: Building2,       bg: 'bg-emerald-50',  ic: 'text-emerald-700' },
                            { label: 'Booking Bulan Ini',   value: '18',     sub: '+3 dari bulan lalu',      icon: CalendarCheck,   bg: 'bg-amber-50',    ic: 'text-amber-700'   },
                            { label: 'Pendapatan Bulan Ini',value: 'Rp 4,2jt',sub: 'Pencairan tersedia',    icon: TrendingUp,      bg: 'bg-blue-50',     ic: 'text-blue-700'    },
                            { label: 'Rating Rata-rata',    value: '4.7',    sub: 'dari 42 ulasan',          icon: Star,            bg: 'bg-red-50',      ic: 'text-red-600'     },
                        ].map(s => {
                            const Icon = s.icon;
                            return (
                                <div key={s.label} className="bg-white border border-gray-200 rounded-xl p-5 flex items-start justify-between gap-3">
                                    <div>
                                        <p className="text-xs text-gray-400 mb-1">{s.label}</p>
                                        <p className="text-2xl font-bold text-gray-900 font-serif">{s.value}</p>
                                        <p className="text-xs text-gray-400 mt-1">{s.sub}</p>
                                    </div>
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${s.bg}`}>
                                        <Icon className={`w-5 h-5 ${s.ic}`} />
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Tambah Properti */}
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h3 className="text-sm font-bold text-gray-900">Tambah Properti Baru</h3>
                                <p className="text-xs text-gray-400 mt-0.5">Pilih tipe properti yang ingin Anda daftarkan</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-5 gap-3">
                            {PROPERTY_TYPES.map(pt => (
                                <button key={pt.type} type="button" onClick={() => setAddType(pt.type)}
                                    className="bg-white border-2 border-dashed border-gray-200 rounded-xl p-4 text-center hover:border-green-800 hover:bg-green-50/30 hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 group">
                                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-2xl mx-auto mb-2 ${pt.color} group-hover:scale-105 transition-transform`}>
                                        <pt.icon className="w-6 h-6" />
                                    </div>
                                    <p className="text-xs font-semibold text-gray-800">{pt.label}</p>
                                    <p className="text-[11px] text-gray-400 mt-1 leading-snug">{pt.desc}</p>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Listing Properti */}
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h3 className="text-sm font-bold text-gray-900">Properti Saya</h3>
                                <p className="text-xs text-gray-400 mt-0.5">{filtered.length} properti ditampilkan</p>
                            </div>
                        </div>

                        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                            {/* Toolbar */}
                            <div className="px-5 py-3 border-b border-gray-100 flex items-center gap-2.5 flex-wrap">
                                <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 flex-1 min-w-40 max-w-64">
                                    <Search className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                                    <input
                                        type="text"
                                        placeholder="Cari properti..."
                                        value={search}
                                        onChange={e => setSearch(e.target.value)}
                                        className="bg-transparent border-none outline-none text-sm text-gray-700 w-full placeholder:text-gray-400"
                                    />
                                </div>

                                {[
                                    { key: 'all',      label: 'Semua'   },
                                    { key: 'active',   label: 'Aktif'   },
                                    { key: 'draft',    label: 'Draft'   },
                                    { key: 'inactive', label: 'Nonaktif'},
                                ].map(f => (
                                    <button key={f.key} onClick={() => setFilter(f.key)}
                                        className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors
                                            ${activeFilter === f.key
                                                ? 'bg-green-900 text-white border-green-900'
                                                : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                                            }`}>
                                        {f.label}
                                    </button>
                                ))}

                                <button onClick={() => setAddType('homestay')}
                                    className="ml-auto flex items-center gap-1.5 px-3.5 py-2 bg-green-900 text-white rounded-lg text-xs font-semibold hover:bg-green-700 transition-colors">
                                    <Plus className="w-3.5 h-3.5" />
                                    Tambah Properti
                                </button>
                            </div>

                            {/* Table */}
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="bg-gray-50">
                                            {['Properti', 'Tipe', 'Status', 'Rating', 'Booking', 'Harga Mulai', 'Aksi'].map(h => (
                                                <th key={h} className="text-left px-5 py-3 text-[11px] font-semibold text-gray-400 uppercase tracking-wide border-b border-gray-100 whitespace-nowrap">
                                                    {h}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filtered.length === 0 ? (
                                            <tr>
                                                <td colSpan={7} className="text-center py-12 text-gray-400 text-sm">
                                                    Tidak ada properti yang ditemukan.
                                                </td>
                                            </tr>
                                        ) : filtered.map(prop => (
                                            <tr key={prop._id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                                                {/* Properti */}
                                                <td className="px-5 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className={`w-11 h-9 rounded-lg flex items-center justify-center text-lg flex-shrink-0 ${PROPERTY_TYPES.find(t => t.type === prop.type)?.color}`}>
                                                            {PROPERTY_TYPES.find(t => t.type === prop.type)?.icon}
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-semibold text-gray-900">{prop.name}</p>
                                                            <p className="text-xs text-gray-400">{prop.address} · {prop.district}</p>
                                                        </div>
                                                    </div>
                                                </td>

                                                {/* Tipe */}
                                                <td className="px-5 py-4">
                                                    <span className={`text-[11px] font-medium px-2.5 py-1 rounded-full ${TYPE_BADGE[prop.type]}`}>
                                                        {TYPE_LABEL[prop.type]}
                                                    </span>
                                                </td>

                                                {/* Status */}
                                                <td className="px-5 py-4">
                                                    <div className="flex items-center gap-1.5 text-xs font-medium">
                                                        <div className={`w-1.5 h-1.5 rounded-full ${
                                                            prop.status === 'active'   ? 'bg-emerald-500' :
                                                            prop.status === 'draft'    ? 'bg-amber-500'   : 'bg-gray-400'
                                                        }`} />
                                                        <span className={
                                                            prop.status === 'active'   ? 'text-emerald-700' :
                                                            prop.status === 'draft'    ? 'text-amber-700'   : 'text-gray-500'
                                                        }>
                                                            {prop.status === 'active' ? 'Aktif' : prop.status === 'draft' ? 'Draft' : 'Nonaktif'}
                                                        </span>
                                                    </div>
                                                </td>

                                                {/* Rating */}
                                                <td className="px-5 py-4">
                                                    {prop.rating ? (
                                                        <div className="flex items-center gap-1 text-xs">
                                                            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                                                            <span className="font-semibold text-gray-700">{prop.rating}</span>
                                                            <span className="text-gray-400">({prop.review_count})</span>
                                                        </div>
                                                    ) : (
                                                        <span className="text-xs text-gray-400">Belum ada</span>
                                                    )}
                                                </td>

                                                {/* Booking */}
                                                <td className="px-5 py-4 text-sm text-gray-600">
                                                    {prop.booking_count > 0 ? `${prop.booking_count} tamu` : '—'}
                                                </td>

                                                {/* Harga */}
                                                <td className="px-5 py-4 text-sm text-gray-700 font-medium whitespace-nowrap">
                                                    {fmt(prop.price_min)}
                                                </td>

                                                {/* Aksi */}
                                                <td className="px-5 py-4">
                                                    <div className="flex items-center gap-1.5">
                                                        <button onClick={() => navigate(`/mitra/properti/${prop._id}`)}
                                                            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-gray-200 text-[11px] font-medium text-gray-600 hover:bg-gray-50 transition-colors">
                                                            <Eye className="w-3 h-3" /> Lihat
                                                        </button>
                                                        <button onClick={() => navigate(`/mitra/properti/${prop._id}/edit`)}
                                                            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-gray-200 text-[11px] font-medium text-gray-600 hover:bg-gray-50 transition-colors">
                                                            <Pencil className="w-3 h-3" /> Edit
                                                        </button>
                                                        {prop.status === 'draft' && (
                                                            <button className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-green-900 border border-green-900 text-[11px] font-medium text-white hover:bg-green-700 transition-colors">
                                                                <Upload className="w-3 h-3" /> Publish
                                                            </button>
                                                        )}
                                                        <button className="p-1.5 rounded-lg border border-gray-200 text-gray-400 hover:bg-red-50 hover:text-red-500 hover:border-red-200 transition-colors">
                                                            <Trash2 className="w-3.5 h-3.5" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            <div className="px-5 py-3 flex items-center justify-between border-t border-gray-100">
                                <p className="text-xs text-gray-400">Menampilkan {filtered.length} dari {MOCK_PROPERTIES.length} properti</p>
                                <div className="flex items-center gap-1">
                                    <button className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-gray-50 transition-colors">
                                        <ChevronLeft className="w-3.5 h-3.5" />
                                    </button>
                                    <button className="w-7 h-7 rounded-lg bg-green-900 text-white text-xs font-medium">1</button>
                                    <button className="w-7 h-7 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-gray-50 transition-colors">
                                        <ChevronRight className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                </main>
            </div>

            {/* Modal tambah properti */}
            {addType && (
                <AddPropertyModal
                    type={addType}
                    onClose={() => setAddType(null)}
                    onSubmit={() => setAddType(null)}
                />
            )}
        </div>
    );
};

export default MitraDashboardPage;