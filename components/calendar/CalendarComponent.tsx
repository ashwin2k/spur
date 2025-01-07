"use client";
import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Grid } from "lucide-react";
import { Button } from "../ui/button";

const EventCard: React.FC<EventCardProps> = ({ event }) => (
  <div className={`absolute inset-0 m-1 p-2 rounded ${event.color} text-xs`}>
    <div className="font-semibold">{event.title}</div>
    <div>{event.time}</div>
  </div>
);

const formatWeekLabel = (date: Date) => {
  const formatter = new Intl.DateTimeFormat("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "2-digit",
  });
  return <b>Week of {formatter.format(date)}</b>;
};

export const CalendarComponent = () => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  return (
    <div className="flex flex-col w-full h-full">
      <div className="w-full h-16 border-b"></div>
      <div className="w-full max-w-6xl mx-auto p-4 bg-white">
        <div className="flex items-center justify-between mb-4">
          <div className="text-xl font-semibold">Scheduled Suites</div>
        </div>
        <div className="flex items-center gap-4">
          <Button className="bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
            <span>+</span>
            <span>Schedule Test</span>
          </Button>
          <div className="flex items-center gap-2 rounded-lg shadow px-4 py-2 border">
            <ChevronLeft className="w-5 h-5 cursor-pointer" />
            <span className="text-sm w-32">{formatWeekLabel(currentDate)}</span>
            <ChevronRight className="w-5 h-5 cursor-pointer" />
          </div>
          <div className="flex gap-2 w-full justify-end">
            <Grid className="w-5 h-5" />
          </div>
        </div>
      </div>
    </div>
  );
};
