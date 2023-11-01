import Link from "next/dist/client/link";
import { Image } from "next/dist/client/image-component";
import type { GetProviderResponse } from "./Nav";

import { signIn, signOut } from "next-auth/react";

type Props = {
  isLogged: boolean;
  providers: GetProviderResponse;
  profilePicture: string;
};

const DesktopNav = ({ isLogged, providers, profilePicture }: Props) => {
  return (
    <div className="headerNav__desktop">
      {isLogged ? (
        <div className="headerNav__desktop__loggedMenu">
          <Link href={"/create-prompt"} className="primary-btn">
            Create
          </Link>

          <button onClick={() => signOut()} className="secondary-btn">
            Sign Out
          </button>

          <Link href={"/profile"} className="headerNav__profilePicture">
            <Image
              src={profilePicture}
              alt="Profile picture"
              width={37}
              height={37}
            />
          </Link>
        </div>
      ) : (
        <>
          {providers &&
            Object.values(providers).map((provider) => {
              return (
                <button
                  className="primary-btn"
                  key={provider.name}
                  onClick={() => signIn(provider.id)}
                >
                  Sign In with {provider.name}
                </button>
              );
            })}
        </>
      )}
    </div>
  );
};

export default DesktopNav;
