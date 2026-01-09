import { create } from "zustand";
import { persist } from "zustand/middleware";

type WebsiteState = {
  currentWebsiteId: string | null;
  setWebsiteId: (id: string) => void;
  clearWebsiteId: () => void;
};

export const useWebsiteStore = create<WebsiteState>()(
  persist(
    (set) => ({
      currentWebsiteId: null,
      setWebsiteId: (id: string) => set({ currentWebsiteId: id }),
      clearWebsiteId: () => set({ currentWebsiteId: null }),
    }),
    {
      name: "current-website-storage",
    }
  )
);
