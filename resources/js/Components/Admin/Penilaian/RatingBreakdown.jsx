import React from 'react';
import { Star } from 'lucide-react';

export default function RatingBreakdown({ breakdown = {}, total = 0 }) {
  return (
    <div className="space-y-2">
      {[5, 4, 3, 2, 1].map((star) => {
        const count = breakdown[star] || 0;
        const percentage = total > 0 ? (count / total) * 100 : 0;
        return (
          <div key={star} className="flex items-center gap-2">
            <div className="flex items-center gap-1 w-16">
              <span className="text-sm font-medium">{star}</span>
              <Star size={14} className="fill-yellow-400 text-yellow-400" />
            </div>
            <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-yellow-400 transition-all duration-300"
                style={{ width: `${percentage}%` }}
              />
            </div>
            <span className="text-sm text-gray-600 w-12 text-right">
              {count}
            </span>
          </div>
        );
      })}
    </div>
  );
}