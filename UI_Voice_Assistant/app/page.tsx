import VoiceAssistant from "@/components/VoiceAssistant";
export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between h-screen bg-[url('/bgAI2.jpg')] ">
      <VoiceAssistant />
      {/* <ChatBotComponent /> */}
    </main>
  );
}
