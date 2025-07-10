import dbConnect from "@/db/db";
import User, { IUser } from "@/models/user.model";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(request: NextResponse) {
  const { identifier, password }: { identifier: string; password: string } =
    await request.json();

  if (!identifier || !password) {
    return NextResponse.json(
      {
        success: false,
        message: "Either of the field is missing",
      },
      { status: 400 }
    );
  }

  await dbConnect();

  try {
    const user = await User.findOne(
      {
        $or: [{ email: identifier }, { username: identifier }],
      }
    ).select("+password");

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User does not exists",
        },
        { status: 400 }
      );
    }

    const verificationPassword = await bcrypt.compare(password, user.password!);

    if (!verificationPassword) {
      return NextResponse.json(
        {
          success: false,
          message: "Password is incorrect",
        },
        { status: 400 }
      );
    }

    const token = jwt.sign(
      {
        _id: user._id,
      },
      process.env.TOKEN_SECERET!,
      {
        expiresIn: "1d",
      }
    );

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message: "Error generating the token",
        },
        { status: 400 }
      );
    }

    const response = NextResponse.json(
      {
        success: true,
        message: "User logged in successfully",
      },
      { status: 200 }
    );

    response.cookies.set("token", token);

    return response;
  } catch (error: any) {
    console.log("LOGIN ERROR");
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        error: "Log In Error",
        message: error?.message,
      },
      { status: 500 }
    );
  }
}
