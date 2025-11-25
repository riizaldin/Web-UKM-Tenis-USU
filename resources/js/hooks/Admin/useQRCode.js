import { useState } from 'react';
import QRCode from 'qrcode';
import { sha256 } from 'js-sha256';

export default function useQRCode() {
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [selectedAttendance, setSelectedAttendance] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const generateQR = async (attendance) => {
    setSelectedAttendance(attendance);
    setIsLoading(true);
    const qrData = `${window.location.origin}/attendance/set?id=${attendance.kode_absensi}`;

    try {
      const qrUrl = await QRCode.toDataURL(qrData, {
        width: 400,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#FFFFFF',
        },
      });
      setQrCodeUrl(qrUrl);
      return qrUrl;
    } catch (error) {
      console.error('Error generating QR code:', error);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const downloadQR = () => {
    if (!qrCodeUrl || !selectedAttendance) return;

    const date = selectedAttendance.tanggal || 'unknown-date';
    const event_name = selectedAttendance.nama_event || 'unknown-event';
    const filename = `QR-absensi-${event_name}-${date}.png`;

    const link = document.createElement('a');
    link.href = qrCodeUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const resetQR = () => {
    setQrCodeUrl('');
    setSelectedAttendance(null);
  };

  return {
    qrCodeUrl,
    selectedAttendance,
    isLoading,
    generateQR,
    downloadQR,
    resetQR,
  };
}