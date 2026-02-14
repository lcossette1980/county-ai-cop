import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { getAdminAuth } from "@/lib/firebase/admin";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        try {
          // Verify user exists in Firebase Auth
          const auth = getAdminAuth();
          const user = await auth.getUserByEmail(credentials.email);

          // For invite-only: admin users are pre-created in Firebase console.
          // We verify the password by attempting to sign in via the Firebase
          // REST API (since Admin SDK can't verify passwords directly).
          const response = await fetch(
            `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.NEXT_PUBLIC_FIREBASE_API_KEY}`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
                returnSecureToken: true,
              }),
            }
          );

          if (!response.ok) return null;

          return {
            id: user.uid,
            email: user.email,
            name: user.displayName || user.email?.split("@")[0],
          };
        } catch {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.uid = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as { uid?: string }).uid = token.uid as string;
      }
      return session;
    },
  },
};
