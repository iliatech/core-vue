import type { Currency } from "@/types/currency";

export interface CategoryHistoryItem {
  date: string;
  name: string;
  amount: number;
  currency: Currency;
}

export type CategoryHistory = CategoryHistoryItem[];

export interface ApiWord {
  id: number;
  title: string;
  createdAt: string;
  updatedAt: string;
}

export interface Word {
  title: string;
}
