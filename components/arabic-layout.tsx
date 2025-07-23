"use client"

import type { ReactNode } from "react"

interface ArabicLayoutProps {
  children: ReactNode
  className?: string
}

export function ArabicLayout({ children, className = "" }: ArabicLayoutProps) {
  return (
    <div
      className={`font-arabic ${className}`}
      dir="rtl"
      style={{
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      }}
    >
      {children}
    </div>
  )
}
