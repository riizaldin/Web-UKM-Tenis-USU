import { useState, useMemo } from 'react';

export default function useMembers(members) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedMember, setSelectedMember] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredMembers = useMemo(() => {
    return members
      .filter(member => {
        // Filter by search term
        const matchesSearch = 
          member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          member.nim.toLowerCase().includes(searchTerm.toLowerCase()) ||
          member.email.toLowerCase().includes(searchTerm.toLowerCase());

        // Filter by re-reg status
        const matchesStatus = 
          filterStatus === 'all' ||
          (filterStatus === 'registered' && member.re_reg_date) ||
          (filterStatus === 'unregistered' && !member.re_reg_date);

        return matchesSearch && matchesStatus;
      });
  }, [members, searchTerm, filterStatus]);

  const openMemberDetail = (member) => {
    setSelectedMember(member);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMember(null);
  };

  const stats = useMemo(() => {
    const registered = members.filter(m => m.re_reg_date).length;
    const unregistered = members.filter(m => !m.re_reg_date).length;
    return {
      total: members.length,
      registered,
      unregistered,
    };
  }, [members]);

  return {
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
  };
}