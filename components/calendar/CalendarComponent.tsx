"use client";
import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Clock, Grid } from "lucide-react";
import { Button } from "../ui/button";
import ScheduleDetailPopup from "../dialogs/Schedule";
import {
  getWeekDates,
  hours,
  convertTo24Hour,
  generateMultipleRecurringEvents,
  generateCombinedEvents,
} from "../../utils/calendarUtils";
import { getEvents } from "@/app/actions";
import ToggleSwitch from "./ToggleSwitch";
const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const minutes = event.time.split(" ")[0].split(":")[1];
  return (
    <div className="h-full">
      <div
        className={`absolute h-full inset-0 p-2 rounded ${event.color} text-xs z-40`}
        style={{ marginTop: `${minutes}px` }}
      >
        <div className="font-semibold">{event.title}</div>
        <div className="flex flex-row items-center">
          <Clock size={12} />
          <div className="ml-1">{event.time} PST</div>
        </div>
      </div>
    </div>
  );
};

const formatWeekLabel = (date: Date) => {
  const formatter = new Intl.DateTimeFormat("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "2-digit",
  });
  return <b>Week of {formatter.format(date)}</b>;
};

export const CalendarComponent = () => {
  const [calendarData, setCalendarData] = useState<CalendarEvent[]>([]);
  const [open, setOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [slideDirection, setSlideDirection] = useState<"left" | "right" | null>(
    null,
  );
  const getEventsForTimeSlot = (
    date: string,
    hourBlock: number,
    data: CalendarEvent[],
  ): CalendarEvent[] => {
    return data.filter((event) => {
      const eventHour = convertTo24Hour(event.time);
      return event.date === date && eventHour === hourBlock;
    });
  };
  const weekDates = getWeekDates(currentDate);
  const navigateWeek = (direction: "prev" | "next"): void => {
    setSlideDirection(direction === "next" ? "left" : "right");

    setTimeout(() => {
      const newDate = new Date(currentDate);
      newDate.setDate(currentDate.getDate() + (direction === "next" ? 7 : -7));
      setCurrentDate(newDate);

      setTimeout(() => {
        setSlideDirection(null);
      }, 300);
    }, 150);
  };
  const getSlideClass = () => {
    switch (slideDirection) {
      case "left":
        return "transition-transform duration-300 animate-slide-left";
      case "right":
        return "transition-transform duration-300 animate-slide-right";
      default:
        return "";
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      console.log("fetching data");
      const data = await getEvents();
      if (data) {
        const calendarEvents = generateCombinedEvents(data);
        setCalendarData(calendarEvents);
        console.log(calendarEvents, data);
      }
    };
    fetchData();
  }, [open]);
  return (
    <>
      <style jsx global>{`
        @keyframes slideLeft {
          0% {
            transform: translateX(0);
            opacity: 1;
          }
          50% {
            transform: translateX(-10%);
            opacity: 0;
          }
          51% {
            transform: translateX(10%);
            opacity: 0;
          }
          100% {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes slideRight {
          0% {
            transform: translateX(0);
            opacity: 1;
          }
          50% {
            transform: translateX(10%);
            opacity: 0;
          }
          51% {
            transform: translateX(-10%);
            opacity: 0;
          }
          100% {
            transform: translateX(0);
            opacity: 1;
          }
        }

        .animate-slide-left {
          animation: slideLeft 300ms ease-in-out;
        }

        .animate-slide-right {
          animation: slideRight 300ms ease-in-out;
        }
      `}</style>
      <ScheduleDetailPopup open={open} setOpen={setOpen} />
      <div className="flex flex-col w-full h-full">
        <div className="w-full h-32 border-b"></div>
        <div className="w-full max-w-6xl mx-auto p-4 bg-white">
          <div className="flex items-center justify-between mb-4">
            <div className="text-xl font-semibold">Scheduled Suites</div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              className="bg-blue-700 text-white px-4 py-1 rounded-lg flex items-center gap-2"
              onClick={() => setOpen(true)}
            >
              <span>+</span>
              <span>Schedule Test</span>
            </Button>
            <div className="flex items-center gap-2 rounded-lg px-4 py-2.5 border">
              <ChevronLeft
                className="w-5 h-5 cursor-pointer"
                onClick={() => navigateWeek("prev")}
              />
              <span className="text-sm w-32">
                {formatWeekLabel(currentDate)}
              </span>
              <ChevronRight
                className="w-5 h-5 cursor-pointer"
                onClick={() => navigateWeek("next")}
              />
            </div>
            <div className="flex gap-2 w-full justify-end">
              <ToggleSwitch />
            </div>
          </div>
        </div>
        <div className="flex mx-8 mb-4 overflow-y-scroll scrollbar-thin  scrollbar-thumb-gray-300 scrollbar-hide">
          <div className="w-16 flex-shrink-0 mt-6 bg-white z-50">
            <div className="text-sm text-gray-500 h-8 flex items-center">
              PST
            </div>
            {hours.map(({ display }) => (
              <div
                key={display}
                className="h-16 text-sm text-gray-500 flex items-center"
              >
                {display}
              </div>
            ))}
          </div>
          <div className=" flex-grow border rounded-lg h-fit">
            <div className="sticky top-0 z-50 border-b">
              <div
                className={`grid grid-cols-7 rounded-t-lg bg-gray-100 ${getSlideClass()}`}
              >
                {weekDates.map((dateObj) => (
                  <div
                    key={dateObj.fullDate}
                    className="p-2 text-sm border-r last:border-r-0 flex-row items-center flex"
                  >
                    <div className="font-medium w-min text-base">
                      {dateObj.num}
                    </div>
                    <div className="ml-2 text-gray-500 w-min">
                      {dateObj.day}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className={getSlideClass()}>
              {hours.map(({ display, hour24 }) => (
                <div key={display} className="grid grid-cols-7">
                  {weekDates.map((dateObj) => (
                    <div
                      key={`${dateObj.fullDate}-${hour24}`}
                      className="relative border h-16"
                    >
                      {getEventsForTimeSlot(
                        dateObj.fullDate,
                        hour24,
                        calendarData,
                      ).map((event, i) => (
                        <EventCard key={i} event={event} />
                      ))}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
