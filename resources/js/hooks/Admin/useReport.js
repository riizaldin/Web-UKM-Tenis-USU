import { useState } from 'react';

export default function useReport() {
  const [formData, setFormData] = useState({
    title: '',
    period_start: '',
    period_end: '',
    description: '',
    total_income: '',
    total_expense: '',
    total_balance: '',
    achievements: '',
    challenges: '',
    recommendations: '',
  });
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const updated = { ...prev, [name]: value };
      
      // Auto calculate balance
      if (name === 'total_income' || name === 'total_expense') {
        const income = parseFloat(name === 'total_income' ? value : updated.total_income) || 0;
        const expense = parseFloat(name === 'total_expense' ? value : updated.total_expense) || 0;
        updated.total_balance = (income - expense).toString();
      }
      
      return updated;
    });
  };

  const handleFilesChange = (e) => {
    const newFiles = Array.from(e.target.files);
    setFiles(prev => [...prev, ...newFiles]);
    
    newFiles.forEach(file => {
      if (file.type.startsWith('image/')) {
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
    setFormData({
      title: '',
      period_start: '',
      period_end: '',
      description: '',
      total_income: '',
      total_expense: '',
      total_balance: '',
      achievements: '',
      challenges: '',
      recommendations: '',
    });
    setFiles([]);
    setPreviews([]);
  };

  const validateForm = () => {
    if (!formData.title.trim()) {
      alert('Judul laporan tidak boleh kosong!');
      return false;
    }
    if (!formData.period_start || !formData.period_end) {
      alert('Periode laporan harus diisi!');
      return false;
    }
    if (new Date(formData.period_start) > new Date(formData.period_end)) {
      alert('Tanggal mulai tidak boleh lebih besar dari tanggal selesai!');
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