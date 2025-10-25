import React from 'react';
import EmptyState from '@/Components/Admin/Absensi/EmptyState';
import EssayResponseGroup from './EssayResponseGroup';
import { MessageSquare } from 'lucide-react';

export default function EssayResponsesSection({ 
  groupedResponses, 
  expandedQuestions,
  onToggleQuestion,
  sortEssay,
  onSortChange
}) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <MessageSquare className="w-5 h-5" />
          Jawaban Essay (Anonim)
        </h3>
        <select
          value={sortEssay}
          onChange={(e) => onSortChange(e.target.value)}
          className="border rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="latest">Terbaru</option>
          <option value="oldest">Terlama</option>
        </select>
      </div>

      {Object.keys(groupedResponses).length === 0 ? (
        <EmptyState
          icon={<MessageSquare className="w-full h-full" />}
          title="Belum ada jawaban essay"
          description="Jawaban essay akan muncul di sini setelah anggota mengisi penilaian"
        />
      ) : (
        <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
          {Object.entries(groupedResponses).map(([question, responses]) => (
            <EssayResponseGroup
              key={question}
              question={question}
              responses={responses}
              isExpanded={expandedQuestions.includes(question)}
              onToggle={() => onToggleQuestion(question)}
            />
          ))}
        </div>
      )}
    </div>
  );
}