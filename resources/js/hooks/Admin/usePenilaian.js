import { useState } from 'react';
import { useForm } from '@inertiajs/react';

export default function usePenilaian() {
  const [activeTab, setActiveTab] = useState('overview');
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [showAddQuestion, setShowAddQuestion] = useState(false);
  const [selectedPengurus, setSelectedPengurus] = useState(null);

  const { data, setData, post, put, delete: destroy, processing, reset } = useForm({
    question_text: '',
    question_type: 'rating',
    pengurus_id: '',
  });

  const handleAddQuestion = (onSuccess) => {
    post('/admin/penilaian/questions', {
      onSuccess: () => {
        setShowAddQuestion(false);
        reset();
        onSuccess?.();
      },
    });
  };

  const handleUpdateQuestion = (id, onSuccess) => {
    put(`/admin/penilaian/questions/${id}`, {
      onSuccess: () => {
        setEditingQuestion(null);
        reset();
        onSuccess?.();
      },
    });
  };

  const handleDeleteQuestion = (id, onSuccess) => {
    if (confirm('Apakah Anda yakin ingin menghapus pertanyaan ini?')) {
      destroy(`/admin/penilaian/questions/${id}`, {
        onSuccess: () => {
          onSuccess?.();
        },
      });
    }
  };

  return {
    activeTab,
    setActiveTab,
    editingQuestion,
    setEditingQuestion,
    showAddQuestion,
    setShowAddQuestion,
    selectedPengurus,
    setSelectedPengurus,
    formData: data,
    setFormData: setData,
    processing,
    handleAddQuestion,
    handleUpdateQuestion,
    handleDeleteQuestion,
    resetForm: reset,
  };
}