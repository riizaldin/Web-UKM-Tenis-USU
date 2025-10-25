import { useState, useMemo } from 'react';

export default function useDocumentFilter(documents, itemsPerPage = 10) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredDocuments = useMemo(() => {
    return documents
      .filter(doc => filterCategory === 'all' || doc.category === filterCategory)
      .filter(doc => 
        doc.caption.toLowerCase().includes(searchTerm.toLowerCase()) || 
        doc.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
  }, [documents, filterCategory, searchTerm]);

  const paginatedDocuments = useMemo(() => {
    return filteredDocuments.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
  }, [filteredDocuments, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredDocuments.length / itemsPerPage);

  return {
    searchTerm,
    setSearchTerm,
    filterCategory,
    setFilterCategory,
    currentPage,
    setCurrentPage,
    filteredDocuments,
    paginatedDocuments,
    totalPages,
  };
}