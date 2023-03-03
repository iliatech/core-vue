import type { Currency } from "@/types/currency";

export interface CategoryHistoryItem {
  date: string;
  name: string;
  amount: number;
  currency: Currency;
}

export type CategoryHistory = CategoryHistoryItem[];
