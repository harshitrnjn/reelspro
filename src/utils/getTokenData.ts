import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getDataToken = async (request: NextRequest) => {
  try {
    const token = request.cookies.get("token")?.value;

    if (!token) {
      throw new Error("Unauthorized User");
    }

    const decodedToken: any = jwt.verify(token, process.env.TOKEN_SECERET!);

    if (!decodedToken) {
      throw new Error("Error in verifying the token");
    }

    console.log(decodedToken);

    return decodedToken._id;
  } catch (error: any) {
    console.log("Error fetching cookies");
  }
};
