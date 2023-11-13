import VoiceAssistant from "@/components/VoiceAssistant";
import Link from "next/link";
export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between h-screen bg-[url('/bgAI2.jpg')] ">
      <VoiceAssistant />
    </main>
  );
}
