import dbConnect from "@/db/db";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request : NextRequest){
    
    const { username, email, password, confirmPassword } = await request.json();

    if(!username || !email || !password || !confirmPassword){
        return NextResponse.json({
            success: false,
            message: "Either of the field is missing"
        }, {status: 400})
    }

    if( password !== confirmPassword ){
        return NextResponse.json({
            success: false,
            message: "Password does not match"
        }, { status: 400 })
    }

    try {

        await dbConnect();

        const existingUser = await User.findOne({ email })

        if(existingUser){
            return NextResponse.json( {
                success: false,
                message: "User already exists with this email"
            }, { status: 400 } )
        }

        const registeredUser = await User.create(
            {
                username,
                email,
                password
            }
        )

        if(!registeredUser){
            return NextResponse.json( {
                success: false,
                message: "User registration failed"
            }, { status: 400 } )
        }

        return NextResponse.json({
            success: true,
            message: "User registered successfully!"
        }, { status: 200 })
        
    } catch (error: any) {
        return NextResponse.json({
            success: false,
            message: "Error while registering the user, internal server error"
        }, { status: 500 })
    }

}