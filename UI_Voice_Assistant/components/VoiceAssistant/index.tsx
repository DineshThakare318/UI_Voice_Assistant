"use client";
import "regenerator-runtime";
import React, { useEffect, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import client from "@/services/client";
import { application } from "@/config/apis";
import { BsFillMicFill } from "react-icons/bs";import { link } from "fs";
import Link from "next/link";
import Image from "next/image";
;
const VoiceAssistant = () => {
  const [userInput, setUserInput] = useState<any>("");
  const [userOutput, setOutput] = useState<any>("");
  console.log("userOutput: ", userOutput);

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  useEffect(() => {
     setTimeout(() => {
      window.location.reload();
    }, 60000);
  }, []);
  
  async function chatGPT3(message: any) {
    try {
      const response: any = await client.post(
        `${application.baseUrl}/api/command`,
        {
          command: message,
        }
      );
      setUserInput("");
      setOutput(response.data.response);
      return response;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  const handleTextToSpeech = async (text: string) => {
    if (text) {
      const response = await chatGPT3(text);
      const speechSynthesis = window.speechSynthesis;
      const utterance = new SpeechSynthesisUtterance(response.data.response);
      const removeVoice = utterance.text;
      if (removeVoice.includes("https")) {
        ("");
      } else {
        speechSynthesis.speak(utterance);
      }
    }
  };

  useEffect(() => {
    if (!listening && transcript) {
      chatGPT3(transcript).then((response) => {
        const speechSynthesis = window.speechSynthesis;
        const utterance = new SpeechSynthesisUtterance(response.data.response);
  
        utterance.lang = 'hi';
  
        const getDel = utterance.text;
        if (getDel.includes("https")) {
          ("");
        } else {
          speechSynthesis.speak(utterance);
        }
      });
    }
  }, [transcript, listening]);
  

  

  return (
    <div className="flex flex-col items-center h-screen w-1/4 px-3 bg-fuchsia-100 rounded-lg ">
      <div className="flex gap-2 pt-4">
      <div className="">Your</div>
      <Image
        src="/VoiceAssistantLogo.png" // Path to your logo image in the public directory
        alt="Voice Assistant Logo"
        width={30} // Set the desired width
        height={5} // Set the desired height
        />
      <div><b className="text-orange-400">assistant</b></div>
        </div>
      {/* <Voice_Chat_History/> */}
      <div className="flex-grow justify-center items-center">
        {transcript && <div>{transcript }</div>}
        {userOutput.includes("https") ? (
          <p>{"Playing..."}</p>
        ) : (
          <p>{userOutput}</p>
        )}
      </div>
      <div className="py-2 text-base font-sans cursor-pointer" ><Link href={"/ChatHistory"}>Check <b>chat </b> history</Link></div>
      {listening ? (
        <p className="pb-4">Go ahead..</p>
      ) : (
        <div className=" text-base font-sans ">Click on <b>mic</b> to ask anything<br/> <p className="text-center ">or enter <b>text</b></p></div>
      )}
      <div className="flex justify-between items-center h-[7%] border-[2px] rounded-md mx-2">
        <input
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          className="w-full h-full p-2 outline-none px-4 bg-transparent"
          placeholder="Enter a message..."
        />
        <div className="flex justify-center items-center gap-2">
          <div className="w-full h-full flex justify-center items-center">
            <div
              onClick={() => {
                !listening
                  ? SpeechRecognition.startListening()
                  : SpeechRecognition.stopListening();
                setOutput("");
              }}
            >
              <BsFillMicFill
                className={`text-2xl  ${
                  listening ? "text-green-500" : "text-[#808080]"
                }`}
              />
            </div>
          </div>
          <button
            className={`font-[700] w-fit px-2 h-full ${
              userInput ? "cursor-pointer" : "cursor-default"
            }`}
            onClick={() => handleTextToSpeech(userInput)}
            disabled={userInput.length == 0}
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

export default VoiceAssistant;
