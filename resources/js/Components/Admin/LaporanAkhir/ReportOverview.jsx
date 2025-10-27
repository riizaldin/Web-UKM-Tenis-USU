import React from 'react';
import { FileText, TrendingUp, Calendar } from 'lucide-react';

export default function ReportOverview({ totalReports, thisYearReports, lastReport }) {
  return (
    <div className="grid grid-cols-3 gap-6 mb-6">
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <div className="flex items-center gap-4">
          <div className="bg-blue-100 p-3 rounded-lg">
            <FileText className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-500 mb-1">Total Laporan</h4>
            <p className="text-2xl font-bold text-gray-900">{totalReports}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-6">
        <div className="flex items-center gap-4">
          <div className="bg-green-100 p-3 rounded-lg">
            <TrendingUp className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-500 mb-1">Laporan Tahun Ini</h4>
            <p className="text-2xl font-bold text-gray-900">{thisYearReports}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-6">
        <div className="flex items-center gap-4">
          <div className="bg-purple-100 p-3 rounded-lg">
            <Calendar className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-500 mb-1">Laporan Terakhir</h4>
            <p className="text-sm font-semibold text-gray-900 truncate">
              {lastReport?.title || 'Belum ada'}
            </p>
            {lastReport && (
              <p className="text-xs text-gray-500">
                {new Date(lastReport.period_end).toLocaleDateString('id-ID')}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}