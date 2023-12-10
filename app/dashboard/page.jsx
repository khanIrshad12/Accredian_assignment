'use client'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React from 'react'
import toast from 'react-hot-toast';

const Dashboard = () => {
    const router =useRouter()
    const handleLogout=async(e)=>{
        e.preventDefault();
        const res = await axios.get('/api/users/logout');
        console.log("client response",res.data)
        if(res.data.success){
            toast.success("Succesfully Logout!!")
            router.push('/sign-In')
        }else{
            toast.error("Somethin went wrong while logout")
            console.log('something went wrong')
        }
         
    }
  return (
    <div className='flex justify-center items-center h-screen flex-col'>
   <h2 className='text-lg font-semibold'>Welcome to Dashboard Page</h2> 
    <button className='p-2 my-2 mx-6 rounded bg-red-500 text-white ' onClick={handleLogout}>LogOut</button>
    </div>
  )
}

export default Dashboard