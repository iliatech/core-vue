import { reactive } from "vue";
import { defineStore } from "pinia";
import type { Rest } from "@/types/total";

const defaultRest = {
  usd: 0,
  gel: 0,
};

export const useTotalsStore = defineStore("totalsStore", () => {
  const rest: Rest = reactive(defaultRest);

  const updateRest = (restName: string, value: number): void => {
    rest[restName] = value;
  };

  return { rest, updateRest };
});
