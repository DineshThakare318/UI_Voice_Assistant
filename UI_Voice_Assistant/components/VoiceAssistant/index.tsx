"use client";
import "regenerator-runtime";
import React, { useEffect, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import client from "@/services/client";
import { application } from "@/config/apis";
import { BsFillMicFill } from "react-icons/bs";
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
    try{
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
    } } catch(e){
           alert("Your are offline")
    } 
  };

  useEffect(() => {
    try{
      
      if (!listening && transcript) {
        chatGPT3(transcript).then((response) => {
          const speechSynthesis = window.speechSynthesis;
          const utterance = new SpeechSynthesisUtterance(response.data.response);
          
          const getDel = utterance.text;
          if (getDel.includes("https")) {
            ("");
          } else {
            speechSynthesis.speak(utterance);
          }
        });
      }
    } catch(e){
      alert("You are offline")
    }
    }, [transcript, listening]);
  

  

  return (
    <div className="my-2 flex flex-col items-center h-screen w-3/6 px-3  bg-green-100 rounded-lg ">
      <div className="flex gap-2 pt-6 text-[30px] pl-16">
      <div className="">Your</div>
      <Image
        src="/VoiceAssistantLogo.png" 
        alt="Voice Assistant Logo"
        width={70}
        height={5} 
        />
      <div><b className="text-orange-400">Assistant</b></div>
        </div>
      <div className="flex-grow justify-center items-center pt-4 ">
        {transcript && <div className="font-bold text-center">{transcript }</div>}
        {userOutput.includes("https") ? (
          <p className="text-black">{"Playing..."}</p>
        ) : (
          <p>{userOutput}</p>
        )}
      </div>
      <div className="py-2 font-medium cursor-pointer text-sm" ><Link href={"/ChatHistory"}>Check <b>chat </b> history</Link></div>
      {listening ? (
        <p className="pb-4">{"Go ahead, I`m listening..."}</p>
      ) : (
        <div className=" text-base font-sans pb-2">Click on <b>mic</b> to ask anything<br/> <p className="text-center ">or enter <b>text</b></p></div>
      )}
      <div className="flex justify-between items-center h-[7%] border-[2px] rounded-md w-5/6 mb-3">
        <input
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          className="w-full h-full p-2 outline-none px-4 bg-transparent"
          placeholder="Enter a message..."
        />
        <div className="flex justify-center items-center gap-2 ">
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
