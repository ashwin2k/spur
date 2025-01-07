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
