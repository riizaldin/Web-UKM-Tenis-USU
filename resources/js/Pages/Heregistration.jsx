import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { toast, ToastContainer } from 'react-toastify';
import { CheckCircle, Clock, XCircle, AlertCircle } from 'lucide-react';

export default function Heregistration({ auth, active_period, payment, rejected_payment }) {
    const [paymentAmount, setPaymentAmount] = useState('');
    const [paymentNote, setPaymentNote] = useState('');
    const [proofFile, setProofFile] = useState(null);
    const [proofPreview, setProofPreview] = useState(null);
    const [uploadError, setUploadError] = useState('');
    const [showProofModal, setShowProofModal] = useState(false);
    const [selectedProofImage, setSelectedProofImage] = useState(null);

    // Initialize payment amount if period is active
    React.useEffect(() => {
        if (active_period) {
            setPaymentAmount(parseFloat(active_period.fee_amount).toString());
        }
    }, [active_period]);

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
            toast.error('Ukuran file terlalu besar. Maksimum 5 MB.');
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

    const handlePayment = () => {
        if (!paymentAmount || !proofFile) {
            toast.error('Mohon lengkapi semua data pembayaran!');
            return;
        }

        router.post('/heregistration/pay', {
            heregistration_id: active_period.id,
            amount: paymentAmount,
            note: paymentNote,
            proof: proofFile
        }, {
            onSuccess: (page) => {
                if (page.props.flash?.error) {
                    toast.error(page.props.flash.error);
                } else if (page.props.flash?.success) {
                    toast.success(page.props.flash.success);
                }
                setPaymentNote('');
                setProofFile(null);
                setProofPreview(null);
            },
            onError: (errors) => {
                toast.error('Terjadi kesalahan saat mengirim data. Silakan coba lagi.');
            }
        });
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(amount);
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'approved':
                return <CheckCircle className="w-16 h-16 text-green-600" />;
            case 'pending':
                return <Clock className="w-16 h-16 text-yellow-600" />;
            case 'rejected':
                return <XCircle className="w-16 h-16 text-red-600" />;
            default:
                return null;
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'approved':
                return 'bg-green-100 text-green-700 border-green-200';
            case 'pending':
                return 'bg-yellow-100 text-yellow-700 border-yellow-200';
            case 'rejected':
                return 'bg-red-100 text-red-700 border-red-200';
            default:
                return 'bg-gray-100 text-gray-700 border-gray-200';
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case 'approved':
                return 'Pembayaran Disetujui';
            case 'pending':
                return 'Menunggu Verifikasi';
            case 'rejected':
                return 'Pembayaran Ditolak';
            default:
                return status;
        }
    };

    // If no active period
    if (!active_period) {
        return (
            <>
                <ToastContainer position='top-center' autoClose={1300} />
                
                <div className="bg-gradient-to-r from-[#43CEA2] to-[#185A9D] text-white py-12">
                    <div className="container mx-auto px-4">
                        <h1 className="text-4xl font-bold mb-4">Heregistrasi</h1>
                        <p className="text-lg text-white/90">
                            Daftar ulang anggota UKM Tenis USU
                        </p>
                    </div>
                </div>

                <div className="container mx-auto px-4 py-12">
                    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8 text-center">
                        <div className="text-gray-400 mb-4">
                            <svg className="w-24 h-24 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-3">Tidak Ada Periode Heregistrasi Aktif</h2>
                        <p className="text-gray-600 mb-6">
                            Saat ini tidak ada periode heregistrasi yang aktif. Silakan hubungi admin untuk informasi lebih lanjut.
                        </p>
                        <a href="/home" className="inline-block px-6 py-3 bg-prismarine text-white rounded-lg hover:bg-prismarine/90 transition-colors font-semibold">
                            Kembali ke Beranda
                        </a>
                    </div>
                </div>
            </>
        );
    }

    // If already paid/submitted
    if (payment) {
        return (
            <>
                <ToastContainer position='top-center' autoClose={1300} />
                    
                    <div className="bg-gradient-to-r from-[#43CEA2] to-[#185A9D] text-white py-12">
                        <div className="container mx-auto px-4">
                            <h1 className="text-4xl font-bold mb-4">Heregistrasi</h1>
                            <p className="text-lg text-white/90">
                                {active_period.semester} {active_period.academic_year}
                            </p>
                        </div>
                    </div>

                    <div className="container mx-auto px-4 py-12">
                        <div className="max-w-2xl mx-auto">
                            <div className={`border-2 rounded-lg p-8 text-center ${getStatusColor(payment.status)}`}>
                                <div className="mb-4 flex justify-center">
                                    {getStatusIcon(payment.status)}
                                </div>
                                <h2 className="text-2xl font-bold mb-3">{getStatusText(payment.status)}</h2>
                                
                                {payment.status === 'approved' && (
                                    <div>
                                        <p className="text-lg mb-6">
                                            Selamat! Pembayaran heregistrasi Anda telah diverifikasi dan disetujui. Anda dapat melanjutkan aktivitas UKM.
                                        </p>
                                        <div className="bg-white rounded-lg p-6 mb-4">
                                            <div className="grid grid-cols-2 gap-4 text-left">
                                                <div>
                                                    <div className="text-sm text-gray-600">Jumlah Bayar</div>
                                                    <div className="font-bold text-lg">{formatCurrency(payment.amount)}</div>
                                                </div>
                                                <div>
                                                    <div className="text-sm text-gray-600">Tanggal Verifikasi</div>
                                                    <div className="font-semibold">{payment.verified_at}</div>
                                                </div>
                                            </div>
                                            {payment.admin_notes && (
                                                <div className="mt-4 pt-4 border-t">
                                                    <div className="text-sm text-gray-600 mb-1">Catatan Admin:</div>
                                                    <div className="text-gray-800">{payment.admin_notes}</div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {payment.status === 'pending' && (
                                    <div>
                                        <p className="text-lg mb-6">
                                            Pembayaran Anda sedang dalam proses verifikasi oleh admin. Mohon tunggu beberapa saat.
                                        </p>
                                        <div className="bg-white rounded-lg p-6 mb-4">
                                            <div className="text-left space-y-3">
                                                <div>
                                                    <div className="text-sm text-gray-600">Jumlah Bayar</div>
                                                    <div className="font-bold text-lg">{formatCurrency(payment.amount)}</div>
                                                </div>
                                                <div>
                                                    <div className="text-sm text-gray-600">Tanggal Submit</div>
                                                    <div className="font-semibold">{payment.submitted_at}</div>
                                                </div>
                                                {payment.payment_notes && (
                                                    <div>
                                                        <div className="text-sm text-gray-600">Catatan Anda:</div>
                                                        <div className="text-gray-800">{payment.payment_notes}</div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => handleViewProof(payment.proof)}
                                            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                                        >
                                            Lihat Bukti Pembayaran
                                        </button>
                                    </div>
                                )}

                                {payment.status === 'rejected' && (
                                    <div>
                                        <p className="text-lg mb-6">
                                            Maaf, pembayaran Anda ditolak. Silakan melakukan pembayaran ulang dengan memastikan bukti pembayaran jelas dan sesuai.
                                        </p>
                                        <div className="bg-white rounded-lg p-6 mb-6">
                                            <div className="text-left space-y-3">
                                                <div>
                                                    <div className="text-sm text-gray-600">Alasan Penolakan:</div>
                                                    <div className="font-semibold text-red-700">{payment.admin_notes || 'Tidak ada keterangan'}</div>
                                                </div>
                                                <div>
                                                    <div className="text-sm text-gray-600">Jumlah yang Dibayar</div>
                                                    <div className="font-bold text-lg">{formatCurrency(payment.amount)}</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                                            <div className="flex items-start space-x-3">
                                                <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                                                <div className="text-sm text-yellow-800 text-left">
                                                    <p className="font-semibold mb-1">Penting!</p>
                                                    <p>Silakan hubungi admin untuk melakukan pembayaran ulang atau mendapatkan penjelasan lebih lanjut.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Proof Preview Modal */}
                    {showProofModal && selectedProofImage && (
                        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={closeProofModal}>
                            <div className="relative max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
                                <button
                                    onClick={closeProofModal}
                                    className="absolute -top-10 right-0 text-white hover:text-gray-300 transition-colors"
                                >
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                                
                                <div className="bg-white rounded-lg p-4 shadow-2xl">
                                    <div className="mb-4">
                                        <h3 className="text-xl font-bold text-gray-800">Bukti Pembayaran</h3>
                                    </div>
                                    <div className="flex items-center justify-center bg-gray-100 rounded-lg overflow-hidden">
                                        <img 
                                            src={`/heregistration/proof/${selectedProofImage}`}
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
                                            href={`/heregistration/proof/${selectedProofImage}`}
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
            </>
        );
    }

    // Payment form (not yet paid)
    return (
        <>
            <ToastContainer position='top-center' autoClose={1300} />
            
            <div className="bg-gradient-to-r from-[#43CEA2] to-[#185A9D] text-white py-12">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl font-bold mb-4">Heregistrasi</h1>
                    <p className="text-lg text-white/90">
                        {active_period.semester} {active_period.academic_year}
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="max-w-4xl mx-auto">
                    {/* Alert Info */}
                    <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <div className="flex items-start space-x-3">
                            <svg className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                            </svg>
                            <div>
                                <h3 className="font-semibold text-blue-800">Wajib Heregistrasi!</h3>
                                <p className="text-sm text-blue-700 mt-1">
                                    Periode heregistrasi sedang aktif. Silakan selesaikan pembayaran heregistrasi untuk dapat melanjutkan aktivitas UKM.
                                </p>
                                <p className="text-sm text-blue-700 mt-2">
                                    <strong>Periode:</strong> {new Date(active_period.start_date).toLocaleDateString('id-ID')} - {new Date(active_period.end_date).toLocaleDateString('id-ID')}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Rejected Payment Alert */}
                    {rejected_payment && (
                        <div className="mb-6 p-4 bg-red-50 border-2 border-red-300 rounded-lg">
                            <div className="flex items-start space-x-3">
                                <XCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
                                <div className="flex-1">
                                    <h3 className="font-bold text-red-800 mb-2">Pembayaran Sebelumnya Ditolak</h3>
                                    <div className="bg-white rounded-lg p-3 mb-3">
                                        <div className="text-sm">
                                            <div className="text-gray-600 mb-1">Alasan Penolakan:</div>
                                            <div className="font-semibold text-red-700">{rejected_payment.admin_notes || 'Tidak ada keterangan'}</div>
                                        </div>
                                        <div className="text-xs text-gray-500 mt-2">
                                            Ditolak pada: {rejected_payment.submitted_at}
                                        </div>
                                    </div>
                                    <p className="text-sm text-red-700">
                                        <strong>Silakan lakukan pembayaran ulang</strong> dengan memastikan bukti pembayaran jelas dan sesuai dengan nominal yang diminta.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Payment Form */}
                        <div className="lg:col-span-2">
                            <div className="bg-white rounded-lg shadow-lg p-8">
                                <h2 className="text-2xl font-bold text-gray-800 mb-6">Pembayaran Heregistrasi</h2>

                                {active_period.description && (
                                    <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                                        <p className="text-gray-700">{active_period.description}</p>
                                    </div>
                                )}

                                {/* Payment Method */}
                                <div className="mb-6">
                                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                                        Silahkan melakukan pembayaran melalui QRIS UKM TENNIS USU
                                    </label>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                       <img src="/images/QRIS.jpeg" alt="QRIS UKM TENNIS USU" className="rounded-lg border-2 border-gray-200" />
                                    </div>
                                </div>

                                {/* Bukti Pembayaran (upload) */}
                                <div className="mb-6">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Bukti Pembayaran <span className="text-red-500">*</span>
                                    </label>

                                    <div
                                        onDragOver={(e) => { e.preventDefault(); }}
                                        onDrop={onDropProof}
                                        className="border-[3px] border-dashed rounded-lg p-4 text-center cursor-pointer hover:border-prismarine transition-colors"
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
                                                <svg className="w-12 h-12 mx-auto mb-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                                </svg>
                                                Klik atau tarik gambar ke sini untuk mengunggah bukti pembayaran. (JPG/PNG/WEBP, max 5MB)
                                            </div>
                                        ) : (
                                            <div className="flex items-center justify-center space-x-4">
                                                <img src={proofPreview} alt="preview" className="w-28 h-28 object-cover rounded-md border" />
                                                <div className="text-left">
                                                    <div className="font-semibold">{proofFile?.name}</div>
                                                    <div className="text-xs text-gray-600 mt-1">{(proofFile?.size / 1024 / 1024).toFixed(2)} MB</div>
                                                    <div className="mt-3 space-x-2">
                                                        <button onClick={(e) => { e.stopPropagation(); removeProof(); }} type="button" className="px-3 py-1 bg-red-50 text-red-700 rounded-md text-xs border border-red-100 hover:bg-red-100">Hapus</button>
                                                        <button onClick={(e) => { e.stopPropagation(); document.getElementById('proof-input')?.click(); }} type="button" className="px-3 py-1 bg-gray-50 text-gray-700 rounded-md text-xs border border-gray-100 hover:bg-gray-100">Ganti</button>
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
                                    disabled={!paymentAmount || !proofFile}
                                    className="w-full py-4 bg-prismarine text-white rounded-lg font-bold text-lg hover:bg-prismarine/90 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                                >
                                    Kirim Pembayaran
                                </button>

                            </div>
                        </div>

                        {/* Payment Info Sidebar */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
                                <h3 className="text-lg font-bold text-gray-800 mb-4">Informasi Pembayaran</h3>
                                
                                <div className="space-y-4">
                                    <div className="p-4 bg-prismarine/10 rounded-lg">
                                        <div className="text-sm text-gray-600 mb-1">Biaya Heregistrasi</div>
                                        <div className="text-2xl font-bold text-prismarine">
                                            {formatCurrency(parseFloat(active_period.fee_amount))}
                                        </div>
                                    </div>

                                    <div className="p-4 bg-gray-50 rounded-lg">
                                        <div className="text-sm text-gray-600 mb-2">Periode Heregistrasi</div>
                                        <div className="text-sm font-semibold text-gray-800">
                                            {new Date(active_period.start_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                                        </div>
                                        <div className="text-xs text-gray-600">sampai</div>
                                        <div className="text-sm font-semibold text-gray-800">
                                            {new Date(active_period.end_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
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
                                                {formatCurrency(parseFloat(active_period.fee_amount))}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                                    <h4 className="font-semibold text-yellow-800 mb-2 flex items-center">
                                        <AlertCircle className="w-5 h-5 mr-2" />
                                        Penting!
                                    </h4>
                                    <ul className="text-sm text-yellow-700 space-y-1">
                                        <li>• Pastikan bukti pembayaran jelas</li>
                                        <li>• Nominal sesuai dengan biaya heregistrasi</li>
                                        <li>• Pembayaran akan diverifikasi oleh admin</li>
                                        <li>• Selesaikan sebelum periode berakhir</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
