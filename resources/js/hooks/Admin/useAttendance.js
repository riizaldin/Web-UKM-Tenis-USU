import { useState } from 'react';
import { toast } from 'react-toastify';
import { useForm } from '@inertiajs/react';


export default function useAttendance() {
  const { data, setData, post, processing, errors } = useForm({
    date: new Date().toISOString().split('T')[0],
    start_time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', hour12: false }),
    end_time: '',
    name: '',
    type: 'latihan',
    location: '',
    description: '',
    pelatih: '',
    hadiah: '',
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const resetForm = () => {
    setData({
      date: new Date().toISOString().split('T')[0],
      start_time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', hour12: false }),
      end_time: '',
      name: '',
      type: 'latihan',
      location: '',
      description: '',
      pelatih: '',
      hadiah: '',
    });
  };

  const validateForm = () => {
    if (data.end_time && data.start_time >= data.end_time) {
      toast.error('Waktu selesai harus lebih besar dari waktu mulai!');
      return false;
    }
    return true;
  };

  const getAttendanceStatus = (attendance) => {
    const now = new Date();

    const eventDate = new Date(attendance.tanggal || attendance.date);
    const start = new Date(`${attendance.tanggal || attendance.date}T${attendance.waktu_mulai || attendance.start_time}`);
    const end = attendance.waktu_selesai || attendance.end_time
      ? new Date(`${attendance.tanggal || attendance.date}T${attendance.waktu_selesai || attendance.end_time}`)
      : null;

    if (now < start && now.toDateString() !== eventDate.toDateString()) {
      return "upcoming";
    }

    if (end) {
      if (now < start) return "upcoming";
      if (now >= start && now <= end) return "active";
      if (now > end) return "selesai";
    } else {
      if (now < start) return "upcoming";
      if (now >= start && now.toDateString() === eventDate.toDateString()) return "active";
      if (now > start) return "selesai";
    }

    return "upcoming";
  };


  return {
    data,
    handleInputChange,
    resetForm,
    validateForm,
    getAttendanceStatus,
    errors
  };
}