"use client";
import "./styles.scss";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import PromptCardList from "@/components/promptCard/PromptCardList";

import SearchForm from "@/components/feed/SearchForm";
import Post from "@/types/Post";

const Feed = ({ posts }: { posts: Post[] | null }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams.get("search");
  const tag = searchParams.get("tag");
  const [displayPosts, setDisplayPosts] = useState(posts);

  useEffect(() => {
    //Filtering function
    //Filter by tag if exists
    //Else filter by search param if it exists
    //Otherwise no filter => display original posts
    if (posts !== null) {
      if (tag !== null) {
        const result = posts.filter((post) => {
          return post.tag.includes(tag);
        });
        setDisplayPosts(result);
      } else if (search !== null) {
        const result = posts.filter((post) => {
          const usernameMatch = post.creator.username
            .toLocaleLowerCase()
            .includes(search);
          const tagMatch = post.tag.toLocaleLowerCase().includes(search);
          const promptMatch = post.prompt.toLocaleLowerCase().includes(search);
          return usernameMatch || tagMatch || promptMatch;
        });
        setDisplayPosts(result);
      } else {
        setDisplayPosts(posts);
      }
    }
  }, [posts, search, tag]);

  const handleTagClick = (tag: string) => {
    router.push(`?tag=${tag}`);
  };

  return (
    <section className="feed">
      <SearchForm />
      {displayPosts !== null && (
        <PromptCardList data={displayPosts} handleTagClick={handleTagClick} />
      )}
    </section>
  );
};

export default Feed;
