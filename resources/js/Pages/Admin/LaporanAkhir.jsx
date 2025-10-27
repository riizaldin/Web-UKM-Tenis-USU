import React, { useState } from "react";
import { Link } from "@inertiajs/react";
import Sidebar from "@/Components/Sidebar";

// Import dari Components/Admin/Absensi
import Button from "@/Components/Admin/Absensi/Button";
import Badge from "@/Components/Admin/Absensi/Badge";
import Alert from "@/Components/Admin/Absensi/Alert";
import Modal from "@/Components/Admin/Absensi/Modal";
import FormInput from "@/Components/Admin/Absensi/FormInput";
import FormTextarea from "@/Components/Admin/Absensi/FormTextarea";
import EmptyState from "@/Components/Admin/Absensi/EmptyState";

// Import dari Components/Admin/Dokumentasi
import Pagination from "@/Components/Admin/Dokumentasi/Pagination";

// Import komponen LaporanAkhir
import ReportOverview from "@/Components/Admin/LaporanAkhir/ReportOverview";
import ReportFilter from "@/Components/Admin/LaporanAkhir/ReportFilter";
import ReportCard from "@/Components/Admin/LaporanAkhir/ReportCard";
import ReportFormModal from "@/Components/Admin/LaporanAkhir/ReportFormModal";
import ReportDetailModal from "@/Components/Admin/LaporanAkhir/ReportDetailModal";

// Import hooks
import useReport from "@/hooks/Admin/useReport";
import useReportFilter from "@/hooks/Admin/useReportFilter";

import { ArrowLeft, Plus, FileText, Download } from "lucide-react";

const formatDate = (date) => {
  return new Intl.DateTimeFormat('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
};

export default function AdminLaporanAkhir({ auth, reports = [], total_reports = 0, this_year_reports = 0, last_report = null }) {
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);

  const today = new Date();

  const {
    formData,
    files,
    previews,
    handleInputChange,
    handleFilesChange,
    removeFile,
    resetForm,
    validateForm,
  } = useReport();

  const {
    searchTerm,
    setSearchTerm,
    filterYear,
    setFilterYear,
    currentPage,
    setCurrentPage,
    paginatedReports,
    totalPages,
  } = useReportFilter(reports);

  // Get available years from reports
  const availableYears = reports.length > 0 
    ? [...new Set(reports.map(r => new Date(r.period_start).getFullYear()))].sort((a, b) => b - a)
    : [];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const submitData = new FormData();
    Object.keys(formData).forEach(key => 
      submitData.append(key, formData[key])
    );
    files.forEach(file => submitData.append('attachments[]', file));

    console.log('Buat laporan:', Object.fromEntries(submitData));
    // router.post('/admin/laporan-akhir', submitData);
    
    setIsFormModalOpen(false);
    resetForm();
  };

  const openDetail = (report) => {
    setSelectedReport(report);
    setIsDetailModalOpen(true);
  };

  const handleExport = () => {
    console.log('Export all reports');
    alert('Export semua laporan ke ZIP - Fitur backend nanti!');
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
              <h1 className="text-3xl font-semibold mt-1">Laporan Akhir</h1>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="secondary"
              icon={<Download className="w-4 h-4" />}
              onClick={handleExport}
            >
              Export Semua
            </Button>
            <Button
              variant="primary"
              icon={<Plus className="w-4 h-4" />}
              onClick={() => setIsFormModalOpen(true)}
            >
              Buat Laporan
            </Button>
          </div>
        </div>

        {/* Overview */}
        <ReportOverview
          totalReports={total_reports}
          thisYearReports={this_year_reports}
          lastReport={last_report}
        />

        {/* Filter & Search */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
          <ReportFilter
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            filterYear={filterYear}
            onYearChange={setFilterYear}
            availableYears={availableYears}
          />
        </div>

        {/* Reports Grid */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
            <FileText className="w-5 h-5 text-blue-600" />
            Daftar Laporan
          </h3>

          {paginatedReports.length > 0 ? (
            <>
              <div className="grid grid-cols-2 gap-6">
                {paginatedReports.map((report) => (
                  <ReportCard
                    key={report.id}
                    report={report}
                    onClick={openDetail}
                  />
                ))}
              </div>

              {totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              )}
            </>
          ) : (
            <EmptyState
              icon={<FileText className="w-full h-full" />}
              title="Belum ada laporan"
              description="Buat laporan akhir pertama Anda!"
            />
          )}
        </div>

        {/* Modals */}
        <ReportFormModal
          isOpen={isFormModalOpen}
          onClose={() => setIsFormModalOpen(false)}
          formData={formData}
          onInputChange={handleInputChange}
          files={files}
          previews={previews}
          onFilesChange={handleFilesChange}
          onRemoveFile={removeFile}
          onSubmit={handleSubmit}
        />

        <ReportDetailModal
          isOpen={isDetailModalOpen}
          onClose={() => setIsDetailModalOpen(false)}
          report={selectedReport}
        />
      </div>
    </div>
  );
}