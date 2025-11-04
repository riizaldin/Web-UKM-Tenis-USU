import React, { useState, useRef, useEffect } from 'react';
import { Link, usePage, router } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';

export default function Navbar({ auth }) {
    const [isOpen, setIsOpen] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const dropdownRef = useRef(null);
    const { url } = usePage();

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);
    

    const navigation = [
        { name: 'Beranda', href: '/home', pattern: /^\/(home)?$/ },
        { name: 'Jadwal', href: '/schedules', pattern: /^\/schedules/ },
        { name: 'Absensi', href: '/attendance', pattern: /^\/attendance/ },
        { name: 'Keuangan', href: '/finance', pattern: /^\/finance/ },
        { name: 'Penilaian', href: '/evaluation', pattern: /^\/evaluation/ },
        { name: 'Laporan', href: '/reports', pattern: /^\/reports/ },
        { name: 'Galeri', href: '/gallery', pattern: /^\/gallery/ },
    ];

    const isActive = (pattern) => {
        return pattern.test(url);
    };

    const handleLogout = () => {
        router.post(route('logout'));
        setShowLogoutModal(false);
    };

    const getInitials = (name) => {
        if (!name) return 'U';
        const names = name.split(' ');
        if (names.length >= 2) {
            return names[0][0] + names[1][0];
        }
        return name.substring(0, 2).toUpperCase();
    };
    console.log(auth)
    return (
        <nav className="bg-white shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20">
                    {/* Logo and primary nav */}
                    <div className="flex">
                        {/* Logo */}
                        <button
                            onClick={() => router.visit('/home')}
                            className="flex items-center hover:opacity-80 transition-opacity cursor-pointer"
                        >
                            <ApplicationLogo className="h-10 w-auto mr-4" />
                            <div className="text-left">
                                <div className="text-xl font-bold text-prismarine">UKM Tenis USU</div>
                                <div className="text-xs text-gray-600">Universitas Sumatera Utara</div>
                            </div>
                        </button>

                        {/* Primary Nav */}
                        <div className="hidden sm:ml-16 sm:flex sm:space-x-8">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 transition-colors duration-200 ${isActive(item.pattern)
                                            ? 'text-prismarine border-prismarine'
                                            : 'text-gray-500 border-transparent hover:text-prismarine hover:border-prismarine'
                                        }`}
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Right side menu */}
                    <div className="hidden sm:ml-6 sm:flex sm:items-center">
                        {auth?.user ? (
                            <div className="relative" ref={dropdownRef}>
                                <button
                                    onClick={() => setShowDropdown(!showDropdown)}
                                    className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-prismarine"
                                >
                                    {/* Profile Photo */}
                                    <div className="w-10 h-10 bg-gradient-to-br from-prismarine to-blue-600 rounded-full flex items-center justify-center text-white font-bold shadow-md">
                                        {getInitials(auth.user.name)}
                                    </div>
                                    {/* Name */}
                                    <div className="text-left">
                                        <div className="text-sm font-semibold text-gray-800">{auth.user.name}</div>
                                        <div className="text-xs text-gray-500">Anggota</div>
                                    </div>
                                    {/* Dropdown Arrow */}
                                    <svg
                                        className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${showDropdown ? 'rotate-180' : ''}`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>

                                {/* Dropdown Menu */}
                                {showDropdown && (
                                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-200 z-50 py-2 animate-fade-in">
                                        {/* User Info Header */}
                                        <div className="px-4 py-3 border-b border-gray-200">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-12 h-12 bg-gradient-to-br from-prismarine to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                                                    {getInitials(auth.user.name)}
                                                </div>
                                                <div>
                                                    <div className="text-sm font-semibold text-gray-800">{auth.user.name}</div>
                                                    <div className="text-xs text-gray-500">{auth.user.email}</div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Menu Items */}
                                        <div className="py-2">
                                            <Link
                                                href={route('profile.edit')}
                                                className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-prismarine/5 hover:text-prismarine transition-colors"
                                                onClick={() => setShowDropdown(false)}
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                </svg>
                                                <div>
                                                    <div className="font-medium">Edit Profil</div>
                                                    <div className="text-xs text-gray-500">Kelola informasi akun</div>
                                                </div>
                                            </Link>

                                            <button
                                                onClick={() => {
                                                    setShowDropdown(false);
                                                    setShowLogoutModal(true);
                                                }}
                                                className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                                            >
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                                </svg>
                                                <div>
                                                    <div className="font-medium">Keluar</div>
                                                    <div className="text-xs text-red-500">Logout dari akun</div>
                                                </div>
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="flex items-center space-x-4">
                                <Link
                                    href={route('login')}
                                    className="text-sm text-gray-500 hover:text-prismarine"
                                >
                                    Masuk
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="text-sm bg-prismarine text-white px-4 py-2 rounded-lg hover:bg-prismarine/90 transition duration-150"
                                >
                                    Daftar
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="flex items-center sm:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-prismarine"
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
            {isOpen && (
                <div className="sm:hidden">
                    <div className="pt-2 pb-3 space-y-1">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={`block pl-3 pr-4 py-2 text-base font-medium ${isActive(item.pattern)
                                        ? 'text-prismarine bg-teal-50 border-l-4 border-prismarine'
                                        : 'text-gray-500 hover:text-prismarine hover:bg-gray-50'
                                    }`}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>
                    {auth?.user ? (
                        <div className="pt-4 pb-3 border-t border-gray-200">
                            <div className="flex items-center px-4 mb-3">
                                <div className="flex-shrink-0">
                                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-prismarine to-blue-600 text-white flex items-center justify-center text-lg font-bold">
                                        {getInitials(auth.user.name)}
                                    </div>
                                </div>
                                <div className="ml-3">
                                    <div className="text-base font-semibold text-gray-800">{auth.user.name}</div>
                                    <div className="text-sm text-gray-500">{auth.user.email}</div>
                                </div>
                            </div>
                            <div className="space-y-1 px-2">
                                <Link
                                    href={route('profile.edit')}
                                    className="flex items-center space-x-3 px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:bg-prismarine/5 hover:text-prismarine"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                    <span>Edit Profil</span>
                                </Link>
                                <button
                                    onClick={() => {
                                        setIsOpen(false);
                                        setShowLogoutModal(true);
                                    }}
                                    className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-base font-medium text-red-600 hover:bg-red-50"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                    </svg>
                                    <span>Keluar</span>
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="pt-4 pb-3 border-t border-gray-200">
                            <div className="space-y-1">
                                <Link
                                    href={route('login')}
                                    className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-prismarine hover:bg-gray-50"
                                >
                                    Masuk
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-prismarine hover:bg-gray-50"
                                >
                                    Daftar
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Logout Confirmation Modal */}
            {showLogoutModal && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 animate-fade-in">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 transform transition-all animate-scale-in">
                        {/* Icon */}
                        <div className="flex justify-center mb-4">
                            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                            </div>
                        </div>

                        {/* Title */}
                        <h3 className="text-xl font-bold text-gray-900 text-center mb-2">
                            Yakin ingin keluar?
                        </h3>

                        {/* Message */}
                        <p className="text-gray-600 text-center mb-6">
                            Anda akan keluar dari akun dan perlu login kembali untuk mengakses aplikasi.
                        </p>

                        {/* Buttons */}
                        <div className="flex space-x-3">
                            <button
                                onClick={() => setShowLogoutModal(false)}
                                className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                Batal
                            </button>
                            <button
                                onClick={handleLogout}
                                className="flex-1 px-4 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-lg hover:from-red-600 hover:to-red-700 transition-all shadow-lg hover:shadow-xl"
                            >
                                Ya, Keluar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}