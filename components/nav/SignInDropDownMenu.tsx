import { signIn } from "next-auth/react";
import type { GetProviderResponse } from "./Nav";

import { useState } from "react";

type Props = {
  providers: GetProviderResponse;
};

const SignInDropDownMenu = ({ providers }: Props) => {
  const [toggleDropdown, setToggleDropdown] = useState(false);

  return (
    <div className="signInMenu">
      <button
        className="signInMenu__header primary-btn"
        onClick={() => setToggleDropdown((prev) => !prev)}
      >
        Sign In
      </button>
      {toggleDropdown && (
        <div className="signInMenu__body">
          {providers &&
            Object.values(providers).map((provider) => {
              return (
                <button
                  className="primary-btn"
                  key={provider.name}
                  onClick={() => {
                    signIn(provider.id);
                    setToggleDropdown(false);
                  }}
                >
                  Sign In with {provider.name}
                </button>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default SignInDropDownMenu;
