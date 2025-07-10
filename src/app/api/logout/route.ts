import dbConnect from "@/db/db";
import User from "@/models/user.model";
import { getDataToken } from "@/utils/getTokenData";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const tokenId = await getDataToken(request);

  if (!tokenId) {
    return NextResponse.json(
      {
        success: false,
        message: "Unauthorized Request",
      },
      { status: 401 }
    );
  }

  try {
    await dbConnect();

    const id = new mongoose.Types.ObjectId(tokenId);

    const user = await User.findById(id);

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 400 }
      );
    }

    const verifyUser: boolean = tokenId == user._id.toString();

    if (!verifyUser) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized user",
        },
        { status: 401 }
      );
    }

    const response = NextResponse.json(
      {
        success: true,
        message: "Log Out successfully",
      },
      { status: 200 }
    );

    response.cookies.set("token", "");

    return response;
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: "Error in Logging Out",
        errorMessage: error.message,
      },
      { status: 500 }
    );
  }
}
