import React from 'react';
import Modal from "./Modal"
import Button from './Button';
import Alert from './Alert';
import FormInput from './FormInput';
import FormTextarea from './FormTextarea';
import FormCheckbox from './FormCheckbox';
import { Calendar, Clock, MapPin, FileText, CheckCircle, Plus, Timer, QrCode } from 'lucide-react';

export default function AttendanceFormModal({ 
  isOpen, 
  onClose, 
  formData, 
  onInputChange, 
  onSubmit 
}) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Buat Absensi Baru"
      icon={<Plus className="w-5 h-5 text-pink-500" />}
    >
      <form onSubmit={onSubmit} className="space-y-4">
        <FormInput
          label="Tanggal"
          icon={<Calendar className="w-4 h-4" />}
          type="date"
          name="date"
          value={formData.date}
          onChange={onInputChange}
          required
        />

        <div className="grid grid-cols-2 gap-4">
          <FormInput
            label="Waktu Mulai"
            icon={<Clock className="w-4 h-4" />}
            type="time"
            name="start_time"
            value={formData.start_time}
            onChange={onInputChange}
            required
          />

          <FormInput
            label="Waktu Selesai"
            icon={<Timer className="w-4 h-4" />}
            type="time"
            name="end_time"
            value={formData.end_time}
            onChange={onInputChange}
            placeholder="Opsional"
          />
        </div>

        <Alert 
          variant="warning" 
          icon={<Timer className="w-4 h-4" />}
          title="Waktu Selesai (Opsional):"
        >
          Jika diisi, anggota hanya bisa absen dalam rentang waktu tersebut. 
          Jika tidak diisi, absen berlaku dari waktu mulai hingga akhir hari.
        </Alert>

        <FormInput
          label="Lokasi"
          icon={<MapPin className="w-4 h-4" />}
          type="text"
          name="location"
          value={formData.location}
          onChange={onInputChange}
          placeholder="Misal: Ruang A101"
          required
        />

        <FormTextarea
          label="Keterangan Kegiatan"
          icon={<FileText className="w-4 h-4" />}
          name="description"
          value={formData.description}
          onChange={onInputChange}
          placeholder="Deskripsi kegiatan absensi"
          rows={3}
          required
        />

        <Alert variant="info">
          <FormCheckbox
            label="Mode QR Code Only"
            description="Jika diaktifkan, anggota hanya bisa absen dengan scan QR code. Jika tidak, absen bisa dilakukan secara umum tanpa QR."
            name="qr_only"
            checked={formData.qr_only}
            onChange={onInputChange}
          />
        </Alert>

        <Alert variant="gray" icon={<QrCode className="w-4 h-4" />}>
          QR Code dapat di-generate kapan saja setelah absensi dibuat. 
          Cukup klik tombol "Generate QR" pada baris absensi.
        </Alert>

        <Button
          type="submit"
          variant="primary"
          icon={<CheckCircle className="w-4 h-4" />}
          className="w-full"
        >
          Buat Absen
        </Button>
      </form>
    </Modal>
  );
}