import React from 'react';
import { Image, Video, File } from 'lucide-react';

const getFileIcon = (type) => {
  switch (type) {
    case 'image': return <Image className="w-5 h-5" />;
    case 'video': return <Video className="w-5 h-5" />;
    default: return <File className="w-5 h-5" />;
  }
};

export default function DocumentOverview({ totalDocs, weeklyDocs, recentDocs, onDocClick }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
      <h3 className="text-lg font-semibold mb-4">Overview</h3>
      
      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <p className="text-2xl font-bold text-gray-900">{totalDocs}</p>
          <p className="text-sm text-gray-500">Total Dokumen</p>
        </div>
        <div className="text-center p-4 bg-gray-50 rounded-lg">
          <p className="text-2xl font-bold text-indigo-600">{weeklyDocs}</p>
          <p className="text-sm text-gray-500">Dokumen Minggu Ini</p>
        </div>
      </div>

      {/* Recent Documents */}
      <h4 className="text-md font-medium mb-2">Dokumen Terbaru</h4>
      <div className="grid grid-cols-3 gap-4">
        {recentDocs.map(doc => (
          <div 
            key={doc.id} 
            className="bg-gray-50 rounded-lg p-2 cursor-pointer hover:bg-gray-100 transition-colors" 
            onClick={() => onDocClick(doc)}
          >
            <div className="relative h-20 bg-gray-200 rounded flex items-center justify-center mb-2">
              {getFileIcon(doc.file_type)}
              <img 
                src={doc.file_url} 
                alt={doc.title} 
                className="w-full h-full object-cover rounded" 
              />
            </div>
            <p className="text-xs font-medium truncate">{doc.title}</p>
            <p className="text-xs text-gray-500">oleh {doc.uploader_name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}