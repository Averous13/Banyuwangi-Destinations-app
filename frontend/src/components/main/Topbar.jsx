import {Bell, HelpCircle} from 'lucide-react'

const Topbar = () => {
    return (
    <header className="bg-white border-b border-gray-200 px-7 py-3.5 flex items-center justify-between shrink-0">
        <div>
            <h3 className="text-xs font-bold">Dashboard Admin</h3>
            <p className="text-xs text-gray-400 mt-0.5">Selamat datang kembali, {'Admin'}</p>
        </div>
        <div className="flex items-center gap-2">
            <button className="relative w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors">
                <Bell className="w-4 h-4" />
                <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full border border-white" />
            </button>
            <button className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors">
                <HelpCircle className="w-4 h-4" />
            </button>
        </div>
    </header>
    )
}

export default Topbar;

// user?.name?.split(' ')[0] || 