import React,{ useState} from "react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

const Sidebar = ( {groupMenu = []} ) => {
    const [activeMenu, setActiveMenu] = useState('dashboard');
    const navigate = useNavigate()
    
    return (

            <aside className="w-56 bg-primary flex flex-col sticky top-0 h-screen overflow-y-auto shrink-0">
               
                <div className="px-5 py-6 border-b border-white/10">
                    <div className="text-lg  text-white leading-tight">Banyuwangi<br/>Wisata</div>
                    <div className="text-xs text-accent mt-1 uppercase tracking-widest">Portal Mitra</div>
                </div>

                <nav className="flex-1 px-3 py-4 space-y-5">
                    {groupMenu.map(group => (
                        <div key={group.label}>
                            <p className="text-[10px] font-semibold uppercase text-accent tracking-widest px-2 mb-1">
                                {group.label}
                            </p>
                            {group.items.map(item => {
                                const Icon    = item.icon;
                                const isActive = activeMenu === item.id;
                                return (
                                    <Button
                                        key={item.id}
                                        onClick={() => {
                                            setActiveMenu(item.id);
                                            if (item.link) {
                                                navigate(item.link);
                                            }
                                        }}
                                        className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[13px] font-medium mb-0.5 transition-all
                                            ${isActive
                                                ? 'bg-white/12 text-white'
                                                : 'text-white/60 hover:bg-white/8 hover:text-white'
                                            }`}>
                                        <Icon className="w-4 h-4 shrink-0" />
                                        <span className="flex-1 text-left">{item.label}</span>
                                        {item.badge && (
                                            <span className="text-[10px] bg-accent px-1.5 py-0.5 rounded-full font-semibold">
                                                {item.badge}
                                            </span>
                                        )}
                                    </Button>
                                );
                            })}
                        </div>
                    ))}
                </nav>
            </aside>

    )

}

export default Sidebar;

