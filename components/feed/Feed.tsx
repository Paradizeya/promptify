"use client";

import { useState, useEffect, FormEvent } from "react";
import PromptCard from "@/components/promptCard/PromptCard";

type Post = {
  _id: string;
  userId: string;
  prompt: string;
  tag: string;
};

const PromptCardList = ({
  data,
  handleTagClick,
}: {
  data: Post[];
  handleTagClick: any;
}) => {
  return (
    <div className="feed__listWrapper">
      {data && data.map((post) => {
        return (
          <PromptCard
            key={post._id}
            post={post}
            handleTagClick={handleTagClick}
          />
        );
      })}
    </div>
  );
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
      if(!response.ok){
        data = [];
      }
      setPosts(data);
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
