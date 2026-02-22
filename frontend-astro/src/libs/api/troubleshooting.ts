import type { Troubleshooting } from "../../types/types";
import { mockPosts } from "./mockTroubleshooting";

const API_URL =
  import.meta.env.PUBLIC_API_URL ?? import.meta.env.NEXT_PUBLIC_API_URL ?? "";

const USE_MOCK = !API_URL;

export const fetchTroubleshootingPosts = async (): Promise<
  Troubleshooting[]
> => {
  if (USE_MOCK) return mockPosts;

  const response = await fetch(`${API_URL}/troubleshooting`);
  if (!response.ok) {
    throw new Error("Failed to fetch troubleshooting posts");
  }
  const data: Troubleshooting[] = await response.json();
  return data;
};

export const fetchTroubleshootingPost = async (
  id: number
): Promise<Troubleshooting> => {
  if (USE_MOCK) {
    const post = mockPosts.find((p) => p.id === id);
    if (!post) throw new Error("Post not found");
    return post;
  }

  const response = await fetch(`${API_URL}/troubleshooting/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch troubleshooting post");
  }
  const data: Troubleshooting = await response.json();
  return data;
};

export const createTroubleshootingPost = async (
  title: string,
  content: string,
  tags: string[]
): Promise<Troubleshooting> => {
  if (USE_MOCK) throw new Error("Mock mode: create not supported");

  const response = await fetch(
    `${API_URL}/troubleshooting`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, content, tags }),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to create troubleshooting post");
  }

  const data: Troubleshooting = await response.json();
  return data;
};

export const updatePost = async (
  id: number,
  title: string,
  content: string,
  tags: string[]
) => {
  if (USE_MOCK) throw new Error("Mock mode: update not supported");

  const response = await fetch(
    `${API_URL}/troubleshooting/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, content, tags }),
    }
  );
  if (!response.ok) {
    throw new Error("Failed to update troubleshooting post");
  }
  const data: Troubleshooting = await response.json();
  return data;
};

export const deletePost = async (id: number) => {
  if (USE_MOCK) throw new Error("Mock mode: delete not supported");

  const response = await fetch(
    `${API_URL}/troubleshooting/${id}`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to delete troubleshooting post");
  }

  return true;
};
