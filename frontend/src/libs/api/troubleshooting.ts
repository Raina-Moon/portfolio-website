import { Troubleshooting } from "../types";

export const fetchTroubleshootingPosts = async (): Promise<Troubleshooting[]> => {
    const response = await fetch('/api/troubleshooting');
    if (!response.ok) {
      throw new Error('Failed to fetch troubleshooting posts');
    }
    const data: Troubleshooting[] = await response.json();
    return data;
  };

  export const fetchTroubleshootingPost = async (id:number): Promise<Troubleshooting> => {
    const response = await fetch(`/api/troubleshooting/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch troubleshooting post');
    }
    const data: Troubleshooting = await response.json();
    return data;
  }

  export const createTroubleshootingPost = async (title:string,content: string): Promise<Troubleshooting> => {
    const response = await fetch('/api/troubleshooting', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title,content }),
    });

    if (!response.ok) {
      throw new Error('Failed to create troubleshooting post');
    }

    const data: Troubleshooting = await response.json();
    return data;
  }