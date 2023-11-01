import Link from "next/dist/client/link";
import { Image } from "next/dist/client/image-component";
import type { GetProviderResponse } from "./Nav";

import { signOut } from "next-auth/react";
import { useState } from "react";
import SignInDropDownMenu from "./SignInDropDownMenu";

type Props = {
  isLogged: boolean;
  providers: GetProviderResponse;
  profilePicture: string;
};

const MobileNav = ({ isLogged, providers, profilePicture }: Props) => {
  const [toggleDropdown, setToggleDropdown] = useState(false);

  return (
    <div className="headerNav__mobile">
      {isLogged ? (
        <div className="headerNav__mobile__loggedMenu">
          <div className="headerNav__profilePicture">
            <Image
              src={profilePicture}
              alt="Profile picture"
              width={37}
              height={37}
              onClick={() => setToggleDropdown((prev) => !prev)}
            />
          </div>

          {toggleDropdown && (
            <div className="headerNav__mobile__dropdown">
              <Link
                className="headerNav__mobile__dropdown__link"
                href={"/profile"}
                onClick={() => setToggleDropdown(false)}
              >
                My profile
              </Link>
              <Link
                className="headerNav__mobile__dropdown__link"
                href={"/create-prompt"}
                onClick={() => setToggleDropdown(false)}
              >
                Create
              </Link>
              <hr className="headerNav__mobile__dropdown__hr" />
              <button
                onClick={() => {
                  setToggleDropdown(false);
                  signOut();
                }}
                className="primary-btn"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      ) : (
        <SignInDropDownMenu providers={providers} />
      )}
    </div>
  );
};

export default MobileNav;
