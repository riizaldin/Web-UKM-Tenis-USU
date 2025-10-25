import React from 'react';
import StarRating from '@/Components/Admin/Penilaian/StarRating';

export default function RatingPerQuestion({ ratingPerQuestion = [] }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Rating per Pertanyaan</h3>
      <div className="space-y-4">
        {ratingPerQuestion.map((item, index) => (
          <div key={index} className="border-b last:border-0 pb-4 last:pb-0">
            <p className="text-sm font-medium text-gray-900 mb-2">
              {item.question}
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <StarRating rating={item.average_rating} size={16} />
                <span className="text-sm font-semibold">
                  {item.average_rating?.toFixed(1) || '0.0'}
                </span>
              </div>
              <span className="text-xs text-gray-500">
                {item.total_responses} responden
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}