import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Building2, CalendarCheck, TrendingUp, Star,
    Search, Plus, Eye, Pencil, Trash2,
    Upload, ChevronLeft, ChevronRight, X,
    Hotel, Binoculars, Utensils, Gift, Bus 
} from 'lucide-react';
import { AuthContext } from '@/contexts/authContext';
import Sidebar from '@/components/main/Sidebar';
import { GROUP_MENU } from '@/navigation/adminMenu';
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
const AdminPage = () => {
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

            </div>
        </div>
    );
};

export default AdminPage;