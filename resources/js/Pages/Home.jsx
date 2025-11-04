import React, { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { titleCase, getFirstLettersFromName } from '@/utils/helpers';
const FeatureCard = ({ title, description, icon, link, color = "blue" }) => {
    const colorClasses = {
        blue: {
            gradient: "from-blue-500 to-blue-600",
            hover: "hover:from-blue-600 hover:to-blue-700",
            glow: "group-hover:shadow-blue-500/50"
        },
        green: {
            gradient: "from-green-500 to-green-600",
            hover: "hover:from-green-600 hover:to-green-700",
            glow: "group-hover:shadow-green-500/50"
        },
        purple: {
            gradient: "from-purple-500 to-purple-600",
            hover: "hover:from-purple-600 hover:to-purple-700",
            glow: "group-hover:shadow-purple-500/50"
        },
        orange: {
            gradient: "from-orange-500 to-orange-600",
            hover: "hover:from-orange-600 hover:to-orange-700",
            glow: "group-hover:shadow-orange-500/50"
        },
        pink: {
            gradient: "from-pink-500 to-pink-600",
            hover: "hover:from-pink-600 hover:to-pink-700",
            glow: "group-hover:shadow-pink-500/50"
        },
        teal: {
            gradient: "from-teal-500 to-teal-600",
            hover: "hover:from-teal-600 hover:to-teal-700",
            glow: "group-hover:shadow-teal-500/50"
        },
        yellow: {
            gradient: "from-yellow-500 to-yellow-600",
            hover: "hover:from-yellow-600 hover:to-yellow-700",
            glow: "group-hover:shadow-yellow-500/50"
        },
    };

    const colors = colorClasses[color];

    return (
        <Link 
            href={link} 
            className="group relative bg-white rounded-2xl p-7 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-transparent hover:-translate-y-2 overflow-hidden"
        >
            {/* Background Pattern - appears on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            {/* Content Container */}
            <div className="relative z-10"> 
                {/* Icon Container with Glow Effect */}
                <div className={`inline-flex p-5 rounded-2xl bg-gradient-to-br ${colors.gradient} ${colors.hover} shadow-xl ${colors.glow} mb-5 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                    {icon}
                </div>
                
                {/* Content */}
                <div className="space-y-3">
                    <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-prismarine transition-colors duration-300">
                        {title}
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed">
                        {description}
                    </p>
                </div>

                {/* Arrow Icon with Circle Background */}
                <div className="absolute top-7 right-7 w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                    <svg className="w-5 h-5 text-prismarine" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </div>
            </div>

            {/* Bottom Accent Line */}
            <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${colors.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}></div>
        </Link>
    );
};

export default function Home({ auth }) {
    const [showDropdown, setShowDropdown] = useState(false);

    const handleLogout = () => {
        router.post(route('logout'));
    };

    const features = [
        {
            title: 'Heregistrasi Anggota',
            description: 'Pendataan ulang anggota UKM Tenis USU',
            icon: <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>,
            link: '/members'
        },
        {
            title: 'Pengelolaan Jadwal',
            description: 'Manajemen jadwal latihan, pertandingan, dan event',
            icon: <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>,
            link: '/schedules'
        },
        {
            title: 'Absensi Digital',
            description: 'System absensi digital dengan QR Code dan validasi lokasi',
            icon: <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path></svg>,
            link: '/attendance'
        },
        {
            title: 'Manajemen Keuangan',
            description: 'Pengelolaan keuangan, pembayaran, dan laporan',
            icon: <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>,
            link: '/finance'
        },
        {
            title: 'Laporan & Rekapitulasi',
            description: 'Akses ke berbagai laporan dan statistik',
            icon: <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>,
            link: '/reports'
        },
        {
            title: 'Dokumentasi & Galeri',
            description: 'Galeri foto dan dokumentasi kegiatan',
            icon: <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>,
            link: '/gallery'
        },
        {
            title: 'Penilaian Pengurus',
            description: 'Sistem evaluasi kinerja pengurus',
            icon: <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path></svg>,
            link: '/evaluation'
        },
    ];

    return (
        <AppLayout title="Home" auth={auth}>
            {/* Hero Section - Enhanced */}
            <div className="relative bg-gradient-to-r from-[#43CEA2] via-[#2E8B9E] to-[#185A9D] text-white py-12 overflow-hidden">
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
                
                <div className="container mx-auto px-4 relative z-10">
                    <div className="flex justify-center">
                        {/* Member Profile Card - Enhanced */}
                        <div className="bg-white text-darkgray p-8 rounded-2xl shadow-2xl w-full max-w-8xl backdrop-blur-lg border border-gray-100 hover:shadow-3xl transition-shadow duration-300">
                            <div className="flex items-start space-x-6">
                                <div className="flex-shrink-0">
                                    <div className="w-20 h-20 bg-gradient-to-br from-prismarine to-blue-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold shadow-lg hover:scale-105 transition-transform duration-300">
                                        {getFirstLettersFromName(auth.user.name)}
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between mb-3">
                                        <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">{titleCase(auth.user.name)}</h3>
                                        <div className="flex items-center space-x-2">
                                            <span className="px-4 py-1.5 bg-gradient-to-r from-prismarine to-teal-600 text-white text-sm rounded-full font-semibold shadow-md">KETUA</span>

                                            {/* Logout Dropdown */}
                                            <div className="relative">
                                                <button
                                                    onClick={() => setShowDropdown(!showDropdown)}
                                                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                                                    aria-label="Menu"
                                                >
                                                    <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                                                    </svg>
                                                </button>

                                                {showDropdown && (
                                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
                                                        <div className="py-2">
                                                            <Link
                                                                href="/profile"
                                                                className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                                                            >
                                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                                </svg>
                                                                <span>Profil</span>
                                                            </Link>
                                                            <Link
                                                                href="/settings"
                                                                className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                                                            >
                                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                                </svg>
                                                                <span>Pengaturan</span>
                                                            </Link>
                                                            <div className="border-t border-gray-200 my-2"></div>
                                                            <button
                                                                onClick={handleLogout}
                                                                className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 transition-colors w-full text-left"
                                                            >
                                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                                                </svg>
                                                                <span>Logout</span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <div className="flex items-center space-x-2">
                                            <svg className="w-5 h-5 text-prismarine" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                                            </svg>
                                            <div>
                                                <div className="text-xs text-gray-500 font-medium">NIM</div>
                                                <div className="font-bold text-gray-800">{auth.user.nim}</div>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <svg className="w-5 h-5 text-prismarine" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                            </svg>
                                            <div>
                                                <div className="text-xs text-gray-500 font-medium">Fakultas</div>
                                                <div className="font-bold text-gray-800">{titleCase(auth.user.fakultas)}</div>
                                            </div>
                                        </div>
                                        <div className="pt-3 flex items-center space-x-3">
                                            <button className="px-5 py-2.5 bg-gradient-to-r from-prismarine to-teal-600 text-white rounded-xl hover:shadow-lg hover:scale-105 transition-all duration-300 text-sm font-semibold">
                                                Lihat Profil
                                            </button>
                                            <button className="px-5 py-2.5 border-2 border-prismarine text-prismarine rounded-xl hover:bg-prismarine/5 hover:scale-105 transition-all duration-300 text-sm font-semibold">
                                                Edit Profil
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Feature Cards Section - Ultra Enhanced */}
            <div className="relative bg-gradient-to-b from-gray-50 via-white to-gray-50 py-10 overflow-hidden">
                {/* Decorative Background Elements */}
                <div className="absolute inset-0">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-prismarine/5 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-teal-500/5 to-purple-500/5 rounded-full blur-3xl"></div>
                </div>
                
                <div className="container mx-auto max-w-7xl relative z-10">
                    {/* Enhanced Header Section */}
                    <div className="text-center">
                        {/* Badge with Icon */}
                        <div className="inline-flex items-center space-x-2 mb-10 px-5 py-2.5 bg-gradient-to-r from-prismarine/10 via-teal-500/10 to-blue-500/10 border border-prismarine/20 rounded-full shadow-lg backdrop-blur-sm">
                            <span className="text-prismarine font-bold text-sm tracking-wide uppercase">Pilihan Menu Untuk Anda</span>
                 
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-5">
                        <FeatureCard
                            title="Jadwal Latihan"
                            description="Lihat dan kelola jadwal latihan, turnamen, dan event UKM dengan mudah"
                            icon={
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            }
                            link="/schedules"
                            color="blue"
                        />

                        <FeatureCard
                            title="Absensi Digital"
                            description="Catat kehadiran dengan scan QR atau input manual secara real-time"
                            icon={
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                                </svg>
                            }
                            link="/attendance"
                            color="teal"
                        />

                        <FeatureCard
                            title="Manajemen Keuangan"
                            description="Kelola iuran, pembayaran, dan laporan keuangan dengan transparan"
                            icon={
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            }
                            link="/finance"
                            color="green"
                        />

                        <FeatureCard
                            title="Penilaian Pengurus"
                            description="Sistem evaluasi kinerja pengurus yang objektif dan terstruktur"
                            icon={
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                </svg>
                            }
                            link="/evaluation"
                            color="yellow"
                        />

                        <FeatureCard
                            title="Laporan & Rekapitulasi"
                            description="Akses berbagai laporan dan statistik lengkap untuk monitoring"
                            icon={
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                            }
                            link="/reports"
                            color="orange"
                        />

                        <FeatureCard
                            title="Galeri Dokumentasi"
                            description="Upload dan lihat dokumentasi kegiatan serta prestasi UKM"
                            icon={
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            }
                            link="/gallery"
                            color="pink"
                        />
                    </div>
                </div>
            </div>

            {/* Training Schedule and Calendar Section */}
            <div className="bg-white py-12">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                        {/* Left: Training Schedule */}
                        <div className="order-1 lg:order-1">
                            <h2 className="text-2xl font-bold text-darkgray mb-6">Jadwal Latihan</h2>

                            {/* Today's Schedule */}
                            <div className="bg-cream rounded-lg p-6 shadow-md mb-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-semibold text-darkgray">Hari Ini</h3>
                                    <span className="text-sm text-gray-500">3 Oktober 2025</span>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <div className="w-16 h-16 bg-prismarine rounded-full flex items-center justify-center">
                                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-semibold text-darkgray">Latihan Rutin</h4>
                                        <p className="text-gray-600">15:00 - 17:00 WIB</p>
                                        <p className="text-gray-600">Lapangan Tenis USU</p>
                                    </div>
                                    <div className="ml-auto">
                                        <span className="px-4 py-2 bg-[#F4CE14] text-darkgray rounded-full text-sm font-semibold">
                                            Aktif
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Upcoming Schedule */}
                            <h3 className="text-lg font-semibold text-darkgray mb-4">Jadwal Mendatang</h3>
                            <div className="space-y-4">
                                {/* Schedule Item 1 */}
                                <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-4">
                                            <div className="text-center">
                                                <div className="text-sm font-semibold text-gray-500">SAB</div>
                                                <div className="text-xl font-bold text-darkgray">5</div>
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-darkgray">Latihan Rutin</h4>
                                                <p className="text-sm text-gray-600">15:00 - 17:00 WIB</p>
                                            </div>
                                        </div>
                                        <span className="text-sm text-gray-500">Lapangan Tenis USU</span>
                                    </div>
                                </div>

                                {/* Schedule Item 2 */}
                                <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-4">
                                            <div className="text-center">
                                                <div className="text-sm font-semibold text-gray-500">MIN</div>
                                                <div className="text-xl font-bold text-darkgray">6</div>
                                            </div>
                                            <div>
                                                <h4 className="font-semibold text-darkgray">Sparing Partner</h4>
                                                <p className="text-sm text-gray-600">08:00 - 11:00 WIB</p>
                                            </div>
                                        </div>
                                        <span className="text-sm text-gray-500">Lapangan Tenis USU</span>
                                    </div>
                                </div>
                            </div>

                            {/* View All Link */}
                            <div className="mt-6 text-center">
                                <Link
                                    href="/schedules"
                                    className="inline-flex items-center text-prismarine hover:text-prismarine/80 font-semibold"
                                >
                                    Lihat Semua Jadwal
                                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                    </svg>
                                </Link>
                            </div>
                        </div>

                        {/* Right: Calendar */}
                        <div className="order-2 lg:order-2">
                            <h2 className="text-2xl font-bold text-darkgray mb-6">Kalender Kegiatan</h2>
                            <div className="bg-cream rounded-lg p-6 shadow-md">

                                {/* Calendar Header */}
                                <div className="flex items-center justify-between mb-4">
                                    <button className="p-2 hover:bg-gray-200 rounded-full">
                                        <svg className="w-5 h-5 text-darkgray" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                                        </svg>
                                    </button>
                                    <h3 className="text-lg font-semibold text-darkgray">Oktober 2025</h3>
                                    <button className="p-2 hover:bg-gray-200 rounded-full">
                                        <svg className="w-5 h-5 text-darkgray" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                </div>

                                {/* Calendar Grid */}
                                <div className="mb-4">
                                    {/* Days of week */}
                                    <div className="grid grid-cols-7 gap-2 mb-2">
                                        {['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'].map((day) => (
                                            <div key={day} className="text-center text-sm font-semibold text-gray-600">
                                                {day}
                                            </div>
                                        ))}
                                    </div>

                                    {/* Calendar dates */}
                                    <div className="grid grid-cols-7 gap-2">
                                        {/* Previous month dates */}
                                        {[28, 29, 30].map((date) => (
                                            <div key={date} className="text-center py-2 text-gray-400">
                                                {date}
                                            </div>
                                        ))}

                                        {/* Current month dates */}
                                        {Array.from({ length: 31 }, (_, i) => i + 1).map((date) => (
                                            <div
                                                key={date}
                                                className={`text-center py-2 rounded-full cursor-pointer hover:bg-prismarine hover:text-white transition-colors
                    ${date === 3 ? 'bg-prismarine text-white' : ''}
                    ${[5, 6, 12, 13, 19, 20, 26, 27].includes(date) ? 'border-2 border-prismarine' : ''}
                  `}
                                            >
                                                {date}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Legend */}
                                <div className="border-t border-gray-200 pt-4">
                                    <div className="flex items-center space-x-4">
                                        <div className="flex items-center">
                                            <div className="w-3 h-3 bg-prismarine rounded-full mr-2"></div>
                                            <span className="text-sm text-gray-600">Hari Ini</span>
                                        </div>
                                        <div className="flex items-center">
                                            <div className="w-3 h-3 border-2 border-prismarine rounded-full mr-2"></div>
                                            <span className="text-sm text-gray-600">Jadwal Latihan</span>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
            {/* Statistics Cards - Enhanced */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 py-16">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-800 mb-2">Statistik UKM</h2>
                        <p className="text-gray-600">Data terkini aktivitas dan performa</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Total Anggota */}
                        <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl p-7 border-l-4 border-blue-500 hover:-translate-y-1 transition-all duration-300">
                            <div className="flex items-start justify-between mb-4">
                                <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-4 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                </div>
                            </div>
                            <div>
                                <p className="text-gray-500 text-sm font-semibold uppercase tracking-wide mb-2">Total Anggota</p>
                                <p className="text-4xl font-bold text-gray-800 mb-2">156</p>
                                <div className="flex items-center text-sm">
                                    <span className="text-green-600 font-semibold flex items-center">
                                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                        </svg>
                                        +12
                                    </span>
                                    <span className="text-gray-500 ml-1">dari bulan lalu</span>
                                </div>
                            </div>
                        </div>

                        {/* Latihan Bulan Ini */}
                        <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl p-7 border-l-4 border-green-500 hover:-translate-y-1 transition-all duration-300">
                            <div className="flex items-start justify-between mb-4">
                                <div className="bg-gradient-to-br from-green-500 to-green-600 p-4 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </div>
                            </div>
                            <div>
                                <p className="text-gray-500 text-sm font-semibold uppercase tracking-wide mb-2">Latihan Bulan Ini</p>
                                <p className="text-4xl font-bold text-gray-800 mb-2">18</p>
                                <p className="text-gray-600 text-sm">
                                    <span className="font-semibold text-green-600">8 terlaksana</span> • 10 akan datang
                                </p>
                            </div>
                        </div>

                        {/* Tingkat Kehadiran */}
                        <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl p-7 border-l-4 border-yellow-500 hover:-translate-y-1 transition-all duration-300">
                            <div className="flex items-start justify-between mb-4">
                                <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 p-4 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                            </div>
                            <div>
                                <p className="text-gray-500 text-sm font-semibold uppercase tracking-wide mb-2">Tingkat Kehadiran</p>
                                <p className="text-4xl font-bold text-gray-800 mb-2">87%</p>
                                <p className="text-gray-600 text-sm">
                                    Rata-rata <span className="font-semibold text-yellow-600">bulan ini</span>
                                </p>
                            </div>
                        </div>

                        {/* Turnamen Aktif */}
                        <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl p-7 border-l-4 border-purple-500 hover:-translate-y-1 transition-all duration-300">
                            <div className="flex items-start justify-between mb-4">
                                <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-4 rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                                    </svg>
                                </div>
                            </div>
                            <div>
                                <p className="text-gray-500 text-sm font-semibold uppercase tracking-wide mb-2">Turnamen Aktif</p>
                                <p className="text-4xl font-bold text-gray-800 mb-2">3</p>
                                <p className="text-gray-600 text-sm">
                                    <span className="font-semibold text-purple-600">2 internal</span> • 1 eksternal
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Announcements and Recent Activities */}
            <div className="bg-white py-12">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                        {/* Announcements - Takes 2 columns */}
                        <div className="lg:col-span-2">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold text-darkgray">Pengumuman Terbaru</h2>
                                <Link href="/announcements" className="text-prismarine hover:text-prismarine/80 text-sm font-semibold">
                                    Lihat Semua
                                </Link>
                            </div>

                            <div className="space-y-4">
                                {/* Announcement 1 */}
                                <div className="bg-gradient-to-r from-prismarine/10 to-transparent border-l-4 border-prismarine rounded-lg p-6 hover:shadow-md transition-shadow">
                                    <div className="flex items-start space-x-4">
                                        <div className="bg-prismarine p-3 rounded-full flex-shrink-0">
                                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                                            </svg>
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between mb-2">
                                                <h3 className="text-lg font-semibold text-darkgray">Pendaftaran Turnamen Internal 2025</h3>
                                                <span className="text-xs text-gray-500">2 hari lalu</span>
                                            </div>
                                            <p className="text-gray-600 mb-3">
                                                Pendaftaran turnamen internal UKM Tenis USU telah dibuka! Segera daftarkan diri Anda sebelum 15 Oktober 2025. Hadiah menarik menanti para pemenang.
                                            </p>
                                            <div className="flex items-center space-x-4">
                                                <span className="px-3 py-1 bg-red-100 text-red-600 text-xs font-semibold rounded-full">Penting</span>
                                                <Link href="/tournaments/register" className="text-prismarine hover:text-prismarine/80 text-sm font-semibold">
                                                    Daftar Sekarang →
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Announcement 2 */}
                                <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                                    <div className="flex items-start space-x-4">
                                        <div className="bg-blue-500 p-3 rounded-full flex-shrink-0">
                                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between mb-2">
                                                <h3 className="text-lg font-semibold text-darkgray">Perubahan Jadwal Latihan</h3>
                                                <span className="text-xs text-gray-500">5 hari lalu</span>
                                            </div>
                                            <p className="text-gray-600 mb-3">
                                                Latihan hari Sabtu, 12 Oktober 2025 dimajukan menjadi pukul 07:00 - 10:00 WIB. Mohon perhatiannya!
                                            </p>
                                            <span className="px-3 py-1 bg-blue-100 text-blue-600 text-xs font-semibold rounded-full">Informasi</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Announcement 3 */}
                                <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                                    <div className="flex items-start space-x-4">
                                        <div className="bg-green-500 p-3 rounded-full flex-shrink-0">
                                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between mb-2">
                                                <h3 className="text-lg font-semibold text-darkgray">Pembayaran Iuran Bulanan</h3>
                                                <span className="text-xs text-gray-500">1 minggu lalu</span>
                                            </div>
                                            <p className="text-gray-600 mb-3">
                                                Pengingat: Pembayaran iuran bulanan Oktober 2025 dapat dilakukan melalui sistem keuangan online. Batas akhir pembayaran 20 Oktober 2025.
                                            </p>
                                            <div className="flex items-center space-x-4">
                                                <span className="px-3 py-1 bg-yellow-100 text-yellow-600 text-xs font-semibold rounded-full">Pengingat</span>
                                                <Link href="/finance/payment" className="text-prismarine hover:text-prismarine/80 text-sm font-semibold">
                                                    Bayar Sekarang →
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Recent Activities - Takes 1 column */}
                        <div>
                            <h2 className="text-2xl font-bold text-darkgray mb-8">Aktivitas Terkini</h2>

                            <div className="bg-cream rounded-lg p-6 shadow-md">
                                <div className="space-y-6">
                                    {/* Activity 1 */}
                                    <div className="flex items-start space-x-3">
                                        <div className="w-2 h-2 bg-prismarine rounded-full mt-2 flex-shrink-0"></div>
                                        <div className="flex-1">
                                            <p className="text-sm text-gray-800">
                                                <span className="font-semibold">Ahmad Zaki</span> melakukan absensi latihan
                                            </p>
                                            <p className="text-xs text-gray-500 mt-1">5 menit lalu</p>
                                        </div>
                                    </div>

                                    {/* Activity 2 */}
                                    <div className="flex items-start space-x-3">
                                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                                        <div className="flex-1">
                                            <p className="text-sm text-gray-800">
                                                <span className="font-semibold">Sarah Putri</span> mendaftar turnamen internal
                                            </p>
                                            <p className="text-xs text-gray-500 mt-1">15 menit lalu</p>
                                        </div>
                                    </div>

                                    {/* Activity 3 */}
                                    <div className="flex items-start space-x-3">
                                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                                        <div className="flex-1">
                                            <p className="text-sm text-gray-800">
                                                <span className="font-semibold">Budi Santoso</span> mengunggah foto galeri
                                            </p>
                                            <p className="text-xs text-gray-500 mt-1">1 jam lalu</p>
                                        </div>
                                    </div>

                                    {/* Activity 4 */}
                                    <div className="flex items-start space-x-3">
                                        <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                                        <div className="flex-1">
                                            <p className="text-sm text-gray-800">
                                                <span className="font-semibold">Admin</span> membuat jadwal latihan baru
                                            </p>
                                            <p className="text-xs text-gray-500 mt-1">2 jam lalu</p>
                                        </div>
                                    </div>

                                    {/* Activity 5 */}
                                    <div className="flex items-start space-x-3">
                                        <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                                        <div className="flex-1">
                                            <p className="text-sm text-gray-800">
                                                <span className="font-semibold">Rina Andini</span> melakukan pembayaran iuran
                                            </p>
                                            <p className="text-xs text-gray-500 mt-1">3 jam lalu</p>
                                        </div>
                                    </div>

                                    {/* Activity 6 */}
                                    <div className="flex items-start space-x-3">
                                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                                        <div className="flex-1">
                                            <p className="text-sm text-gray-800">
                                                <span className="font-semibold">Dimas Prasetyo</span> menyelesaikan profil
                                            </p>
                                            <p className="text-xs text-gray-500 mt-1">5 jam lalu</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6 pt-4 border-t border-gray-200 pb-16">
                                    <Link href="/activities" className="text-prismarine hover:text-prismarine/80 text-sm font-semibold flex items-center justify-center">
                                        Lihat Semua Aktivitas
                                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            







        </AppLayout>
    );
}