import { create } from "zustand";

export type SortOption = "relevance" | "price-asc" | "price-desc" | "discount";
export type FilterOption = "all" | "fresh" | "on-sale" | "best-seller";

interface SearchStore {
  query: string;
  sort: SortOption;
  filter: FilterOption;
  setQuery: (q: string) => void;
  setSort: (s: SortOption) => void;
  setFilter: (f: FilterOption) => void;
  reset: () => void;
}

export const useSearchStore = create<SearchStore>((set) => ({
  query: "",
  sort: "relevance",
  filter: "all",
  setQuery: (query) => set({ query }),
  setSort: (sort) => set({ sort }),
  setFilter: (filter) => set({ filter }),
  reset: () => set({ query: "", sort: "relevance", filter: "all" }),
}));
