import { useState } from 'react';

export default function useTransaction(type = 'expense') {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    description: '',
    amount: '',
    category: type === 'expense' ? 'Biaya Kegiatan' : 'Iuran Anggota',
    status: type === 'expense' ? 'pending' : 'approved',
    payment_method: type === 'income' ? 'cash' : undefined,
  });
  const [proofFile, setProofFile] = useState(null);
  const [proofPreview, setProofPreview] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProofFile(file);
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => setProofPreview(reader.result);
        reader.readAsDataURL(file);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      date: new Date().toISOString().split('T')[0],
      description: '',
      amount: '',
      category: type === 'expense' ? 'Biaya Kegiatan' : 'Iuran Anggota',
      status: type === 'expense' ? 'pending' : 'approved',
      payment_method: type === 'income' ? 'cash' : undefined,
    });
    setProofFile(null);
    setProofPreview(null);
  };

  const validateForm = () => {
    if (!formData.description.trim()) {
      alert('Deskripsi tidak boleh kosong!');
      return false;
    }
    if (!formData.amount || formData.amount <= 0) {
      alert('Jumlah harus lebih dari 0!');
      return false;
    }
    return true;
  };

  return {
    formData,
    proofFile,
    proofPreview,
    handleInputChange,
    handleFileChange,
    resetForm,
    validateForm,
  };
}