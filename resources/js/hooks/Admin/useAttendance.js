import { useState } from 'react';

export default function useAttendance() {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    start_time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', hour12: false }),
    end_time: '',
    location: '',
    description: '',
    qr_only: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const resetForm = () => {
    setFormData({
      date: new Date().toISOString().split('T')[0],
      start_time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', hour12: false }),
      end_time: '',
      location: '',
      description: '',
      qr_only: false,
    });
  };

  const validateForm = () => {
    if (formData.end_time && formData.start_time >= formData.end_time) {
      alert('Waktu selesai harus lebih besar dari waktu mulai!');
      return false;
    }
    return true;
  };

  const isAttendanceActive = (attendance) => {
    const now = new Date();
    const attendanceDate = new Date(attendance.date);
    const startDateTime = new Date(`${attendance.date}T${attendance.start_time}`);
    const endDateTime = attendance.end_time ? new Date(`${attendance.date}T${attendance.end_time}`) : null;

    if (now.toDateString() !== attendanceDate.toDateString()) {
      return false;
    }

    if (endDateTime) {
      return now >= startDateTime && now <= endDateTime;
    }

    return now >= startDateTime;
  };

  return {
    formData,
    handleInputChange,
    resetForm,
    validateForm,
    isAttendanceActive,
  };
}