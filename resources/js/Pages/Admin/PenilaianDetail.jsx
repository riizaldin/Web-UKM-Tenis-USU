import React from "react";
import Sidebar from "@/Components/Sidebar";
import PengurusHeader from "@/Components/Admin/PenilaianDetail/PengurusHeader";
import DetailStats from "@/Components/Admin/PenilaianDetail/DetailStats";
import RatingBreakdown from "@/Components/Admin/Penilaian/RatingBreakdown";
import RatingPerQuestion from "@/Components/Admin/PenilaianDetail/RatingPerQuestion";
import EssayResponsesSection from "@/Components/Admin/PenilaianDetail/EssayResponsesSection";
import SummaryCard from "@/Components/Admin/PenilaianDetail/SummaryCard";
import usePenilaianDetail from "@/hooks/Admin/usePenilaianDetail";

export default function PenilaianDetail({ 
  auth, 
  pengurus, 
  essay_responses = [], 
  rating_per_question = [] 
}) {
  const {
    sortEssay,
    setSortEssay,
    expandedQuestions,
    toggleQuestion,
    groupedResponses,
  } = usePenilaianDetail(essay_responses);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 p-6">
        {/* Header */}
        <PengurusHeader pengurus={pengurus} />

        {/* Stats Overview */}
        <DetailStats 
          pengurus={pengurus} 
          essayCount={essay_responses.length} 
        />

        <div className="grid grid-cols-3 gap-6">
          {/* Left Column - Rating Details */}
          <div className="col-span-1 space-y-6">
            {/* Rating Breakdown */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Rating Breakdown</h3>
              <RatingBreakdown
                breakdown={pengurus.rating_breakdown || {}}
                total={pengurus.total_rating || 0}
              />
            </div>

            {/* Rating per Question */}
            <RatingPerQuestion ratingPerQuestion={rating_per_question} />
          </div>

          {/* Right Column - Essay Responses */}
          <div className="col-span-2">
            <EssayResponsesSection
              groupedResponses={groupedResponses}
              expandedQuestions={expandedQuestions}
              onToggleQuestion={toggleQuestion}
              sortEssay={sortEssay}
              onSortChange={setSortEssay}
            />
          </div>
        </div>

        {/* Summary Section */}
        <SummaryCard pengurus={pengurus} />
      </div>
    </div>
  );
}