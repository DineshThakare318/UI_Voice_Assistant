"use client"
import axios from "axios";
import Link from "next/link";
import React, {  useState } from "react";
export default function RegisterPage() {

  const [username, setUsername] = useState("") 
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("") 
  const handleRegister =async ()=>{
     try{
        const response = await axios.post("http://127.0.0.1:5000/register",{username,password,email})
        console.log("JJJJJJJJ",response);
        if(response.data){
            alert("Username or email already exists")
        }
     }catch(e:any){
    alert(e.response.data.error)
     }
  }


  return (
    <div className="w-full h-full flex justify-center items-center ">
      <div className="flex justify-center border border-black w-[40%] py-12 bg-purple-400">
      <div className="flex flex-col w-[65%] h-[60%] border border-black rounded-lg bg-white">
          <div className="py-5">
          <p className="flex justify-center text-2xl font-bold mb-4 text-center">Register Page</p>
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
          <button className="h-10 rounded-lg hover:bg-cyan-200 w-[70%] border border-purple-300 mt-5 mb-3" onClick={handleRegister}>Register</button>
           <div className="w-[60%] pb-3">
           <p >Already have an account</p>
           <Link className="flex hover:underline cursor-pointer text-center justify-center"  href={"/home"}>Log in here</Link>
            </div>
        </div>
      </div>
    </div>
    </div>
  );
}
