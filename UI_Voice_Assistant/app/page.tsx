import { ChatBotComponent } from "@/components/ChatBotComponent";
import VoiceAssistant from "@/components/VoiceAssistant";
import Voice_Chat_History from "@/components/Voice_Chat_History";
import { Assistant } from "next/font/google";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between py-3">
      <VoiceAssistant />
      {/* <ChatBotComponent /> */}
      <Voice_Chat_History />
    </main>
  );
}
