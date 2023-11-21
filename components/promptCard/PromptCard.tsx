"use client";

import Image from "next/image";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

import type Post from "@/types/Post";
type Props = {
  post: Post;
  handleTagClick?: (tag: string) => void;
  handleDelete?: (id: string) => void;
  handleEdit?: (id: string) => void;
};

const PromptCard = ({
  post,
  handleTagClick,
  handleDelete,
  handleEdit,
}: Props) => {
  const [copied, setCopied] = useState("");
  const session = useSession();
  const router = useRouter();
  const pathName = usePathname();

  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied(""), 3000);
  };

  const handleLocalDelete = (id: string) => {
    const confirmDelete = confirm("Are you sure you want to delete this post?");
    if (confirmDelete && handleDelete) {
      handleDelete(post._id);
      router.refresh();
    }
  };

  return (
    <article className="promptCard">
      <div className="promptCard__header">
        <div className="promptCard__userInfo">
          <Image
            className={`promptCard__avatar ${
              !pathName.includes("/profile") && "promptCard__avatar_clickable"
            }`}
            height={40}
            width={40}
            src={
              post.creator.image
                ? post.creator.image
                : "/assets/images/profile.svg"
            }
            alt="avatar"
            onClick={() =>
              !pathName.includes("/profile") &&
              router.push(`/profile/${post.creator._id}`)
            }
          />
          <div>
            <h3 className="promptCard__title">{post.creator.username}</h3>
            <span className="promptCard__subTitle">{post.creator.email}</span>
          </div>
        </div>

        <div className="promptCard__actions">
          <Image
            src={
              copied === post.prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            alt={copied === post.prompt ? "tick_icon" : "copy_icon"}
            width={20}
            height={20}
            onClick={() => handleCopy()}
          />
          {session.data?.user.id === post.creator._id && pathName !== "/" && (
            <>
              <Image
                src={"/assets/icons/edit.svg"}
                alt="edit_icon"
                width={20}
                height={20}
                onClick={() =>
                  handleEdit
                    ? handleEdit(post._id)
                    : router.push(`/update-prompt?id=${post._id}`)
                }
              />
              <Image
                src={"/assets/icons/delete.svg"}
                alt="delete_icon"
                width={22}
                height={22}
                onClick={() => handleDelete && handleLocalDelete(post._id)}
              />
            </>
          )}
        </div>
      </div>

      <div className="promptCard__body">
        <p className="promptCard__post">{post.prompt}</p>
        <a
          className={`promptCard__tag ${
            !pathName.includes("/profile") && "promptCard__tag_clickable"
          }`}
          onClick={() => handleTagClick && handleTagClick(post.tag)}
        >
          #{post.tag}
        </a>
      </div>
    </article>
  );
};

export default PromptCard;
