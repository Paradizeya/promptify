import type User from "@/types/User";

const getUser = async (id: string): Promise<User> => {
  const response = await fetch(process.env.URL + `/api/user/${id}`, {
    next: { revalidate: 1, tags: [`${id}`] },
  });
  const data = await response.json();
  if (response.ok) {
    if (data[0]) {
      return data[0];
    } else {
      throw new Error("User not found");
    }
  }
  throw new Error("Error fetching user data");
};

export default getUser;
