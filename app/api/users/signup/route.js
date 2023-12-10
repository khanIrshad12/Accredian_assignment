import dbConnect from "@/dbConfig/dbConnect";
import User from "@/model/UserSchems";
import bcryptjs from "bcryptjs";
import { NextResponse } from "next/server";

export const POST=async(req)=>{
    await dbConnect();
    try {
        const {username,email,password}=await req.json();
        
        const isuserEmail= await User.findOne({email});
        const isUsernameExits=await User.findOne({username});

        if(isuserEmail){
            return NextResponse.json({error:"User Email Already exists"},{status:400})
        }
        if(isUsernameExits){
            return NextResponse.json({error:"Username Already exists"},{status:400})
        }
        const hashpassword= await bcryptjs.hash(password,10)
        console.log('hashpasword',hashpassword)
        const newUser=await new User ({
            username,
            email,
            password:hashpassword
        }).save()
        console.log("newuser",newUser);
        return NextResponse.json({message: "User created successfully",
        success: true,newUser},{status:200})
        
    } catch (error) {

        console.log("Post signUp error",error)
        return NextResponse.json({error},{status:201})
    }
}