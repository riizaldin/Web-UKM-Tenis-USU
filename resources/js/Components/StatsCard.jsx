import React from "react";

export default function StatsCard({ title, value, icon }) {
  return (
    <div className="bg-white h-[120px] p-4 rounded-2xl shadow-md flex flex-col items-start justify-center">
      <div className="text-gray-500 text-sm mb-2">{title}</div>
      <div className="flex items-center gap-2">
        <span className="text-2xl font-bold text-gray-800">{value}</span>
        <span className="text-lg">{icon}</span>
      </div>
    </div>
  );
}
