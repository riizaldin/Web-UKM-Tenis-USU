import React, { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';

export default function Finance({ auth }) {
    const [activeTab, setActiveTab] = useState('payment'); // payment, history, report
    const [paymentAmount, setPaymentAmount] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');
    const [paymentNote, setPaymentNote] = useState('');
    const [selectedPeriod, setSelectedPeriod] = useState('monthly');
    const [showPaymentModal, setShowPaymentModal] = useState(false);

    // Sample user data
    const user = {
        name: 'RIZALDI FEBRIANSYAH',
        nim: '221402126',
        saldo: 0,
        tunggakan: 50000
    };

    // Sample payment methods
    const paymentMethods = [
        {
            id: 'gopay',
            name: 'GoPay',
            icon: '💚',
            fee: 0,
            description: 'Transfer via GoPay'
        },
        {
            id: 'ovo',
            name: 'OVO',
            icon: '💜',
            fee: 0,
            description: 'Transfer via OVO'
        },
        {
            id: 'dana',
            name: 'DANA',
            icon: '💙',
            fee: 0,
            description: 'Transfer via DANA'
        },
        {
            id: 'shopeepay',
            name: 'ShopeePay',
            icon: '🧡',
            fee: 0,
            description: 'Transfer via ShopeePay'
        },
        {
            id: 'bank_transfer',
            name: 'Transfer Bank',
            icon: '🏦',
            fee: 0,
            description: 'Transfer via Bank (BCA, Mandiri, BNI, BRI)'
        },
        {
            id: 'qris',
            name: 'QRIS',
            icon: '📱',
            fee: 0,
            description: 'Scan QRIS untuk pembayaran'
        }
    ];

    // Predefined payment amounts
    const quickAmounts = [
        { label: 'Kas Bulanan', amount: 50000, description: 'Iuran kas bulan ini' },
        { label: 'Kas 3 Bulan', amount: 150000, description: 'Hemat 10%' },
        { label: 'Kas 6 Bulan', amount: 270000, description: 'Hemat 10%' },
        { label: 'Kas 12 Bulan', amount: 500000, description: 'Hemat 15%' },
    ];

    // Sample payment history
    const paymentHistory = [
        {
            id: 1,
            date: '2025-10-01',
            type: 'Pembayaran Kas',
            amount: 50000,
            method: 'GoPay',
            status: 'Berhasil',
            invoice: 'INV-2025100001',
            description: 'Pembayaran kas bulan Oktober 2025'
        },
        {
            id: 2,
            date: '2025-09-03',
            type: 'Pembayaran Kas',
            amount: 50000,
            method: 'OVO',
            status: 'Berhasil',
            invoice: 'INV-2025090015',
            description: 'Pembayaran kas bulan September 2025'
        },
        {
            id: 3,
            date: '2025-08-05',
            type: 'Pembayaran Kas',
            amount: 50000,
            method: 'Transfer Bank',
            status: 'Berhasil',
            invoice: 'INV-2025080023',
            description: 'Pembayaran kas bulan Agustus 2025'
        },
        {
            id: 4,
            date: '2025-07-28',
            type: 'Pembayaran Kas',
            amount: 50000,
            method: 'DANA',
            status: 'Pending',
            invoice: 'INV-2025070042',
            description: 'Pembayaran kas bulan Juli 2025'
        }
    ];

    // Sample kas report (income/expense)
    const kasReport = {
        monthly: {
            income: [
                { date: '2025-10', description: 'Iuran Kas Anggota', amount: 7800000, count: 156 },
                { date: '2025-09', description: 'Iuran Kas Anggota', amount: 7650000, count: 153 },
                { date: '2025-08', description: 'Iuran Kas Anggota', amount: 7700000, count: 154 },
            ],
            expense: [
                { date: '2025-10-05', description: 'Pembelian Bola Tenis', amount: 1500000, category: 'Perlengkapan' },
                { date: '2025-10-03', description: 'Perawatan Lapangan', amount: 800000, category: 'Operasional' },
                { date: '2025-09-28', description: 'Hadiah Turnamen', amount: 2000000, category: 'Event' },
                { date: '2025-09-20', description: 'Konsumsi Latihan', amount: 500000, category: 'Konsumsi' },
            ]
        }
    };

    const totalIncome = kasReport.monthly.income.reduce((sum, item) => sum + item.amount, 0);
    const totalExpense = kasReport.monthly.expense.reduce((sum, item) => sum + item.amount, 0);
    const balance = totalIncome - totalExpense;

    const handlePayment = () => {
        if (!paymentAmount || !paymentMethod) {
            alert('Pilih nominal dan metode pembayaran terlebih dahulu!');
            return;
        }

        setShowPaymentModal(true);
        
        // Simulasi proses pembayaran dengan Midtrans
        // Dalam implementasi real, ini akan memanggil backend untuk generate payment token
        setTimeout(() => {
            // Simulasi redirect ke payment gateway
            alert('Redirecting to payment gateway...\n\nDalam implementasi real, akan redirect ke halaman Midtrans');
            setShowPaymentModal(false);
            
            // Reset form
            setPaymentAmount('');
            setPaymentMethod('');
            setPaymentNote('');
        }, 2000);
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Berhasil':
                return 'bg-green-100 text-green-700';
            case 'Pending':
                return 'bg-yellow-100 text-yellow-700';
            case 'Gagal':
                return 'bg-red-100 text-red-700';
            default:
                return 'bg-gray-100 text-gray-700';
        }
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(amount);
    };

    return (
        <AppLayout title="Keuangan" auth={auth}>
            {/* Header Section */}
            <div className="bg-gradient-to-r from-[#43CEA2] to-[#185A9D] text-white py-12">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl font-bold mb-4">Keuangan UKM</h1>
                    <p className="text-lg text-white/90">
                        Kelola pembayaran kas dan pantau keuangan UKM Tenis USU
                    </p>
                </div>
            </div>

            {/* Balance Cards */}
            <div className="bg-white border-b border-gray-200">
                <div className="container mx-auto px-4 py-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {/* Saldo Card */}
                        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-lg p-6 shadow-lg">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm opacity-90">Saldo Anda</span>
                                <svg className="w-6 h-6 opacity-75" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div className="text-3xl font-bold mb-1">{formatCurrency(user.saldo)}</div>
                            <div className="text-xs opacity-75">Status pembayaran lancar</div>
                        </div>

                        {/* Tunggakan Card */}
                        <div className={`${user.tunggakan > 0 ? 'bg-gradient-to-br from-red-500 to-red-600' : 'bg-gradient-to-br from-gray-400 to-gray-500'} text-white rounded-lg p-6 shadow-lg`}>
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm opacity-90">Tunggakan</span>
                                <svg className="w-6 h-6 opacity-75" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                            </div>
                            <div className="text-3xl font-bold mb-1">{formatCurrency(user.tunggakan)}</div>
                            <div className="text-xs opacity-75">
                                {user.tunggakan > 0 ? 'Segera lakukan pembayaran' : 'Tidak ada tunggakan'}
                            </div>
                        </div>

                        {/* Total Pemasukan Card */}
                        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-lg p-6 shadow-lg">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm opacity-90">Total Pemasukan</span>
                                <svg className="w-6 h-6 opacity-75" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 11l5-5m0 0l5 5m-5-5v12" />
                                </svg>
                            </div>
                            <div className="text-3xl font-bold mb-1">{formatCurrency(totalIncome)}</div>
                            <div className="text-xs opacity-75">3 bulan terakhir</div>
                        </div>

                        {/* Saldo Kas Card */}
                        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-lg p-6 shadow-lg">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm opacity-90">Saldo Kas UKM</span>
                                <svg className="w-6 h-6 opacity-75" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                            <div className="text-3xl font-bold mb-1">{formatCurrency(balance)}</div>
                            <div className="text-xs opacity-75">Saldo tersedia</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
                <div className="container mx-auto px-4">
                    <div className="flex space-x-8">
                        <button
                            onClick={() => setActiveTab('payment')}
                            className={`py-4 px-2 border-b-2 font-semibold transition-colors ${
                                activeTab === 'payment'
                                    ? 'border-prismarine text-prismarine'
                                    : 'border-transparent text-gray-500 hover:text-gray-700'
                            }`}
                        >
                            Pembayaran
                        </button>
                        <button
                            onClick={() => setActiveTab('history')}
                            className={`py-4 px-2 border-b-2 font-semibold transition-colors ${
                                activeTab === 'history'
                                    ? 'border-prismarine text-prismarine'
                                    : 'border-transparent text-gray-500 hover:text-gray-700'
                            }`}
                        >
                            Riwayat Transaksi
                        </button>
                        <button
                            onClick={() => setActiveTab('report')}
                            className={`py-4 px-2 border-b-2 font-semibold transition-colors ${
                                activeTab === 'report'
                                    ? 'border-prismarine text-prismarine'
                                    : 'border-transparent text-gray-500 hover:text-gray-700'
                            }`}
                        >
                            Laporan Kas
                        </button>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                {activeTab === 'payment' ? (
                    /* Payment Tab */
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Payment Form */}
                        <div className="lg:col-span-2">
                            <div className="bg-white rounded-lg shadow-lg p-8">
                                <h2 className="text-2xl font-bold text-gray-800 mb-6">Pembayaran Kas</h2>

                                {/* Alert Tunggakan */}
                                {user.tunggakan > 0 && (
                                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                                        <div className="flex items-start space-x-3">
                                            <svg className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                            </svg>
                                            <div>
                                                <h3 className="font-semibold text-red-800">Anda memiliki tunggakan!</h3>
                                                <p className="text-sm text-red-700 mt-1">
                                                    Tunggakan: {formatCurrency(user.tunggakan)}. Segera lakukan pembayaran untuk melanjutkan aktivitas UKM.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Quick Amount Selection */}
                                <div className="mb-6">
                                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                                        Pilih Nominal Pembayaran
                                    </label>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        {quickAmounts.map((item) => (
                                            <button
                                                key={item.amount}
                                                onClick={() => setPaymentAmount(item.amount.toString())}
                                                className={`p-4 border-2 rounded-lg transition-all ${
                                                    paymentAmount === item.amount.toString()
                                                        ? 'border-prismarine bg-prismarine/5'
                                                        : 'border-gray-200 hover:border-prismarine/50'
                                                }`}
                                            >
                                                <div className="text-lg font-bold text-gray-800">{formatCurrency(item.amount)}</div>
                                                <div className="text-xs text-gray-600 mt-1">{item.label}</div>
                                                {item.description && (
                                                    <div className="text-xs text-green-600 mt-1 font-semibold">{item.description}</div>
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Custom Amount */}
                                <div className="mb-6">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Atau Masukkan Nominal Sendiri
                                    </label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">
                                            Rp
                                        </span>
                                        <input
                                            type="number"
                                            value={paymentAmount}
                                            onChange={(e) => setPaymentAmount(e.target.value)}
                                            placeholder="0"
                                            className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:border-prismarine focus:outline-none text-lg"
                                        />
                                    </div>
                                    <p className="text-xs text-gray-500 mt-2">Minimum pembayaran Rp 10.000</p>
                                </div>

                                {/* Payment Method Selection */}
                                <div className="mb-6">
                                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                                        Pilih Metode Pembayaran
                                    </label>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {paymentMethods.map((method) => (
                                            <button
                                                key={method.id}
                                                onClick={() => setPaymentMethod(method.id)}
                                                className={`p-4 border-2 rounded-lg transition-all text-left ${
                                                    paymentMethod === method.id
                                                        ? 'border-prismarine bg-prismarine/5'
                                                        : 'border-gray-200 hover:border-prismarine/50'
                                                }`}
                                            >
                                                <div className="flex items-center space-x-3">
                                                    <span className="text-3xl">{method.icon}</span>
                                                    <div className="flex-1">
                                                        <div className="font-semibold text-gray-800">{method.name}</div>
                                                        <div className="text-xs text-gray-600">{method.description}</div>
                                                        {method.fee > 0 && (
                                                            <div className="text-xs text-red-600 mt-1">
                                                                Biaya admin: {formatCurrency(method.fee)}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Payment Note */}
                                <div className="mb-6">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Catatan (Opsional)
                                    </label>
                                    <textarea
                                        value={paymentNote}
                                        onChange={(e) => setPaymentNote(e.target.value)}
                                        placeholder="Tambahkan catatan untuk pembayaran ini..."
                                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-prismarine focus:outline-none resize-none"
                                        rows="3"
                                    ></textarea>
                                </div>

                                {/* Payment Button */}
                                <button
                                    onClick={handlePayment}
                                    disabled={!paymentAmount || !paymentMethod}
                                    className="w-full py-4 bg-prismarine text-white rounded-lg font-bold text-lg hover:bg-prismarine/90 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                                >
                                    Lanjutkan Pembayaran
                                </button>

                                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                                    <div className="flex items-start space-x-3">
                                        <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                        </svg>
                                        <div className="text-sm text-blue-800">
                                            <p className="font-semibold mb-1">Pembayaran Aman dengan Midtrans</p>
                                            <p>Semua transaksi dilindungi dengan enkripsi SSL dan diproses oleh Midtrans Payment Gateway yang terpercaya.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Payment Info Sidebar */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
                                <h3 className="text-lg font-bold text-gray-800 mb-4">Informasi Pembayaran</h3>
                                
                                <div className="space-y-4">
                                    <div className="p-4 bg-gray-50 rounded-lg">
                                        <div className="text-sm text-gray-600 mb-1">Nominal Pembayaran</div>
                                        <div className="text-2xl font-bold text-gray-800">
                                            {paymentAmount ? formatCurrency(parseInt(paymentAmount)) : 'Rp 0'}
                                        </div>
                                    </div>

                                    <div className="p-4 bg-gray-50 rounded-lg">
                                        <div className="text-sm text-gray-600 mb-1">Metode Pembayaran</div>
                                        <div className="font-semibold text-gray-800">
                                            {paymentMethod ? paymentMethods.find(m => m.id === paymentMethod)?.name : '-'}
                                        </div>
                                    </div>

                                    <div className="border-t border-gray-200 pt-4">
                                        <div className="flex justify-between mb-2">
                                            <span className="text-gray-600">Biaya Admin</span>
                                            <span className="font-semibold">Rp 0</span>
                                        </div>
                                        <div className="flex justify-between mb-4">
                                            <span className="text-gray-800 font-semibold">Total</span>
                                            <span className="text-xl font-bold text-prismarine">
                                                {paymentAmount ? formatCurrency(parseInt(paymentAmount)) : 'Rp 0'}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                                    <h4 className="font-semibold text-green-800 mb-2 flex items-center">
                                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        Keuntungan Pembayaran Online
                                    </h4>
                                    <ul className="text-sm text-green-700 space-y-1">
                                        <li>✓ Otomatis tercatat di sistem</li>
                                        <li>✓ Konfirmasi instan</li>
                                        <li>✓ Bukti pembayaran digital</li>
                                        <li>✓ Riwayat tersimpan permanent</li>
                                    </ul>
                                </div>

                                <div className="mt-6">
                                    <h4 className="font-semibold text-gray-800 mb-3">Pertanyaan?</h4>
                                    <Link href="/contact" className="text-prismarine hover:text-prismarine/80 text-sm font-semibold flex items-center">
                                        Hubungi Bendahara
                                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : activeTab === 'history' ? (
                    /* History Tab */
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                        <div className="p-6 border-b border-gray-200">
                            <div className="flex items-center justify-between">
                                <h2 className="text-2xl font-bold text-gray-800">Riwayat Transaksi</h2>
                                <button className="px-4 py-2 border border-prismarine text-prismarine rounded-lg hover:bg-prismarine/10 transition-colors font-semibold">
                                    <svg className="w-5 h-5 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                    </svg>
                                    Download
                                </button>
                            </div>
                        </div>

                        {/* Desktop Table */}
                        <div className="hidden md:block overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Invoice</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Tanggal</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Tipe</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Metode</th>
                                        <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase">Jumlah</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                                        <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {paymentHistory.map((transaction) => (
                                        <tr key={transaction.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4">
                                                <div className="text-sm font-mono text-gray-800">{transaction.invoice}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-800">
                                                    {new Date(transaction.date).toLocaleDateString('id-ID', {
                                                        day: 'numeric',
                                                        month: 'short',
                                                        year: 'numeric'
                                                    })}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm text-gray-800">{transaction.type}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm text-gray-600">{transaction.method}</div>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="text-sm font-bold text-gray-800">
                                                    {formatCurrency(transaction.amount)}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(transaction.status)}`}>
                                                    {transaction.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <button className="text-prismarine hover:text-prismarine/80 font-semibold text-sm">
                                                    Detail
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Mobile Cards */}
                        <div className="md:hidden divide-y divide-gray-200">
                            {paymentHistory.map((transaction) => (
                                <div key={transaction.id} className="p-4">
                                    <div className="flex items-start justify-between mb-3">
                                        <div>
                                            <div className="font-semibold text-gray-800">{transaction.type}</div>
                                            <div className="text-sm text-gray-600 mt-1">{transaction.invoice}</div>
                                        </div>
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(transaction.status)}`}>
                                            {transaction.status}
                                        </span>
                                    </div>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Tanggal</span>
                                            <span className="font-semibold">
                                                {new Date(transaction.date).toLocaleDateString('id-ID')}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Metode</span>
                                            <span className="font-semibold">{transaction.method}</span>
                                        </div>
                                        <div className="flex justify-between text-lg">
                                            <span className="text-gray-800 font-semibold">Total</span>
                                            <span className="font-bold text-prismarine">
                                                {formatCurrency(transaction.amount)}
                                            </span>
                                        </div>
                                    </div>
                                    <button className="mt-4 w-full py-2 border border-prismarine text-prismarine rounded-lg hover:bg-prismarine/10 transition-colors font-semibold">
                                        Lihat Detail
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    /* Report Tab */
                    <div>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                            {/* Total Income */}
                            <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-lg p-6 shadow-lg">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-semibold opacity-90">Total Pemasukan</h3>
                                    <div className="bg-white/20 p-2 rounded-lg">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 11l5-5m0 0l5 5m-5-5v12" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="text-3xl font-bold mb-2">{formatCurrency(totalIncome)}</div>
                                <div className="text-sm opacity-75">3 bulan terakhir</div>
                            </div>

                            {/* Total Expense */}
                            <div className="bg-gradient-to-br from-red-500 to-red-600 text-white rounded-lg p-6 shadow-lg">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-semibold opacity-90">Total Pengeluaran</h3>
                                    <div className="bg-white/20 p-2 rounded-lg">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 13l-5 5m0 0l-5-5m5 5V6" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="text-3xl font-bold mb-2">{formatCurrency(totalExpense)}</div>
                                <div className="text-sm opacity-75">3 bulan terakhir</div>
                            </div>

                            {/* Balance */}
                            <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-lg p-6 shadow-lg">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-semibold opacity-90">Saldo Akhir</h3>
                                    <div className="bg-white/20 p-2 rounded-lg">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="text-3xl font-bold mb-2">{formatCurrency(balance)}</div>
                                <div className="text-sm opacity-75">
                                    {balance >= 0 ? 'Surplus' : 'Defisit'}
                                </div>
                            </div>
                        </div>

                        {/* Income & Expense Tables */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Income Table */}
                            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                                <div className="p-6 bg-green-50 border-b border-green-200">
                                    <h3 className="text-lg font-bold text-green-800 flex items-center">
                                        <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 11l5-5m0 0l5 5m-5-5v12" />
                                        </svg>
                                        Pemasukan
                                    </h3>
                                </div>
                                <div className="p-6">
                                    <div className="space-y-4">
                                        {kasReport.monthly.income.map((item, index) => (
                                            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                                <div>
                                                    <div className="font-semibold text-gray-800">{item.description}</div>
                                                    <div className="text-sm text-gray-600 mt-1">
                                                        {new Date(item.date).toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })}
                                                    </div>
                                                    <div className="text-xs text-gray-500 mt-1">{item.count} anggota</div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="font-bold text-green-600 text-lg">
                                                        {formatCurrency(item.amount)}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-4 pt-4 border-t border-gray-200">
                                        <div className="flex justify-between items-center">
                                            <span className="font-bold text-gray-800">Total Pemasukan</span>
                                            <span className="font-bold text-green-600 text-xl">
                                                {formatCurrency(totalIncome)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Expense Table */}
                            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                                <div className="p-6 bg-red-50 border-b border-red-200">
                                    <h3 className="text-lg font-bold text-red-800 flex items-center">
                                        <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 13l-5 5m0 0l-5-5m5 5V6" />
                                        </svg>
                                        Pengeluaran
                                    </h3>
                                </div>
                                <div className="p-6">
                                    <div className="space-y-4">
                                        {kasReport.monthly.expense.map((item, index) => (
                                            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                                <div>
                                                    <div className="font-semibold text-gray-800">{item.description}</div>
                                                    <div className="text-sm text-gray-600 mt-1">
                                                        {new Date(item.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long' })}
                                                    </div>
                                                    <span className="inline-block mt-2 px-2 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded">
                                                        {item.category}
                                                    </span>
                                                </div>
                                                <div className="text-right">
                                                    <div className="font-bold text-red-600 text-lg">
                                                        {formatCurrency(item.amount)}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-4 pt-4 border-t border-gray-200">
                                        <div className="flex justify-between items-center">
                                            <span className="font-bold text-gray-800">Total Pengeluaran</span>
                                            <span className="font-bold text-red-600 text-xl">
                                                {formatCurrency(totalExpense)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Payment Modal */}
            {showPaymentModal && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg p-8 max-w-md w-full">
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-prismarine mx-auto mb-4"></div>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">Memproses Pembayaran</h3>
                            <p className="text-gray-600">Mohon tunggu, Anda akan diarahkan ke halaman pembayaran...</p>
                        </div>
                    </div>
                </div>
            )}
        </AppLayout>
    );
}
