import type { Currency } from "@/types/currency";
import type { Translation } from "@/types/translationType";
import type { ApiTagResponse } from "@/types/tag";

export interface CategoryHistoryItem {
  date: string;
  name: string;
  amount: number;
  currency: Currency;
}

export type CategoryHistory = CategoryHistoryItem[];

export interface ApiWordResponse {
  createdAt: string;
  id: number;
  tags: ApiTagResponse[];
  title: string;
  translations: Translation[];
  updatedAt: string;
}

export interface Word {
  title: string;
}
