"use client";

import { useState, useEffect } from "react";
import PromptCardList from "@/components/promptCard/PromptCardList";

export type Post = {
  _id: string;
  userId: string;
  prompt: string;
  tag: string;
  creator: {
    _id: string;
    username: string;
    email: string;
    image: string;
  };
};

const Feed = () => {
  const [SearchText, setSearchText] = useState("");
  const [posts, setPosts] = useState<Post[]>([]);
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearchText(e.target.value);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();
      if (response.ok) {
        setPosts(data);
      }
    };
    fetchPosts();
  }, []);

  return (
    <section className="feed">
      <form className="feed__form">
        <input
          className="feed__searchBar"
          type="search"
          placeholder="Search for a tag or a username"
          value={SearchText}
          onChange={handleSearchChange}
          required
        />
      </form>
      <PromptCardList data={posts} handleTagClick={() => {}} />
    </section>
  );
};

export default Feed;
