import React, { useState } from "react";
import { Link, router, useForm } from "@inertiajs/react";
import Sidebar from "@/Components/Sidebar";
import Button from "@/Components/Admin/Absensi/Button";
import { ArrowLeft, Plus, Users, CheckCircle, Clock, XCircle, Power } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import { Head } from '@inertiajs/react';

const formatDate = (date) => {
  return new Intl.DateTimeFormat('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
};

export default function AdminHeregistration({ auth, periods = [] }) {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const today = new Date();

  const { data, setData, post, processing, errors, reset } = useForm({
    semester: 'Ganjil',
    academic_year: '',
    fee_amount: '',
    start_date: '',
    end_date: '',
    description: '',
  });

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route('admin.heregistration.create'), {
      onSuccess: () => {
        setIsCreateModalOpen(false);
        reset();
        toast.success('Periode heregistrasi berhasil dibuat!');
      },
      onError: () => {
        toast.error('Gagal membuat periode heregistrasi. Silakan periksa kembali data yang dimasukkan.');
      },
    });
  };

  const [confirmModal, setConfirmModal] = useState({ show: false, periodId: null });
  const [deactivateModal, setDeactivateModal] = useState({ show: false, periodId: null });
  const [deleteModal, setDeleteModal] = useState({ show: false, periodId: null, periodName: '' });

  const handleActivate = (periodId) => {
    setConfirmModal({ show: true, periodId });
  };

  const confirmActivate = () => {
    router.post(route('admin.heregistration.activate', confirmModal.periodId), {}, {
      onSuccess: () => {
        toast.success('Mode heregistrasi berhasil diaktifkan!');
        setConfirmModal({ show: false, periodId: null });
      },
      onError: () => {
        toast.error('Gagal mengaktifkan mode heregistrasi.');
        setConfirmModal({ show: false, periodId: null });
      },
    });
  };

  const confirmDeactivate = () => {
    router.post(route('admin.heregistration.deactivate', deactivateModal.periodId), {}, {
      onSuccess: () => {
        toast.success('Heregistrasi berhasil di-nonaktifkan!');
        setDeactivateModal({ show: false, periodId: null });
      },
      onError: () => {
        toast.error('Gagal menonaktifkan heregistrasi.');
        setDeactivateModal({ show: false, periodId: null });
      },
    });
  };

  const confirmDelete = () => {
    router.delete(route('admin.heregistration.delete', deleteModal.periodId), {
      onSuccess: () => {
        toast.success('Periode heregistrasi berhasil dihapus!');
        setDeleteModal({ show: false, periodId: null, periodName: '' });
      },
      onError: () => {
        toast.error('Gagal menghapus periode heregistrasi.');
        setDeleteModal({ show: false, periodId: null, periodName: '' });
      },
    });
  };

  const getStatusColor = (isActive) => {
    return isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Head title="Heregistrasi" />
      <Sidebar />
      <ToastContainer position='top-center' autoClose={1300} />

      <div className="flex-1 p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="p-2 text-blue-600 hover:bg-blue-50 rounded-md">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h2 className="text-sm text-gray-500">{formatDate(today)}</h2>
              <h1 className="text-3xl font-semibold mt-1">Heregistrasi</h1>
            </div>
          </div>
          <Button
            variant="primary"
            icon={<Plus className="w-4 h-4" />}
            onClick={() => setIsCreateModalOpen(true)}
          >
            Buat Periode Baru
          </Button>
        </div>

        {/* Info Alert */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-start space-x-3">
            <svg className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <div className="text-sm text-blue-800">
              <p className="font-semibold mb-1">Tentang Heregistrasi</p>
              <p>Heregistrasi adalah proses daftar ulang yang dilakukan setiap semester. Ketika mode heregistrasi diaktifkan, semua anggota harus menyelesaikan pembayaran heregistrasi untuk dapat melanjutkan aktivitas UKM.</p>
            </div>
          </div>
        </div>

        {/* Periods List */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Periode Heregistrasi</h2>

          {periods.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <p className="text-gray-500">Belum ada periode heregistrasi</p>
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Buat Periode Pertama
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {periods.map((period) => (
                <div
                  key={period.id}
                  className={`border-2 rounded-lg p-4 transition-all ${
                    period.is_active ? 'border-green-500 bg-green-50' : 'border-gray-200 bg-white'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        {period.is_active && (
                          <Power className="w-4 h-4 text-green-600" />
                        )}
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${getStatusColor(period.is_active)}`}>
                          {period.is_active ? 'Aktif' : 'Tidak Aktif'}
                        </span>
                      </div>
                      <h3 className="font-bold text-lg text-gray-800">
                        {period.semester} {period.academic_year}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        Biaya: {formatCurrency(period.fee_amount)}
                      </p>
                    </div>
                  </div>

                  {period.description && (
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{period.description}</p>
                  )}

                  <div className="space-y-2 mb-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Periode</span>
                      <span className="font-semibold">
                        {new Date(period.start_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })} - {new Date(period.end_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </span>
                    </div>
                  </div>

                  {/* Progress */}
                  <div className="mb-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-semibold">{period.completion_percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-600 h-2 rounded-full transition-all"
                        style={{ width: `${period.completion_percentage}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>{period.approved_count} dari {period.total_users} anggota</span>
                    </div>
                  </div>

                  {/* Statistics */}
                  <div className="grid grid-cols-3 gap-2 mb-3 text-xs">
                    <div className="bg-green-50 rounded p-2 text-center">
                      <CheckCircle className="w-4 h-4 text-green-600 mx-auto mb-1" />
                      <div className="font-bold text-green-700">{period.approved_count}</div>
                      <div className="text-gray-600">Disetujui</div>
                    </div>
                    <div className="bg-yellow-50 rounded p-2 text-center">
                      <Clock className="w-4 h-4 text-yellow-600 mx-auto mb-1" />
                      <div className="font-bold text-yellow-700">{period.pending_count}</div>
                      <div className="text-gray-600">Pending</div>
                    </div>
                    <div className="bg-red-50 rounded p-2 text-center">
                      <XCircle className="w-4 h-4 text-red-600 mx-auto mb-1" />
                      <div className="font-bold text-red-700">{period.rejected_count}</div>
                      <div className="text-gray-600">Ditolak</div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <Link
                        href={route('admin.heregistration.payments', period.id)}
                        className="flex-1 py-2 px-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-center text-sm font-semibold"
                      >
                        Lihat Pembayaran
                      </Link>
                      {!period.is_active ? (
                        <button
                          onClick={() => handleActivate(period.id)}
                          className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-semibold"
                          title="Aktifkan mode heregistrasi"
                        >
                          <Power className="w-4 h-4" />
                        </button>
                      ) : (
                        <button
                          onClick={() => setDeactivateModal({ show: true, periodId: period.id })}
                          className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-semibold"
                          title="Non-aktifkan heregistrasi"
                        >
                          <Power className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                    <button
                      onClick={() => setDeleteModal({ show: true, periodId: period.id, periodName: `${period.semester} ${period.academic_year}` })}
                      className="w-full py-2 px-3 bg-gray-100 text-red-600 rounded-lg hover:bg-red-50 border border-red-200 transition-colors text-sm font-semibold flex items-center justify-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Hapus Periode
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Create Modal */}
        {isCreateModalOpen && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-lg w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200 sticky top-0 bg-white">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-800">Buat Periode Heregistrasi</h2>
                  <button
                    onClick={() => {
                      setIsCreateModalOpen(false);
                      reset();
                    }}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="p-6">
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Semester <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={data.semester}
                    onChange={(e) => setData('semester', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="Ganjil">Ganjil</option>
                    <option value="Genap">Genap</option>
                  </select>
                  {errors.semester && <p className="text-red-500 text-xs mt-1">{errors.semester}</p>}
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Tahun Akademik <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={data.academic_year}
                    onChange={(e) => setData('academic_year', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Contoh: 2025/2026"
                    required
                  />
                  {errors.academic_year && <p className="text-red-500 text-xs mt-1">{errors.academic_year}</p>}
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Biaya Heregistrasi <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">Rp</span>
                    <input
                      type="number"
                      value={data.fee_amount}
                      onChange={(e) => setData('fee_amount', e.target.value)}
                      className="w-full pl-12 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="0"
                      required
                    />
                  </div>
                  {errors.fee_amount && <p className="text-red-500 text-xs mt-1">{errors.fee_amount}</p>}
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Tanggal Mulai <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={data.start_date}
                    onChange={(e) => setData('start_date', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                  {errors.start_date && <p className="text-red-500 text-xs mt-1">{errors.start_date}</p>}
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Tanggal Selesai <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={data.end_date}
                    onChange={(e) => setData('end_date', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                  {errors.end_date && <p className="text-red-500 text-xs mt-1">{errors.end_date}</p>}
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Deskripsi
                  </label>
                  <textarea
                    value={data.description}
                    onChange={(e) => setData('description', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Deskripsi periode heregistrasi (opsional)"
                    rows="3"
                  ></textarea>
                  {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
                </div>

                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={() => {
                      setIsCreateModalOpen(false);
                      reset();
                    }}
                    className="flex-1 py-2 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    disabled={processing}
                    className="flex-1 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    {processing ? 'Menyimpan...' : 'Buat Periode'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Confirmation Modal */}
        {confirmModal.show && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full transform animate-scale-in">
              {/* Header */}
              <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-6 rounded-t-2xl">
                <div className="flex items-center justify-center">
                  <div className="bg-white rounded-full p-3">
                    <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">
                  Konfirmasi Aktivasi Heregistrasi
                </h3>
                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-lg mb-6">
                  <p className="text-sm text-gray-700 leading-relaxed">
                    Apakah Anda yakin ingin mengaktifkan mode heregistrasi untuk periode ini? 
                    <span className="font-semibold block mt-2">Semua anggota harus melakukan heregistrasi ulang.</span>
                  </p>
                </div>

                {/* Buttons */}
                <div className="flex space-x-3">
                  <button
                    onClick={() => setConfirmModal({ show: false, periodId: null })}
                    className="flex-1 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-200"
                  >
                    Batal
                  </button>
                  <button
                    onClick={confirmActivate}
                    className="flex-1 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                  >
                    Ya, Aktifkan
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Deactivate Modal */}
        {deactivateModal.show && (
          <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-fade-in-scale">
              {/* Header */}
              <div className="bg-gradient-to-r from-red-500 to-red-600 p-4 text-white">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm flex-shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold">
                    Non-aktifkan Heregistrasi
                  </h3>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg mb-6">
                  <p className="text-sm text-gray-700 leading-relaxed">
                    Periode heregistrasi akan di-nonaktifkan. 
                    <span className="font-semibold block mt-2">Data pembayaran tidak akan dihapus.</span>
                  </p>
                </div>

                {/* Buttons */}
                <div className="flex space-x-3">
                  <button
                    onClick={() => setDeactivateModal({ show: false, periodId: null })}
                    className="flex-1 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-200"
                  >
                    Batal
                  </button>
                  <button
                    onClick={confirmDeactivate}
                    className="flex-1 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                  >
                    Ya, Non-aktifkan
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Delete Modal */}
        {deleteModal.show && (
          <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-fade-in-scale">
              {/* Header */}
              <div className="bg-gradient-to-r from-red-600 to-red-700 p-4 text-white">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm flex-shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-bold">
                    Hapus Periode Heregistrasi
                  </h3>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="bg-red-50 border-l-4 border-red-600 p-4 rounded-lg mb-6">
                  <p className="text-sm text-gray-700 leading-relaxed">
                    Anda akan menghapus periode <span className="font-bold">{deleteModal.periodName}</span>.
                    <span className="font-semibold block mt-2 text-red-700">Semua data pembayaran dan bukti transfer akan dihapus permanen!</span>
                  </p>
                </div>

                {/* Buttons */}
                <div className="flex space-x-3">
                  <button
                    onClick={() => setDeleteModal({ show: false, periodId: null, periodName: '' })}
                    className="flex-1 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-200"
                  >
                    Batal
                  </button>
                  <button
                    onClick={confirmDelete}
                    className="flex-1 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                  >
                    Ya, Hapus Permanen
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
