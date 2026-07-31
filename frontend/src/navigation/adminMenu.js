// ─── Nav items sidebar ────────────────────────────────────────────────────────
import {LayoutDashboard,
    Binoculars,
    NewspaperIcon,
    Handshake,
    TrendingUp,
    ArrowLeftRight,
    UserCircle,
    Settings} from "lucide-react"

const NAV_MAIN = [
    { id: 'dashboard',  label: 'Dashboard',      icon: LayoutDashboard},
    { id: 'properti',   label: 'Destinations',  icon: Binoculars, link: '/data-destinations'},
    { id: 'booking',    label: 'Articles',         icon: NewspaperIcon, link: '/data-article'},
    { id: 'mitra',     label: 'Kemitraan',          icon: Handshake},
];
const NAV_FINANCE = [
    { id: 'pendapatan', label: 'Pendapatan',   icon: TrendingUp},
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