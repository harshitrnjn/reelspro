import { getUploadAuthParams } from "@imagekit/next/server";

export async function GET() {

    

  try {
    const { token, signature, expire } = getUploadAuthParams({
      privateKey: process.env.IMAGEKIT_PRIVATE_KEY as string,
      publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY as string,
    });
  
    return Response.json({
      token, signature, expire,
      publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY,
    });
  } catch (error: any) {
    console.log("Error in Authntication in ImageKit")
    return Response.json({
      error: "Error while Authenticating ImageKit"
    }, { status: 500 })
  }
}
