import React from 'react';
import { Users, CheckCircle, AlertCircle } from 'lucide-react';

export default function MemberStats({ total, registered, unregistered }) {
  return (
    <div className="grid grid-cols-3 gap-6 mb-6">
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <div className="flex items-center gap-4">
          <div className="bg-purple-100 p-3 rounded-lg">
            <Users className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-500 mb-1">Total Anggota</h4>
            <p className="text-2xl font-bold text-gray-900">{total}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-6">
        <div className="flex items-center gap-4">
          <div className="bg-green-100 p-3 rounded-lg">
            <CheckCircle className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-500 mb-1">Sudah Re-reg</h4>
            <p className="text-2xl font-bold text-green-600">{registered}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-6">
        <div className="flex items-center gap-4">
          <div className="bg-yellow-100 p-3 rounded-lg">
            <AlertCircle className="w-6 h-6 text-yellow-600" />
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-500 mb-1">Belum Re-reg</h4>
            <p className="text-2xl font-bold text-yellow-600">{unregistered}</p>
          </div>
        </div>
      </div>
    </div>
  );
}