"use client"
import axios from "axios";
import Link from "next/link";
import React, {  useState } from "react";
export default function Home() {
  const [username, setUsername] = useState("") 
  const [password, setPassword] = useState("")

  const handleLogin = async ()=>{
  try{ 
      const response = await axios.post("http://127.0.0.1:5000/login",{username,password})
    console.log("666",response);
    alert(response.data.message)
  }catch(e:any){
    alert(e.response.data.error)
  }

  }
  return (
    <div className="w-full h-full flex justify-center items-center ">
      <div className="flex justify-center border border-black w-[40%] py-12 bg-purple-400">
      <div className="flex flex-col w-[65%] h-[60%] border border-black rounded-lg bg-white">
          <div className="py-5">
          <p className="flex justify-center text-2xl font-bold mb-4 text-center">Login Page</p>
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
           <p className="flex justify-start text-start hover:underline cursor-pointer pt-1 pr-24">Fogot Password?</p>
          <button onClick={handleLogin} className="h-10 rounded-lg hover:bg-cyan-200 w-[70%] border border-purple-300 mt-5 mb-3">Login</button>
           <div className="flex justify-center w-[80%] pb-3">
           
          <p className="mr-3">Don`t have an account?<Link href={"/RegisterPage"} className="hover:underline cursor-pointer">{"  "}SignUp</Link></p>
            </div>
        </div>
      </div>
    </div>
    </div>
  );
}
