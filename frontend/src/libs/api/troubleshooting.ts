import { Troubleshooting } from "../types";

export const fetchTroubleshootingPosts = async (): Promise<
  Troubleshooting[]
> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/troubleshooting`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch troubleshooting posts");
  }
  const data: Troubleshooting[] = await response.json();
  return data;
};

export const fetchTroubleshootingPost = async (
  id: number
): Promise<Troubleshooting> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/troubleshooting/${id}`
  );
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
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/troubleshooting`,
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
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/troubleshooting/${id}`,
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
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/troubleshooting/${id}`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to delete troubleshooting post");
  }

  return true;
};
