"use client"
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, {useEffect, useState} from "react";
export default function Home() {
  const [username, setUsername] = useState("") 
  const [password, setPassword] = useState("")
  const router = useRouter();
  const handleLogin = async ()=>{
  try{ 
      const response = await axios.post("http://127.0.0.1:5000/login",{username,password})
    if(response.data.isSuccess){
      localStorage.setItem('accessToken', response.data.accessToken)
    }
    if(response.status == 200) {
      router.push("/home")
    }
  }catch(e:any){
    alert(e.response.data.error)
  }
  }

  return (
    // <main className="flex flex-col items-center justify-between h-screen bg-[url('/bgAI2.jpg')] bg-no-repeat">
      <div className="w-full h-full flex justify-center items-center bg-[url('/bgAI2.jpg')] bg-no-repeat bg-cover">
      <div className="flex justify-center border border-black w-[35%] py-9 bg-purple-400 rounded-xl">
      <div className="flex flex-col w-[75%] h-[60%] border border-black rounded-lg bg-white">
          <div className="py-5">
          <p className="flex justify-center text-2xl font-bold mb-4 text-center text-green-700">Login </p>
          <p className="flex  border-b border-gray-400 w-full "></p>
            </div>          
        <div className="flex flex-col items-center justify-center  ">
            <input
            className="border-b-2 outline-none border-purple-300 px-4 py-2 mb-2 w-[70%]"
            type="text"
            value={username}
            onChange={(e:any)=>setUsername(e.target.value)}
            placeholder="Username"
          />
          <input
            className="border-b-2 outline-none border-purple-300  px-4 py-2 w-[70%]"
            type="password"
            value={password}
            onChange={(e:any)=>setPassword(e.target.value)}
            placeholder="Password"
            />
           <p className="flex justify-start text-[13px] text-start hover:underline cursor-pointer pt-1 pr-32">Forgot Password?</p>
          <button onClick={handleLogin} className="h-10 rounded-lg hover:bg-blue-400 hover:text-white w-[70%] border border-purple-300 mt-5 mb-3">Login</button>
           <div className="flex justify-center w-[80%] pb-3">           
          <p className="mr-3">Don`t have an account?<Link href={"/RegisterPage"} className="hover:text-blue-400 cursor-pointer underline text-blue-700">{"  "}SignUp</Link></p>
            </div>
        </div>
      </div>
    </div>
    </div>
    // </main>
  );
}
