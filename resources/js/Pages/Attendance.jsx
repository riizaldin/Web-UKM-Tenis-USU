import React, { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';

export default function Attendance({ auth }) {
    const [activeTab, setActiveTab] = useState('scan'); // scan, history
    const [scanStatus, setScanStatus] = useState(null); // null, scanning, success, error
    const [attendanceCode, setAttendanceCode] = useState('');

    // Sample user data (akan diganti dengan data real dari backend)
    const user = {
        name: 'RIZALDI FEBRIANSYAH',
        nim: '221402126',
        role: 'KETUA'
    };

    // Sample attendance history
    const attendanceHistory = [
        {
            id: 1,
            date: '2025-10-09',
            activity: 'Latihan Rutin',
            checkIn: '15:05',
            checkOut: '17:00',
            status: 'Hadir',
            location: 'Lapangan Tenis USU'
        },
        {
            id: 2,
            date: '2025-10-05',
            activity: 'Latihan Rutin',
            checkIn: '15:10',
            checkOut: '16:55',
            status: 'Hadir',
            location: 'Lapangan Tenis USU'
        },
        {
            id: 3,
            date: '2025-10-03',
            activity: 'Sparing Partner',
            checkIn: '08:15',
            checkOut: '10:50',
            status: 'Hadir',
            location: 'Lapangan Tenis USU'
        },
        {
            id: 4,
            date: '2025-09-28',
            activity: 'Latihan Rutin',
            checkIn: '15:00',
            checkOut: null,
            status: 'Terlambat',
            location: 'Lapangan Tenis USU'
        },
        {
            id: 5,
            date: '2025-09-26',
            activity: 'Rapat Pengurus',
            checkIn: null,
            checkOut: null,
            status: 'Izin',
            location: 'Sekretariat UKM'
        },
        {
            id: 6,
            date: '2025-09-21',
            activity: 'Latihan Rutin',
            checkIn: null,
            checkOut: null,
            status: 'Alpa',
            location: 'Lapangan Tenis USU'
        }
    ];

    // Sample attendance statistics
    const stats = {
        totalKegiatan: 24,
        hadir: 18,
        izin: 3,
        terlambat: 2,
        alpa: 1,
        persentase: 87.5
    };

    const handleScanQR = () => {
        setScanStatus('scanning');
        // Simulasi scanning QR Code
        setTimeout(() => {
            setScanStatus('success');
            setTimeout(() => {
                setScanStatus(null);
            }, 3000);
        }, 2000);
    };

    const handleManualAttendance = () => {
        if (attendanceCode.trim() === '') {
            alert('Masukkan kode absensi terlebih dahulu!');
            return;
        }

        // Simulasi submit kode absensi
        setScanStatus('scanning');
        setTimeout(() => {
            setScanStatus('success');
            setAttendanceCode('');
            setTimeout(() => {
                setScanStatus(null);
            }, 3000);
        }, 1500);
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Hadir':
                return 'bg-green-100 text-green-700';
            case 'Terlambat':
                return 'bg-yellow-100 text-yellow-700';
            case 'Izin':
                return 'bg-blue-100 text-blue-700';
            case 'Alpa':
                return 'bg-red-100 text-red-700';
            default:
                return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <AppLayout title="Absensi" auth={auth}>
            {/* Header Section */}
            <div className="bg-gradient-to-r from-[#43CEA2] to-[#185A9D] text-white py-12">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl font-bold mb-4">Absensi Kegiatan</h1>
                    <p className="text-lg text-white/90">
                        Lakukan absensi untuk setiap kegiatan UKM Tenis USU
                    </p>
                </div>
            </div>

            {/* Statistics Cards */}
            <div className="bg-white border-b border-gray-200">
                <div className="container mx-auto px-4 py-8">
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Statistik Kehadiran Anda</h2>
                    <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                        <div className="text-center p-4 bg-gray-50 rounded-lg">
                            <div className="text-2xl font-bold text-prismarine">{stats.totalKegiatan}</div>
                            <div className="text-sm text-gray-600 mt-1">Total Kegiatan</div>
                        </div>
                        <div className="text-center p-4 bg-green-50 rounded-lg">
                            <div className="text-2xl font-bold text-green-600">{stats.hadir}</div>
                            <div className="text-sm text-gray-600 mt-1">Hadir</div>
                        </div>
                        <div className="text-center p-4 bg-blue-50 rounded-lg">
                            <div className="text-2xl font-bold text-blue-600">{stats.izin}</div>
                            <div className="text-sm text-gray-600 mt-1">Izin</div>
                        </div>
                        <div className="text-center p-4 bg-yellow-50 rounded-lg">
                            <div className="text-2xl font-bold text-yellow-600">{stats.terlambat}</div>
                            <div className="text-sm text-gray-600 mt-1">Terlambat</div>
                        </div>
                        <div className="text-center p-4 bg-red-50 rounded-lg">
                            <div className="text-2xl font-bold text-red-600">{stats.alpa}</div>
                            <div className="text-sm text-gray-600 mt-1">Alpa</div>
                        </div>
                        <div className="text-center p-4 bg-prismarine/10 rounded-lg border-2 border-prismarine">
                            <div className="text-2xl font-bold text-prismarine">{stats.persentase}%</div>
                            <div className="text-sm text-gray-600 mt-1">Persentase</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
                <div className="container mx-auto px-4">
                    <div className="flex space-x-8">
                        <button
                            onClick={() => setActiveTab('scan')}
                            className={`py-4 px-2 border-b-2 font-semibold transition-colors ${
                                activeTab === 'scan'
                                    ? 'border-prismarine text-prismarine'
                                    : 'border-transparent text-gray-500 hover:text-gray-700'
                            }`}
                        >
                            Absensi
                        </button>
                        <button
                            onClick={() => setActiveTab('history')}
                            className={`py-4 px-2 border-b-2 font-semibold transition-colors ${
                                activeTab === 'history'
                                    ? 'border-prismarine text-prismarine'
                                    : 'border-transparent text-gray-500 hover:text-gray-700'
                            }`}
                        >
                            Riwayat Kehadiran
                        </button>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                {activeTab === 'scan' ? (
                    /* Scan/Input Attendance Tab */
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* QR Code Scanner */}
                        <div className="bg-white rounded-lg shadow-lg p-8">
                            <div className="text-center mb-6">
                                <div className="bg-prismarine/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-8 h-8 text-prismarine" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                                    </svg>
                                </div>
                                <h2 className="text-2xl font-bold text-gray-800 mb-2">Scan QR Code</h2>
                                <p className="text-gray-600">Scan QR Code yang ditampilkan oleh pengurus</p>
                            </div>

                            {/* QR Scanner Area */}
                            <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center mb-6 border-4 border-dashed border-gray-300">
                                {scanStatus === 'scanning' ? (
                                    <div className="text-center">
                                        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-prismarine mx-auto mb-4"></div>
                                        <p className="text-gray-600 font-semibold">Memproses...</p>
                                    </div>
                                ) : scanStatus === 'success' ? (
                                    <div className="text-center">
                                        <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                        <p className="text-green-600 font-bold text-lg">Absensi Berhasil!</p>
                                        <p className="text-gray-600 text-sm mt-2">Kehadiran Anda telah tercatat</p>
                                    </div>
                                ) : (
                                    <div className="text-center p-8">
                                        <svg className="w-32 h-32 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                                        </svg>
                                        <p className="text-gray-500 font-semibold">Arahkan kamera ke QR Code</p>
                                    </div>
                                )}
                            </div>

                            <button
                                onClick={handleScanQR}
                                disabled={scanStatus !== null}
                                className="w-full py-4 bg-prismarine text-white rounded-lg font-bold text-lg hover:bg-prismarine/90 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                            >
                                {scanStatus === 'scanning' ? 'Memproses...' : scanStatus === 'success' ? 'Berhasil!' : 'Mulai Scan QR Code'}
                            </button>

                            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                                <div className="flex items-start space-x-3">
                                    <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                    </svg>
                                    <div className="text-sm text-blue-800">
                                        <p className="font-semibold mb-1">Cara Absensi dengan QR Code:</p>
                                        <ul className="list-disc list-inside space-y-1">
                                            <li>Klik tombol "Mulai Scan QR Code"</li>
                                            <li>Arahkan kamera ke QR Code yang ditampilkan</li>
                                            <li>Tunggu hingga proses selesai</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Manual Input */}
                        <div className="bg-white rounded-lg shadow-lg p-8">
                            <div className="text-center mb-6">
                                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                    </svg>
                                </div>
                                <h2 className="text-2xl font-bold text-gray-800 mb-2">Input Manual</h2>
                                <p className="text-gray-600">Masukkan kode absensi yang diberikan pengurus</p>
                            </div>

                            <div className="mb-6">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Kode Absensi
                                </label>
                                <input
                                    type="text"
                                    value={attendanceCode}
                                    onChange={(e) => setAttendanceCode(e.target.value.toUpperCase())}
                                    placeholder="Contoh: ABSEN2025"
                                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-prismarine focus:outline-none text-lg font-mono text-center tracking-wider"
                                    maxLength={12}
                                />
                                <p className="text-xs text-gray-500 mt-2">Masukkan kode yang diberikan oleh pengurus</p>
                            </div>

                            <button
                                onClick={handleManualAttendance}
                                disabled={scanStatus !== null}
                                className="w-full py-4 bg-blue-600 text-white rounded-lg font-bold text-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                            >
                                Submit Absensi
                            </button>

                            <div className="mt-6 border-t border-gray-200 pt-6">
                                <h3 className="font-semibold text-gray-800 mb-4">Kegiatan Hari Ini</h3>
                                <div className="space-y-3">
                                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <h4 className="font-semibold text-gray-800">Latihan Rutin</h4>
                                                <p className="text-sm text-gray-600 mt-1">15:00 - 17:00 WIB</p>
                                                <p className="text-sm text-gray-600">Lapangan Tenis USU</p>
                                            </div>
                                            <span className="px-3 py-1 bg-green-600 text-white text-xs font-semibold rounded-full">
                                                Aktif
                                            </span>
                                        </div>
                                        <div className="mt-3 flex items-center space-x-2 text-sm text-gray-600">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                            </svg>
                                            <span>42 dari 50 anggota sudah absen</span>
                                        </div>
                                    </div>

                                    <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                                        <div className="text-center text-gray-500">
                                            <svg className="w-12 h-12 mx-auto mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            <p className="text-sm">Tidak ada kegiatan lain hari ini</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                                <div className="flex items-start space-x-3">
                                    <svg className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                    <div className="text-sm text-yellow-800">
                                        <p className="font-semibold mb-1">Perhatian!</p>
                                        <p>Pastikan Anda berada di lokasi kegiatan saat melakukan absensi. Kode absensi hanya valid selama kegiatan berlangsung.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    /* History Tab */
                    <div>
                        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                            <div className="p-6 border-b border-gray-200">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-2xl font-bold text-gray-800">Riwayat Kehadiran</h2>
                                    <button className="px-4 py-2 border border-prismarine text-prismarine rounded-lg hover:bg-prismarine/10 transition-colors font-semibold">
                                        <svg className="w-5 h-5 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                        </svg>
                                        Download Laporan
                                    </button>
                                </div>
                            </div>

                            {/* Desktop Table View */}
                            <div className="hidden md:block overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                Tanggal
                                            </th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                Kegiatan
                                            </th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                Lokasi
                                            </th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                Check In
                                            </th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                Check Out
                                            </th>
                                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                Status
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {attendanceHistory.map((record) => (
                                            <tr key={record.id} className="hover:bg-gray-50 transition-colors">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-semibold text-gray-800">
                                                        {new Date(record.date).toLocaleDateString('id-ID', {
                                                            day: 'numeric',
                                                            month: 'short',
                                                            year: 'numeric'
                                                        })}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="text-sm font-semibold text-gray-800">{record.activity}</div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="text-sm text-gray-600">{record.location}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-800">
                                                        {record.checkIn ? (
                                                            <span className="font-mono">{record.checkIn}</span>
                                                        ) : (
                                                            <span className="text-gray-400">-</span>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-800">
                                                        {record.checkOut ? (
                                                            <span className="font-mono">{record.checkOut}</span>
                                                        ) : (
                                                            <span className="text-gray-400">-</span>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(record.status)}`}>
                                                        {record.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Mobile Card View */}
                            <div className="md:hidden divide-y divide-gray-200">
                                {attendanceHistory.map((record) => (
                                    <div key={record.id} className="p-4 hover:bg-gray-50 transition-colors">
                                        <div className="flex items-start justify-between mb-3">
                                            <div>
                                                <h3 className="font-semibold text-gray-800">{record.activity}</h3>
                                                <p className="text-sm text-gray-600 mt-1">
                                                    {new Date(record.date).toLocaleDateString('id-ID', {
                                                        day: 'numeric',
                                                        month: 'long',
                                                        year: 'numeric'
                                                    })}
                                                </p>
                                            </div>
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(record.status)}`}>
                                                {record.status}
                                            </span>
                                        </div>
                                        <div className="space-y-2 text-sm text-gray-600">
                                            <div className="flex items-center space-x-2">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                                <span>{record.location}</span>
                                            </div>
                                            <div className="flex items-center space-x-4">
                                                <div className="flex items-center space-x-2">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                                                    </svg>
                                                    <span>In: {record.checkIn || '-'}</span>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                                    </svg>
                                                    <span>Out: {record.checkOut || '-'}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Summary Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                            <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-lg p-6 shadow-lg">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm opacity-90 mb-1">Kehadiran Terbaik</p>
                                        <p className="text-3xl font-bold">{stats.persentase}%</p>
                                        <p className="text-sm opacity-90 mt-2">{stats.hadir} dari {stats.totalKegiatan} kegiatan</p>
                                    </div>
                                    <div className="bg-white/20 p-3 rounded-full">
                                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-lg p-6 shadow-lg">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm opacity-90 mb-1">Bulan Ini</p>
                                        <p className="text-3xl font-bold">8 / 10</p>
                                        <p className="text-sm opacity-90 mt-2">Kegiatan dihadiri</p>
                                    </div>
                                    <div className="bg-white/20 p-3 rounded-full">
                                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-lg p-6 shadow-lg">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm opacity-90 mb-1">Streak</p>
                                        <p className="text-3xl font-bold">5 hari</p>
                                        <p className="text-sm opacity-90 mt-2">Kehadiran berturut</p>
                                    </div>
                                    <div className="bg-white/20 p-3 rounded-full">
                                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
