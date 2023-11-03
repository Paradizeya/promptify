"use client";

import Link from "next/dist/client/link";
import { Image } from "next/dist/client/image-component";

import MobileNav from "./MobileNav";
import DesktopNav from "./DesktopNav";

import { useState, useEffect } from "react";
import { useSession, getProviders } from "next-auth/react";
import type { ClientSafeProvider, LiteralUnion } from "next-auth/react";
import { BuiltInProviderType } from "next-auth/providers/index";

import { Pacifico } from "next/font/google";
const font = Pacifico({
  weight: ["400"],
  subsets: ["latin", "cyrillic"],
});

export type GetProviderResponse = Record<
  LiteralUnion<BuiltInProviderType, string>,
  ClientSafeProvider
> | null;

const Nav = () => {
  const [providers, setProviders] = useState<GetProviderResponse>(null);

  useEffect(() => {
    const getProvidersList = async () => {
      const response = await getProviders();
      setProviders(response);
    };
    getProvidersList();
  }, []);

  const session = useSession();

  return (
    <nav className="headerNav">
      <Link href={"/"} className="headerNav__logo">
        <Image
          className="headerNav__logo__image"
          src={"/assets/images/logo.svg"}
          alt="Promptify Logo"
          width={30}
          height={30}
        />
        <span className={`${font.className} headerNav__logo__text`}>
          Promptify
        </span>
      </Link>

      <DesktopNav
        providers={providers}
        isLogged={session.data ? true : false}
        profilePicture={
          session?.data?.user?.image
            ? session.data.user.image
            : "/assets/images/profile.svg"
        }
      />
      <MobileNav
        providers={providers}
        isLogged={session.data ? true : false}
        profilePicture={
          session?.data?.user?.image
            ? session.data.user.image
            : "/assets/images/profile.svg"
        }
      />
    </nav>
  );
};

export default Nav;
