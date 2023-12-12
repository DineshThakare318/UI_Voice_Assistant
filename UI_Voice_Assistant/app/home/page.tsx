"use client";
import VoiceAssistant from "@/components/VoiceAssistant";
import React, { useEffect, useState } from "react";
import Chatbot from "@/components/Chatbot/Chatbot";
import Chatbotcopy from "@/components/Chatbot/ChatbotCopy";
export default function Home() {

  return (
    // [url('/bgAI2.jpg')]
    <div className="w-full h-full flex justify-center items-center py-4 bg-slate-900 bg-cover">
      {/* <VoiceAssistant /> */}
      <Chatbotcopy/>
      {/* <TextToImage/> */}
    </div>
  );
}
