import { Head } from '@inertiajs/react';
import { Link } from '@inertiajs/react';

export default function AuthenticationLayout({ children, title }) {
    return (
        <div className="min-h-screen flex bg-cream">
            {/* Left side - Brand/Info Panel */}
            <div className="hidden lg:flex lg:w-1/2 bg-prismarine flex-col justify-between">
                <div className="p-12 flex-1 flex items-center justify-center">
                    <div className="max-w-xl">
                        <h1 className="text-4xl font-bold text-white mb-6">UKM Tenis USU</h1>
                        <p className="text-xl text-white/90 leading-relaxed">
                            Bergabunglah dengan komunitas tenis kami dan kembangkan passion anda dalam olahraga tenis melalui berbagai program dan kegiatan yang kami selenggarakan.
                        </p>
                        <div className="mt-8">
                            <div className="flex items-center space-x-4 text-white/80">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                <span>Latihan rutin dengan pelatih profesional</span>
                            </div>
                            <div className="flex items-center space-x-4 text-white/80 mt-4">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                <span>Turnamen internal dan eksternal</span>
                            </div>
                            <div className="flex items-center space-x-4 text-white/80 mt-4">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                <span>Komunitas yang aktif dan bersahabat</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="p-8 text-white/60 text-center text-sm">
                    © 2025 UKM Tenis USU. All rights reserved.
                </div>
            </div>

            {/* Right side - Auth Form */}
            <div className="flex-1 flex items-center justify-center p-8">
                <div className="w-full max-w-md">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-darkgray mb-2">{title}</h2>
                        <p className="text-gray-600">Selamat datang di Portal UKM Tenis USU</p>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
}