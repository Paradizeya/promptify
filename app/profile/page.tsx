"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import type { Post } from "@/components/feed/Feed";

import PromptCardList from "@/components/promptCard/PromptCardList";

const ProfilePage = () => {
  const session = useSession();
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/user/${session?.data?.user.id}/posts`);
      const data = await response.json();
      if (response.ok) {
        setPosts(data);
      }
    };
    if (session.data?.user.id) fetchPosts();
  }, [session?.data?.user.id]);

  const handleEdit = () => {};
  const handleDelete = () => {};

  return (
    <section>
      <h1>Profile of {session.data?.user.name}</h1>
      <PromptCardList data={posts} />
    </section>
  );
};

export default ProfilePage;
