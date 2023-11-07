import type { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import DiscordProvider from "next-auth/providers/discord";
import Credentials from "next-auth/providers/credentials";

import { users as testUsersData } from "@/data/credentialsTestData";
import { connectToDB } from "@/utils/database";
import User from "@/models/user";

export const authConfig: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      // authorization: {
      //   params: {
      //     prompt: "consent",
      //     access_type: "offline",
      //     response_type: "code",
      //   },
      // },
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

        const CurrentUser = testUsersData.find(
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
  callbacks: {
    async signIn({ user }) {
      try {
        await connectToDB();
        //if user exists
        const userExists = await User.findOne({ email: user.email });
        //if not - create new one
        if (!userExists) {
          await User.create({
            email: user.email,
            username: user.name?.replaceAll(" ", "").toLowerCase(),
            image: user.image,
          });
        }

        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
    async session({ session }) {
      // store the user id from MongoDB to session
      const sessionUser = await User.findOne({ email: session?.user?.email });
      if (session.user && sessionUser) {
        //Get user data from DB to connect one email to multiple providers
        session.user.name = sessionUser.username;
        session.user.email = sessionUser.email;
        //session.user.image = sessionUser.image; //comment off to use img of current provider
        //save id in session
        session.user.id = sessionUser._id.toString();
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET!,
  // pages: {
  //   signIn: "/signin",
  // },
};
