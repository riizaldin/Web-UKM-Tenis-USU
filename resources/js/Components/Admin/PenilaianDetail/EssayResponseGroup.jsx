import React from 'react';
import EssayResponseCard from './EssayResponseCard';
import { ChevronDown, ChevronRight } from 'lucide-react';

export default function EssayResponseGroup({ 
  question, 
  responses, 
  isExpanded, 
  onToggle 
}) {
  return (
    <div className="border rounded-lg overflow-hidden">
      {/* Question Header - Clickable */}
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 bg-indigo-50 hover:bg-indigo-100 transition-colors text-left"
      >
        <div className="flex items-center gap-2 flex-1">
          {isExpanded ? (
            <ChevronDown size={20} className="text-indigo-600 flex-shrink-0" />
          ) : (
            <ChevronRight size={20} className="text-indigo-600 flex-shrink-0" />
          )}
          <p className="text-sm font-semibold text-indigo-900">
            {question}
          </p>
        </div>
        <span className="text-xs text-indigo-600 font-medium ml-2">
          {responses.length} jawaban
        </span>
      </button>

      {/* Responses List - Expandable */}
      {isExpanded && (
        <div className="bg-white">
          {responses.map((response) => (
            <EssayResponseCard key={response.id} response={response} />
          ))}
        </div>
      )}
    </div>
  );
}