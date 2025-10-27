import React from 'react';
import Modal from '@/Components/Admin/Absensi/Modal';
import Button from '@/Components/Admin/Absensi/Button';
import Alert from '@/Components/Admin/Absensi/Alert';
import { AlertTriangle, Trash2 } from 'lucide-react';

export default function DeleteConfirmModal({ isOpen, onClose, onConfirm, memberName }) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Konfirmasi Hapus Anggota"
      icon={<AlertTriangle className="w-5 h-5 text-red-600" />}
      maxWidth="max-w-md"
    >
      <div className="space-y-4">
        <Alert variant="danger" icon={<AlertTriangle className="w-4 h-4" />}>
          <strong>Peringatan!</strong> Tindakan ini tidak dapat dibatalkan.
        </Alert>

        <p className="text-gray-700">
          Apakah Anda yakin ingin menghapus anggota <strong>{memberName}</strong>?
        </p>

        <p className="text-sm text-gray-500">
          Semua data terkait anggota ini akan dihapus permanen, termasuk:
        </p>
        <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
          <li>Log aktivitas</li>
          <li>Riwayat pembayaran kas</li>
          <li>Data absensi</li>
          <li>Dokumen terkait</li>
        </ul>

        <div className="flex gap-3 pt-4">
          <Button
            variant="danger"
            icon={<Trash2 className="w-4 h-4" />}
            onClick={onConfirm}
            className="flex-1"
          >
            Ya, Hapus
          </Button>
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1"
          >
            Batal
          </Button>
        </div>
      </div>
    </Modal>
  );
}