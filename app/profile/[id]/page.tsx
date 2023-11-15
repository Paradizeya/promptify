import getUser from "@/app/services/getUser";
import getUserPosts from "@/app/services/getUserPosts";
import PromptCardList from "@/components/promptCard/PromptCardList";
import { authConfig } from "@/app/configs/auth";
import { getServerSession } from "next-auth/next";

const ProfilePage = async ({ params }: { params: { id: string } }) => {
  const session = await getServerSession(authConfig);
  const isMyProfile = session?.user.id === params.id ? true : false;

  const posts = await getUserPosts(params.id);
  const user = await getUser(params.id);

  return (
    <section className="profile">
      <h1 className="profile__title">
        {isMyProfile ? `My Profile` : `${user.username}'s Profile`}
      </h1>
      <PromptCardList data={posts} />
    </section>
  );
};

export default ProfilePage;
