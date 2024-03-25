import { z } from "zod";

export const registerFormSchema = z.object({
	name: z
		.string()
		.min(6, { message: "Name must be 6 characters long" })
		.max(100),
	email: z.string().email({ message: "Email must be valid" }),
	password: z
		.string()
		.min(6, { message: "Password must be 6 characters long" })
		.max(100),
});
