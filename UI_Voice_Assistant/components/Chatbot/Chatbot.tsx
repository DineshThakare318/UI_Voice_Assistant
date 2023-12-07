import React, { useState } from "react";
import axios from "axios";
import Image from "next/image";
import CustomToastEducation from "../Toast/CustomToastEducation";
import toast from "react-hot-toast";
import { ToastTypes } from "@/enum/ToastTypes";
import Loader from "../Loader";

const Chatbot = () => {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState<any>("");
  const [error, setError] = useState(null);
  const [loader, setLoader] = useState(false);
  const [inputText, setInputText] = useState("");
  const [textResult, setTextResult] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [changeModel, setChangeModel] = useState(false);

  const queryAPI = async () => {
    try {
      setLoader(true)
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
      showAlert(error.message,ToastTypes.ERROR);
    }
    finally{
      setLoader(false)
    }
  };

  const fetchData = async () => {
    try {
      setError(null); // Clear any previous errors
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
      {changeModel ? (
        <div className="">
          <div className="absolute bottom-7 flex justify-between items-center border-[2px] border-gray-600 rounded-md w-[400px] left-52 pl-1 pr-4 py-2">
            <input
              className="outline-none w-full"
              onKeyDown={(e) => {
                if (e.key == "Enter") {
                  queryAPI();
                }
              }}
              type="text"
              placeholder="Enter text for processing"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            <button onClick={queryAPI}>
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
          <div className="flex justify-center items-center gap-2 pt-9 text-[27px]">
              <div className="font-bold text-[#333333]">Text to</div>
              <div>
                <b className="text-orange-400">Image</b>
              </div>
            </div>
              <div className="justify-center  items-center pt-2 max-h-[75%] mt-7">
              {loader ? (
              <div className="pt-16"> <Loader /></div> 
              ) : (
                <>
                    <div className="flex flex-col justify-center items-center   font-bold">
                  {!imageURL ? (
                     <p className="pt-20 text-[13px] font-sans"> Please specify the desired image you would like generated.</p>
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
      ) : (
        <>
          <div className="h-[20%] max-h-[30%] w-1/2">
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
            <div className=" pt-16 max-h-[75%] mt-4">
              {loader ? (
                <Loader />
              ) : (
                <div className="h-1/2 overflow-y-scroll">
                  {!response ? (
                    <div className="flex flex-col justify-center items-center  mt-20  font-bold">
                      How can I help you today?
                    </div>
                  ) : (
                    <div className="">
                    <p><b>User:{"  "}</b>{question}</p>
                    <p className=" h-1/4  max-h-72 overflow-y-scroll"><b>ChatBot:</b>{" "}{response}</p>
                    </div>
                  )}{" "}
                </div>
              )}
            </div>
          </div>
          <div className="bottom-3 absolute flex justify-center flex-col items-center">
            <div className=" flex justify-between items-center border-[2px] border-gray-600 rounded-md w-[500px] mt-3">
              <input
                value={question}
                onChange={(e) => {setQuestion(e.target.value),setResponse("")}}
               onKeyDown={(e) =>{
                if(e.key=="Enter"){
                  fetchData()
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
        </>
      )}
      <div className="absolute bottom-20 space-x-4">
        {!changeModel ?
        <>
        <button
          className="bg-blue-500 hover:bg-blue-800 text-white font-bold py-2 px-4 border border-blue-700 rounded"
          onClick={() => setChangeModel(true)}
        >
          Go to Text to Image Generator
        </button>
        </> :
        <button
          className="bg-blue-500 hover:bg-blue-800 text-white font-bold py-2 px-4 border border-blue-700 rounded"
          onClick={() => setChangeModel(false)}
        >
        Go to  Chat Bot
        </button>}
      </div>
    </div>
  );
};
export default Chatbot;
