"use client";
import { FormEvent, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Form from "@/components/form/Form";

const CreatePage = () => {
  const session = useSession();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [post, setPost] = useState({ prompt: "", tag: "" });

  const createPrompt = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch("api/prompt/new", {
        method: "POST",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
          userId: session?.data?.user.id,
        }),
      });
      if (response.ok) {
        router.push("/");
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
        <h1 className="create__title">Create Prompt</h1>
        <p className="create__desc">
          Create and share amazing prompts with the world, and let your
          imagination run wild with any AI-powered platform
        </p>
      </div>
      <Form
        type={"Create"}
        post={post}
        setPost={setPost}
        isLoading={isLoading}
        handleSubmit={createPrompt}
      />
    </section>
  );
};

export default CreatePage;
