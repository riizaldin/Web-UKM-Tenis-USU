import React from 'react';
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

                    {/* Right Image */}
                    <div className="flex-1 mt-12 lg:mt-0 flex justify-center">
                        <img
                            src="/images/UkmFotbar.jpg"
                            alt="UKM Tenis"
                            className="w-full max-w-md rounded-xl shadow-lg"
                        />
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
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
            </section>

            {/* Features Section */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-darkgray mb-4">Fitur Portal UKM Tenis</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">Kelola aktivitas UKM dengan lebih mudah menggunakan berbagai fitur yang kami sediakan</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {features.map((feature, index) => (
                            <FeatureCard key={index} {...feature} />
                        ))}
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
                            name="Ahmad Rizaldi"
                            role="Ketua UKM"
                            image="/images/testimonial-1.jpg"
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

            {/* Gallery Preview */}
            <section className="py-16">
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
