// ─── Nav items sidebar ────────────────────────────────────────────────────────
import {LayoutDashboard,
    Building2,
    CalendarCheck,
    Star,
    TrendingUp,
    ArrowLeftRight,
    UserCircle,
    Settings} from "lucide-react"

const NAV_MAIN = [
    { id: 'dashboard',  label: 'Dashboard',      icon: LayoutDashboard },
    { id: 'properti',   label: 'Properti Saya',  icon: Building2,      badge: 3 },
    { id: 'booking',    label: 'Booking',         icon: CalendarCheck,  badge: 5 },
    { id: 'ulasan',     label: 'Ulasan',          icon: Star },
];
const NAV_FINANCE = [
    { id: 'pendapatan', label: 'Pendapatan',   icon: TrendingUp },
    { id: 'pencairan',  label: 'Pencairan',    icon: ArrowLeftRight },
];
const NAV_ACCOUNT = [
    { id: 'profil',      label: 'Profil Usaha', icon: UserCircle },
    { id: 'pengaturan',  label: 'Pengaturan',   icon: Settings },
];

export const GROUP_MENU = [
    {label: 'Utama', items: NAV_MAIN},
    {label: 'Keuangan', items: NAV_FINANCE},
    {label: 'Akun', items: NAV_ACCOUNT},
]