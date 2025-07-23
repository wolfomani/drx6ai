"use client"

import type React from "react"

import { createContext, useContext } from "react"

const DataStreamContext = createContext({})

export function useDataStream() {
  return useContext(DataStreamContext)
}

export function DataStreamProvider({ children }: { children: React.ReactNode }) {
  return <DataStreamContext.Provider value={{}}>{children}</DataStreamContext.Provider>
}
