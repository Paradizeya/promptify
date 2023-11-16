import getUser from "@/app/services/getUser";
import getUserPosts from "@/app/services/getUserPosts";
import PromptCardList from "@/components/promptCard/PromptCardList";
//import { authConfig } from "@/app/configs/auth";
//import { getServerSession } from "next-auth/next";
import NotFoundPage from "@/app/not-found";

const ProfilePage = async ({ params }: { params: { id: string } }) => {
  //const session = await getServerSession(authConfig);
  //const isMyProfile = session?.user.id === params.id ? true : false;
  const isMyProfile = false;

  const user = await getUser(params.id);
  const posts = await getUserPosts(params.id);
  
  const handleEdit = async (id: string) => {
    "use server";
    console.log(id);
  };

  const handleDelete = async (id: string) => {
    "use server";
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_BASE_URL + `/api/prompt/${id}`,
        {
          method: "DELETE",
        }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  if (user !== null) {
    return (
      <section className="profile">
        <h1 className="profile__title">
          {isMyProfile ? `My Profile` : `${user.username}'s Profile`}
        </h1>
        <PromptCardList
          data={posts}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      </section>
    );
  } else {
    return <NotFoundPage error="This user does not exists" />;
  }
};

export default ProfilePage;
