import PromptCardList from "@/components/promptCard/PromptCardList";
import getPosts from "@/app/services/getPosts";
import SearchForm from "@/components/feed/SearchForm";

const Feed = async () => {
  const posts = await getPosts();
  return (
    <section className="feed">
      <SearchForm />
      <PromptCardList data={posts} />
    </section>
  );
};

export default Feed;
