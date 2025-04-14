import { Troubleshooting } from "../types";

export const fetchTroubleshootingPosts = async (): Promise<Troubleshooting[]> => {
    const response = await fetch('/api/troubleshooting');
    if (!response.ok) {
      throw new Error('Failed to fetch troubleshooting posts');
    }
    const data: Troubleshooting[] = await response.json();
    return data;
  };