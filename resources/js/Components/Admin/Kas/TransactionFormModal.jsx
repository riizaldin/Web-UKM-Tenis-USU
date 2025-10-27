import React from 'react';
import Modal from '@/Components/Admin/Absensi/Modal';
import Button from '@/Components/Admin/Absensi/Button';
import FormInput from '@/Components/Admin/Absensi/FormInput';
import { Plus, FileText } from 'lucide-react';

export default function TransactionFormModal({ 
  isOpen, 
  onClose, 
  type = 'expense',
  formData, 
  onInputChange,
  proofFile,
  proofPreview,
  onFileChange,
  onSubmit,
  categories 
}) {
  const isIncome = type === 'income';
  const color = isIncome ? 'green' : 'red';

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Tambah ${isIncome ? 'Pemasukan' : 'Pengeluaran'} Baru`}
      icon={<Plus className={`w-5 h-5 text-${color}-600`} />}
    >
      <form onSubmit={onSubmit} className="space-y-4">
        <FormInput
          label="Tanggal"
          type="date"
          name="date"
          value={formData.date}
          onChange={onInputChange}
          required
        />

        <FormInput
          label="Deskripsi"
          name="description"
          value={formData.description}
          onChange={onInputChange}
          placeholder={`Misal: ${isIncome ? 'Iuran bulanan Budi Santoso' : 'Biaya cetak banner'}`}
          required
        />

        <FormInput
          label="Jumlah (Rp)"
          type="number"
          name="amount"
          value={formData.amount}
          onChange={onInputChange}
          placeholder={isIncome ? '50000' : '150000'}
          required
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
          <select
            name="category"
            value={formData.category}
            onChange={onInputChange}
            className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-${color}-500`}
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {isIncome && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Metode Pembayaran</label>
            <select
              name="payment_method"
              value={formData.payment_method}
              onChange={onInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="cash">Cash</option>
              <option value="transfer">Transfer</option>
            </select>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={onInputChange}
            className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-${color}-500`}
          >
            <option value="approved">Disetujui</option>
            <option value="pending">Pending</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1 items-center gap-2">
            <FileText className="w-4 h-4" />
            Upload Bukti (Opsional)
          </label>
          <input
            type="file"
            accept="image/*,application/pdf"
            onChange={onFileChange}
            className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-${color}-500`}
          />
          {proofPreview && (
            <img src={proofPreview} alt="Preview" className="mt-2 max-w-xs rounded-md border" />
          )}
          {proofFile && <p className="text-sm text-gray-500 mt-1">File: {proofFile.name}</p>}
        </div>

        <Button
          type="submit"
          variant={isIncome ? 'success' : 'danger'}
          className="w-full"
        >
          Simpan {isIncome ? 'Pemasukan' : 'Pengeluaran'}
        </Button>
      </form>
    </Modal>
  );
}