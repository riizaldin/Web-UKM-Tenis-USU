import React, { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { toast, ToastContainer } from 'react-toastify';
import { titleCase } from '@/utils/helpers';

export default function Finance({ auth, bills, summary, payments_history, total_kas, total_pemasukan_3_bulan, total_pengeluaran_3_bulan }) {
    const [activeTab, setActiveTab] = useState('payment'); // payment, history, report
    const [paymentAmount, setPaymentAmount] = useState('');
    const [paymentNote, setPaymentNote] = useState('');
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [selectedBill, setSelectedBill] = useState(null); // Single selected bill ID

    const [proofFile, setProofFile] = useState(null);
    const [proofPreview, setProofPreview] = useState(null);
    const [uploadError, setUploadError] = useState('');
    const [showProofModal, setShowProofModal] = useState(false);
    const [selectedProofImage, setSelectedProofImage] = useState(null);

    // file validation + preview
    const handleProofFile = (file) => {
        setUploadError('');
        if (!file) {
            setProofFile(null);
            setProofPreview(null);
            return;
        }

        const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
        const maxSize = 5 * 1024 * 1024; // 5 MB

        if (!allowedTypes.includes(file.type)) {
            toast.error('Tipe file tidak didukung. Gunakan JPG/PNG/WebP.');
            setUploadError('Tipe file tidak didukung. Gunakan JPG/PNG/WebP.');
            setProofFile(null);
            setProofPreview(null);
            return;
        }

        if (file.size > maxSize) {
            toast.error('Ukuran file terlalu besar. Maksimum 5 MB`.');
            setUploadError('Ukuran file terlalu besar. Maksimum 5 MB.');
            setProofFile(null);
            setProofPreview(null);
            return;
        }

        setProofFile(file);
        const reader = new FileReader();
        reader.onload = (e) => setProofPreview(e.target.result);
        reader.readAsDataURL(file);
    };

    // drag & drop + input handlers
    const onDropProof = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const f = e.dataTransfer?.files?.[0];
        if (f) handleProofFile(f);
    };

    const onChooseProof = (e) => {
        const f = e.target.files?.[0];
        if (f) handleProofFile(f);
    };

    const removeProof = () => {
        setProofFile(null);
        setProofPreview(null);
        setUploadError('');
    };

    const handleViewProof = (proofPath) => {
        setSelectedProofImage(proofPath);
        setShowProofModal(true);
    };

    const closeProofModal = () => {
        setShowProofModal(false);
        setSelectedProofImage(null);
    };

    // Handle bill selection
    const handleBillSelection = (billId) => {
        const isSelected = selectedBill === billId;
        
        if (isSelected) {
            setSelectedBill(null);
            setPaymentAmount('');
        } else {
            setSelectedBill(billId);
            const bill = bills.find(b => b.id === billId);
            if (bill) {
                setPaymentAmount(parseFloat(bill.amount).toString());
            }
        }
    };

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
        if (!paymentAmount) {
            toast.error('Pilih nominal dan metode pembayaran terlebih dahulu!');
            return;
        }

        setShowPaymentModal(true);
        
        if(!selectedBill){
            toast.error('Pilih tagihan yang akan dibayar!');
            return;
        }

        router.post('/finance/pay', {
            kas_bill_id: selectedBill,
            amount: paymentAmount,
            note: paymentNote,
            proof: proofFile
        },{
            onSuccess: (page) => {
                if (page.props.flash?.error) {
                    toast.error(page.props.flash.error);
                } else if (page.props.flash?.success) {
                    toast.success(page.props.flash.success);
                }
                setShowPaymentModal(false);                
                setPaymentAmount('');
                setPaymentNote('');
                setProofFile(null);
                setProofPreview(null);
            },
            onError: (errors) => {
                toast.error('Terjadi kesalahan saat mengirim data. Silakan coba lagi.');
                setShowPaymentModal(false);                
                setPaymentAmount('');
                setPaymentNote('');
                setProofFile(null); 
                setProofPreview(null);
            }
        })
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'approved':
                return 'bg-green-100 text-green-700';
            case 'pending':
                return 'bg-yellow-100 text-yellow-700';
            case 'unpaid':
                return 'bg-red-100 text-red-700';
            default:
                return 'bg-red-100 text-gray-700';
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
            <ToastContainer position='top-center' autoClose={1300}></ToastContainer>
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
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                        {/* Saldo Card */}
                        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-lg p-6 shadow-lg">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm opacity-90">Kontribusi Anda</span>
                                <svg className="w-6 h-6 opacity-75" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div className="text-3xl font-bold mb-1">{formatCurrency(summary.total_paid)}</div>
                            <div className="text-xs opacity-75">Status pembayaran lancar</div>
                        </div>

                        {/* Tunggakan Card */}
                        <div className={`${summary.total_unpaid > 0 ? 'bg-gradient-to-br from-red-500 to-red-600' : 'bg-gradient-to-br from-gray-400 to-gray-500'} text-white rounded-lg p-6 shadow-lg`}>
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm opacity-90">Tunggakan</span>
                                <svg className="w-6 h-6 opacity-75" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                            </div>
                            <div className="text-3xl font-bold mb-1">{formatCurrency(summary.total_unpaid)}</div>
                            <div className="text-xs opacity-75">
                                {summary.total_unpaid > 0 ? 'Segera lakukan pembayaran' : 'Tidak ada tunggakan'}
                            </div>
                        </div>

                        {/* Total Pemasukan Card */}
                        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-lg p-6 shadow-lg">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm opacity-90">Total Pemasukan Kas</span>
                                <svg className="w-6 h-6 opacity-75" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 11l5-5m0 0l5 5m-5-5v12" />
                                </svg>
                            </div>
                            <div className="text-3xl font-bold mb-1">{formatCurrency(total_pemasukan_3_bulan)}</div>
                            <div className="text-xs opacity-75">3 bulan terakhir</div>
                        </div>

                        {/* Total Pengeluaran Card */}
                        <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-lg p-6 shadow-lg">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm opacity-90">Total Pengeluaran Kas</span>
                                <svg className="w-6 h-6 opacity-75" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 13l-5 5m0 0l-5-5m5 5V6" />
                                </svg>
                            </div>
                            <div className="text-3xl font-bold mb-1">{formatCurrency(total_pengeluaran_3_bulan)}</div>
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
                            <div className="text-3xl font-bold mb-1">{formatCurrency(total_kas)}</div>
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
                                {summary.total_unpaid > 0 && (
                                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                                        <div className="flex items-start space-x-3">
                                            <svg className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                            </svg>
                                            <div>
                                                <h3 className="font-semibold text-red-800">Anda memiliki tunggakan!</h3>
                                                <p className="text-sm text-red-700 mt-1">
                                                    Tunggakan: {formatCurrency(summary.total_unpaid)}. Segera lakukan pembayaran untuk melanjutkan aktivitas UKM.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Pilih Tunggakan */}
                                {summary.total_unpaid > 0 ? (
                                    <div className="mb-6">
                                        <div className="flex items-center justify-between mb-3">
                                            <label className="block text-sm font-semibold text-gray-700">
                                                Pilih Tunggakan yang Akan Dibayar
                                            </label>
                                        </div>
                                        
                                        <div className="space-y-3 max-h-96 overflow-y-auto border border-gray-200 rounded-lg p-4 bg-gray-50">
                                            {bills
                                                .filter(bill => bill.status === 'unpaid' || bill.status === 'rejected')
                                                .map((bill) => (
                                                    <div
                                                        key={bill.id}
                                                        onClick={() => handleBillSelection(bill.id)}
                                                        className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                                                            selectedBill === bill.id
                                                                ? 'border-prismarine bg-prismarine/5'
                                                                : 'border-gray-300 bg-white hover:border-prismarine/50'
                                                        }`}
                                                    >
                                                        <div className="flex items-start justify-between">
                                                            <div className="flex items-start space-x-3 flex-1">
                                                                <div className="mt-1">
                                                                    <input
                                                                        type="radio"
                                                                        checked={selectedBill === bill.id}
                                                                        onChange={() => {}}
                                                                        className="w-5 h-5 text-prismarine border-gray-300 focus:ring-prismarine"
                                                                    />
                                                                </div>
                                                                <div className="flex-1">
                                                                    <div className="font-semibold text-gray-800">
                                                                        {bill.title}
                                                                    </div>
                                                                    <div className='text-sm text-gray-600 mt-1'>
                                                                        {bill.description && bill.description.length > 100
                                                                            ? bill.description.substring(0, 100) + "..."
                                                                            : bill.description || '-'}
                                                                    </div>
                                                                    <div className="text-sm text-gray-600 mt-1">
                                                                        {bill.due_date && (
                                                                            <div>
                                                                                Periode Jatuh tempo: {new Date(bill.due_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="text-right ml-4">
                                                                <div className="font-bold text-lg text-gray-800">
                                                                    {formatCurrency(parseFloat(bill.amount))}
                                                                </div>
                                                                <span className={`inline-block mt-1 px-2 py-1 rounded text-xs font-semibold ${
                                                                    bill.status === 'unpaid' || bill.status === 'rejected'? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                                                                }`}>
                                                                    {bill.status === 'unpaid' || bill.status === 'rejected' ? 'Belum Bayar' : 'Pending'}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            
                                            {/* {bills.filter(b => b.status === 'unpaid' || b.status === 'pending').length === 0 && (
                                                <div className="text-center py-8 text-gray-500">
                                                    <svg className="w-16 h-16 mx-auto mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    <p className="font-semibold">Tidak ada tunggakan</p>
                                                    <p className="text-sm mt-1">Semua pembayaran kas sudah lunas</p>
                                                </div>
                                            )} */}
                                        </div>
                                    </div>
                                ): (
                                    <div className="mb-6">
                                        <div className="flex items-center justify-between mb-3">
                                            <label className="block text-md font-semibold text-green-600">
                                                Anda tidak memiliki tunggakan saat ini.
                                            </label>
                                        </div>
                                    </div>
                                )}

                                {/* Quick Amount Selection
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
                                </div> */}

                                {/* Payment Method Selection */}
                                <div className="mb-6">
                                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                                        Silahkan melakukan pembayaran melalui QRIS UKM TENNIS USU
                                    </label>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                       <img src="/images/QRIS.jpeg" alt="QRIS UKM TENNIS USU" />
                                    </div>
                                </div>

                                {/* Bukti Pembayaran (upload) */}
                                <div className="mb-6">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Bukti Pembayaran
                                    </label>

                                    <div
                                        onDragOver={(e) => { e.preventDefault(); }}
                                        onDrop={onDropProof}
                                        className="border-[3px] border-dashed rounded-lg p-4 text-center cursor-pointer"
                                        onClick={() => document.getElementById('proof-input')?.click()}
                                    >
                                        <input
                                            id="proof-input"
                                            type="file"
                                            accept="image/*"
                                            onChange={onChooseProof}
                                            className="hidden"
                                        />
                                        {!proofPreview ? (
                                            <div className="text-sm text-gray-600">
                                                Klik atau tarik gambar ke sini untuk mengunggah bukti pembayaran. (JPG/PNG/WEBP, max 5MB)
                                            </div>
                                        ) : (
                                            <div className="flex items-center justify-center space-x-4">
                                                <img src={proofPreview} alt="preview" className="w-28 h-28 object-cover rounded-md border" />
                                                <div className="text-left">
                                                    <div className="font-semibold">{proofFile?.name}</div>
                                                    <div className="text-xs text-gray-600 mt-1">{(proofFile?.size / 1024 / 1024).toFixed(2)} MB</div>
                                                    <div className="mt-3 space-x-2">
                                                        <button onClick={(e) => { e.stopPropagation(); removeProof(); }} type="button" className="px-3 py-1 bg-red-50 text-red-700 rounded-md text-xs border border-red-100">Hapus</button>
                                                        <button onClick={(e) => { e.stopPropagation(); document.getElementById('proof-input')?.click(); }} type="button" className="px-3 py-1 bg-gray-50 text-gray-700 rounded-md text-xs border border-gray-100">Ganti</button>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                        {uploadError && <div className="text-xs text-red-600 mt-2">{uploadError}</div>}
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
                                    disabled={!paymentAmount}
                                    className="w-full py-4 bg-prismarine text-white rounded-lg font-bold text-lg hover:bg-prismarine/90 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                                >
                                    Lanjutkan Pembayaran
                                </button>

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
                                    <h4 className="font-semibold text-gray-800 mb-3">Punya pertanyaan?</h4>
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
                ) : (
                    /* History Tab */
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                        <div className="p-6 border-b border-gray-200">
                            <div className="flex items-center justify-between">
                                <h2 className="text-2xl font-bold text-gray-800">Riwayat Transaksi</h2>
                            </div>
                        </div>

                        {/* Desktop Table */}
                        <div className="hidden md:block overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Bill</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Tanggal</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Tipe</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Notes</th>
                                        <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase">Jumlah</th>
                                        <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase">Status</th>
                                        <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase">Admin Note</th>
                                        <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {payments_history.length !== 0 ? payments_history.map((transaction) => (
                                        <tr key={transaction.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4">
                                                <div className="text-sm text-gray-800">{titleCase(transaction.bill_title)}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-800">
                                                    {new Date(transaction.submitted_at).toLocaleDateString('id-ID', {
                                                        day: 'numeric',
                                                        month: 'short',
                                                        year: 'numeric'
                                                    })}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm text-gray-800">{titleCase(transaction.bill_type)}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm text-gray-800">{transaction.payment_notes}</div>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="text-sm font-bold text-gray-800">
                                                    {formatCurrency(transaction.amount)}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(transaction.status)}`}>
                                                    {titleCase(transaction.status)}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <div className="text-sm text-gray-800">{transaction.admin_notes ? transaction.admin_notes : '-'}</div>
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                {transaction.proof ? (
                                                    <button 
                                                        onClick={() => handleViewProof(transaction.proof)}
                                                        className="text-prismarine hover:text-prismarine/80 font-semibold text-sm"
                                                    >
                                                        Cek Bukti Pembayaran
                                                    </button>
                                                ) : (
                                                    <span className="text-gray-400 text-sm">Tidak ada bukti</span>
                                                )}
                                            </td>
                                        </tr>
                                    )) : (<tr className="hover:bg-gray-50 text-center" col-span="7">
                                        <td colSpan={7} className='py-4'>Tidak ada data pembayaran</td>
                                    </tr>)}
                                </tbody>
                            </table>
                        </div>

                        {/* Mobile Cards */}
                        <div className="md:hidden divide-y divide-gray-200">
                            {payments_history.map((transaction) => (
                                <div key={transaction.id} className="p-4">
                                    <div className="flex items-start justify-between mb-3">
                                        <div>
                                            <div className="font-semibold text-gray-800">{titleCase(transaction.bill_title)}</div>
                                            <div className="text-sm text-gray-600 mt-1">{titleCase(transaction.bill_type)}</div>
                                        </div>
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(transaction.status)}`}>
                                            {titleCase(transaction.status)}
                                        </span>
                                    </div>
                                    <div className="space-y-2 text-sm">
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Tanggal</span>
                                            <span className="font-semibold">
                                                {new Date(transaction.submitted_at).toLocaleDateString('id-ID')}
                                            </span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Admin Note</span>
                                            <span className="font-semibold">
                                                {transaction.admin_notes ? transaction.admin_notes : '-'}
                                            </span>
                                        </div>
                                        <div className="flex justify-between text-lg">
                                            <span className="text-gray-800 font-semibold">Total</span>
                                            <span className="font-bold text-prismarine">
                                                {formatCurrency(transaction.amount)}
                                            </span>
                                        </div>
                                    </div>
                                    {transaction.proof ? (
                                        <button 
                                            onClick={() => handleViewProof(transaction.proof)}
                                            className="mt-4 w-full py-2 border border-prismarine text-prismarine rounded-lg hover:bg-prismarine/10 transition-colors font-semibold"
                                        >
                                            Lihat Bukti Pembayaran
                                        </button>
                                    ) : (
                                        <button 
                                            disabled
                                            className="mt-4 w-full py-2 border border-gray-300 text-gray-400 rounded-lg cursor-not-allowed font-semibold"
                                        >
                                            Tidak ada bukti
                                        </button>
                                    )}
                                </div>
                            ))}
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

            {/* Proof Preview Modal */}
            {showProofModal && selectedProofImage && (
                <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={closeProofModal}>
                    <div className="relative max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
                        {/* Close Button */}
                        <button
                            onClick={closeProofModal}
                            className="absolute -top-10 right-0 text-white hover:text-gray-300 transition-colors"
                        >
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        
                        {/* Image Container */}
                        <div className="bg-white rounded-lg p-4 shadow-2xl">
                            <div className="mb-4">
                                <h3 className="text-xl font-bold text-gray-800">Bukti Pembayaran</h3>
                            </div>
                            <div className="flex items-center justify-center bg-gray-100 rounded-lg overflow-hidden">
                                <img 
                                    src={`/finance/proof/${selectedProofImage}`}
                                    alt="Bukti Pembayaran" 
                                    className="max-w-full max-h-[70vh] object-contain"
                                    onError={(e) => {
                                        e.target.src = '/images/placeholder-image.png';
                                        e.target.alt = 'Gambar tidak dapat dimuat';
                                    }}
                                />
                            </div>
                            <div className="mt-4 flex justify-end space-x-2">
                                <a
                                    href={`/finance/proof/${selectedProofImage}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-4 py-2 bg-prismarine text-white rounded-lg hover:bg-prismarine/90 transition-colors font-semibold text-sm"
                                >
                                    Buka di Tab Baru
                                </a>
                                <button
                                    onClick={closeProofModal}
                                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors font-semibold text-sm"
                                >
                                    Tutup
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </AppLayout>
    );
}
