import React, { useState } from "react";
import { Menu, Calendar, CalendarDays } from "lucide-react";

const ToggleSwitch = () => {
  const [isCalendarView, setIsCalendarView] = useState(false);

  return (
    <div
      onClick={() => setIsCalendarView(!isCalendarView)}
      className="relative flex items-center w-24 h-10 bg-gray-200 rounded-lg cursor-pointer"
    >
      <div className="absolute inset-1 flex">
        <div className="flex-1 flex items-center justify-center">
          {!isCalendarView ? null : <Menu className="w-5 h-4 text-gray-400" />}
        </div>
        <div className="flex-1 flex items-center justify-center">
          {isCalendarView ? null : (
            <CalendarDays className="w-5 h-4 text-gray-400" />
          )}
        </div>
      </div>
      <div
        className={`
          absolute w-10 h-8 bg-white rounded-lg shadow-sm 
          transition-all duration-300 ease-in-out flex items-center justify-center
          ${isCalendarView ? "translate-x-12" : "translate-x-1"}
        `}
      >
        {isCalendarView ? (
          <CalendarDays className="w-5 h-4 text-gray-600" />
        ) : (
          <Menu className="w-5 h-4 text-gray-600" />
        )}
      </div>
    </div>
  );
};

export default ToggleSwitch;
