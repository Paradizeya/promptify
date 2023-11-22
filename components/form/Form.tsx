import Link from "next/link";
import React, { Dispatch, SetStateAction, FormEvent } from "react";

type Post = {
  prompt: string;
  tag: string;
};
type Props = {
  type: string;
  post: Post;
  setPost: Dispatch<SetStateAction<Post>>;
  isLoading: boolean;
  handleSubmit: (e: FormEvent) => void;
};

const Form = ({ type, post, setPost, isLoading, handleSubmit }: Props) => {
  return (
    <form onSubmit={handleSubmit} className="form" action="">
      <label htmlFor="promptInput" className="form__textareaLabel">
        <h2 className="form__inputName">{type} Your AI Prompt</h2>
        <textarea
          value={post.prompt}
          onChange={(e) => setPost({ ...post, prompt: e.target.value })}
          className="form__input"
          id="promptInput"
          placeholder="Write your post here"
          rows={10}
          cols={50}
          required
          disabled={isLoading}
        />
      </label>

      <label htmlFor="tagInput" className="form__inputLabel">
        <h2 className="form__inputName">
          Tag{" "}
          <span className="smallText">
            (#product, #webdevelopment, #idea, etc.)
          </span>
        </h2>
        <input
          value={post.tag}
          onChange={(e) => setPost({ ...post, tag: e.target.value })}
          className="form__input"
          id="tagInput"
          type="text"
          placeholder="#Tag"
          required
          disabled={isLoading}
        />
      </label>

      <div className="form__buttonsPanel">
        <button type="submit" disabled={isLoading} className="action-btn">
          {isLoading ? `Loading...` : type}
        </button>

        <Link className="secondary-btn" href="/">
          Cancel
        </Link>
      </div>
    </form>
  );
};

export default Form;
