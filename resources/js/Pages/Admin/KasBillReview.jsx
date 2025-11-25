import React, { useState } from "react";
import { Link, router } from "@inertiajs/react";
import Sidebar from "@/Components/Sidebar";
import { ArrowLeft, Check, X, Eye, User, Calendar, FileText, DollarSign } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";

export default function KasBillReview({ auth, bill, pending_payments }) {
  const [showProofModal, setShowProofModal] = useState(false);
  const [selectedProof, setSelectedProof] = useState(null);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [rejectNote, setRejectNote] = useState('');

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const handleViewProof = (proofFilename) => {
    setSelectedProof(proofFilename);
    setShowProofModal(true);
  };

  const closeProofModal = () => {
    setShowProofModal(false);
    setSelectedProof(null);
  };

  const handleApprove = (paymentId) => {
    if (confirm('Apakah Anda yakin ingin menyetujui pembayaran ini?')) {
      router.post(route('admin.kas.payment.approve', paymentId), {}, {
        onSuccess: () => {
          toast.success('Pembayaran berhasil disetujui!');
        },
        onError: () => {
          toast.error('Gagal menyetujui pembayaran.');
        }
      });
    }
  };

  const handleRejectClick = (payment) => {
    setSelectedPayment(payment);
    setRejectNote('');
    setShowRejectModal(true);
  };

  const handleRejectSubmit = () => {
    if (!rejectNote.trim()) {
      toast.error('Harap masukkan alasan penolakan');
      return;
    }

    router.post(route('admin.kas.payment.reject', selectedPayment.id), {
      admin_notes: rejectNote
    }, {
      onSuccess: () => {
        toast.success('Pembayaran berhasil ditolak!');
        setShowRejectModal(false);
        setSelectedPayment(null);
        setRejectNote('');
      },
      onError: () => {
        toast.error('Gagal menolak pembayaran.');
      }
    });
  };

  const getBillTypeLabel = (type) => {
    const types = {
      monthly: 'Iuran Bulanan',
      event: 'Event',
      penalty: 'Denda',
      other: 'Lainnya',
    };
    return types[type] || type;
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <ToastContainer position='top-center' autoClose={1300} />

      <div className="flex-1 p-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Link href="/admin/kas" className="p-2 text-blue-600 hover:bg-blue-50 rounded-md">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-semibold">Review Pembayaran</h1>
            <p className="text-gray-500 mt-1">Tinjau bukti pembayaran yang masuk</p>
          </div>
        </div>

        {/* Bill Info Card */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">{bill.title}</h2>
              <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                {getBillTypeLabel(bill.bill_type)}
              </span>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600 mb-1">Total Tagihan</div>
              <div className="text-3xl font-bold text-gray-800">{formatCurrency(bill.amount)}</div>
            </div>
          </div>

          {bill.description && (
            <p className="text-gray-600 mb-4">{bill.description}</p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="text-sm text-green-600 mb-1">Terbayar</div>
              <div className="text-xl font-bold text-green-700">{formatCurrency(bill.total_paid)}</div>
            </div>
            <div className="p-4 bg-yellow-50 rounded-lg">
              <div className="text-sm text-yellow-600 mb-1">Pending Review</div>
              <div className="text-xl font-bold text-yellow-700">{formatCurrency(bill.total_pending)}</div>
            </div>
            <div className="p-4 bg-red-50 rounded-lg">
              <div className="text-sm text-red-600 mb-1">Belum Dibayar</div>
              <div className="text-xl font-bold text-red-700">{formatCurrency(bill.remaining)}</div>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="text-sm text-blue-600 mb-1">Jatuh Tempo</div>
              <div className="text-lg font-bold text-blue-700">
                {new Date(bill.due_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
              </div>
            </div>
          </div>
        </div>

        {/* Pending Payments List */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Pembayaran Menunggu Review ({pending_payments.length})
          </h3>

          {pending_payments.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-gray-500 font-semibold">Tidak ada pembayaran yang perlu direview</p>
              <p className="text-gray-400 text-sm mt-1">Semua pembayaran sudah diproses</p>
            </div>
          ) : (
            <div className="space-y-4">
              {pending_payments.map((payment) => (
                <div key={payment.id} className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <User className="w-5 h-5 text-gray-600" />
                        <h4 className="font-semibold text-gray-800 text-lg">{payment.user_name}</h4>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                        <Calendar className="w-4 h-4" />
                        <span>Diajukan: {new Date(payment.submitted_at).toLocaleDateString('id-ID', { 
                          day: 'numeric', 
                          month: 'long', 
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}</span>
                      </div>
                      {payment.payment_notes && (
                        <div className="flex items-start gap-2 text-sm text-gray-600 mt-2">
                          <FileText className="w-4 h-4 mt-0.5 flex-shrink-0" />
                          <span className="italic">"{payment.payment_notes}"</span>
                        </div>
                      )}
                    </div>
                    <div className="text-right ml-4">
                      <div className="text-sm text-gray-600 mb-1">Jumlah Pembayaran</div>
                      <div className="text-2xl font-bold text-gray-800">{formatCurrency(payment.amount)}</div>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4 border-t border-gray-200">
                    <button
                      onClick={() => handleViewProof(payment.proof)}
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 border-2 border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                      Lihat Bukti
                    </button>
                    <button
                      onClick={() => handleApprove(payment.id)}
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
                    >
                      <Check className="w-4 h-4" />
                      Setujui
                    </button>
                    <button
                      onClick={() => handleRejectClick(payment)}
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
                    >
                      <X className="w-4 h-4" />
                      Tolak
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Proof Preview Modal */}
      {showProofModal && selectedProof && (
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
                  src={`/finance/proof/${selectedProof}`}
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
                  href={`/finance/proof/${selectedProof}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold text-sm"
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

      {/* Reject Modal */}
      {showRejectModal && selectedPayment && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-800">Tolak Pembayaran</h2>
                <button
                  onClick={() => {
                    setShowRejectModal(false);
                    setSelectedPayment(null);
                    setRejectNote('');
                  }}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-start space-x-3">
                  <svg className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <div className="text-sm text-yellow-800">
                    <p className="font-semibold mb-1">Perhatian</p>
                    <p>Pembayaran dari <span className="font-semibold">{selectedPayment.user_name}</span> sebesar <span className="font-semibold">{formatCurrency(selectedPayment.amount)}</span> akan ditolak.</p>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Alasan Penolakan <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={rejectNote}
                  onChange={(e) => setRejectNote(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-red-500 focus:outline-none resize-none"
                  placeholder="Jelaskan alasan penolakan kepada pengguna..."
                  rows="4"
                  required
                ></textarea>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => {
                    setShowRejectModal(false);
                    setSelectedPayment(null);
                    setRejectNote('');
                  }}
                  className="flex-1 py-2 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                >
                  Batal
                </button>
                <button
                  onClick={handleRejectSubmit}
                  className="flex-1 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
                >
                  Tolak Pembayaran
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
