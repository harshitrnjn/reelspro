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
        error: "Unauthorized Request",
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
          message: "Unauthorized user",
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "User fetched successfully",
        user: user,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.log(error.message);

    return NextResponse.json(
      {
        message: "Profile fetch error",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
