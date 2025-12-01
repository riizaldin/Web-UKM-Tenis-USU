import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Plus, X, Clock } from "lucide-react";

// Map event type to color
const getEventColor = (type) => {
  switch (type?.toLowerCase()) {
    case 'latihan':
      return 'bg-green-500';
    case 'turnamen':
      return 'bg-blue-500';
    case 'lainnya':
      return 'bg-purple-500';
    default:
      return 'bg-indigo-500';
  }
};

export default function DashboardCalendar({ upcomingEvents = [] }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  // Transform incoming events from database
  const transformedEvents = upcomingEvents.map((event) => ({
    id: event.id,
    title: event.nama_event,
    date: new Date(event.tanggal),
    time: event.waktu_mulai?.substring(0, 5) || '00:00',
    color: getEventColor(event.tipe),
    type: event.tipe,
    location: event.lokasi,
  }));
  
  const [events, setEvents] = useState(transformedEvents);
  
  // Update events when props change
  React.useEffect(() => {
    const transformed = upcomingEvents.map((event) => ({
      id: event.id,
      title: event.nama_event,
      date: new Date(event.tanggal),
      time: event.waktu_mulai?.substring(0, 5) || '00:00',
      color: getEventColor(event.tipe),
      type: event.tipe,
      location: event.lokasi,
    }));
    setEvents(transformed);
  }, [upcomingEvents]);

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Get days in month
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    // Add empty cells for days before month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add all days in month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }

    return days;
  };

  const days = getDaysInMonth(currentDate);

  // Check if date has event
  const hasEvent = (date) => {
    if (!date) return false;
    return events.some(
      (event) => event.date.toDateString() === date.toDateString()
    );
  };

  // Get events for date
  const getEventsForDate = (date) => {
    if (!date) return [];
    return events.filter(
      (event) => event.date.toDateString() === date.toDateString()
    );
  };

  // Check if date is today
  const isToday = (date) => {
    if (!date) return false;
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  // Check if date is selected
  const isSelected = (date) => {
    if (!date) return false;
    return date.toDateString() === selectedDate.toDateString();
  };

  // Navigate months
  const previousMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
    );
  };

  const nextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
    );
  };

  // Get upcoming events
  const upcomingEventsDisplay = events
    .filter((event) => event.date >= new Date(new Date().setHours(0, 0, 0, 0)))
    .sort((a, b) => a.date - b.date)
    .slice(0, 5);

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.2 } },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.15 } },
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm p-4">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-semibold text-gray-800">
          {months[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h3>
        <div className="flex gap-2">
          <button
            onClick={previousMonth}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronLeft className="w-4 h-4 text-gray-600" />
          </button>
          <button
            onClick={nextMonth}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronRight className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Days of Week */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {daysOfWeek.map((day) => (
          <div
            key={day}
            className="text-center text-xs font-medium text-gray-500 py-1"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1.5 mb-4">
        {days.map((date, index) => {
          const dateEvents = date ? getEventsForDate(date) : [];
          return (
            <motion.button
              key={index}
              onClick={() => date && setSelectedDate(date)}
              disabled={!date}
              whileHover={date ? { scale: 1.05 } : {}}
              whileTap={date ? { scale: 0.95 } : {}}
              className={`
                aspect-square p-2 rounded-lg text-sm font-medium
                transition-all duration-200 relative
                flex flex-col items-center justify-center
                ${!date ? "invisible" : ""}
                ${isToday(date) ? "bg-indigo-500 text-white" : ""}
                ${
                  isSelected(date) && !isToday(date)
                    ? "bg-indigo-100 text-indigo-700"
                    : ""
                }
                ${!isToday(date) && !isSelected(date) ? "hover:bg-gray-100" : ""}
                ${!isToday(date) && !isSelected(date) ? "text-gray-700" : ""}
              `}
            >
              {date && (
                <>
                  <span className="relative z-10 mb-1">{date.getDate()}</span>
                  {hasEvent(date) && (
                    <div className="flex gap-1 mt-auto">
                      {dateEvents.slice(0, 3).map((event, i) => (
                        <div
                          key={i}
                          className={`w-1.5 h-1.5 rounded-full ${
                            isToday(date) ? "bg-white" : event.color
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Upcoming Events */}
      <div className="border-t pt-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-semibold text-gray-800">
            Event Mendatang
          </h4>
        </div>

        <div className="space-y-2">
          {upcomingEventsDisplay.length > 0 ? (
            upcomingEventsDisplay.map((event) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className={`w-2 h-2 rounded-full ${event.color} mt-1.5`} />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-gray-800 truncate">
                    {event.title}
                  </p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <p className="text-xs text-gray-500">
                      {event.date.toLocaleDateString("id-ID", {
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                    <span className="text-gray-300">•</span>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-gray-400" />
                      <p className="text-xs text-gray-500">{event.time}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <p className="text-xs text-gray-500 text-center py-4">
              Tidak ada event mendatang
            </p>
          )}
        </div>
      </div>
    </div>
  );
}