import { useState } from 'react';
import QRCode from 'qrcode';

export default function useQRCode() {
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [selectedAttendance, setSelectedAttendance] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const generateQR = async (attendance) => {
    setSelectedAttendance(attendance);
    setIsLoading(true);
    
    const qrData = JSON.stringify({
      attendance_id: attendance.id,
      description: attendance.description,
      date: attendance.date,
      start_time: attendance.start_time,
      end_time: attendance.end_time,
      location: attendance.location,
      url: `${window.location.origin}/attendance/${attendance.id}/scan`
    });

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
    
    const link = document.createElement('a');
    link.download = `QR-${selectedAttendance.description.replace(/\s+/g, '-')}.png`;
    link.href = qrCodeUrl;
    link.click();
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