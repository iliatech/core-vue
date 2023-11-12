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
