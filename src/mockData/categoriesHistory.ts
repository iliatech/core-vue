import type { CategoryHistory } from "@/types/word";
import { Currency } from "@/types/currency";

export const categoriesHistoryMock: Record<string, CategoryHistory> = {
  food: [
    { date: "2 Mar", name: "grapes", amount: 100, currency: Currency.gel },
    { date: "1 Mar", name: "pears", amount: 50, currency: Currency.gel },
  ],
};
