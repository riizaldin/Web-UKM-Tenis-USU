import { Head } from '@inertiajs/react';
import { Link } from '@inertiajs/react';

export default function AuthenticationLayout({ children, title }) {
    return (
        <div className="min-h-screen flex bg-gradient-to-br from-slate-50 via-white to-slate-100">
            {/* Left side - Brand/Info Panel */}
            <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-[#43CEA2] via-[#2AB885] to-[#185A9D] flex-col justify-between relative overflow-hidden">
                {/* Elegant Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 w-full h-full" style={{
                        backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                        backgroundSize: '40px 40px'
                    }}></div>
                </div>
                
                {/* Floating Gradient Orbs */}
                <div className="absolute top-20 right-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-32 left-10 w-96 h-96 bg-[#185A9D]/20 rounded-full blur-3xl"></div>
                
                <div className="p-12 flex-1 flex items-center justify-center relative z-10">
                    <div className="max-w-xl">
                        {/* Logo Section */}
                        <div className="flex items-center space-x-4 mb-8">
                            <div className="w-14 h-14  rounded-xl flex items-center justify-center">
                               <img src="/images/logo.png" alt="logo" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-white tracking-tight">UKM TENIS LAPANGAN</h1>
                                <p className="text-white/80 text-sm font-medium">Universitas Sumatera Utara</p>
                            </div>
                        </div>
                        
                        <p className="text-lg text-white/95 leading-relaxed mb-10 font-light">
                            Bergabunglah dengan komunitas tenis kami dan kembangkan passion anda dalam olahraga tenis melalui berbagai program dan kegiatan yang kami selenggarakan.
                        </p>
                        
                        {/* Feature Cards - Elegant Style */}
                        <div className="space-y-4">
                            <div className="group flex items-start space-x-4 bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20 hover:bg-white/20 hover:border-white/30 transition-all duration-300 hover:shadow-xl hover:scale-105">
                                <div className="flex-shrink-0">
                                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center group-hover:bg-white/30 transition-colors">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-white font-semibold text-base mb-1">Latihan Profesional</h3>
                                    <p className="text-white/75 text-sm leading-relaxed">Dibimbing pelatih berpengalaman dengan program yang terstruktur</p>
                                </div>
                            </div>
                            
                            <div className="group flex items-start space-x-4 bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20 hover:bg-white/20 hover:border-white/30 transition-all duration-300 hover:shadow-xl hover:scale-105">
                                <div className="flex-shrink-0">
                                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center group-hover:bg-white/30 transition-colors">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                                        </svg>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-white font-semibold text-base mb-1">Kompetisi & Turnamen</h3>
                                    <p className="text-white/75 text-sm leading-relaxed">Ikuti turnamen internal dan eksternal untuk mengasah skill</p>
                                </div>
                            </div>
                            
                            <div className="group flex items-start space-x-4 bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20 hover:bg-white/20 hover:border-white/30 transition-all duration-300 hover:shadow-xl hover:scale-105">
                                <div className="flex-shrink-0">
                                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center group-hover:bg-white/30 transition-colors">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-white font-semibold text-base mb-1">Komunitas Solid</h3>
                                    <p className="text-white/75 text-sm leading-relaxed">Bergabung dengan keluarga besar yang aktif dan bersahabat</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Footer */}
                <div className="p-8 relative z-10">
                    <div className="flex items-center justify-center space-x-6 text-white/60 text-sm">
                        <span className="hover:text-white/90 transition-colors cursor-default">© 2025 UKM Tenis USU</span>
                        <span className="w-1 h-1 bg-white/40 rounded-full"></span>
                        <span className="hover:text-white/90 transition-colors cursor-default">All rights reserved</span>
                    </div>
                </div>
            </div>

            {/* Right side - Auth Form */}
            <div className="flex-1 flex items-center justify-center p-8 relative">
                {/* Subtle decorative elements */}
                <div className="absolute top-10 right-10 w-64 h-64 bg-gradient-to-br from-[#43CEA2]/5 to-[#185A9D]/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-10 left-10 w-80 h-80 bg-[#43CEA2]/5 rounded-full blur-3xl"></div>
                
                <div className="w-full max-w-md relative z-10">
                    {/* Title Section */}
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold mb-2">
                            <span className="bg-gradient-to-r from-[#43CEA2] to-[#185A9D] bg-clip-text text-transparent">
                                {title}
                            </span>
                        </h2>
                        <p className="text-gray-500 text-base">Selamat datang di Portal UKM Tenis USU</p>
                    </div>
                    
                    {/* Form Container */}
                    {children}
                    
                    {/* Mobile Footer */}
                    <div className="lg:hidden mt-8 text-center text-xs text-gray-400">
                        <p>© 2025 UKM Tenis USU. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}