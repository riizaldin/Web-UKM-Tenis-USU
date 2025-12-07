import React, { useState } from "react";
import { Head, router, Link } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import ApplicationLogo from "@/Components/ApplicationLogo";
import { Users, Crown, Shield, Wallet, FileText, Target, Activity, Package, User, ArrowLeft } from "lucide-react";

const jabatanInfo = {
    ketua: { label: "Ketua", icon: Crown, color: "bg-green-400" },
    wakil_ketua: { label: "Wakil Ketua", icon: Crown, color: "bg-green-400" },
    bendahara: { label: "Bendahara", icon: Wallet, color: "bg-green-400" },
    wakil_bendahara: { label: "Wakil Bendahara", icon: Wallet, color: "bg-green-400" },
    sekretaris: { label: "Sekretaris", icon: FileText, color: "bg-green-400" },
    wakil_sekretaris: { label: "Wakil Sekretaris", icon: FileText, color: "bg-green-400" },
    koordinator_kepelatihan: { label: "Koordinator Kepelatihan", icon: Target, color: "bg-green-400" },
    koordinator_medinfo: { label: "Koordinator Medinfo", icon: Activity, color: "bg-green-400" },
    koordinator_keperalatan: { label: "Koordinator Keperalatan", icon: Package, color: "bg-green-400" },
    anggota: { label: "Anggota", icon: User, color: "bg-green-400" }
};

