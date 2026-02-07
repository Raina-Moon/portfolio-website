import type { ContactMessage } from "../../types/types";

const API_URL =
  import.meta.env.PUBLIC_API_URL ?? import.meta.env.NEXT_PUBLIC_API_URL ?? "";

export const sendContactMessage = async (contact: ContactMessage): Promise<ContactMessage> => {
    const response = await fetch(`${API_URL}/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(contact)
    });
    if (!response.ok) {
      throw new Error('Failed to send contact message');
    }
    const data: ContactMessage = await response.json();
    return data;
  };
