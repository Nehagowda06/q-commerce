import { create } from "zustand";

export type SortOption = "relevance" | "price-asc" | "price-desc" | "discount";
export type FilterOption = "all" | "fresh" | "on-sale" | "best-seller";

interface SearchStore {
  query: string;
  sort: SortOption;
  filter: FilterOption;
  recentSearches: string[];
  setQuery: (q: string) => void;
  setSort: (s: SortOption) => void;
  setFilter: (f: FilterOption) => void;
  addRecentSearch: (q: string) => void;
  clearRecentSearches: () => void;
  reset: () => void;
}

export const useSearchStore = create<SearchStore>((set) => ({
  query: "",
  sort: "relevance",
  filter: "all",
  recentSearches: [],
  setQuery: (query) => set({ query }),
  setSort: (sort) => set({ sort }),
  setFilter: (filter) => set({ filter }),
  addRecentSearch: (q) =>
    set((state) => ({
      recentSearches: [q, ...state.recentSearches.filter((r) => r !== q)].slice(0, 6),
    })),
  clearRecentSearches: () => set({ recentSearches: [] }),
  reset: () => set({ query: "", sort: "relevance", filter: "all" }),
}));
