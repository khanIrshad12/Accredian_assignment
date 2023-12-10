import dbConnect from "@/dbConfig/dbConnect";
import User from "@/model/UserSchems";
import bcryptjs from "bcryptjs";
import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken'

export const POST=async(req)=>{
    await dbConnect();
    try {
        const {email,password}=await req.json();
        const userExist=await User.findOne({email});
        if(!userExist){
            return NextResponse.json({error:"User does not exist"})
        }

        //check if password is valid or not
        const validPassword =await bcryptjs.compare(password,userExist.password)
        if(!validPassword){
            return NextResponse.json({error:"Invalid Password!!"})
        }

        //create token data
        const tokenData={
            id:userExist._id,
            password:userExist.password,
            email:userExist.email
        }

        //create token
        const token=jwt.sign(tokenData,"secretcodehai",{expiresIn:'1h'})
        const res= NextResponse.json({
            message:"Login Succesfull",
            success:true
        })
        res.cookies.set("token",token,{
            httpOnly:true
        })
        return res;
    } catch (error) {
        console.log("post Login error",error);
        return NextResponse.json({error})
    }
}