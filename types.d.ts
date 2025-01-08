interface CalendarEvent {
  title: string;
  date: string;
  time: string;
  color: string;
}

interface WeekDate {
  num: number;
  day: string;
  fullDate: string;
}

interface EventCardProps {
  event: CalendarEvent;
}

type WeekDay = "Sun" | "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat";

// Interface for the input event template
interface EventTemplate {
  id?: number;
  title: string;
  date: string;
  time: string;
  schedule: WeekDay[];
}
