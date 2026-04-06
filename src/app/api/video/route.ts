import dbConnect from "@/db/db";
import Video from "@/models/video.model";
import { getDataToken } from "@/utils/getTokenData";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const session = await getDataToken(request);

    if (!session) {
      return NextResponse.json(
        { success: false, message: "Unauthorized Request" },
        { status: 401 }
      );
    }

    await dbConnect();

    const body = await request.json();
    const { title, description, videoUrl, thumbnailUrl, controls, quality } = body;

    if (!title?.trim()) {
      return NextResponse.json(
        { success: false, message: "Title is required" },
        { status: 400 }
      );
    }

    if (!videoUrl?.startsWith("http")) {
      return NextResponse.json(
        { success: false, message: "Invalid video URL" },
        { status: 400 }
      );
    }

    const videoData = {
      title,
      description,
      videoUrl,
      thumbnailUrl,
      controls: controls ?? true,
      videoDimensions: {
        height: 1920,
        width: 1080,
        quality: quality ?? 100,
      },
      user: session.userId, // 🔥 important
    };

    const newVideo = await Video.create(videoData);

    return NextResponse.json(
      {
        success: true,
        message: "Video uploaded successfully",
        videoDetails: newVideo,
      },
      { status: 200 }
    );

  } catch (error: any) {
    console.error("UPLOAD ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await dbConnect();

    const videos = await Video.find({}).sort({ createdAt: -1 }).lean();

    return NextResponse.json(
      {
        success: videos.length > 0 ? true : false ,
        message: videos.length > 0 ? "Videos fetched successfully" : "No videos found",
        videos: videos,
      },
      { status: videos.length > 0 ? 200 : 400 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: "Error while fetching videos",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

