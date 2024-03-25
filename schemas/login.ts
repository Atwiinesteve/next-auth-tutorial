import { z } from "zod";

export const loginFormSchema = z.object({
	email: z.string().email({ message: "Email must be valid" }),
	password: z
		.string()
		.min(6, { message: "Password must be 6 characters long" })
		.max(100),
});
