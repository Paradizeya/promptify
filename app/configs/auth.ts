import type { AuthOptions, User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import DiscordProvider from "next-auth/providers/discord";
import Credentials from "next-auth/providers/credentials";
import { users } from "@/data/users";

export const authConfig: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
    }),
    Credentials({
      credentials: {
        email: { label: "email", type: "email", required: true },
        password: { label: "password", type: "password", required: true },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null;

        const CurrentUser = users.find(
          (user) => user.email === credentials.email
        );

        if (CurrentUser && CurrentUser.password === credentials.password) {
          const { password, ...UserWithoutPass } = CurrentUser;
          return UserWithoutPass;
        }

        return null;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET!,
  // pages: {
  //   signIn: "/signin",
  // },
};
