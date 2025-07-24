export default function FixedComponent() {
  "use client"

  import { useState, useRef, useEffect, useCallback } from "react"

  export function useAudioRecording() {
    const [isRecording, setIsRecording] = useState(false)
    const [audioBlob, setAudioBlob] = useState<Blob | null>(null)
    const [audioURL, setAudioURL] = useState<string | null>(null)
    const mediaRecorderRef = useRef<MediaRecorder | null>(null)
    const audioChunksRef = useRef<Blob[]>([])

    const startRecording = useCallback(async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
        mediaRecorderRef.current = new MediaRecorder(stream)
        audioChunksRef.current = []

        mediaRecorderRef.current.ondataavailable = (event) => {
          audioChunksRef.current.push(event.data)
        }

        mediaRecorderRef.current.onstop = () => {
          const blob = new Blob(audioChunksRef.current, { type: "audio/webm" })
          setAudioBlob(blob)
          setAudioURL(URL.createObjectURL(blob))
          stream.getTracks().forEach((track) => track.stop()) // Stop the microphone stream
        }

        mediaRecorderRef.current.start()
        setIsRecording(true)
        setAudioBlob(null)
        setAudioURL(null)
      } catch (err) {
        console.error("Error accessing microphone:", err)
        setIsRecording(false)
      }
    }, [])

    const stopRecording = useCallback(() => {
      if (mediaRecorderRef.current && isRecording) {
        mediaRecorderRef.current.stop()
        setIsRecording(false)
      }
    }, [isRecording])

    const resetRecording = useCallback(() => {
      setAudioBlob(null)
      if (audioURL) {
        URL.revokeObjectURL(audioURL)
        setAudioURL(null)
      }
      audioChunksRef.current = []
      setIsRecording(false)
    }, [audioURL])

    useEffect(() => {
      // Cleanup URL when component unmounts or audioURL changes
      return () => {
        if (audioURL) {
          URL.revokeObjectURL(audioURL)
        }
      }
    }, [audioURL])

    return {
      isRecording,
      audioBlob,
      audioURL,
      startRecording,
      stopRecording,
      resetRecording,
    }
  }
}
