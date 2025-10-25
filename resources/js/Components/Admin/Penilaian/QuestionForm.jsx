import React from 'react';
import Button from '@/Components/Admin/Absensi/Button';
import FormInput from '@/Components/Admin/Absensi/FormInput';
import FormTextarea from '@/Components/Admin/Absensi/FormTextarea';
import { X, Save } from 'lucide-react';

export default function QuestionForm({ 
  formData, 
  onInputChange, 
  onSubmit, 
  onCancel, 
  processing,
  isEdit = false 
}) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border-2 border-indigo-200">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">
          {isEdit ? 'Edit Pertanyaan' : 'Tambah Pertanyaan Baru'}
        </h3>
        <button
          onClick={onCancel}
          className="text-gray-400 hover:text-gray-600"
        >
          <X size={20} />
        </button>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            Tipe Pertanyaan
          </label>
          <select
            value={formData.question_type}
            onChange={(e) => onInputChange('question_type', e.target.value)}
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="rating">Rating (1-5)</option>
            <option value="essay">Essay</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">
            Pertanyaan
          </label>
          <textarea
            value={formData.question_text}
            onChange={(e) => onInputChange('question_text', e.target.value)}
            placeholder="Masukkan pertanyaan..."
            className="w-full border rounded-lg px-4 py-2 h-24 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        
        <div className="flex justify-end gap-3">
          <Button
            variant="outline"
            onClick={onCancel}
          >
            Batal
          </Button>
          <Button
            variant="primary"
            icon={<Save size={16} />}
            onClick={onSubmit}
            disabled={processing}
          >
            {isEdit ? 'Update' : 'Simpan'}
          </Button>
        </div>
      </div>
    </div>
  );
}