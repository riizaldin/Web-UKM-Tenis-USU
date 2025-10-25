import React from 'react';
import { Star, BarChart3, Eye, Edit2 } from 'lucide-react';

export default function PenilaianStats({ pengurus = [], questions = [] }) {
  const avgRating = pengurus.length > 0
    ? (pengurus.reduce((acc, p) => acc + (p.rating || 0), 0) / pengurus.length).toFixed(1)
    : '0.0';

  const totalResponden = pengurus.length > 0 ? pengurus[0]?.totalRating || 0 : 0;

  return (
    <div className="grid grid-cols-4 gap-6 mb-6">
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">Total Pengurus</p>
            <p className="text-2xl font-bold mt-1">{pengurus.length}</p>
          </div>
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
            <Star className="text-purple-600" size={24} />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">Rata-rata Rating</p>
            <p className="text-2xl font-bold mt-1">{avgRating}</p>
          </div>
          <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
            <BarChart3 className="text-yellow-600" size={24} />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">Total Responden</p>
            <p className="text-2xl font-bold mt-1">{totalResponden}</p>
          </div>
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <Eye className="text-blue-600" size={24} />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">Total Pertanyaan</p>
            <p className="text-2xl font-bold mt-1">{questions.length}</p>
          </div>
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
            <Edit2 className="text-green-600" size={24} />
          </div>
        </div>
      </div>
    </div>
  );
}