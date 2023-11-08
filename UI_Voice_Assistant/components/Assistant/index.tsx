"use client";
import "regenerator-runtime";
import React, { useEffect, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { METHODS } from "http";
const Assistant = () => {
  const [command, setCommand] = useState("");
  const [response, setResponse] = useState("");

  const handleCommandChange = (e: any) => {
    setCommand(e.target.value);
  };

  const handleSendCommand = async () => {
    fetch("http://127.0.0.1:5000/api/command", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ command }),
    })
      .then((response) => response.json())
      .then((data) => {
        setResponse(data.response);
        speakResponse(data.response);
      });
    setCommand("");
  };

  const speakResponse = (text: any) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      speechSynthesis.speak(utterance);
    } else {
      console.log("Text-to-speech not supported in this browser.");
    }
  };

  return (
    <div className="flex flex-col items-center h-full">
      <div className="flex justify-center pt-12">
        <h1>Virtual Assistant</h1>
      </div>
      <div className="flex items-end justify-end absolute bottom-32">
        <input
          type="text"
          style={{ color: "red", border: "not", background: "white" }}
          value={command}
          onChange={handleCommandChange}
          placeholder="Enter a command..."
        />
        <button className="px-3 text-green-500" onClick={handleSendCommand}>
          {!command ? "" : "Send"}
        </button>
      </div>
      {response && <div className="flex pt-11 ">{response}</div>}
    </div>
  );
};

export default Assistant;
