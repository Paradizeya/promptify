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
  isSubmitting: boolean;
  handleSubmit: (e: FormEvent) => void;
};

const Form = ({ type, post, setPost, isSubmitting, handleSubmit }: Props) => {
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
          required
          rows={10}
          cols={50}
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
        />
      </label>

      <div className="form__buttonsPanel">
        <button type="submit" disabled={isSubmitting} className="action-btn">
          {isSubmitting ? `Submitting...` : type}
        </button>

        <Link className="secondary-btn" href="/">
          Cancel
        </Link>
      </div>
    </form>
  );
};

export default Form;
