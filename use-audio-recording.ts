import { useState, useCallback, useRef } from 'react'

export interface AudioRecordingState {
  isRecording: boolean
  audioBlob: Blob | null
  audioUrl: string | null
  duration: number
  error: string | null
}

export function useAudioRecording() {
  const [state, setState] = useState<AudioRecordingState>({
    isRecording: false,
    audioBlob: null,
    audioUrl: null,
    duration: 0,
    error: null
  })

  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const startTimeRef = useRef<number>(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      streamRef.current = stream

      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder

      const chunks: BlobPart[] = []

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data)
        }
      }

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(chunks, { type: 'audio/wav' })
        const audioUrl = URL.createObjectURL(audioBlob)
        
        setState(prev => ({
          ...prev,
          audioBlob,
          audioUrl,
          isRecording: false
        }))
      }

      mediaRecorder.start()
      startTimeRef.current = Date.now()

      // Update duration every second
      intervalRef.current = setInterval(() => {
        setState(prev => ({
          ...prev,
          duration: Math.floor((Date.now() - startTimeRef.current) / 1000)
        }))
      }, 1000)

      setState(prev => ({
        ...prev,
        isRecording: true,
        error: null,
        duration: 0
      }))
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Failed to start recording'
      }))
    }
  }, [])

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && state.isRecording) {
      mediaRecorderRef.current.stop()
      
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop())
      }

      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [state.isRecording])

  const clearRecording = useCallback(() => {
    if (state.audioUrl) {
      URL.revokeObjectURL(state.audioUrl)
    }

    setState({
      isRecording: false,
      audioBlob: null,
      audioUrl: null,
      duration: 0,
      error: null
    })
  }, [state.audioUrl])

  return {
    ...state,
    startRecording,
    stopRecording,
    clearRecording
  }
}
