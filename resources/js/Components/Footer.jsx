import React from 'react';
import { Link } from '@inertiajs/react';

export default function Footer() {
    const navigation = {
        
        social: [
            {
                name: 'Instagram',
                href: 'https://www.instagram.com/tennis_usu/',
                icon: (props) => (
                    <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
                        <path
                            fillRule="evenodd"
                            d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                            clipRule="evenodd"
                        />
                    </svg>
                ),
            },
            {
                name: 'TikTok',
                href: 'https://www.tiktok.com/@tennis_usu?_r=1&_t=ZS-91yaq2nWS3R',
                icon: (props) => (
                    <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
                        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                    </svg>
                ),
            },
        ],
    };

    return (
        <footer className="relative bg-gradient-to-br from-prismarine via-teal-600 to-blue-700 text-white overflow-hidden">
            {/* Decorative Background Elements */}
            <div className="absolute inset-0">
                <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
                <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-teal-400/5 rounded-full blur-3xl"></div>
            </div>

            {/* Pattern Overlay */}
            <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

            <div className="relative mx-auto max-w-7xl px-6 py-12 sm:py-16 lg:px-8">
                <div className="grid grid-cols-1 gap-12 md:grid-cols-3 mb-12">
                    {/* Kolom 1: About/Logo Section */}
                    <div className="space-y-6">
                        <div className="flex items-center space-x-3">
                            
                            <h3 className="text-2xl font-bold text-white">UKM Tenis Lapangan USU</h3>
                        </div>
                        <p className="text-sm leading-relaxed text-white/80">
                            Unit Kegiatan Mahasiswa Universitas Sumatera Utara yang berkomitmen mengembangkan talenta mahasiswa dalam olahraga tenis melalui latihan rutin dan kompetisi.
                        </p>
                        <div className="flex items-center space-x-2 text-sm text-white/70">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span className="font-semibold">Berdiri sejak 2010</span>
                        </div>
                    </div>

                    {/* Kolom 2: Contact Section */}
                    <div className="space-y-6">
                        <h3 className="text-xl font-bold text-white flex items-center space-x-2">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            <span>Hubungi Kami</span>
                        </h3>
                        <ul className="space-y-4">
                            <li className="flex items-start space-x-3 text-sm text-white/80 hover:text-white transition-colors group">
                                <svg className="w-6 h-6 mt-0.5 flex-shrink-0 text-white/60 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                <div>
                                    <div className="text-xs text-white/60 mb-1">Email</div>
                                    <a href="mailto:tenislapanganusu@gmail.com" className="font-semibold">tenislapanganusu@gmail.com</a>
                                </div>
                            </li>
                            <li className="flex items-start space-x-3 text-sm text-white/80 hover:text-white transition-colors group">
                                <svg className="w-6 h-6 mt-0.5 flex-shrink-0 text-white/60 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                <div>
                                    <div className="text-xs text-white/60 mb-1">Telepon</div>
                                    <a href="tel:+62618219641" className="font-semibold">+62 81375427895</a>
                                </div>
                            </li>
                            <li className="flex items-start space-x-3 text-sm text-white/80 hover:text-white transition-colors group">
                                <svg className="w-6 h-6 mt-0.5 flex-shrink-0 text-white/60 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <div>
                                    <div className="text-xs text-white/60 mb-1">Alamat</div>
                                    <span className="font-semibold">Jl. Tri Dharma No.5, Padang Bulan, Kec. Medan Baru, Kota Medan, Sumatera Utara 20153</span>
                                </div>
                            </li>
                        </ul>
                    </div>

                    {/* Kolom 3: Social Media Section */}
                    <div className="space-y-6">
                        <h3 className="text-xl font-bold text-white flex items-center space-x-2">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                            </svg>
                            <span>Ikuti Kami</span>
                        </h3>
                        <p className="text-sm text-white/80">
                            Tetap terhubung dengan kami melalui media sosial untuk mendapatkan update terbaru tentang kegiatan dan prestasi UKM.
                        </p>
                        <div className="flex flex-wrap gap-3">
                            {navigation.social.map((item) => (
                                <a 
                                    key={item.name} 
                                    href={item.href} 
                                    className="group relative w-12 h-12 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-white hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl"
                                >
                                    <span className="sr-only">{item.name}</span>
                                    <item.icon className="h-6 w-6 group-hover:scale-110 transition-transform" aria-hidden="true" />
                                    {/* Tooltip */}
                                    <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-white text-prismarine px-3 py-1.5 rounded-lg text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg">
                                        {item.name}
                                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-white"></div>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="border-t border-white/20 pt-8">
                    <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
                        <p className="text-sm text-white/70">
                            &copy; {new Date().getFullYear()} <span className="font-semibold text-white">UKM Tenis Lapangan USU</span>
                        </p>
                
                    </div>
                </div>
            </div>
        </footer>
    );
}