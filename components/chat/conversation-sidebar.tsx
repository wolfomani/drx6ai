"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Plus, MessageSquare, Settings, Trash2, LogOut, Menu } from "lucide-react"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"
import { Separator } from "@/components/ui/separator"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "@/components/ui/use-toast"
import { useRouter, useParams } from "next/navigation"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

interface Conversation {
  id: string
  title: string
  createdAt: string
}

export function ConversationSidebar() {
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const router = useRouter()
  const params = useParams()
  const currentConversationId = params.conversationId as string
  const queryClient = useQueryClient()

  const {
    data: conversations,
    isLoading,
    isError,
  } = useQuery<Conversation[]>({
    queryKey: ["conversations"],
    queryFn: async () => {
      const response = await fetch("/api/conversations")
      if (!response.ok) {
        throw new Error("Failed to fetch conversations")
      }
      return response.json()
    },
  })

  const deleteConversationMutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await fetch(`/api/conversations/${id}`, {
        method: "DELETE",
      })
      if (!response.ok) {
        throw new Error("Failed to delete conversation")
      }
      return response.json()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["conversations"] })
      toast({
        title: "Conversation Deleted",
        description: "The conversation has been successfully deleted.",
      })
      if (currentConversationId) {
        router.push("/chat/new")
      }
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to delete conversation: ${error.message}`,
        variant: "destructive",
      })
    },
  })

  const handleDeleteConversation = (id: string) => {
    deleteConversationMutation.mutate(id)
  }

  const sidebarContent = (
    <div className="flex flex-col h-full bg-dark-surface border-l border-border-dark p-4">
      <div className="flex items-center justify-between mb-6">
        <Link href="/" className="flex items-center gap-2">
          <img src="/drx-logo_1753309522116.png" alt="Dr.X AI Logo" className="h-8 w-8" />
          <span className="text-xl font-bold text-text-primary">Dr.X AI</span>
        </Link>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                router.push("/chat/new")
                setIsSheetOpen(false) // Close sheet on new chat click
              }}
              aria-label="New Chat"
            >
              <Plus className="h-5 w-5 text-text-secondary" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">New Chat</TooltipContent>
        </Tooltip>
      </div>

      <div className="flex-1 overflow-y-auto space-y-2 mb-4">
        {isLoading && <div className="text-text-secondary">Loading conversations...</div>}
        {isError && <div className="text-destructive">Error loading conversations.</div>}
        {conversations?.length === 0 && !isLoading && (
          <div className="text-text-secondary text-sm">No conversations yet. Start a new one!</div>
        )}
        {conversations?.map((conv) => (
          <div key={conv.id} className="flex items-center justify-between group">
            <Link
              href={`/chat/${conv.id}`}
              className={`flex-1 flex items-center gap-3 p-2 rounded-md transition-colors ${
                currentConversationId === conv.id
                  ? "bg-dr-blue text-white"
                  : "text-text-secondary hover:bg-dark-surface-hover"
              }`}
              onClick={() => setIsSheetOpen(false)} // Close sheet on conversation click
            >
              <MessageSquare className="h-4 w-4" />
              <span className="text-sm truncate">{conv.title || `Untitled Chat ${conv.id.substring(0, 4)}`}</span>
            </Link>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-text-secondary opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-label={`Delete conversation ${conv.title}`}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete your conversation and remove its data
                    from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => handleDeleteConversation(conv.id)}>Delete</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        ))}
      </div>

      <Separator className="my-4 bg-border-dark" />

      <div className="mt-auto space-y-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" className="w-full justify-start text-text-secondary hover:bg-dark-surface-hover">
              <Settings className="h-5 w-5 mr-3" />
              Settings
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">Settings</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" className="w-full justify-start text-text-secondary hover:bg-dark-surface-hover">
              <LogOut className="h-5 w-5 mr-3" />
              Logout
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">Logout</TooltipContent>
        </Tooltip>
      </div>
    </div>
  )

  return (
    <TooltipProvider>
      <>
        {/* Mobile Sidebar */}
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden absolute top-4 left-4 z-50">
              <Menu className="h-6 w-6 text-text-primary" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-64 bg-dark-surface border-none">
            {sidebarContent}
          </SheetContent>
        </Sheet>

        {/* Desktop Sidebar */}
        <div className="hidden md:flex h-full w-full">{sidebarContent}</div>
      </>
    </TooltipProvider>
  )
}
