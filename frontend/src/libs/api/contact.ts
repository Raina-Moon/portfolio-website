import { ContactMessage } from "../types";

export const sendContactMessage = async (contact: ContactMessage): Promise<ContactMessage> => {
    const response = await fetch('/api/contact', {
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