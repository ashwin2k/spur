"use client";
import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Grid } from "lucide-react";
import { Button } from "../ui/button";
import ScheduleDetailPopup from "../dialogs/Schedule";

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
  const dummyData: CalendarEvent[] = [
    {
      title: "Demo Suite",
      date: "2024-10-10",
      time: "11:00AM PST",
      color: "bg-blue-100 text-blue-700",
    },
    {
      title: "Authentication",
      date: "2024-10-13",
      time: "8:00AM PST",
      color: "bg-blue-100 text-blue-700",
    },
  ];
  const convertTo24Hour = (time: string): number => {
    const [timeStr] = time.split(" ")[0].split(":");
    let hours = parseInt(timeStr);
    if (time.includes("PM") && hours !== 12) {
      hours += 12;
    } else if (time.includes("AM") && hours === 12) {
      hours = 0;
    }
    return hours;
  };

  const hours: Array<{ display: string; hour24: number }> = [
    { display: "1 AM", hour24: 1 },
    { display: "2 AM", hour24: 2 },
    { display: "3 AM", hour24: 3 },
    { display: "4 AM", hour24: 4 },
    { display: "5 AM", hour24: 5 },
    { display: "6 AM", hour24: 6 },
    { display: "7 AM", hour24: 7 },
    { display: "8 AM", hour24: 8 },
    { display: "9 AM", hour24: 9 },
    { display: "10 AM", hour24: 10 },
    { display: "11 AM", hour24: 11 },
    { display: "12 PM", hour24: 12 },
    { display: "1 PM", hour24: 13 },
    { display: "2 PM", hour24: 14 },
    { display: "3 PM", hour24: 15 },
    { display: "4 PM", hour24: 16 },
    { display: "5 PM", hour24: 17 },
    { display: "6 PM", hour24: 18 },
    { display: "7 PM", hour24: 19 },
    { display: "8 PM", hour24: 20 },
    { display: "9 PM", hour24: 21 },
    { display: "10 PM", hour24: 22 },
    { display: "11 PM", hour24: 23 },
    { display: "12 AM", hour24: 0 },
  ];

  const getWeekDates = (date: Date): WeekDate[] => {
    const week: WeekDate[] = [];
    const firstDayOfWeek = new Date(date);
    firstDayOfWeek.setDate(date.getDate() - date.getDay());

    for (let i = 0; i < 7; i++) {
      const currentDay = new Date(firstDayOfWeek);
      currentDay.setDate(firstDayOfWeek.getDate() + i);
      week.push({
        num: currentDay.getDate(),
        day: new Intl.DateTimeFormat("en-US", { weekday: "short" }).format(
          currentDay,
        ),
        fullDate: currentDay.toISOString().split("T")[0],
      });
    }
    return week;
  };
  const [open, setOpen] = useState(true);
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [slideDirection, setSlideDirection] = useState<"left" | "right" | null>(
    null,
  );

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
              <Grid className="w-5 h-5" />
            </div>
          </div>
        </div>
        <div className="flex mx-8 mb-4 overflow-y-scroll scrollbar-thin  scrollbar-thumb-gray-300 scrollbar-hide">
          <div className="w-16 flex-shrink-0 mt-6">
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
          <div className="rounded flex-grow">
            <div className="sticky top-0 z-50 border-b">
              <div
                className={`grid grid-cols-7 rounded-t-lg bg-gray-100 ${getSlideClass()}`}
              >
                {weekDates.map((dateObj) => (
                  <div
                    key={dateObj.fullDate}
                    className="p-2 text-sm border-r last:border-r-0"
                  >
                    <div className="font-medium">{dateObj.num}</div>
                    <div className="text-gray-500">{dateObj.day}</div>
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
                    ></div>
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
