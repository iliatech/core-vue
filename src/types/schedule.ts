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
  archived?: boolean;
}

export interface ScheduleDay {
  date: Date;
  short: string;
  full: string;
  dayOfWeekNumber: number;
}

export interface ScheduleConfig {
  defaultInputTimezoneName: string;
  dashboardTimezoneName: string;
}

export interface SchedulePayload {
  clients: Client[];
  schedule: ScheduleDayItem[];
  config: ScheduleConfig;
}

export interface TimeZone {
  name: string;
  value: number;
  summerTime: boolean;
}
