import React, { useState } from 'react';
import AppLayout from '@/Layouts/AppLayout';
import ApplicationLogo from '@/Components/ApplicationLogo';
import { Crown, Wallet, FileText, Target, Activity, Package, User, Shield, ChevronDown, ChevronUp, Mail, Phone, BookOpen, GraduationCap, Calendar } from 'lucide-react';

const jabatanInfo = {
    ketua: { 
        label: "Ketua", 
        icon: Crown, 
        gradient: "from-[#43CEA2] to-[#185A9D]",
        iconBg: "bg-gradient-to-br from-[#43CEA2] to-[#185A9D]",
        border: "border-[#43CEA2]"
    },
    wakil_ketua: { 
        label: "Wakil Ketua", 
        icon: Crown, 
        gradient: "from-[#43CEA2] to-[#185A9D]",
        iconBg: "bg-gradient-to-br from-[#43CEA2] to-[#185A9D]",
        border: "border-[#43CEA2]"
    },
    bendahara: { 
        label: "Bendahara", 
        icon: Wallet, 
        gradient: "from-[#43CEA2] to-[#185A9D]",
        iconBg: "bg-gradient-to-br from-[#43CEA2] to-[#185A9D]",
        border: "border-[#43CEA2]"
    },
    wakil_bendahara: { 
        label: "Wakil Bendahara", 
        icon: Wallet, 
        gradient: "from-[#43CEA2] to-[#185A9D]",
        iconBg: "bg-gradient-to-br from-[#43CEA2] to-[#185A9D]",
        border: "border-[#43CEA2]"
    },
    sekretaris: { 
        label: "Sekretaris", 
        icon: FileText, 
        gradient: "from-[#43CEA2] to-[#185A9D]",
        iconBg: "bg-gradient-to-br from-[#43CEA2] to-[#185A9D]",
        border: "border-[#43CEA2]"
    },
    wakil_sekretaris: { 
        label: "Wakil Sekretaris", 
        icon: FileText, 
        gradient: "from-[#43CEA2] to-[#185A9D]",
        iconBg: "bg-gradient-to-br from-[#43CEA2] to-[#185A9D]",
        border: "border-[#43CEA2]"
    },
    koordinator_kepelatihan: { 
        label: "Koordinator Kepelatihan", 
        icon: Target, 
        gradient: "from-[#43CEA2] to-[#185A9D]",
        iconBg: "bg-gradient-to-br from-[#43CEA2] to-[#185A9D]",
        border: "border-[#43CEA2]"
    },
    koordinator_medinfo: { 
        label: "Koordinator Medinfo", 
        icon: Activity, 
        gradient: "from-[#43CEA2] to-[#185A9D]",
        iconBg: "bg-gradient-to-br from-[#43CEA2] to-[#185A9D]",
        border: "border-[#43CEA2]"
    },
    koordinator_keperalatan: { 
        label: "Koordinator Keperalatan", 
        icon: Package, 
        gradient: "from-[#43CEA2] to-[#185A9D]",
        iconBg: "bg-gradient-to-br from-[#43CEA2] to-[#185A9D]",
        border: "border-[#43CEA2]"
    }
};

