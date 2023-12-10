import { NextResponse } from "next/server"

export const GET=async()=>{
    try {
        const response =NextResponse.json({
            message:'LogOut Successfull',
            success:true
        })
        response.cookies.set("token","",{
            httpOnly:true,expires:new Date(0)
        })
        console.log(response)
        return response
        
    } catch (error) {
        return NextResponse.json({error},{status:500})
    }
}