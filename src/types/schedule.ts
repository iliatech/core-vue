export interface ScheduleSlot {
  time: string;
  clientId: string;
}

export interface ScheduleSlotExtended extends ScheduleSlot {
  date: string;
}

export interface ScheduleDay {
  date: string;
  slots: ScheduleSlot[];
}

export interface Client {
  id: string;
  name: string;
}
