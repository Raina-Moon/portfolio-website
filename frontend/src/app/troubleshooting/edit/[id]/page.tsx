"use client"

import { fetchTroubleshootingPost } from '@/libs/api/troubleshooting';
import { Troubleshooting } from '@/types/types';
import React, { useEffect, useState } from 'react'

const page = ({params} : {params: {id:string}}) => {
    const [post, setPost] = useState<Troubleshooting | undefined>(undefined);
    const id = parseInt(params.id, 10);
    
    useEffect(() => {
        const fetchPost = async() => {
            try {
                const data = await fetchTroubleshootingPost(id);
                setPost(data);
            } catch (error) {
                console.error("Error fetching troubleshooting post:", error);
            }
        }
        fetchPost();
    }, [id])
  return (
    <div>
        {post ? <p>{post.title}</p> : <p>Loading...</p>}
    </div>
  )
}

export default page