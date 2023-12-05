"use client";
import VoiceAssistant from "@/components/VoiceAssistant";
import LLM2 from "@/components/llm2/llm2";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
export default function Home() {

  return (
    // [url('/bgAI2.jpg')]
    <div className="w-full h-full flex justify-center items-center py-4 bg-slate-900 bg-cover">
      {/* <VoiceAssistant /> */}
      <LLM2/>
    </div>
  );
}
