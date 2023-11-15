import Post from "@/types/Post";

const getUserPosts = async (id: string): Promise<Post[]> => {
  const response = await fetch(process.env.URL + `/api/user/${id}/posts`, {
    next: { revalidate: 1, tags: [`${id}_posts`] },
  });
  const data = await response.json();
  if (response.ok) {
    return data;
  }
  return [];
};

export default getUserPosts;
