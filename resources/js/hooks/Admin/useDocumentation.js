import { useState } from 'react';

export default function useDocumentation() {
  const [formData, setFormData] = useState({
    caption: '',
    category: 'Event',
    tags: '',
  });
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFilesChange = (e) => {
    const newFiles = Array.from(e.target.files);
    setFiles(prev => [...prev, ...newFiles]);
    
    newFiles.forEach(file => {
      if (file.type.startsWith('image/') || file.type.startsWith('video/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviews(prev => [...prev, reader.result]);
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const removeFile = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
    setPreviews(prev => prev.filter((_, i) => i !== index));
  };

  const resetForm = () => {
    setFormData({ caption: '', category: 'Event', tags: '' });
    setFiles([]);
    setPreviews([]);
  };

  const validateForm = () => {
    if (!formData.caption.trim()) {
      alert('Caption tidak boleh kosong!');
      return false;
    }
    if (files.length === 0) {
      alert('Pilih minimal 1 file untuk diupload!');
      return false;
    }
    return true;
  };

  return {
    formData,
    files,
    previews,
    handleInputChange,
    handleFilesChange,
    removeFile,
    resetForm,
    validateForm,
  };
}