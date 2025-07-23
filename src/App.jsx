"use client"

import { useState } from "react"
import { Card, CardContent } from "./components/ui/card"
import { Skeleton } from "./components/ui/skeleton"
import { TooltipProvider } from "./components/ui/tooltip"
import ModelSelector from "./components/ModelSelector"
import ChatInput from "./components/ChatInput"
import SuggestionChips from "./components/SuggestionChips"
import { MessageCircle, Sparkles } from "lucide-react"
import "./App.css"

function App() {
  const [messages, setMessages] = useState([])
  const [selectedModel, setSelectedModel] = useState("deepseek")
  const [isLoading, setIsLoading] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(true)

  const handleSendMessage = async (message) => {
    const userMessage = { id: Date.now(), text: message, sender: "user" }
    setMessages((prev) => [...prev, userMessage])
    setShowSuggestions(false)
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const aiMessage = {
        id: Date.now() + 1,
        text: `هذا رد تجريبي من نموذج ${selectedModel}. تم استلام رسالتك: "${message}"`,
        sender: "ai",
      }
      setMessages((prev) => [...prev, aiMessage])
    } catch (error) {
      console.error("Error sending message:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSuggestionClick = (suggestion) => {
    handleSendMessage(suggestion)
  }

  const handleSettingsOpen = () => {
    console.log("Settings opened")
  }

  return (
    <TooltipProvider>
      <div className="flex flex-col h-screen bg-background" dir="rtl">
        {/* Header */}
        <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/drx-logo-3dNeLNIWbAwztqJfDREW8QR236lYF7.png"
                alt="Dr.X Logo"
                className="h-8 w-auto"
              />
              <div>
                <h1 className="text-xl font-bold">Dr.X AI Assistant</h1>
                <p className="text-sm text-muted-foreground">مساعدك الذكي المتقدم</p>
              </div>
            </div>

            <ModelSelector
              selectedModel={selectedModel}
              onModelChange={setSelectedModel}
              onSettingsOpen={handleSettingsOpen}
            />
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-hidden">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full p-8">
              <div className="text-center mb-8">
                <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                  <Sparkles className="h-8 w-8 text-primary" />
                </div>
                <h2 className="text-2xl font-bold mb-2">مرحباً بك في Dr.X</h2>
                <p className="text-muted-foreground max-w-md">
                  أنا مساعدك الذكي المتقدم. يمكنني مساعدتك في الإجابة على أسئلتك وحل مشاكلك بذكاء اصطناعي متطور.
                </p>
              </div>

              {showSuggestions && (
                <div className="w-full max-w-4xl">
                  <h3 className="text-lg font-semibold mb-4 text-center">اقتراحات للبدء:</h3>
                  <SuggestionChips onSuggestionClick={handleSuggestionClick} />
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col h-full">
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <Card
                    key={message.id}
                    className={`max-w-[80%] ${
                      message.sender === "user" ? "ml-auto bg-primary text-primary-foreground" : "mr-auto"
                    }`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        {message.sender === "ai" && (
                          <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-full flex-shrink-0">
                            <MessageCircle className="h-4 w-4 text-primary" />
                          </div>
                        )}
                        <p className="text-sm leading-relaxed">{message.text}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {isLoading && (
                  <Card className="max-w-[80%] mr-auto">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-full flex-shrink-0">
                          <MessageCircle className="h-4 w-4 text-primary" />
                        </div>
                        <div className="space-y-2 flex-1">
                          <Skeleton className="h-4 w-full" />
                          <Skeleton className="h-4 w-3/4" />
                          <Skeleton className="h-4 w-1/2" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          )}
        </main>

        {/* Chat Input */}
        <ChatInput onSendMessage={handleSendMessage} disabled={isLoading} />
      </div>
    </TooltipProvider>
  )
}

export default App
