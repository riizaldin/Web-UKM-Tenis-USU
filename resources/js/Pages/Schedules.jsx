import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';

export default function Schedules() {
    const [currentMonth, setCurrentMonth] = useState(9); // October (0-indexed)
    const [currentYear, setCurrentYear] = useState(2025);
    const [selectedDate, setSelectedDate] = useState(null);
    const [viewMode, setViewMode] = useState('all'); // all, training, tournament, event

    const monthNames = [
        'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
        'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ];

    const dayNames = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'];

    // Sample schedule data
    const schedules = [
        {
            id: 1,
            title: 'Latihan Rutin',
            type: 'training',
            date: '2025-10-10',
            startTime: '15:00',
            endTime: '17:00',
            location: 'Lapangan Tenis USU - Pintu 4',
            description: 'Latihan rutin mingguan untuk semua anggota',
            instructor: 'Coach Budi Santoso',
            status: 'scheduled',
            participants: 45
        },
        {
            id: 2,
            title: 'Turnamen Internal',
            type: 'tournament',
            date: '2025-10-15',
            startTime: '08:00',
            endTime: '16:00',
            location: 'Lapangan Tenis USU',
            description: 'Turnamen internal kategori singles dan doubles',
            prize: 'Trophy + Uang Pembinaan',
            status: 'registration',
            participants: 32
        },
        {
            id: 3,
            title: 'Latihan Rutin',
            type: 'training',
            date: '2025-10-12',
            startTime: '15:00',
            endTime: '17:00',
            location: 'Lapangan Tenis USU - Pintu 4',
            description: 'Latihan rutin mingguan untuk semua anggota',
            instructor: 'Coach Budi Santoso',
            status: 'scheduled',
            participants: 42
        },
        {
            id: 4,
            title: 'Rapat Pengurus',
            type: 'event',
            date: '2025-10-14',
            startTime: '18:00',
            endTime: '20:00',
            location: 'Sekretariat UKM Tenis',
            description: 'Rapat koordinasi pengurus bulanan',
            status: 'scheduled',
            participants: 15
        },
        {
            id: 5,
            title: 'Sparing Partner',
            type: 'training',
            date: '2025-10-13',
            startTime: '08:00',
            endTime: '11:00',
            location: 'Lapangan Tenis USU',
            description: 'Latihan sparing dengan UKM Tenis dari universitas lain',
            instructor: 'Coach Budi Santoso',
            status: 'scheduled',
            participants: 24
        },
        {
            id: 6,
            title: 'Workshop Teknik Serve',
            type: 'event',
            date: '2025-10-20',
            startTime: '09:00',
            endTime: '12:00',
            location: 'Lapangan Tenis USU',
            description: 'Workshop khusus teknik serve dengan pelatih nasional',
            instructor: 'Coach Profesional',
            status: 'scheduled',
            participants: 30
        },
        {
            id: 7,
            title: 'Latihan Rutin',
            type: 'training',
            date: '2025-10-17',
            startTime: '15:00',
            endTime: '17:00',
            location: 'Lapangan Tenis USU - Pintu 4',
            description: 'Latihan rutin mingguan untuk semua anggota',
            instructor: 'Coach Budi Santoso',
            status: 'scheduled',
            participants: 48
        },
        {
            id: 8,
            title: 'Bakti Sosial',
            type: 'event',
            date: '2025-10-25',
            startTime: '07:00',
            endTime: '12:00',
            location: 'Desa Binaan USU',
            description: 'Kegiatan bakti sosial tahunan UKM Tenis',
            status: 'scheduled',
            participants: 60
        }
    ];

    const getDaysInMonth = (month, year) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (month, year) => {
        return new Date(year, month, 1).getDay();
    };

    const previousMonth = () => {
        if (currentMonth === 0) {
            setCurrentMonth(11);
            setCurrentYear(currentYear - 1);
        } else {
            setCurrentMonth(currentMonth - 1);
        }
    };

    const nextMonth = () => {
        if (currentMonth === 11) {
            setCurrentMonth(0);
            setCurrentYear(currentYear + 1);
        } else {
            setCurrentMonth(currentMonth + 1);
        }
    };

    const getSchedulesForDate = (date) => {
        const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(date).padStart(2, '0')}`;
        return schedules.filter(schedule => schedule.date === dateStr);
    };

    const hasSchedule = (date) => {
        return getSchedulesForDate(date).length > 0;
    };

    const getScheduleTypeColor = (type) => {
        switch (type) {
            case 'training':
                return 'bg-green-500';
            case 'tournament':
                return 'bg-purple-500';
            case 'event':
                return 'bg-blue-500';
            default:
                return 'bg-gray-500';
        }
    };

    const getScheduleTypeBadge = (type) => {
        switch (type) {
            case 'training':
                return 'bg-green-100 text-green-700';
            case 'tournament':
                return 'bg-purple-100 text-purple-700';
            case 'event':
                return 'bg-blue-100 text-blue-700';
            default:
                return 'bg-gray-100 text-gray-700';
        }
    };

    const getScheduleTypeLabel = (type) => {
        switch (type) {
            case 'training':
                return 'Latihan';
            case 'tournament':
                return 'Turnamen';
            case 'event':
                return 'Event';
            default:
                return 'Lainnya';
        }
    };

    const filteredSchedules = schedules.filter(schedule => {
        if (viewMode === 'all') return true;
        return schedule.type === viewMode;
    }).sort((a, b) => new Date(a.date) - new Date(b.date));

    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear);

    return (
        <AppLayout title="Jadwal Kegiatan">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-[#43CEA2] to-[#185A9D] text-white py-12">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl font-bold mb-4">Jadwal Kegiatan</h1>
                    <p className="text-lg text-white/90">
                        Jadwal latihan, turnamen, dan kegiatan UKM Tenis USU
                    </p>
                </div>
            </div>

            {/* Filter Tabs */}
            <div className="bg-white shadow-md sticky top-0 z-10">
                <div className="container mx-auto px-4">
                    <div className="flex space-x-1 overflow-x-auto py-4">
                        <button
                            onClick={() => setViewMode('all')}
                            className={`px-6 py-2 rounded-lg font-semibold transition-colors whitespace-nowrap ${
                                viewMode === 'all'
                                    ? 'bg-prismarine text-white'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                        >
                            Semua Jadwal
                        </button>
                        <button
                            onClick={() => setViewMode('training')}
                            className={`px-6 py-2 rounded-lg font-semibold transition-colors whitespace-nowrap ${
                                viewMode === 'training'
                                    ? 'bg-green-500 text-white'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                        >
                            Latihan
                        </button>
                        <button
                            onClick={() => setViewMode('tournament')}
                            className={`px-6 py-2 rounded-lg font-semibold transition-colors whitespace-nowrap ${
                                viewMode === 'tournament'
                                    ? 'bg-purple-500 text-white'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                        >
                            Turnamen
                        </button>
                        <button
                            onClick={() => setViewMode('event')}
                            className={`px-6 py-2 rounded-lg font-semibold transition-colors whitespace-nowrap ${
                                viewMode === 'event'
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                        >
                            Event Lainnya
                        </button>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Calendar Section - Left Side (2 columns) */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-lg shadow-lg p-6">
                            {/* Calendar Header */}
                            <div className="flex items-center justify-between mb-6">
                                <button
                                    onClick={previousMonth}
                                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                                >
                                    <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                                    </svg>
                                </button>
                                <h2 className="text-2xl font-bold text-gray-800">
                                    {monthNames[currentMonth]} {currentYear}
                                </h2>
                                <button
                                    onClick={nextMonth}
                                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                                >
                                    <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </div>

                            {/* Calendar Grid */}
                            <div className="mb-6">
                                {/* Day names */}
                                <div className="grid grid-cols-7 gap-2 mb-2">
                                    {dayNames.map((day) => (
                                        <div key={day} className="text-center text-sm font-semibold text-gray-600 py-2">
                                            {day}
                                        </div>
                                    ))}
                                </div>

                                {/* Calendar dates */}
                                <div className="grid grid-cols-7 gap-2">
                                    {/* Empty cells for days before month starts */}
                                    {Array.from({ length: firstDay }, (_, i) => (
                                        <div key={`empty-${i}`} className="aspect-square"></div>
                                    ))}

                                    {/* Actual month dates */}
                                    {Array.from({ length: daysInMonth }, (_, i) => {
                                        const date = i + 1;
                                        const dateSchedules = getSchedulesForDate(date);
                                        const isToday = date === 9 && currentMonth === 9 && currentYear === 2025;

                                        return (
                                            <div
                                                key={date}
                                                onClick={() => setSelectedDate(date)}
                                                className={`aspect-square p-2 rounded-lg cursor-pointer transition-all ${
                                                    isToday
                                                        ? 'bg-prismarine text-white font-bold'
                                                        : hasSchedule(date)
                                                        ? 'bg-blue-50 hover:bg-blue-100'
                                                        : 'hover:bg-gray-50'
                                                } ${selectedDate === date ? 'ring-2 ring-prismarine' : ''}`}
                                            >
                                                <div className="text-center">
                                                    <div className={`text-sm ${isToday ? 'font-bold' : ''}`}>
                                                        {date}
                                                    </div>
                                                    {dateSchedules.length > 0 && (
                                                        <div className="flex justify-center mt-1 space-x-1">
                                                            {dateSchedules.slice(0, 3).map((schedule, idx) => (
                                                                <div
                                                                    key={idx}
                                                                    className={`w-1.5 h-1.5 rounded-full ${getScheduleTypeColor(schedule.type)}`}
                                                                ></div>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Legend */}
                            <div className="border-t border-gray-200 pt-4">
                                <h3 className="text-sm font-semibold text-gray-700 mb-3">Keterangan:</h3>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                    <div className="flex items-center space-x-2">
                                        <div className="w-4 h-4 bg-prismarine rounded"></div>
                                        <span className="text-sm text-gray-600">Hari Ini</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <div className="w-4 h-4 bg-green-500 rounded"></div>
                                        <span className="text-sm text-gray-600">Latihan</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <div className="w-4 h-4 bg-purple-500 rounded"></div>
                                        <span className="text-sm text-gray-600">Turnamen</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <div className="w-4 h-4 bg-blue-500 rounded"></div>
                                        <span className="text-sm text-gray-600">Event</span>
                                    </div>
                                </div>
                            </div>

                            {/* Selected Date Info */}
                            {selectedDate && (
                                <div className="mt-6 border-t border-gray-200 pt-4">
                                    <h3 className="text-lg font-bold text-gray-800 mb-4">
                                        Jadwal {selectedDate} {monthNames[currentMonth]} {currentYear}
                                    </h3>
                                    {getSchedulesForDate(selectedDate).length > 0 ? (
                                        <div className="space-y-3">
                                            {getSchedulesForDate(selectedDate).map((schedule) => (
                                                <div
                                                    key={schedule.id}
                                                    className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg"
                                                >
                                                    <div className={`w-3 h-3 ${getScheduleTypeColor(schedule.type)} rounded-full mt-1.5`}></div>
                                                    <div className="flex-1">
                                                        <h4 className="font-semibold text-gray-800">{schedule.title}</h4>
                                                        <p className="text-sm text-gray-600">
                                                            {schedule.startTime} - {schedule.endTime} WIB
                                                        </p>
                                                        <p className="text-sm text-gray-600">{schedule.location}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-gray-500 text-center py-4">Tidak ada jadwal pada tanggal ini</p>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Upcoming Schedule List - Right Side (1 column) */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
                            <h2 className="text-xl font-bold text-gray-800 mb-4">Jadwal Mendatang</h2>
                            <div className="space-y-4 max-h-[600px] overflow-y-auto">
                                {filteredSchedules.slice(0, 10).map((schedule) => (
                                    <div
                                        key={schedule.id}
                                        className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                                    >
                                        <div className="flex items-start justify-between mb-2">
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getScheduleTypeBadge(schedule.type)}`}>
                                                {getScheduleTypeLabel(schedule.type)}
                                            </span>
                                            <span className="text-xs text-gray-500">
                                                {new Date(schedule.date).toLocaleDateString('id-ID', {
                                                    day: 'numeric',
                                                    month: 'short'
                                                })}
                                            </span>
                                        </div>
                                        <h3 className="font-semibold text-gray-800 mb-2">{schedule.title}</h3>
                                        <div className="space-y-1 text-sm text-gray-600">
                                            <div className="flex items-center space-x-2">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                <span>{schedule.startTime} - {schedule.endTime} WIB</span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                                <span className="text-xs">{schedule.location}</span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                                </svg>
                                                <span>{schedule.participants} peserta</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Detailed Schedule List */}
                <div className="mt-8">
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Detail Jadwal</h2>
                        <div className="space-y-6">
                            {filteredSchedules.map((schedule) => (
                                <div
                                    key={schedule.id}
                                    className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                                >
                                    <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                                        <div className="flex-1">
                                            <div className="flex items-center space-x-3 mb-2">
                                                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getScheduleTypeBadge(schedule.type)}`}>
                                                    {getScheduleTypeLabel(schedule.type)}
                                                </span>
                                                {schedule.status === 'registration' && (
                                                    <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-semibold">
                                                        Pendaftaran Dibuka
                                                    </span>
                                                )}
                                            </div>
                                            <h3 className="text-xl font-bold text-gray-800 mb-2">{schedule.title}</h3>
                                            <p className="text-gray-600">{schedule.description}</p>
                                        </div>
                                        <div className="mt-4 md:mt-0 md:ml-6 text-right">
                                            <div className="text-2xl font-bold text-prismarine">
                                                {new Date(schedule.date).toLocaleDateString('id-ID', {
                                                    day: 'numeric'
                                                })}
                                            </div>
                                            <div className="text-sm text-gray-600">
                                                {new Date(schedule.date).toLocaleDateString('id-ID', {
                                                    month: 'long',
                                                    year: 'numeric'
                                                })}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                        <div className="flex items-center space-x-3">
                                            <div className="bg-blue-100 p-2 rounded-lg">
                                                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <div className="text-xs text-gray-500">Waktu</div>
                                                <div className="font-semibold text-gray-800">
                                                    {schedule.startTime} - {schedule.endTime}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center space-x-3">
                                            <div className="bg-green-100 p-2 rounded-lg">
                                                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <div className="text-xs text-gray-500">Lokasi</div>
                                                <div className="font-semibold text-gray-800">{schedule.location}</div>
                                            </div>
                                        </div>

                                        <div className="flex items-center space-x-3">
                                            <div className="bg-purple-100 p-2 rounded-lg">
                                                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <div className="text-xs text-gray-500">Peserta</div>
                                                <div className="font-semibold text-gray-800">{schedule.participants} orang</div>
                                            </div>
                                        </div>
                                    </div>

                                    {schedule.instructor && (
                                        <div className="mb-4 flex items-center space-x-2 text-sm text-gray-600">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                            <span>Pelatih: <strong>{schedule.instructor}</strong></span>
                                        </div>
                                    )}

                                    {schedule.prize && (
                                        <div className="mb-4 flex items-center space-x-2 text-sm text-gray-600">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                                            </svg>
                                            <span>Hadiah: <strong>{schedule.prize}</strong></span>
                                        </div>
                                    )}

                                    <div className="flex flex-wrap gap-3">
                                        {schedule.status === 'registration' ? (
                                            <>
                                                <button className="px-6 py-2 bg-prismarine text-white rounded-lg hover:bg-prismarine/90 transition-colors font-semibold">
                                                    Daftar Sekarang
                                                </button>
                                                <button className="px-6 py-2 border border-prismarine text-prismarine rounded-lg hover:bg-prismarine/10 transition-colors font-semibold">
                                                    Lihat Detail
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <button className="px-6 py-2 bg-prismarine text-white rounded-lg hover:bg-prismarine/90 transition-colors font-semibold">
                                                    Lihat Detail
                                                </button>
                                                <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-semibold">
                                                    Tambah ke Kalender
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
