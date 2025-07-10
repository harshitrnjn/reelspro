"use client";

import {
    ImageKitAbortError,
    ImageKitInvalidRequestError,
    ImageKitServerError,
    ImageKitUploadNetworkError,
    upload,
} from "@imagekit/next";
import axios from "axios";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { LuLoaderCircle } from "react-icons/lu";
import { toast } from "react-toastify";

const UploadExample = () => {

    const searchParams = useSearchParams()
    const user = searchParams.get("user")
    const route = useRouter()
    const [progress, setProgress] = useState(0);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const abortController = new AbortController();
    const [videoData, setVideoData] = useState({
        title: "",
        description: "",
        videoUrl: "",
        thumbnailUrl: ""
    })
    const [isLoading, setIsLoading] = useState(false)
    const [isProgress, setIsProgress] = useState(false)

    useEffect(() => {
        if (progress == 100) {
            route.push("/home")
        }
    }, [progress])

    const authenticator = async () => {
        try {
            const response = await fetch("/api/auth/imagekit-auth");
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Request failed with status ${response.status}: ${errorText}`);
            }
            const data = await response.json();
            const { signature, expire, token, publicKey } = data;
            return { signature, expire, token, publicKey };
        } catch (error) {
            console.error("Authentication error:", error);
            throw new Error("Authentication request failed");
        }
    };

    const handleUpload = async () => {

        console.log(videoData)

        setIsProgress(true)

        const fileInput = fileInputRef.current;
        if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
            toast.warn("Please select a file to upload");
            return;
        }

        const file = fileInput.files[0];

        let authParams;
        try {
            authParams = await authenticator();
        } catch (authError) {
            console.error("Failed to authenticate for upload:", authError);
            return;
        }

        const { signature, expire, token, publicKey } = authParams;

        try {
            const uploadResponse = await upload({
                expire,
                token,
                signature,
                publicKey,
                file,
                fileName: file.name,
                onProgress: (event) => {
                    setProgress((event.loaded / event.total) * 100);
                },
                abortSignal: abortController.signal,
            });
            // console.log("Upload response:", uploadResponse.url);

            const updatedVideoData = {
                ...videoData,
                videoUrl: uploadResponse.url!,
                thumbnailUrl: "thumbnailUrl.mp4"
            };
            setVideoData(updatedVideoData);

            try {

                // console.log("video created in mongodb")

                const response = await axios.post("/api/video", updatedVideoData)

                console.log(response)

                toast.success(response.data.message)

            } catch (error: any) {
                // console.log("Error while creating video", error)
                toast.warn(error.response.data.message)
                console.log(error.message)
            }

        } catch (error) {
            if (error instanceof ImageKitAbortError) {
                console.error("Upload aborted:", error.reason);
            } else if (error instanceof ImageKitInvalidRequestError) {
                console.error("Invalid request:", error.message);
            } else if (error instanceof ImageKitUploadNetworkError) {
                console.error("Network error:", error.message);
            } else if (error instanceof ImageKitServerError) {
                console.error("Server error:", error.message);
            } else {
                console.error("Upload error:", error);
            }
        }
    };

    return (
        <div className="w-full h-screen bg-gray-200 flex justify-center items-center flex-col relative">
            <div className=' absolute top-0 w-full h-[11vh] bg-gray-100 flex justify-evenly items-center gap-x-20 ' >
                <Link href={"/home"} className='text-5xl font-bold ' >ReelsPro</Link>
                <h1 className='text-2xl font-semibold ' >
                    Welcome, {user}
                </h1>
                <div className='flex gap-x-7'>
                    <button className='px-4 py-2 bg-red-500 text-white font-semibold rounded-md' >
                        LOG OUT
                    </button>
                </div>
            </div>
            <div className="w-[75vw] mx-auto  p-6 bg-white shadow-lg rounded-xl border border-gray-200">
                <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">Video Upload</h2>
                <div className="w-full mb-5 flex flex-col gap-y-3" >
                    <label htmlFor="title" className="font-bold text-black" >Title:</label>
                    <input
                        value={videoData.title}
                        onChange={(e) => {
                            setVideoData({ ...videoData, title: e.target.value })
                        }}
                        type="text"
                        className=" w-full px-4 py-2 border-2 border-gray-300 rounded-lg outline-none "
                    />
                </div>
                <div className="w-full mb-5 flex flex-col gap-y-3" >
                    <label htmlFor="description" className="font-bold text-black" >Description:</label>
                    <input
                        value={videoData.description}
                        onChange={(e) => {
                            setVideoData({ ...videoData, description: e.target.value })
                        }}
                        type="text"
                        className=" w-full px-4 py-2 border-2 border-gray-300 rounded-lg outline-none"
                    />
                </div>
                <input
                    type="file"
                    ref={fileInputRef}
                    className="block w-full mb-4 text-sm text-gray-700 file:mr-4 file:py-2 file:px-4
                   file:rounded-lg  file:border-2 file:border-gray-300 file:text-sm file:font-semibold
                   file:bg-blue-50 file:text-black hover:file:bg-blue-100"
                />
                {isLoading ? <button
                    type="button"
                    onClick={handleUpload}
                    className=" flex justify-center items-center w-full bg-black text-white py-2 px-4 rounded-lg  transition"
                >
                    <LuLoaderCircle className='animate-spin text-2xl ' />
                </button> : <button
                    type="button"
                    onClick={handleUpload}
                    className="w-full  text-white py-2 px-4 rounded-lg bg-black font-bold uppercase transition"
                >
                    Upload File
                </button>}


                <div className="mt-4">
                    {isProgress && <div>
                        <label className="block mb-1 text-gray-600">Upload Progress:</label>
                        <progress
                            value={progress}
                            max={100}
                            className="w-full h-4 rounded-lg bg-gray-200 [&::-webkit-progress-bar]:bg-gray-200 
                     [&::-webkit-progress-value]:bg-black/75 [&::-moz-progress-bar]:bg-black"
                        ></progress>
                        <span className="block mt-1 text-sm text-gray-600 text-right">{Math.round(progress)}%</span>
                    </div>}
                </div>
            </div>
        </div>
    );
};

export default UploadExample;
