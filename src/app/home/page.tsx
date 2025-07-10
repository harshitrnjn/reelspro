"use client"
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { ImSpinner2 } from "react-icons/im";
const page = () => {

  type Video = {
    title: string,
    videoUrl: string,
    description: string
  }

  const [user, setUser] = useState("")
  const route = useRouter()
  const [videos, setVideos] = useState<Video[]>([])



  useEffect(() => {
    const getDetails = async () => {
      try {
        const userResponse = await axios.get("/api/profile")

        const videoResponse = await axios.get("/api/video")

        console.log(userResponse.data)
        setUser(userResponse.data.user.username)

        console.log(videoResponse)
        console.log(videoResponse.data.videos[0].videoUrl)
        // setVideoUrl(videoResponse.data.videos[0].videoUrl)
        setVideos(videoResponse.data.videos)

        // console.log(videoUrl)

      } catch (error: any) {
        console.log("Profile fetch error: ", error.message)
      }
    }



    getDetails()

  }, [])

  const logOut = async () => {
    try {

      const response = await axios.get("/api/logout")

      // console.log(response.data)

      toast.success(response.data.message)

      route.push("/login")



    } catch (error: any) {
      console.log(" logout issue ", error.message)
    }
  }

  useEffect(() => {
    if (videos) {
      console.log("Video URL updated:", videos);
    }
  }, [videos]);

  const pass = () => {
    route.push(`/upload?user=${encodeURIComponent(user)}`)
  }
  return (
    <div className='w-full min-h-screen bg-gray-400'>
      <div className='w-full h-[11vh] bg-gray-100 flex justify-evenly items-center gap-x-20 ' >
        <h1 className='text-5xl font-bold ' >ReelsPro</h1>
        <h1 className='text-2xl font-semibold ' >
          Welcome, {user}
        </h1>
        <div className='flex gap-x-7'>
          <button onClick={pass} className='text-black font-semibold text-lg border-2 px-4 py-2 rounded-lg hover:shadow-lg border-gray-300' >
            UPLOAD
          </button>
          <button onClick={logOut} className='px-4 py-2 bg-red-500 text-white font-semibold rounded-md' >
            LOG OUT
          </button>
        </div>
      </div>
      <div className='w-full min-h-screen p-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 '>

        
        {
          videos ? (
            videos.map((video) => (
              <div className="w-[17vw] h-[70vh] flex  overflow-hidden bg-white p-3 flex-col">
                <video
                  src={video.videoUrl}
                  muted
                  playsInline
                  controls
                  className="h-full aspect-[9/16] object-cover"
                />
                <h1 className=' text-black text-left pl-3 mt-2 uppercase font-semibold' >{video.title}</h1>
              </div>
            ))
          ) : (
            <div className="text-white text-center flex justify-center items-center">
              <ImSpinner2 className='animate-spin size-10' />
            </div>
          )

        }

      </div>
    </div>
  )
}

export default page
