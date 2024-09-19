import { create } from "zustand";
import { defaultItems } from "../lib/constants";
import { persist } from "zustand/middleware";

export const useItemsStore = create(
  persist(
    (set) => ({
      items: defaultItems,

      addItem: (itemText) => {
        const newItem = {
          id: new Date().getTime(),
          name: itemText,
          packed: false,
        };
        set((state) => ({ items: [...state.items, newItem] }));
      },

      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        }));
      },

      togglePacked: (id) => {
        set((state) => {
          const newItems = state.items.map((item) => {
            if (item.id !== id) return item;
            return { ...item, packed: !item.packed };
          });

          return { items: newItems };
        });
      },

      removeAllItems: () => {
        set(() => ({ items: [] }));
      },

      resetItems: () => {
        set(() => ({ items: defaultItems }));
      },

      markAllAsComplete: () => {
        set((state) => ({
          items: state.items.map((item) => ({ ...item, packed: true })),
        }));
      },

      markAllAsIncomplete: () => {
        set((state) => ({
          items: state.items.map((item) => ({ ...item, packed: false })),
        }));
      },
    }),
    { name: "items" }
  )
);
