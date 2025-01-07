import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Grid } from "lucide-react";
import { Button } from "../ui/button";

const EventCard: React.FC<EventCardProps> = ({ event }) => (
  <div className={`absolute inset-0 m-1 p-2 rounded ${event.color} text-xs`}>
    <div className="font-semibold">{event.title}</div>
    <div>{event.time}</div>
  </div>
);

export const CalendarComponent = () => {
  return (
    <div className="flex flex-col w-full h-full">
      <div className="w-full h-16 border-b"></div>
      <div className="w-full max-w-6xl mx-auto p-4 bg-white">
        <div className="flex items-center justify-between mb-4">
          <div className="text-xl font-semibold">Scheduled Suites</div>
          <div className="flex items-center gap-4">
            <Button className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2">
              <span>Schedule Test</span>
            </Button>
            <div className="flex items-center gap-2">
              <ChevronLeft className="w-5 h-5 cursor-pointer" />
              <ChevronRight className="w-5 h-5 cursor-pointer" />
            </div>
            <div className="flex gap-2">
              <Grid className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
