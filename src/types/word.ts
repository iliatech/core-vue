import type { Currency } from "@/types/currency";
import type { Translation } from "@/types/translationType";
import type { ApiTagResponse } from "@/types/tag";
import type { ApiLanguage } from "@/modules/dictionary/types";

export interface CategoryHistoryItem {
  date: string;
  name: string;
  amount: number;
  currency: Currency;
}

export type CategoryHistory = CategoryHistoryItem[];

export interface ApiWordResponse {
  createdAt: string;
  id: string;
  tags: ApiTagResponse[];
  title: string;
  translating: ApiWordResponse[];
  translatedBy: ApiWordResponse[];
  language: ApiLanguage;
  updatedAt: string;
}

export interface Word {
  title: string;
}
