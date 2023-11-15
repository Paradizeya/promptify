import getUser from "@/app/services/getUser";
import getUserPosts from "@/app/services/getUserPosts";
import PromptCardList from "@/components/promptCard/PromptCardList";

const ProfilePage = async ({ params }: { params: { id: string } }) => {
  const isMyProfile = false;

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
