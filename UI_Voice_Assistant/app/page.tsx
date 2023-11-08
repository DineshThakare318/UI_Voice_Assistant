import { ChatBotComponent } from "@/components/ChatBotComponent";
import VoiceAssistant from "@/components/VoiceAssistant";
export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between">
      <VoiceAssistant />
      {/* <ChatBotComponent /> */}
    </main>
  );
}
