import type Post from "@/types/Post";

const getPosts = async (): Promise<Post[]> => {
  const response = await fetch(
    process.env.NEXT_PUBLIC_BASE_URL + "/api/prompt",
    {
      next: { revalidate: 10000, tags: ["allPosts"] },
    }
  );
  const data = await response.json();
  if (response.ok) {
    return data;
  }
  return [];
};

export default getPosts;
