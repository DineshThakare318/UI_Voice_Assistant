"use client";
import "regenerator-runtime";
import { useEffect, useRef, useState } from "react";
import { ChatHistory } from "../ChatHistory";
import client from "@/services/client";
import { application } from "@/config/apis";
import Loader from "../Loader";
import { BsFillMicFill } from "react-icons/bs";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
export const ChatBotComponent = () => {
  const [userInput, setUserInput] = useState<any>("");
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    getChats();
  }, []);

  const getChats = async () => {
    try {
      const res = await client.get(`${application.baseUrl}/chat`);
      setTimeout(() => setData(res?.data[0]?.data), 1000);
    } catch (e) {
      console.log(e);
    }
  };

  const login = async (voiceMessage?: string) => {
    try {
      const response: any = await client.post(`${application.baseUrl}/chat`, {
        question: userInput,
      });
      setData([...data, { question: voiceMessage || userInput, answer: null }]);
      setUserInput("");
      await getChats();
      console.log("mmmmmmmmmmm", response);
      return response;
    } catch (error) {
      console.error("Error fetching data:", error);
      return error;
    }
  };

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  useEffect(() => {
    if (!listening && transcript) {
      setUserInput(transcript);
      setTimeout(() => login(transcript), 300);
    }
  }, [transcript, listening]);
  return (
    <div className=" w-full h-full">
      <div className="h-[93%] max-h-[93%]">
        {/* {!data?.length ? <Loader /> : <ChatHistory data={data} />} */}
      </div>
      <div className="flex justify-between items-center h-[7%] border-[2px] rounded-md">
        <input
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          className="w-full h-full p-2 outline-none px-4 bg-transparent"
          placeholder="Enter a message..."
        />

        <div className="flex justify-center items-center gap-2">
          <div className="w-fit h-full flex justify-center items-center">
            <div
              onClick={() =>
                !listening
                  ? SpeechRecognition.startListening()
                  : SpeechRecognition.stopListening()
              }
              className={`p-1 cursor-pointer rounded-full hover:bg-gray-200 transition-opacity ${
                listening && "bg-red-400"
              }`}
            >
              <BsFillMicFill className="text-2xl text-[#808080]" />
            </div>
          </div>
          <button
            onClick={() => login(userInput)}
            className={`font-[700] w-fit px-4 h-full ${
              userInput ? "cursor-pointer" : "cursor-default"
            }`}
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
                fill={`${userInput ? "#19C37D" : "grey"}`}
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
