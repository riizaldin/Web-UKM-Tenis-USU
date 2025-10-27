import React from 'react';
import Badge from '@/Components/Admin/Absensi/Badge';
import { Image, Video, File } from 'lucide-react';

const formatDate = (date) => {
  return new Intl.DateTimeFormat('id-ID', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date));
};

const getFileIcon = (type) => {
  switch (type) {
    case 'image': return <Image className="w-5 h-5" />;
    case 'video': return <Video className="w-5 h-5" />;
    default: return <File className="w-5 h-5" />;
  }
};

export default function DocumentGallery({ documents, onDocumentClick }) {
  return (
    <div className="grid grid-cols-3 gap-4">
      {documents.map((doc) => (
        <div 
          key={doc.id} 
          className="relative group cursor-pointer rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow" 
          onClick={() => onDocumentClick(doc)}
        >
          <div className="relative h-48 bg-gray-100 flex items-center justify-center">
            {getFileIcon(doc.file_type)}
            <img 
              src={doc.file_url} 
              alt={doc.title} 
              className="w-full h-full object-cover" 
            />
          </div>
          <div className="p-3">
            <h4 className="font-medium text-sm truncate mb-1">{doc.title}</h4>
            <p className="text-xs text-gray-500 mb-1 line-clamp-2">{doc.caption}</p>
            <p className="text-xs text-gray-400">
              oleh {doc.uploader_name} • {formatDate(doc.uploaded_at)}
            </p>
            <div className="flex flex-wrap gap-1 mt-1">
              {doc.tags.map(tag => (
                <Badge key={tag} variant="indigo" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}