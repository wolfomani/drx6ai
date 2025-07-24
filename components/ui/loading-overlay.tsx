import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"

interface LoadingOverlayProps {
  isLoading: boolean
  message?: string
  className?: string
}

export function LoadingOverlay({ isLoading, message, className }: LoadingOverlayProps) {
  if (!isLoading) return null

  return (
    <div
      className={cn(
        "absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/70 backdrop-blur-sm transition-opacity duration-300",
        className,
      )}
    >
      <Loader2 className="h-10 w-10 animate-spin text-dr-blue" />
      {message && <p className="mt-4 text-lg font-medium text-white">{message}</p>}
    </div>
  )
}
