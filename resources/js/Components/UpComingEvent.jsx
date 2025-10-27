import React from "react";

export default function UpcomingEvents({ events = [] }) {
  return (
    <div className="space-y-3">
      {events.length === 0 && <p className="text-sm text-gray-500">No upcoming events</p>}
      {events.map(ev => (
        <div key={ev.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition">
          <div>
            <p className="font-medium">{ev.title}</p>
            <p className="text-xs text-gray-500">{new Date(ev.date).toLocaleDateString()}</p>
          </div>
          <div className="text-xs text-gray-400">→</div>
        </div>
      ))}
    </div>
  );
}
