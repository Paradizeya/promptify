"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const ProfilePage = () => {
  const router = useRouter();
  const session = useSession();
  useEffect(() => {
    router.push(`/profile/${session?.data?.user.id}`);
  }, [session.data?.user.id]);

  return <></>;
};

export default ProfilePage;
