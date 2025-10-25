import React from 'react';
import StarRating from '@/Components/Admin/Penilaian/StarRating';

export default function SummaryCard({ pengurus }) {
  return (
    <div className="mt-6 bg-gradient-to-r from-indigo-500 to-purple-600 p-6 rounded-xl shadow-lg text-white">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold mb-2">Ringkasan Penilaian</h3>
          <p className="text-indigo-100">
            Berdasarkan {pengurus.total_rating || 0} penilaian dari anggota, {pengurus.nama} 
            mendapatkan rating rata-rata {pengurus.rating?.toFixed(1) || '0.0'} dari 5.0
          </p>
        </div>
        <div className="text-right">
          <div className="text-4xl font-bold">{pengurus.rating?.toFixed(1) || '0.0'}</div>
          <div className="flex justify-end mt-1">
            <StarRating rating={pengurus.rating} size={20} />
          </div>
        </div>
      </div>
    </div>
  );
}