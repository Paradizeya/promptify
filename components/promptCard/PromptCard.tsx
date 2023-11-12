"use client";

import Image from "next/image";
import { useState } from "react";
import { useSession } from "next-auth/react";

import type { Post } from "@/components/feed/Feed";
type Props = {
  post: Post;
  handleTagClick: () => void;
};

const PromptCard = ({ post, handleTagClick }: Props) => {
  const [copied, setCopied] = useState("");
  const session = useSession();

  return (
    <article className="promptCard">
      <div className="promptCard__header">
        <div className="promptCard__userInfo">
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
          <div>
            <h3 className="promptCard__title">{post.creator.username}</h3>
            <span className="promptCard__subTitle">{post.creator.email}</span>
          </div>
        </div>

        <div className="promptCard__actions">
          {session.data?.user.id === post.creator._id && (
            <>
              <Image
                src={
                  copied === post.prompt
                    ? "/assets/icons/tick.svg"
                    : "/assets/icons/copy.svg"
                }
                alt={copied === post.prompt ? "tick_icon" : "copy_icon"}
                width={20}
                height={20}
              />
              <Image
                src={"/assets/icons/edit.svg"}
                alt="edit_icon"
                width={20}
                height={20}
              />
            </>
          )}
          <Image
            src={"/assets/icons/delete.svg"}
            alt="delete_icon"
            width={22}
            height={22}
          />
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
