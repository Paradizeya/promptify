import Link from "next/dist/client/link";
import { Image } from "next/dist/client/image-component";
import type { GetProviderResponse } from "./Nav";
import { signOut } from "next-auth/react";
import SignInDropDownMenu from "./SignInDropDownMenu";

type Props = {
  isLogged: boolean;
  providers: GetProviderResponse;
  profilePicture: string;
  pathnameIsCreate: boolean;
};

const DesktopNav = ({
  isLogged,
  providers,
  profilePicture,
  pathnameIsCreate,
}: Props) => {
  return (
    <div className="headerNav__desktop">
      {isLogged ? (
        <div className="headerNav__desktop__loggedMenu">
          {!pathnameIsCreate && (
            <Link href={"/create-prompt"} className="primary-btn">
              Create
            </Link>
          )}
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="secondary-btn"
          >
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
        <SignInDropDownMenu providers={providers} />
      )}
    </div>
  );
};

export default DesktopNav;
