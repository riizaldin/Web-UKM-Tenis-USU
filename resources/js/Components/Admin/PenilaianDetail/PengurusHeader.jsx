import React from 'react';
import { Link } from '@inertiajs/react';
import StarRating from '@/Components/Admin/Penilaian/StarRating';
import { ArrowLeft } from 'lucide-react';

export default function PengurusHeader({ pengurus }) {
  return (
    <div className="mb-6">
      <Link
        href="/admin/penilaian"
        className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 mb-4"
      >
        <ArrowLeft size={20} />
        <span>Kembali ke Daftar Penilaian</span>
      </Link>
      <div className="flex items-center gap-4">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white font-semibold text-3xl">
          {pengurus.nama?.charAt(0) || '?'}
        </div>
        <div>
          <h1 className="text-3xl font-semibold">{pengurus.nama}</h1>
          <p className="text-gray-500 text-lg">{pengurus.jabatan}</p>
          <div className="flex items-center gap-2 mt-2">
            <StarRating rating={pengurus.rating} size={20} />
            <span className="text-lg font-semibold">{pengurus.rating?.toFixed(1) || '0.0'}</span>
            <span className="text-sm text-gray-500">
              dari {pengurus.total_rating || 0} penilaian
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}