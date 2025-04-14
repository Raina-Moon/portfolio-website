export interface Troubleshooting {
    id: number;
    title: string;
    content: string;
    image_url: string;
    tags: string[];
    createdAt: string;
  }

  export interface ContactMessage {
    id?: number;
    name: string;
    email: string;
    subject: string;
    message: string;
    createdAt?: string;
  }