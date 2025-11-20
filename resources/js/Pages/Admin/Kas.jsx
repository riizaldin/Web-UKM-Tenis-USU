import React, { useState } from "react";
import { Link, router, useForm } from "@inertiajs/react";
import Sidebar from "@/Components/Sidebar";
import Button from "@/Components/Admin/Absensi/Button";
import TransactionOverview from "@/Components/Admin/Kas/TransactionOverview";
import TransactionSection from "@/Components/Admin/Kas/TransactionSection";
import TransactionFormModal from "@/Components/Admin/Kas/TransactionFormModal";
import useTransaction from "@/hooks/Admin/useTransaction";
import useTransactionFilter from "@/hooks/Admin/useTransactionFilter";
import { ArrowLeft, Download, Plus, Trash2, User, Users } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";

const formatDate = (date) => {
  return new Intl.DateTimeFormat('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
};

// const expenseCategories = ['Biaya Kegiatan', 'Alat & Perlengkapan', 'Lainnya'];
// const incomeCategories = ['Iuran Anggota', 'Donasi', 'Sponsor', 'Lainnya'];

export default function AdminKas({ auth, transactions, bills = [], users = [], total_kas, total_income, total_expense }) {
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
  // const [isIncomeModalOpen, setIsIncomeModalOpen] = useState(false);
  const [isBillModalOpen, setIsBillModalOpen] = useState(false);

  const today = new Date();

  const { data: billData, setData: setBillData, post: postBill, processing: processingBill, errors: billErrors, reset: resetBill } = useForm({
    title: '',
    description: '',
    amount: '',
    due_date: '',
    bill_type: 'monthly',
    is_global: true,
    user_id: '',
  });

  // Hooks untuk Expense
  const expenseHook = useTransaction('expense');
  const expenseFilter = useTransactionFilter(transactions);

  // Hooks untuk Income
  const incomeHook = useTransaction('income');
  const incomeFilter = useTransactionFilter(transactions, 'income');

  const handleExpenseSubmit = (e) => {
    e.preventDefault();
    if (!expenseHook.validateForm()) return;  

    const submitData = new FormData();
    Object.keys(expenseHook.formData).forEach(key => 
      submitData.append(key, expenseHook.formData[key])
    );
    if (expenseHook.proofFile) submitData.append('proof', expenseHook.proofFile);

    router.post('/admin/kas/expense', submitData, {
      onSuccess: (page) => {
          if (page.props.flash?.error) {
              toast.error(page.props.flash.error);
          } else if (page.props.flash?.success) {
              toast.success(page.props.flash.success);
          }
      },
      onError: (error) => {
          toast.error('Gagal menambah pengeluaran. Silahkan coba lagi.');
      }
    });
    
    setIsExpenseModalOpen(false);
    expenseHook.resetForm();
  };

  // const handleIncomeSubmit = (e) => {
  //   e.preventDefault();
  //   if (!incomeHook.validateForm()) return;

  //   const submitData = new FormData();
  //   Object.keys(incomeHook.formData).forEach(key => 
  //     submitData.append(key, incomeHook.formData[key])
  //   );
  //   submitData.append('type', 'income');
  //   if (incomeHook.proofFile) submitData.append('proof', incomeHook.proofFile);

  //   console.log('Tambah pemasukan:', Object.fromEntries(submitData));
  //   // router.post('/admin/kas/income', submitData);
    
  //   setIsIncomeModalOpen(false);
  //   incomeHook.resetForm();
  // };

  const handleExport = () => {
    console.log('Export data');
    alert('Export PDF/CSV - Fitur ini akan diimplementasi di backend!');
  };

  const handleBillSubmit = (e) => {
    e.preventDefault();
    postBill(route('admin.kas.bill.create'), {
      onSuccess: () => {
        setIsBillModalOpen(false);
        resetBill();
        toast.success('Tagihan kas berhasil dibuat!');
      },
      onError: () => {
        toast.error('Gagal membuat tagihan kas. Silakan periksa kembali data yang dimasukkan.');
      },
    });
  };

  const handleDeleteBill = (billId) => {
    if (confirm('Apakah Anda yakin ingin menghapus tagihan ini?')) {
      router.delete(route('admin.kas.bill.delete', billId));
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
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

  const getStatusColor = (status) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-700';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'unpaid':
        return 'bg-red-100 text-red-700';
      case 'overdue':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <ToastContainer position='top-center' autoClose={1300}></ToastContainer>

      <div className="flex-1 p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="p-2 text-blue-600 hover:bg-blue-50 rounded-md">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h2 className="text-sm text-gray-500">{formatDate(today)}</h2>
              <h1 className="text-3xl font-semibold mt-1">Kas Transaksi</h1>
            </div>
          </div>
          <Button
            variant="secondary"
            icon={<Download className="w-4 h-4" />}
            onClick={handleExport}
          >
            Export Laporan
          </Button>
        </div>

        {/* Overview Saldo */}
        <TransactionOverview
          totalKas={total_kas}
          totalIncome={total_income}
          totalExpense={total_expense}
        />

        {/* Section: Pengeluaran */}
        <TransactionSection
          title="Pengeluaran"
          type="expense"
          transactions={expenseFilter.paginatedTransactions}
          searchTerm={expenseFilter.searchTerm}
          onSearchChange={expenseFilter.setSearchTerm}
          filterMonth={expenseFilter.filterMonth}
          onMonthChange={expenseFilter.setFilterMonth}
          currentPage={expenseFilter.currentPage}
          totalPages={expenseFilter.totalPages}
          onPageChange={expenseFilter.setCurrentPage}
          onAddClick={() => setIsExpenseModalOpen(true)}
        />

        {/* Section: Tagihan Kas */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Tagihan Kas</h2>
            <Button
              variant="primary"
              icon={<Plus className="w-4 h-4" />}
              onClick={() => setIsBillModalOpen(true)}
            >
              Buat Tagihan
            </Button>
          </div>

          {bills.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <p className="text-gray-500">Belum ada tagihan kas</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {bills.map((bill) => (
                <Link
                  key={bill.id}
                  href={route('admin.kas.bill.review', bill.id)}
                  className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        {bill.is_global ? (
                          <Users className="w-4 h-4 text-blue-600" />
                        ) : (
                          <User className="w-4 h-4 text-purple-600" />
                        )}
                        <span className="text-xs font-semibold text-gray-600">
                          {getBillTypeLabel(bill.bill_type)}
                        </span>
                      </div>
                      <h3 className="font-semibold text-gray-800 mb-1">{bill.title}</h3>
                      <p className="text-xs text-gray-600">{bill.user_name}</p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handleDeleteBill(bill.id);
                      }}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Hapus tagihan"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {bill.description && (
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{bill.description}</p>
                  )}

                  <div className="space-y-2 mb-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Total</span>
                      <span className="font-semibold">{formatCurrency(bill.amount)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Terbayar</span>
                      <span className="font-semibold text-green-600">{formatCurrency(bill.total_paid)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Pending</span>
                      <span className="font-semibold text-yellow-600">{formatCurrency(bill.total_pending)}</span>
                    </div>
                    <div className="flex justify-between text-sm pt-2 border-t">
                      <span className="text-gray-800 font-semibold">Sisa</span>
                      <span className="font-bold text-red-600">{formatCurrency(bill.remaining)}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t">
                    <div className="text-xs text-gray-500">
                      Jatuh tempo: {new Date(bill.due_date).toLocaleDateString('id-ID')}
                    </div>
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${getStatusColor(bill.status)}`}>
                      {bill.status === 'paid' ? 'Lunas' : bill.status === 'pending' ? 'Proses' : 'Belum Lunas'}
                    </span>
                  </div>

                  {(bill.pending_count > 0 || bill.approved_count > 0 || bill.rejected_count > 0) && (
                    <div className="mt-3 pt-3 border-t flex gap-2 text-xs">
                      {bill.pending_count > 0 && (
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded">
                          {bill.pending_count} menunggu
                        </span>
                      )}
                      {bill.approved_count > 0 && (
                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded">
                          {bill.approved_count} disetujui
                        </span>
                      )}
                      {
                        bill.rejected_count > 0 && (
                          <span className="px-2 py-1 bg-red-100 text-red-700 rounded">
                            {bill.rejected_count} ditolak
                          </span>
                        )
                      }
                    </div>
                  )}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Modals */}
        {/* <TransactionFormModal
          isOpen={isIncomeModalOpen}
          onClose={() => setIsIncomeModalOpen(false)}
          type="income"
          formData={incomeHook.formData}
          onInputChange={incomeHook.handleInputChange}
          proofFile={incomeHook.proofFile}
          proofPreview={incomeHook.proofPreview}
          onFileChange={incomeHook.handleFileChange}
          onSubmit={handleIncomeSubmit}
          categories={incomeCategories}
        /> */}

        <TransactionFormModal
          isOpen={isExpenseModalOpen}
          onClose={() => setIsExpenseModalOpen(false)}
          type="expense"
          formData={expenseHook.formData}
          onInputChange={expenseHook.handleInputChange}
          proofFile={expenseHook.proofFile}
          proofPreview={expenseHook.proofPreview}
          onFileChange={expenseHook.handleFileChange}
          onSubmit={handleExpenseSubmit}
        />

        {/* Bill Form Modal */}
        {isBillModalOpen && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-lg w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200 sticky top-0 bg-white">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-800">Buat Tagihan Kas</h2>
                  <button
                    onClick={() => {
                      setIsBillModalOpen(false);
                      resetBill();
                    }}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              <form onSubmit={handleBillSubmit} className="p-6">
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Judul Tagihan <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={billData.title}
                    onChange={(e) => setBillData('title', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Contoh: Iuran Kas Bulan Desember 2025"
                    required
                  />
                  {billErrors.title && <p className="text-red-500 text-xs mt-1">{billErrors.title}</p>}
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Deskripsi
                  </label>
                  <textarea
                    value={billData.description}
                    onChange={(e) => setBillData('description', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Deskripsi tagihan (opsional)"
                    rows="3"
                  ></textarea>
                  {billErrors.description && <p className="text-red-500 text-xs mt-1">{billErrors.description}</p>}
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Jumlah <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">Rp</span>
                    <input
                      type="number"
                      value={billData.amount}
                      onChange={(e) => setBillData('amount', e.target.value)}
                      className="w-full pl-12 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="0"
                      required
                    />
                  </div>
                  {billErrors.amount && <p className="text-red-500 text-xs mt-1">{billErrors.amount}</p>}
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Jatuh Tempo <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={billData.due_date}
                    onChange={(e) => setBillData('due_date', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                  {billErrors.due_date && <p className="text-red-500 text-xs mt-1">{billErrors.due_date}</p>}
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Tipe Tagihan <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={billData.bill_type}
                    onChange={(e) => setBillData('bill_type', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    <option value="monthly">Iuran Bulanan</option>
                    <option value="event">Event</option>
                    <option value="penalty">Denda</option>
                    <option value="other">Lainnya</option>
                  </select>
                  {billErrors.bill_type && <p className="text-red-500 text-xs mt-1">{billErrors.bill_type}</p>}
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Untuk <span className="text-red-500">*</span>
                  </label>
                  <div className="space-y-3">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="bill_scope"
                        value="global"
                        checked={billData.is_global === true}
                        onChange={() => {
                          setBillData(data => ({
                            ...data,
                            is_global: true,
                            user_id: '',
                          }));
                        }}
                        className="mr-2"
                      />
                      <Users className="w-4 h-4 mr-2 text-blue-600" />
                      <span>Semua Anggota (Global)</span>
                    </label>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="bill_scope"
                        value="personal"
                        checked={billData.is_global === false}
                        onChange={() => {
                          setBillData(data => ({
                            ...data,
                            is_global: false,
                          }));
                        }}
                        className="mr-2"
                      />
                      <User className="w-4 h-4 mr-2 text-purple-600" />
                      <span>Anggota Tertentu</span>
                    </label>
                  </div>
                  {billErrors.is_global && <p className="text-red-500 text-xs mt-1">{billErrors.is_global}</p>}
                </div>

                {billData.is_global === false && (
                  <div className="mb-4">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Pilih Anggota <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={billData.user_id}
                      onChange={(e) => setBillData('user_id', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required={!billData.is_global}
                    >
                      <option value="">Pilih anggota...</option>
                      {users.map((user) => (
                        <option key={user.id} value={user.id}>
                          {user.name} ({user.email})
                        </option>
                      ))}
                    </select>
                    {billErrors.user_id && <p className="text-red-500 text-xs mt-1">{billErrors.user_id}</p>}
                  </div>
                )}

                <div className="p-4 bg-blue-50 rounded-lg mb-6">
                  <div className="flex items-start space-x-3">
                    <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    <div className="text-sm text-blue-800">
                      <p className="font-semibold mb-1">Info</p>
                      <p>Tagihan global akan muncul untuk semua anggota. Tagihan personal hanya untuk anggota yang dipilih.</p>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <button
                    type="button"
                    onClick={() => {
                      setIsBillModalOpen(false);
                      resetBill();
                    }}
                    className="flex-1 py-2 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    disabled={processingBill}
                    className="flex-1 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    {processingBill ? 'Menyimpan...' : 'Buat Tagihan'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}