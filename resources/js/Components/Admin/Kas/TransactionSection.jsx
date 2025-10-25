import React from 'react';
import Button from '@/Components/Admin/Absensi/Button';
import TransactionFilter from './TransactionFilter';
import TransactionTable from './TransactionTable';
import Pagination from '@/Components/Admin/Dokumentasi/Pagination';
import { DollarSign, Plus } from 'lucide-react';

export default function TransactionSection({
  title,
  type = 'income',
  transactions,
  searchTerm,
  onSearchChange,
  filterMonth,
  onMonthChange,
  currentPage,
  totalPages,
  onPageChange,
  onAddClick,
}) {
  const isIncome = type === 'income';
  const color = isIncome ? 'green' : 'red';

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <DollarSign className={`w-5 h-5 text-${color}-600`} />
          {title}
        </h3>
        <div className="flex gap-2">
          <TransactionFilter
            searchTerm={searchTerm}
            onSearchChange={onSearchChange}
            filterMonth={filterMonth}
            onMonthChange={onMonthChange}
            color={color}
          />
          <Button
            variant={isIncome ? 'success' : 'danger'}
            icon={<Plus className="w-4 h-4" />}
            onClick={onAddClick}
            size="sm"
          >
            Tambah
          </Button>
        </div>
      </div>

      <TransactionTable transactions={transactions} type={type} />

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      )}
    </div>
  );
}