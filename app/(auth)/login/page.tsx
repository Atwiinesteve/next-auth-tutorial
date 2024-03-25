"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { signIn, useSession } from "next-auth/react";
import { loginFormSchema } from "@/schemas/login";

export default function Login() {
	const session = useSession();
	const router = useRouter();
	const {
		register,
		formState: { errors },
	} = useForm();
	const form = useForm<z.infer<typeof loginFormSchema>>({
		resolver: zodResolver(loginFormSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onSubmit = async (data: z.infer<typeof loginFormSchema>) => {
		signIn("credentials", { ...data, redirect: false })
			.then((callback) => {
				if (callback?.error) {
					toast.error(callback.error);
				}
				if (
					callback?.ok ||
					!callback?.error ||
					session?.status === "authenticated"
				) {
					toast.success("User has logged in successfully");
					router.push("/dashboard");
				} else {
					toast.success("User not logged in");
					router.push("/login");
				}
			})
			.catch((error) => toast.error(error));
	};

	return (
		<div className="w-full h-full flex items-center justify-center mx-auto">
			<div className="border p-5 shadow-xl w-[450px]">
				<h1 className="font-bold text-2xl my-5 text-center">
					{" "}
					<span className="text-white font-extrabold italic p-2 bg-blue-900 ">
						Welcome back
					</span>{" "}
					Login to your account
				</h1>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="font-bold text-[17px]">Email</FormLabel>
									<FormControl>
										<Input type="email" {...field} {...register} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="font-bold text-[17px]">
										Password
									</FormLabel>
									<FormControl>
										<Input type="password" {...field} {...register} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button
							type="submit"
							className="rounded-none w-full font-bold text-[16px] tracking-wider">
							Login
						</Button>
					</form>
				</Form>
			</div>
		</div>
	);
}
