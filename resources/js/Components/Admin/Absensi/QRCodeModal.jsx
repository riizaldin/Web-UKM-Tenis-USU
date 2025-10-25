import React from 'react';
import Modal from './Modal';
import Button from './Button';
import Alert from './Alert';
import { Calendar, Clock, MapPin, QrCode, Download } from 'lucide-react';

export default function QRCodeModal({ 
  isOpen, 
  onClose, 
  attendance, 
  qrCodeUrl, 
  onDownload 
}) {
  if (!attendance) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="QR Code Absensi"
      icon={<QrCode className="w-5 h-5 text-indigo-600" />}
    >
      <div className="space-y-4">
        {/* Info Absensi */}
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-2">{attendance.description}</h4>
          <div className="space-y-1 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {new Date(attendance.date).toLocaleDateString('id-ID', { 
                day: 'numeric', month: 'long', year: 'numeric'
              })}
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {attendance.start_time}
              {attendance.end_time && ` - ${attendance.end_time}`}
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              {attendance.location}
            </div>
          </div>
        </div>

        {/* QR Code Image */}
        <div className="bg-white border-4 border-indigo-100 rounded-xl p-4">
          <img 
            src={qrCodeUrl} 
            alt="QR Code" 
            className="w-full h-auto"
          />
        </div>

        {/* Instructions */}
        <Alert variant="info" title="Cara Penggunaan:">
          Anggota dapat scan QR code ini menggunakan kamera smartphone 
          atau aplikasi absensi untuk melakukan absensi
          {attendance.end_time && ` (berlaku hingga ${attendance.end_time})`}.
        </Alert>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button
            variant="info"
            icon={<Download className="w-4 h-4" />}
            onClick={onDownload}
            className="flex-1"
          >
            Download QR
          </Button>
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1"
          >
            Tutup
          </Button>
        </div>
      </div>
    </Modal>
  );
}