export interface TimeSlotShort {
  time: string;
  clientId: string;
}

export interface TimeSlot extends TimeSlotShort {
  date: string;
}

export interface ScheduleDayItem {
  date: string;
  slots: TimeSlotShort[];
}

export interface Client {
  id: string;
  name: string;
}

export interface ScheduleDay {
  date: Date;
  short: string;
  full: string;
  dayOfWeekNumber: number;
}
