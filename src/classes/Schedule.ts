import type { Client, ScheduleSlot } from "@/types/schedule";
import { sortWithCollator } from "@/helpers/sort";

export class Schedule {
  clients: Client[] = [
    {
      id: "uuid1",
      name: "Ivan Ivanov",
    },
    {
      id: "uuid2",
      name: "Petr Petrov",
    },
  ];
}
