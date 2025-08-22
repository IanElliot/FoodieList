import { create } from 'zustand';
import { API } from './api';
import type { ListItem, Suggestion } from './types';

type State = {
  items: ListItem[];
  suggestions: Suggestion[];
  loading: boolean;
  error?: string;
  refreshAll: () => Promise<void>;
  add: (name: string) => Promise<void>;
  toggle: (item: ListItem) => Promise<void>;
  remove: (item: ListItem) => Promise<void>;
  addMissing: (s: Suggestion) => Promise<void>;
};

const useStore = create<State>((set, get) => ({
  items: [],
  suggestions: [],
  loading: false,
  async refreshAll() {
    try {
      set({ loading: true, error: undefined });
      const [items, sug] = await Promise.all([API.listItems(), API.suggestions(3)]);
      set({ items, suggestions: sug.suggestions, loading: false });
    } catch (e: any) {
      set({ loading: false, error: e.message || 'Failed to load' });
    }
  },
  async add(name: string) {
    if (!name.trim()) return;
    await API.addItem(name.trim());
    await get().refreshAll();
  },
  async toggle(item) {
    await API.patchItem(item.id, { checked: !item.checked });
    await get().refreshAll();
  },
  async remove(item) {
    await API.deleteItem(item.id);
    await get().refreshAll();
  },
  async addMissing(s) {
    // Add all missing; then save recipe for later
    for (const m of s.missing) {
      await API.addItem(m);
    }
    await API.saveRecipe(s.id, 'saved');
    await get().refreshAll();
  }
}));

export default useStore;
