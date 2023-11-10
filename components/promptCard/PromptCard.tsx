type Props = {
  post: { _id: string; userId: string; prompt: string; tag: string };
  handleTagClick: any;
};

const PromptCard = ({ post, handleTagClick }: Props) => {
  return (
    <article className="promptCard">
      <p className="promptCard__body">{post.prompt}</p>
    </article>
  );
};

export default PromptCard;
