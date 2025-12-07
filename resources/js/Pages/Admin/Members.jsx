import React, { useState } from "react";
import { Link, router } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import MemberStats from "@/Components/Admin/Members/MemberStats";
import MemberFilter from "@/Components/Admin/Members/MemberFilter";
import MemberTable from "@/Components/Admin/Members/MemberTable";
import MemberQuickViewModal from "@/Components/Admin/Members/MemberQuickViewModal";
import useMembers from "@/hooks/Admin/useMembers";
import { ArrowLeft, Users } from "lucide-react";
import { Head } from '@inertiajs/react';
import { toast } from 'react-toastify';

const formatDate = (date) => {
  return new Intl.DateTimeFormat('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
};

export default function AdminMembers({ auth, members = [] }) {
  const today = new Date();
  const [deleteModal, setDeleteModal] = useState({ show: false, member: null });

  const {
    searchTerm,
    setSearchTerm,
    filterStatus,
    setFilterStatus,
    filteredMembers,
    selectedMember,
    isModalOpen,
    openMemberDetail,
    closeModal,
    stats,
  } = useMembers(members);

  const handleDeleteMember = (member) => {
    setDeleteModal({ show: true, member });
  };

  const confirmDelete = () => {
    if (deleteModal.member) {
      router.delete(route('admin.members.delete', deleteModal.member.id), {
        preserveState: false,
        preserveScroll: false,
        onSuccess: () => {
          toast.success('Anggota berhasil dihapus!');
          setDeleteModal({ show: false, member: null });
        },
        onError: () => {
          toast.error('Gagal menghapus anggota.');
          setDeleteModal({ show: false, member: null });
        },
      });
    }
  };

  // Pisahkan pengurus dan anggota
  const pengurus = filteredMembers.filter(member => 
    member.jabatan && member.jabatan !== 'anggota'
  );
  const anggota = filteredMembers.filter(member => 
    !member.jabatan || member.jabatan === 'anggota'
  );

  return (
    <AdminLayout user={auth.user}>
      <Head title="Keanggotaan" />
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-4">
              <Link href="/admin" className="p-2 text-blue-600 hover:bg-blue-50 rounded-md">
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <div>
                <h2 className="text-sm text-gray-500">{formatDate(today)}</h2>
                <h1 className="text-3xl font-semibold mt-1">Keanggotaan</h1>
              </div>
            </div>
          </div>

        {/* Stats */}
        <MemberStats
          total={stats.total}
          registered={stats.registered}
          unregistered={stats.unregistered}
        />

        {/* Filter & Search */}
        <MemberFilter
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          filterStatus={filterStatus}
          onFilterChange={setFilterStatus}
        />

        {/* Members Table */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-600" />
            <span className="text-blue-700">Daftar Keseluruhan Anggota</span>
            <span className="bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full">
              {anggota.length} Orang
            </span>
          </h3>
          
          <MemberTable
            members={filteredMembers}
            onViewDetail={openMemberDetail}
            onDelete={handleDeleteMember}
          />
        </div>

          {/* Quick View Modal */}
          <MemberQuickViewModal
            isOpen={isModalOpen}
            onClose={closeModal}
            member={selectedMember}
          />

          {/* Delete Confirmation Modal */}
          {deleteModal.show && (
            <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
              <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-fade-in-scale">
                {/* Header */}
                <div className="bg-gradient-to-r from-red-600 to-red-700 p-4 text-white">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm flex-shrink-0">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-bold">
                      Hapus Anggota
                    </h3>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="bg-red-50 border-l-4 border-red-600 p-4 rounded-lg mb-6">
                    <p className="text-sm text-gray-700 leading-relaxed">
                      Anda akan menghapus anggota <span className="font-bold">{deleteModal.member?.name}</span>.
                      <span className="font-semibold block mt-2 text-red-700">Semua data terkait anggota ini akan dihapus permanen!</span>
                    </p>
                  </div>

                  {/* Buttons */}
                  <div className="flex space-x-3">
                    <button
                      onClick={() => setDeleteModal({ show: false, member: null })}
                      className="flex-1 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-200"
                    >
                      Batal
                    </button>
                    <button
                      onClick={confirmDelete}
                      className="flex-1 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                    >
                      Ya, Hapus Permanen
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}