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

export default function Home() {
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
        <AppLayout title="Home">
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


            {/* Features Grid */}
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature, index) => (
                        <FeatureCard key={index} {...feature} />
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}