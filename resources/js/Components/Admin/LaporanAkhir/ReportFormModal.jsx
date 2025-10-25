import React from 'react';
import Modal from '@/Components/Admin/Absensi/Modal';
import Button from '@/Components/Admin/Absensi/Button';
import Alert from '@/Components/Admin/Absensi/Alert';
import FormInput from '@/Components/Admin/Absensi/FormInput';
import FormTextarea from '@/Components/Admin/Absensi/FormTextarea';
import { Plus, FileText, Calendar, DollarSign, Target, AlertTriangle, Lightbulb, X, Upload } from 'lucide-react';

export default function ReportFormModal({ 
  isOpen, 
  onClose, 
  formData, 
  onInputChange,
  files,
  previews,
  onFilesChange,
  onRemoveFile,
  onSubmit 
}) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Buat Laporan Akhir Baru"
      icon={<Plus className="w-5 h-5 text-blue-600" />}
      maxWidth="max-w-3xl"
    >
      <form onSubmit={onSubmit} className="space-y-4">
        {/* Informasi Dasar */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Informasi Dasar
          </h4>
          
          <FormInput
            label="Judul Laporan"
            name="title"
            value={formData.title}
            onChange={onInputChange}
            placeholder="Misal: Laporan Akhir Semester 1 2024"
            required
          />

          <div className="grid grid-cols-2 gap-4 mt-3">
            <FormInput
              label="Periode Mulai"
              icon={<Calendar className="w-4 h-4" />}
              type="date"
              name="period_start"
              value={formData.period_start}
              onChange={onInputChange}
              required
            />
            <FormInput
              label="Periode Selesai"
              icon={<Calendar className="w-4 h-4" />}
              type="date"
              name="period_end"
              value={formData.period_end}
              onChange={onInputChange}
              required
            />
          </div>

          <div className="mt-3">
            <FormTextarea
              label="Deskripsi Singkat"
              name="description"
              value={formData.description}
              onChange={onInputChange}
              placeholder="Ringkasan laporan..."
              rows={3}
            />
          </div>
        </div>

        {/* Ringkasan Keuangan */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <DollarSign className="w-4 h-4" />
            Ringkasan Keuangan
          </h4>
          
          <div className="grid grid-cols-3 gap-4">
            <FormInput
              label="Total Pemasukan (Rp)"
              type="number"
              name="total_income"
              value={formData.total_income}
              onChange={onInputChange}
              placeholder="0"
            />
            <FormInput
              label="Total Pengeluaran (Rp)"
              type="number"
              name="total_expense"
              value={formData.total_expense}
              onChange={onInputChange}
              placeholder="0"
            />
            <FormInput
              label="Saldo Akhir (Rp)"
              type="number"
              name="total_balance"
              value={formData.total_balance}
              onChange={onInputChange}
              disabled
              className="bg-gray-100"
            />
          </div>

          <Alert variant="info" className="mt-3">
            Saldo akhir akan otomatis terhitung dari pemasukan - pengeluaran
          </Alert>
        </div>

        {/* Pencapaian */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <Target className="w-4 h-4" />
            Pencapaian
          </h4>
          <FormTextarea
            name="achievements"
            value={formData.achievements}
            onChange={onInputChange}
            placeholder="Daftar pencapaian selama periode laporan..."
            rows={4}
          />
        </div>

        {/* Tantangan */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" />
            Tantangan & Kendala
          </h4>
          <FormTextarea
            name="challenges"
            value={formData.challenges}
            onChange={onInputChange}
            placeholder="Tantangan yang dihadapi..."
            rows={4}
          />
        </div>

        {/* Rekomendasi */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <Lightbulb className="w-4 h-4" />
            Rekomendasi & Saran
          </h4>
          <FormTextarea
            name="recommendations"
            value={formData.recommendations}
            onChange={onInputChange}
            placeholder="Saran untuk periode selanjutnya..."
            rows={4}
          />
        </div>

        {/* Upload Lampiran */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <Upload className="w-4 h-4" />
            Lampiran (Opsional)
          </h4>
          <input
            type="file"
            multiple
            accept="image/*,.pdf"
            onChange={onFilesChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          
          {previews.length > 0 && (
            <div className="grid grid-cols-4 gap-2 mt-3">
              {previews.map((preview, index) => (
                <div key={index} className="relative">
                  <img src={preview} alt="Preview" className="w-full h-20 object-cover rounded" />
                  <button
                    type="button"
                    onClick={() => onRemoveFile(index)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          )}
          
          <p className="text-sm text-gray-500 mt-2">File terpilih: {files.length}</p>
        </div>

        <Button
          type="submit"
          variant="primary"
          className="w-full"
        >
          Buat Laporan
        </Button>
      </form>
    </Modal>
  );
}