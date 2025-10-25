import { useState, useMemo } from 'react';

export default function useReportFilter(reports, itemsPerPage = 6) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterYear, setFilterYear] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredReports = useMemo(() => {
    return reports
      .filter(report => {
        if (filterYear !== 'all') {
          const reportYear = new Date(report.period_start).getFullYear();
          return reportYear === parseInt(filterYear);
        }
        return true;
      })
      .filter(report => 
        report.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
  }, [reports, filterYear, searchTerm]);

  const paginatedReports = useMemo(() => {
    return filteredReports.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
  }, [filteredReports, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredReports.length / itemsPerPage);

  return {
    searchTerm,
    setSearchTerm,
    filterYear,
    setFilterYear,
    currentPage,
    setCurrentPage,
    filteredReports,
    paginatedReports,
    totalPages,
  };
}