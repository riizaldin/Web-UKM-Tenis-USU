import React, { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';

const FeatureCard = ({ title, description, icon, link }) => (
    <Link href={link} className="p-6 bg-[#F5F7F8] rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border-l-4 border-[#379777]">
        <div className="flex items-center space-x-4">
            <div className="bg-[#379777] p-3 rounded-full">
                {icon}
            </div>
            <div>
                <h3 className="text-xl font-semibold text-[#45474B] mb-2">{title}</h3>
                <p className="text-gray-600">{description}</p>
            </div>
        </div>
    </Link>
);

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
            
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-[#43CEA280]/100 to-[#185A9DB2]/100 text-white py-10">
                <div className="container mx-auto px-4">
                    <div className="flex justify-center">
                        {/* Member Profile Card */}
                        <div className="bg-white text-darkgray p-6 rounded-lg shadow-lg w-full ">
                            <div className="flex items-start space-x-4">
                                <div className="flex-shrink-0">
                                    <div className="w-16 h-16 bg-prismarine rounded-full flex items-center justify-center text-white text-2xl font-bold">
                                        RF
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between mb-2">
                                        <h3 className="text-xl font-bold">RIZALDI FEBRIANSYAH</h3>
                                        <div className="flex items-center space-x-2">
                                            <span className="px-3 py-1 bg-prismarine text-white text-sm rounded-full">KETUA</span>
                                            
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
                                    <div className="space-y-2">
                                        <div>
                                            <div className="text-sm text-gray-600">NIM</div>
                                            <div className="font-semibold">221402126</div>
                                        </div>
                                        <div>
                                            <div className="text-sm text-gray-600">Fakultas</div>
                                            <div className="font-semibold">Fakultas Ilmu Komputer dan Teknologi Informasi</div>
                                        </div>
                                        <div className="pt-2 flex items-center space-x-4">
                                            <button className="px-4 py-2 bg-prismarine text-white rounded-lg hover:bg-prismarine/90 transition-colors text-sm">
                                                Lihat Profil
                                            </button>
                                            <button className="px-4 py-2 border border-prismarine text-prismarine rounded-lg hover:bg-prismarine/10 transition-colors text-sm">
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
            {/* Statistics Cards */}
            <div className="bg-gray-50 py-8">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {/* Total Anggota */}
                        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-600 text-sm font-medium">Total Anggota</p>
                                    <p className="text-3xl font-bold text-gray-800 mt-2">156</p>
                                    <p className="text-green-600 text-sm mt-1">↑ 12 dari bulan lalu</p>
                                </div>
                                <div className="bg-blue-100 p-3 rounded-full">
                                    <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Latihan Bulan Ini */}
                        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-600 text-sm font-medium">Latihan Bulan Ini</p>
                                    <p className="text-3xl font-bold text-gray-800 mt-2">18</p>
                                    <p className="text-gray-600 text-sm mt-1">8 sudah terlaksana</p>
                                </div>
                                <div className="bg-green-100 p-3 rounded-full">
                                    <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Tingkat Kehadiran */}
                        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-yellow-500">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-600 text-sm font-medium">Tingkat Kehadiran</p>
                                    <p className="text-3xl font-bold text-gray-800 mt-2">87%</p>
                                    <p className="text-gray-600 text-sm mt-1">Rata-rata bulan ini</p>
                                </div>
                                <div className="bg-yellow-100 p-3 rounded-full">
                                    <svg className="w-8 h-8 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Turnamen Aktif */}
                        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-600 text-sm font-medium">Turnamen Aktif</p>
                                    <p className="text-3xl font-bold text-gray-800 mt-2">3</p>
                                    <p className="text-gray-600 text-sm mt-1">2 internal, 1 eksternal</p>
                                </div>
                                <div className="bg-purple-100 p-3 rounded-full">
                                    <svg className="w-8 h-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                                    </svg>
                                </div>
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

            {/* Feature Cards Section - Akses ke Semua Halaman */}
            <div className="bg-gray-50 py-12">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-bold text-darkgray mb-3">Akses cepat ke semua fitur sistem UKM Tenis Lapangan USU</h2>
                        <p className="text-gray-600">Beberapa pilihan menu untuk anda</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Jadwal Card */}
                        <Link href="/schedules" className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group">
                            <div className="bg-gradient-to-r from-green-500 to-green-600 p-6">
                                <div className="flex items-center justify-between">
                                    <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <svg className="w-6 h-6 text-white/70 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-darkgray mb-2">Jadwal Latihan</h3>
                                <p className="text-gray-600 text-sm mb-4">Lihat dan kelola jadwal latihan, turnamen, dan event UKM</p>
                                <div className="flex items-center space-x-4 text-sm text-gray-500">
                                    <span className="flex items-center">
                                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                        </svg>
                                        18 jadwal
                                    </span>
                                    <span>•</span>
                                    <span>8 bulan ini</span>
                                </div>
                            </div>
                        </Link>

                        {/* Absensi Card */}
                        <Link href="/attendance" className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group">
                            <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6">
                                <div className="flex items-center justify-between">
                                    <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                                        </svg>
                                    </div>
                                    <svg className="w-6 h-6 text-white/70 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-darkgray mb-2">Absensi</h3>
                                <p className="text-gray-600 text-sm mb-4">Catat kehadiran dengan scan QR atau input manual</p>
                                <div className="flex items-center space-x-4 text-sm text-gray-500">
                                    <span className="flex items-center">
                                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        87% kehadiran
                                    </span>
                                    <span>•</span>
                                    <span>8/10 hadir</span>
                                </div>
                            </div>
                        </Link>

                        {/* Keuangan Card */}
                        <Link href="/finance" className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group">
                            <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 p-6">
                                <div className="flex items-center justify-between">
                                    <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <svg className="w-6 h-6 text-white/70 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-darkgray mb-2">Keuangan</h3>
                                <p className="text-gray-600 text-sm mb-4">Bayar iuran kas dan lihat riwayat transaksi</p>
                                <div className="flex items-center space-x-4 text-sm text-gray-500">
                                    <span className="flex items-center">
                                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                                        </svg>
                                        Rp 50K tunggakan
                                    </span>
                                </div>
                            </div>
                        </Link>

                        {/* Penilaian Card */}
                        <Link href="/evaluation" className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group">
                            <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-6">
                                <div className="flex items-center justify-between">
                                    <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                        </svg>
                                    </div>
                                    <svg className="w-6 h-6 text-white/70 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-darkgray mb-2">Penilaian Pengurus</h3>
                                <p className="text-gray-600 text-sm mb-4">Berikan penilaian untuk kinerja pengurus UKM</p>
                                <div className="flex items-center space-x-4 text-sm text-gray-500">
                                    <span className="flex items-center">
                                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                                        </svg>
                                        6 pengurus
                                    </span>
                                    <span>•</span>
                                    <span>Anonim</span>
                                </div>
                            </div>
                        </Link>

                        {/* Laporan Card */}
                        <Link href="/reports" className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group">
                            <div className="bg-gradient-to-r from-red-500 to-red-600 p-6">
                                <div className="flex items-center justify-between">
                                    <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                    </div>
                                    <svg className="w-6 h-6 text-white/70 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-darkgray mb-2">Laporan</h3>
                                <p className="text-gray-600 text-sm mb-4">Lihat berbagai laporan kas, kehadiran, dan statistik</p>
                                <div className="flex items-center space-x-4 text-sm text-gray-500">
                                    <span className="flex items-center">
                                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z" clipRule="evenodd" />
                                        </svg>
                                        13 jenis laporan
                                    </span>
                                </div>
                            </div>
                        </Link>

                        {/* Galeri Card */}
                        <Link href="/gallery" className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group">
                            <div className="bg-gradient-to-r from-pink-500 to-pink-600 p-6">
                                <div className="flex items-center justify-between">
                                    <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <svg className="w-6 h-6 text-white/70 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-darkgray mb-2">Galeri Foto</h3>
                                <p className="text-gray-600 text-sm mb-4">Upload dan lihat dokumentasi kegiatan UKM</p>
                                <div className="flex items-center space-x-4 text-sm text-gray-500">
                                    <span className="flex items-center">
                                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                                        </svg>
                                        48 foto
                                    </span>
                                    <span>•</span>
                                    <span>12 album</span>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>

           

            


            
        </AppLayout>
    );
}