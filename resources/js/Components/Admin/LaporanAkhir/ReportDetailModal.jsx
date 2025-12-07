import React from 'react';
import { Link } from '@inertiajs/react';
import Modal from '@/Components/Admin/Absensi/Modal';
import Button from '@/Components/Admin/Absensi/Button';
import Badge from '@/Components/Admin/Absensi/Badge';
import { Eye, Download, Calendar, DollarSign, Target, AlertTriangle, Lightbulb, Image } from 'lucide-react';

export default function ReportDetailModal({ isOpen, onClose, report }) {
  if (!report) return null;

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(value);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={report.title}
      icon={<Eye className="w-5 h-5 text-blue-600" />}
      maxWidth="max-w-4xl"
    >
      <div className="space-y-6">
        {/* Periode */}
        <div className="flex items-center gap-2 text-gray-600">
          <Calendar className="w-4 h-4" />
          <span className="text-sm">
            Periode: {formatDate(report.period_start)} - {formatDate(report.period_end)}
          </span>
        </div>

        {/* Deskripsi */}
        {report.description && (
          <div>
            <p className="text-gray-700">{report.description}</p>
          </div>
        )}

        {/* Ringkasan Keuangan */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-blue-600" />
            Ringkasan Keuangan
          </h4>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-xs text-gray-500 mb-1">Total Pemasukan </p>
              <p className="text-lg font-bold text-green-600">
                {formatCurrency(report.total_income)}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Total Pengeluaran</p>
              <p className="text-lg font-bold text-red-600">
                {formatCurrency(report.total_expense)}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Saldo Akhir</p>
              <p className="text-lg font-bold text-blue-600">
                {formatCurrency(report.total_balance)}
              </p>
            </div>
          </div>
        </div>

        {/* Pencapaian */}
        {report.achievements && (
          <div className="bg-green-50 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <Target className="w-5 h-5 text-green-600" />
              Pencapaian
            </h4>
            <p className="text-sm text-gray-700 whitespace-pre-line">
              {report.achievements}
            </p>
          </div>
        )}

        {/* Tantangan */}
        {report.challenges && (
          <div className="bg-yellow-50 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-yellow-600" />
              Tantangan & Kendala
            </h4>
            <p className="text-sm text-gray-700 whitespace-pre-line">
              {report.challenges}
            </p>
          </div>
        )}

        {/* Rekomendasi */}
        {report.recommendations && (
          <div className="bg-purple-50 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-purple-600" />
              Rekomendasi & Saran
            </h4>
            <p className="text-sm text-gray-700 whitespace-pre-line">
              {report.recommendations}
            </p>
          </div>
        )}

        {/* Lampiran */}
        {report.attachments && report.attachments.length > 0 && (
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Image className="w-5 h-5 text-gray-600" />
              Lampiran ({report.attachments.length})
            </h4>
            <div className="grid grid-cols-4 gap-2">
              {report.attachments.map((attachment, index) => (
                <Link 
                  key={index} 
                  href={attachment.url} 
                  target="_blank"
                  className="hover:opacity-80 transition-opacity"
                >
                  <img 
                    src={attachment.url} 
                    alt={`Lampiran ${index + 1}`}
                    className="w-full h-24 object-cover rounded border"
                  />
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Meta Info */}
        <div className="flex justify-between items-center pt-4 border-t">
          <div className="text-xs text-gray-500">
            Dibuat oleh: {report.created_by} • 
            {formatDate(report.created_at)}
          </div>
          <Badge variant={report.status === 'published' ? 'success' : 'warning'}>
            {report.status === 'published' ? 'Published' : 'Draft'}
          </Badge>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Button
            variant="info"
            icon={<Download className="w-4 h-4" />}
            onClick={() => window.print()}
            className="flex-1"
          >
            Download PDF
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