"use client"
import { CognitiveChatInterface } from "@/components/chat/cognitive-chat-interface"
import { ModelSelector } from "@/components/chat/model-selector"
import { ModelStatusIndicator } from "@/components/chat/model-status-indicator"
import { ConversationSidebar } from "@/components/chat/conversation-sidebar"
import { useIsMobile } from "@/hooks/use-mobile"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { MenuIcon } from "lucide-react"

export default function Chat() {
  const isMobile = useIsMobile()

  return (
    <div className="flex h-screen w-full">
      {isMobile ? (
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="absolute top-4 left-4 z-10">
              <MenuIcon className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-64">
            <ConversationSidebar />
          </SheetContent>
        </Sheet>
      ) : (
        <ConversationSidebar />
      )}
      <div className="flex flex-1 flex-col">
        <header className="flex h-16 items-center justify-between border-b px-6">
          <div className="flex items-center gap-4">
            <ModelSelector />
            <ModelStatusIndicator />
          </div>
        </header>
        <main className="flex flex-1 overflow-hidden">
          <div className="flex flex-1 flex-col">
            <CognitiveChatInterface />
          </div>
        </main>
      </div>
    </div>
  )
}
