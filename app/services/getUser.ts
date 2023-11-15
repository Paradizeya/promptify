import type User from "@/types/User";

const getUser = async (id: string): Promise<User | null> => {
  const response = await fetch(process.env.URL + `/api/user/${id}`, {
    next: { tags: [`${id}`] },
  });
  const data = await response.json();
  if (response.ok) {
    return data;
  }
  return null;
};

export default getUser;
