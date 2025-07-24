import { CognitiveChatInterface } from "@/components/chat/cognitive-chat-interface"
import { ConversationSidebar } from "@/components/chat/conversation-sidebar"
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable"
import { TooltipProvider } from "@/components/ui/tooltip"

export default function Home() {
  return (
    <TooltipProvider delayDuration={0}>
      <ResizablePanelGroup direction="horizontal" className="h-screen max-h-screen items-stretch">
        <ResizablePanel defaultSize={20} minSize={15} maxSize={30} className="hidden md:flex">
          <ConversationSidebar />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={80} minSize={50}>
          <CognitiveChatInterface />
        </ResizablePanel>
      </ResizablePanelGroup>
    </TooltipProvider>
  )
}
