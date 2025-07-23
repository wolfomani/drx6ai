"use client"

import { useEffect, useRef } from "react"

interface ArtifactData {
  documentId?: string
  title?: string
  kind?: string
  content?: string
  status: "idle" | "streaming"
}

interface DataStreamDelta {
  type: string
  data: any
}

interface DataStreamHandlerProps {
  dataStream?: DataStreamDelta[]
  artifact: ArtifactData
  setArtifact: (updater: (draft: ArtifactData) => ArtifactData) => void
  setMetadata?: (metadata: any) => void
}

export function DataStreamHandler({ dataStream, artifact, setArtifact, setMetadata }: DataStreamHandlerProps) {
  const lastProcessedIndex = useRef(-1)

  useEffect(() => {
    if (!dataStream?.length) return

    const newDeltas = dataStream.slice(lastProcessedIndex.current + 1)
    lastProcessedIndex.current = dataStream.length - 1

    newDeltas.forEach((delta) => {
      setArtifact((draftArtifact) => {
        if (!draftArtifact) {
          return { status: "streaming" }
        }

        switch (delta.type) {
          case "data-id":
            return {
              ...draftArtifact,
              documentId: delta.data,
              status: "streaming",
            }

          case "data-title":
            return {
              ...draftArtifact,
              title: delta.data,
              status: "streaming",
            }

          case "data-kind":
            return {
              ...draftArtifact,
              kind: delta.data,
              status: "streaming",
            }

          case "data-clear":
            return {
              ...draftArtifact,
              content: "",
              status: "streaming",
            }

          case "data-content":
            return {
              ...draftArtifact,
              content: (draftArtifact.content || "") + delta.data,
              status: "streaming",
            }

          case "data-finish":
            return {
              ...draftArtifact,
              status: "idle",
            }

          default:
            return draftArtifact
        }
      })
    })
  }, [dataStream, setArtifact, artifact])

  return null
}
