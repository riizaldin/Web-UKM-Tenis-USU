import React from 'react';
import Badge from '@/Components/Admin/Absensi/Badge';
import { Calendar, DollarSign, Eye } from 'lucide-react';

export default function ReportCard({ report, onClick }) {
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
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <div 
      onClick={() => onClick(report)}
      className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer overflow-hidden border border-gray-100"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-4">
        <h4 className="font-semibold text-white text-lg mb-1">{report.title}</h4>
        <div className="flex items-center gap-2 text-blue-100 text-xs">
          <Calendar className="w-3 h-3" />
          <span>{formatDate(report.period_start)} - {formatDate(report.period_end)}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {report.description && (
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">
            {report.description}
          </p>
        )}

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="bg-green-50 rounded-lg p-2">
            <p className="text-xs text-gray-500 mb-1">Pemasukan</p>
            <p className="text-sm font-bold text-green-600">
              {formatCurrency(report.total_income)}
            </p>
          </div>
          <div className="bg-red-50 rounded-lg p-2">
            <p className="text-xs text-gray-500 mb-1">Pengeluaran</p>
            <p className="text-sm font-bold text-red-600">
              {formatCurrency(report.total_expense)}
            </p>
          </div>
          <div className="bg-blue-50 rounded-lg p-2">
            <p className="text-xs text-gray-500 mb-1">Saldo</p>
            <p className="text-sm font-bold text-blue-600">
              {formatCurrency(report.total_balance)}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center">
          <div className="text-xs text-gray-500">
            oleh {report.created_by}
          </div>
          <Badge variant={report.status === 'published' ? 'success' : 'warning'}>
            {report.status === 'published' ? 'Published' : 'Draft'}
          </Badge>
        </div>
      </div>

      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-blue-600 bg-opacity-0 hover:bg-opacity-10 transition-all flex items-center justify-center opacity-0 hover:opacity-100">
        <div className="bg-white rounded-full p-3 shadow-lg">
          <Eye className="w-5 h-5 text-blue-600" />
        </div>
      </div>
    </div>
  );
}