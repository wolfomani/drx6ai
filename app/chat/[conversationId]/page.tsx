import CognitiveChatInterface from "@/components/chat/cognitive-chat-interface";

interface ChatPageProps {
  params: {
    conversationId: string;
  };
}

export default function ChatPage({ params }: ChatPageProps) {
  const conversationId = parseInt(params.conversationId);
  
  return (
    <main className="h-screen">
      <CognitiveChatInterface conversationId={conversationId} />
    </main>
  );
}
