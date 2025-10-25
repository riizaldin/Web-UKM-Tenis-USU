import React, { useState } from "react";
import { Link } from "@inertiajs/react";
import Sidebar from "@/Components/Sidebar";
import Button from "@/Components/Admin/Absensi/Button";
import TransactionOverview from "@/Components/Admin/Kas/TransactionOverview";
import TransactionSection from "@/Components/Admin/Kas/TransactionSection";
import TransactionFormModal from "@/Components/Admin/Kas/TransactionFormModal";
import useTransaction from "@/hooks/Admin/useTransaction";
import useTransactionFilter from "@/hooks/Admin/useTransactionFilter";
import { ArrowLeft, Download } from "lucide-react";

const formatDate = (date) => {
  return new Intl.DateTimeFormat('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
};

const expenseCategories = ['Biaya Kegiatan', 'Alat & Perlengkapan', 'Lainnya'];
const incomeCategories = ['Iuran Anggota', 'Donasi', 'Sponsor', 'Lainnya'];

export default function AdminKas({ auth, transactions, total_kas, total_income, total_expense }) {
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
  const [isIncomeModalOpen, setIsIncomeModalOpen] = useState(false);

  const today = new Date();

  // Hooks untuk Expense
  const expenseHook = useTransaction('expense');
  const expenseFilter = useTransactionFilter(transactions, 'expense');

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
    submitData.append('type', 'expense');
    if (expenseHook.proofFile) submitData.append('proof', expenseHook.proofFile);

    console.log('Tambah pengeluaran:', Object.fromEntries(submitData));
    // router.post('/admin/kas/expense', submitData);
    
    setIsExpenseModalOpen(false);
    expenseHook.resetForm();
  };

  const handleIncomeSubmit = (e) => {
    e.preventDefault();
    if (!incomeHook.validateForm()) return;

    const submitData = new FormData();
    Object.keys(incomeHook.formData).forEach(key => 
      submitData.append(key, incomeHook.formData[key])
    );
    submitData.append('type', 'income');
    if (incomeHook.proofFile) submitData.append('proof', incomeHook.proofFile);

    console.log('Tambah pemasukan:', Object.fromEntries(submitData));
    // router.post('/admin/kas/income', submitData);
    
    setIsIncomeModalOpen(false);
    incomeHook.resetForm();
  };

  const handleExport = () => {
    console.log('Export data');
    alert('Export PDF/CSV - Fitur ini akan diimplementasi di backend!');
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

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

        {/* Section: Pemasukan */}
        <TransactionSection
          title="Pemasukan"
          type="income"
          transactions={incomeFilter.paginatedTransactions}
          searchTerm={incomeFilter.searchTerm}
          onSearchChange={incomeFilter.setSearchTerm}
          filterMonth={incomeFilter.filterMonth}
          onMonthChange={incomeFilter.setFilterMonth}
          currentPage={incomeFilter.currentPage}
          totalPages={incomeFilter.totalPages}
          onPageChange={incomeFilter.setCurrentPage}
          onAddClick={() => setIsIncomeModalOpen(true)}
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

        {/* Modals */}
        <TransactionFormModal
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
        />

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
          categories={expenseCategories}
        />
      </div>
    </div>
  );
}