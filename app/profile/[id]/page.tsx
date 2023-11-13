"use client";

import { useState, useEffect } from "react";
import type { Post } from "@/components/feed/Feed";
import { useSession } from "next-auth/react";

import PromptCardList from "@/components/promptCard/PromptCardList";

const ProfilePage = ({ params }: { params: { id: string } }) => {
  const session = useSession();
  const [posts, setPosts] = useState<Post[]>([]);

  const isMyProfile =
    session?.data?.user.id && session.data.user.id === params.id;

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/user/${params.id}/posts`);
      const data = await response.json();
      if (response.ok) {
        setPosts(data);
      }
    };
    if (params?.id) fetchPosts();
  }, [params.id]);

  const handleEdit = () => {};
  const handleDelete = () => {};

  return (
    <section>
      <h1>{isMyProfile ? `My Profile` : `Profile of ${params.id}`}</h1>
      <PromptCardList data={posts} />
    </section>
  );
};

export default ProfilePage;
