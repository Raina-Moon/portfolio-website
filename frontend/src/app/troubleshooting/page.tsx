"use client"

import { fetchTroubleshootingPosts } from "@/libs/api/troubleshooting";
import React, { useState } from "react";

const page = () => {
  const [posts,setPosts] = useState([])
  const fetchData = fetchTroubleshootingPosts();
  return (
  <div>
    {posts.map((item,idx) => (
      <li>

      </li>
    ))}
    </div>);
};

export default page;
