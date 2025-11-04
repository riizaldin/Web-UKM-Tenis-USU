import React, { useState } from "react";
import { Link } from "@inertiajs/react";
import Sidebar from "@/Components/Sidebar";
import Button from "@/Components/Admin/Absensi/Button";
import EmptyState from "@/Components/Admin/Absensi/EmptyState";
import AttendanceTable from "@/Components/Admin/Absensi/AttendanceTable";
import AttendanceFormModal from "@/Components/Admin/Absensi/AttendanceFormModal";
import QRCodeModal from "@/Components/Admin/Absensi/QRCodeModal";
import { router, usePage } from '@inertiajs/react';
import useAttendance from "@/hooks/Admin/useAttendance";
import useQRCode from "@/hooks/Admin/useQRCode";
import { Calendar, Plus, ArrowLeft } from "lucide-react";
import { ToastContainer, toast } from 'react-toastify';

const formatDate = (date) => {
  return new Intl.DateTimeFormat('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
};

export default function Absensi({ auth, attendances }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [qrModalOpen, setQrModalOpen] = useState(false);
  
  const [errors, setErrors] = useState({});

  const { 
    data, 
    handleInputChange, 
    resetForm, 
    validateForm, 
    getAttendanceStatus ,
  } = useAttendance();
  
  const { 
    qrCodeUrl, 
    selectedAttendance, 
    generateQR, 
    downloadQR, 
    resetQR 
  } = useQRCode();

  const today = new Date();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    router.post(route('admin.attendance.store'), data, {
      onSuccess: (page) => {
        toast.success(page.props?.flash?.message ?? 'Absensi berhasil dibuat!');
        setIsModalOpen(false);
        resetForm();
        setErrors({});
      },
      onError: (errors) => {
        setErrors(errors);
        toast.error('Error membuat absensi! Silakan periksa input.');
      },
    });
  };

  const handleGenerateQR = async (attendance) => {
    const qrUrl = await generateQR(attendance);
    if (qrUrl) setQrModalOpen(true);
  };

  const handleCloseQRModal = () => {
    setQrModalOpen(false);
    resetQR();
  };

  return (
    <div className="flex min-h-screen bg-gray-50">

      <Sidebar />

      <div className="flex-1 p-6">
        <ToastContainer position="top-center" autoClose={1000} />
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="p-2 text-blue-600 hover:bg-blue-50 rounded-md">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h2 className="text-sm text-gray-500">{formatDate(today)}</h2>
              <h1 className="text-3xl font-semibold mt-1">Absensi</h1>
            </div>
          </div>
        </div>

        {/* Section: Log Absensi */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Calendar className="w-5 h-5 text-pink-500" />
              Log Absensi
            </h3>
            <Button
              variant="primary"
              icon={<Plus className="w-4 h-4" />}
              onClick={() => setIsModalOpen(true)}
            >
              Buat Absen
            </Button>
          </div>

          {attendances?.length > 0 ? (
            <AttendanceTable
              attendances={attendances}
              onGenerateQR={handleGenerateQR}
              getAttendanceStatus={getAttendanceStatus}
            />
          ) : (
            <EmptyState
              icon={<Calendar className="w-full h-full" />}
              title="Belum ada log absensi"
              description="Buat absensi pertama Anda!"
            />
          )}
        </div>

        {/* Modals */}
        <AttendanceFormModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          formData={data}
          onInputChange={handleInputChange}
          onSubmit={handleSubmit}
          errors={errors}
        />

        <QRCodeModal
          isOpen={qrModalOpen}
          onClose={handleCloseQRModal}
          attendance={selectedAttendance}
          qrCodeUrl={qrCodeUrl}
          onDownload={downloadQR}
        />
      </div>
    </div>
  );
}