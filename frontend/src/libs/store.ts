import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { ContactMessage, Troubleshooting } from "./types";
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
      } catch (error: any) {
        set({ error: error.message });
      } finally {
        set({ loading: false });
      }
    },
    sendContact: async (contact: ContactMessage) => {
      set({ loading: true, error: null });
      try {
        const result = await sendContactMessage(contact);
        console.log("Contact message sent:", result);
      } catch (error: any) {
        set({ error: error.message });
      } finally {
        set({ loading: false });
      }
    },
  }))
);

export default usePortfolioStore;
