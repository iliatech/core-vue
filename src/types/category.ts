import type { Currency } from "@/types/currency";

export interface CategoryHistoryItem {
  date: string;
  name: string;
  amount: number;
  currency: Currency;
}

export type CategoryHistory = CategoryHistoryItem[];

export interface ApiCategory {
  id: number;
  title: string;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  title: string;
}
