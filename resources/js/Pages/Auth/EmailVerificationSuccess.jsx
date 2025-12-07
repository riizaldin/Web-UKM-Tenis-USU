import { useEffect } from 'react';
import { router } from '@inertiajs/react';
import { Head } from '@inertiajs/react';

export default function EmailVerificationSuccess({ redirectUrl }) {
    useEffect(() => {
        // Redirect after 3 seconds
        const timer = setTimeout(() => {
            router.visit(redirectUrl);
        }, 3000);

        return () => clearTimeout(timer);
    }, [redirectUrl]);

    return (
        <>
            <Head title="Verifikasi Berhasil" />
            <div className="min-h-screen bg-gradient-to-br from-[#43CEA2] via-[#2E8B9E] to-[#185A9D] flex items-center justify-center px-4">
                <div className="max-w-md w-full">
                    {/* Success Card */}
                    <div className="bg-white rounded-2xl shadow-2xl p-8 text-center transform animate-scale-in">
                        {/* Success Icon with Animation */}
                        <div className="mb-6 relative">
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-24 h-24 bg-green-100 rounded-full animate-ping-slow"></div>
                            </div>
                            <div className="relative flex items-center justify-center">
                                <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-lg animate-bounce-in">
                                    <svg className="w-12 h-12 text-white animate-check" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Success Message */}
                        <h1 className="text-3xl font-bold text-gray-800 mb-3">
                            Verifikasi Berhasil!
                        </h1>
                        <p className="text-gray-600 mb-6">
                            Email Anda telah berhasil diverifikasi. Anda akan diarahkan ke halaman lengkapi profil...
                        </p>

                        {/* Progress Bar */}
                        <div className="w-full bg-gray-200 rounded-full h-2 mb-4 overflow-hidden">
                            <div className="bg-gradient-to-r from-[#43CEA2] to-[#185A9D] h-2 rounded-full animate-progress"></div>
                        </div>

                        {/* Loading Spinner */}
                        <div className="flex justify-center items-center space-x-2 text-gray-500">
                            <div className="w-2 h-2 bg-[#43CEA2] rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                            <div className="w-2 h-2 bg-[#43CEA2] rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                            <div className="w-2 h-2 bg-[#43CEA2] rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                        </div>

                        {/* Skip Button */}
                        <button
                            onClick={() => router.visit(redirectUrl)}
                            className="mt-6 text-sm text-gray-500 hover:text-[#43CEA2] transition-colors underline"
                        >
                            Lewati, lanjutkan sekarang →
                        </button>
                    </div>

                    {/* Bottom Info */}
                    <div className="text-center mt-6 text-white/80 text-sm">
                        <p>UKM Tenis Lapangan USU</p>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes scale-in {
                    0% {
                        transform: scale(0.9);
                        opacity: 0;
                    }
                    100% {
                        transform: scale(1);
                        opacity: 1;
                    }
                }

                @keyframes bounce-in {
                    0% {
                        transform: scale(0);
                    }
                    50% {
                        transform: scale(1.1);
                    }
                    100% {
                        transform: scale(1);
                    }
                }

                @keyframes check {
                    0% {
                        stroke-dasharray: 0, 100;
                        stroke-dashoffset: 0;
                    }
                    100% {
                        stroke-dasharray: 100, 0;
                        stroke-dashoffset: 0;
                    }
                }

                @keyframes progress {
                    0% {
                        width: 0%;
                    }
                    100% {
                        width: 100%;
                    }
                }

                @keyframes ping-slow {
                    0%, 100% {
                        transform: scale(1);
                        opacity: 0.3;
                    }
                    50% {
                        transform: scale(1.2);
                        opacity: 0;
                    }
                }

                .animate-scale-in {
                    animation: scale-in 0.5s ease-out;
                }

                .animate-bounce-in {
                    animation: bounce-in 0.6s ease-out;
                }

                .animate-check {
                    animation: check 0.6s ease-out 0.3s both;
                }

                .animate-progress {
                    animation: progress 3s linear;
                }

                .animate-ping-slow {
                    animation: ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite;
                }
            `}</style>
        </>
    );
}
