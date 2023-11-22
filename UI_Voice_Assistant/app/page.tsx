"use client";
import LoginPage from "@/components/LoginPage";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import "../components/VoiceAssistant/style.css";
import RegisterPage from "./RegisterPage/page";
import { BiLeftArrowAlt } from "react-icons/bi";
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showLoginPage, setShowLoginPage] = useState(false);
  const [showRegisterPage, setShowRegisterPage] = useState(false);
  const [showServices, setShowServices] = useState(false);

  const router = useRouter();
  const handleLogin = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:5000/login", {
        username,
        password,
      });
      if (response.data.isSuccess) {
        localStorage.setItem("accessToken", response.data.accessToken);
        localStorage.setItem("username", response.data.username);
      }
      if (response.status == 200) {
        router.push("/home");
      }
    } catch (e: any) {
      if (e?.response?.status == 401) {
        alert(e?.response?.data?.error);
      } else if (e?.response?.status == 400) {
        alert(e?.response?.data?.error);
      } else {
        alert("you are offline");
      }
    }
  };

  const greeting = `Are you ready to revolutionize the way you interact with technology? Our Virtual Assistant is here to make your life easier, more efficient, and seamlessly connected. Imagine a world where tasks are completed with just the sound of your voice - welcome to the future.`;
  const [showText, setShowText] = useState(false);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowText(true);
    }, 300);

    return () => clearTimeout(timeout);
  }, []);

  return (
    // bg-[url('/bgAI2.jpg')]
    <div className=" h-screen overflow-y-scroll w-full bg-slate-800 bg-cover">
      <div className="flex justify-between w-full h-28 bg-emerald-500 p-0 m-0">
        <Image
          className=""
          src={"/virtualAssistantlogo.png"}
          alt="fdsf"
          width={130}
          height={20}
        ></Image>
        <p className="flex  items-center pl-44  text-[40px] font-sans font-semibold">
          Your Virtual Assistant{" "}
        </p>
        <div className="nav  flex items-end pb-6  pr-7 space-x-7 ">
          <div
            className="hover:underline cursor-pointer hover:text-sky-200"
            onClick={() => {
              setShowLoginPage(true),
                setShowRegisterPage(false),
                setShowServices(false);
            }}
          >
            Log in
          </div>
          <div
            className="hover:underline cursor-pointer hover:text-sky-200"
            onClick={() => {
              setShowRegisterPage(true),
                setShowLoginPage(false),
                setShowServices(false);
            }}
          >
            Sign up
            {/* <Link href={"/RegisterPage"}>Sign up</Link>  */}
          </div>
          <div
            className="hover:underline cursor-pointer hover:text-sky-200"
            onClick={() => {
              setShowServices(true),
                setShowLoginPage(false),
                setShowRegisterPage(false);
            }}
          >
            Our services
          </div>
        </div>
      </div>
      <div className="w-full ">
        {showLoginPage ? (
          <div>
            <p
              className="flex justify-start text-white px-2 pt-5 cursor-pointer"
              onClick={() => setShowLoginPage(false)}
            >
              <BiLeftArrowAlt className="h-6 w-40 " />
            </p>
            <div className="pl-[475px] pt-3">
              <LoginPage />
            </div>
          </div>
        ) : showRegisterPage ? (
          <div>
            <p
              className="flex justify-start text-white px-2 pt-5 cursor-pointer"
              onClick={() => setShowRegisterPage(false)}
            >
              <BiLeftArrowAlt className="h-6 w-40 " />
            </p>
            <div className=" pt-4">
              <RegisterPage />
            </div>
          </div>
        ) : showServices ? (
          <div>
            <p
              className="flex justify-start text-white px-2 pt-5 cursor-pointer"
              onClick={() => setShowServices(false)}
            >
              <BiLeftArrowAlt className="h-6 w-40 " />
            </p>
            <div className="flex justify-start items-center text-white">
              <div className="flex flex-col justify-center items-center space-y-2">
                <p className="text-[45px] ">What We Offer</p>
                <div className="w-[50%] space-y-2">
                  <p className=" ">
                    {" "}
                    <b>1. Intelligent Voice Recognition:</b>
                    {"   "} Communicate naturally with our cutting-edge voice
                    recognition technology. Execute commands, ask questions, and
                    get instant responses.
                    <br />
                  </p>
                  <p className=" ">
                    {" "}
                    <b>2. Personalized Assistance: </b>
                    {"  "}Tailored to your preferences, our virtual assistant
                    learns and adapts to your unique needs over time. Increase
                    productivity with personalized recommendations and proactive
                    assistance.
                    <br />{" "}
                  </p>
                  <p className=" ">
                    {" "}
                    <b>3. Smart Home Integration:</b>
                    {"   "}
                    Control your smart home devices effortlessly through voice
                    commands. Create custom routines to simplify your daily
                    activities.
                    <br />{" "}
                  </p>
                  <p className=" ">
                    <b>4. Seamless Connectivity:</b>
                    {"   "} Connect with your virtual assistant across devices
                    for a unified experience. Access information, set reminders,
                    and manage tasks from your smartphone, tablet, or computer.
                    <br />{" "}
                  </p>
                  <p className=" ">
                    {" "}
                    <b>5. Continuous Improvement:</b>
                    {"   "}
                    Our virtual assistant is constantly evolving with regular
                    updates. Enjoy the latest features and enhancements to stay
                    ahead in the world of AI technology.
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex ">
            {" "}
            <div className="flex  w-full">
              <div className="flex justify-start pl-16 pt-32 overflow-hidden">
                <div className="flex flex-col">
                  <p className=" font-bold text-white text-[40px] font-sans">
                    {" "}
                    Welcome to Your Virtual Assistant!{" "}
                  </p>
                  <p className=" text-white w-1/2 font-sans !max-w-[40%] flex justify-start items-center flex-wrap">
                    {/* Are you ready to revolutionize the way you interact with
                technology? Our Virtual Assistant is here to make your life
                easier, more efficient, and seamlessly connected. Imagine a
                world where tasks are completed with just the sound of your
                voice - welcome to the future. */}
                    {greeting.split(" ").map((ele: any, index: number) => (
                      <span
                        className={`transition-opacity flex justify-center items-center duration-500 mx-[2px] ${
                          showText ? "opacity-100" : "opacity-0"
                        }`}
                        style={{ transitionDelay: `${index * 100}ms` }}
                        key={index}
                      >
                        {ele}
                        <>
                          {index === greeting.split(" ").length - 1 && (
                            <span className="w-2 h-[80%] m-auto cursor-blinker bg-white text-white">
                              .
                            </span>
                          )}
                        </>
                      </span>
                    ))}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* <div>
        <Image src={"/bg1.jpg"}
        alt="pic of AI"
       height={100}
        width={150}
        ></Image>
      </div> */}
    </div>
  );
}
