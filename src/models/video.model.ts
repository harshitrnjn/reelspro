import mongoose, { model, models, Schema } from "mongoose";

export const VIDEO_DIMENSIONS = {
    width: 1080,
    height: 1920
} as const;

export interface IVideo{
    title: string;
    description: string;
    videoUrl: string;
    thumbnailUrl: string;
    controls?: boolean;
    isPublic: boolean; 
    videoDimensions?:{
        height: number,
        width: number
    };
}

const videoSchema = new Schema<IVideo>({
    title: {
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    videoUrl:{
        type: String,
        required: true
    },
    thumbnailUrl:{
        type: String,
        required: true
    },
    videoDimensions:{
        height: {
            type: Number,
            default: VIDEO_DIMENSIONS.height || 1920
        },
        width: {
            type: Number,
            default: VIDEO_DIMENSIONS.width || 1080 
        }
    },
    controls: {
        type: Boolean
    },
    isPublic: {
        type: Boolean
    }
}, { timestamps: true })

const Video = models?.Video || model("Video", videoSchema)

export default Video;