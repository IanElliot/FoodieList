import Constants from "expo-constants";
import type { ListItem, SuggestionResponse } from "./types";

const API_BASE: string =
  (Constants.expoConfig?.extra as any)?.apiBaseUrl ??
  "http://127.0.0.1:3001/api";

async function http<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json", ...(init?.headers || {}) },
    ...init,
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`HTTP ${res.status}: ${text}`);
  }
  return res.json();
}

export const API = {
  listItems: (): Promise<ListItem[]> => http<ListItem[]>("/list-items"),
  addItem: (name: string): Promise<ListItem> =>
    http<ListItem>("/list-items", {
      method: "POST",
      body: JSON.stringify({ name }),
    }),
  patchItem: (
    id: number,
    payload: Partial<Pick<ListItem, "checked" | "nameRaw">>
  ): Promise<ListItem> =>
    http<ListItem>(`/list-items/${id}`, {
      method: "PATCH",
      body: JSON.stringify(payload),
    }),
  deleteItem: (id: number): Promise<void> =>
    http<void>(`/list-items/${id}`, { method: "DELETE" }),
  suggestions: (maxMissing = 3): Promise<SuggestionResponse> =>
    http<SuggestionResponse>(`/recipes/suggest?maxMissing=${maxMissing}`),
  saveRecipe: (recipeId: number, status: "saved" | "ready") =>
    http(`/saved-recipes`, {
      method: "POST",
      body: JSON.stringify({ recipeId, status }),
    }),
};

export { API_BASE };
