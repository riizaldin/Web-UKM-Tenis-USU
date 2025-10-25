import React from 'react';
import { Link } from '@inertiajs/react';
import Modal from '@/Components/Admin/Absensi/Modal';
import Button from '@/Components/Admin/Absensi/Button';
import Badge from '@/Components/Admin/Absensi/Badge';
import { Eye, Download } from 'lucide-react';

const formatDate = (date) => {
  return new Intl.DateTimeFormat('id-ID', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date));
};

export default function DocumentDetailModal({ isOpen, onClose, document }) {
  if (!document) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Detail Dokumen: ${document.title}`}
      icon={<Eye className="w-5 h-5" />}
      maxWidth="max-w-2xl"
    >
      <div className="space-y-4">
        {/* File Preview */}
        <div className="mb-4">
          {document.file_type === 'image' && (
            <img 
              src={document.file_url} 
              alt={document.title} 
              className="w-full max-h-96 object-contain rounded-lg" 
            />
          )}
          {document.file_type === 'video' && (
            <video 
              src={document.file_url} 
              controls 
              className="w-full max-h-96 rounded-lg"
            >
              Browser tidak support video.
            </video>
          )}
          {document.file_type === 'pdf' && (
            <iframe 
              src={document.file_url} 
              className="w-full h-96 rounded-lg" 
              title={document.title}
            >
              <p>
                Browser tidak support PDF.{' '}
                <Link href={document.file_url} target="_blank">Download</Link>
              </p>
            </iframe>
          )}
        </div>

        {/* Document Info */}
        <div className="space-y-2">
          <p className="text-sm text-gray-700">{document.caption}</p>
          <p className="text-xs text-gray-500">Kategori: {document.category}</p>
          <p className="text-xs text-gray-500">
            Uploaded by: {document.uploader_name} on {formatDate(document.uploaded_at)}
          </p>
          
          {/* Tags */}
          <div className="flex flex-wrap gap-1">
            {document.tags.map(tag => (
              <Badge key={tag} variant="indigo" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Link
            href={document.file_url}
            target="_blank"
            className="flex-1"
          >
            <Button 
              variant="info" 
              icon={<Download className="w-4 h-4" />}
              className="w-full"
            >
              Download
            </Button>
          </Link>
          <Link
            href={`/members/${document.uploader_id}`}
            className="flex-1"
          >
            <Button variant="outline" className="w-full">
              Lihat Uploader
            </Button>
          </Link>
        </div>
      </div>
    </Modal>
  );
}