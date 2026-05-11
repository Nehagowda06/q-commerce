"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronRight, ListChecks, Plus, Trash2, X } from "lucide-react";
import { useState } from "react";
import PageWrapper from "@/components/layout/PageWrapper";
import { useListStore, type GroceryList } from "@/store/listStore";

const EMOJIS = ["🛒", "🥦", "🍎", "🥛", "🍳", "🧴", "🐾", "🎂", "🏠", "💊"];

export default function ListsPage() {
  const { lists, addList, deleteList, addItem, toggleItem, deleteItem } = useListStore();

  const [activeList, setActiveList] = useState<GroceryList | null>(null);
  const [showNewList, setShowNewList] = useState(false);
  const [newListName, setNewListName] = useState("");
  const [newListEmoji, setNewListEmoji] = useState("🛒");
  const [newItemText, setNewItemText] = useState("");
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);

  // Keep activeList in sync with store
  const syncedActiveList = activeList ? (lists.find((l) => l.id === activeList.id) ?? null) : null;

  const handleCreateList = () => {
    if (!newListName.trim()) return;
    const created = addList({ name: newListName.trim(), emoji: newListEmoji, items: [] });
    setNewListName("");
    setNewListEmoji("🛒");
    setShowNewList(false);
    setActiveList(created);
  };

  const handleDeleteList = (id: number) => {
    deleteList(id);
    setConfirmDeleteId(null);
    if (activeList?.id === id) setActiveList(null);
  };

  const handleAddItem = () => {
    if (!newItemText.trim() || !syncedActiveList) return;
    addItem(syncedActiveList.id, { text: newItemText.trim(), checked: false });
    setNewItemText("");
  };

  const checkedCount = syncedActiveList?.items.filter((i) => i.checked).length ?? 0;
  const totalCount = syncedActiveList?.items.length ?? 0;

  return (
    <PageWrapper>
      <div className="p-3 pb-28">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-base font-black text-brand-text leading-tight">My Lists</h1>
            <p className="text-[10px] text-brand-text-muted mt-0.5">Grocery lists & wishlists</p>
          </div>
          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={() => setShowNewList(true)}
            className="flex items-center gap-1.5 bg-brand-primary text-white px-3 py-2 rounded-xl text-[11px] font-black shadow-soft"
          >
            <Plus size={14} strokeWidth={3} />
            New List
          </motion.button>
        </div>

        {/* List cards */}
        {lists.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-16 h-16 rounded-2xl bg-brand-primary/10 flex items-center justify-center mb-3">
              <ListChecks size={28} className="text-brand-primary" strokeWidth={1.8} />
            </div>
            <p className="text-sm font-black text-brand-text mb-1">No lists yet</p>
            <p className="text-[11px] text-brand-text-muted">Tap &quot;New List&quot; to get started</p>
          </div>
        ) : (
          <div className="space-y-2.5">
            {lists.map((list) => {
              const done = list.items.filter((i) => i.checked).length;
              const total = list.items.length;
              const pct = total > 0 ? (done / total) * 100 : 0;
              return (
                <motion.button
                  key={list.id}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveList(list)}
                  className="w-full bg-white rounded-2xl border border-gray-100 shadow-soft p-3 flex items-center gap-3 text-left"
                >
                  <div className="w-11 h-11 rounded-xl bg-brand-primary/10 flex items-center justify-center text-xl flex-shrink-0">
                    {list.emoji}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-xs font-black text-brand-text truncate">{list.name}</p>
                      <span className="text-[9px] text-brand-text-muted flex-shrink-0">{list.createdAt}</span>
                    </div>
                    <p className="text-[10px] text-brand-text-muted mt-0.5">
                      {total === 0 ? "Empty" : `${done}/${total} done`}
                    </p>
                    {total > 0 && (
                      <div className="mt-1.5 h-1 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-brand-primary rounded-full transition-all" style={{ width: `${pct}%` }} />
                      </div>
                    )}
                  </div>
                  <ChevronRight size={14} className="text-gray-300 flex-shrink-0" strokeWidth={2.5} />
                </motion.button>
              );
            })}
          </div>
        )}
      </div>

      {/* ── Active list detail modal ── */}
      <AnimatePresence>
        {syncedActiveList && (
          <>
            <motion.div key="bd" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-[59]" onClick={() => setActiveList(null)} />
            <motion.div key="modal"
              initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.92, opacity: 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 35 }}
              className="fixed inset-0 z-[60] flex items-center justify-center pointer-events-none px-4">
              <div className="w-full max-w-[360px] bg-white rounded-3xl shadow-2xl pointer-events-auto flex flex-col max-h-[80vh]">

                {/* Modal header */}
                <div className="flex items-center gap-3 p-4 border-b border-gray-50">
                  <span className="text-2xl">{syncedActiveList.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-sm font-black text-brand-text truncate">{syncedActiveList.name}</h2>
                    <p className="text-[10px] text-brand-text-muted">{checkedCount}/{totalCount} items done</p>
                  </div>

                  {/* Delete with confirm */}
                  {confirmDeleteId === syncedActiveList.id ? (
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      <span className="text-[10px] font-black text-red-500">Sure?</span>
                      <button
                        onClick={() => handleDeleteList(syncedActiveList.id)}
                        className="h-7 px-2.5 rounded-lg bg-red-500 text-white text-[10px] font-black"
                      >
                        Yes
                      </button>
                      <button
                        onClick={() => setConfirmDeleteId(null)}
                        className="h-7 px-2.5 rounded-lg bg-gray-100 text-brand-text text-[10px] font-black"
                      >
                        No
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setConfirmDeleteId(syncedActiveList.id)}
                      className="w-8 h-8 rounded-xl bg-red-50 flex items-center justify-center text-red-400 flex-shrink-0"
                      aria-label="Delete list"
                    >
                      <Trash2 size={14} strokeWidth={2.5} />
                    </button>
                  )}

                  <button onClick={() => { setActiveList(null); setConfirmDeleteId(null); }}
                    className="w-8 h-8 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0">
                    <X size={16} strokeWidth={2.5} />
                  </button>
                </div>

                {/* Items */}
                <div className="flex-1 overflow-y-auto px-4 py-2">
                  {syncedActiveList.items.length === 0 ? (
                    <div className="text-center py-6">
                      <p className="text-[11px] text-brand-text-muted">No items yet.</p>
                      <p className="text-[10px] text-brand-text-muted mt-1">Type below or use the 🔖 button on any product.</p>
                    </div>
                  ) : (
                    <ul className="space-y-1.5">
                      <AnimatePresence initial={false}>
                        {syncedActiveList.items.map((item) => (
                          <motion.li key={item.id}
                            initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }}
                            className="flex items-center gap-2.5 py-1.5">
                            <button
                              onClick={() => toggleItem(syncedActiveList.id, item.id)}
                              className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                                item.checked ? "bg-brand-primary border-brand-primary" : "border-gray-300"
                              }`}
                            >
                              {item.checked && <Check size={11} strokeWidth={3} className="text-white" />}
                            </button>
                            <span className={`flex-1 text-xs font-bold transition-colors ${item.checked ? "line-through text-brand-text-muted" : "text-brand-text"}`}>
                              {item.text}
                            </span>
                            {item.price && (
                              <span className="text-[9px] text-brand-text-muted flex-shrink-0">Rs.{item.price}</span>
                            )}
                            <button onClick={() => deleteItem(syncedActiveList.id, item.id)}
                              className="w-6 h-6 rounded-lg flex items-center justify-center text-gray-300 hover:text-red-400 transition-colors">
                              <X size={12} strokeWidth={2.5} />
                            </button>
                          </motion.li>
                        ))}
                      </AnimatePresence>
                    </ul>
                  )}
                </div>

                {/* Add item input */}
                <div className="p-4 border-t border-gray-50 flex gap-2">
                  <input
                    value={newItemText}
                    onChange={(e) => setNewItemText(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleAddItem()}
                    placeholder="Add an item manually..."
                    className="flex-1 h-10 px-3 rounded-xl border border-gray-200 bg-gray-50 text-xs font-bold text-brand-text focus:outline-none focus:border-brand-primary transition-colors"
                  />
                  <button onClick={handleAddItem}
                    className="w-10 h-10 rounded-xl bg-brand-primary text-white flex items-center justify-center flex-shrink-0">
                    <Plus size={18} strokeWidth={3} />
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── New list modal ── */}
      <AnimatePresence>
        {showNewList && (
          <>
            <motion.div key="bd2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-[59]" onClick={() => setShowNewList(false)} />
            <motion.div key="modal2"
              initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 35 }}
              className="fixed inset-0 z-[60] flex items-center justify-center pointer-events-none px-6">
              <div className="w-full max-w-[320px] bg-white rounded-3xl p-5 pointer-events-auto shadow-2xl">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-black text-brand-text">New List</h3>
                  <button onClick={() => setShowNewList(false)}
                    className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                    <X size={16} strokeWidth={2.5} />
                  </button>
                </div>

                <p className="text-[10px] font-black text-brand-text-muted uppercase tracking-wider mb-2">Pick an icon</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {EMOJIS.map((e) => (
                    <button key={e} onClick={() => setNewListEmoji(e)}
                      className={`w-9 h-9 rounded-xl text-lg flex items-center justify-center transition-colors ${
                        newListEmoji === e ? "bg-brand-primary/20 ring-2 ring-brand-primary" : "bg-gray-50"
                      }`}>
                      {e}
                    </button>
                  ))}
                </div>

                <label className="block text-[10px] font-black text-brand-text-muted uppercase tracking-wider mb-1">
                  List Name
                </label>
                <input
                  value={newListName}
                  onChange={(e) => setNewListName(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleCreateList()}
                  placeholder="e.g. Weekly Groceries"
                  className="w-full h-10 px-3 rounded-xl border border-gray-200 bg-white text-xs font-bold text-brand-text focus:outline-none focus:border-brand-primary transition-colors mb-4"
                />

                <button onClick={handleCreateList}
                  className="w-full h-11 rounded-xl bg-brand-primary text-white text-xs font-black">
                  Create List
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </PageWrapper>
  );
}

