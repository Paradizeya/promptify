"use client";
import { FormEvent, useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Form from "@/components/form/Form";
import Post from "@/types/Post";

const UpdatePage = () => {
  const session = useSession();
  const router = useRouter();
  const promptId = useSearchParams().get("id");

  const [isCreator, setIsCreator] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [post, setPost] = useState({ prompt: "", tag: "" });

  useEffect(() => {
    const getPrompt = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/prompt/${promptId}`);
        if (response.ok) {
          const data: Post = await response.json();
          setPost({
            prompt: data.prompt,
            tag: data.tag,
          });
          if (data.creator._id === session.data?.user.id) setIsCreator(true);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    if (promptId) getPrompt();
  }, [promptId]);

  const updatePrompt = async (e: FormEvent) => {
    e.preventDefault();
    if (!promptId) {
      alert("Missing prompt Id! You will be redirected to the home page.");
      return router.push("/");
    }
    if (isCreator !== true) {
      alert(
        "You are not the creator of this post! You will be redirected to the home page."
      );
      return router.push("/");
    }
    setIsLoading(true);
    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });
      if (response.ok) {
        router.push(`/profile/${session.data?.user.id}`);
        router.refresh();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="create">
      <div>
        <h1 className="create__title">Update Prompt</h1>
        <p className="create__desc">
          Update your prompt and share it with the world, let your imagination
          run wild with any AI-powered platform
        </p>
      </div>
      <Form
        type={"Update"}
        post={post}
        setPost={setPost}
        isLoading={isLoading}
        handleSubmit={updatePrompt}
      />
    </section>
  );
};

export default UpdatePage;
