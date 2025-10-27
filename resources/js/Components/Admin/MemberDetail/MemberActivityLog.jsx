import React from 'react';
import Badge from '@/Components/Admin/Absensi/Badge';
import EmptyState from '@/Components/Admin/Absensi/EmptyState';
import { Calendar } from 'lucide-react';

export default function MemberActivityLog({ logs = [] }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
      <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
        <Calendar className="w-5 h-5 text-blue-600" />
        Log Aktivitas
      </h3>
      
      {logs.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tanggal
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Aksi
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Deskripsi
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {logs.map((log, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {log.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Badge variant="info">{log.action}</Badge>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {log.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <EmptyState
          icon={<Calendar className="w-full h-full" />}
          title="Belum ada log aktivitas"
          description="Log aktivitas akan muncul di sini"
        />
      )}
    </div>
  );
}