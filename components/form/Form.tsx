import Link from "next/link";
import React from "react";

type Props = {};

const Form = ({}: Props) => {
  return (
    <form className="form" action="">
      <label htmlFor="promptInput">
        <h2 className="form__inputName">Your AI Prompt</h2>
        <textarea
          className="form__input"
          id="promptInput"
          placeholder="Write your post here"
          required
          rows={10}
          cols={50}
        />
      </label>

      <label htmlFor="tagInput">
        <h2 className="form__inputName">
          Tag{" "}
          <span className="smallText">
            (#product, #webdevelopment, #idea, etc.)
          </span>
        </h2>
        <input
          className="form__input"
          id="tagInput"
          type="text"
          placeholder="#Tag"
          required
        />
      </label>

      <div className="form__buttonsPanel">
        <button
          className="action-btn"
          type="submit"
          //disabled={submitting}
        >
          {/* {submitting ? `${type}ing...` : type} */} Button
        </button>

        <Link className="secondary-btn" href="/">
          Cancel
        </Link>
      </div>
    </form>
  );
};

export default Form;
