import React, { useState } from "react";
import { Link } from "@inertiajs/react";
import Sidebar from "@/Components/Sidebar";
import Button from "@/Components/Admin/Absensi/Button";
import DocumentOverview from "@/Components/Admin/Dokumentasi/DocumentOverview";
import DocumentFilter from "@/Components/Admin/Dokumentasi/DocumentFilter";
import DocumentGallery from "@/Components/Admin/Dokumentasi/DocumentGallery";
import DocumentUploadModal from "@/Components/Admin/Dokumentasi/DocumentUploadModal";
import DocumentDetailModal from "@/Components/Admin/Dokumentasi/DocumentDetailModal";
import Pagination from "@/Components/Admin/Dokumentasi/Pagination";
import useDocumentation from "@/hooks/Admin/useDocumentation";
import useDocumentFilter from "@/hooks/Admin/useDocumentationFilter";
import { FileText, Plus, ArrowLeft, Download } from "lucide-react";

const formatDate = (date) => {
  return new Intl.DateTimeFormat('id-ID', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date));
};

export default function AdminDocumentation({ auth, documents, total_docs, recent_docs }) {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState(null);
  
  const {
    formData,
    files,
    previews,
    handleInputChange,
    handleFilesChange,
    removeFile,
    resetForm,
    validateForm,
  } = useDocumentation();

  const {
    searchTerm,
    setSearchTerm,
    filterCategory,
    setFilterCategory,
    currentPage,
    setCurrentPage,
    paginatedDocuments,
    totalPages,
  } = useDocumentFilter(documents);

  const today = new Date();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const submitData = new FormData();
    submitData.append('caption', formData.caption);
    submitData.append('category', formData.category);
    submitData.append('tags', formData.tags);
    files.forEach(file => submitData.append('files[]', file));

    console.log('Upload dokumen:', { ...formData, files: files.length });
    setIsUploadModalOpen(false);
    resetForm();
  };

  const openDetail = (doc) => {
    setSelectedDoc(doc);
    setIsDetailModalOpen(true);
  };

  const handleExport = () => {
    console.log('Export dokumen');
    alert('Export ZIP/PDF - Fitur backend nanti!');
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
              <h1 className="text-3xl font-semibold mt-1">Documentation</h1>
            </div>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="secondary" 
              icon={<Download className="w-4 h-4" />}
              onClick={handleExport}
            >
              Export
            </Button>
            {/* <Button
              variant="info"
              icon={<Plus className="w-4 h-4" />}
              onClick={() => setIsUploadModalOpen(true)}
            >
              Upload Dokumen
            </Button> */}
          </div>
        </div>

        {/* Overview */}
        <DocumentOverview
          totalDocs={total_docs}
          weeklyDocs={12}
          recentDocs={recent_docs}
          onDocClick={openDetail}
        />

        {/* Filter & Search */}
        <DocumentFilter
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          filterCategory={filterCategory}
          onCategoryChange={setFilterCategory}
        />

        {/* Gallery Dokumen */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
            <FileText className="w-5 h-5 text-indigo-500" />
            Gallery Dokumen
          </h3>

          <DocumentGallery
            documents={paginatedDocuments}
            onDocumentClick={openDetail}
          />

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>

        {/* Modals */}
        <DocumentUploadModal
          isOpen={isUploadModalOpen}
          onClose={() => setIsUploadModalOpen(false)}
          formData={formData}
          onInputChange={handleInputChange}
          files={files}
          previews={previews}
          onFilesChange={handleFilesChange}
          onRemoveFile={removeFile}
          onSubmit={handleSubmit}
        />

        <DocumentDetailModal
          isOpen={isDetailModalOpen}
          onClose={() => setIsDetailModalOpen(false)}
          document={selectedDoc}
        />
      </div>
    </div>
  );
}