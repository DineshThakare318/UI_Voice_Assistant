import React, { useState } from "react";
import axios from "axios";
import Image from "next/image";
import CustomToastEducation from "../Toast/CustomToastEducation";
import toast from "react-hot-toast";
import { ToastTypes } from "@/enum/ToastTypes";
// import { useSpeechRecognition } from 'react-speech-recognition';
// import SpeechRecognition, {
//     useSpeechRecognition,
//   } from "react-speech-recognition";

const LLM2 = () => {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState<any>("");
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setError(null); // Clear any previous errors
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
      setError(null); // Set an error message
    }
  };

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

  return (
    <div className="my-2 flex justify-center  h-full w-3/5   bg-white rounded-lg overflow-hidden relative">
      <div className="h-[70%] max-h-[70%] ">
        <div className="flex justify-center items-center gap-2 pt-6 text-[30px] ">
          <div className="font-bold text-[#333333]">Your</div>
          <div>
            <Image
              src="/VoiceAssistantLogo.png"
              alt="Voice Assistant Logo"
              width={70}
              height={5}
            />
          </div>
          <div>
            <b className="text-orange-400">Assistant</b>
          </div>
        </div>
        <div className="justify-center  items-center pt-4 max-h-[75%] overflow-y-scroll mt-4">
          <div>
            <>
              {
                !response ? (
                  <div className="flex flex-col justify-center items-center  mt-20  font-bold">
                    How can I help you today?
                  </div>
                ) : (
                  <p className="text-center  mx-4">{response}</p>
                )
              }{" "}
            </>
          </div>
        </div>
      </div>
      <div className="bottom-3 absolute flex justify-center flex-col items-center">
        <div className=" flex justify-between items-center border-[2px] border-gray-600 rounded-md w-[500px] mt-3">
          <input
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
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
                fetchData();
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
        <div className="text-[12px] font-sans">
          {" "}
          Please input the correct command for an accurate response
        </div>
      </div>
    </div>
  );
};

export default LLM2;
