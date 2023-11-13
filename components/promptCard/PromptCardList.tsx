import type { Post } from "@/components/feed/Feed";
import PromptCard from "./PromptCard";

const PromptCardList = ({
  data,
  handleTagClick,
}: {
  data: Post[];
  handleTagClick?: (tag: string) => void;
}) => {
  return (
    <div className="feed__listWrapper">
      {data &&
        data.map((post) => {
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

export default PromptCardList;
