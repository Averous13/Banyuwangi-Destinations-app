import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Menu, X } from 'lucide-react';

const Header = () => {
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isDark, setIsDark ] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            const heroSection = document.getElementById('hero');
            // console.log(heroSection);
            if (!heroSection) {
                setIsScrolled(true);
                return;
            }

            const heroBottom = heroSection.offsetHeight;
            setIsScrolled(window.scrollY > heroBottom - 100);
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
    }

    const navItems = [
        { label: 'Home', id: 'home' , link: '/home'},
        { label: 'Destinations', id: 'destinations', link: '/destination' },
        { label: 'Accomodations', id: 'accomodations', link: '/accomodations' },
        { label: 'Contact', id: 'contact', link: '/contact' },
    ];


    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500
                ${!isScrolled
                    ? 'bg-transparent'
                    : 'bg-background border-b border-gray-200'
                }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    
                    {/* Navigation Links - Desktop */}
                    <nav className="hidden md:flex space-x-8">
                        {navItems.map((item) => (
                            <button
                                onMouseEnter={() => console.log('Hover:', item.label)}
                                key={item.id}
                                onClick={() => navigate(item.link)}
                                className={`text-md font-medium transition-all duration-300 relative group ${
                                    isScrolled 
                                        ? 'text-[#1A1464] hover:text-accent'
                                        : 'text-white hover:text-accent' 
                                }`}
                            >
                                {item.label}
                                {/* Tambahkan background color di span */}
                                <span className={`absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${
                                    isScrolled 
                                        ? 'bg-accent' 
                                        : 'bg-accent'
                                }`}></span>
                            </button>
                        ))}
                    </nav>

                    {/* Sign Up Button - Desktop */}
                    <div className="hidden md:flex gap-3">
                        <Button
                            onClick={() => navigate('/login')}
                            className={`transition-all text-md duration-300 font-semibold ${
                                isScrolled
                                    ? 'bg-[#1A1464] hover:bg-accent text-white'
                                    : 'bg-white hover:bg-accent text-[#1A1464] hover:text-white'
                            }`}
                        >
                            Sign In
                        </Button>
                    </div>

                    {/* Mobile Menu Button */}
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

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div
                    className={`md:hidden transition-colors duration-300 ${
                        isScrolled 
                            ? 'bg-white border-t border-gray-200' 
                            : 'bg-[#1A1464]/95 backdrop-blur-md border-t border-white/10'
                    }`}
                >
                    <nav className="px-4 py-4 space-y-3">
                        {navItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => scrollToSection(item.id)}
                                className={`block w-full text-left py-2 transition-colors duration-300 ${
                                    isScrolled
                                        ? 'text-[#1A1464] hover:text-[#00BCD4]'
                                        : 'text-white hover:text-[#00BCD4]'
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
                                isScrolled
                                    ? 'bg-[#1A1464] hover:bg-[#2E1A47] text-white'
                                    : 'bg-white hover:bg-gray-100 text-[#1A1464]'
                            }`}
                        >
                            Sign In
                        </Button>
                    </div>
                </div>
            )}
        </header>
    )
}

export default Header;