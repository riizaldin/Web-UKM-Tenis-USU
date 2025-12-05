import React, { useState } from "react";
import { Link, router } from "@inertiajs/react";
import Sidebar from "@/Components/Sidebar";
import { ArrowLeft, CheckCircle, XCircle, Eye } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import { titleCase } from "@/utils/helpers";
import { Head } from '@inertiajs/react';

const formatDate = (date) => {
  return new Intl.DateTimeFormat('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
};

export default function HeregistrationPayments({ auth, period, payments = [] }) {
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [adminNotes, setAdminNotes] = useState('');
  const [showProofModal, setShowProofModal] = useState(false);
  const [selectedProofImage, setSelectedProofImage] = useState(null);
  const today = new Date();

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const handleViewProof = (proofFilename) => {
    setSelectedProofImage(proofFilename);
    setShowProofModal(true);
  };

  const closeProofModal = () => {
    setShowProofModal(false);
    setSelectedProofImage(null);
  };

  const handleApprove = (paymentId) => {
    router.post(route('admin.heregistration.payment.approve', paymentId), {
      admin_notes: adminNotes,
    }, {
      onSuccess: () => {
        toast.success('Pembayaran berhasil disetujui!');
        setSelectedPayment(null);
        setAdminNotes('');
      },
      onError: () => {
        toast.error('Gagal menyetujui pembayaran.');
      },
    });
  };

  const handleReject = (paymentId) => {
    if (!adminNotes.trim()) {
      toast.error('Catatan admin wajib diisi untuk penolakan!');
      return;
    }

    if (confirm('Apakah Anda yakin ingin menolak pembayaran ini?')) {
      router.post(route('admin.heregistration.payment.reject', paymentId), {
        admin_notes: adminNotes,
      }, {
        onSuccess: () => {
          toast.success('Pembayaran ditolak!');
          setSelectedPayment(null);
          setAdminNotes('');
        },
        onError: () => {
          toast.error('Gagal menolak pembayaran.');
        },
      });
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-700';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'rejected':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const pendingPayments = payments.filter(p => p.status === 'pending');
  const approvedPayments = payments.filter(p => p.status === 'approved');
  const rejectedPayments = payments.filter(p => p.status === 'rejected');

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <Head title="Pembayaran Heregistrasi" />
      <ToastContainer position='top-center' autoClose={1300} />

      <div className="flex-1 p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <Link href={route('admin.heregistration.index')} className="p-2 text-blue-600 hover:bg-blue-50 rounded-md">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h2 className="text-sm text-gray-500">{formatDate(today)}</h2>
              <h1 className="text-3xl font-semibold mt-1">
                Pembayaran Heregistrasi - {period.semester} {period.academic_year}
              </h1>
            </div>
          </div>
        </div>

        {/* Period Info Card */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg p-6 mb-6 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <div className="text-sm opacity-90 mb-1">Biaya Heregistrasi</div>
              <div className="text-2xl font-bold">{formatCurrency(period.fee_amount)}</div>
            </div>
            <div>
              <div className="text-sm opacity-90 mb-1">Total Anggota</div>
              <div className="text-2xl font-bold">{period.total_users}</div>
            </div>
            <div>
              <div className="text-sm opacity-90 mb-1">Sudah Terdaftar</div>
              <div className="text-2xl font-bold">{period.approved_count}</div>
            </div>
            <div>
              <div className="text-sm opacity-90 mb-1">Progress</div>
              <div className="text-2xl font-bold">{period.completion_percentage}%</div>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4">
            <div className="w-full bg-blue-500 rounded-full h-3">
              <div
                className="bg-white h-3 rounded-full transition-all"
                style={{ width: `${period.completion_percentage}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Pending Payments Section */}
        {pendingPayments.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-semibold mr-3">
                {pendingPayments.length} Pending
              </span>
              Menunggu Verifikasi
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {pendingPayments.map((payment) => (
                <div key={payment.id} className="border border-yellow-200 rounded-lg p-4 bg-yellow-50">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800">{payment.user_name}</h3>
                      <p className="text-sm text-gray-600">{payment.user_email}</p>
                      <p className="text-xs text-gray-500">NIM: {payment.user_nim}</p>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${getStatusColor(payment.status)}`}>
                      {titleCase(payment.status)}
                    </span>
                  </div>

                  <div className="mb-3">
                    <div className="text-sm text-gray-600">Jumlah Bayar</div>
                    <div className="text-lg font-bold text-gray-800">{formatCurrency(payment.amount)}</div>
                  </div>

                  {payment.payment_notes && (
                    <div className="mb-3 p-2 bg-white rounded text-sm">
                      <div className="text-xs text-gray-600 mb-1">Catatan:</div>
                      <div className="text-gray-800">{payment.payment_notes}</div>
                    </div>
                  )}

                  <div className="text-xs text-gray-500 mb-3">
                    Dikirim: {new Date(payment.submitted_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </div>

                  <div className="space-y-2">
                    <button
                      onClick={() => handleViewProof(payment.proof)}
                      className="w-full py-2 px-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-semibold flex items-center justify-center gap-2"
                    >
                      <Eye className="w-4 h-4" />
                      Lihat Bukti
                    </button>

                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setSelectedPayment(payment);
                          setAdminNotes('');
                        }}
                        className="flex-1 py-2 px-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-semibold flex items-center justify-center gap-1"
                      >
                        <CheckCircle className="w-4 h-4" />
                        Setujui
                      </button>
                      <button
                        onClick={() => {
                          setSelectedPayment(payment);
                          setAdminNotes('');
                        }}
                        className="flex-1 py-2 px-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-semibold flex items-center justify-center gap-1"
                      >
                        <XCircle className="w-4 h-4" />
                        Tolak
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Approved Payments Section */}
        {approvedPayments.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold mr-3">
                {approvedPayments.length} Disetujui
              </span>
              Pembayaran Disetujui
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Nama</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">NIM</th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Jumlah</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Tanggal</th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase">Status</th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {approvedPayments.map((payment) => (
                    <tr key={payment.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <div className="font-semibold text-gray-800">{payment.user_name}</div>
                        <div className="text-sm text-gray-600">{payment.user_email}</div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">{payment.user_nim}</td>
                      <td className="px-4 py-3 text-right font-semibold">{formatCurrency(payment.amount)}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {new Date(payment.verified_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${getStatusColor(payment.status)}`}>
                          {titleCase(payment.status)}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <button
                          onClick={() => handleViewProof(payment.proof)}
                          className="text-blue-600 hover:text-blue-700 font-semibold text-sm"
                        >
                          Lihat Bukti
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Rejected Payments Section */}
        {rejectedPayments.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-semibold mr-3">
                {rejectedPayments.length} Ditolak
              </span>
              Pembayaran Ditolak
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Nama</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">NIM</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Alasan</th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase">Status</th>
                    <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {rejectedPayments.map((payment) => (
                    <tr key={payment.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <div className="font-semibold text-gray-800">{payment.user_name}</div>
                        <div className="text-sm text-gray-600">{payment.user_email}</div>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">{payment.user_nim}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{payment.admin_notes}</td>
                      <td className="px-4 py-3 text-center">
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${getStatusColor(payment.status)}`}>
                          {titleCase(payment.status)}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <button
                          onClick={() => handleViewProof(payment.proof)}
                          className="text-blue-600 hover:text-blue-700 font-semibold text-sm"
                        >
                          Lihat Bukti
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {payments.length === 0 && (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <p className="text-gray-500 text-lg">Belum ada pembayaran untuk periode ini</p>
          </div>
        )}

        {/* Approve/Reject Modal */}
        {selectedPayment && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-md w-full">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-800">Verifikasi Pembayaran</h2>
              </div>

              <div className="p-6">
                <div className="mb-4">
                  <div className="text-sm text-gray-600">Anggota</div>
                  <div className="font-semibold text-gray-800">{selectedPayment.user_name}</div>
                  <div className="text-sm text-gray-600">{selectedPayment.user_email}</div>
                </div>

                <div className="mb-4">
                  <div className="text-sm text-gray-600">Jumlah</div>
                  <div className="text-xl font-bold text-gray-800">{formatCurrency(selectedPayment.amount)}</div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Catatan Admin {adminNotes.trim() === '' ? '' : '(Opsional)'}
                  </label>
                  <textarea
                    value={adminNotes}
                    onChange={(e) => setAdminNotes(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    placeholder="Tambahkan catatan (wajib jika menolak)..."
                    rows="3"
                  ></textarea>
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={() => {
                      setSelectedPayment(null);
                      setAdminNotes('');
                    }}
                    className="flex-1 py-2 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                  >
                    Batal
                  </button>
                  <button
                    onClick={() => handleReject(selectedPayment.id)}
                    className="flex-1 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
                  >
                    Tolak
                  </button>
                  <button
                    onClick={() => handleApprove(selectedPayment.id)}
                    className="flex-1 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
                  >
                    Setujui
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

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
                    src={route('admin.heregistration.payment.proof', selectedProofImage)}
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
                    href={route('admin.heregistration.payment.proof', selectedProofImage)}
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
      </div>
    </div>
  );
}
