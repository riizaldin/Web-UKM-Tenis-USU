import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import ApplicationLogo from '@/Components/ApplicationLogo';

export default function Navbar({ auth }) {
    const [isOpen, setIsOpen] = useState(false);
    const { url } = usePage();

    const navigation = [
        { name: 'Beranda', href: '/home', pattern: /^\/(home)?$/ },
        { name: 'Jadwal', href: '/schedules', pattern: /^\/schedules/ },
        { name: 'Absensi', href: '/attendance', pattern: /^\/attendance/ },
        { name: 'Keuangan', href: '/finance', pattern: /^\/finance/ },
        { name: 'Laporan', href: '/reports', pattern: /^\/reports/ },
        { name: 'Galeri', href: '/gallery', pattern: /^\/gallery/ },
    ];

    const isActive = (pattern) => {
        return pattern.test(url);
    };

    return (
        <nav className="bg-white shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    {/* Logo and primary nav */}
                    <div className="flex">
                        {/* Logo */}
                        <div className="flex-shrink-0 flex items-center">
                            <ApplicationLogo className="h-9 w-auto mr-4" />
                            <Link href="/home">
                                <span className="text-xl font-bold text-prismarine mr-12">Tennis USU </span>
                            </Link>
                        </div>

                        {/* Primary Nav */}
                        <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 transition-colors duration-200 ${
                                        isActive(item.pattern)
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
                            <div className="relative ml-3 flex items-center space-x-4">
                                <Link
                                    href={route('profile.edit')}
                                    className="text-sm text-gray-500 hover:text-prismarine"
                                >
                                    {auth.user.name}
                                </Link>
                                <Link
                                    href={route('logout')}
                                    method="post"
                                    as="button"
                                    className="text-sm text-gray-500 hover:text-prismarine"
                                >
                                    Keluar
                                </Link>
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
                                className={`block pl-3 pr-4 py-2 text-base font-medium ${
                                    isActive(item.pattern)
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
                            <div className="flex items-center px-4">
                                <div className="flex-shrink-0">
                                    <div className="h-10 w-10 rounded-full bg-prismarine text-white flex items-center justify-center">
                                        {auth.user.name.charAt(0)}
                                    </div>
                                </div>
                                <div className="ml-3">
                                    <div className="text-base font-medium text-gray-800">{auth.user.name}</div>
                                    <div className="text-sm font-medium text-gray-500">{auth.user.email}</div>
                                </div>
                            </div>
                            <div className="mt-3 space-y-1">
                                <Link
                                    href={route('profile.edit')}
                                    className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-prismarine hover:bg-gray-50"
                                >
                                    Profil
                                </Link>
                                <Link
                                    href={route('logout')}
                                    method="post"
                                    as="button"
                                    className="block w-full text-left px-4 py-2 text-base font-medium text-gray-500 hover:text-prismarine hover:bg-gray-50"
                                >
                                    Keluar
                                </Link>
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
        </nav>
    );
}