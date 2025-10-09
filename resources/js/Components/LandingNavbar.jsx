import React, { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';

export default function LandingNavbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            const offsetTop = element.offsetTop - 80; // 80px untuk navbar height
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
        setIsOpen(false);
    };

    const navigationItems = [
       
        { name: 'Tentang Kami', sectionId: 'about' },
        { name: 'Jadwal Latihan', sectionId: 'schedule' },
        { name: 'Galeri Kegiatan', sectionId: 'gallery' },
        { name: 'Testimoni', sectionId: 'testimonials' },
    ];

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
            scrolled ? 'bg-white/90 shadow-lg' : 'bg-white/90 backdrop-blur-sm'
        }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20">
                    {/* Logo */}
                    <button 
                        onClick={() => scrollToSection('home')}
                        className="flex items-center hover:opacity-80 transition-opacity cursor-pointer"
                    >
                        <ApplicationLogo className="h-10 w-auto mr-4" />
                        <div className="text-left">
                            <div className="text-xl font-bold text-prismarine">UKM Tenis Lapangan</div>
                            <div className="text-xs text-gray-600">Universitas Sumatera Utara</div>
                        </div>
                    </button>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex lg:items-center lg:space-x-1">
                        {navigationItems.map((item) => (
                            <button
                                key={item.name}
                                onClick={() => scrollToSection(item.sectionId)}
                                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-prismarine hover:bg-prismarine/5 rounded-lg transition-colors duration-200"
                            >
                                {item.name}
                            </button>
                        ))}
                        
                        {/* Auth Buttons */}
                        <div className="flex items-center space-x-2 ml-4 pl-4 border-l border-gray-300">
                            <Link
                                href={route('login')}
                                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-prismarine hover:bg-prismarine/5 rounded-lg transition-colors duration-200"
                            >
                                Masuk
                            </Link>
                            <Link
                                href={route('register')}
                                className="px-5 py-2 text-sm font-semibold bg-gradient-to-r from-[#43CEA2] to-[#185A9D] text-white rounded-lg hover:shadow-lg transition-all duration-200"
                            >
                                Daftar
                            </Link>
                        </div>
                    </div>

                    {/* Mobile menu button */}
                    <div className="flex items-center lg:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-lg text-gray-700 hover:text-prismarine hover:bg-gray-100 focus:outline-none transition-colors"
                        >
                            <span className="sr-only">Open main menu</span>
                            {isOpen ? (
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            <div className={`lg:hidden transition-all duration-300 ease-in-out ${
                isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
            }`}>
                <div className="px-4 pt-2 pb-6 space-y-2 bg-white border-t border-gray-200 shadow-lg">
                    {navigationItems.map((item) => (
                        <button
                            key={item.name}
                            onClick={() => scrollToSection(item.sectionId)}
                            className="block w-full text-left px-4 py-3 text-base font-medium text-gray-700 hover:text-prismarine hover:bg-prismarine/5 rounded-lg transition-colors"
                        >
                            {item.name}
                        </button>
                    ))}
                    
                    {/* Mobile Auth Buttons */}
                    <div className="pt-4 space-y-2 border-t border-gray-200">
                        <Link
                            href={route('login')}
                            className="block w-full text-center px-4 py-3 text-base font-medium text-gray-700 hover:text-prismarine hover:bg-prismarine/5 rounded-lg transition-colors"
                        >
                            Masuk
                        </Link>
                        <Link
                            href={route('register')}
                            className="block w-full text-center px-4 py-3 text-base font-semibold bg-gradient-to-r from-[#43CEA2] to-[#185A9D] text-white rounded-lg hover:shadow-lg transition-all"
                        >
                            Daftar
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}
