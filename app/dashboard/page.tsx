"use client";

import React from "react";

import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

export default function Dashboard() {
	const session = useSession();
	return (
		<>
			<div>
				<h2>Welcome to your dashboard, {session.data?.user?.name}</h2>
				<Button onClick={() => signOut()}>Logout</Button>
			</div>
		</>
	);
}
