import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from "config";
import clientPromise from "lib/mongodb";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export default async function auth(req, res) {
  return await NextAuth(req, res, {
    jwt: {
      secret: "not-important-yet",
    },
    session: {
      jwt: true,
      maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    providers: [
      // @ts-expect-error
      Google({
        clientId: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
      }),
    ],
    adapter: MongoDBAdapter({
      db: (await clientPromise).db("radio"),
    }),
  });
}
