import React from 'react'
import { cn } from '@/lib/utils'

interface LoadingOverlayProps {
  isLoading?: boolean
  children?: React.ReactNode
  className?: string
  message?: string
}

export default function LoadingOverlay({ 
  isLoading = false, 
  children, 
  className,
  message = "Loading..." 
}: LoadingOverlayProps) {
  if (!isLoading) {
    return <>{children}</>
  }

  return (
    <div className={cn("relative", className)}>
      {children}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="flex flex-col items-center space-y-2">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <p className="text-sm text-muted-foreground">{message}</p>
        </div>
      </div>
    </div>
  )
}
