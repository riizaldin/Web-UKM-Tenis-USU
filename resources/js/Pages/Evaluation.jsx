import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';

export default function Evaluation({ auth }) {
    const [selectedCommittee, setSelectedCommittee] = useState(null);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [hasSubmitted, setHasSubmitted] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        committee_id: '',
        committee_name: '',
        ratings: {
            responsibility: 5,
            communication: 5,
            performance: 5,
            initiative: 5,
            teamwork: 5
        },
        strengths: '',
        improvements: '',
        additional_comments: ''
    });

    // Data pengurus yang bisa dinilai
    const committees = [
        {
            id: 1,
            name: 'Budi Santoso',
            position: 'Ketua UKM',
            faculty: 'Teknik',
            year: '2021',
            image: null,
            achievements: ['Mengadakan 5 turnamen', 'Meningkatkan anggota 40%']
        },
        {
            id: 2,
            name: 'Siti Rahma',
            position: 'Wakil Ketua',
            faculty: 'FISIP',
            year: '2021',
            image: null,
            achievements: ['Koordinasi kegiatan lancar', 'Komunikasi anggota baik']
        },
        {
            id: 3,
            name: 'Ahmad Rizki',
            position: 'Sekretaris',
            faculty: 'Ekonomi',
            year: '2022',
            image: null,
            achievements: ['Administrasi rapi', 'Notulensi tepat waktu']
        },
        {
            id: 4,
            name: 'Dewi Lestari',
            position: 'Bendahara',
            faculty: 'Kedokteran',
            year: '2022',
            image: null,
            achievements: ['Keuangan transparan', 'Laporan akurat']
        },
        {
            id: 5,
            name: 'Andi Pratama',
            position: 'Koordinator Latihan',
            faculty: 'FKM',
            year: '2022',
            image: null,
            achievements: ['Jadwal teratur', 'Metode latihan efektif']
        },
        {
            id: 6,
            name: 'Rini Wulandari',
            position: 'Koordinator Humas',
            faculty: 'Hukum',
            year: '2023',
            image: null,
            achievements: ['Publikasi aktif', 'Sponsorship meningkat']
        }
    ];

    const ratingCategories = [
        {
            key: 'responsibility',
            label: 'Tanggung Jawab',
            description: 'Seberapa baik pengurus menjalankan tugas dan tanggung jawabnya'
        },
        {
            key: 'communication',
            label: 'Komunikasi',
            description: 'Kemampuan berkomunikasi dengan anggota dan pengurus lain'
        },
        {
            key: 'performance',
            label: 'Kinerja',
            description: 'Hasil kerja dan pencapaian dalam menjalankan program'
        },
        {
            key: 'initiative',
            label: 'Inisiatif',
            description: 'Proaktif dalam memberikan ide dan solusi'
        },
        {
            key: 'teamwork',
            label: 'Kerjasama Tim',
            description: 'Kemampuan bekerja sama dengan tim pengurus'
        }
    ];

    const handleSelectCommittee = (committee) => {
        setSelectedCommittee(committee);
        setData({
            ...data,
            committee_id: committee.id,
            committee_name: committee.name
        });
    };

    const handleRatingChange = (category, value) => {
        setData('ratings', {
            ...data.ratings,
            [category]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Simulasi submit (dalam real implementation akan post ke backend)
        console.log('Submitting evaluation:', data);
        
        // Show success modal
        setShowSuccessModal(true);
        setHasSubmitted(true);
        
        // Reset after 2 seconds
        setTimeout(() => {
            setShowSuccessModal(false);
            setSelectedCommittee(null);
            reset();
        }, 2000);
    };

    const calculateAverageRating = () => {
        const ratings = Object.values(data.ratings);
        const sum = ratings.reduce((acc, val) => acc + val, 0);
        return (sum / ratings.length).toFixed(1);
    };

    const getRatingLabel = (rating) => {
        if (rating >= 9) return 'Sangat Baik';
        if (rating >= 7) return 'Baik';
        if (rating >= 5) return 'Cukup';
        if (rating >= 3) return 'Kurang';
        return 'Sangat Kurang';
    };

    const getRatingColor = (rating) => {
        if (rating >= 9) return 'text-green-600';
        if (rating >= 7) return 'text-blue-600';
        if (rating >= 5) return 'text-yellow-600';
        if (rating >= 3) return 'text-orange-600';
        return 'text-red-600';
    };

    return (
        <AppLayout title="Penilaian Pengurus">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-[#43CEA2] to-[#185A9D] text-white py-12">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl font-bold mb-4">Penilaian Pengurus</h1>
                    <p className="text-lg text-white/90">
                        Berikan penilaian untuk kinerja pengurus UKM Tenis USU
                    </p>
                </div>
            </div>

            {/* Info Banner */}
            <div className="bg-blue-50 border-l-4 border-blue-500">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-start">
                        <svg className="w-6 h-6 text-blue-500 mt-0.5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                        </svg>
                        <div>
                            <h3 className="text-blue-800 font-semibold mb-1">Penilaian Anonim & Rahasia</h3>
                            <p className="text-blue-700 text-sm">
                                Penilaian Anda bersifat anonim dan akan dijaga kerahasiaannya. Berikan penilaian yang jujur dan objektif untuk membantu pengurus meningkatkan kinerja.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Daftar Pengurus */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
                            <h2 className="text-xl font-bold text-gray-800 mb-4">Pilih Pengurus</h2>
                            <div className="space-y-3">
                                {committees.map((committee) => (
                                    <button
                                        key={committee.id}
                                        onClick={() => handleSelectCommittee(committee)}
                                        className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                                            selectedCommittee?.id === committee.id
                                                ? 'border-prismarine bg-prismarine/5'
                                                : 'border-gray-200 hover:border-prismarine/50 hover:bg-gray-50'
                                        }`}
                                    >
                                        <div className="flex items-center space-x-3">
                                            <div className="w-12 h-12 bg-gradient-to-br from-prismarine to-[#185A9D] rounded-full flex items-center justify-center text-white font-bold text-lg">
                                                {committee.name.charAt(0)}
                                            </div>
                                            <div className="flex-1">
                                                <div className="font-semibold text-gray-800">{committee.name}</div>
                                                <div className="text-sm text-gray-600">{committee.position}</div>
                                                <div className="text-xs text-gray-500">{committee.faculty} • {committee.year}</div>
                                            </div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Form Penilaian */}
                    <div className="lg:col-span-2">
                        {!selectedCommittee ? (
                            <div className="bg-white rounded-lg shadow-lg p-12 text-center">
                                <svg className="w-24 h-24 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                                </svg>
                                <h3 className="text-xl font-semibold text-gray-700 mb-2">Pilih Pengurus</h3>
                                <p className="text-gray-500">Pilih pengurus dari daftar di sebelah kiri untuk memberikan penilaian</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8">
                                {/* Committee Info */}
                                <div className="mb-8 p-6 bg-gradient-to-r from-prismarine/10 to-[#185A9D]/10 rounded-lg border-2 border-prismarine/20">
                                    <div className="flex items-center space-x-4 mb-4">
                                        <div className="w-16 h-16 bg-gradient-to-br from-prismarine to-[#185A9D] rounded-full flex items-center justify-center text-white font-bold text-2xl">
                                            {selectedCommittee.name.charAt(0)}
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-bold text-gray-800">{selectedCommittee.name}</h3>
                                            <div className="text-prismarine font-semibold">{selectedCommittee.position}</div>
                                            <div className="text-sm text-gray-600">{selectedCommittee.faculty} • Angkatan {selectedCommittee.year}</div>
                                        </div>
                                    </div>
                                    {selectedCommittee.achievements && selectedCommittee.achievements.length > 0 && (
                                        <div className="mt-4">
                                            <div className="text-sm font-semibold text-gray-700 mb-2">Pencapaian:</div>
                                            <ul className="space-y-1">
                                                {selectedCommittee.achievements.map((achievement, index) => (
                                                    <li key={index} className="text-sm text-gray-600 flex items-start">
                                                        <svg className="w-4 h-4 text-green-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                        </svg>
                                                        {achievement}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>

                                {/* Rating Categories */}
                                <div className="mb-8">
                                    <h3 className="text-xl font-bold text-gray-800 mb-6">Penilaian Kinerja</h3>
                                    <div className="space-y-6">
                                        {ratingCategories.map((category) => (
                                            <div key={category.key} className="p-4 bg-gray-50 rounded-lg">
                                                <div className="flex justify-between items-start mb-3">
                                                    <div>
                                                        <label className="block text-sm font-semibold text-gray-800 mb-1">
                                                            {category.label}
                                                        </label>
                                                        <p className="text-xs text-gray-600">{category.description}</p>
                                                    </div>
                                                    <div className="text-right">
                                                        <div className={`text-2xl font-bold ${getRatingColor(data.ratings[category.key])}`}>
                                                            {data.ratings[category.key]}
                                                        </div>
                                                        <div className={`text-xs font-semibold ${getRatingColor(data.ratings[category.key])}`}>
                                                            {getRatingLabel(data.ratings[category.key])}
                                                        </div>
                                                    </div>
                                                </div>
                                                <input
                                                    type="range"
                                                    min="1"
                                                    max="10"
                                                    value={data.ratings[category.key]}
                                                    onChange={(e) => handleRatingChange(category.key, parseInt(e.target.value))}
                                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-prismarine"
                                                />
                                                <div className="flex justify-between text-xs text-gray-500 mt-1">
                                                    <span>1 (Sangat Kurang)</span>
                                                    <span>10 (Sangat Baik)</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Average Rating */}
                                    <div className="mt-6 p-4 bg-prismarine/10 rounded-lg border-2 border-prismarine/30">
                                        <div className="flex justify-between items-center">
                                            <div>
                                                <div className="text-sm font-semibold text-gray-700">Rata-rata Penilaian</div>
                                                <div className="text-xs text-gray-600">Dari semua kategori</div>
                                            </div>
                                            <div className="text-right">
                                                <div className={`text-3xl font-bold ${getRatingColor(parseFloat(calculateAverageRating()))}`}>
                                                    {calculateAverageRating()}
                                                </div>
                                                <div className={`text-sm font-semibold ${getRatingColor(parseFloat(calculateAverageRating()))}`}>
                                                    {getRatingLabel(parseFloat(calculateAverageRating()))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Kelebihan */}
                                <div className="mb-6">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Kelebihan / Hal Positif
                                    </label>
                                    <textarea
                                        value={data.strengths}
                                        onChange={(e) => setData('strengths', e.target.value)}
                                        placeholder="Tuliskan hal-hal positif yang telah dilakukan pengurus..."
                                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-prismarine focus:outline-none resize-none"
                                        rows="3"
                                    ></textarea>
                                </div>

                                {/* Saran Perbaikan */}
                                <div className="mb-6">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Saran Perbaikan
                                    </label>
                                    <textarea
                                        value={data.improvements}
                                        onChange={(e) => setData('improvements', e.target.value)}
                                        placeholder="Tuliskan saran untuk perbaikan kinerja pengurus..."
                                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-prismarine focus:outline-none resize-none"
                                        rows="3"
                                    ></textarea>
                                </div>

                                {/* Komentar Tambahan */}
                                <div className="mb-8">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Komentar Tambahan (Opsional)
                                    </label>
                                    <textarea
                                        value={data.additional_comments}
                                        onChange={(e) => setData('additional_comments', e.target.value)}
                                        placeholder="Komentar atau masukan lainnya..."
                                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-prismarine focus:outline-none resize-none"
                                        rows="3"
                                    ></textarea>
                                </div>

                                {/* Submit Buttons */}
                                <div className="flex space-x-4">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="flex-1 py-4 bg-gradient-to-r from-[#43CEA2] to-[#185A9D] text-white rounded-lg font-bold text-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {processing ? 'Mengirim...' : 'Kirim Penilaian'}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setSelectedCommittee(null);
                                            reset();
                                        }}
                                        className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-lg font-bold hover:bg-gray-50 transition-colors"
                                    >
                                        Batal
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>

            {/* Success Modal */}
            {showSuccessModal && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg p-8 max-w-md w-full text-center animate-fade-in">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">Penilaian Berhasil Dikirim!</h3>
                        <p className="text-gray-600">
                            Terima kasih atas penilaian Anda. Masukan Anda akan membantu pengurus meningkatkan kinerja.
                        </p>
                    </div>
                </div>
            )}
        </AppLayout>
    );
}
