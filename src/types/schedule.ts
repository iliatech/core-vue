export interface ScheduleSlot {
  time: string;
  clientId: string;
}

export interface ScheduleSlotExtended extends ScheduleSlot {
  date: string;
}

export interface ScheduleDayItem {
  date: string;
  slots: ScheduleSlot[];
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
