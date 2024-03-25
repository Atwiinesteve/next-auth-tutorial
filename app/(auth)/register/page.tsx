"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { toast } from "sonner";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import React from "react";
import { registerFormSchema } from "@/schemas/register";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Register() {
	const router = useRouter();
	const {
		register,
		formState: { errors },
	} = useForm();
	const form = useForm<z.infer<typeof registerFormSchema>>({
		resolver: zodResolver(registerFormSchema),
		defaultValues: {
			name: "",
			email: "",
			password: "",
		},
	});

	const onSubmit = (data: z.infer<typeof registerFormSchema>) => {
		axios
			.post("/api/register", data, {
				headers: { "Content-Type": "application/json" },
			})
			.then(() => {
				toast.success("User has been registered successfully.");
			})
			.then(() => router.push("/login"))
			.catch((error) => toast.error(error));
	};

	return (
		<div className="w-full h-full flex items-center justify-center mx-auto">
			<div className="border p-5 shadow-xl w-[450px]">
				<h1 className="font-bold text-2xl my-5 text-center">
					{" "}
					<span className="text-white font-extrabold italic p-2 bg-blue-900 ">
						Register
					</span>{" "}
					to experience more with us
				</h1>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="font-bold text-[17px]">Name</FormLabel>
									<FormControl>
										<Input type="text" {...field} {...register} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
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
						<Button className="rounded-none w-full font-bold text-[16px] tracking-wider">
							Register
						</Button>
					</form>
				</Form>
			</div>
		</div>
	);
}
