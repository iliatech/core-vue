export interface ScheduleSlot {
  clientId: string;
  time: string;
}

export interface ScheduleDay {
  date: string;
  slots: ScheduleSlot[];
}

export interface Client {
  id: string;
  name: string;
}

export interface DeleteSlotConfig {
  date: string;
  time: string;
  clientId: string;
}
