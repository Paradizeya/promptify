import { signIn } from "next-auth/react";
import type { GetProviderResponse } from "./Nav";
import { CSSTransition } from "react-transition-group";
import { Image } from "next/dist/client/image-component";

import { useState, useRef } from "react";
import useOutsideClick from "@/hooks/useOutsideClick";

type Props = {
  providers: GetProviderResponse;
};

const SignInDropDownMenu = ({ providers }: Props) => {
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const transitionNodeRef = useRef(null);
  useOutsideClick(() => setToggleDropdown(false), transitionNodeRef);

  return (
    <div className="signInMenu">
      <button
        className="signInMenu__header primary-btn"
        onClick={() => setToggleDropdown((prev) => !prev)}
      >
        Sign In
      </button>
      <CSSTransition
        in={toggleDropdown}
        timeout={300}
        unmountOnExit
        classNames="transitionDropDown"
        nodeRef={transitionNodeRef}
      >
        <div className="signInMenu__body" ref={transitionNodeRef}>
          {providers &&
            Object.values(providers).map((provider) => {
              return (
                <button
                  className="primary-btn signInMenu__providerButton"
                  key={provider.name}
                  onClick={() => {
                    signIn(provider.id);
                    setToggleDropdown(false);
                  }}
                >
                  <Image
                    className="signInMenu__providerIcon"
                    src={`/assets/icons/${provider.name.toLocaleLowerCase()}.svg`}
                    alt="Logo"
                    width={20}
                    height={20}
                  />
                  Sign In with {provider.name}
                </button>
              );
            })}
        </div>
      </CSSTransition>
    </div>
  );
};

export default SignInDropDownMenu;
