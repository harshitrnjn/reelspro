"use client";
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { LuLoaderCircle } from 'react-icons/lu';
import { toast } from 'react-toastify';

const page = () => {
    const route = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [disableButton, setDisableButton] = useState(true)

    const [data, setData] = useState({
        identifier: "",
        password: ""
    })

    useEffect(() => {
        if (data.identifier.length > 0 && data.password.length > 0) {
            setDisableButton(false)
        } else {
            setDisableButton(true)
        }
    }, [data])

    const handleSubmit = async (e: any) => {
        setIsLoading(true)
        e.preventDefault();

        try {
            const response = await axios.post("/api/auth/login", {
                identifier: data.identifier,
                password: data.password,
            })

            toast.success(response.data.message)

            route.push("/home")

        } catch (error: any) {
            console.log("LOGIN ERROR", error)
            toast.warning(error.response.data.message)
            // console.log(error.response.data.message)
        } finally {
            setDefault()
            setIsLoading(false)
        }



    }

    const setDefault = () => {
        setData({
            identifier: "",
            password: ""
        })
    }

    return (
        <div className=' h-screen w-full bg-slate-100' >
            <h1 className='text-center text-6xl font-bold pt-7'>ReelsPro</h1>
            <div className=' w-full h-[90%] flex justify-center items-center ' >
                {/* register portal with api call */}
                <div className='w-1/4 h-[75%] bg-white py-5 px-3 rounded-xl shadow-2xl flex justify-center items-center flex-col gap-y-5 ' >
                    <div className='w-full mt-4 ' >
                        <h1 className='text-center text-3xl font-bold ' >LOG IN</h1>
                        <p className='text-center text-xm pt-2 text-gray-400 font-bold ' >“Don’t just post — perform. ReelsPro.”</p>
                    </div>
                    <form onSubmit={handleSubmit} className='px-7 w-full flex flex-col gap-y-5 mt-5 ' >
                        <div className='email flex flex-col ' >
                            <label htmlFor="email" className='font-bold ml-1 outline-none mb-1' >Email/Username: </label>
                            <input type="text"
                                className='border-2 border-gray-300 px-4 py-2 rounded-lg outline-none '
                                value={data.identifier}
                                onChange={(e) => { setData({ ...data, identifier: e.target.value }) }}
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
                        {disableButton ? <button className='bg-gray-500 py-3 mt-2 rounded-lg text-base text-white font-bold uppercase hover:cursor-not-allowed ' > Register </button> : <button type='submit' className='bg-black py-3 mt-2 rounded-lg text-base text-white font-bold uppercase flex justify-center items-center ' > {isLoading ? <LuLoaderCircle className='animate-spin text-2xl ' /> : "Register"} </button>}
                    </form>
                    <div>
                        <p className='text-black text-center font-bold mt-4 ' >
                            New Member?
                            <Link href={"/register"} className='text-blue-600 hover:underline uppercase' >
                                Register
                            </Link>
                        </p>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default page
