import React, { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';

const StatCard = ({ number, label, icon }) => (
    <div className="bg-white rounded-lg p-6 shadow-lg transform hover:-translate-y-1 transition-all duration-300">
        <div className="flex items-center space-x-4">
            <div className="bg-gradient-to-r from-[#43CEA2] to-[#185A9D] p-3 rounded-full">
                {icon}
            </div>
            <div>
                <h3 className="text-3xl font-bold text-darkgray">{number}</h3>
                <p className="text-gray-600">{label}</p>
            </div>
        </div>
    </div>
);

const TestimonialCard = ({ name, role, image, quote }) => (
    <div className="bg-white p-6 rounded-xl shadow-lg">
        <div className="flex items-center space-x-4 mb-4">
            <img src={image} alt={name} className="w-16 h-16 rounded-full object-cover" />
            <div>
                <h4 className="font-semibold text-lg">{name}</h4>
                <p className="text-gray-600">{role}</p>
            </div>
        </div>
        <p className="text-gray-700 italic">"{quote}"</p>
    </div>
);

const GalleryImage = ({ src, alt }) => (
    <div className="relative group overflow-hidden rounded-lg">
        <img src={src} alt={alt} className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-300" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
            <p className="text-white p-4">{alt}</p>
        </div>
    </div>
);

const FeatureCard = ({ title, description, icon, link }) => (
    <Link 
        href={link} 
        className="p-6 bg-[#F5F7F8] rounded-lg shadow-md hover:shadow-xl transition-all duration-300 border-l-4 border-[#379777]"
    >
        <div className="flex items-center space-x-4">
            <div className="bg-gradient-to-r from-[#43CEA2] to-[#185A9D] p-3 rounded-full">
                {icon}
            </div>
            <div>
                <h3 className="text-xl font-semibold text-[#45474B] mb-2">{title}</h3>
                <p className="text-gray-600">{description}</p>
            </div>
        </div>
    </Link>
);

export default function LandingPage() {
    const [currentSlide, setCurrentSlide] = useState(0);
    
    const heroImages = [
        { src: '/images/UkmFotbar.jpg', alt: 'UKM Tenis USU' },
        { src: '/images/LatihanRutin.jpg', alt: 'Latihan Rutin' },
        { src: '/images/TurnamenInternal.jpg', alt: 'Turnamen Internal' },
        { src: '/images/TennisVisit.jpg', alt: 'Tennis Visit' }
    ];

    // Auto scroll carousel
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % heroImages.length);
        }, 4000); // Ganti slide setiap 4 detik

        return () => clearInterval(interval);
    }, [heroImages.length]);

    const features = [
        {
            title: 'Manajemen Anggota',
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
            description: 'Absensi berbasis QR Code dengan validasi lokasi',
            icon: <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path></svg>,
            link: '/attendance'
        },
        {
            title: 'Manajemen Keuangan',
            description: 'Kelola pembayaran dan laporan keuangan',
            icon: <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>,
            link: '/finance'
        },
        {
            title: 'Laporan & Rekapitulasi',
            description: 'Akses laporan kegiatan dan statistik',
            icon: <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>,
            link: '/reports'
        },
        {
            title: 'Dokumentasi & Galeri',
            description: 'Galeri foto kegiatan UKM',
            icon: <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>,
            link: '/gallery'
        },
        {
            title: 'Penilaian Pengurus',
            description: 'Evaluasi kinerja pengurus',
            icon: <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path></svg>,
            link: '/evaluation'
        },
    ];

    return (
        <AppLayout title="Landing Page UKM Tenis USU">
            {/* Hero Section */}
            <section className="bg-gradient-to-r from-[#43CEA2] to-[#185A9D] text-white py-12">
                <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center">
                    {/* Left content */}
                    <div className="flex-1 space-y-6 text-center lg:text-left">
                        <h1 className="text-4xl lg:text-5xl font-extrabold leading-tight">
                            Raih Prestasi Bersama <br /> UKM Tenis Lapangan USU
                        </h1>
                        <p className="text-lg text-white/90 max-w-lg mx-auto lg:mx-0">
                            Bergabunglah dengan komunitas tenis aktif untuk berlatih, bertanding,
                            dan mengembangkan passion olahraga tenis bersama teman-teman di kampus.
                        </p>
                        <div className="space-x-4">
                            <Link
                                href="/register"
                                className="px-6 py-3 bg-white text-[#185A9D] font-semibold rounded-lg shadow hover:opacity-90 transition"
                            >
                                Gabung Sekarang
                            </Link>
                            <Link
                                href="/about"
                                className="px-6 py-3 border border-white rounded-lg font-semibold hover:bg-white/10 transition"
                            >
                                Pelajari Lebih Lanjut
                            </Link>
                        </div>
                    </div>

                    {/* Right Image - Carousel */}
                    <div className="flex-1 mt-12 lg:mt-0 flex flex-col items-center">
                        <div className="relative w-full max-w-2xl overflow-hidden rounded-xl shadow-lg lg:ml-20">
                            {/* Images */}
                            <div 
                                className="flex transition-transform duration-500 ease-in-out"
                                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                            >
                                {heroImages.map((image, index) => (
                                    <img
                                        key={index}
                                        src={image.src}
                                        alt={image.alt}
                                        className="w-full flex-shrink-0 object-cover h-96"
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Dots Indicator */}
                        <div className="flex space-x-1.5 mt-4 lg:ml-20">
                            {heroImages.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentSlide(index)}
                                    className={`h-2 rounded-full transition-all duration-300 ${
                                        currentSlide === index 
                                            ? 'bg-white w-6' 
                                            : 'bg-white/50 hover:bg-white/70 w-2'
                                    }`}
                                    aria-label={`Go to slide ${index + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section className="py-18 lg:py-20 bg-white">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col lg:flex-row items-center gap-12">
                        {/* Left Side - Image */}
                        <div className="flex-1">
                            <div className="relative">
                                <img 
                                    src="/images/ACTOR.png" 
                                    alt="Logo UKM Tenis USU" 
                                    className="w-full max-w-md mx-auto rounded-2xl"
                                />
                                {/* <div className="absolute -bottom-6 -right-6 bg-gradient-to-r from-[#43CEA2] to-[#185A9D] text-white p-6 rounded-lg shadow-lg hidden lg:block">
                                    <p className="text-4xl font-bold">8+</p>
                                    <p className="text-sm">Tahun Berprestasi</p>
                                </div> */}
                            </div>
                        </div>

                        {/* Right Side - Content */}
                        <div className="flex-1 space-y-6">
                            <div>
                                <h3 className="text-[#43CEA2] font-semibold text-lg mb-2">Tentang Kami</h3>
                                <h2 className="text-4xl font-bold text-[#45474B] mb-4">
                                    UKM Tenis Lapangan USU
                                </h2>
                            </div>
                            
                            <p className="text-gray-700 text-lg leading-relaxed">
                                Unit Kegiatan Mahasiswa (UKM) Tenis Lapangan Universitas Sumatera Utara adalah 
                                wadah bagi mahasiswa yang memiliki minat dan bakat dalam olahraga tenis lapangan. 
                                Kami berkomitmen untuk mengembangkan kemampuan teknis, mental, dan sportivitas 
                                anggota melalui latihan rutin dan kompetisi.
                            </p>

                            <div className="space-y-4">
                                <div className="flex items-start space-x-4">
                                    <div className="bg-[#43CEA2] p-2 rounded-lg mt-1">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-[#45474B] text-lg">Latihan Profesional</h4>
                                        <p className="text-gray-600">Dibimbing oleh pelatih berpengalaman dengan program terstruktur</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="bg-[#43CEA2] p-2 rounded-lg mt-1">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-[#45474B] text-lg">Kompetisi Regional & Nasional</h4>
                                        <p className="text-gray-600">Aktif mengikuti turnamen untuk mengasah kemampuan kompetitif</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="bg-[#43CEA2] p-2 rounded-lg mt-1">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-[#45474B] text-lg">Komunitas Solid</h4>
                                        <p className="text-gray-600">Membangun persaudaraan dan networking sesama pecinta tenis</p>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-4">
                                <Link
                                    href="/about"
                                    className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-[#43CEA2] to-[#185A9D] text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                                >
                                    <span>Selengkapnya</span>
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    </div>
                <div className="container mx-auto px-4 mt-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <StatCard
                            number="50+"
                            label="Anggota Aktif"
                            icon={<svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>}
                        />
                        <StatCard
                            number="15+"
                            label="Prestasi"
                            icon={<svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                            </svg>}
                        />
                        <StatCard
                            number="8+"
                            label="Tahun Berdiri"
                            icon={<svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>}
                        />
                        <StatCard
                            number="4"
                            label="Lapangan"
                            icon={<svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>}
                        />
                    </div>
                </div>
                </div>
            </section>

             {/* Training Schedule Section */}
            <section className="py-20 bg-gradient-to-br from-[#F5F7F8] to-white">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold text-[#45474B] mb-4">Bergabung dengan UKM Tenis Lapangan USU</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">Latihan rutin untuk mengasah kemampuan dan membangun kekompakan tim</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                        {/* Left Side - Schedule Info */}
                        <div className="space-y-6">
                            {/* Schedule Card */}
                            <div className="bg-white rounded-2xl shadow-xl p-8 border-t-4 border-[#43CEA2]">
                                <div className="flex items-center space-x-3 mb-6">
                                    <div className="bg-gradient-to-r from-[#43CEA2] to-[#185A9D] p-3 rounded-lg">
                                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-2xl font-bold text-[#45474B]">Jadwal Rutin</h3>
                                </div>

                                <div className="space-y-4">
                                    {/* Days */}
                                    <div className="flex items-start space-x-4">
                                        <div className="bg-[#43CEA2]/10 p-3 rounded-lg">
                                            <svg className="w-6 h-6 text-[#43CEA2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-semibold text-lg text-[#45474B] mb-2">Hari Latihan</h4>
                                            <div className="flex flex-wrap gap-2">
                                                <span className="px-4 py-2 bg-gradient-to-r from-[#43CEA2] to-[#185A9D] text-white rounded-lg font-medium">Senin</span>
                                                <span className="px-4 py-2 bg-gradient-to-r from-[#43CEA2] to-[#185A9D] text-white rounded-lg font-medium">Rabu</span>
                                                <span className="px-4 py-2 bg-gradient-to-r from-[#43CEA2] to-[#185A9D] text-white rounded-lg font-medium">Jumat</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Time */}
                                    <div className="flex items-start space-x-4">
                                        <div className="bg-[#185A9D]/10 p-3 rounded-lg">
                                            <svg className="w-6 h-6 text-[#185A9D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-lg text-[#45474B] mb-2">Waktu</h4>
                                            <p className="text-2xl font-bold text-[#43CEA2]">16:00 - 18:00 WIB</p>
                                        </div>
                                    </div>

                                    {/* Location */}
                                    <div className="flex items-start space-x-4">
                                        <div className="bg-red-100 p-3 rounded-lg">
                                            <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-lg text-[#45474B] mb-2">Lokasi</h4>
                                            <p className="text-gray-700 font-medium">Lapangan Tenis Pintu 4 USU</p>
                                            <p className="text-gray-500 text-sm">Universitas Sumatera Utara</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Additional Info */}
                                <div className="mt-20 pt-6 border-t border-gray-200">
                                    <div className="flex items-start space-x-3">
                                        <svg className="w-5 h-5 text-[#43CEA2] mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <div>
                                            <p className="text-sm text-gray-600">
                                                <span className="font-semibold">Catatan:</span> Harap datang 15 menit lebih awal untuk persiapan. 
                                                Bawa peralatan sendiri dan pastikan kondisi fisik prima.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* CTA Button */}
                                <div className="mt-6">
                                    <Link
                                        href="/register"
                                        className="w-full block text-center px-6 py-3 bg-gradient-to-r from-[#43CEA2] to-[#185A9D] text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                                    >
                                        Daftar Latihan
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Right Side - Google Maps */}
                        <div className="space-y-4">
                            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                                <div className="bg-gradient-to-r from-[#43CEA2] to-[#185A9D] p-4">
                                    <h3 className="text-xl font-bold text-white flex items-center space-x-2">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                                        </svg>
                                        <span>Lokasi Lapangan</span>
                                    </h3>
                                </div>
                                <div className="aspect-video">
                                    <iframe 
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3982.0890565046057!2d98.65374829999999!3d3.5669767!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30312fe476083541%3A0xc18875c43ac9b677!2sLapangan%20Tenis%20USU!5e0!3m2!1sid!2sid!4v1760004803139!5m2!1sid!2sid"
                                        width="100%" 
                                        height="100%" 
                                        style={{ border: 0 }}
                                        allowFullScreen="" 
                                        loading="lazy" 
                                        referrerPolicy="no-referrer-when-downgrade"
                                        title="Lokasi Lapangan Tenis USU"
                                    />
                                </div>
                                <div className="p-4 bg-gray-50">
                                    <a 
                                        href="https://goo.gl/maps/your-location-link" 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-center space-x-2 text-[#185A9D] hover:text-[#43CEA2] font-medium transition-colors"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                        </svg>
                                        <span>Buka di Google Maps</span>
                                    </a>
                                </div>
                            </div>

                            {/* Contact Info */}
                            <div className="bg-white rounded-xl shadow-lg p-6">
                                <h4 className="font-bold text-lg text-[#45474B] mb-4">Informasi Kontak</h4>
                                <div className="space-y-3">
                                    <div className="flex items-center space-x-3 text-gray-600">
                                        <svg className="w-5 h-5 text-[#43CEA2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                        <span>ukmtenis@usu.ac.id</span>
                                    </div>
                                    <div className="flex items-center space-x-3 text-gray-600">
                                        <svg className="w-5 h-5 text-[#43CEA2]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                        <span>+62 812-3456-7890</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Gallery Preview */}
            <section className="py-20 bg-gradient-to-br from-[#F5F7F8] to-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-darkgray mb-4">Galeri Kegiatan</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">Dokumentasi kegiatan dan prestasi UKM Tenis USU</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <GalleryImage src="/images/LatihanRutin.jpg" alt="Latihan Rutin" />
                        <GalleryImage src="/images/TurnamenInternal.jpg" alt="Turnamen Internal" />
                        <GalleryImage src="/images/TennisVisit.jpg" alt="Tennis Visit" />
                    </div>
                    <div className="text-center mt-8">
                        <Link href="/gallery" className="inline-flex items-center space-x-2 text-[#185A9D] hover:text-[#43CEA2] transition-colors">
                            <span>Lihat Semua Galeri</span>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </section>
           

            {/* Testimonials Section */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-darkgray mb-4">Apa Kata Mereka?</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">Dengarkan pengalaman dari anggota UKM Tenis USU</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <TestimonialCard
                            name="Rizaldi Febriansyah"
                            role="Ketua UKM Periode 2024/2025"
                            image="/images/rizaldi.jpg"
                            quote="UKM Tenis memberikan wadah bagi mahasiswa untuk mengembangkan passion dalam tenis."
                        />
                        <TestimonialCard
                            name="Sarah Nabila"
                            role="Anggota Aktif"
                            image="/images/testimonial-2.jpg"
                            quote="Selain berlatih tenis, kita juga belajar berorganisasi dan menjalin persaudaraan."
                        />
                        <TestimonialCard
                            name="Michael Sembiring"
                            role="Alumni"
                            image="/images/testimonial-3.jpg"
                            quote="Pengalaman berharga yang tak terlupakan selama bergabung dengan UKM Tenis USU."
                        />
                    </div>
                </div>
            </section>

            

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-r from-[#43CEA2] to-[#185A9D]">
                <div className="container mx-auto px-4">
                    <div className="text-center text-white">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">Bergabung dengan UKM Tenis USU</h2>
                        <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
                            Kembangkan bakatmu dan raih prestasi bersama kami. Jadilah bagian dari keluarga UKM Tenis USU!
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <Link
                                href="/register"
                                className="px-8 py-3 bg-white text-[#185A9D] font-semibold rounded-lg shadow hover:bg-opacity-90 transition"
                            >
                                Daftar Sekarang
                            </Link>
                            <Link
                                href="/contact"
                                className="px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-[#185A9D] transition"
                            >
                                Hubungi Kami
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </AppLayout>
    );
}
