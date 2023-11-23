import type Post from "@/types/Post";
import PromptCard from "./PromptCard";
import "./styles.scss";

type Props = {
  data: Post[];
  handleTagClick?: (tag: string) => void;
  handleDelete?: (id: string) => void;
  handleEdit?: (id: string) => void;
};

const PromptCardList = ({
  data,
  handleTagClick,
  handleDelete,
  handleEdit,
}: Props) => {
  return (
    <div className="promptListWrapper">
      {data &&
        data.map((post) => {
          return (
            <PromptCard
              key={post._id}
              post={post}
              handleTagClick={handleTagClick}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          );
        })}
    </div>
  );
};

export default PromptCardList;
