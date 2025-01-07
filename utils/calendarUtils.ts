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

// Mapping of weekdays to their numerical values
const WEEKDAYS: Record<WeekDay, number> = {
  Sun: 0,
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6,
};

const validateDateFormat = (date: string): void => {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(date)) {
    throw new Error("Date must be in YYYY-MM-DD format");
  }
};

const generateRecurringEvents = (eventTemplate: EventTemplate) => {
  // Input validation
  if (!eventTemplate || typeof eventTemplate !== "object") {
    throw new Error("Event template must be an object");
  }

  if (!Array.isArray(eventTemplate.schedule)) {
    throw new Error("Schedule must be an array of weekdays");
  }

  validateDateFormat(eventTemplate.date);

  // Validate schedule days
  eventTemplate.schedule.forEach((day) => {
    if (!(day in WEEKDAYS)) {
      throw new Error(`Invalid day in schedule: ${day}`);
    }
  });

  // Extract year and month from the template date
  const [year, month] = eventTemplate.date.split("-").map(Number);

  // Get all dates for the specified weekdays in the month
  const dates: Date[] = [];
  const firstDay = new Date(year, month - 1, 1);
  const lastDay = new Date(year, month, 0).getDate();

  for (let day = 1; day <= lastDay; day++) {
    const currentDate = new Date(year, month - 1, day);
    const dayName = currentDate.toLocaleString("en-US", {
      weekday: "short",
    }) as WeekDay;

    if (eventTemplate.schedule.includes(dayName)) {
      dates.push(currentDate);
    }
  }

  // Generate event objects for each date
  return dates.map((date) => ({
    title: eventTemplate.title,
    date: date.toISOString().split("T")[0],
    time: eventTemplate.time || "11:00AM PST",
    color: "bg-blue-100 text-blue-700 border-blue-500 border",
  }));
};
const generateSingleEvent = (eventTemplate: EventTemplate): CalendarEvent => {
  if (!eventTemplate || typeof eventTemplate !== "object") {
    throw new Error("Event template must be an object");
  }

  validateDateFormat(eventTemplate.date);

  return {
    title: eventTemplate.title,
    date: eventTemplate.date,
    time: eventTemplate.time || "11:00AM PST",
    color: "bg-blue-100 text-blue-700 border-blue-500 border",
  };
};

export const generateMultipleRecurringEvents = (templates: EventTemplate[]) => {
  if (!Array.isArray(templates)) {
    throw new Error("Templates parameter must be an array");
  }

  // Map through all templates and flatten the results
  try {
    return templates.reduce<CalendarEvent[]>((allEvents, template) => {
      const events = generateRecurringEvents(template);
      return [...allEvents, ...events];
    }, []);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error processing templates: ${error.message}`);
    }
    throw error;
  }
};
export const generateCombinedEvents = (
  templates: EventTemplate[],
): CalendarEvent[] => {
  if (!Array.isArray(templates)) {
    throw new Error("Templates parameter must be an array");
  }

  try {
    // Create a Map to store events by date+time to prevent duplicates
    const eventMap = new Map<string, CalendarEvent>();

    templates.forEach((template) => {
      // Generate single event first
      const singleEvent = generateSingleEvent(template);
      const singleEventKey = `${singleEvent.date}-${singleEvent.time}-${singleEvent.title}`;
      eventMap.set(singleEventKey, singleEvent);

      // Generate recurring events if schedule exists
      if (template.schedule) {
        const recurringEvents = generateRecurringEvents(template);
        recurringEvents.forEach((event) => {
          const eventKey = `${event.date}-${event.time}-${event.title}`;
          // Only add if it's not already present
          if (!eventMap.has(eventKey)) {
            eventMap.set(eventKey, event);
          }
        });
      }
    });

    // Convert Map values to array and sort by date and time
    return Array.from(eventMap.values()).sort((a, b) => {
      const dateCompare = a.date.localeCompare(b.date);
      return dateCompare !== 0 ? dateCompare : a.time.localeCompare(b.time);
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error processing templates: ${error.message}`);
    }
    throw error;
  }
};
