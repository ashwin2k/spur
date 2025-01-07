export const getWeekDates = (date: Date): WeekDate[] => {
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

export const convertTo24Hour = (time: string): number => {
  const [timeStr] = time.split(" ")[0].split(":");
  let hours = parseInt(timeStr);
  if (time.includes("PM") && hours !== 12) {
    hours += 12;
  } else if (time.includes("AM") && hours === 12) {
    hours = 0;
  }
  return hours;
};

export const hours: Array<{ display: string; hour24: number }> = [
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
