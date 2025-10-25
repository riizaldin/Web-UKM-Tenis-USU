import React from 'react';

const tabs = [
  { id: 'overview', label: 'Overview Rating' },
  { id: 'questions', label: 'Kelola Pertanyaan' },
];

export default function PenilaianTabs({ activeTab, onChange }) {
  return (
    <div className="flex gap-4 mb-6 border-b">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`pb-3 px-2 font-medium transition-colors relative ${
            activeTab === tab.id
              ? 'text-indigo-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          {tab.label}
          {activeTab === tab.id && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600" />
          )}
        </button>
      ))}
    </div>
  );
}