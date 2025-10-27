import { useState } from 'react';
import { router } from '@inertiajs/react';

export default function useMemberDetail(member) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleEdit = () => {
    setIsEditModalOpen(true);
  };

  const handleDelete = () => {
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    console.log('Delete member:', member.id);
    // router.delete(`/admin/members/${member.id}`);
    setIsDeleteModalOpen(false);
  };

  const handleAddPayment = () => {
    router.visit(`/admin/members/${member.id}/finance/add`);
  };

  return {
    isEditModalOpen,
    setIsEditModalOpen,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    handleEdit,
    handleDelete,
    confirmDelete,
    handleAddPayment,
  };
}