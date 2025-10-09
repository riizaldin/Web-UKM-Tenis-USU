import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';

export default function Reports() {
    const [selectedReport, setSelectedReport] = useState(null);
    const [filterPeriod, setFilterPeriod] = useState('monthly'); // monthly, quarterly, yearly
    const [filterMonth, setFilterMonth] = useState('10');
    const [filterYear, setFilterYear] = useState('2025');

    // Report Categories
    const reportCategories = [
        {
            id: 'finance',
            name: 'Laporan Keuangan',
            icon: '💰',
            color: 'from-green-500 to-green-600',
            description: 'Laporan pemasukan, pengeluaran, dan kas UKM',
            reports: [
                { id: 'kas', name: 'Laporan Kas', icon: '📊' },
                { id: 'income', name: 'Laporan Pemasukan', icon: '📈' },
                { id: 'expense', name: 'Laporan Pengeluaran', icon: '📉' },
                { id: 'balance', name: 'Neraca Keuangan', icon: '⚖️' }
            ]
        },
        {
            id: 'attendance',
            name: 'Laporan Kehadiran',
            icon: '✅',
            color: 'from-blue-500 to-blue-600',
            description: 'Laporan absensi dan kehadiran anggota',
            reports: [
                { id: 'attendance_summary', name: 'Ringkasan Kehadiran', icon: '📋' },
                { id: 'attendance_detail', name: 'Detail Kehadiran', icon: '📝' },
                { id: 'attendance_percentage', name: 'Persentase Kehadiran', icon: '📊' }
            ]
        },
        {
            id: 'members',
            name: 'Laporan Anggota',
            icon: '👥',
            color: 'from-purple-500 to-purple-600',
            description: 'Laporan data dan statistik anggota',
            reports: [
                { id: 'member_list', name: 'Daftar Anggota', icon: '📄' },
                { id: 'member_stats', name: 'Statistik Anggota', icon: '📊' },
                { id: 'member_growth', name: 'Pertumbuhan Anggota', icon: '📈' }
            ]
        },
        {
            id: 'activities',
            name: 'Laporan Kegiatan',
            icon: '📅',
            color: 'from-orange-500 to-orange-600',
            description: 'Laporan kegiatan, latihan, dan event',
            reports: [
                { id: 'activity_summary', name: 'Ringkasan Kegiatan', icon: '📑' },
                { id: 'training_report', name: 'Laporan Latihan', icon: '🎾' },
                { id: 'tournament_report', name: 'Laporan Turnamen', icon: '🏆' }
            ]
        },
        {
            id: 'performance',
            name: 'Laporan Kinerja',
            icon: '📈',
            color: 'from-red-500 to-red-600',
            description: 'Laporan kinerja pengurus dan prestasi',
            reports: [
                { id: 'board_performance', name: 'Kinerja Pengurus', icon: '👔' },
                { id: 'achievements', name: 'Prestasi & Penghargaan', icon: '🏅' },
                { id: 'program_evaluation', name: 'Evaluasi Program', icon: '📊' }
            ]
        }
    ];

    // Sample report data
    const reportData = {
        kas: {
            title: 'Laporan Kas',
            period: 'Oktober 2025',
            summary: {
                saldoAwal: 15500000,
                totalPemasukan: 7800000,
                totalPengeluaran: 2100000,
                saldoAkhir: 21200000
            },
            transactions: [
                { date: '2025-10-01', description: 'Saldo Awal', debit: 15500000, credit: 0, balance: 15500000 },
                { date: '2025-10-03', description: 'Iuran Kas Anggota - Oktober', debit: 7800000, credit: 0, balance: 23300000 },
                { date: '2025-10-05', description: 'Pembelian Bola Tenis (50 pcs)', debit: 0, credit: 1500000, balance: 21800000 },
                { date: '2025-10-07', description: 'Perawatan Lapangan', debit: 0, credit: 600000, balance: 21200000 }
            ]
        },
        attendance_summary: {
            title: 'Ringkasan Kehadiran',
            period: 'Oktober 2025',
            summary: {
                totalKegiatan: 8,
                totalAnggota: 156,
                rataRataKehadiran: 87.5,
                totalHadir: 1092,
                totalTerlambat: 84,
                totalIzin: 36,
                totalAlpa: 36
            },
            byActivity: [
                { activity: 'Latihan Rutin', total: 4, avgAttendance: 89, hadir: 140, terlambat: 12, izin: 4, alpa: 4 },
                { activity: 'Sparing Partner', total: 2, avgAttendance: 85, hadir: 85, terlambat: 5, izin: 5, alpa: 5 },
                { activity: 'Workshop', total: 1, avgAttendance: 92, hadir: 48, terlambat: 2, izin: 2, alpa: 0 },
                { activity: 'Rapat Pengurus', total: 1, avgAttendance: 80, hadir: 12, terlambat: 2, izin: 1, alpa: 0 }
            ]
        },
        member_stats: {
            title: 'Statistik Anggota',
            period: 'Oktober 2025',
            summary: {
                totalAnggota: 156,
                anggotaBaru: 12,
                anggotaAktif: 148,
                anggotaNonAktif: 8
            },
            byFaculty: [
                { faculty: 'FASILKOM-TI', count: 45, percentage: 28.8 },
                { faculty: 'Teknik', count: 38, percentage: 24.4 },
                { faculty: 'Ekonomi', count: 28, percentage: 17.9 },
                { faculty: 'MIPA', count: 22, percentage: 14.1 },
                { faculty: 'Kedokteran', count: 15, percentage: 9.6 },
                { faculty: 'Lainnya', count: 8, percentage: 5.1 }
            ],
            byYear: [
                { year: '2025', count: 28, label: 'Angkatan 2025' },
                { year: '2024', count: 42, label: 'Angkatan 2024' },
                { year: '2023', count: 38, label: 'Angkatan 2023' },
                { year: '2022', count: 32, label: 'Angkatan 2022' },
                { year: '2021', count: 16, label: 'Angkatan 2021 & sebelumnya' }
            ]
        },
        activity_summary: {
            title: 'Ringkasan Kegiatan',
            period: 'Oktober 2025',
            summary: {
                totalKegiatan: 12,
                latihan: 6,
                turnamen: 2,
                workshop: 2,
                event: 2
            },
            activities: [
                { date: '2025-10-03', name: 'Latihan Rutin', type: 'Latihan', participants: 52, status: 'Selesai' },
                { date: '2025-10-05', name: 'Workshop Teknik Serve', type: 'Workshop', participants: 48, status: 'Selesai' },
                { date: '2025-10-10', name: 'Latihan Rutin', type: 'Latihan', participants: 45, status: 'Berlangsung' },
                { date: '2025-10-12', name: 'Latihan Rutin', type: 'Latihan', participants: 0, status: 'Dijadwalkan' },
                { date: '2025-10-15', name: 'Turnamen Internal', type: 'Turnamen', participants: 32, status: 'Dijadwalkan' }
            ]
        }
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(amount);
    };

    const handleDownloadReport = (reportId) => {
        // Simulasi download report
        alert(`Downloading ${reportId} report...\n\nDalam implementasi real, akan generate PDF/Excel`);
    };

    const handlePrintReport = (reportId) => {
        // Simulasi print report
        window.print();
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Selesai':
                return 'bg-green-100 text-green-700';
            case 'Berlangsung':
                return 'bg-blue-100 text-blue-700';
            case 'Dijadwalkan':
                return 'bg-yellow-100 text-yellow-700';
            default:
                return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <AppLayout title="Laporan">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-[#43CEA2] to-[#185A9D] text-white py-12">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl font-bold mb-4">Laporan UKM</h1>
                    <p className="text-lg text-white/90">
                        Akses dan download berbagai laporan UKM Tenis USU
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                {!selectedReport ? (
                    /* Report Categories Grid */
                    <div>
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-2">Pilih Kategori Laporan</h2>
                            <p className="text-gray-600">Klik pada kategori untuk melihat laporan yang tersedia</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {reportCategories.map((category) => (
                                <div
                                    key={category.id}
                                    className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
                                >
                                    <div className={`bg-gradient-to-br ${category.color} p-6 text-white`}>
                                        <div className="text-5xl mb-3">{category.icon}</div>
                                        <h3 className="text-xl font-bold mb-2">{category.name}</h3>
                                        <p className="text-sm text-white/90">{category.description}</p>
                                    </div>
                                    <div className="p-6">
                                        <div className="space-y-3">
                                            {category.reports.map((report) => (
                                                <button
                                                    key={report.id}
                                                    onClick={() => setSelectedReport(report.id)}
                                                    className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-prismarine/10 hover:border-prismarine border-2 border-transparent transition-all"
                                                >
                                                    <div className="flex items-center space-x-3">
                                                        <span className="text-2xl">{report.icon}</span>
                                                        <span className="font-semibold text-gray-800">{report.name}</span>
                                                    </div>
                                                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                                    </svg>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Quick Stats */}
                        <div className="mt-12">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">Statistik Cepat</h2>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                                <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-lg p-6 shadow-lg">
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="text-sm opacity-90">Total Anggota</span>
                                        <svg className="w-8 h-8 opacity-75" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                    </div>
                                    <div className="text-4xl font-bold">156</div>
                                    <div className="text-sm opacity-75 mt-2">+12 bulan ini</div>
                                </div>

                                <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-lg p-6 shadow-lg">
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="text-sm opacity-90">Kehadiran Rata-rata</span>
                                        <svg className="w-8 h-8 opacity-75" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <div className="text-4xl font-bold">87.5%</div>
                                    <div className="text-sm opacity-75 mt-2">Oktober 2025</div>
                                </div>

                                <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-lg p-6 shadow-lg">
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="text-sm opacity-90">Total Kegiatan</span>
                                        <svg className="w-8 h-8 opacity-75" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <div className="text-4xl font-bold">12</div>
                                    <div className="text-sm opacity-75 mt-2">Bulan ini</div>
                                </div>

                                <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-lg p-6 shadow-lg">
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="text-sm opacity-90">Saldo Kas</span>
                                        <svg className="w-8 h-8 opacity-75" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                    </div>
                                    <div className="text-4xl font-bold">21.2M</div>
                                    <div className="text-sm opacity-75 mt-2">Per Oktober 2025</div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    /* Report Detail View */
                    <div>
                        {/* Back Button & Actions */}
                        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                            <button
                                onClick={() => setSelectedReport(null)}
                                className="flex items-center text-prismarine hover:text-prismarine/80 font-semibold"
                            >
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                                </svg>
                                Kembali ke Daftar Laporan
                            </button>

                            <div className="flex space-x-3">
                                <button
                                    onClick={() => handlePrintReport(selectedReport)}
                                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold flex items-center"
                                >
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                                    </svg>
                                    Print
                                </button>
                                <button
                                    onClick={() => handleDownloadReport(selectedReport)}
                                    className="px-4 py-2 bg-prismarine text-white rounded-lg hover:bg-prismarine/90 transition-colors font-semibold flex items-center"
                                >
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                    </svg>
                                    Download PDF
                                </button>
                            </div>
                        </div>

                        {/* Report Content */}
                        {selectedReport === 'kas' && reportData.kas && (
                            <div className="bg-white rounded-lg shadow-lg p-8">
                                <div className="border-b border-gray-200 pb-6 mb-6">
                                    <h2 className="text-3xl font-bold text-gray-800 mb-2">{reportData.kas.title}</h2>
                                    <p className="text-gray-600">Periode: {reportData.kas.period}</p>
                                </div>

                                {/* Summary Cards */}
                                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                                    <div className="p-6 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                                        <div className="text-sm text-gray-600 mb-1">Saldo Awal</div>
                                        <div className="text-2xl font-bold text-gray-800">
                                            {formatCurrency(reportData.kas.summary.saldoAwal)}
                                        </div>
                                    </div>
                                    <div className="p-6 bg-green-50 rounded-lg border-l-4 border-green-500">
                                        <div className="text-sm text-gray-600 mb-1">Total Pemasukan</div>
                                        <div className="text-2xl font-bold text-green-600">
                                            {formatCurrency(reportData.kas.summary.totalPemasukan)}
                                        </div>
                                    </div>
                                    <div className="p-6 bg-red-50 rounded-lg border-l-4 border-red-500">
                                        <div className="text-sm text-gray-600 mb-1">Total Pengeluaran</div>
                                        <div className="text-2xl font-bold text-red-600">
                                            {formatCurrency(reportData.kas.summary.totalPengeluaran)}
                                        </div>
                                    </div>
                                    <div className="p-6 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                                        <div className="text-sm text-gray-600 mb-1">Saldo Akhir</div>
                                        <div className="text-2xl font-bold text-purple-600">
                                            {formatCurrency(reportData.kas.summary.saldoAkhir)}
                                        </div>
                                    </div>
                                </div>

                                {/* Transactions Table */}
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Tanggal</th>
                                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Keterangan</th>
                                                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase">Debit</th>
                                                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase">Kredit</th>
                                                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase">Saldo</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200">
                                            {reportData.kas.transactions.map((transaction, index) => (
                                                <tr key={index} className="hover:bg-gray-50">
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                                        {new Date(transaction.date).toLocaleDateString('id-ID')}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-gray-800">{transaction.description}</td>
                                                    <td className="px-6 py-4 text-right text-sm font-semibold text-green-600">
                                                        {transaction.debit > 0 ? formatCurrency(transaction.debit) : '-'}
                                                    </td>
                                                    <td className="px-6 py-4 text-right text-sm font-semibold text-red-600">
                                                        {transaction.credit > 0 ? formatCurrency(transaction.credit) : '-'}
                                                    </td>
                                                    <td className="px-6 py-4 text-right text-sm font-bold text-gray-800">
                                                        {formatCurrency(transaction.balance)}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                        {selectedReport === 'attendance_summary' && reportData.attendance_summary && (
                            <div className="bg-white rounded-lg shadow-lg p-8">
                                <div className="border-b border-gray-200 pb-6 mb-6">
                                    <h2 className="text-3xl font-bold text-gray-800 mb-2">{reportData.attendance_summary.title}</h2>
                                    <p className="text-gray-600">Periode: {reportData.attendance_summary.period}</p>
                                </div>

                                {/* Summary Cards */}
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                                    <div className="p-4 bg-gray-50 rounded-lg">
                                        <div className="text-xs text-gray-600 mb-1">Total Kegiatan</div>
                                        <div className="text-2xl font-bold text-gray-800">
                                            {reportData.attendance_summary.summary.totalKegiatan}
                                        </div>
                                    </div>
                                    <div className="p-4 bg-green-50 rounded-lg">
                                        <div className="text-xs text-gray-600 mb-1">Hadir</div>
                                        <div className="text-2xl font-bold text-green-600">
                                            {reportData.attendance_summary.summary.totalHadir}
                                        </div>
                                    </div>
                                    <div className="p-4 bg-yellow-50 rounded-lg">
                                        <div className="text-xs text-gray-600 mb-1">Terlambat</div>
                                        <div className="text-2xl font-bold text-yellow-600">
                                            {reportData.attendance_summary.summary.totalTerlambat}
                                        </div>
                                    </div>
                                    <div className="p-4 bg-blue-50 rounded-lg">
                                        <div className="text-xs text-gray-600 mb-1">Izin</div>
                                        <div className="text-2xl font-bold text-blue-600">
                                            {reportData.attendance_summary.summary.totalIzin}
                                        </div>
                                    </div>
                                    <div className="p-4 bg-red-50 rounded-lg">
                                        <div className="text-xs text-gray-600 mb-1">Alpa</div>
                                        <div className="text-2xl font-bold text-red-600">
                                            {reportData.attendance_summary.summary.totalAlpa}
                                        </div>
                                    </div>
                                    <div className="p-4 bg-purple-50 rounded-lg col-span-2 md:col-span-1">
                                        <div className="text-xs text-gray-600 mb-1">Rata-rata</div>
                                        <div className="text-2xl font-bold text-purple-600">
                                            {reportData.attendance_summary.summary.rataRataKehadiran}%
                                        </div>
                                    </div>
                                </div>

                                {/* By Activity Table */}
                                <h3 className="text-xl font-bold text-gray-800 mb-4">Kehadiran per Jenis Kegiatan</h3>
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Kegiatan</th>
                                                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase">Total</th>
                                                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase">Hadir</th>
                                                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase">Terlambat</th>
                                                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase">Izin</th>
                                                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase">Alpa</th>
                                                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase">Avg %</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200">
                                            {reportData.attendance_summary.byActivity.map((activity, index) => (
                                                <tr key={index} className="hover:bg-gray-50">
                                                    <td className="px-6 py-4 text-sm font-semibold text-gray-800">{activity.activity}</td>
                                                    <td className="px-6 py-4 text-center text-sm text-gray-800">{activity.total}</td>
                                                    <td className="px-6 py-4 text-center text-sm font-semibold text-green-600">{activity.hadir}</td>
                                                    <td className="px-6 py-4 text-center text-sm font-semibold text-yellow-600">{activity.terlambat}</td>
                                                    <td className="px-6 py-4 text-center text-sm font-semibold text-blue-600">{activity.izin}</td>
                                                    <td className="px-6 py-4 text-center text-sm font-semibold text-red-600">{activity.alpa}</td>
                                                    <td className="px-6 py-4 text-center text-sm font-bold text-purple-600">{activity.avgAttendance}%</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                        {selectedReport === 'member_stats' && reportData.member_stats && (
                            <div className="bg-white rounded-lg shadow-lg p-8">
                                <div className="border-b border-gray-200 pb-6 mb-6">
                                    <h2 className="text-3xl font-bold text-gray-800 mb-2">{reportData.member_stats.title}</h2>
                                    <p className="text-gray-600">Periode: {reportData.member_stats.period}</p>
                                </div>

                                {/* Summary Cards */}
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                                    <div className="p-6 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                                        <div className="text-sm text-gray-600 mb-1">Total Anggota</div>
                                        <div className="text-3xl font-bold text-blue-600">
                                            {reportData.member_stats.summary.totalAnggota}
                                        </div>
                                    </div>
                                    <div className="p-6 bg-green-50 rounded-lg border-l-4 border-green-500">
                                        <div className="text-sm text-gray-600 mb-1">Anggota Baru</div>
                                        <div className="text-3xl font-bold text-green-600">
                                            {reportData.member_stats.summary.anggotaBaru}
                                        </div>
                                    </div>
                                    <div className="p-6 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                                        <div className="text-sm text-gray-600 mb-1">Aktif</div>
                                        <div className="text-3xl font-bold text-purple-600">
                                            {reportData.member_stats.summary.anggotaAktif}
                                        </div>
                                    </div>
                                    <div className="p-6 bg-gray-50 rounded-lg border-l-4 border-gray-500">
                                        <div className="text-sm text-gray-600 mb-1">Non-Aktif</div>
                                        <div className="text-3xl font-bold text-gray-600">
                                            {reportData.member_stats.summary.anggotaNonAktif}
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                    {/* By Faculty */}
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-800 mb-4">Distribusi per Fakultas</h3>
                                        <div className="space-y-3">
                                            {reportData.member_stats.byFaculty.map((faculty, index) => (
                                                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                                                    <div className="flex justify-between items-center mb-2">
                                                        <span className="font-semibold text-gray-800">{faculty.faculty}</span>
                                                        <span className="text-sm font-bold text-prismarine">{faculty.count} anggota</span>
                                                    </div>
                                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                                        <div
                                                            className="bg-prismarine h-2 rounded-full"
                                                            style={{ width: `${faculty.percentage}%` }}
                                                        ></div>
                                                    </div>
                                                    <div className="text-xs text-gray-600 mt-1">{faculty.percentage}%</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* By Year */}
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-800 mb-4">Distribusi per Angkatan</h3>
                                        <div className="space-y-3">
                                            {reportData.member_stats.byYear.map((year, index) => (
                                                <div key={index} className="p-4 bg-gray-50 rounded-lg flex justify-between items-center">
                                                    <span className="font-semibold text-gray-800">{year.label}</span>
                                                    <span className="text-2xl font-bold text-prismarine">{year.count}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {selectedReport === 'activity_summary' && reportData.activity_summary && (
                            <div className="bg-white rounded-lg shadow-lg p-8">
                                <div className="border-b border-gray-200 pb-6 mb-6">
                                    <h2 className="text-3xl font-bold text-gray-800 mb-2">{reportData.activity_summary.title}</h2>
                                    <p className="text-gray-600">Periode: {reportData.activity_summary.period}</p>
                                </div>

                                {/* Summary Cards */}
                                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
                                    <div className="p-4 bg-purple-50 rounded-lg border-l-4 border-purple-500">
                                        <div className="text-sm text-gray-600 mb-1">Total Kegiatan</div>
                                        <div className="text-3xl font-bold text-purple-600">
                                            {reportData.activity_summary.summary.totalKegiatan}
                                        </div>
                                    </div>
                                    <div className="p-4 bg-green-50 rounded-lg">
                                        <div className="text-sm text-gray-600 mb-1">Latihan</div>
                                        <div className="text-3xl font-bold text-green-600">
                                            {reportData.activity_summary.summary.latihan}
                                        </div>
                                    </div>
                                    <div className="p-4 bg-yellow-50 rounded-lg">
                                        <div className="text-sm text-gray-600 mb-1">Turnamen</div>
                                        <div className="text-3xl font-bold text-yellow-600">
                                            {reportData.activity_summary.summary.turnamen}
                                        </div>
                                    </div>
                                    <div className="p-4 bg-blue-50 rounded-lg">
                                        <div className="text-sm text-gray-600 mb-1">Workshop</div>
                                        <div className="text-3xl font-bold text-blue-600">
                                            {reportData.activity_summary.summary.workshop}
                                        </div>
                                    </div>
                                    <div className="p-4 bg-red-50 rounded-lg">
                                        <div className="text-sm text-gray-600 mb-1">Event</div>
                                        <div className="text-3xl font-bold text-red-600">
                                            {reportData.activity_summary.summary.event}
                                        </div>
                                    </div>
                                </div>

                                {/* Activities Table */}
                                <h3 className="text-xl font-bold text-gray-800 mb-4">Daftar Kegiatan</h3>
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Tanggal</th>
                                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Nama Kegiatan</th>
                                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Tipe</th>
                                                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase">Peserta</th>
                                                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200">
                                            {reportData.activity_summary.activities.map((activity, index) => (
                                                <tr key={index} className="hover:bg-gray-50">
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                                        {new Date(activity.date).toLocaleDateString('id-ID', {
                                                            day: 'numeric',
                                                            month: 'short',
                                                            year: 'numeric'
                                                        })}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm font-semibold text-gray-800">{activity.name}</td>
                                                    <td className="px-6 py-4 text-sm text-gray-600">{activity.type}</td>
                                                    <td className="px-6 py-4 text-center text-sm font-semibold text-gray-800">
                                                        {activity.participants || '-'}
                                                    </td>
                                                    <td className="px-6 py-4 text-center">
                                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(activity.status)}`}>
                                                            {activity.status}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}

                        {/* Default Report Message */}
                        {!['kas', 'attendance_summary', 'member_stats', 'activity_summary'].includes(selectedReport) && (
                            <div className="bg-white rounded-lg shadow-lg p-12 text-center">
                                <svg className="w-24 h-24 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                <h3 className="text-2xl font-bold text-gray-800 mb-2">Laporan Sedang Disiapkan</h3>
                                <p className="text-gray-600 mb-6">
                                    Laporan ini sedang dalam proses pengembangan dan akan segera tersedia.
                                </p>
                                <button
                                    onClick={() => setSelectedReport(null)}
                                    className="px-6 py-3 bg-prismarine text-white rounded-lg hover:bg-prismarine/90 transition-colors font-semibold"
                                >
                                    Kembali ke Daftar Laporan
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
