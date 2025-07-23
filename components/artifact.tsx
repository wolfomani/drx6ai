"use client"

export interface UIArtifact {
  status: "idle" | "streaming"
  documentId?: string
  title?: string
  kind?: string
  content?: string
}
