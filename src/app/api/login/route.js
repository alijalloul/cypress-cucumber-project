import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import db from "@/db/db";

const JWT_SECRET = process.env.JWT_SECRET;

async function login(email, password) {
  const user = await db.user.findUnique({ where: { email } });

  if (!user) return null;

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return null;

  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "1h" });

  return token;
}

export async function POST(request) {
  const { email, password } = await request.json();

  try {
    const token = await login(email, password);

    if (token) {
      console.log("token: ");

      return new NextResponse("Login successful", {
        status: 200,
        headers: {
          "Set-Cookie": `token=${token}; Path=/; Max-Age=${60 * 60}`,
        },
      });
    } else {
      return NextResponse.json(
        { error: "Invalid credentials" },
        {
          status: 401,
        }
      );
    }
  } catch (error) {
    console.log("error: ", error);

    return new NextResponse("Login failed", { status: 400 });
  }
}
