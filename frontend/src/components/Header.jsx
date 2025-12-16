import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Menu, X } from 'lucide-react';

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setIsMobileMenuOpen(false);
        }
    }

    const navItems = [
        { label: 'Home', id: 'home' },
        { label: 'Destinations', id: 'destinations' },
        { label: 'Accomodations', id: 'accomodations' },
        { label: 'Contact', id: 'contact' },
    ];

    // Dark mode (di atas hero) vs Light mode (setelah scroll)
    const isDark = !isScrolled;

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
                isDark 
                    ? 'bg-transparent' 
                    : 'bg-white shadow-lg border-b border-gray-200'
            }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    
                    {/* Logo */}
                    {/* <div className="flex-shrink-0">
                        <h1 className={`text-2xl font-bold transition-colors duration-300 ${
                            isDark ? 'text-white' : 'text-[#1A1464]'
                        }`}>
                            Tour de Ijen
                        </h1>
                    </div> */}

                    {/* Navigation Links - Desktop */}
                    <nav className="hidden md:flex space-x-8">
                        {navItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => scrollToSection(item.id)}
                                className={`text-sm font-medium transition-all duration-300 relative group ${
                                    isDark 
                                        ? 'text-white hover:text-[#00BCD4]' 
                                        : 'text-[#1A1464] hover:text-[#00BCD4]'
                                }`}
                            >
                                {item.label}
                                <span className={`absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${
                                    isDark ? 'bg-[#00BCD4]' : 'bg-[#00BCD4]'
                                }`}></span>
                            </button>
                        ))}
                    </nav>

                    {/* Sign Up Button - Desktop */}
                    <div className="hidden md:flex gap-3 ">
                        <Button
                            onClick={() => scrollToSection('contact')}
                            className={`transition-all duration-300 font-semibold ${
                                isDark
                                    ? 'bg-background hover:bg-[#00ACC1] text-black'
                                    : 'bg-[#1A1464] hover:bg-[#2E1A47] text-white'
                            }`}
                        >
                            Sign-Up
                        </Button>

                        <Button
                            onClick={() => scrollToSection('contact')}
                            className={`transition-all duration-300 font-semibold ${
                                isDark
                                    ? 'bg-background hover:bg-[#00ACC1] text-black'
                                    : 'bg-[#1A1464] hover:bg-[#2E1A47] text-white'
                            }`}
                        >
                            Sign-In
                        </Button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className={`md:hidden transition-colors duration-300 ${
                            isDark ? 'text-white' : 'text-[#1A1464]'
                        }`}
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div
                    className={`md:hidden transition-colors duration-300 ${
                        isDark 
                            ? 'bg-[#1A1464]/95 backdrop-blur-md border-t border-white/10 ' 
                            : 'bg-white border-t border-gray-200'
                    }`}
                >
                    <nav className="px-4 py-4 space-y-3">
                        {navItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => scrollToSection(item.id)}
                                className={`block w-full text-left py-2 transition-colors duration-300 ${
                                    isDark 
                                        ? 'text-white hover:text-[#00BCD4]' 
                                        : 'text-[#1A1464] hover:text-[#00BCD4]'
                                }`}
                            >
                                {item.label}
                            </button>
                        ))}
                    </nav>
                    <div className="px-4 pb-4 space-y-3">
                        <Button
                            onClick={() => scrollToSection('contact')}
                            className={`w-full transition-all duration-300 ${
                                isDark
                                    ? 'bg-background hover:bg-[#00ACC1] text-black'
                                    : 'bg-[#1A1464] hover:bg-[#2E1A47] text-white'
                            }`}
                        >
                            Sign-In
                        </Button>

                                                <Button
                            onClick={() => scrollToSection('contact')}
                            className={`w-full transition-all duration-300 ${
                                isDark
                                    ? 'bg-background hover:bg-[#00ACC1] text-black'
                                    : 'bg-[#1A1464] hover:bg-[#2E1A47] text-white'
                            }`}
                        >
                            Sign-Up
                        </Button>
                    </div>
                </div>
            )}
        </header>
    )
}

export default Header;