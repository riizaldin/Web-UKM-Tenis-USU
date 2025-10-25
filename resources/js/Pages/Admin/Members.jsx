import React from "react";
import { Link } from "@inertiajs/react";
import Sidebar from "@/Components/Sidebar";
import MemberStats from "@/Components/Admin/Members/MemberStats";
import MemberFilter from "@/Components/Admin/Members/MemberFilter";
import MemberTable from "@/Components/Admin/Members/MemberTable";
import MemberQuickViewModal from "@/Components/Admin/Members/MemberQuickViewModal";
import useMembers from "@/hooks/Admin/useMembers";
import { ArrowLeft, Users } from "lucide-react";

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
            <Users className="w-5 h-5 text-purple-600" />
            Daftar Anggota ({filteredMembers.length})
          </h3>
          
          <MemberTable
            members={filteredMembers}
            onViewDetail={openMemberDetail}
          />
        </div>

        {/* Quick View Modal */}
        <MemberQuickViewModal
          isOpen={isModalOpen}
          onClose={closeModal}
          member={selectedMember}
        />
      </div>
    </div>
  );
}