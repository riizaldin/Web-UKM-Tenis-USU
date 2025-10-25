import React from 'react';
import { Link } from '@inertiajs/react';
import StarRating from './StarRating';
import RatingBreakdown from './RatingBreakdown';

export default function PengurusCard({ pengurus }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white font-semibold text-xl">
            {pengurus.nama?.charAt(0) || '?'}
          </div>
          <div>
            <h4 className="font-semibold text-lg">{pengurus.nama}</h4>
            <p className="text-sm text-gray-500">{pengurus.jabatan}</p>
            <div className="flex items-center gap-2 mt-1">
              <StarRating rating={pengurus.rating} />
              <span className="text-sm font-medium">
                {pengurus.rating?.toFixed(1) || '0.0'}
              </span>
              <span className="text-xs text-gray-500">
                ({pengurus.totalRating || 0} penilaian)
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t pt-4">
        <h5 className="text-sm font-semibold mb-3">Rating Breakdown</h5>
        <RatingBreakdown
          breakdown={pengurus.ratingBreakdown || {}}
          total={pengurus.totalRating || 0}
        />
      </div>

      <div className="mt-4 flex items-center justify-between text-sm">
        <span className="text-gray-600">
          {pengurus.essayResponses || 0} Jawaban Essay
        </span>
        <Link
          href={`/admin/penilaian/${pengurus.id}`}
          className="text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
        >
          Lihat Detail →
        </Link>
      </div>
    </div>
  );
}