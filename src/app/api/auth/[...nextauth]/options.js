import dotenv from "dotenv";
dotenv.config();

import connectDB from "@/models/connect.db";
import User from "@/models/user";
import { cookies } from "next/headers";
import { sign } from "@/lib/jwt";

import GoogleProvider from "next-auth/providers/google";
import TwitterProvider from "next-auth/providers/twitter";
import { current } from "@reduxjs/toolkit";

const options = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    TwitterProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        await connectDB();

        const cookiesData = cookies();

        // settingCookies
        const token = sign({
          email: user.email,
          name: user.name,
          isVerified: true,
        });

        if (user.email) {
          const doestUserExists = await User.findOne({ email: user.email });
          if (!doestUserExists) {
            const newUser = new User({
              name: user.name,
              email: user.email,
              profile_image: user.image,
            });

            console.log(await newUser.save());
          }

          cookiesData.set("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 60 * 60 * 24 * 7,
            path: "/",
          });
        } else {
          console.log("User not found :");
          // console.log(user, account, profile);
          return false;
        }

        return true;
      } catch (error) {
        console.log("Error in signIn", error.message);
        return false;
      }
    },
    session: async ({ session, token }) => {
      if (token) {
        session.user._id = token._id;
        session.user.isVerified = token.isVerified;
        session.user.email = token.email;
        session.user.name = token.name;
      }
      return session;
    },
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id.toString();
        token.isVerified = user.isVerified;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    async redirect({ url, baseUrl }) {
      // redirecting on /dashboard page after login
      return baseUrl + "/dashboard";
    },
  },
  pages: {
    signIn: "/register/signup",
  },
  session: {
    statergy: "jwt",
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
};

export default options;
