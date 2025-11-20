import { useState, useMemo } from 'react';

export default function useTransactionFilter(transactions, itemsPerPage = 10) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterMonth, setFilterMonth] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredTransactions = useMemo(() => {
    return transactions
      .filter(tx => {
        if (filterMonth !== 'all') {
          const txDate = new Date(tx.date).getMonth() + 1;
          return txDate === parseInt(filterMonth);
        }
        return true;
      })
      .filter(tx => tx.description.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [transactions, filterMonth, searchTerm]);

  const paginatedTransactions = useMemo(() => {
    return filteredTransactions.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
  }, [filteredTransactions, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);

  return {
    searchTerm,
    setSearchTerm,
    filterMonth,
    setFilterMonth,
    currentPage,
    setCurrentPage,
    filteredTransactions,
    paginatedTransactions,
    totalPages,
  };
}