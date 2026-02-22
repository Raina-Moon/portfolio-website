import TroubleshootingSection, {
  type TroubleshootingSectionHandler,
} from "@/components/Troubleshooting/TroubleshootingSection";
import {
  createTroubleshootingPost,
  fetchTroubleshootingPosts,
} from "@/libs/api/troubleshooting";
import type { Troubleshooting } from "@/types/types";
import React, { useEffect, useRef, useState } from "react";

const TroubleshootingEditListPage = () => {
  const [authorized, setAuthorized] = useState(true); // TODO: revert to false
  const [password, setPassword] = useState("");
  const [posts, setPosts] = useState<Troubleshooting[]>([]);

  const sectionRef = useRef<TroubleshootingSectionHandler>(null);

  useEffect(() => {
    const saved = sessionStorage.getItem("troubleshooting-password");
    if (saved === "true") {
      setAuthorized(true);
    }

    const fetchPosts = async () => {
      try {
        const data = await fetchTroubleshootingPosts();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching troubleshooting posts:", error);
      }
    };
    fetchPosts();
  }, []);

  const checkedPassword = () => {
    if (password === import.meta.env.PUBLIC_TROUBLESHOOTING_PASSWORD) {
      sessionStorage.setItem("troubleshooting-password", "true");
      setAuthorized(true);
    } else {
      alert("Incorrect password");
    }
  };

  const handlePost = async () => {
    const values = sectionRef.current?.getValues();
    if (!values || !values.title || !values.content) {
      alert("Please fill in all fields before creating a post.");
      return;
    }

    try {
      await createTroubleshootingPost(values.title, values.content, values.tags);
      alert("Post created successfully!");
      location.reload();
    } catch (err) {
      console.error("Failed to create post:", err);
      alert("Failed to create post. Please try again.");
    }
  };

  return authorized ? (
    <div className="max-w-4xl mx-auto px-6 py-20">
      {/* Existing Posts */}
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Existing Posts</h1>
      {posts.length > 0 ? (
        <ul className="space-y-2 mb-10">
          {posts.map((post) => (
            <li key={post.id}>
              <a
                href={`/troubleshooting/edit/${post.id}`}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
              >
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">{post.title}</h2>
                  <p className="text-sm text-gray-500">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <span className="text-gray-400 text-sm shrink-0 ml-4">Edit &rarr;</span>
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 mb-10">No posts yet.</p>
      )}

      {/* New Post Editor */}
      <div className="border-t border-gray-200 pt-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Create New Post</h2>
        <TroubleshootingSection ref={sectionRef} />
        <div className="mt-6">
          <button
            onClick={handlePost}
            className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
          >
            Publish
          </button>
        </div>
      </div>
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">Troubleshooting Section</h1>
      <p className="mb-4">
        Please enter the password to access the troubleshooting section.
      </p>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 mb-4"
        placeholder="Enter password"
      />
      <button
        onClick={checkedPassword}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Submit
      </button>
    </div>
  );
};

export default TroubleshootingEditListPage;
