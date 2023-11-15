import Post from "@/types/Post";

const getUserPosts = async (id: string): Promise<Post[]> => {
  const response = await fetch(
    process.env.NEXT_PUBLIC_BASE_URL?.toString() + `/api/user/${id}/posts`,
    {
      next: { revalidate: 10000, tags: [`${id}_posts`] },
    }
  );
  const data = await response.json();
  if (response.ok) {
    return data;
  }
  return [];
};

export default getUserPosts;
