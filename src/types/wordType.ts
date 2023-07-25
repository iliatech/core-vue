import type { Currency } from "@/types/currency";
import type { Translation } from "@/types/translationType";

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
  translations: Translation[];
}

export interface Word {
  title: string;
}
