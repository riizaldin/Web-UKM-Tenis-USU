import React from 'react';
import Badge from '@/Components/Admin/Absensi/Badge';
import EmptyState from '@/Components/Admin/Absensi/EmptyState';
import { Edit2, Trash2 } from 'lucide-react';

export default function QuestionList({ questions = [], onEdit, onDelete }) {
  if (questions.length === 0) {
    return (
      <EmptyState
        icon={<Edit2 className="w-full h-full" />}
        title="Belum ada pertanyaan"
        description="Tambahkan pertanyaan pertama untuk mulai mengumpulkan penilaian"
      />
    );
  }

  return (
    <div className="space-y-4">
      {questions.map((question, index) => (
        <div
          key={question.id}
          className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-sm font-semibold text-gray-500">
                  #{index + 1}
                </span>
                <Badge 
                  variant={question.question_type === 'rating' ? 'warning' : 'info'}
                >
                  {question.question_type === 'rating' ? 'Rating 1-5' : 'Essay'}
                </Badge>
              </div>
              <p className="text-gray-900 font-medium mb-2">
                {question.question_text}
              </p>
              <p className="text-sm text-gray-500">
                {question.responses || 0} responden
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => onEdit(question)}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              >
                <Edit2 size={18} />
              </button>
              <button
                onClick={() => onDelete(question.id)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}