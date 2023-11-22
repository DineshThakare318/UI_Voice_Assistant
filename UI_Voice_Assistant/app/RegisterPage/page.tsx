"use client"
import CustomToastEducation from "@/components/Toast/CustomToastEducation";
import { ToastTypes } from "@/enum/ToastTypes";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, {  useState } from "react";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
interface props{
  onSuccessRegistration:any
}
const  RegisterPage:React.FC<props> =({onSuccessRegistration})=> {

  const [username, setUsername] = useState("") 
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("") 
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter(); 
  const [emailError, setEmailError] = useState('');

  const handleEmailChange = (e:any) => {
    const value = e.target.value;
    setEmail(value);

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      setEmailError('Please enter a valid email address');
    } else {
      setEmailError('');
    }
  };

  const handleRegister =async ()=>{
     try{
      if(username && password && !emailError){
        const response = await axios.post("http://127.0.0.1:5000/register",{username,password,email})
        if(response.data){
          showAlert(response.data.message,ToastTypes.SUCCESS)
        }
        if(response.status == 200){
          onSuccessRegistration()
        } 
      }
      else{
        showAlert("All fields are required")
      }
     }catch(e:any){
      if(e?.response?.status == 400 || e?.response?.status ==401) {
        showAlert(e?.response?.data?.error,ToastTypes.ERROR)
      }
      else{
      showAlert("you are offline")
     }
    }
  }

  const showAlert = (message: any, type?: any) => {
    toast((t) => (
      <CustomToastEducation
        type={type}
        title=""
        message={message}
        t={t}
        singleLineMessage
        autoHide
      />
    )
    , {
      style: {
        background: 'transparent',
        width: 'auto',
        // boxShadow: 'none', // Remove the box shadow
      },
  });
  };


  return (
    <div className="w-full h-full flex justify-center items-center bg-no-repeat bg-cover">
      
      <div className="flex justify-center border border-black w-[30%] py-8 bg-white rounded-lg ">
      <div className="flex flex-col w-[85%] h-[60%] border border-black rounded-lg bg-white">
          <div className="py-5">
          <p className="flex justify-center text-2xl font-bold mb-4 text-center text-green-700">Register</p>
          <p className="flex  border-b border-gray-400 w-full "></p>
            </div>          
        <div className="flex flex-col items-center justify-center  ">
            <input
            className="border-b-2 outline-none border-gray-500 px-4 py-2 mb-2 w-[76%]"
            type="text"
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
            name=""
            id=""
            placeholder="Username"
          />
          <div className="flex border-b-2   border-gray-500 mb-2 py-2 w-[76%] ">
          <input
            className="outline-none pl-4"
            type={showPassword? "text" : "password"}
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            name=""
            id=""
            placeholder="Password"
            />
            <div className="flex pt-1 " onClick={()=>setShowPassword(!showPassword)}>
              {showPassword? <p className="hover:bg-slate-200 p-1 rounded-full"><FaEye  className="p-0 m-0"/></p>: <p className="hover:bg-slate-200 p-1 rounded-full"><FaEyeSlash className="p-0 m-0"/></p>

              }
            </div>
            </div>
              <input
            className="border-b-2 outline-none border-gray-500  px-4 py-2 w-[76%]"
            type="email"
            value={email}
            onChange={handleEmailChange}
            name=""
            id=""
            placeholder="E-mail"
            />
             {emailError && <p className="text-red-500 text-[14px]">{emailError}</p>}
          <button className="h-10 rounded-lg bg-emerald-500 w-[70%] hover:bg-emerald-600  mt-5 mb-3 text-white font-" onClick={handleRegister}>Register</button>
           {/* <div className="w-[60%] pb-3">
           <p >Already have an account</p>
           <Link className="flex hover:text-blue-400 cursor-pointer text-center justify-center text-blue-700 underline"  href={"/"}>Log in here</Link>
            </div> */}
        </div>
      </div>
    </div>
    </div>
  );
}
export default RegisterPage
