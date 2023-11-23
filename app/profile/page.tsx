"use client";

//This page redirects to current users profile

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Loading from "../loading";

const ProfilePage = () => {
  const session = useSession();
  const router = useRouter();
  useEffect(() => {
    router.replace(`/profile/${session?.data?.user.id}`);
  }, [session.data?.user.id, router]);

  return <Loading />;
};

export default ProfilePage;
