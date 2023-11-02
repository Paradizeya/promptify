import Link from "next/dist/client/link";
import { Image } from "next/dist/client/image-component";
import type { GetProviderResponse } from "./Nav";
import { CSSTransition } from "react-transition-group";

import { signOut } from "next-auth/react";
import { useState, useRef } from "react";
import SignInDropDownMenu from "./SignInDropDownMenu";
import useOutsideClick from "@/hooks/useOutsideClick";

type Props = {
  isLogged: boolean;
  providers: GetProviderResponse;
  profilePicture: string;
};

const MobileNav = ({ isLogged, providers, profilePicture }: Props) => {
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const transitionNodeRef = useRef(null);
  useOutsideClick(() => setToggleDropdown(false), transitionNodeRef);

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

          <CSSTransition
            in={toggleDropdown}
            timeout={300}
            unmountOnExit
            classNames="transitionDropDown"
            nodeRef={transitionNodeRef}
          >
            <div
              className="headerNav__mobile__dropdown"
              ref={transitionNodeRef}
            >
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
          </CSSTransition>
        </div>
      ) : (
        <SignInDropDownMenu providers={providers} />
      )}
    </div>
  );
};

export default MobileNav;
