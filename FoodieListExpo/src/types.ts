export type ListItem = {
  id: number;
  nameRaw: string;
  nameNorm: string;
  checked: boolean;
  createdAt: string; // ISO
};

export type Suggestion = {
  id: number;
  title: string;
  imageUrl?: string | null;
  sourceUrl?: string | null;
  timeMin?: number | null;
  haveCount: number;
  total: number;
  missing: string[];
  score: number;
};

export type SuggestionResponse = {
  have: string[];
  suggestions: Suggestion[];
};