export default function StrukturOrganisasi({ auth, pengurus, anggota }) {
    const [expandedPengurus, setExpandedPengurus] = useState({});
    const [showAllAnggota, setShowAllAnggota] = useState(false);

    const togglePengurusDetails = (id) => {
        setExpandedPengurus(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const PengurusCard = ({ user }) => {
        const info = jabatanInfo[user.jabatan];
        const isExpanded = expandedPengurus[user.id];
        const photoUrl = user.pasfoto ? `/storage/${user.pasfoto}` : '/images/no_image_placeholder.png';

        return (
            <div className={`bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border-2 ${info.border} hover:scale-105`}>
                {/* Header with gradient */}
                <div className={`bg-gradient-to-r ${info.gradient} p-6 text-white relative overflow-hidden`}>
                    <div className="relative z-10 flex flex-col items-center">
                        {/* Foto Profil */}
                        <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-xl mb-3">
                            <img 
                                src={photoUrl} 
                                alt={user.name}
                                className="w-full h-full object-cover"
                                onError={(e) => { e.target.src = '/images/no_image_placeholder.png'; }}
                            />
                        </div>
                        <h3 className="text-xl font-bold mb-1 text-center">{user.name}</h3>
                        <p className="text-sm font-medium opacity-90">{info.label}</p>
                    </div>
                </div>

                {/* Basic Info */}
                <div className="p-6">
                    <div className="space-y-3">
                        {user.nim && (
                            <div className="flex items-center space-x-3 text-gray-700">
                                <div className={`${info.iconBg} w-8 h-8 rounded-lg flex items-center justify-center`}>
                                    <BookOpen className="w-4 h-4 text-white" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500">NIM</p>
                                    <p className="font-semibold">{user.nim}</p>
                                </div>
                            </div>
                        )}
                        {user.fakultas && (
                            <div className="flex items-center space-x-3 text-gray-700">
                                <div className={`${info.iconBg} w-8 h-8 rounded-lg flex items-center justify-center`}>
                                    <GraduationCap className="w-4 h-4 text-white" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500">Fakultas</p>
                                    <p className="font-semibold text-sm">{user.fakultas}</p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Expandable Details */}
                    {(user.jurusan || user.angkatan || user.email || user.no_whatsapp) && (
                        <>
                            <button
                                onClick={() => togglePengurusDetails(user.id)}
                                className={`w-full mt-4 py-2 px-4 rounded-lg bg-gradient-to-r ${info.gradient} text-white font-medium flex items-center justify-center space-x-2 hover:shadow-lg transition-all`}
                            >
                                <span>{isExpanded ? 'Sembunyikan' : 'Lihat Detail'}</span>
                                {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                            </button>

                            {isExpanded && (
                                <div className="mt-4 pt-4 border-t border-gray-200 space-y-3 animate-fadeIn">
                                    {user.jurusan && (
                                        <div className="flex items-center space-x-2 text-gray-600">
                                            <BookOpen className="w-4 h-4" />
                                            <span className="text-sm">{user.jurusan}</span>
                                        </div>
                                    )}
                                    {user.angkatan && (
                                        <div className="flex items-center space-x-2 text-gray-600">
                                            <Calendar className="w-4 h-4" />
                                            <span className="text-sm">Angkatan {user.angkatan}</span>
                                        </div>
                                    )}
                                    {user.email && (
                                        <div className="flex items-center space-x-2 text-gray-600">
                                            <Mail className="w-4 h-4" />
                                            <a href={`mailto:${user.email}`} className="text-sm hover:text-blue-600 transition-colors">
                                                {user.email}
                                            </a>
                                        </div>
                                    )}
                                    {user.no_whatsapp && (
                                        <div className="flex items-center space-x-2 text-gray-600">
                                            <Phone className="w-4 h-4" />
                                            <a href={`https://wa.me/${user.no_whatsapp}`} className="text-sm hover:text-green-600 transition-colors">
                                                {user.no_whatsapp}
                                            </a>
                                        </div>
                                    )}
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        );
    };

    const AnggotaCard = ({ user }) => {
        const photoUrl = user.pasfoto ? `/storage/${user.pasfoto}` : '/images/no_image_placeholder.png';
        
        return (
            <div className="bg-white rounded-xl shadow hover:shadow-lg transition-all duration-300 p-4 border border-gray-100 hover:border-gray-300">
                <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-200 shadow-md flex-shrink-0">
                        <img 
                            src={photoUrl} 
                            alt={user.name}
                            className="w-full h-full object-cover"
                            onError={(e) => { e.target.src = '/images/no_image_placeholder.png'; }}
                        />
                    </div>
                    <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-800 truncate">{user.name}</h4>
                        {user.nim && (
                            <p className="text-sm text-gray-500">NIM: {user.nim}</p>
                        )}
                        {user.fakultas && (
                            <p className="text-xs text-gray-400 truncate">{user.fakultas}</p>
                        )}
                    </div>
                </div>
            </div>
        );
    };

    const displayedAnggota = showAllAnggota ? anggota : anggota.slice(0, 12);

    return (
        <AppLayout auth={auth} title="Struktur Organisasi">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-[#43CEA2] to-[#185A9D] text-white py-12">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl font-bold mb-4">Struktur Organisasi</h1>
                    <p className="text-lg text-white/90">
                        Informasi mengenai pengurus dan anggota organisasi UKM.
                    </p>
                </div>
            </div>
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 py-12">
                
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    

                    {/* Pengurus Section */}
                    <div className="mb-16">
                        <div className="flex items-center justify-center space-x-3 mb-8">
                            <div className="h-1 w-16 bg-gradient-to-r from-transparent to-yellow-500 rounded-full"></div>
                            <div className="flex items-center space-x-2">
                              
                                <h2 className="text-3xl font-bold text-gray-900">
                                    Pengurus
                                </h2>
                            </div>
                            <div className="h-1 w-16 bg-gradient-to-l from-transparent to-yellow-500 rounded-full"></div>
                        </div>

                        {pengurus.length > 0 ? (
                            <>
                                {/* Baris 1: Ketua dan Wakil Ketua */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 max-w-4xl mx-auto">
                                    {pengurus.filter(u => u.jabatan === 'ketua' || u.jabatan === 'wakil_ketua').map((user) => (
                                        <PengurusCard key={user.id} user={user} />
                                    ))}
                                </div>
                                
                                {/* Baris 2: Bendahara, Wakil Bendahara, Sekretaris, Wakil Sekretaris */}
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                                    {pengurus.filter(u => 
                                        u.jabatan === 'bendahara' || 
                                        u.jabatan === 'wakil_bendahara' || 
                                        u.jabatan === 'sekretaris' || 
                                        u.jabatan === 'wakil_sekretaris'
                                    ).map((user) => (
                                        <PengurusCard key={user.id} user={user} />
                                    ))}
                                </div>

                                {/* Baris 3: Koordinator Kepelatihan, Medinfo, Keperalatan */}
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {pengurus.filter(u => 
                                        u.jabatan === 'koordinator_kepelatihan' || 
                                        u.jabatan === 'koordinator_medinfo' || 
                                        u.jabatan === 'koordinator_keperalatan'
                                    ).map((user) => (
                                        <PengurusCard key={user.id} user={user} />
                                    ))}
                                </div>
                            </>
                        ) : (
                            <div className="bg-white rounded-2xl shadow-lg p-12 text-center border border-gray-200">
                                <Crown className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                <p className="text-gray-500 text-lg">
                                    Belum ada pengurus yang ditunjuk
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Anggota Section */}
                    <div>
                        <div className="flex items-center justify-center space-x-3 mb-8">
                            <div className="h-1 w-16 bg-gradient-to-r from-transparent to-blue-500 rounded-full"></div>
                            <div className="flex items-center space-x-2">
                      
                                <h2 className="text-3xl font-bold text-gray-900">
                                    Anggota
                                </h2>
                                <span className="bg-blue-100 text-blue-800 text-sm font-bold px-3 py-1 rounded-full">
                                    {anggota.length}
                                </span>
                            </div>
                            <div className="h-1 w-16 bg-gradient-to-l from-transparent to-blue-500 rounded-full"></div>
                        </div>

                        {anggota.length > 0 ? (
                            <>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {displayedAnggota.map((user) => (
                                        <AnggotaCard key={user.id} user={user} />
                                    ))}
                                </div>

                                {anggota.length > 12 && (
                                    <div className="text-center mt-8">
                                        <button
                                            onClick={() => setShowAllAnggota(!showAllAnggota)}
                                            className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-green-500 text-white font-semibold rounded-full hover:shadow-lg transition-all hover:scale-105"
                                        >
                                            <span>{showAllAnggota ? 'Tampilkan Lebih Sedikit' : `Lihat Semua (${anggota.length - 12} lagi)`}</span>
                                            {showAllAnggota ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                                        </button>
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="bg-white rounded-2xl shadow-lg p-12 text-center border border-gray-200">
                                <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                <p className="text-gray-500 text-lg">
                                    Belum ada anggota terdaftar
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
