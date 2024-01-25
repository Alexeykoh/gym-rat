import connectMongoDB from "@/lib/mongodb";
import UserModel from "@/models/userModel";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import Credentials from "next-auth/providers/credentials";

export const authOption: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    Credentials({
      type: "credentials",
      credentials: {},
      authorize: async function (credentials, req) {
        // throw new Error("Function not implemented.");
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        await connectMongoDB();
        //
        const user = await UserModel.findOne({ email: email });
        if (!user) throw Error("email/password mismatch");
        const passwordMatch = await user.comparePassword(password);
        if (!password) throw Error("email/password mismatch");
        //
        return {
          name: user.name,
          email: user.email,
          role: user.role,
          id: user._id,
        };
      },
    }),
  ],
  callbacks: {
    jwt(params: any) {
      if (params.user?.role) {
        params.token.role = params.user.role;
        params.token.id = params.user.id;
      }
      return params.token;
    },
    session({ session, token }) {
      if (session.user) {
        (session.user as { id: string }).id = token.id as string;
        (session.user as { role: string }).role = token.role as string;
      }
      return session;
    },
  },
};
const authHandler = NextAuth(authOption);
export { authHandler as GET, authHandler as POST };