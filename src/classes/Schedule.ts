import type { Client } from "@/types/schedule";

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

  prepareDate(date: string) {
    return date.substring(0, 6);
  }

  getClientNameById(id: string): string | undefined {
    const client = this.clients.find((item) => item.id === id);
    return client?.name ?? undefined;
  }
}
