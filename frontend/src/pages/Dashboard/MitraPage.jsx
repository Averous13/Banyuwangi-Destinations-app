import React, { useContext, useState } from "react"
import { ArrowLeftRight, 
    Bed, 
    Binoculars, 
    Building2, 
    Bus, 
    CalendarCheck, 
    Gift, 
    LayoutDashboard, 
    Settings, 
    Star, 
    TrendingUp, 
    UserCircle, 
    Utensils } from "lucide-react"
import { useNavigate } from "react-router-dom";
import { AuthContext } from "@/contexts/authContext";
import { Button } from "@/components/ui/button";


// ─── Data tipe properti ───────────────────────────────────────────────────────
const PROPERTY_TYPES = [
    { type: 'homestay',   label: 'Homestay',   emoji: '🏠', color: 'bg-yellow-50',  desc: 'Rumah keluarga dengan pengalaman lokal' },
    { type: 'guesthouse', label: 'Guest House', emoji: '🏢', color: 'bg-blue-50',    desc: 'Beberapa kamar dengan area bersama' },
    { type: 'hotel',      label: 'Hotel',       emoji: '🏨', color: 'bg-purple-50',  desc: 'Akomodasi profesional full-service' },
    { type: 'villa',      label: 'Villa',       emoji: '🌴', color: 'bg-emerald-50', desc: 'Properti eksklusif dengan fasilitas privat' },
    { type: 'kos',        label: 'Kos-Kosan',   emoji: '🏡', color: 'bg-pink-50',   desc: 'Kamar bulanan untuk tinggal lama' },
];

const NAV_MAIN = [
    {id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard},
    {id: 'properti', label: 'Properti', icon: Building2, badge: 3},
    {id: 'booking', label: 'Booking', icon: CalendarCheck, badge: 5},
    {id: 'reviews', label: 'Review', icon: Star},
]

const NAV_FINANCE = [
    {id: 'pendapatan', label: 'Pendapatan', icon: TrendingUp},
    {id: 'pengeluaran', label: 'Pengeluaran', icon: ArrowLeftRight},
]

const NAV_ACCOUNT = [
    {id: 'profil', label: 'Profil', icon: UserCircle},
    {id: 'pengaturan', label: 'Pengaturan', icon: Settings},
]

// ─── Badge warna per tipe ─────────────────────────────────────────────────────
const TYPE_BADGE = {
    homestay:   'bg-yellow-100 text-yellow-800',
    guesthouse: 'bg-blue-100 text-blue-800',
    hotel:      'bg-purple-100 text-purple-800',
    villa:      'bg-emerald-100 text-emerald-800',
    kos:        'bg-pink-100 text-pink-800',
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

const fmt = (n) => {
    new Intl.NumberFormat('id-ID', {style: 'currency', currency: 'IDR', maximumFractionDigits: 0}).format(n);
}

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
                            {info?.emoji}
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

const MitraPage = () => {
    const { user, logout} = useContext(AuthContext);
    const [activePage, setActivePage] = useState('dashboard');
    const [activeFilter, setActiveFilter] = useState('all');
    const [search, setSearch] = useState('');
    const [addType, setAddType] = useState(null);

    const navigate = useNavigate();

    const initials = user?.name
        ? user.name.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase()
        : 'MT'

    const filteredMock = MOCK_PROPERTIES.filter(p => {
        const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
                            p.district.toLowerCase().includes(search.toLowerCase());
        const matchFilter = activeFilter === 'all' ||
                            (activeFilter === 'active' && p.status === 'active') ||
                            (activeFilter === 'draft' && p.status === 'draft') ||
                            (activeFilter === 'inactive' && p.status === 'inactive');
                            
        return matchSearch && matchFilter;
    })    


    return (
        <div className="flex min-h-screen bg-stone-50">
            {/* sidebar */}
            <aside className="w-56 bg-primary flex flex-col sticky top-0 h-screen overflow-y-auto flex-shrink-0">
                {/* brand */}
                <div className="px-5 py-6 border-b border-white/10">
                    <div className="font-serif text-lg text-white leading-tight">
                        Banyuwangi<br>Wisata</br>
                    </div>
                    <div className="text-xs text-accent mt-1 uppercase tracking widest">
                        Portal Mitra
                    </div>

                </div>

                {/* navbar */}
                <nav className="flex-1 px3 py-4 space-y-5">
                    {
                        [
                            {label: 'Utama', items: NAV_MAIN},
                            {label: 'Keuangan', items: NAV_FINANCE},
                            {label: 'Akun', items: NAV_ACCOUNT},
                        ].map(group => {
                            <div key={group.label}>
                                <p className="text-[10px] font-semibold text-primary/30 uppercase tracking-widest px-2 mb-1">
                                    {group.label}
                                </p>
                                {group.items.map(item => {
                                    const Icon = item.icon;
                                    const isActive = activePage === item.id;
                                    return (
                                        <Button key={item.id} onClick={() => setActivePage(item.id)}> 
                                            <Icon className="w-4 h-4 flex-shrink-0"/>
                                            <span className="flex-1 text-left">{item.label}</span>
                                            {item.badge && (
                                                <span className="text-[10px] bg-red-500 text-white px-1.5 py-0.5 rounded-full font-semibold">
                                                    {item.badge}
                                                </span>
                                            )}
                                        </Button>
                                    )
                                })}
                            </div>
                        })
                    }
                </nav>

                {/* user chip */}
                <div className="px-3 py-4 border-t border-white/10">
                    <div className="flex items center gap-2.5 px-2.5 py-2 rounded-lg bg-white/8">
                        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
                            {initials}
                        </div>
                        <div className="min-w-0">
                            <p className="text-xs font-semibold text-white truncate">{user?.name || 'Mitra'}</p>
                            <p className="text-[10px] text-primary/45">Mitra Terverifikasi</p>
                        </div>
                    </div>
                    <Button onClick={logout}>
                        Keluar
                    </Button>
                </div>
            </aside>

            {/* main */}
            <div className="flex-1 flex flex-col min-w-0">
                    {/* topbar */}
                    <header className="bg-white border-b border-gray-200 px-7 py-3.5 flex items-center justify-between flex-shrink-0">
                        <div>
                            <h1 className="text-base font-bold text-gray-900">
                                Dashboard Mitra
                            </h1>
                            <p className="text-xs text-gray-400 mt-0.5">
                                Selamat Datang Kembali, {user?.name?.split(' ')[0] || 'Mitra'}
                            </p>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button>
                                <Bell className="w-4 h-4">
                                    <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full border border-white"></span>
                                </Bell>
                            </Button>
                            <Button>
                                <HelpCircle className="w-4 h-4"/>
                            </Button>
                        </div>
                    </header>
            </div>
        </div>
    )
}