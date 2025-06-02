import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { ContactMessage, Troubleshooting } from "../types/types";
import { fetchTroubleshootingPosts } from "./api/troubleshooting";
import { sendContactMessage } from "./api/contact";

interface PortfolioState {
  troubleshootingPosts: Troubleshooting[];
  loading: boolean;
  error: string | null;
  fetchTroubleshooting: () => Promise<void>;
  sendContact: (contact: ContactMessage) => Promise<void>;
}

const usePortfolioStore = create<PortfolioState>()(
  devtools((set) => ({
    troubleshootingPosts: [],
    loading: false,
    error: null,
    fetchTroubleshooting: async () => {
      set({ loading: true, error: null });
      try {
        const posts = await fetchTroubleshootingPosts();
        set({ troubleshootingPosts: posts });
      } catch (error: unknown) {
        if (error instanceof Error) {
          set({ error: error.message });
        } else {
          set({ error: "An unknown error occurred." });
        }
      } finally {
        set({ loading: false });
      }
    },
    sendContact: async (contact: ContactMessage) => {
      set({ loading: true, error: null });
      try {
        const result = await sendContactMessage(contact);
        console.log("Contact message sent:", result);
      } catch (error: unknown) {
        if (error instanceof Error) {
          set({ error: error.message });
        } else {
          set({ error: "An unknown error occurred." });
        }
      } finally {
        set({ loading: false });
      }
    },
  }))
);

export default usePortfolioStore;
