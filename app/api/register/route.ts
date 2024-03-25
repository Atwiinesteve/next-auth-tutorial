import bcryptjs from "bcryptjs";
import db from "@/db/db";
import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
	const body = await request.json();
	const { name, email, password } = body;

	if (!name || !email || !password) {
		return new NextResponse("Missing Fields", { status: 400 });
	}

    const userExists = await db.user.findUnique({
        where: {
            email: email
        }
    });

    if(userExists) {
        throw new Error("User with that emai already exists.")
    };

    const hashedPassword = await bcryptjs.hash(password, 13);

    const user = await db.user.create({
        data: {
            name,
            email,
            hashedPassword
        }
    });

    return NextResponse.json(user)
}
