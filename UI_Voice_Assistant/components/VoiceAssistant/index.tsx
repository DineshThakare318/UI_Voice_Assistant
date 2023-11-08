"use client";
import "regenerator-runtime";
import React, { useEffect, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import client from "@/services/client";
import { application } from "@/config/apis";
import { BsFillMicFill } from "react-icons/bs";
import ReactPlayer from "react-player";
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
        const getDel = utterance.text;
        if (getDel.includes("https")) {
          ("");
        } else {
          speechSynthesis.speak(utterance);
        }
      });
    }
  }, [transcript, listening]);

  useEffect(() => {
    setTimeout(() => {
      setOutput("");
    }, 4000);
  }, [userOutput]);

  return (
    <div className="flex flex-col items-center h-screen  bg-fuchsia-100 rounded-lg w-2/3">
      {/* <div className="w-fit">
        <ReactPlayer url="https://youtu.be/60ItHLz5WEA?si=MZ_WSCpT7iIx9Iaz" />
      </div> */}
      <div className="flex-grow justify-center items-center">
        {transcript && <div>{transcript}</div>}
        {userOutput.includes("https") ? (
          <p>{"Playing..."}</p>
        ) : (
          <p>{userOutput}</p>
        )}
      </div>
      {listening ? (
        <p className="pb-4">Go ahead..</p>
      ) : (
        <p className="pb-4">Click on mic to ask anything</p>
      )}
      <div className="flex justify-between items-center h-[7%] border-[2px] rounded-md">
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
            // className={` ${
            //   userInput ? "#19C37D" : "grey"
            // }`}
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
