"use client"
import axios from 'axios'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { LuLoaderCircle } from "react-icons/lu";
import { useRouter } from 'next/navigation'

const page = () => {
    const route = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [disableButton, setDisableButton] = useState(true)

    const [data, setData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    useEffect(() => {
        if (data.username.length > 0 && data.confirmPassword.length > 0 && data.email.length > 0 && data.password.length > 0) {
            setDisableButton(false)
        }
    }, [data])

    const setDefault = () => {
        setData({
            username: "", email: "", password: "", confirmPassword: ""
        })
    }


    const handleSubmit = async (e: any) => {

        // toast.success("Yay! Button Clicked")
        e.preventDefault();
        setIsLoading(true)
        try {

            const response = await axios.post("/api/auth/register", data)

            // console.log(response)

            if (response?.data.success) {
                toast.success(response.data.message)
            }

        } catch (error: any) {
            console.log("Error while connecting to api", error)
            toast.warn(error.response.data.message)
        } finally {
            setDefault()
            setIsLoading(false)
            setDisableButton(true)
            route.push("/login")
        }

        // console.log("Form submitted")
    }

    return (
        <div className=' h-screen w-full bg-slate-100 ' >
            <h1 className='text-center text-6xl font-bold pt-7'>ReelsPro</h1>
            <div className=' w-full h-[90%] flex justify-center items-center ' >
                {/* register portal with api call */}
                <div className=' sm:w-full sm:h-full  md:w-1/4 md:h-3/4 bg-white py-5 px-3 rounded-xl shadow-2xl ' >
                    <div className='w-full mt-4 ' >
                        <h1 className='text-center text-3xl font-bold ' >REGISTER</h1>
                        <p className='text-center text-xm pt-2 text-gray-400 font-bold ' >“Don’t just post — perform. ReelsPro.”</p>
                    </div>
                    <form onSubmit={handleSubmit} className='px-7 w-full flex flex-col gap-y-5 mt-5 ' >
                        <div className='username flex flex-col ' >
                            <label htmlFor="username" className='font-bold ml-1  mb-1' >Username: </label>
                            <input type="text"
                                className='border-2 border-gray-300 px-4 py-2 rounded-lg outline-none'
                                value={data.username}
                                onChange={(e) => { setData({ ...data, username: e.target.value }) }}
                            />
                        </div>
                        <div className='email flex flex-col ' >
                            <label htmlFor="email" className='font-bold ml-1 outline-none mb-1' >Email: </label>
                            <input type="text"
                                className='border-2 border-gray-300 px-4 py-2 rounded-lg outline-none '
                                value={data.email}
                                onChange={(e) => { setData({ ...data, email: e.target.value }) }}
                            />
                        </div>
                        <div className='username flex flex-col ' >
                            <label htmlFor="password" className='font-bold ml-1 outline-none mb-1' >Enter Password: </label>
                            <input type="password"
                                className='border-2 border-gray-300 px-4 py-2 rounded-lg outline-none '
                                value={data.password}
                                onChange={(e) => { setData({ ...data, password: e.target.value }) }}
                            />
                        </div>
                        <div className='password flex flex-col ' >
                            <label htmlFor="confirmPassword" className='font-bold ml-1 outline-none mb-1 '>Confirm Password: </label>
                            <input type="text"
                                className='border-2 border-gray-300 px-4 py-2 rounded-lg outline-none '
                                value={data.confirmPassword}
                                onChange={(e) => { setData({ ...data, confirmPassword: e.target.value }) }}
                            />
                        </div>
                        {disableButton ? <button className='bg-gray-500 py-3 mt-2 rounded-lg text-base text-white font-bold uppercase hover:cursor-not-allowed ' > Register </button> : <button type='submit' className='bg-black py-3 mt-2 rounded-lg text-base text-white font-bold uppercase flex justify-center items-center ' > {isLoading ? <LuLoaderCircle className='animate-spin text-2xl ' /> : "Register"} </button>}
                    </form>
                    <div>
                        <p className='text-black text-center font-bold mt-4 ' > Already have an account? <Link href={"/login"} className='text-blue-600 hover:underline' >LOG IN</Link> </p>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default page
