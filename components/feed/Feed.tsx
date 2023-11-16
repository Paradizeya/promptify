import PromptCardList from "@/components/promptCard/PromptCardList";

import SearchForm from "@/components/feed/SearchForm";
import Post from "@/types/Post";

const Feed = ({ posts }: { posts: Post[] | null }) => {
  return (
    <section className="feed">
      <SearchForm />
      {posts && <PromptCardList data={posts} />}
    </section>
  );
};

export default Feed;
