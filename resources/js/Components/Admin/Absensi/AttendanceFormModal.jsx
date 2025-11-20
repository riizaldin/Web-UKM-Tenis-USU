import React from 'react';
import Modal from "./Modal"
import Button from './Button';
import Alert from './Alert';
import FormInput from './FormInput';
import FormTextarea from './FormTextarea';
import { Calendar, Clock, MapPin, FileText, CheckCircle, Plus, Timer, QrCode,  ALargeSmall, SquareChartGantt, User, Trophy } from 'lucide-react';

export default function AttendanceFormModal({ 
  isOpen, 
  onClose, 
  formData, 
  onInputChange, 
  onSubmit,
  errors = {},
  isLoading
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
          error={errors.date}
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
            error={errors.start_time}
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
            error={errors.end_time}
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
          label="Nama Kegiatan"
          icon={<ALargeSmall className="w-4 h-4" />}
          type="text"
          name="name"
          value={formData.name}
          onChange={onInputChange}
          placeholder="Misal: Latihan Rutin"
          error={errors.name}
          required
        />

        <FormInput
          label="Tipe Kegiatan"
          icon={<SquareChartGantt className="w-4 h-4" />}
          type="select"
          name="type"
          value={formData.type}
          onChange={onInputChange}
          options={[
            { value: '', label: 'Pilih tipe kegiatan', disabled: true },
            { value: 'latihan', label: 'Latihan' },
            { value: 'turnamen', label: 'Turnamen' },
            { value: 'lainnya', label: 'Lainnya' },
          ]}
          error={errors.type}
          required
        />

        {formData.type === 'latihan' && (
          <FormInput
            label="Coach"
            icon={<User className="w-4 h-4" />}
            type="text"
            name="pelatih"
            value={formData.pelatih ?? ''}
            onChange={onInputChange}
            error={errors.pelatih}
            placeholder="Nama pelatih (opsional)"
          />
        )}

        {formData.type === 'turnamen' && (
          <FormInput
            label="Hadiah"
            icon={<Trophy className="w-4 h-4" />}
            type="text"
            name="hadiah"
            value={formData.hadiah ?? ''}
            onChange={onInputChange}
            error={errors.hadiah}
            placeholder="Hadiah turnamen (opsional)"
          />
        )}

        <FormInput
          label="Lokasi"
          icon={<MapPin className="w-4 h-4" />}
          type="text"
          name="location"
          value={formData.location}
          onChange={onInputChange}
          placeholder="Misal: Ruang A101"
          error={errors.location}
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
          error={errors.description}
        />

     

        <Alert variant="gray" icon={<QrCode className="w-4 h-4" />}>
          QR Code dapat di-generate kapan saja setelah absensi dibuat. 
          Cukup klik tombol "Generate QR" pada baris absensi.
        </Alert>

        <Button
          type="submit"
          variant="primary"
          icon={<CheckCircle className="w-4 h-4" />}
          className="w-full"
          disabled={isLoading}
        >
          Buat Absen
        </Button>
      </form>
    </Modal>
  );
}