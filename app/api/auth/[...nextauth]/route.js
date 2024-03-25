import NextAuth from "next-auth/next";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";

import bcryptjs from "bcryptjs";

import db from "@/db/db";

export const authOptions = {
	adapter: PrismaAdapter(db),
	secret: process.env.SECRET,
	session: {
		strategy: "jwt",
	},
	debug: process.env.NODE_ENV === "development",
	providers: [
		CredentialsProvider({
			name: "credentials",
			credentials: {
				username: {
					label: "Username",
					type: "text",
					placeholder: "StevGoesCoding",
				},
				email: {
					label: "Email",
					type: "email",
					placeholder: "stephenkiiza123@gmail.com",
				},
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
				// check to see if email and password are there.
				if(!credentials.email || !credentials.password) {
					throw new Error('Email and Password are required..')
				}

				// check if user exists
				const user = await db.user.findUnique({
					where: {
						email: credentials.email
					}
				})

				// if not user was found.
				if(!user || !user?.hashedPassword) {
					throw new Error("No user found")
				}

				// if user exists, match password
				const matchPassword = await bcryptjs.compare(credentials.password, user.hashedPassword)

				// if passwords do not match
				if(!matchPassword) {
					throw new Error("Incorrect Password")
				}

				return user;
			},
		}),
	],
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
