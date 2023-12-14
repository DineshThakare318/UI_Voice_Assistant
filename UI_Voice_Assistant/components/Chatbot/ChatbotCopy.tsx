import React, { useState } from "react";
import axios from "axios";
import Image from "next/image";
import CustomToastEducation from "../Toast/CustomToastEducation";
import toast from "react-hot-toast";
import { ToastTypes } from "@/enum/ToastTypes";
import Loader from "../Loader";
import Link from "next/link";
import { AiOutlineLogout } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { BiLeftArrowAlt } from "react-icons/bi";
import FeedbackForm from "../FeedbackForm/FeedbackForm";
import { SlArrowLeft, SlList } from "react-icons/sl";

const Chatbotcopy = () => {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState<any>("");
  const [error, setError] = useState(null);
  const [loader, setLoader] = useState(false);
  const [inputText, setInputText] = useState("");
  const [textResult, setTextResult] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [changeModel, setChangeModel] = useState(false);

  const textToImage = async () => {
    try {
      setLoader(true);
      const response = await fetch(
        "https://api-inference.huggingface.co/models/playgroundai/playground-v2-1024px-aesthetic",
        {
          method: "POST",
          headers: {
            Authorization: "Bearer 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",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ inputs: inputText }),
        }
      );
      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const result = await response.json();
        console.log(result);
        setTextResult(result);
        setImageURL("");
      } else if (contentType && contentType.includes("image")) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        console.log("url:", url);
        setImageURL(url);
        setTextResult("");
      } else {
        throw new Error(`Unexpected content type: ${contentType}`);
      }
    } catch (error: any) {
      console.error("Error:", error.message);
      showAlert(error.message, ToastTypes.ERROR);
    } finally {
      setLoader(false);
    }
  };

  const textGeneration = async () => {
    try {
      setError(null);
      setLoader(true);
      const apiUrl = "http://localhost:1234/v1/chat/completions";
      const requestBody = {
        messages: [
          { role: "system", content: "Always answer in rhymes." },
          { role: "user", content: question },
        ],
      };

      const apiResponse = await axios.post(apiUrl, requestBody, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("API Response:", apiResponse.data.choices[0].message.content);
      setResponse(apiResponse.data.choices[0].message.content);
    } catch (error: any) {
      showAlert(error.message, ToastTypes.ERROR);
      console.error("Error:", error.message);
      setError(null);
    } finally {
      setLoader(false);
    }
  };

  const steps = response.split(/\b\d+\.\s*/).filter(Boolean);
  const showAlert = (message: any, type?: any) => {
    toast(
      (t) => (
        <CustomToastEducation
          type={type}
          title=""
          message={message}
          t={t}
          singleLineMessage
          autoHide
        />
      ),
      {
        style: {
          background: "transparent",
          width: "auto",
          boxShadow: "none",
        },
      }
    );
  };

  //
  const [searchList, setSearchlist] = useState<[]>([]);
  const [showFeedbackPage, setShowFeedbackPage] = useState(false);
  const [hideSideBar, setHideSideBar] = useState(false);
  const router = useRouter();
  const check = async () => {
    if (localStorage.getItem("accessToken")) {
      try {
        const response = await axios.get("http://127.0.0.1:5000/check", {
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
        if (!response.data.isSuccess) {
          router.push("/");
        }
      } catch (e: any) {
        console.log(e);
        // showAlert(e);
      }
    } else {
      router.push("/");
    }
  };

  const userName: any = localStorage.getItem("username");
  let userName1: any;
  if (userName.length > 15) {
    userName1 = userName.slice(0, 15) + "...";
  } else {
    userName1 = userName;
  }

  const [showPopup, setShowPopup] = useState(false);
  const handleLogout = () => {
    setShowPopup(true);
  };

  const handleConfirmLogout = () => {
    localStorage.setItem("accessToken", "");
    check();
    setShowPopup(false);
  };

  const handleCancelLogout = () => {
    setShowPopup(false);
  };

  //
  const extractCodeBlocks = (inputString: any) => {
    const codeBlockRegex = /```([^`]+)```/g;
    const codeBlocks = [];
    let match;

    while ((match = codeBlockRegex.exec(inputString)) !== null) {
      codeBlocks.push(match[1].trim());
    }
    return codeBlocks;
  };
  //
  return (
    <div className="my-2 flex justify-center  h-full w-[60%] bg-white rounded-lg overflow-hidden relative">
      {showPopup && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white px-4 pt-7 pb-3 space-y-7 rounded-lg ">
            <p className="text-black text-[15x] font-semibold">
              Are you sure you want to logout?
            </p>
            <div className="flex justify-end mt-4 gap-3">
              <button
                onClick={handleCancelLogout}
                className="text-white text-[12px] bg-green-400  border-0 py-1 px-3 focus:outline-none hover:bg-green-600   rounded "
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmLogout}
                className="text-white text-[12px] bg-red-500 border-0 py-1 px-3 focus:outline-none rounded hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
      {!hideSideBar ? (
        <>
          <div className="flex flex-col absolute left-0  w-[25%] pr-2 bg-gray-800 py-4 max-h-full h-full text-white px-1">
            <div className="px-2">
              Welcome,
              <div className="group relative my-1 flex">
                <p className="text-[#34eb9b] font-bold cursor-default">
                  {userName1}
                </p>
                <span className="absolute top-7 scale-0 rounded  p-2 text-[13px] text-black bg-amber-50 group-hover:scale-100">
                  {userName}
                </span>
              </div>
            </div>
            <div className="mt-7">
              <div className="text-gray-300">Today</div>
              <div className="mt-2 max-h-2/5 h-2/5 overflow-y-scroll ">
                {searchList.map((element: any, index: number) => (
                  <div key={index}>
                    <p className="hover:bg-gray-600  p-1  rounded-md text-[13px] mx-1 cursor-pointer">
                      {element.command}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="bottom-5 absolute ">
              <div
                onClick={() => setShowFeedbackPage(true)}
                className="cursor-pointer text-[13px] text-gray-300 mb-1 hover:bg-slate-700 rounded-lg py-2 px-1"
              >
                Share Feedback
              </div>
              <Link className=" " href={"/ChatHistory"}>
                <p className="cursor-pointer text-[13px] text-gray-300 mb-1 hover:bg-slate-700 rounded-lg py-2 px-1 ">
                  Check <b>chat </b> history
                </p>
              </Link>
              <div
                onClick={() => handleLogout()}
                className="flex  items-center gap-1 cursor-pointer hover:bg-slate-700 rounded-lg py-2 px-1 w-auto  text-red-500 text-[15px]"
                title="logout"
              >
                {" "}
                <AiOutlineLogout className="-rotate-90 p-0 m-0" /> Logout
              </div>
            </div>
          </div>
          <div
            className="absolute left-52 top-72 cursor-pointer"
            onClick={() => setHideSideBar(true)}
          >
            <SlArrowLeft className="text-[10px] font-bold hover:text-black hover:text-[12px]" />
          </div>
        </>
      ) : (
        <div
          onClick={() => setHideSideBar(false)}
          className="absolute left-4 top-4 font-bold cursor-pointer"
        >
          <SlList />
        </div>
      )}

      {showFeedbackPage ? (
        <div className="flex justify-center">
          <p
            onClick={() => setShowFeedbackPage(false)}
            className="cursor-pointer top-2 absolute "
          >
            <BiLeftArrowAlt className="h-6 w-40 absolute -left-64" />
          </p>
          <div className={`flex justify-center items-center w-3/4`}>
            <FeedbackForm />
          </div>
        </div>
      ) : (
        <>
          {changeModel ? (
            <>
              <div className={`${!hideSideBar ? "pl-52 " : ""}`}>
                <div
                  className={`absolute bottom-7 flex justify-between items-center border-[2px] border-gray-600 rounded-md w-[400px] left-52 pl-1 ${
                    !hideSideBar ? "ml-24" : ""
                  } pr-4 py-2`}
                >
                  <input
                    className="outline-none w-full"
                    onKeyDown={(e) => {
                      if (e.key == "Enter") {
                        textToImage();
                      }
                    }}
                    type="text"
                    placeholder="Enter text for processing"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                  />
                  <button onClick={textToImage}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      fill="none"
                      className="icon-sm m-1 md:m-0"
                      height={25}
                      width={25}
                    >
                      <path
                        d="M.5 1.163A1 1 0 0 1 1.97.28l12.868 6.837a1 1 0 0 1 0 1.766L1.969 15.72A1 1 0 0 1 .5 14.836V10.33a1 1 0 0 1 .816-.983L8.5 8 1.316 6.653A1 1 0 0 1 .5 5.67V1.163Z"
                        fill={`${inputText ? "#19C37D" : "grey"}`}
                      ></path>
                    </svg>
                  </button>
                </div>
                <div
                  className={`absolute bottom-2 text-center text-[12px] font-sans ${
                    !hideSideBar ? "pl-7" : "pl-7"
                  }`}
                >
                  Please input the correct command for an accurate response
                </div>
                <div className="flex justify-center items-center gap-2 pt-9 text-[27px]">
                  <div className="font-bold text-[#333333]">Text to</div>
                  <div>
                    <b className="text-orange-400">Image</b>
                  </div>
                </div>
                <div className="justify-center  items-center pt-2 max-h-[75%] mt-7">
                  {loader ? (
                    <div className="pt-16">
                      {" "}
                      <Loader />
                    </div>
                  ) : (
                    <>
                      <div className="flex flex-col justify-center items-center   font-bold">
                        {!imageURL ? (
                          <p className="flex justify-center pt-20 text-[13px] font-sans">
                            {" "}
                            Please specify the desired image you would like
                            generated.
                          </p>
                        ) : (
                          <div className="h-96 w-96 flex justify-center items-center">
                            {imageURL && (
                              <Image
                                src={imageURL}
                                alt="Processed Image"
                                width={300}
                                height={100}
                              />
                            )}
                          </div>
                        )}{" "}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className={`${!hideSideBar ? "" : ""}"flex justify-center "`}>
              <div
                className={`${
                  !hideSideBar ? "pl-36 " : ""
                }"h-[20%] max-h-[30%] w-[80%]"`}
              >
                <div className="flex justify-center items-center pl-7 gap-2 pt-6 text-[30px] ">
                  <div className="font-bold text-[#333333]">Your</div>
                  <Image
                    src="/VoiceAssistantLogo.png"
                    alt="Voice Assistant Logo"
                    width={70}
                    height={5}
                  />
                  {/* </div> */}
                  <div>
                    <b className="text-orange-400">Assistant</b>
                  </div>
                </div>
                <div className="flex w-[100%] justify-center pt-16 max-h-[75%] mt-4">
                  {loader ? (
                    <Loader />
                  ) : (
                    <div
                      className={`${
                        !hideSideBar ? "w-[70%]" : ""
                      } flex justify-center  h-1/2  overflow-y-scroll`}
                    >
                      {!response ? (
                        <p
                          className={`w-full mt-20 ${
                            hideSideBar ? "pl-6" : ""
                          } font-bold`}
                        >
                          How can I help you today?
                        </p>
                      ) : (
                        // </div>
                        <div className=" mx-7 ">
                          <p
                            className={`h-[150%]  max-h-72 overflow-y-scroll ${
                              !hideSideBar ? "" : "pl-11"
                            }`}
                          >
                            <p>
                              <b>User: </b>
                              {question}
                            </p>
                            <b>ChatBot:</b>{" "}
                            {steps.map((step: any, index: any) => (
                              <div key={index}>
                                <p className="text-[14px]">{step.trim()}</p>
                              </div>
                            ))}
                            {/* <br />
                            <br />
                            <pre className="text-[14px] whitespace-pre-line">
                              <code>{extractCodeBlocks(response)}</code>
                            </pre> */}
                          </p>
                        </div>
                      )}{" "}
                    </div>
                  )}
                </div>
              </div>
              <div
                className={`${
                  hideSideBar ? "left-36" : "left-60"
                } bottom-3 absolute "`}
              >
                <div className=" flex justify-center items-center border-[2px] border-gray-600 rounded-md w-[500px] mt-3">
                  <input
                    value={question}
                    onChange={(e) => {
                      setQuestion(e.target.value), setResponse("");
                    }}
                    onKeyDown={(e) => {
                      if (e.key == "Enter") {
                        textGeneration();
                      }
                    }}
                    className="w-full h-full p-2 outline-none px-4 bg-transparent"
                    placeholder="Enter a message..."
                  />
                  <div className="flex justify-center items-center gap-2 ">
                    <button
                      className={`font-[700] w-fit px-2 h-full ${
                        question ? "cursor-pointer" : "cursor-default"
                      }`}
                      onClick={() => {
                        textGeneration();
                      }}
                      disabled={question.length == 0}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="none"
                        className="icon-sm m-1 md:m-0"
                        height={25}
                        width={25}
                      >
                        <path
                          d="M.5 1.163A1 1 0 0 1 1.97.28l12.868 6.837a1 1 0 0 1 0 1.766L1.969 15.72A1 1 0 0 1 .5 14.836V10.33a1 1 0 0 1 .816-.983L8.5 8 1.316 6.653A1 1 0 0 1 .5 5.67V1.163Z"
                          fill={`${question ? "#19C37D" : "grey"}`}
                        ></path>
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="text-[12px] text-center font-sans">
                  {" "}
                  Please input the correct command for an accurate response
                </div>
              </div>
            </div>
          )}{" "}
          <div className="absolute bottom-20 space-x-4">
            {!changeModel ? (
              <div className="pl-32">
                <button
                  className={` ${
                    !hideSideBar ? "ml-9" : "-ml-36"
                  } bg-blue-500 hover:bg-blue-800 text-white font-bold py-2 px-4  border border-blue-700 rounded`}
                  onClick={() => setChangeModel(true)}
                >
                  Go to Text to Image Generator
                </button>
              </div>
            ) : (
              <button
                className={`${
                  !hideSideBar ? "ml-48" : ""
                } bg-blue-500 hover:bg-blue-800 text-white font-bold py-2 px-4 border border-blue-700 rounded`}
                onClick={() => setChangeModel(false)}
              >
                Go to Chat Bot
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};
export default Chatbotcopy;
