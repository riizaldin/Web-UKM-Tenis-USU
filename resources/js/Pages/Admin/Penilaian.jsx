import React from "react";
import { Link } from "@inertiajs/react";
import Sidebar from "@/Components/Sidebar";
import Button from "@/Components/Admin/Absensi/Button";
import PenilaianStats from "@/Components/Admin/Penilaian/PenilaianStats";
import PenilaianTabs from "@/Components/Admin/Penilaian/PenilaianTabs";
import PengurusCard from "@/Components/Admin/Penilaian/PengurusCard";
import QuestionForm from "@/Components/Admin/Penilaian/QuestionForm";
import QuestionList from "@/Components/Admin/Penilaian/QuestionList";
import usePenilaian from "@/hooks/Admin/usePenilaian";
import { ArrowLeft, Plus } from "lucide-react";

// Dummy data - nanti diganti dengan real data dari props
const dummyPengurus = [
  {
    id: 1,
    nama: "Ahmad Rizki",
    jabatan: "Ketua",
    rating: 4.5,
    totalRating: 25,
    ratingBreakdown: { 5: 15, 4: 8, 3: 2, 2: 0, 1: 0 },
    essayResponses: 12,
  },
  {
    id: 2,
    nama: "Siti Nurhaliza",
    jabatan: "Wakil Ketua",
    rating: 4.7,
    totalRating: 22,
    ratingBreakdown: { 5: 18, 4: 3, 3: 1, 2: 0, 1: 0 },
    essayResponses: 10,
  },
  {
    id: 3,
    nama: "Budi Santoso",
    jabatan: "Sekretaris",
    rating: 4.3,
    totalRating: 20,
    ratingBreakdown: { 5: 12, 4: 6, 3: 2, 2: 0, 1: 0 },
    essayResponses: 8,
  },
  {
    id: 4,
    nama: "Dewi Lestari",
    jabatan: "Bendahara",
    rating: 4.8,
    totalRating: 23,
    ratingBreakdown: { 5: 20, 4: 2, 3: 1, 2: 0, 1: 0 },
    essayResponses: 11,
  },
];

const dummyQuestions = [
  {
    id: 1,
    question_text: "Bagaimana penilaian Anda terhadap kepemimpinan pengurus?",
    question_type: "rating",
    responses: 25,
  },
  {
    id: 2,
    question_text: "Seberapa baik komunikasi pengurus dengan anggota?",
    question_type: "rating",
    responses: 25,
  },
  {
    id: 3,
    question_text: "Apa saran Anda untuk peningkatan kinerja pengurus ke depannya?",
    question_type: "essay",
    responses: 15,
  },
  {
    id: 4,
    question_text: "Bagaimana penilaian Anda terhadap inisiatif dan kreativitas pengurus?",
    question_type: "rating",
    responses: 23,
  },
];

export default function Penilaian({ auth, pengurus = dummyPengurus, questions = dummyQuestions }) {
  const {
    activeTab,
    setActiveTab,
    editingQuestion,
    setEditingQuestion,
    showAddQuestion,
    setShowAddQuestion,
    formData,
    setFormData,
    processing,
    handleAddQuestion,
    handleUpdateQuestion,
    handleDeleteQuestion,
    resetForm,
  } = usePenilaian();

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="p-2 text-blue-600 hover:bg-blue-50 rounded-md">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-3xl font-semibold">Penilaian Kinerja Pengurus</h1>
              <p className="text-gray-500 mt-1">
                Kelola dan monitor penilaian kinerja pengurus dari anggota (Anonim)
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <PenilaianStats pengurus={pengurus} questions={questions} />

        {/* Tabs */}
        <PenilaianTabs activeTab={activeTab} onChange={setActiveTab} />

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-2 gap-6">
            {pengurus.map((p) => (
              <PengurusCard key={p.id} pengurus={p} />
            ))}
          </div>
        )}

        {/* Questions Tab */}
        {activeTab === 'questions' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold">Daftar Pertanyaan</h2>
                <p className="text-sm text-gray-500 mt-1">
                  Kelola pertanyaan untuk penilaian kinerja pengurus
                </p>
              </div>
              <Button
                variant="primary"
                icon={<Plus size={20} />}
                onClick={() => setShowAddQuestion(true)}
              >
                Tambah Pertanyaan
              </Button>
            </div>

            {/* Add/Edit Question Form */}
            {(showAddQuestion || editingQuestion) && (
              <QuestionForm
                formData={formData}
                onInputChange={(field, value) => setFormData(field, value)}
                onSubmit={() => {
                  if (editingQuestion) {
                    handleUpdateQuestion(editingQuestion);
                  } else {
                    handleAddQuestion();
                  }
                }}
                onCancel={() => {
                  setShowAddQuestion(false);
                  setEditingQuestion(null);
                  resetForm();
                }}
                processing={processing}
                isEdit={!!editingQuestion}
              />
            )}

            {/* Questions List */}
            <QuestionList
              questions={questions}
              onEdit={(question) => {
                setEditingQuestion(question.id);
                setFormData('question_text', question.question_text);
                setFormData('question_type', question.question_type);
              }}
              onDelete={handleDeleteQuestion}
            />
          </div>
        )}
      </div>
    </div>
  );
}