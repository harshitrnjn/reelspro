import dbConnect from "@/db/db";
import Video from "@/models/video.model";
import { getDataToken } from "@/utils/getTokenData";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const session = await getDataToken(request)

    if (!session) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized Request",
        },
        { status: 401 }
      );
    }

    await dbConnect();

    const { title, description, videoUrl, thumbnailUrl, controls, quality } = await request.json();

    if (!title || !description || !videoUrl || !thumbnailUrl) {
      return NextResponse.json(
        {
          success: false,
          message: "Fields are missing",
        },
        { status: 400 }
      );
    }

    const videoData = {
      title,
      description,
      videoUrl,
      thumbnailUrl,
      controls: controls || true,
      videoDimensions: {
        height: 1920,
        width: 1080,
        quality: quality || 100
      }
    };

     const newVideo = await Video.create(videoData);

     if(!newVideo){
        return NextResponse.json({ 
            success: false,
            message: "Error uploading video"
         }, { status: 400 })
     }

     return NextResponse.json({
        success: true,
        message: "Video uploaded successfully",
        videoDetails: newVideo
     }, { status: 200 })

  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: "Error while uploading the video || Internal server error",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await dbConnect();

    const videos = await Video.find({}).sort({ createdAt: -1 }).lean();

    if (!videos || videos.length == 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Error while fetching videos, empty array returned",
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Videos fetched successfully",
        videos: videos,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: "Error while fetching videos",
      },
      { status: 500 }
    );
  }
}
