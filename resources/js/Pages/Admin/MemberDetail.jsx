import React from "react";
import { Link } from "@inertiajs/react";
import Sidebar from "@/Components/Sidebar";
import MemberProfileCard from "@/Components/Admin/MemberDetail/MemberProfileCard";
import MemberActivityLog from "@/Components/Admin/MemberDetail/MemberActivityLog";
import MemberPaymentCard from "@/Components/Admin/MemberDetail/MemberPaymentCard";
import DeleteConfirmModal from "@/Components/Admin/MemberDetail/DeleteConfirmModal";
import useMemberDetail from "@/hooks/Admin/useMemberDetail";
import { ArrowLeft } from "lucide-react";

const formatDate = (date) => {
  return new Intl.DateTimeFormat('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
};

export default function AdminMemberDetail({ auth, member }) {
  const today = new Date();
  
  const {
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    handleEdit,
    handleDelete,
    confirmDelete,
    handleAddPayment,
  } = useMemberDetail(member);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <Link href="/admin/members" className="p-2 text-blue-600 hover:bg-blue-50 rounded-md">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h2 className="text-sm text-gray-500">{formatDate(today)}</h2>
              <h1 className="text-3xl font-semibold mt-1">
                Detail Anggota: {member?.name}
              </h1>
            </div>
          </div>
        </div>

        {/* Profile & Biodata */}
        <MemberProfileCard
          member={member}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        {/* Activity Log */}
        <MemberActivityLog logs={member?.logs} />

        {/* Payment History */}
        <MemberPaymentCard
          member={member}
          onAddPayment={handleAddPayment}
        />

        {/* Delete Confirmation Modal */}
        <DeleteConfirmModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={confirmDelete}
          memberName={member?.name}
        />
      </div>
    </div>
  );
}