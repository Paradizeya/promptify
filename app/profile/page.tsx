import { getServerSession } from "next-auth";
import { authConfig } from "@/app/configs/auth";
import { redirect } from "next/navigation";

const ProfilePage = async () => {
  const data = await getServerSession(authConfig);
  redirect(`/profile/${data?.user.id}`);
  return <></>;
};

export default ProfilePage;
