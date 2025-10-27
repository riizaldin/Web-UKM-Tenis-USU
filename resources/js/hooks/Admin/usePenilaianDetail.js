import { useState, useMemo } from 'react';

export default function usePenilaianDetail(essay_responses = []) {
  const [filterRating, setFilterRating] = useState('all');
  const [sortEssay, setSortEssay] = useState('latest');
  const [expandedQuestions, setExpandedQuestions] = useState([]);

  const toggleQuestion = (question) => {
    setExpandedQuestions(prev => 
      prev.includes(question) 
        ? prev.filter(q => q !== question)
        : [...prev, question]
    );
  };

  const groupedResponses = useMemo(() => {
    return essay_responses.reduce((acc, response) => {
      if (!acc[response.question]) {
        acc[response.question] = [];
      }
      acc[response.question].push(response);
      return acc;
    }, {});
  }, [essay_responses]);

  const sortedResponses = useMemo(() => {
    const grouped = { ...groupedResponses };
    Object.keys(grouped).forEach(question => {
      grouped[question] = [...grouped[question]].sort((a, b) => {
        const dateA = new Date(a.submitted_at);
        const dateB = new Date(b.submitted_at);
        return sortEssay === 'latest' ? dateB - dateA : dateA - dateB;
      });
    });
    return grouped;
  }, [groupedResponses, sortEssay]);

  return {
    filterRating,
    setFilterRating,
    sortEssay,
    setSortEssay,
    expandedQuestions,
    toggleQuestion,
    groupedResponses: sortedResponses,
  };
}