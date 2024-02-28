export interface ApiTimeSlotResponse {
  id: string;
  clientId: string | null;
  date: number | null;
  time: string;
  comment: string | null;
  client: Client | null;
}

export interface TimeSlotCreate {
  date: number;
  time: string;
  clientId: string | null;
  comment: string | null;
}

export interface TimeSlotUpdate {
  id: string;
  date: number | null;
  time: string;
  comment: string | null;
  clientId: string | null;
}

export interface Client {
  id: string;
  name: string;
  archived?: boolean;
}

export interface ScheduleDay {
  date: Date;
  short: string;
  full: number;
  dayOfWeekNumber: number;
}

export interface TimeZone {
  name: string;
  value: number;
  summerTime: boolean;
}
