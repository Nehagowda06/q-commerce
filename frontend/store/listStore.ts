import { create } from "zustand";

export interface ListItem {
  id: number;
  text: string;
  checked: boolean;
  productId?: string;
  price?: number;
}

export interface GroceryList {
  id: number;
  name: string;
  emoji: string;
  items: ListItem[];
  createdAt: string;
}

interface ListStore {
  lists: GroceryList[];
  addList: (list: Omit<GroceryList, "id" | "createdAt">) => GroceryList;
  deleteList: (id: number) => void;
  addItem: (listId: number, item: Omit<ListItem, "id">) => void;
  toggleItem: (listId: number, itemId: number) => void;
  deleteItem: (listId: number, itemId: number) => void;
  updateList: (list: GroceryList) => void;
}

export const useListStore = create<ListStore>((set, get) => ({
  lists: [
    {
      id: 1,
      name: "Weekly Groceries",
      emoji: "🛒",
      createdAt: "Today",
      items: [
        { id: 1, text: "Tomatoes 1kg", checked: false },
        { id: 2, text: "Amul Milk 500ml", checked: true },
        { id: 3, text: "Onions 1kg", checked: false },
        { id: 4, text: "Atta 5kg", checked: false },
      ],
    },
    {
      id: 2,
      name: "Wishlist",
      emoji: "🍎",
      createdAt: "Yesterday",
      items: [
        { id: 1, text: "Alphonso Mangoes", checked: false },
        { id: 2, text: "Dark Fantasy Cookies", checked: false },
      ],
    },
  ],

  addList: (list) => {
    const newList: GroceryList = { ...list, id: Date.now(), createdAt: "Just now" };
    set((state) => ({ lists: [newList, ...state.lists] }));
    return newList;
  },

  deleteList: (id) =>
    set((state) => ({ lists: state.lists.filter((l) => l.id !== id) })),

  addItem: (listId, item) =>
    set((state) => ({
      lists: state.lists.map((l) =>
        l.id === listId
          ? { ...l, items: [...l.items, { ...item, id: Date.now() }] }
          : l
      ),
    })),

  toggleItem: (listId, itemId) =>
    set((state) => ({
      lists: state.lists.map((l) =>
        l.id === listId
          ? { ...l, items: l.items.map((i) => (i.id === itemId ? { ...i, checked: !i.checked } : i)) }
          : l
      ),
    })),

  deleteItem: (listId, itemId) =>
    set((state) => ({
      lists: state.lists.map((l) =>
        l.id === listId ? { ...l, items: l.items.filter((i) => i.id !== itemId) } : l
      ),
    })),

  updateList: (list) =>
    set((state) => ({
      lists: state.lists.map((l) => (l.id === list.id ? list : l)),
    })),
}));