export default function StrukturOrganisasi({ auth, pengurus, anggota }) {
    const [selectedUser, setSelectedUser] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [selectedJabatan, setSelectedJabatan] = useState("");
    
    const today = new Date();
    const formatDate = (date) => {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('id-ID', options);
    };

    const handleUpdateJabatan = (user) => {
        setSelectedUser(user);
        setSelectedJabatan(user.jabatan);
        setShowModal(true);
    };

    const handleConfirmUpdate = () => {
        if (!selectedUser || !selectedJabatan) return;
        setShowModal(false);
        setShowConfirmModal(true);
    };

    const submitUpdateJabatan = () => {
        if (!selectedUser || !selectedJabatan) return;

        router.post(
            route("admin.struktur.update", selectedUser.id),
            { jabatan: selectedJabatan },
            {
                onSuccess: () => {
                    setShowConfirmModal(false);
                    setSelectedUser(null);
                    setSelectedJabatan("");
                },
            }
        );
    };

    const cancelConfirm = () => {
        setShowConfirmModal(false);
        setShowModal(true);
    };

    const PengurusCard = ({ user }) => {
        const info = jabatanInfo[user.jabatan];
        const photoUrl = user.pasfoto ? `/storage/${user.pasfoto}` : '/images/no_image_placeholder.png';

        return (
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex flex-col items-center">
                    {/* Foto Profil */}
                    <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-gray-200 shadow-lg mb-4">
                        <img 
                            src={photoUrl} 
                            alt={user.name}
                            className="w-full h-full object-cover"
                            onError={(e) => { e.target.src = '/images/no_image_placeholder.png'; }}
                        />
                    </div>
                    <div className="text-center mb-4">
                        <h3 className="text-xl font-bold text-gray-800 mb-1">{user.name}</h3>
                        <p className={`text-sm font-semibold ${info.color.replace('bg-', 'text-')}`}>
                            {info.label}
                        </p>
                        {user.nim && (
                            <p className="text-sm text-gray-500 mt-1">NIM: {user.nim}</p>
                        )}
                        {user.fakultas && (
                            <p className="text-xs text-gray-400">{user.fakultas}</p>
                        )}
                    </div>
                    <button
                        onClick={() => handleUpdateJabatan(user)}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
                    >
                        Ubah Jabatan
                    </button>
                </div>
            </div>
        );
    };

    const AnggotaCard = ({ user }) => {
        const photoUrl = user.pasfoto ? `/storage/${user.pasfoto}` : '/images/no_image_placeholder.png';
        
        return (
            <div className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-200 shadow flex-shrink-0">
                            <img 
                                src={photoUrl} 
                                alt={user.name}
                                className="w-full h-full object-cover"
                                onError={(e) => { e.target.src = '/images/no_image_placeholder.png'; }}
                            />
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-800">{user.name}</h4>
                            {user.nim && (
                                <p className="text-sm text-gray-500">NIM: {user.nim}</p>
                            )}
                            {user.fakultas && (
                                <p className="text-xs text-gray-400">{user.fakultas}</p>
                            )}
                        </div>
                    </div>
                    <button
                        onClick={() => handleUpdateJabatan(user)}
                        className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors text-sm"
                    >
                        Jadikan Pengurus
                    </button>
                </div>
            </div>
        );
    };

    return (
        <AdminLayout user={auth.user}>
            <Head title="Struktur Organisasi" />

            <div className="py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center gap-4">
                            <Link href="/admin" className="p-2 text-blue-600 hover:bg-blue-50 rounded-md">
                                <ArrowLeft className="w-5 h-5" />
                            </Link>
                            <div>
                                <h2 className="text-sm text-gray-500">{formatDate(today)}</h2>
                                <h1 className="text-3xl font-semibold mt-1">Struktur Organisasi</h1>
                            </div>
                        </div>
                    </div>

                    {/* Pengurus Section */}
                    <div className="mb-12">
                        <div className="flex items-center space-x-2 mb-6">
                        
                            <h2 className="text-2xl font-bold text-gray-900">
                                Pengurus
                            </h2>
                            <span className="bg-yellow-100 text-yellow-800 text-sm font-semibold px-3 py-1 rounded-full">
                                {pengurus.length} Orang
                            </span>
                        </div>

                        {pengurus.length > 0 ? (
                            <>
                                {/* Baris 1: Ketua dan Wakil Ketua */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                    {pengurus.filter(u => u.jabatan === 'ketua' || u.jabatan === 'wakil_ketua').map((user) => (
                                        <PengurusCard key={user.id} user={user} />
                                    ))}
                                </div>
                                
                                {/* Baris 2: Bendahara, Wakil Bendahara, Sekretaris, Wakil Sekretaris */}
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
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
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-8 text-center">
                                <Crown className="w-12 h-12 text-yellow-400 mx-auto mb-3" />
                                <p className="text-gray-600">
                                    Belum ada pengurus yang ditunjuk
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Anggota Section */}
                    <div>
                        <div className="flex items-center space-x-2 mb-6">
                            <Users className="w-6 h-6 text-gray-600" />
                            <h2 className="text-2xl font-bold text-gray-900">
                                Daftar Anggota
                            </h2>
                            <span className="bg-gray-100 text-gray-800 text-sm font-semibold px-3 py-1 rounded-full">
                                {anggota.length} Orang
                            </span>
                        </div>

                        {anggota.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {anggota.map((user) => (
                                    <AnggotaCard key={user.id} user={user} />
                                ))}
                            </div>
                        ) : (
                            <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
                                <Users className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                                <p className="text-gray-600">
                                    Belum ada anggota terdaftar
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Modal Update Jabatan */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 max-h-[90vh] flex flex-col">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">
                            Ubah Jabatan
                        </h3>
                        <p className="text-gray-600 mb-4">
                            Pilih jabatan untuk: <span className="font-semibold">{selectedUser?.name}</span>
                        </p>

                        <div className="space-y-2 mb-6 overflow-y-auto max-h-96 pr-2">
                            {Object.entries(jabatanInfo).map(([key, info]) => {
                                return (
                                    <label
                                        key={key}
                                        className={`flex items-center space-x-3 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                                            selectedJabatan === key
                                                ? "bg-blue-50 border-blue-500"
                                                : "border-gray-200 hover:border-gray-300"
                                        }`}
                                    >
                                        <input
                                            type="radio"
                                            name="jabatan"
                                            value={key}
                                            checked={selectedJabatan === key}
                                            onChange={(e) => setSelectedJabatan(e.target.value)}
                                            className="w-4 h-4"
                                        />
                                        <span className="font-medium text-gray-800">{info.label}</span>
                                    </label>
                                );
                            })}
                        </div>

                        <div className="flex space-x-3 mt-auto">
                            <button
                                onClick={() => {
                                    setShowModal(false);
                                    setSelectedUser(null);
                                    setSelectedJabatan("");
                                }}
                                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                Batal
                            </button>
                            <button
                                onClick={handleConfirmUpdate}
                                className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                            >
                                Lanjutkan
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal Konfirmasi */}
            {showConfirmModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
                        <div className="text-center mb-6">
                            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">
                                Konfirmasi Perubahan
                            </h3>
                            <p className="text-gray-600 mb-4">
                                Apakah Anda yakin ingin mengubah jabatan?
                            </p>
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                                <p className="text-sm text-gray-700">
                                    <span className="font-semibold">{selectedUser?.name}</span>
                                </p>
                                <p className="text-xs text-gray-500 mt-1">akan dijadikan</p>
                                <p className="text-lg font-bold text-blue-600 mt-1">
                                    {jabatanInfo[selectedJabatan]?.label}
                                </p>
                            </div>
                            {selectedJabatan !== 'anggota' && (
                                <p className="text-xs text-yellow-600 mb-4">
                                    ⚠️ Jika ada pengurus lain dengan jabatan yang sama, mereka akan otomatis menjadi anggota.
                                </p>
                            )}
                        </div>

                        <div className="flex space-x-3">
                            <button
                                onClick={cancelConfirm}
                                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                Kembali
                            </button>
                            <button
                                onClick={submitUpdateJabatan}
                                className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-semibold"
                            >
                                Ya, Ubah Jabatan
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
