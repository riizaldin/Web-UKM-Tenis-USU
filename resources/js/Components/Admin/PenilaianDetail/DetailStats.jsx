import React from 'react';
import { Star, BarChart3, MessageSquare, TrendingUp } from 'lucide-react';

export default function DetailStats({ pengurus, essayCount }) {
  return (
    <div className="grid grid-cols-4 gap-6 mb-6">
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">Rating Rata-rata</p>
            <p className="text-3xl font-bold mt-1">{pengurus.rating?.toFixed(1) || '0.0'}</p>
          </div>
          <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
            <Star className="text-yellow-600" size={24} />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">Total Rating</p>
            <p className="text-3xl font-bold mt-1">{pengurus.total_rating || 0}</p>
          </div>
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <BarChart3 className="text-blue-600" size={24} />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">Jawaban Essay</p>
            <p className="text-3xl font-bold mt-1">{essayCount}</p>
          </div>
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
            <MessageSquare className="text-green-600" size={24} />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">Rating Tertinggi</p>
            <p className="text-3xl font-bold mt-1">
              {pengurus.rating_breakdown?.[5] || 0}
            </p>
          </div>
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
            <TrendingUp className="text-purple-600" size={24} />
          </div>
        </div>
      </div>
    </div>
  );
}