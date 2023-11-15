import type Post from "@/types/Post";
import PromptCard from "./PromptCard";

const PromptCardList = ({
  data,
  handleTagClick,
}: {
  data: Post[];
  handleTagClick?: (tag: string) => void;
}) => {
  return (
    <div className="promptListWrapper">
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
