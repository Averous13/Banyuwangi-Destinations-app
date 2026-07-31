import { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Menu, X, LogIn, LogOut, User, Map } from 'lucide-react';
import { AuthContext } from '@/contexts/authContext';


const Header = () => {
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled]             = useState(false);


    const { user, isAdmin,logout, loading } = useContext(AuthContext);

    useEffect(() => {
        const handleScroll = () => {
            const heroSection = document.getElementById('hero');
            if (!heroSection) {
                setIsScrolled(true);
                return;
            }
            setIsScrolled(window.scrollY > heroSection.offsetHeight - 100);
        };

        handleScroll();
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setIsMobileMenuOpen(false);
        }
    };

    const handleLogout = async () => {
        await logout();
        setIsMobileMenuOpen(false);
        navigate('/');
    };

    const navItems = [
        { label: 'Home',          id: 'home',         link: '/home' },
        { label: 'Destinations',  id: 'destinations', link: '/destination' },
        { label: 'Accomodations', id: 'accomodations',link: '/accomodations' },
        { label: 'Contact',       id: 'contact',      link: '/contact' },
    ];

    const textColor   = isScrolled ? 'text-[#1A1464] hover:text-accent' : 'text-white hover:text-accent';
    const borderColor = 'bg-accent';

    // Auth button — berubah berdasarkan status login
    const AuthButton = () => {
        if (loading) {
            return <div className="w-24 h-9 rounded-md bg-white/20 animate-pulse" />;
        }

        if (user) {
            return (
                <div className="flex items-center gap-2">
                    {isAdmin() && (
                    <Button
                        onClick={() => navigate('/dashboard/admin')}
                        variant="ghost"
                        className={`flex items-center gap-1.5 text-sm font-semibold transition-all duration-300 ${
                            isScrolled
                                ? 'text-[#1A1464]'
                                : 'text-white'
                        }`}
                    >
                        Admin Mode
                    </Button>
                    )}
                    <button
                        onClick={() => navigate('/map-destinations')}
                        className={`flex items-center gap-1.5 text-sm font-medium transition-colors duration-300 ${
                            isScrolled ? 'text-[#1A1464]' : 'text-white'
                        }`}
                    >
                        <Map size={15} />
                    </button>
                    <button
                        onClick={() => navigate('/profile')}
                        className={`flex items-center gap-1.5 text-sm font-medium transition-colors duration-300 ${
                            isScrolled ? 'text-[#1A1464]' : 'text-white'
                        }`}
                    >
                        <User size={15} />
                        {user.name?.split(' ')[0]}
                    </button>
                    <Button
                        onClick={handleLogout}
                        variant="ghost"
                        className={`flex items-center gap-1.5 text-sm font-semibold transition-all duration-300 ${
                            isScrolled
                                ? 'text-[#1A1464] hover:bg-red-50 hover:text-red-600'
                                : 'text-white hover:bg-white/10 hover:text-red-300'
                        }`}
                    >
                        <LogOut size={15} />
                        Sign Out
                    </Button>
                </div>
            );
        }

        

        return (
            <Button
                onClick={() => navigate('/login')}
                className={`flex items-center gap-1.5 text-sm font-semibold transition-all duration-300 ${
                    isScrolled
                        ? 'bg-[#1A1464] hover:bg-accent text-white'
                        : 'bg-white hover:bg-accent text-[#1A1464] hover:text-white'
                }`}
            >
                <LogIn size={15} />
                Sign In
            </Button>
        );
    };

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
            isScrolled ? 'bg-background border-b border-gray-200' : 'bg-transparent'
        }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">

                    {/* Desktop nav */}
                    <nav className="hidden md:flex space-x-8">
                        {navItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => navigate(item.link)}
                                className={`text-md font-medium transition-all duration-300 relative group ${textColor}`}
                            >
                                {item.label}
                                <span className={`absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${borderColor}`} />
                            </button>
                        ))}
                    </nav>

                    {/* Desktop auth */}
                    <div className="hidden md:flex gap-3">
                        <AuthButton />
                    </div>

                    {/* Mobile burger */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className={`md:hidden transition-colors duration-300 ${
                            isScrolled ? 'text-[#1A1464]' : 'text-white'
                        }`}
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile menu */}
            {isMobileMenuOpen && (
                <div className={`md:hidden transition-colors duration-300 ${
                    isScrolled
                        ? 'bg-white border-t border-gray-200'
                        : 'bg-[#1A1464]/95 backdrop-blur-md border-t border-white/10'
                }`}>
                    <nav className="px-4 py-4 space-y-3">
                        {navItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => scrollToSection(item.id)}
                                className={`block w-full text-left py-2 transition-colors duration-300 ${
                                    isScrolled
                                        ? 'text-[#1A1464] hover:text-accent'
                                        : 'text-white hover:text-accent'
                                }`}
                            >
                                {item.label}
                            </button>
                        ))}
                    </nav>

                    <div className="px-4 pb-4">
                        {!loading && (
                            user ? (
                                <div className="space-y-2">
                                    <p className={`text-sm font-medium px-1 ${
                                        isScrolled ? 'text-[#1A1464]' : 'text-white/70'
                                    }`}>
                                        Halo, {user.name?.split(' ')[0]}
                                    </p>
                                    <Button
                                        onClick={handleLogout}
                                        className="w-full bg-red-500 hover:bg-red-600 text-white flex items-center justify-center gap-2"
                                    >
                                        <LogOut size={15} />
                                        Sign Out
                                    </Button>
                                </div>
                            ) : (
                                <Button
                                    onClick={() => { navigate('/login'); setIsMobileMenuOpen(false); }}
                                    className={`w-full flex items-center justify-center gap-2 transition-all duration-300 ${
                                        isScrolled
                                            ? 'bg-[#1A1464] hover:bg-accent text-white'
                                            : 'bg-white hover:bg-gray-100 text-[#1A1464]'
                                    }`}
                                >
                                    <LogIn size={15} />
                                    Sign In
                                </Button>
                            )
                        )}

                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;