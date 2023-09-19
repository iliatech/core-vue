import type { ApiWordResponse } from "@/types/word";

export interface ApiTagResponse {
  createdAt: string;
  id: string;
  name: string;
  updatedAt: string;
  words: ApiWordResponse;
}
