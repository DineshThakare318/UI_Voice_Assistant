"use client"
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, {  useState } from "react";
export default function RegisterPage() {

  const [username, setUsername] = useState("") 
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("") 
  const router = useRouter(); 
  const handleRegister =async ()=>{
     try{
        const response = await axios.post("http://127.0.0.1:5000/register",{username,password,email})
        if(response.data){
          alert(response.data.message)
        }
        if(response.status == 200){
               router.push("/")
        }
     }catch(e:any){
    alert(e.response.data.error)
     }
  }


  return (
    <div className="w-full h-full flex justify-center items-center bg-[url('/bgAI2.jpg')] bg-no-repeat bg-cover">
      
      <div className="flex justify-center border border-black w-[30%] py-8 bg-purple-400 rounded-lg ">
      <div className="flex flex-col w-[85%] h-[60%] border border-black rounded-lg bg-white">
          <div className="py-5">
          <p className="flex justify-center text-2xl font-bold mb-4 text-center text-green-700">Register</p>
          <p className="flex  border-b border-gray-400 w-full "></p>
            </div>          
        <div className="flex flex-col items-center justify-center  ">
            <input
            className="border-b-2 outline-none border-purple-300 px-4 py-2 mb-2 w-[70%]"
            type="text"
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
            name=""
            id=""
            placeholder="Username"
          />
          <input
            className="border-b-2 outline-none border-purple-300  px-4 py-2 w-[70%]"
            type="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            name=""
            id=""
            placeholder="Password"
            />
              <input
            className="border-b-2 outline-none border-purple-300  px-4 py-2 w-[70%]"
            type="text"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            name=""
            id=""
            placeholder="E-mail"
            
            />
          <button className="h-10 rounded-lg hover:bg-blue-400 w-[70%] border border-purple-300 mt-5 mb-3 hover:text-white" onClick={handleRegister}>Register</button>
           <div className="w-[60%] pb-3">
           <p >Already have an account</p>
           <Link className="flex hover:text-blue-400 cursor-pointer text-center justify-center text-blue-700 underline"  href={"/"}>Log in here</Link>
            </div>
        </div>
      </div>
    </div>
    </div>
  );
}
