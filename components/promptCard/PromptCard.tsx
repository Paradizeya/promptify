"use client";

import Image from "next/image";
import { useState } from "react";

import type { Post } from "@/components/feed/Feed";
type Props = {
  post: Post;
  handleTagClick: () => void;
};

const PromptCard = ({ post, handleTagClick }: Props) => {
  const [isCopied, setIsCopied] = useState(false);

  return (
    <article className="promptCard">
      <div className="promptCard__header">
        <Image
          className="promptCard__avatar"
          height={40}
          width={40}
          src={
            post.creator.image
              ? post.creator.image
              : "/assets/images/profile.svg"
          }
          alt="avatar"
        />
        <div className="promptCard__userInfo">
          <h3 className="promptCard__title">{post.creator.username}</h3>
          <span className="promptCard__subTitle">{post.creator.email}</span>
        </div>
      </div>

      <div className="promptCard__body">
        <p className="promptCard__post">{post.prompt}</p>
        <a className="promptCard__tag">{post.tag}</a>
      </div>
    </article>
  );
};

export default PromptCard;
