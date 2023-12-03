export interface TimeSlotShort {
  time: string;
  clientId: string | null;
  comment: string | undefined;
}

export interface TimeSlot extends TimeSlotShort {
  date: number;
}

export interface ApiTimeSlotResponse {
  id: string;
  clientId: string | null;
  date: number | null;
  time: string;
  comment: string | null;
  client: Client | null;
}

// TODO: Reuse ApiTimeSlotResponse.
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

export interface ScheduleConfig {
  defaultInputTimezoneName: string;
  dashboardTimezoneName: string;
  scheduleTitle?: string;
}

export interface ScheduleConfigPayload {
  config: ScheduleConfig;
}

export interface TimeZone {
  name: string;
  value: number;
  summerTime: boolean;
}
