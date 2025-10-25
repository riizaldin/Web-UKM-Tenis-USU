import React from 'react';
import Modal from '@/Components/Admin/Absensi/Modal';
import Button from '@/Components/Admin/Absensi/Button';
import FormInput from '@/Components/Admin/Absensi/FormInput';
import { Plus, X } from 'lucide-react';

export default function DocumentUploadModal({ 
  isOpen, 
  onClose, 
  formData, 
  onInputChange,
  files,
  previews,
  onFilesChange,
  onRemoveFile,
  onSubmit 
}) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Upload Dokumen Kegiatan"
      icon={<Plus className="w-5 h-5" />}
      maxWidth="max-w-lg"
    >
      <form onSubmit={onSubmit} className="space-y-4">
        <FormInput
          label="Caption / Judul"
          name="caption"
          value={formData.caption}
          onChange={onInputChange}
          placeholder="Misal: Foto Latihan Sepak Bola"
          required
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
          <select
            name="category"
            value={formData.category}
            onChange={onInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="Rapat">Rapat</option>
            <option value="Event">Event</option>
            <option value="Absensi">Absensi</option>
            <option value="Lainnya">Lainnya</option>
          </select>
        </div>

        <FormInput
          label="Tags (pisah koma)"
          name="tags"
          value={formData.tags}
          onChange={onInputChange}
          placeholder="Misal: #Latihan, #Sepakbola"
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Upload File (Multiple, max 10MB)
          </label>
          <input
            type="file"
            multiple
            accept="image/*,video/*,.pdf"
            onChange={onFilesChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          
          {previews.length > 0 && (
            <div className="grid grid-cols-3 gap-2 mt-2">
              {previews.map((preview, index) => (
                <div key={index} className="relative">
                  <img src={preview} alt="Preview" className="w-full h-20 object-cover rounded" />
                  <button
                    type="button"
                    onClick={() => onRemoveFile(index)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          )}
          
          <p className="text-sm text-gray-500 mt-1">File terpilih: {files.length}</p>
        </div>

        <Button type="submit" variant="info" className="w-full">
          Upload Dokumen
        </Button>
      </form>
    </Modal>
  );
}